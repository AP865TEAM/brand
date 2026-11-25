'use strict';

// Furniture and seat markers share the camera projection of the 8F base image.
const loungeTables=Object.fromEntries(tableCenters.map(([x,y],i)=>{
  const id='T'+String(i+1).padStart(2,'0');
  return [id,{origin:planPoint(x,y),seats:guestPlaces.filter(p=>p.row.startsWith(id+'-'))}];
}));
const [barLeft,barTop]=planPixels(-4.4324,-1.4077);
const [barRight,barBottom]=planPixels(-3.8824,-3.4077);
const cafeBar={left:barLeft,top:barTop,right:barRight,bottom:barBottom};
const silhouettes=[[0,1,2,3],[3,4,1,0],[0,1,2,3],[3,4,1,0],[5,4,3,6,1],[3,6,8,7,4],[5,4,3,6,1]];
function tablePosition(id){return state.positions['ceremony/'+id]||loungeTables[id].origin;}
function seatPosition(seat){
  const saved=state.positions['ceremony/'+seat.row];
  const id=seat.row.split('-')[0],table=loungeTables[id];
  if(!table)return saved||seat;
  const p=saved||seat,center=tablePosition(id);
  return {floor:8,x:bound(p.x+center.x-(p.tableX??table.origin.x),0,100),y:bound(p.y+center.y-(p.tableY??table.origin.y),0,100)};
}
function pointStyle(p){return 'left:'+p.x+'%;top:'+p.y+'%';}
function loungeFurniture(){
  const bar='<div class="fixed-bar" role="img" aria-label="카페 바테이블 · 고정" style="left:'+cafeBar.left/806*100+'%;top:'+cafeBar.top/588*100+'%;width:'+(cafeBar.right-cafeBar.left)/806*100+'%;height:'+(cafeBar.bottom-cafeBar.top)/588*100+'%"><span>고정 바테이블</span></div>';
  const tables=Object.entries(loungeTables).map(([id,table],i)=>{
    const seats=table.seats.map((p,j)=>'<span aria-hidden="true" class="seat-art" data-seat-art="'+p.row+'" style="'+pointStyle(seatPosition(p))+';background-position:'+silhouettes[i][j]*12.5+'% center"></span>').join('');
    return seats+'<button type="button" class="stand-table" data-table="'+id+'" style="'+pointStyle(tablePosition(id))+'" aria-label="'+id+' 스탠드테이블 이동" title="'+id+' 이동 · 드래그 또는 방향키">'+id+'</button>';
  }).join('');
  return bar+tables;
}
function tableGroupAt(id,desired){
  const center=tablePosition(id),seats=loungeTables[id].seats.map(seatPosition);
  const xs=[center.x,...seats.map(p=>p.x)],ys=[center.y,...seats.map(p=>p.y)];
  const marginX=21/806*100,marginY=21/588*100;
  const dx=bound(desired.x-center.x,Math.min(0,marginX-Math.min(...xs)),Math.max(0,100-marginX-Math.max(...xs)));
  const dy=bound(desired.y-center.y,Math.min(0,marginY-Math.min(...ys)),Math.max(0,100-marginY-Math.max(...ys)));
  const target={floor:8,x:center.x+dx,y:center.y+dy};
  const x=target.x*806/100,y=target.y*588/100;
  const blocked=Math.hypot(x-bound(x,cafeBar.left,cafeBar.right),y-bound(y,cafeBar.top,cafeBar.bottom))<18;
  return {target,blocked,seats:seats.map(p=>({x:p.x+dx,y:p.y+dy}))};
}
