'use strict';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fileURL = name => typeof embeddedMedia === 'undefined' ? 'media/'+encodeURIComponent(name) : embeddedMedia[name];
const state={tasks:{},decisions:{},staff:{},extra:{},positions:{},people:{}};
let sharedLabel='공유본 확인 중';
function save(){renderPeople();if(window.guideSync)window.guideSync.record();}
const phases=Object.fromEntries(program.map(p=>[p.id,p]));
const agendaNotes={
  arrival:'1층 포토존 촬영 → 8층 접수 · 명찰 · 웰컴 드링크',
  ceremony:phases.ceremony.sequence.join(' → '),
  walk:spaces.walk.tag,
  care:'동시 운영 · 예약자별 지정 룸',
  networking:'8층 카페 · 9층 VIP 라운지 → 기념선물 전달 및 배웅'
};
$('agendaRows').insertAdjacentHTML('beforeend',phaseOrder.map(id=>{
  const p=phases[id];
  return '<li><span class="agenda-time">'+esc(p.from)+'–'+esc(p.until)+'</span><b>'+esc(spaces[id].title)+'</b><span>'+esc(agendaNotes[id])+'</span></li>';
}).join(''));
const drawings={};
let phase='arrival', filter='all', previousFocus=null;
let placement=null;
function drawing(id){
  return drawings[id] ||= {floor:spaces[id].floors[0],layer:id==='ceremony'?'guests':'staff'};
}
function phaseNav(board){
  $('timeline').innerHTML=phaseOrder.map(id=>{
    const p=phases[id],s=spaces[id];
    return '<a class="point'+(p.parallel?' parallel':'')+'" href="#phase/'+id+'" '+(!board&&id===phase?'aria-current="step"':'')+'><div class="tick"><i></i><time>'+p.from+'</time>'+(p.parallel?'<em>동시 운영</em>':'')+'</div>'+(id==='care'?'<div class="care-tile">예약자 · 예약룸</div>':'<div class="spacephoto"><img src="'+fileURL(s.image)+'" alt="'+s.alt+'"><span>'+s.floorLabel+'</span></div>')+'<strong>'+s.title+'</strong></a>';
  }).join('');
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
function rosterRow(p,id){
  const prefix=esc(id+'/'+p.row);
  const mapped=positionFor(id,p.row),floorLabel=mapped?mapped.floor+'F':p.floor;
  const input=(field,value,title,type='text')=>'<input data-post="'+prefix+'" data-field="'+field+'" '+(field==='name'?'list="personOptions" ':'')+'type="'+type+'" aria-label="'+esc((p.floor+' '+p.role).trim()+' '+title)+'" value="'+esc(value)+'" '+(type==='number'?'min="0" max="999" step="1" inputmode="numeric" placeholder="–"':'maxlength="120" placeholder="'+title+'"')+'>';
  if(id==='walk'&&!p.custom){
    const floor=parseInt(p.floor,10);
    return '<tr><td class="tour-floor"><strong>'+floor+'F</strong><span>'+esc(floorNames[floor])+'</span></td><td>'+esc(p.role)+'</td><td>'+input('name',p.name,'담당자 이름')+'</td><td>'+input('count',p.count,'인원','number')+'</td></tr>';
  }
  if(id==='walk')return '<tr><td>'+input('floor',p.floor,'층')+'</td><td>'+input('role',p.role,'역할')+'</td><td>'+input('name',p.name,'담당자 이름')+'</td><td>'+input('count',p.count,'인원','number')+'</td></tr>';
  return '<tr><td class="role">'+(p.custom?'<div class="editrole">'+(positionFor(id,p.row)?'<small>'+esc(positionFor(id,p.row).floor)+'F</small>':input('floor',p.floor,'위치'))+input('role',p.role,'역할')+'</div>':'<small>'+esc(floorLabel)+'</small><b>'+esc(p.role)+'</b>')+(!positionFor(id,p.row)?'<button class="assign-location" type="button" data-assign="'+esc(p.row)+'">도면에 배치</button>':'')+'</td><td>'+input('name',p.name,'이름')+'</td><td>'+input('count',p.count,'인원','number')+'</td></tr>';
}
function staffBlock(id){
  const rows=posts(id),tour=id==='walk';
  const cols=tour?'<th>층 · 공간</th><th>역할</th>':'<th>위치 · 역할</th>';
  return '<div class="boxhead"><h3>'+(tour?'층별 담당자':'인원 배치')+'</h3><span class="total" id="staffTotal">'+totalStaff(id)+'명 기명</span></div><table class="roster '+(tour?'tour-table':'')+'"><thead><tr>'+cols+'<th>담당자</th><th>인원</th></tr></thead><tbody id="rosterRows">'+rows.map(p=>rosterRow(p,id)).join('')+'</tbody></table><div class="roster-tools"><button class="subbutton" type="button" data-add>＋ 역할 추가</button><button class="subbutton" type="button" data-export>전체 배치표 CSV</button></div><small class="storage" id="storeLabel">'+esc(sharedLabel)+'</small>';
}
function totalStaff(id){return new Set(posts(id).flatMap(p=>splitNames(p.name).map(rosterKey))).size;}
function decisionRow(row){
  const [id,title]=row,saved=state.decisions[id]||{};
  return '<div class="decision"><button type="button" class="decision-edit" data-dec="'+id+'"><span>'+esc(title)+'</span><small class="status '+(saved.done?'done':'')+'">'+(saved.done?'완료':'결정 필요')+'</small></button>'+(saved.note?'<p class="memo">'+esc(saved.note)+'</p>':'')+'</div>';
}
function renderPhase(){
  const p=phases[phase],s=spaces[phase];
  const seq=p.sequence?'<details class="fold" open><summary>본식 순서 <small>8개 순서</small></summary><ol class="sequence">'+p.sequence.map(t=>'<li>'+t+'</li>').join('')+'</ol></details>':'';
  const actions=s.actions.map((t,i)=>'<label class="act"><input data-task="'+p.id+'-'+i+'" type="checkbox" '+(state.tasks[p.id+'-'+i]?'checked':'')+'><span>'+t+'</span></label>').join('');
  const heading='<div class="detailhead"><div><p class="time">'+p.from+' — '+p.until+(p.parallel?' · 동시 운영':'')+'</p><h2>'+s.title+'</h2></div><span>'+s.location+'</span></div>';
  if(phase==='care'){
    $('detail').innerHTML=heading+carePanel();
    return;
  }
  const crew='<section class="box staff" id="staff">'+staffBlock(phase)+'</section>';
  const cue='<section class="box cue"><div class="boxhead"><h3>체크리스트</h3></div><p class="fact">'+esc(s.tag)+'</p><div class="actions">'+actions+'</div>'+seq+'<details class="fold" open><summary>결정할 사항 <small>'+p.decisions.length+'건</small></summary>'+p.decisions.map(decisionRow).join('')+'</details></section>';
  $('detail').innerHTML=heading+(phase==='walk'?crew+'<div class="tour-cues">'+cue+'</div>':'<section class="box" id="drawing">'+drawPanel(phase)+'</section><div class="lower">'+crew+cue+'</div>');
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
  const hash=location.hash.slice(1);
  const next=hash.startsWith('phase/')?hash.slice(6):'';
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
      rows.push([p.from,p.until,spaces[id].title,at?at.floor+'F':post.floor,post.role,post.name,post.count||((post.name||'').trim()?1:''),stage]);
    }
    if(id==='ceremony')for(const guest of mapEntries(id,8,'guests')){
      if(['mc','director'].includes(guest.row))continue;
      rows.push([p.from,p.until,spaces[id].title,'8F',guest.row==='stage-guest'?'무대':'참석자',guest.name,guest.name.trim()?1:'',guest.label]);
    }
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
  if(!post||!['role','floor','name','count'].includes(field))return;
  if(field==='count'&&(!input.validity.valid||input.valueAsNumber<0))return;
  (state.staff[post] ||= {})[field]=input.value;
  save();
  if(field==='name'||field==='role'){
    for(const other of document.querySelectorAll('[data-post][data-field]')){
      if(other!==input&&other.dataset.post===post&&other.dataset.field===field)other.value=input.value;
    }
    refreshNames(post.slice(post.indexOf('/')+1));
  }
  $('staffTotal').textContent=totalStaff(phase)+'명 기명';
});
document.addEventListener('change',e=>{
  const el=e.target;
  if(el.dataset.field==='name'){
    for(const name of splitNames(el.value))registerPerson(name);
    save();
  }
  if(el.hasAttribute('data-pick-pin')&&el.value){
    const row=el.value;el.value='';
    showEditor($('drawing').querySelector('[data-map-surface]'),row);
  }
  if(el.id==='floorSelect'){drawing(phase).floor=+el.value;refreshMap();$('floorSelect').focus();}
  if(el.id==='decFilter'){filter=el.value;renderBoard();$('decFilter').focus();}
  if(el.dataset.task){state.tasks[el.dataset.task]=el.checked;save();}
  if(el.dataset.field==='count'&&!el.validity.valid){el.value=state.staff[el.dataset.post]?.count??'';}
});
document.addEventListener('click',e=>{
  const surface=e.target.closest('[data-map-surface]');
  const form=e.target.closest('.pin-editor');
  if(placement && surface===placement.surface && !form){
    const rect=surface.getBoundingClientRect();
    const x=e.detail===0?50:(e.clientX-rect.left)/rect.width*100;
    const y=e.detail===0?50:(e.clientY-rect.top)/rect.height*100;
    finishPlacement(surface,x,y);return;
  }
  const b=e.target.closest('button');
  if(!form&&!e.target.closest('[data-pin]'))dismissEditor();
  if(!b)return;
  if(b.hasAttribute('data-cancel-place')){refreshMap();return;}
  if(b.dataset.layer){drawing(phase).layer=b.dataset.layer;refreshMap();return;}
  if(b.dataset.pin){showEditor(surface,b.dataset.pin);return;}
  if(b.hasAttribute('data-place-new')||b.dataset.move){beginPlacement(b.dataset.move||'',b);return;}
  if(b.dataset.assign){
    const post=posts(phase).find(p=>p.row===b.dataset.assign);
    const floor=Number((post.floor||'').match(/^(\d+)F$/)?.[1]);
    if(spaces[phase].floors.includes(floor))drawing(phase).floor=floor;
    drawing(phase).layer='staff';refreshMap();
    $('drawing').scrollIntoView({block:'center'});
    beginPlacement(post.row,$('drawing'));return;
  }
  if(b.hasAttribute('data-add')){
    const id='custom-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6);
    (state.extra[phase] ||= []).push(id);save();
    $('rosterRows').insertAdjacentHTML('beforeend',rosterRow(posts(phase).at(-1),phase));
    $('rosterRows').lastElementChild.querySelector('input')?.focus();
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
  if(e.key==='Enter'&&e.target===placement?.surface){e.preventDefault();finishPlacement(placement.surface,50,50);}
});
$('sourceBtn').onclick=()=>openModal('참고 자료','<ul class="sources"><li><a href="https://invite.ap865.com/" target="_blank" rel="noopener">12월 1일 공식 초대장</a><small>시간 · 공간 · 프로그램</small></li><li>11월 23일 그로스 챗<small>트리 포토월 4안 · 공란 명찰 약 15개</small></li><li>11월 16일 그로스 챗<small>본식 장소 검토 · 초대장 기준 8층</small></li><li>AP865 행사 39명 블렌더 자료 · 11.05<small>1·8층 모델 및 설치·참석자 배치안. 39명은 당시 시뮬레이션 인원.</small></li><li>AP865 전층 인테리어 블렌더 자료 · 10.29<small>층별 공간 모델과 입체 전개도. 가구와 마감은 검토용.</small></li><li>신사동 피부과 공사도면 · 10.02<small>1층 및 4–10층 기본 평면도</small></li></ul>',$('sourceBtn'));
window.addEventListener('hashchange',()=>{render();if(location.hash==='#decisions')$('detail').scrollIntoView({block:'start'});else if(location.hash==='#top')window.scrollTo(0,0);});
render();
