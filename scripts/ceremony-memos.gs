// Standalone Apps Script web app for the six ceremony memos.
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
  return json({notes: Object.fromEntries(phases.map(id => [id, getNote(values[id])]))});
}

function doPost(e) {
  const p = JSON.parse(e.postData.contents);
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
