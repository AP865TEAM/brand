'use strict';
const careKey='ap865-private-care-20261201-v1';
const blankBooking=()=>({name:'',room:''});
let bookings=[blankBooking()],careStorage=true;
try{
  const rows=JSON.parse(localStorage.getItem(careKey)||'[]');
  if(Array.isArray(rows)&&rows.length)bookings=rows.filter(r=>r&&typeof r.name==='string'&&typeof r.room==='string').map(r=>({name:r.name.slice(0,80),room:r.room.slice(0,80)}));
  if(!bookings.length)bookings=[blankBooking()];
}catch{careStorage=false;}
function writeBookings(){
  try{localStorage.setItem(careKey,JSON.stringify(bookings));careStorage=true;}catch{careStorage=false;}
  if($('careStatus'))$('careStatus').textContent=careStorage?'이 기기에 저장':'현재 창에만 저장';
}
function bookingRow(booking,i){
  const field=(key,label)=>'<td><input data-booking="'+i+'" data-booking-field="'+key+'" type="text" maxlength="80" autocomplete="off" aria-label="'+(i+1)+'번 '+label+'" placeholder="'+label+'" value="'+esc(booking[key])+'"></td>';
  return '<tr>'+field('name','예약자명')+field('room','예약룸')+'</tr>';
}
function carePanel(){
  return '<section class="box care-bookings" aria-label="예약자와 예약룸"><table class="roster"><thead><tr><th scope="col">예약자명</th><th scope="col">예약룸</th></tr></thead><tbody id="bookingRows">'+bookings.map(bookingRow).join('')+'</tbody></table><div class="roster-tools"><button type="button" class="subbutton" data-add-booking>＋ 예약 추가</button><small class="storage" id="careStatus">'+(careStorage?'이 기기에 저장':'현재 창에만 저장')+'</small></div></section>';
}
document.addEventListener('input',e=>{
  const input=e.target,field=input.dataset.bookingField;
  if(field!=='name'&&field!=='room')return;
  const row=bookings[Number(input.dataset.booking)];
  if(row){row[field]=input.value;writeBookings();}
});
document.addEventListener('click',e=>{
  if(!e.target.closest('[data-add-booking]'))return;
  const row=blankBooking();bookings.push(row);writeBookings();
  $('bookingRows').insertAdjacentHTML('beforeend',bookingRow(row,bookings.length-1));
  $('bookingRows').lastElementChild.querySelector('input').focus();
});
