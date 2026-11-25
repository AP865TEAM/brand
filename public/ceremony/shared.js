'use strict';
(() => {
  const repo='AP865TEAM/brand';
  const guide='ap865-opening-20261201';
  const prefix='[세레모니 배치]';
  const cacheKey=guide+'-confirmed', draftKey=guide+'-draft';
  const initial={tasks:{},decisions:{},staff:{},extra:{},positions:{},people:{},leads:{}};
  const phaseIDs=new Set(phaseOrder);
  const decisionIDs=new Set(program.flatMap(p=>p.decisions.map(d=>d[0])));
  const postIDs=new Set(phaseOrder.flatMap(id=>spaces[id].posts.map(([row])=>id+'/'+row)));
  const tableIDs=new Set(Object.keys(loungeTables).map(id=>'ceremony/'+id));
  guestPlaces.forEach(p=>postIDs.add('ceremony/'+p.row));
  const allowedTasks=new Set(phaseOrder.flatMap(id=>spaces[id].actions.map((_,i)=>id+'-'+i)));
  const custom=id=>typeof id==='string'&&/^custom-[a-z0-9]{1,15}-[a-z0-9]{1,8}$/.test(id);
  const isText=(v,max)=>typeof v==='string'&&v.length<=max;
  function safe([group,id,field,value]){
    if(typeof id!=='string'||id.length>100)return false;
    if(group==='leads'){
      const [floor,slot]=id.split('/');
      if(field!==''||!Object.hasOwn(floorNames,floor)||id!==floor+'/'+slot)return false;
      if(slot==='first')return isText(value,60);
      return /^(new-[0-9a-f-]{36}|old-[a-z0-9-]+-\d+)$/.test(slot)&&(value===false||isText(value,60));
    }
    if(group==='people')return field===''&&isText(value,60)&&value.trim().length>0&&id===personKey(value);
    if(group==='tasks')return allowedTasks.has(id)&&field===''&&typeof value==='boolean';
    if(group==='decisions')return decisionIDs.has(id)&&(field==='done'?typeof value==='boolean':field==='note'&&isText(value,1500));
    if(group==='extra')return phaseIDs.has(id)&&custom(field)&&typeof value==='boolean';
    const [phaseName,row]=id.split('/');
    if(!postIDs.has(id)&&!(group==='positions'&&tableIDs.has(id))&&!(phaseIDs.has(phaseName)&&custom(row)&&id===phaseName+'/'+row))return false;
    if(group==='staff')return field==='count'?((isText(value,3)&&/^\d{0,3}$/.test(value))||(Number.isInteger(value)&&value>=0&&value<=999)):['name','role','floor'].includes(field)&&isText(value,120);
    if(group==='positions')return field===''&&value&&spaces[phaseName].floors.includes(value.floor)&&(value.tableX===undefined&&value.tableY===undefined||[value.tableX,value.tableY].every(n=>Number.isFinite(n)&&n>=0&&n<=100))&&[value.x,value.y].every(n=>Number.isFinite(n)&&n>=0&&n<=100);
    return false;
  }
  function validChanges(list){return Array.isArray(list)?list.filter(o=>Array.isArray(o)&&o.length===4&&safe(o)):[];}
  const opKey=op=>JSON.stringify(op.slice(0,3));
  function removed(op){return op?.[0]==='extra'&&op[3]===false;}
  function put(map,ops){
    for(const op of validChanges(ops)){
      const key=opKey(op);
      if(!removed(map.get(key))&&!(op[0]==='leads'&&map.get(key)?.[3]===false))map.set(key,op);
    }
  }
  function deletedRows(ops){
    return new Set([...ops.values()].filter(removed).map(([,phase,row])=>phase+'/'+row));
  }
  function belongsToDeleted(op,deleted){
    const [group,id,field]=op;
    if(group==='extra')return !removed(op)&&deleted.has(id+'/'+field);
    return (group==='staff'||group==='positions')&&deleted.has(id);
  }
  function load(key){try{return validChanges(JSON.parse(localStorage.getItem(key)||'[]'));}catch{return [];}}
  function keep(key,ops){try{localStorage.setItem(key,JSON.stringify([...ops.values()]));return true;}catch{return false;}}
  function flatten(obj){
    const ops=[];
    for(const [group,data] of Object.entries(obj)){
      for(const [id,val] of Object.entries(data)){
        if(group==='extra'){for(const row of val)ops.push([group,id,row,true]);}
        else if(group==='staff'||group==='decisions'){for(const [field,value] of Object.entries(val))ops.push([group,id,field,value]);}
        else ops.push([group,id,'',val]);
      }
    }
    const out=new Map();put(out,ops);return out;
  }
  function equal(a,b){return a&&b&&JSON.stringify(a[3])===JSON.stringify(b[3]);}
  let confirmed=new Map(),before=new Map(),loading=false,lastCheck=0;
  const draft=new Map();put(confirmed,load(cacheKey));put(draft,load(draftKey));
  const pendingKey=guide+'-layout-pending', layoutKey=guide+'-layout-shared';
  const pending=new Map(), remote=new Map(), conflicts=new Set(), acknowledged=new Map();
  let revision=0, shownRevision=0, loaded=false, offline=false, sending=false, timer=0, dirty=false;
  const mapped=op=>op[0]==='extra'&&op[1]==='arrival' ||
    (op[0]==='staff'||op[0]==='positions')&&op[1].startsWith('arrival/') ||
    op[0]==='positions'&&tableIDs.has(op[1]);
  const mapEntry=e=>e && Array.isArray(e.op) && e.op.length===4 && safe(e.op) && mapped(e.op);
  const validRev=n=>Number.isSafeInteger(n)&&n>=0;
  const validLayout=s=>s && validRev(s.rev) && Array.isArray(s.changes) &&
    s.changes.every(e=>mapEntry(e)&&validRev(e.rev)&&e.rev<=s.rev);
  function recall(key){try{return JSON.parse(localStorage.getItem(key));}catch{return null;}}
  const recovered=recall(pendingKey);
  for(const e of Array.isArray(recovered)?recovered:[]){
    if(mapEntry(e)&&validRev(e.base))pending.set(opKey(e.op),e);
  }
  function replaceLayout(s){
    revision=s.rev;
    remote.clear();put(remote,s.changes.map(e=>e.op));
    dirty=true;
  }
  const cached=recall(layoutKey);
  if(validLayout(cached))replaceLayout(cached);
  function oldMapEdits(){return [...draft.values()].filter(mapped);}
  function status(){
    const label=$('map-sync-status');
    if(!label)return;
    label.textContent=conflicts.size?'동시 수정 · 적용할 배치를 선택하세요':
      sending?'배치 저장 중…':offline?'공유 연결 대기':pending.size?'배치 저장 대기':loaded?'배치 공유됨':'공유 배치 불러오는 중…';
    $('map-import').hidden=!loaded||!oldMapEdits().length;
    $('map-use').hidden=$('map-mine').hidden=!conflicts.size;
  }
  function scheduleSave(){
    window.clearTimeout(timer);
    if(loaded && !sending && !offline && !conflicts.size && pending.size)timer=window.setTimeout(upload,650);
    status();
  }
  function addEdit(op){
    const key=opKey(op);
    pending.set(key,{base:pending.get(key)?.base??Math.max(shownRevision,acknowledged.get(key)||0),op});
  }
  function receiveLayout(s){
    if(!validLayout(s)){offline=true;status();return;}
    const first=!loaded;
    loaded=true;offline=false;
    if(s.rev>revision || first && s.rev===revision){
      replaceLayout(s);
      try{localStorage.setItem(layoutKey,JSON.stringify(s));}catch{}
      const deleted=deletedRows(remote);
      for(const [k,e] of pending){
        if(belongsToDeleted(e.op,deleted)){pending.delete(k);conflicts.delete(k);}
      }
      keep(pendingKey,pending);
    }
    flush();scheduleSave();
  }
  async function upload(){
    if(!pending.size||sending||offline||!loaded||conflicts.size)return;
    const sent=new Map(pending);
    sending=true;status();
    try{
      const res=await fetch(memoEndpoint,{method:'POST',credentials:'omit',signal:AbortSignal.timeout(25000),
        body:JSON.stringify({type:'layout',edits:[...sent.values()]})});
      if(!res.ok)throw Error();
      const data=await res.json();
      if(!validLayout(data.layout)||!Array.isArray(data.conflicts))throw Error();
      if(data.conflicts.length){
        for(const fields of data.conflicts){
          const k=JSON.stringify(fields);
          if(pending.has(k))conflicts.add(k);
        }
      }else{
        const saved=new Map(data.layout.changes.map(e=>[opKey(e.op),e]));
        for(const [k,e] of sent){
          const current=pending.get(k);
          if(saved.has(k))acknowledged.set(k,saved.get(k).rev);
          if(current===e)pending.delete(k);
          else if(current&&saved.has(k))current.base=saved.get(k).rev;
        }
      }
      dirty=true;keep(pendingKey,pending);receiveLayout(data.layout);
    }catch{offline=true;}
    finally{sending=false;scheduleSave();}
  }
  document.addEventListener('click',e=>{
    const choice=e.target.id;
    if(choice==='map-import'&&loaded){
      const gone=deletedRows(remote);
      for(const op of oldMapEdits()){
        const k=opKey(op);
        if(!pending.has(k)&&!belongsToDeleted(op,gone)&&!equal(op,remote.get(k)))pending.set(k,{base:0,op});
        draft.delete(k);
      }
    }else if(choice==='map-use'||choice==='map-mine'){
      for(const k of conflicts){
        if(choice==='map-use')pending.delete(k);
        else if(pending.has(k))pending.get(k).base=revision;
      }
      conflicts.clear();
    }else return;
    keep(draftKey,draft);keep(pendingKey,pending);dirty=true;flush();scheduleSave();
  });
  function merged(){
    const result=structuredClone(initial),all=new Map(confirmed);
    put(all,[...draft.values()].filter(op=>!mapped(op)));
    put(all,[...remote.values()]);
    put(all,[...pending.values()].map(e=>e.op));
    const deleted=deletedRows(all);
    for(const op of all.values()){
      if(removed(op)||belongsToDeleted(op,deleted))continue;
      const [group,id,field,value]=op;
      if(group==='extra')(result.extra[id]||=[]).push(field);
      else if(group==='staff'||group==='decisions')(result[group][id]||={})[field]=value;
      else result[group][id]=value;
    }
    return result;
  }
  function apply(redraw=true){
    const deleted=new Set([...deletedRows(confirmed),...deletedRows(draft)]);
    for(const [id,op] of draft){
      const published=confirmed.get(id);
      if(equal(op,published)||belongsToDeleted(op,deleted)||(op[0]==='leads'&&published?.[3]===false))draft.delete(id);
    }
    keep(draftKey,draft);
    const result=merged(),updated=JSON.stringify(result)!==JSON.stringify(state);
    Object.assign(state,result);before=flatten(result);shownRevision=revision;dirty=false;
    if(updated&&redraw)render();
  }
  function record(){
    const now=flatten(state);
    for(const [id,op] of now)if(!equal(op,before.get(id))){
      if(mapped(op)){addEdit(op);draft.delete(id);}
      else if(equal(op,confirmed.get(id)))draft.delete(id);else draft.set(id,op);
    }
    for(const [id,op] of before){
      if(op[0]!=='extra'||now.has(id))continue;
      const [,phase,row]=op,deleted=new Set([phase+'/'+row]);
      for(const [key,change] of draft)if(belongsToDeleted(change,deleted))draft.delete(key);
      const deletion=['extra',phase,row,false];
      if(mapped(deletion)){
        for(const [k,e] of pending)if(belongsToDeleted(e.op,deleted)){pending.delete(k);conflicts.delete(k);}
        addEdit(deletion);draft.delete(id);
      }else draft.set(id,deletion);
    }
    before=now;keep(draftKey,draft);keep(pendingKey,pending);scheduleSave();
  }
  function accepted(issue){
    if(issue.pull_request||!issue.title?.startsWith(prefix)||!['OWNER','MEMBER','COLLABORATOR'].includes(issue.author_association))return [];
    const payload=issue.body?.match(/`{3}json\s*([\s\S]*?)\s*`{3}/);
    if(!payload)return [];
    try{const msg=JSON.parse(payload[1]);return msg.guide===guide?validChanges(msg.changes):[];}catch{return [];}
  }
  function busyEditing(){return !!document.activeElement?.matches('input,textarea,select')||!!document.querySelector('.pin-editor')||!!placement||!!pinDrag;}
  let nextConfirmed=null;
  function flush(){
    if((!nextConfirmed&&!dirty)||busyEditing())return;
    if(nextConfirmed){confirmed=nextConfirmed;nextConfirmed=null;keep(cacheKey,confirmed);}
    apply();status();
  }
  async function refresh(){
    if(loading)return;
    loading=true;lastCheck=Date.now();
    try{
      let page=1,issues=[];
      for(;;){
        const query=new URLSearchParams({state:'all',sort:'created',direction:'desc',per_page:'100',page:String(page)});
        const res=await fetch('https://api.github.com/repos/'+repo+'/issues?'+query,{credentials:'omit',referrerPolicy:'no-referrer',cache:'no-cache'});
        if(!res.ok)throw Error();
        const rows=await res.json();if(!Array.isArray(rows))throw Error();
        issues.push(...rows);
        if(rows.length<100)break;
        page++;
      }
      const latest=new Map();issues.sort((a,b)=>a.number-b.number);
      for(const issue of issues)put(latest,accepted(issue));
      nextConfirmed=latest;flush();
    }catch{ /* Keep the cached assignments until the next refresh. */ }
    finally{loading=false;}
  }
  window.guideSync={record,status,receiveLayout,disconnected(){offline=true;status();}};
  apply();status();refresh();
  window.addEventListener('focus',()=>{if(Date.now()-lastCheck>10000)refresh();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastCheck>10000)refresh();});
  window.setInterval(()=>{if(document.hidden)return;flush();if(Date.now()-lastCheck>=300000)refresh();},3000);
})();
