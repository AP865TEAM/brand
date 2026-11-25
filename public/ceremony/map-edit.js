'use strict';

let pinDrag=null,ignoreDropClick=false;
function setMapPoint(el,p){
  if(el){el.style.left=p.x+'%';el.style.top=p.y+'%';}
}
function previewTable(surface,id,group){
  const button=surface.querySelector('[data-table="'+id+'"]');
  setMapPoint(button,group.target);
  button.classList.toggle('blocked',group.blocked);
  loungeTables[id].seats.forEach((seat,i)=>{
    setMapPoint(surface.querySelector('[data-seat-art="'+seat.row+'"]'),group.seats[i]);
    setMapPoint(surface.querySelector('[data-pin="'+seat.row+'"]'),group.seats[i]);
  });
}
function syncTableViews(id){
  const group=tableGroupAt(id,tablePosition(id));
  for(const surface of document.querySelectorAll('[data-map-surface="8"]'))previewTable(surface,id,group);
}
function dragSurface(event){
  return document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-map-surface]');
}
function dragPoint(event,surface,drag){
  const rect=surface.getBoundingClientRect();
  return {floor:Number(surface.dataset.mapSurface),
    x:bound((event.clientX-drag.offsetX-rect.left)*100/rect.width,0,100),
    y:bound((event.clientY-drag.offsetY-rect.top)*100/rect.height,0,100)};
}
function updateDrag(event){
  const drag=pinDrag,surface=dragSurface(event);
  drag.destination=null;
  if(drag.table){
    if(surface===drag.surface){
      const group=tableGroupAt(drag.table,dragPoint(event,surface,drag));
      previewTable(surface,drag.table,group);
      if(!group.blocked)drag.destination=group.target;
      drag.blocked=group.blocked;
    }else{
      previewTable(drag.surface,drag.table,tableGroupAt(drag.table,drag.origin));
      drag.blocked=false;
    }
    return;
  }
  if(!surface||phaseOf(surface)!==drag.phase){drag.ghost.remove();return;}
  const point=dragPoint(event,surface,drag);
  if(drag.ghost.parentElement!==surface)surface.append(drag.ghost);
  setMapPoint(drag.ghost,point);
  setMapPoint(drag.seatArt,point);
  drag.destination=point;
}
function endDrag(commit=false){
  const drag=pinDrag;
  if(!drag)return;
  pinDrag=null;
  if(drag.el.hasPointerCapture?.(drag.pointerId))drag.el.releasePointerCapture(drag.pointerId);
  if(!drag.active)return;
  ignoreDropClick=true;
  drag.el.classList.remove('drag-origin');
  drag.ghost?.remove();
  if(drag.table){
    if(commit&&drag.destination){
      state.positions['ceremony/'+drag.table]=drag.destination;
      save();syncTableViews(drag.table);
    }
    previewTable(drag.surface,drag.table,tableGroupAt(drag.table,tablePosition(drag.table)));
    const hint=drag.surface.closest('[data-floor-panel]').querySelector('.map-hint');
    hint.textContent=commit&&drag.blocked?'고정 바테이블과 겹칩니다. 다른 위치에 놓아 주세요.':mapHelp(8);
  }else if(commit&&drag.destination){
    moveMapPin(drag.phase,drag.row,drag.destination);
    $(mapId(drag.phase)).querySelector('[data-pin="'+drag.row+'"]')?.focus({preventScroll:true});
  }else setMapPoint(drag.seatArt,drag.origin);
}
document.addEventListener('pointerdown',event=>{
  if(event.isPrimary===false||event.button!==0)return;
  ignoreDropClick=false;
  const el=event.target.closest('[data-pin]')||event.target.closest('[data-table]');
  if(!el||placement||pinDrag)return;
  const surface=el.closest('[data-map-surface]'),rect=el.getBoundingClientRect();
  pinDrag={el,surface,phase:phaseOf(surface),row:el.dataset.pin,table:el.dataset.table,pointerId:event.pointerId,
    origin:{x:parseFloat(el.style.left),y:parseFloat(el.style.top)},
    startX:event.clientX,startY:event.clientY,offsetX:event.clientX-rect.left-rect.width/2,
    offsetY:event.clientY-rect.top-rect.height/2,active:false};
  el.setPointerCapture?.(event.pointerId);
});
document.addEventListener('pointermove',event=>{
  const drag=pinDrag;
  if(!drag||drag.pointerId!==event.pointerId)return;
  if(!drag.active){
    if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<5)return;
    drag.active=true;
    dismissEditor();
    if(!drag.table){
      drag.ghost=drag.el.cloneNode(true);
      drag.ghost.removeAttribute('data-pin');
      drag.ghost.classList.add('drag-ghost');
      drag.ghost.tabIndex=-1;drag.ghost.setAttribute('aria-hidden','true');
      drag.seatArt=drag.surface.querySelector('[data-seat-art="'+drag.row+'"]');
    }
    drag.el.classList.add('drag-origin');
  }
  event.preventDefault();
  updateDrag(event);
});
document.addEventListener('pointerup',event=>{
  if(pinDrag?.pointerId!==event.pointerId)return;
  if(pinDrag.active)updateDrag(event);
  endDrag(true);
});
for(const type of ['pointercancel','lostpointercapture']){
  document.addEventListener(type,event=>{if(pinDrag?.pointerId===event.pointerId)endDrag();});
}
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&pinDrag){event.preventDefault();endDrag();return;}
  if(pinDrag||placement)return;
  const button=event.target.closest('[data-table]'),delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
  if(!button||!delta)return;
  event.preventDefault();
  const id=button.dataset.table,center=tablePosition(id),step=event.shiftKey?3:0.5;
  const group=tableGroupAt(id,{x:center.x+delta[0]*step,y:center.y+delta[1]*step});
  const surface=button.closest('[data-map-surface]');
  if(!group.blocked){
    state.positions['ceremony/'+id]=group.target;save();syncTableViews(id);
  }
  surface.closest('[data-floor-panel]').querySelector('.map-hint').textContent=group.blocked?'고정 바테이블과 겹칩니다. 다른 위치에 놓아 주세요.':mapHelp(8);
});
window.addEventListener('blur',()=>endDrag());
