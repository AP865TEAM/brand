// Standalone Apps Script web app for ceremony memos and floor plan edits.
const phases = ['setup', 'arrival', 'ceremony', 'walk', 'care', 'networking'];
const store = PropertiesService.getScriptProperties();

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function getNote(raw) {
  return raw ? JSON.parse(raw) : {rev: 0, text: ''};
}

function doGet() {
  const values = store.getProperties();
  return json({notes: Object.fromEntries(phases.map(id => [id, getNote(values[id])])), layout: readLayout(values)});
}

function doPost(e) {
  const p = JSON.parse(e.postData.contents);
  if (p.type === 'layout') return saveLayout(p);
  if (!phases.includes(p.id) || typeof p.text !== 'string' || p.text.length > 12000 ||
      !Number.isSafeInteger(p.rev) || p.rev < 0) return json({error: 'invalid'});
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const current = getNote(store.getProperty(p.id));
    if (current.text === p.text) return json({note: current});
    if (current.rev !== p.rev) return json({conflict: true, note: current});
    const next = {rev: current.rev + 1, text: p.text};
    const data = JSON.stringify(next);
    if (Utilities.newBlob(data).getBytes().length > 8800) return json({error: 'size'});
    store.setProperty(p.id, data);
    return json({note: next});
  } finally {
    lock.releaseLock();
  }
}

const layoutPrefix = 'floorplan/';
const layoutVersion = 'floorplan-revision';

function readLayout(values) {
  const changes = Object.keys(values).filter(k => k.startsWith(layoutPrefix)).map(k => JSON.parse(values[k]));
  return {rev: Number(values[layoutVersion] || 0), changes};
}

function validLayoutOp(op) {
  if (!Array.isArray(op) || op.length !== 4) return false;
  const [group, id, field, value] = op;
  if (![group, id, field].every(v => typeof v === 'string' && v.length <= 100)) return false;
  const custom = /^custom-[a-z0-9]{1,15}-[a-z0-9]{1,8}$/;
  if (group === 'extra') return id === 'arrival' && custom.test(field) && typeof value === 'boolean';
  const table = /^ceremony\/T(0[1-9]|10)$/.test(id);
  const row = id.slice(8);
  if (!table && !(id.startsWith('arrival/') && (['photo','welcome','drinks'].includes(row) || custom.test(row)))) return false;
  if (group === 'staff') {
    if (table || typeof value !== 'string' || value.length > 120) return false;
    return ['name', 'role'].includes(field) || (field === 'floor' && ['', '1F', '8F'].includes(value)) ||
      (field === 'count' && /^\d{0,3}$/.test(value));
  }
  return group === 'positions' && field === '' && value && [1, 8].includes(value.floor) &&
    (!table || value.floor === 8) && [value.x, value.y].every(n => Number.isFinite(n) && n >= 0 && n <= 100) &&
    Object.keys(value).every(k => ['floor', 'x', 'y', 'checkInPlan'].includes(k)) &&
    (value.checkInPlan === undefined || value.checkInPlan === 'lobby');
}

function saveLayout(p) {
  if (!Array.isArray(p.edits) || !p.edits.length || p.edits.length > 1200 ||
      !p.edits.every(e => e && Number.isSafeInteger(e.base) && e.base >= 0 && validLayoutOp(e.op))) return json({error: 'invalid'});
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const values = store.getProperties();
    const rev = Number(values[layoutVersion] || 0) + 1;
    const writes = {};
    const conflicts = [];
    const keyOf = op => layoutPrefix + JSON.stringify(op.slice(0,3));
    for (const {op,base} of p.edits) {
      const key = keyOf(op);
      const previous = values[key] && JSON.parse(values[key]);
      if (previous && JSON.stringify(previous.op[3]) === JSON.stringify(op[3])) continue;
      const row = op[0] === 'extra' ? op[2] : op[1].split('/')[1];
      const tombstone = values[keyOf(['extra','arrival',row])];
      if ((tombstone && JSON.parse(tombstone).op[3] === false) || (previous && previous.rev > base)) {
        conflicts.push(op.slice(0,3));
      } else {
        writes[key] = JSON.stringify({rev,op});
      }
    }
    if (!conflicts.length && Object.keys(writes).length) {
      writes[layoutVersion] = String(rev);
      store.setProperties(writes);
      Object.assign(values,writes);
    }
    return json({layout: readLayout(values), conflicts});
  } finally {
    lock.releaseLock();
  }
}
