'use strict';
// Names from the 직원 정보 sheet, reviewed 2026-11-24.
const staffDirectory=[
  '홍관','박용호','전유미','조윤채','최경희','김연경','문예린','심은기','윤다예','김근아',
  '문영주','황선주','정유철','김도현','이지윤','최재식','문혜령','이채은','최연우',
  '이승화','이정수','하태경','안서영','서한별','양정현','이하은','김명',
  '이소현','최진영','김하나','이희진'
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
function renderPeople(){
  const names=new Map(staffDirectory.map(name=>[rosterKey(name),name]));
  const add=name=>{if(name&&!names.has(rosterKey(name)))names.set(rosterKey(name),name);};
  Object.values(state.people).forEach(add);
  for(const value of Object.values(state.staff))splitNames(value.name).forEach(add);
  for(const name of Object.values(state.leads))if(typeof name==='string')add(name.trim());
  const options=Array.from(names.values()).sort((a,b)=>a.localeCompare(b,'ko'));
  const markup=options.map(name=>'<option value="'+esc(name)+'"></option>').join('');
  if(markup!==lastOptions){$('personOptions').innerHTML=markup;lastOptions=markup;}
}
let lastOptions='';

function floorAssignments(floor){
  // Keep names entered in the former tour table, including rows with several names.
  const prefix=floor+'/';
  const slots=new Map([[prefix+'first','']]);
  for(const post of posts('walk')){
    if(parseInt(post.floor,10)!==Number(floor))continue;
    splitNames(post.name).forEach((name,i)=>{
      const slot=!post.custom&&i===0?'first':'old-'+post.row+'-'+i;
      slots.set(prefix+slot,name);
    });
  }
  for(const [key,value] of Object.entries(state.leads)){
    if(!key.startsWith(prefix))continue;
    if(value===false)slots.delete(key);else slots.set(key,value);
  }
  return slots;
}
function floorFields(floor){
  const slots=floorAssignments(floor);
  let index=0;
  const fields=Array.from(slots,([key,name])=>{
    const label=floor+'층 담당자 '+(++index);
    const remove=key.endsWith('/first')?'':'<button class="lead-remove" type="button" data-remove-lead="'+esc(key)+'" aria-label="'+label+' 삭제">×</button>';
    return '<div class="lead-field"><input type="text" maxlength="60" list="personOptions" placeholder="이름" aria-label="'+label+'" data-lead="'+esc(key)+'" value="'+esc(name)+'">'+remove+'</div>';
  }).join('');
  return fields+'<button type="button" class="lead-add" data-add-lead="'+floor+'" aria-label="'+floor+'층 담당자 추가">＋ 추가</button>';
}
function floorLeadsPanel(floors,id){
  const rows=floors.map(floor=>'<tr><th scope="row">'+floor+'층</th><td><div class="lead-fields" data-lead-floor="'+floor+'">'+floorFields(floor)+'</div></td></tr>').join('');
  return '<section class="box floor-leads" id="'+id+'" aria-label="층별 담당자"><table><thead><tr><th scope="col">층</th><th scope="col">담당자</th></tr></thead><tbody>'+rows+'</tbody></table></section>';
}
