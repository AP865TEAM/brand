'use strict';
// Names from the 직원 정보 sheet, reviewed 2026-11-24.
const staffDirectory=[
  '홍관','박용호','전유미','조윤채','최경희','김연경','문예린','심은기','윤다예','김근아',
  '문영주','황선주','정유철','김도현','이지윤','최재식','문혜령','이채은','장소미','최연우',
  '고연옥','이승화','이정수','하태경','안서영','서한별','양정현','이하은','지승연','김명',
  '이소현','최진영','김하나','이희진','정연화'
];
const directoryKeys=new Set(staffDirectory.map(personKey));
const roleAliases=new Map([
  ['하 실장님','하태경'],['하 실장','하태경'],['하태경 실장님','하태경'],['하태경 실장','하태경'],
  ['홍관 원장님','홍관'],['홍관 원장','홍관'],['홍관 대표원장','홍관'],['홍관 대표원장님','홍관']
].map(([label,name])=>[personKey(label),personKey(name)]));
function rosterKey(name){
  const key=personKey(name);
  return roleAliases.get(key)||key;
}
function splitNames(value){
  return String(value??'').normalize('NFKC').split(/[,，、;；/\n]+/u).map(s=>s.trim()).filter(Boolean);
}
function personKey(name){return 'p:'+name.normalize('NFKC').replace(/\s+/gu,'').toLocaleLowerCase('ko');}
function registerPerson(name){
  const label=name.trim().slice(0,60),id=personKey(label);
  if(!label||directoryKeys.has(rosterKey(label))||Object.hasOwn(state.people,id))return false;
  state.people[id]=label;return true;
}
function personnel(){
  const people=new Map();
  function add(names,field,description){
    for(const name of splitNames(names)){
      const key=rosterKey(name);
      if(!people.has(key))people.set(key,{key,name,roles:new Set(),seats:new Set()});
      if(field)people.get(key)[field].add(description);
    }
  }
  staffDirectory.forEach(name=>add(name));
  Object.values(state.people).forEach(name=>add(name));
  for(const phaseID of phaseOrder.filter(id=>id!=='care')){
    const title=spaces[phaseID].title;
    for(const [,,,defaultName] of spaces[phaseID].posts)if(defaultName)add(defaultName);
    for(const post of posts(phaseID)){
      const spot=positionFor(phaseID,post.row);
      const floor=spot?spot.floor+'F':post.floor;
      add(post.name,'roles',[title,floor,post.role||'추가 역할'].filter(Boolean).join(' · '));
    }
  }
  for(const seat of mapEntries('ceremony',8,'guests'))add(seat.name,'seats',seat.label);
  return [...people.values()].sort((a,b)=>a.name.localeCompare(b.name,'ko'));
}
let peopleViewSignature='';
function renderPeople(){
  const list=personnel();
  const signature=JSON.stringify(list.map(p=>[p.name,[...p.roles],[...p.seats]]));
  if(signature===peopleViewSignature)return;
  peopleViewSignature=signature;
  const expanded=new Set([...$('peopleList').querySelectorAll('details[open]')].map(el=>el.dataset.person));
  $('peopleCount').textContent=list.length+'명';
  $('assignedCount').textContent='담당 배정 '+list.filter(p=>p.roles.size).length+'명';
  $('peopleList').innerHTML=list.map(p=>{
    const assigned=p.roles.size>0,entries=[...p.roles,...[...p.seats].map(s=>'본식 자리 · '+s)];
    const icon='<span class="person-sign '+(assigned?'assigned':'')+'" aria-label="'+(assigned?'담당 배정':'담당 미배정')+'">'+(assigned?'✓':'–')+'</span>';
    const label=icon+'<b>'+esc(p.name)+'</b><small>'+(assigned?p.roles.size+'건':(p.seats.size?'참석':'미배정'))+'</small>';
    return entries.length?'<details class="person" data-person="'+esc(p.key)+'" '+(expanded.has(p.key)?'open':'')+'><summary>'+label+'</summary><ul>'+entries.map(e=>'<li>'+esc(e)+'</li>').join('')+'</ul></details>':'<div class="person unmatched">'+label+'</div>';
  }).join('');
  $('personOptions').innerHTML=list.map(p=>'<option value="'+esc(p.name)+'"></option>').join('');
}
document.getElementById('peopleForm').addEventListener('submit',e=>{
  e.preventDefault();
  const input=document.getElementById('personName'),names=splitNames(input.value);
  if(!names.length)return;
  let added=0;
  for(const n of names)if(registerPerson(n))added++;
  save();document.getElementById('peopleMessage').textContent=added?added+'명 추가됨':'이미 명단에 있습니다.';
  input.value='';input.focus();
});
const smallRail=window.matchMedia('(max-width:780px)');
function sizeRail(){document.getElementById('peoplePanel').open=!smallRail.matches;}
smallRail.addEventListener('change',sizeRail);sizeRail();
