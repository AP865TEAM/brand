'use strict';
(() => {
  const repo='AP865TEAM/brand';
  const guide='ap865-opening-20261201';
  const prefix='[세레모니 배치]';
  const cacheKey=guide+'-confirmed', draftKey=guide+'-draft';
  const initial={tasks:{},decisions:{},staff:{},extra:{},positions:{}};
  const phaseIDs=new Set(phaseOrder);
  const decisionIDs=new Set(program.flatMap(p=>p.decisions.map(d=>d[0])));
  const postIDs=new Set(phaseOrder.flatMap(id=>spaces[id].posts.map(([row])=>id+'/'+row)));
  guestPlaces.forEach(p=>postIDs.add('ceremony/'+p.row));
  const allowedTasks=new Set(phaseOrder.flatMap(id=>spaces[id].actions.map((_,i)=>id+'-'+i)));
  const custom=id=>typeof id==='string'&&/^custom-[a-z0-9]{1,15}-[a-z0-9]{1,8}$/.test(id);
  const isText=(v,max)=>typeof v==='string'&&v.length<=max;
  function safe([group,id,field,value]){
    if(typeof id!=='string'||id.length>100)return false;
    if(group==='tasks')return allowedTasks.has(id)&&field===''&&typeof value==='boolean';
    if(group==='decisions')return decisionIDs.has(id)&&(field==='done'?typeof value==='boolean':field==='note'&&isText(value,1500));
    if(group==='extra')return phaseIDs.has(id)&&custom(field)&&value===true;
    const [phaseName,row]=id.split('/');
    if(!postIDs.has(id)&&!(phaseIDs.has(phaseName)&&custom(row)&&id===phaseName+'/'+row))return false;
    if(group==='staff')return field==='count'?((isText(value,3)&&/^\d{0,3}$/.test(value))||(Number.isInteger(value)&&value>=0&&value<=999)):['name','role','floor'].includes(field)&&isText(value,120);
    if(group==='positions')return field===''&&value&&spaces[phaseName].floors.includes(value.floor)&&[value.x,value.y].every(n=>Number.isFinite(n)&&n>=0&&n<=100);
    return false;
  }
  function validChanges(list){return Array.isArray(list)?list.filter(o=>Array.isArray(o)&&o.length===4&&safe(o)):[];}
  const opKey=op=>JSON.stringify(op.slice(0,3));
  function put(map,ops){for(const op of validChanges(ops))map.set(opKey(op),op);}
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
  let confirmed=new Map(),before=new Map(),ready=false,loading=false,lastCheck=0;
  const draft=new Map();put(confirmed,load(cacheKey));put(draft,load(draftKey));
  function merged(){
    const result=structuredClone(initial),all=new Map([...confirmed,...draft]);
    for(const [group,id,field,value] of all.values()){
      if(group==='extra')(result.extra[id]||=[]).push(field);
      else if(group==='staff'||group==='decisions')(result[group][id]||={})[field]=value;
      else result[group][id]=value;
    }
    return result;
  }
  function status(message){
    sharedLabel=message;
    if($('storeLabel'))$('storeLabel').textContent=message;
    $('shareBtn').textContent=draft.size?'공유 반영 ('+draft.size+')':'공유 상태';
  }
  function apply(redraw=true){
    for(const [id,op] of draft)if(equal(op,confirmed.get(id)))draft.delete(id);
    keep(draftKey,draft);
    const result=merged(),updated=JSON.stringify(result)!==JSON.stringify(state);
    Object.assign(state,result);before=flatten(result);
    if(updated&&redraw)render();
    status(draft.size?'내 기기 초안 · 공유 반영 필요':ready?'공유본과 일치':'공유본 확인 중');
  }
  function record(){
    const now=flatten(state);
    for(const [id,op] of now)if(!equal(op,before.get(id))){
      if(equal(op,confirmed.get(id)))draft.delete(id);else draft.set(id,op);
    }
    before=now;const kept=keep(draftKey,draft);
    status(draft.size?(kept?'내 기기 초안 · 공유 반영 필요':'현재 창의 초안 · 공유 반영 필요'):'공유본과 일치');
  }
  function accepted(issue){
    if(issue.pull_request||!issue.title?.startsWith(prefix)||!['OWNER','MEMBER','COLLABORATOR'].includes(issue.author_association))return [];
    const payload=issue.body?.match(/`{3}json\s*([\s\S]*?)\s*`{3}/);
    if(!payload)return [];
    try{const msg=JSON.parse(payload[1]);return msg.guide===guide?validChanges(msg.changes):[];}catch{return [];}
  }
  function busyEditing(){return !!document.activeElement?.matches('input,textarea,select')||!!document.querySelector('.pin-editor')||!!$('modal').open||!!placement;}
  let nextConfirmed=null;
  function flush(){
    if(!nextConfirmed||busyEditing())return;
    confirmed=nextConfirmed;nextConfirmed=null;keep(cacheKey,confirmed);apply();
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
      ready=true;nextConfirmed=latest;flush();
    }catch{ready=false;status(draft.size?'내 기기 초안 · 공유본 연결 대기':'공유본을 불러오지 못했습니다. 다시 확인해 주세요.');}
    finally{loading=false;}
  }
  function newIssueUrl(ops){
    const link=new URL('https://github.com/'+repo+'/issues/new');
    link.searchParams.set('title',prefix+' 운영 가이드 수정');
    link.searchParams.set('body','행사 운영 가이드 변경 '+ops.length+'건\n\n```json\n'+JSON.stringify({guide,changes:ops})+'\n```');
    return link.href;
  }
  function panel(){
    const ops=Array.from(draft.values());
    let batch=[];
    for(const op of ops){const next=batch.concat([op]);if(batch.length&&newIssueUrl(next).length>6700)break;batch=next;}
    let body='';
    if(batch.length){
      body='<p>내 초안 '+ops.length+'건 중 '+batch.length+'건을 공유합니다. 운영진 GitHub 계정으로 <strong>Create</strong>를 누르면 공개 가이드에 반영됩니다.</p><a class="publish-link" target="_blank" rel="noopener noreferrer" href="'+esc(newIssueUrl(batch))+'">GitHub에서 반영</a>';
    }else body='<p>'+esc(ready?'현재 기기에 대기 중인 수정이 없습니다.':sharedLabel)+'</p>';
    body+='<button type="button" class="subbutton" id="checkShared">공유본 새로고침</button>';
    openModal('공유 상태',body,$('shareBtn'));
    $('checkShared').onclick=()=>{$('modal').close();refresh();};
  }
  window.guideSync={record};
  $('shareBtn').onclick=panel;
  apply();refresh();
  window.addEventListener('focus',()=>{if(Date.now()-lastCheck>10000)refresh();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastCheck>10000)refresh();});
  window.setInterval(()=>{if(document.hidden)return;flush();if(Date.now()-lastCheck>=300000)refresh();},3000);
})();
