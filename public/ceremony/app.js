'use strict';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fileURL = name => typeof embeddedMedia === 'undefined' ? 'media/'+encodeURIComponent(name) : embeddedMedia[name];
const state={tasks:{},decisions:{},staff:{},extra:{},positions:{},people:{},leads:{}};
let sharedLabel='공유본 확인 중';
function save(){renderPeople();if(window.guideSync)window.guideSync.record();}
const phases=Object.fromEntries(program.map(p=>[p.id,p]));
const agendaNotes={
  arrival:'1층 접수·명찰 수령 → 희망자 포토존 촬영 → 8층 웰컴 드링크',
  ceremony:phases.ceremony.runOfShow.map(step=>step.title).join(' → '),
  walk:spaces.walk.tag,
  care:'동시 운영 · 예약자별 지정 룸',
  networking:'8층 카페 · 9층 VIP 라운지 → 기념선물 전달 및 배웅'
};
$('agendaRows').insertAdjacentHTML('beforeend',phaseOrder.map(id=>{
  const p=phases[id];
  return '<li><span class="agenda-time">'+esc(p.from)+'–'+esc(p.until)+'</span><a data-phase-link="'+id+'" href="#phase/'+id+'">'+esc(spaces[id].title)+'</a><span>'+esc(agendaNotes[id])+'</span></li>';
}).join(''));
const drawings={};
let phase='arrival', filter='all', previousFocus=null;
let placement=null;
function drawing(id){
  return drawings[id] ||= {floor:spaces[id].floors[0],layer:id==='ceremony'?'guests':'staff'};
}
function phaseNav(board){
  for(const link of $('agendaRows').querySelectorAll('[data-phase-link]')){
    if(!board&&link.dataset.phaseLink===phase)link.setAttribute('aria-current','step');
    else link.removeAttribute('aria-current');
  }
}
function posts(id){
  const base=spaces[id].posts.map(([row,floor,role,name='',count=''])=>({row,floor,role,name,count,custom:false}));
  const extra=Array.isArray(state.extra[id])?state.extra[id]:[];
  return [...base,...extra.map(row=>({row,floor:'',role:'',name:'',count:'',custom:true}))].map(p=>{
    const post={...p,...state.staff[id+'/'+p.row]};
    if(id==='ceremony' && p.row==='mc' && rosterKey(post.name)===personKey(p.name))post.name=p.name;
    return post;
  });
}
function decisionRow(row){
  const [id,title]=row,saved=state.decisions[id]||{};
  return '<div class="decision"><button type="button" class="decision-edit" data-dec="'+id+'"><span>'+esc(title)+'</span><small class="status '+(saved.done?'done':'')+'">'+(saved.done?'완료':'결정 필요')+'</small></button>'+(saved.note?'<p class="memo">'+esc(saved.note)+'</p>':'')+'</div>';
}
function ceremonyScriptPanel(p){
  const steps=p.runOfShow;
  const shortcuts=steps.map(step=>
    `<a href="#ceremony-step-${step.anchor}"><time>${esc(step.from)}</time><span>${esc(step.title)}</span></a>`
  ).join('');
  const rows=steps.map((step,i)=>{
    const until=steps[i+1]?.from||p.until;
    const lines=step.lines.map(([speaker,line])=>
      `<div class="script-line"><dt>${esc(speaker)}</dt><dd>${esc(line)}</dd></div>`
    ).join('');
    return `<li id="ceremony-step-${step.anchor}" class="script-step">
      <div class="step-heading"><span class="step-time"><time>${esc(step.from)}</time>–<time>${esc(until)}</time></span><h4>${esc(step.title)}</h4></div>
      <div class="step-body"><p class="stage-cue"><b>현장 큐</b> ${esc(step.cue)}</p><dl>${lines}</dl></div>
    </li>`;
  }).join('');
  const {walk,care,networking}=phases;
  return `<section class="box script-panel" id="ceremony-script" aria-labelledby="script-title">
    <div class="script-head"><h3 id="script-title">본식 순서·대본</h3><span>사회 하태경 · 8층 더 라운지</span></div>
    <p class="script-note">본식 ${p.from}–${p.until} · 세부 시간과 멘트는 리허설용 초안입니다. [ ] 안은 현장 확정 내용을 넣어 읽습니다.</p>
    <nav class="script-index" aria-label="본식 순서 바로가기">${shortcuts}</nav>
    <ol class="script-steps">${rows}</ol>
    <div class="after-ceremony"><h4>본식 이후</h4>
      <p><b>${walk.from}–${walk.until}</b><span>공간 관람 · 10층에서 출발해 4층 스파까지 자유 관람</span></p>
      <p><b>${care.from}–${care.until}</b><span>프라이빗 케어 · 관람과 동시에 예약 회차별로 지정 룸 이용</span></p>
      <p><b>${networking.from}–${networking.until}</b><span>네트워킹 · 8층 카페와 9층 VIP 라운지. 케어를 마친 손님도 합류</span></p>
      <p><b>${networking.until}</b><span>행사 종료 · 기념선물 전달 및 배웅</span></p>
    </div></section>`;
}
function renderPhase(){
  const p=phases[phase],s=spaces[phase];
  const seq=p.runOfShow?'<details class="fold" open><summary>본식 순서 <small>'+p.runOfShow.length+'개 순서</small></summary><ol class="sequence">'+p.runOfShow.map(step=>'<li>'+esc(step.title)+'</li>').join('')+'</ol></details>':'';
  const actions=s.actions.map((t,i)=>'<label class="act"><input data-task="'+p.id+'-'+i+'" type="checkbox" '+(state.tasks[p.id+'-'+i]?'checked':'')+'><span>'+t+'</span></label>').join('');
  const heading='<div class="detailhead"><div><p class="time">'+p.from+' — '+p.until+(p.parallel?' · 동시 운영':'')+'</p><h2>'+s.title+'</h2></div><span>'+s.location+'</span></div>';
  if(phase==='care'){
    $('detail').innerHTML=heading+carePanel();
    return;
  }
  const plan=phase==='walk'?'':'<section class="box" id="drawing">'+drawPanel(phase)+'</section>';
  const crew=phase==='arrival'?floorLeadsPanel(Object.keys(floorNames)):phase==='walk'?floorLeadsPanel(s.floors):'';
  const cue='<section class="box cue"><div class="boxhead"><h3>체크리스트</h3></div><p class="fact">'+esc(s.tag)+'</p><div class="actions">'+actions+'</div>'+seq+'<details class="fold" open><summary>결정할 사항 <small>'+p.decisions.length+'건</small></summary>'+p.decisions.map(decisionRow).join('')+'</details></section>';
  $('detail').innerHTML=heading+(p.runOfShow?ceremonyScriptPanel(p):'')+plan+crew+cue;
}
function renderBoard(){
  const all=program.filter(p=>p.id!=='care').flatMap(p=>p.decisions),done=all.filter(d=>state.decisions[d[0]]?.done).length;
  const choices=['all','open','done'].map((v,i)=>'<option value="'+v+'" '+(v===filter?'selected':'')+'>'+['전체','결정 필요','완료'][i]+'</option>').join('');
  $('detail').innerHTML='<div class="detailhead"><div><p class="time">결정 필요 '+(all.length-done)+' · 완료 '+done+'</p><h2>결정 보드</h2></div><select id="decFilter" aria-label="결정 상태">'+choices+'</select></div>'+phaseOrder.filter(id=>id!=='care').map(id=>{
    const rows=phases[id].decisions.filter(d=>filter==='all'||(filter==='done')===!!state.decisions[d[0]]?.done);
    return rows.length?'<section class="boardgroup"><h3>'+spaces[id].title+'</h3><div>'+rows.map(decisionRow).join('')+'</div></section>':'';
  }).join('')+((filter==='done'&&!done)||(filter==='open'&&done===all.length)?'<p>해당 항목이 없습니다.</p>':'');
}
function render(){
  endDrag();
  const hash=location.hash.slice(1);
  const next=hash.startsWith('phase/')?hash.slice(6):isScriptAnchor(hash)?'ceremony':hash==='floor-leads'?'arrival':'';
  if(Object.hasOwn(phases,next))phase=next;
  const board=hash==='decisions';
  placement=null;
  dismissEditor();
  phaseNav(board);renderPeople();
  if(board)renderBoard();else renderPhase();
  if(board)$('boardLink').setAttribute('aria-current','page');else $('boardLink').removeAttribute('aria-current');
}
function openModal(title,body,opener,wide=false){
  previousFocus=opener;
  $('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modal').classList.toggle('wide',wide);$('modal').showModal();
}
$('modalClose').onclick=()=>$('modal').close();
$('modal').addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus();else if(previousFocus?.dataset.dec)document.querySelector('[data-dec="'+previousFocus.dataset.dec+'"]')?.focus();$('modalBody').innerHTML='';if(placement)refreshMap();});
$('modal').addEventListener('click',e=>{if(e.target===$('modal')){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)e.target.close();}});
function csv(){
  const rows=[['시작','종료','페이즈','위치','역할','담당자','인원','도면 위치']];
  for(const id of phaseOrder.filter(id=>id!=='care')){
    const p=phases[id];
    for(const post of posts(id)){
      const at=positionFor(id,post.row);
      const stage=id==='ceremony'&&stagePlaces.some(([key])=>key===post.row)?stagePoint(post.row).label:'';
      let name=post.name;
      const floor=parseInt(post.floor,10);
      if(id==='walk'&&Object.hasOwn(floorNames,floor)){
        const slots=Array.from(floorAssignments(floor));
        name=slots.filter(([key])=>key.startsWith(floor+'/old-'+post.row+'-')||
          (!post.custom&&(key===floor+'/first'||key.startsWith(floor+'/new-'))))
          .map(([,value])=>value.trim()).filter(Boolean).join(', ');
      }
      rows.push([p.from,p.until,spaces[id].title,at?at.floor+'F':post.floor,post.role,name,post.count||(splitNames(name).length||''),stage]);
    }
    if(id==='ceremony')for(const guest of mapEntries(id,8,'guests')){
      if(['mc','director'].includes(guest.row))continue;
      rows.push([p.from,p.until,spaces[id].title,'8F',guest.row==='stage-guest'?'무대':'참석자',guest.name,guest.name.trim()?1:'',guest.label]);
    }
  }
  for(const floor of Object.keys(floorNames)){
    for(const name of floorAssignments(floor).values())if(name.trim())rows.push(['','','층별 담당자',floor+'F','',name,'','']);
  }
  const quote=v=>{const x=String(v??'');return '"'+(/^[\s]*[=+@-]/.test(x)?"'":'')+x.replaceAll('"','""')+'"';};
  return '\uFEFF'+rows.map(r=>r.map(quote).join(',')).join('\r\n');
}
function exportCSV(){
  const url=URL.createObjectURL(new Blob([csv()],{type:'text/csv;charset=utf-8;'})),a=document.createElement('a');
  a.href=url;a.download='AP865-1201-Staff.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.addEventListener('input',e=>{
  const input=e.target,post=input.dataset.post,field=input.dataset.field;
  if(input.dataset.lead){state.leads[input.dataset.lead]=input.value;save();return;}
  if(!post||!['role','name'].includes(field))return;
  (state.staff[post] ||= {})[field]=input.value;
  save();
  if(field==='name'||field==='role'){
    for(const other of document.querySelectorAll('[data-post][data-field]')){
      if(other!==input&&other.dataset.post===post&&other.dataset.field===field)other.value=input.value;
    }
    refreshNames(post.slice(post.indexOf('/')+1));
  }
});
document.addEventListener('change',e=>{
  const el=e.target;
  if(el.dataset.field==='name'||el.dataset.lead){
    for(const name of splitNames(el.value))registerPerson(name);
    save();
  }
  if(el.hasAttribute('data-pick-pin')&&el.value){
    const row=el.value;el.value='';
    cancelPlacement();
    const panel=el.closest('[data-floor-panel]');
    if(!positionFor(phase,row)&&drawing(phase).layer==='staff')beginPlacement(row,panel);
    else showEditor(panel.querySelector('[data-map-surface]'),row);
  }
  if(el.id==='floorSelect'){drawing(phase).floor=+el.value;refreshMap();$('floorSelect').focus();}
  if(el.id==='decFilter'){filter=el.value;renderBoard();$('decFilter').focus();}
  if(el.dataset.task){state.tasks[el.dataset.task]=el.checked;save();}
});
document.addEventListener('click',e=>{
  if(ignoreDropClick&&e.detail!==0){ignoreDropClick=false;e.preventDefault();return;}
  if(!placement&&(e.target.closest('[data-table]')||e.target.closest('.fixed-bar'))){dismissEditor();return;}
  const surface=e.target.closest('[data-map-surface]');
  const form=e.target.closest('.pin-editor');
  const pin=e.target.closest('[data-pin]');
  if(surface && !form && (placement?placement.surfaces.includes(surface):!pin)){
    const rect=surface.getBoundingClientRect();
    const x=e.detail===0?50:(e.clientX-rect.left)/rect.width*100;
    const y=e.detail===0?50:(e.clientY-rect.top)/rect.height*100;
    finishPlacement(surface,x,y);return;
  }
  const b=e.target.closest('button');
  if(!form&&!e.target.closest('[data-pin]'))dismissEditor();
  if(!b)return;
  if(b.hasAttribute('data-dismiss-point')){dismissEditor(true);return;}
  if(b.hasAttribute('data-cancel-place')){refreshMap();return;}
  if(b.dataset.layer){drawing(phase).layer=b.dataset.layer;refreshMap();return;}
  if(b.dataset.deletePin){removeMapPin(b.dataset.deletePin);return;}
  if(b.dataset.pin){cancelPlacement();showEditor(surface,b.dataset.pin);return;}
  if(b.hasAttribute('data-place-new')||b.dataset.move){
    const panel=b.closest('[data-floor-panel]');
    beginPlacement(b.dataset.move||'',b.dataset.move?null:panel);
    if(!b.dataset.move)panel.querySelector('[data-map-surface]').scrollIntoView({block:'nearest'});
    return;
  }
  if(b.dataset.addLead||b.dataset.removeLead){
    const group=b.closest('[data-lead-floor]'),floor=group.dataset.leadFloor;
    const added=Boolean(b.dataset.addLead);
    const key=added?floor+'/new-'+crypto.randomUUID():b.dataset.removeLead;
    state.leads[key]=added?'':false;
    save();group.innerHTML=floorFields(floor);
    group.querySelector(added?'[data-lead="'+key+'"]':'[data-add-lead]').focus();
    return;
  }
  if(b.hasAttribute('data-export'))exportCSV();
  if(b.dataset.dec){
    const id=b.dataset.dec,d=program.flatMap(p=>p.decisions).find(r=>r[0]===id),old=state.decisions[id]||{};
    openModal(d[1],'<p class="context">'+esc(d[2])+' · '+esc(d[3])+'</p><p>'+esc(d[4])+'</p><form id="decForm"><label>상태<select id="status"><option value="open">결정 필요</option><option value="done">완료</option></select></label><label>결정 메모<textarea id="memo" maxlength="1500"></textarea></label><button class="primary">저장</button></form>',b);
    $('status').value=old.done?'done':'open';$('memo').value=old.note||'';
    $('decForm').onsubmit=ev=>{ev.preventDefault();state.decisions[id]={done:$('status').value==='done',note:$('memo').value.trim()};save();if(location.hash==='#decisions')renderBoard();else b.closest('.decision').outerHTML=decisionRow(d);$('modal').close();};
  }
});
document.addEventListener('keydown',e=>{
  if(!placement||e.target.closest('.pin-editor'))return;
  if(e.key==='Escape'){e.preventDefault();refreshMap();}
  if(e.key==='Enter'&&placement.surfaces.includes(e.target)){e.preventDefault();finishPlacement(e.target,50,50);}
});
$('sourceBtn').onclick=()=>openModal('참고 자료','<ul class="sources"><li>1·8층 공간 배치<small>11월 25일 통합 편집 블렌더 장면 · 1층 심볼 포토존 / 8층 행사장</small></li><li><a href="https://invite.ap865.com/" target="_blank" rel="noopener">12월 1일 공식 초대장</a><small>시간 · 공간 · 프로그램</small></li><li>11월 23일 그로스 챗<small>트리 포토월 4안 · 공란 명찰 약 15개</small></li><li>11월 16일 그로스 챗<small>본식 장소 검토 · 초대장 기준 8층</small></li><li>AP865 행사 39명 블렌더 자료 · 11.05<small>1·8층 모델 및 설치·참석자 배치안. 39명은 당시 시뮬레이션 인원.</small></li><li>AP865 전층 인테리어 블렌더 자료 · 10.29<small>층별 공간 모델과 입체 전개도. 가구와 마감은 검토용.</small></li><li>신사동 피부과 공사도면 · 10.02<small>1층 및 4–10층 기본 평면도</small></li></ul>',$('sourceBtn'));
function isScriptAnchor(hash){return hash==='ceremony-script'||/^ceremony-step-\d+$/.test(hash);}
function navigateGuide(){
  // The former talk now belongs to the director’s welcome address.
  const hash=location.hash==='#ceremony-step-4'?'ceremony-step-3':location.hash.slice(1);
  // Keep the active link and reading position when moving between script entries.
  if(!isScriptAnchor(hash)||!$(hash))render();
  if(isScriptAnchor(hash))$(hash)?.scrollIntoView({block:'start'});
  else if(hash==='floor-leads')$('floor-leads')?.scrollIntoView({block:'start'});
  else if(hash==='decisions'||hash.startsWith('phase/'))$('detail').scrollIntoView({block:'start'});
  else if(hash==='top')window.scrollTo(0,0);
}
window.addEventListener('hashchange',navigateGuide);
navigateGuide();
