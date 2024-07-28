export const placeTypeMappings: Record<string, string> = {
  amusement_center: '놀이공원',
  amusement_park: '놀이공원',
  aquarium: '수족관',
  banquet_hall: '연회장',
  bowling_alley: '볼링장',
  casino: '카지노',
  community_center: '커뮤니티 센터',
  convention_center: '컨벤션 센터',
  cultural_center: '문화 센터',
  dog_park: '강아지 공원',
  event_venue: '행사 장소',
  hiking_area: '하이킹 지역',
  historical_landmark: '역사적 랜드마크',
  marina: '마리나',
  movie_rental: '영화 대여점',
  movie_theater: '영화관',
  national_park: '국립공원',
  night_club: '나이트클럽',
  park: '공원',
  tourist_attraction: '관광 명소',
  visitor_center: '관광 안내 센터',
  wedding_venue: '웨딩 장소',
  zoo: '동물원',

  american_restaurant: '미국 음식점',
  bakery: '제과점',
  bar: '바',
  barbecue_restaurant: '바비큐 레스토랑',
  brazilian_restaurant: '브라질 음식점',
  breakfast_restaurant: '아침 식사 음식점',
  brunch_restaurant: '브런치 음식점',
  cafe: '카페',
  chinese_restaurant: '중식',
  coffee_shop: '커피숍',
  fast_food_restaurant: '패스트푸드 음식점',
  french_restaurant: '프랑스 음식점',
  greek_restaurant: '그리스 음식점',
  hamburger_restaurant: '햄버거 음식점',
  ice_cream_shop: '아이스크림 가게',
  indian_restaurant: '인도 음식점',
  indonesian_restaurant: '인도네시아 음식점',
  italian_restaurant: '이탈리아 음식점',
  japanese_restaurant: '일식',
  korean_restaurant: '한식',
  lebanese_restaurant: '레바논 음식점',
  meal_delivery: '식사 배달',
  meal_takeaway: '식사 포장',
  mediterranean_restaurant: '지중해 음식점',
  mexican_restaurant: '멕시코 음식점',
  middle_eastern_restaurant: '중동 음식점',
  pizza_restaurant: '피자 음식점',
  ramen_restaurant: '라면 음식점',
  restaurant: '음식점',
  food: '음식점',
  sandwich_shop: '샌드위치 가게',
  seafood_restaurant: '해산물 음식점',
  spanish_restaurant: '스페인 음식점',
  steak_house: '스테이크 하우스',
  sushi_restaurant: '스시 음식점',
  thai_restaurant: '태국 음식점',
  turkish_restaurant: '터키 음식점',
  vegan_restaurant: '비건 음식점',
  vegetarian_restaurant: '채식 음식점',
  vietnamese_restaurant: '베트남 음식점',

  art_gallery: '미술관',
  museum: '박물관',
  performing_arts_theater: '공연 예술 극장',

  accounting: '회계',
  atm: 'ATM',
  bank: '은행',

  dental_clinic: '치과',
  dentist: '치과 의사',
  doctor: '의사',
  drugstore: '약국',
  hospital: '병원',
  medical_lab: '의료 실험실',
  pharmacy: '약국',
  physiotherapist: '물리 치료사',
  spa: '스파',

  bed_and_breakfast: '민박',
  campground: '캠프장',
  camping_cabin: '캠핑 캐빈',
  cottage: '코티지',
  extended_stay_hotel: '장기 숙박 호텔',
  farmstay: '농장 숙소',
  guest_house: '게스트 하우스',
  hostel: '호스텔',
  hotel: '호텔',
  lodging: '숙소',
  motel: '모텔',
  private_guest_room: '개인 게스트 룸',
  resort_hotel: '리조트 호텔',
  rv_park: 'RV 파크',

  auto_parts_store: '자동차 부품 상점',
  bicycle_store: '자전거 상점',
  book_store: '서점',
  cell_phone_store: '휴대폰 상점',
  clothing_store: '의류 상점',
  convenience_store: '편의점',
  department_store: '백화점',
  discount_store: '할인 상점',
  electronics_store: '전자제품 상점',
  furniture_store: '가구 상점',
  gift_shop: '선물 가게',
  grocery_store: '식료품 상점',
  hardware_store: '철물점',
  home_goods_store: '가정용품 상점',
  home_improvement_store: '홈 인테리어 상점',
  jewelry_store: '보석 상점',
  liquor_store: '주류 상점',
  market: '시장',
  pet_store: '애완동물 상점',
  shoe_store: '신발 상점',
  shopping_mall: '쇼핑몰',
  sporting_goods_store: '스포츠 용품 상점',
  store: '상점',
  supermarket: '슈퍼마켓',
  wholesaler: '도매상',

  athletic_field: '운동장',
  fitness_center: '피트니스 센터',
  golf_course: '골프장',
  gym: '체육관',
  playground: '놀이터',
  ski_resort: '스키 리조트',
  sports_club: '스포츠 클럽',
  sports_complex: '스포츠 단지',
  stadium: '경기장',
  swimming_pool: '수영장',

  airport: '공항',
  bus_station: '버스 정류장',
  bus_stop: '버스 정거장',
  ferry_terminal: '페리 터미널',
  heliport: '헬리포트',
  light_rail_station: '경전철역',
  park_and_ride: '주차 및 환승 시설',
  subway_station: '지하철역',
  taxi_stand: '택시 승강장',
  train_station: '기차역',
  transit_depot: '교통 차량 기지',
  transit_station: '교통역',
  truck_stop: '트럭 주차장',
};

export const PLACE_TYPES = {
  CAFE_AND_DESSERT: ['cafe', 'coffee_shop', 'bakery', 'sandwich_shop', 'ice_cream_shop'],
  RESTAURANTS: [
    'restaurant',
    'food',
    'korean_restaurant',
    'japanese_restaurant',
    'chinese_restaurant',
    'bar',
    'sushi_restaurant',
    'fast_food_restaurant',
    'seafood_restaurant',
    'ramen_restaurant',
    'pizza_restaurant',
    'brunch_restaurant',
    'hamburger_restaurant',
    'vegan_restaurant',
    'vegetarian_restaurant',
    'barbecue_restaurant',
    'brazilian_restaurant',
    'breakfast_restaurant',
    'french_restaurant',
    'greek_restaurant',
    'indian_restaurant',
    'indonesian_restaurant',
    'italian_restaurant',
    'lebanese_restaurant',
    'mediterranean_restaurant',
    'mexican_restaurant',
    'middle_eastern_restaurant',
    'spanish_restaurant',
    'steak_house',
    'thai_restaurant',
    'turkish_restaurant',
    'vietnamese_restaurant',
  ],
  SHOP: [
    'department_store',
    'shopping_mall',
    'sporting_goods_store',
    'book_store',
    'gift_shop',
    'store',
    'liquor_store',
    'shoe_store',
    'market',
    'home_improvement_store',
    'jewelry_store',
    'discount_store',
    'electronics_store',
    'furniture_store',
    'grocery_store',
    'hardware_store',
    'home_goods_store',
    'supermarket',
    'pet_store',
    'wholesaler',
  ],
  ATTRACTIONS: ['tourist_attraction', 'visitor_center'],
  EXHIBITION: ['art_gallery', 'museum', 'performing_arts_theater'],
  UNIQUE: [
    'amusement_center',
    'amusement_park',
    'aquarium',
    'bowling_alley',
    'hiking_area',
    'movie_rental',
    'movie_theater',
    'zoo',
  ],
  SPORTS: [
    'athletic_field',
    'fitness_center',
    'golf_course',
    'gym',
    'playground',
    'ski_resort',
    'sports_club',
    'sports_complex',
    'stadium',
    'swimming_pool',
  ],
  PARK: ['park', 'dog_park', 'national_park'],
  CAMPING: ['campground', 'camping_cabin', 'rv_park'],
  LODGING: [
    'guest_house',
    'hotel',
    'lodging',
    'motel',
    'private_guest_room',
    'resort_hotel',
    'hostel',
    'bed_and_breakfast',
    'cottage',
    'extended_stay_hotel',
    'farmstay',
  ],
  TRAFFIC: [
    'bus_station',
    'bus_stop',
    'light_rail_station',
    'park_and_ride',
    'subway_station',
    'taxi_stand',
    'train_station',
    'transit_station',
  ],
};
