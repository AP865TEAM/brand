'use strict';

// Pixel centres on the cropped 8F vendor drawing (806 × 588 reference).
const tablePlaces = [
  [[602,501],[671,501],[673,545],[602,545]],
  [[494,501],[562,501],[562,545],[494,545]],
  [[602,417],[671,417],[673,460],[602,460]],
  [[494,417],[562,417],[562,460],[494,460]],
  [[203,384],[253,370],[286,410],[255,454],[204,439]],
  [[108,327],[151,299],[193,335],[161,394],[122,378]],
  [[406,344],[449,324],[492,371],[447,416],[396,393]]
];
function vendorPoint(x,y){return {floor:8,x:x/806*100,y:y/588*100};}
const stagePlaces=[['mc',738,380],['director',740,442],['stage-guest',739,504]];
const guestPlaces=tablePlaces.flatMap((points,i)=>points.map(([x,y],j)=>({
  row:'T'+String(i+1).padStart(2,'0')+'-'+(j+1),label:'T'+String(i+1).padStart(2,'0')+' · '+(j+1)+'번',
  short:String(j+1),...vendorPoint(x,y)
}))).concat(stagePlaces.map(([row,x,y],i)=>({row,label:'무대 '+(i+1),short:'무'+(i+1),...vendorPoint(x,y)})));
const stagePoint=(row)=>guestPlaces.find(p=>p.row===row);
const defaultPosts={
  arrival:{photo:[1,85,76],welcome:[8,44,75],drinks:[8,23,54]},
  ceremony:{mc:[8,stagePoint('mc').x,stagePoint('mc').y],director:[8,stagePoint('director').x,stagePoint('director').y],tech:[8,43,89],stage:[8,84,63],photo:[8,70,47],draw:[8,72,86]},
  walk:{start:[10,43,49],vip:[9,42,50],lounge:[8,69,45],ex7:[7,43,48],ex6:[6,43,48],ex5:[5,43,48],return:[4,42,48]},
  care:{desk:[8,44,75]},
  networking:{cafe:[8,23,54],partner:[8,54,60],vip:[9,42,50]}
};
function positionFor(id,row){
  const marked=state.positions[id+'/'+row];
  if(marked && Number.isFinite(marked.x) && Number.isFinite(marked.y))return marked;
  const where=defaultPosts[id]?.[row];
  if(where)return {floor:where[0],x:where[1],y:where[2]};
}
function guestLayer(id,floor){return id==='ceremony'&&floor===8;}
function mapEntries(id,floor,layer){
  const staff=posts(id);
  if(layer==='guests'&&guestLayer(id,floor))return guestPlaces.map(p=>{
    const linked=staff.find(s=>s.row===p.row);
    return {...p,...(linked?state.positions[id+'/'+p.row]:{}),name:linked?.name??state.staff[id+'/'+p.row]?.name??'',label:p.label+(linked?' · '+linked.role:'')};
  });
  return staff.flatMap(p=>{
    const loc=positionFor(id,p.row);
    return loc?.floor===floor?[{...loc,row:p.row,label:p.role||'추가 위치',short:'',name:p.name}]:[];
  });
}
function mapFile(floor){
  if(floor===8)return 'event-8-7tables.webp';
  return floor===1?'event-1.webp':'plan-'+floor+'f.webp';
}
function mapCaption(floor){
  if(floor===1)return '입구–옆문 레드카펫 · 포토월 트리 4안';
  if(floor===8)return '테이블 '+tablePlaces.length+'개 · 테이블 '+(guestPlaces.length-stagePlaces.length)+'자리 / 무대 '+stagePlaces.length+'자리';
  return '층별 공사 평면도';
}
function bound(n,min,max){return Math.max(min,Math.min(max,n));}
function mapPin(entry,guest){
  const title=entry.label+(entry.name?' · '+entry.name:' · 이름 입력');
  return '<button type="button" class="map-pin '+(guest?'guest':'crew')+(entry.name?' filled':'')+(entry.x>85?' left-label':'')+'" data-pin="'+esc(entry.row)+'" style="left:'+entry.x+'%;top:'+entry.y+'%" aria-label="'+esc(title)+'" title="'+esc(title)+'"><span class="pin-dot">'+(guest?esc(entry.short):'')+'</span><span class="pin-label">'+esc(entry.name||(guest?'':entry.label))+'</span></button>';
}
function mapCanvas(id,floor,layer){
  const guest=layer==='guests'&&guestLayer(id,floor);
  const carpet=floor===1?'<span class="side-carpet" role="img" aria-label="입구 카펫에서 옆문까지 이어지는 레드카펫">옆문</span>':'';
  return '<div class="map-scroll"><div class="map-surface" data-map-surface="'+floor+'" tabindex="-1" aria-label="'+floor+'층 행사 배치도"><img class="map-art" src="'+fileURL(mapFile(floor))+'" alt="'+floor+'층 행사 배치도">'+carpet+'<div class="pins">'+mapEntries(id,floor,layer).map(p=>mapPin(p,guest)).join('')+'</div></div></div>';
}
function floorPanel(id,floor){
  const layer=drawing(id).layer;
  const label=id==='arrival'?(floor===1?'1층 포토존':'8층 접수'):floor+'층 '+floorNames[floor];
  const entries=mapEntries(id,floor,layer);
  const choices=entries.map(p=>'<option value="'+esc(p.row)+'">'+esc(p.label+(p.name?' · '+p.name:''))+'</option>').join('');
  const layers=guestLayer(id,floor)?'<div class="layer-pick" role="group" aria-label="인원 구분">'+[['guests','참석자'],['staff','운영 인력']].map(([k,n])=>'<button type="button" data-layer="'+k+'" aria-pressed="'+(layer===k)+'">'+n+'</button>').join('')+'</div>':'';
  return '<section class="floor-panel" data-floor-panel="'+floor+'" aria-label="'+label+'">'+
    (id==='arrival'?'<h4 class="floor-title">'+label+'</h4>':'')+
    '<div class="space-stage"><div class="model-controls" role="group" aria-label="'+floor+'층 도면 편집">'+
      '<button type="button" class="map-ghost" data-place-new>＋ 위치 추가</button>'+
      '<select class="map-ghost" data-pick-pin aria-label="'+floor+'층 인원 배치"><option value="">인원 배치</option>'+choices+'</select></div>'+
    '<figure class="space-model"><figcaption>'+floor+'F · 입체 전개도</figcaption><img src="'+fileURL('model-'+floor+'.webp')+'" alt="'+floor+'층 블렌더 입체 전개도"></figure>'+
    '<section class="mini-map" aria-label="'+floor+'층 행사 배치도"><div class="map-heading"><h4>행사 배치도</h4>'+layers+'</div>'+
    mapCanvas(id,floor,layer)+'<div class="map-hint" aria-live="polite">'+mapHelp+'</div></section></div>'+
    '<small class="map-caption">'+mapCaption(floor)+(layer==='staff'?' · 운영 위치 가안':'')+'</small></section>';
}
const mapHelp='빈 곳을 눌러 운영 위치 추가 · 아이콘을 눌러 이름 입력';
function drawPanel(id){
  const floors=spaces[id].floors;
  if(id==='arrival'){
    return '<div class="boxhead"><h3>공간 배치</h3></div><div class="floor-pair">'+floors.map(floor=>floorPanel(id,floor)).join('')+'</div>';
  }
  const selected=drawing(id).floor;
  const options=floors.map(f=>'<option value="'+f+'" '+(f===selected?'selected':'')+'>'+f+'F · '+floorNames[f]+'</option>').join('');
  return '<div class="boxhead"><h3>공간 배치</h3><select id="floorSelect" aria-label="두 도면의 층 선택">'+options+'</select></div>'+floorPanel(id,selected);
}
function refreshMap(){
  dismissEditor();placement=null;$('drawing').innerHTML=drawPanel(phase);
}
function showEditor(surface,row){
  dismissEditor();
  const d=drawing(phase),entry=mapEntries(phase,Number(surface.dataset.mapSurface),d.layer).find(p=>p.row===row);
  if(!entry)return;
  const custom=d.layer==='staff'&&(state.extra[phase]||[]).includes(row);
  const key=esc(phase+'/'+row);
  const roleField=custom?'<label>위치 · 역할<input data-post="'+key+'" data-field="role" maxlength="120" value="'+esc(entry.label)+'"></label>':'';
  const html=roleField+'<label>'+esc(custom?'담당자 이름':entry.label)+'<input list="personOptions" type="text" maxlength="120" data-post="'+key+'" data-field="name" value="'+esc(entry.name)+'" placeholder="이름 입력"></label><div>'+(d.layer==='staff'?'<button type="button" data-move="'+esc(row)+'">위치 이동</button>':'')+'<button class="finish" type="submit">완료</button></div>';
  const box=openMapForm(surface,entry,html,'[data-field="name"]');
  box.dataset.editor=row;
  box.onsubmit=e=>{e.preventDefault();dismissEditor(true);};
}
function openMapForm(surface,point,html,focusSelector){
  const box=document.createElement('form');
  box.className='pin-editor';box.innerHTML=html;
  surface.append(box);
  const pinX=surface.clientWidth*point.x/100,pinY=surface.clientHeight*point.y/100;
  const boxX=bound(pinX-box.offsetWidth/2,3,Math.max(3,surface.clientWidth-box.offsetWidth-3));
  const boxY=pinY>box.offsetHeight+15?pinY-box.offsetHeight-11:bound(pinY+12,3,Math.max(3,surface.clientHeight-box.offsetHeight-3));
  box.style.left=boxX+'px';box.style.top=boxY+'px';
  const input=box.querySelector(focusSelector);input.focus({preventScroll:true});input.select();
  box.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();dismissEditor(true);}};
  return box;
}
function newPointEditor(surface,point){
  dismissEditor();cancelPlacement();
  const dot=document.createElement('span');
  dot.className='draft-pin';dot.style.left=point.x+'%';dot.style.top=point.y+'%';surface.append(dot);
  const html='<label>위치 · 역할<input data-new-role maxlength="120" placeholder="예: 입구 안내"></label><label>담당자 이름<input data-new-name list="personOptions" maxlength="120" placeholder="이름 입력"></label><div><button type="button" data-dismiss-point>취소</button><button type="submit" class="finish">위치 추가</button></div>';
  const box=openMapForm(surface,point,html,'[data-new-role]');
  box.onsubmit=e=>{
    e.preventDefault();
    const role=box.querySelector('[data-new-role]').value.trim()||'추가 위치';
    const name=box.querySelector('[data-new-name]').value.trim();
    const row='custom-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
    (state.extra[phase] ||= []).push(row);
    state.staff[phase+'/'+row]={floor:point.floor+'F',role,name,count:''};
    state.positions[phase+'/'+row]=point;
    for(const person of splitNames(name))registerPerson(person);
    drawing(phase).layer='staff';
    save();refreshMap();$('staff').innerHTML=staffBlock(phase);
    $('drawing').querySelector('[data-pin="'+row+'"]')?.focus({preventScroll:true});
  };
}
function dismissEditor(focus=false){
  for(const box of document.querySelectorAll('.pin-editor')){
    const surface=box.parentElement;
    const anchor=[...surface.querySelectorAll('[data-pin]')].find(p=>p.dataset.pin===box.dataset.editor);
    box.remove();surface.querySelector('.draft-pin')?.remove();
    if(focus)(anchor||surface).focus({preventScroll:true});
  }
}
function refreshNames(row){
  if(!$('drawing'))return;
  const pin=$('drawing').querySelector('[data-pin="'+row+'"]');
  if(!pin)return;
  const panel=pin.closest('[data-floor-panel]'),layer=drawing(phase).layer;
  const entry=mapEntries(phase,Number(panel.dataset.floorPanel),layer).find(p=>p.row===row);
  const option=Array.from(panel.querySelector('[data-pick-pin]').options||[]).find(o=>o.value===row);
  if(option)option.textContent=entry.label+(entry.name?' · '+entry.name:'');
  const title=entry.label+(entry.name?' · '+entry.name:' · 이름 입력');
  pin.querySelector('.pin-label').textContent=entry.name||(layer==='guests'?'':entry.label);
  pin.setAttribute('aria-label',title);pin.title=title;pin.classList.toggle('filled',Boolean(entry.name));
}
function cancelPlacement(){
  if(!placement)return;
  for(const surface of placement.surfaces){
    surface.classList.remove('placing');
    surface.closest('[data-floor-panel]').querySelector('.map-hint').textContent=mapHelp;
  }
  placement=null;
}
function beginPlacement(row,panel){
  cancelPlacement();dismissEditor();
  const surfaces=Array.from((panel||$('drawing')).querySelectorAll('[data-map-surface]'));
  placement={row,surfaces};
  for(const surface of surfaces){
    surface.classList.add('placing');
    surface.closest('[data-floor-panel]').querySelector('.map-hint').innerHTML='배치할 위치 선택 <button type="button" class="quiet" data-cancel-place>취소</button>';
  }
  surfaces[0].focus({preventScroll:true});
}
function finishPlacement(surface,x,y){
  const row=placement?.row;
  const floor=Number(surface.dataset.mapSurface);
  const point={floor,x:bound(x,0,100),y:bound(y,0,100)};
  if(!row){newPointEditor(surface,point);return;}
  if((state.extra[phase]||[]).includes(row))(state.staff[phase+'/'+row] ||= {}).floor=floor+'F';
  state.positions[phase+'/'+row]=point;
  save();refreshMap();$('staff').innerHTML=staffBlock(phase);
  showEditor($('drawing').querySelector('[data-map-surface="'+floor+'"]'),row);
}
