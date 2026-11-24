const floorNames={1:'포토존',4:'스파',5:'장비 전시',6:'장비 전시',7:'장비 전시',8:'더 라운지',9:'VIP 라운지',10:'프라이빗 룸'};
const phaseOrder=['arrival','ceremony','walk','care','networking'];
const spaces={
  arrival:{title:'도착 · 접수',floorLabel:'1F · 8F',location:'1층 포토존 / 8층 접수',floors:[1,8],image:'space-arrival.webp',alt:'블렌더로 본 1층 포토존', tag:'포토월 트리 4안 · 공란 명찰 약 15개',
    posts:[['photo','1F','포토존 안내'],['welcome','8F','접수 · 명찰'],['drinks','8F','웰컴 드링크']],
    actions:['포토월 설치 확인','명단·명찰 대조','촬영 후 8층 안내','예약 케어 확인']},
  ceremony:{title:'본식 · 브랜드 토크',floorLabel:'8F',location:'8층 무대 · 스탠딩 테이블',floors:[8],image:'space-ceremony.webp',alt:'8층 블렌더 무대와 참석자 배치',tag:'사회 하 실장님 · 대표 환영사 홍관 원장님',
    posts:[['mc','8F','사회','하 실장님',1],['director','8F','환영사 · 토크','홍관 원장님',1],['tech','8F','음향 · 영상'],['stage','8F','무대 · 리본'],['photo','8F','촬영'],['draw','8F','추첨 · 건배']],
    actions:['개회·필름 재생','환영사·토크 인계','리본 커팅·촬영','추첨·건배·선물 안내']},
  walk:{title:'공간 · 장비 관람',floorLabel:'10F → 4F',location:'10층 출발 / 4층 복귀 안내',floors:[10,9,8,7,6,5,4],image:'space-walk.webp',alt:'블렌더로 본 10층 프라이빗 룸',tag:'10층 출발 · 5–7층 장비 전시 · 4층 스파',
    posts:[['start','10F','관람 출발'],['vip','9F','VIP 공간 안내'],['lounge','8F','승강기 안내'],['ex7','7F','장비 전시'],['ex6','6F','장비 전시'],['ex5','5F','장비 전시'],['return','4F','복귀 안내']],
    actions:['출발 인원 조율','층별 도슨트 인계','전시 담당 연결','8·9층 복귀 안내']},
  networking:{title:'카페 · 네트워킹',floorLabel:'8F · 9F',location:'8층 카페 / 9층 VIP 라운지',floors:[8,9],image:'space-networking.webp',alt:'8층 카페와 리셉션 블렌더 이미지',tag:'라운지 종이컵 · 코스터 · 워터 행택 입고',
    posts:[['cafe','8F','카페 · 다과'],['partner','8F','파트너 응대'],['vip','9F','VIP 응대'],['exit','출구','선물 · 배웅']],
    actions:['다과·비품 세팅','파트너·귀빈 응대','케어 복귀 인계','선물 전달·마감']},
  care:{title:'프라이빗 케어',floorLabel:'예약 관리실',location:'예약 회차별 지정실',floors:[4,5,6,7,8,9,10],image:'space-care.webp',alt:'블렌더 4층 관리실 예시',tag:'사전 예약 · 회차별 개별 인계',
    posts:[['desk','8F','예약 확인'],['pickup','지정층','픽업 · 복귀'],['room','관리실','케어 담당']],
    actions:['회차·대기 위치 확인','손님 픽업·인계','라운지 복귀 안내']}
};
