'use strict';

const memoEndpoint='https://script.google.com/macros/s/AKfycbyfj10yW_ywmlfl_C_fkEAMhtdwW2pfub5PMtwa79oYqXT5ETHJ4ZTpvNxrkwd7iYas/exec';
const memoPrefix='ap865-opening-20261201-memo/';
const memoRecords=new Map();
let readingMemos=false;

function readMemoKey(key){
  try{return localStorage.getItem(key);}catch{return null;}
}
function storeMemoKey(key,value){
  try{
    if(value===null)localStorage.removeItem(key);
    else localStorage.setItem(key,value);
  }catch{ /* The editor can still save directly to the shared service. */ }
}
function validMemo(note){
  return note && Number.isSafeInteger(note.rev) && note.rev>=0 && typeof note.text==='string';
}
function storedNote(key){
  try{const n=JSON.parse(readMemoKey(key));return validMemo(n)?n:null;}catch{return null;}
}
function memoRecord(id){
  if(!memoRecords.has(id)){
    const key=memoPrefix+id;
    const note=storedNote(key+'/shared')||{rev:0,text:''};
    const draft=storedNote(key+'/pending');
    const oldNote=readMemoKey(key)??(phases[id]?.decisions||[]).map(([k,title])=>{
      const s=state.decisions[k]?.note?.trim();
      return s?title+' — '+s:'';
    }).filter(Boolean).join('\n\n');
    memoRecords.set(id,{id,key,note,draft,oldNote,loaded:false,sending:false,composing:false,timer:0,error:''});
  }
  return memoRecords.get(id);
}
function memoPanel(id){
  return `<section class="box phase-memo" aria-labelledby="memo-title-${id}"><div class="boxhead"><h3 id="memo-title-${id}"><label for="memo-${id}">공동 메모</label></h3><small id="memo-status-${id}" role="status"></small></div><textarea id="memo-${id}" data-phase-memo="${id}" rows="4" placeholder="함께 볼 메모를 입력하세요"></textarea><div id="memo-conflict-${id}" class="memo-conflict" hidden><strong>다른 사람이 저장한 내용</strong><pre id="memo-other-${id}"></pre><button type="button" data-memo-choice="use" data-note="${id}">공유본 사용</button> <button type="button" data-memo-choice="mine" data-note="${id}">입력한 내용으로 저장</button></div><button type="button" id="memo-import-${id}" data-memo-choice="import" data-note="${id}" hidden>이 기기의 기존 메모 가져오기</button></section>`;
}
function hasMemoConflict(r){return r.loaded && r.draft && r.draft.rev!==r.note.rev && r.draft.text!==r.note.text;}
function restoreMemo(id){
  const r=memoRecord(id),input=$('memo-'+id);
  const value=r.draft?.text??r.note.text;
  if(input.value!==value&&!r.composing)input.value=value;
  const conflict=hasMemoConflict(r);
  $('memo-conflict-'+id).hidden=!conflict;
  if(conflict)$('memo-other-'+id).textContent=r.note.text||'(빈 메모)';
  $('memo-import-'+id).hidden=!r.oldNote||r.oldNote===value;
  $('memo-status-'+id).textContent=r.error||(r.sending?'저장 중…':conflict?'동시 수정 · 저장할 내용을 선택하세요':r.draft?'공유 저장 대기':r.loaded?'공유됨':'공유 메모 불러오는 중…');
}
function setMemoDraft(r,draft){
  r.draft=draft;
  storeMemoKey(r.key+'/pending',draft?JSON.stringify(draft):null);
}
function acceptMemo(r,note){
  if(!validMemo(note))throw Error('invalid response');
  if(note.rev>=r.note.rev){
    r.note=note;
    storeMemoKey(r.key+'/shared',JSON.stringify(note));
  }
  r.loaded=true;
  if(r.draft?.text===r.note.text)setMemoDraft(r,null);
}
function queueMemo(r,delay=900){
  window.clearTimeout(r.timer);
  if(!r.composing && r.draft && !hasMemoConflict(r))r.timer=window.setTimeout(()=>saveMemo(r),delay);
}
async function saveMemo(r){
  if(!r.loaded||r.sending||r.composing||!r.draft||hasMemoConflict(r))return;
  const sent=r.draft;
  if(new Blob([JSON.stringify({rev:r.note.rev+1,text:sent.text})]).size>8800){
    r.error='메모가 너무 깁니다. 줄이면 자동 저장됩니다.';restoreMemo(r.id);return;
  }
  r.sending=true;r.error='';restoreMemo(r.id);
  try{
    const res=await fetch(memoEndpoint,{method:'POST',credentials:'omit',body:JSON.stringify({id:r.id,...sent}),signal:AbortSignal.timeout(25000)});
    if(!res.ok)throw Error();
    const data=await res.json();
    if(!validMemo(data.note))throw Error();
    // Keystrokes entered while this save was in flight are based on its acknowledgement.
    if(!data.conflict && r.draft && r.draft!==sent && r.draft.rev===sent.rev){
      setMemoDraft(r,{rev:data.note.rev,text:r.draft.text});
    }
    acceptMemo(r,data.note);
  }catch{
    r.error='공유 저장 대기 · 연결되면 다시 시도합니다';
  }finally{
    r.sending=false;restoreMemo(r.id);
    if(!r.error)queueMemo(r);
  }
}
async function refreshMemos(){
  if(readingMemos||document.hidden)return;
  readingMemos=true;
  try{
    const res=await fetch(memoEndpoint+'?t='+Date.now(),{credentials:'omit',signal:AbortSignal.timeout(25000)});
    if(!res.ok)throw Error();
    const {notes}=await res.json();
    if(!notes||![...memoRecords.keys()].every(id=>validMemo(notes[id])))throw Error();
    for(const r of memoRecords.values()){
      if(r.sending)continue;
      r.error='';acceptMemo(r,notes[r.id]);restoreMemo(r.id);queueMemo(r);
    }
  }catch{
    for(const r of memoRecords.values()){
      if(r.sending)continue;
      r.error=r.draft?'공유 저장 대기 · 연결되면 다시 시도합니다':'공유 연결 대기';
      restoreMemo(r.id);
    }
  }finally{readingMemos=false;}
}
function editMemo(input,composing=false){
  const r=memoRecord(input.dataset.phaseMemo);
  r.error='';r.composing=composing;
  setMemoDraft(r,{rev:r.draft?.rev??r.note.rev,text:input.value});
  restoreMemo(r.id);queueMemo(r);
}
document.addEventListener('input',e=>{if(e.target.dataset.phaseMemo)editMemo(e.target,e.isComposing);});
document.addEventListener('compositionstart',e=>{if(e.target.dataset.phaseMemo)memoRecord(e.target.dataset.phaseMemo).composing=true;});
document.addEventListener('compositionend',e=>{if(e.target.dataset.phaseMemo)editMemo(e.target);});
document.addEventListener('focusout',e=>{if(e.target.dataset.phaseMemo)queueMemo(memoRecord(e.target.dataset.phaseMemo),0);});
document.addEventListener('click',e=>{
  const {memoChoice:choice,note:id}=e.target.dataset;
  if(!choice||!memoRecords.has(id))return;
  const r=memoRecord(id);
  if(choice==='import'){
    const text=r.draft?.text??r.note.text;
    setMemoDraft(r,{rev:r.draft?.rev??r.note.rev,text:[text,r.oldNote].filter(Boolean).join('\n\n')});
    r.oldNote='';storeMemoKey(r.key,'');
  }else if(choice==='use')setMemoDraft(r,null);
  else if(choice==='mine'&&r.draft)setMemoDraft(r,{rev:r.note.rev,text:r.draft.text});
  r.error='';restoreMemo(id);queueMemo(r,0);
});
document.addEventListener('DOMContentLoaded',refreshMemos);
document.addEventListener('visibilitychange',refreshMemos);
window.addEventListener('online',refreshMemos);
window.addEventListener('focus',refreshMemos);
window.setInterval(refreshMemos,10000);
