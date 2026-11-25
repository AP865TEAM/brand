'use strict';
const memoPrefix='ap865-opening-20261201-memo/';
const memoDrafts=new Map();
const unsavedMemos=new Set();

function memoPanel(id){
  return `<section class="box phase-memo" aria-labelledby="memo-title-${id}"><div class="boxhead"><h3 id="memo-title-${id}"><label for="memo-${id}">메모</label></h3><small id="memo-status-${id}" role="status"></small></div><textarea id="memo-${id}" data-phase-memo="${id}" rows="4" placeholder="메모를 입력하세요"></textarea></section>`;
}
function restoreMemo(id){
  const input=$('memo-'+id);
  if(!input||input.dataset.phaseMemo!==id)return;
  let value=memoDrafts.get(id);
  let browserStorage=!unsavedMemos.has(id);
  if(browserStorage){
    try{value=localStorage.getItem(memoPrefix+id)??undefined;}catch{browserStorage=false;}
  }
  if(value===undefined){
    // Carry forward only the notes an organizer actually wrote on this phase.
    value=(phases[id]?.decisions||[]).map(([key,title])=>{
      const text=state.decisions[key]?.note?.trim();
      return text?title+' — '+text:'';
    }).filter(Boolean).join('\n\n');
  }
  input.value=value;
  $('memo-status-'+id).textContent=browserStorage?'이 브라우저에 자동 저장':'현재 창에만 저장';
}
document.addEventListener('input',event=>{
  const input=event.target,id=input.dataset.phaseMemo;
  if(!id)return;
  memoDrafts.set(id,input.value);
  try{
    localStorage.setItem(memoPrefix+id,input.value);
    unsavedMemos.delete(id);
    $('memo-status-'+id).textContent='이 브라우저에 저장됨';
  }catch{
    unsavedMemos.add(id);
    $('memo-status-'+id).textContent='현재 창에만 저장';
  }
});
window.addEventListener('storage',event=>{
  if(!event.key?.startsWith(memoPrefix))return;
  const id=event.key.slice(memoPrefix.length),input=$('memo-'+id);
  if(input&&document.activeElement!==input)restoreMemo(id);
});
document.addEventListener('focusout',event=>{
  const id=event.target.dataset.phaseMemo;
  if(id)restoreMemo(id);
});
