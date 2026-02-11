const CONFIG = {
  HEO_HOME_POST_TWO_COLS: true, // 홈 페이지 블로그 리스트 2열 표시 (false인 경우 1열 표시)
  HEO_LOADING_COVER: true, // 페이지 로딩 애니메이션

  HEO_HOME_BANNER_ENABLE: true,

  HEO_SITE_CREATE_TIME: '2026-02-10', // 사이트 개설일 (운영 일수 계산용)

  // 홈 페이지 상단 알림바 롤링 내용 ([]인 경우 표시 안 함)
  HEO_NOTICE_BAR: [
    // { title: '제 블로그에 오신 것을 환영합니다', url: 'https://blog.tangly1024.com' },
    // { title: '도움말 센터에서 더 많은 정보를 확인하세요', url: 'https://docs.tangly1024.com' }
  ],

  // 히어로 영역 좌우 컴포넌트 위치 반전
  HEO_HERO_REVERSE: false,
  // 블로그 본문 영역 좌우 컴포넌트 위치 반전
  HEO_HERO_BODY_REVERSE: false,

  // 히어로 영역 (홈 페이지 상단 대형 카드)
  HEO_HERO_TITLE_1: '백엔드 개발',
  HEO_HERO_TITLE_2: '지식과 경험 공유',
  HEO_HERO_TITLE_3: 'DAEWON.COM',
  HEO_HERO_TITLE_4: '새로운 시작',
  HEO_HERO_TITLE_5: 'NotionNext로 만든 개인 블로그',
  HEO_HERO_TITLE_LINK: 'https://tangly1024.com',
  // 히어로 영역 마우스 오버 텍스트
  HEO_HERO_COVER_TITLE: '둘러보기',

  // 히어로 영역 고정 카테고리 3개
  HEO_HERO_CATEGORY_1: { title: '필독 게시물', url: '/tag/필독' },
  HEO_HERO_CATEGORY_2: { title: '인기 게시물', url: '/tag/인기' },
  HEO_HERO_CATEGORY_3: { title: '유용한 튜토리얼', url: '/tag/튜토리얼' },

  // 히어로 영역 우측 추천 태그 (예: [추천], 최대 6개 게시물; 비워두면 최신 게시물 표시)
  HEO_HERO_RECOMMEND_POST_TAG: '추천',
  HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 추천 게시글 정렬 (true인 경우 마지막 수정 시간 기준)

  // 우측 프로필 카드 인사말 (클릭 시 자동 전환)
  HEO_INFOCARD_GREETINGS: [
    '안녕하세요! 저는',
    '🔍 지식 공유를 즐기는',
    '🤝 개발 철학을 가진',
    '🏃 행동하는 개발자',
    '🤖️ 최신 기술 애호가',
    '🧱 팀의 엔진이 되는',
    '💻 주니어 백엔드 개발자입니다'
  ],

  // 프로필 카드 하단 버튼
  HEO_INFO_CARD_URL1: '/about',
  HEO_INFO_CARD_ICON1: 'fas fa-user',
  HEO_INFO_CARD_URL2: 'https://github.com/YDaewon',
  HEO_INFO_CARD_ICON2: 'fab fa-github',
  HEO_INFO_CARD_URL3: 'https://www.instagram.com/99_10_31_',
  HEO_INFO_CARD_ICON3: 'fab fa-instagram',
  HEO_INFO_CARD_URL4: 'mailto:dideodnjs9860@gmail.com',
  HEO_INFO_CARD_ICON4: 'fas fa-envelope',

  // 사용자 보유 기술 아이콘
  HEO_GROUP_ICONS: [
    {
      title_1: 'AfterEffect',
      img_1: '/images/heo/20239df3f66615b532ce571eac6d14ff21cf072602.webp',
      color_1: '#989bf8',
      title_2: 'Sketch',
      img_2: '/images/heo/2023e0ded7b724a39f12d59c3dc8fbdc7cbe074202.webp',
      color_2: '#ffffff'
    },
    {
      title_1: 'Docker',
      img_1: '/images/heo/20231108a540b2862d26f8850172e4ea58ed075102.webp',
      color_1: '#57b6e6',
      title_2: 'Photoshop',
      img_2: '/images/heo/2023e4058a91608ea41751c4f102b131f267075902.webp',
      color_2: '#4082c3'
    },
    {
      title_1: 'FinalCutPro',
      img_1: '/images/heo/20233e777652412247dd57fd9b48cf997c01070702.webp',
      color_1: '#ffffff',
      title_2: 'Python',
      img_2: '/images/heo/20235c0731cd4c0c95fc136a8db961fdf963071502.webp',
      color_2: '#ffffff'
    },
    {
      title_1: 'Swift',
      img_1: '/images/heo/202328bbee0b314297917b327df4a704db5c072402.webp',
      color_1: '#eb6840',
      title_2: 'Principle',
      img_2: '/images/heo/2023f76570d2770c8e84801f7e107cd911b5073202.webp',
      color_2: '#8f55ba'
    },
    {
      title_1: 'illustrator',
      img_1: '/images/heo/20237359d71b45ab77829cee5972e36f8c30073902.webp',
      color_1: '#f29e39',
      title_2: 'CSS3',
      img_2: '/images/heo/20237c548846044a20dad68a13c0f0e1502f074602.webp',
      color_2: '#2c51db'
    },
    {
      title_1: 'JS',
      img_1: '/images/heo/2023786e7fc488f453d5fb2be760c96185c0075502.webp',
      color_1: '#f7cb4f',
      title_2: 'HTML',
      img_2: '/images/heo/202372b4d760fd8a497d442140c295655426070302.webp',
      color_2: '#e9572b'
    },
    {
      title_1: 'Git',
      img_1: '/images/heo/2023ffa5707c4e25b6beb3e6a3d286ede4c6071102.webp',
      color_1: '#df5b40',
      title_2: 'Rhino',
      img_2: '/images/heo/20231ca53fa0b09a3ff1df89acd7515e9516173302.webp',
      color_2: '#1f1f1f'
    }
  ],

  HEO_SOCIAL_CARD: false, // 우측 하단 커뮤니티 섹션 표시 여부
  HEO_SOCIAL_CARD_TITLE_1: '커뮤니티 채널',
  HEO_SOCIAL_CARD_TITLE_2: '지식 공유 및 개발 토론에 참여하세요',
  HEO_SOCIAL_CARD_TITLE_3: '커뮤니티 가입하기',
  HEO_SOCIAL_CARD_URL: 'https://docs.tangly1024.com/article/how-to-question',

  // 하단 통계 패널 텍스트
  HEO_POST_COUNT_TITLE: '게시글 수:',
  HEO_SITE_TIME_TITLE: '운영 일수:',
  HEO_SITE_VISIT_TITLE: '총 방문자:',
  HEO_SITE_VISITOR_TITLE: '방문객:',

  // ***** 이하 설정은 개발용으로 예약되어 있습니다 *****
  // 메뉴 구성
  HEO_MENU_INDEX: true, // 홈 표시
  HEO_MENU_CATEGORY: true, // 카테고리 표시
  HEO_MENU_TAG: true, // 태그 표시
  HEO_MENU_ARCHIVE: true, // 아카이브 표시
  HEO_MENU_SEARCH: true, // 검색 표시

  HEO_POST_LIST_COVER: true, // 리스트에 게시글 커버 표시
  HEO_POST_LIST_COVER_HOVER_ENLARGE: false, // 마우스 오버 시 커버 확대 여부

  HEO_POST_LIST_COVER_DEFAULT: true, // 커버가 없을 때 사이트 배경 사용 여부
  HEO_POST_LIST_SUMMARY: true, // 게시글 요약 표시
  HEO_POST_LIST_PREVIEW: false, // 게시글 미리보기 표시
  HEO_POST_LIST_IMG_CROSSOVER: true, // 리스트 이미지 좌우 교차 배치

  HEO_ARTICLE_ADJACENT: true, // 이전/다음 게시글 추천 표시
  HEO_ARTICLE_COPYRIGHT: true, // 게시글 저작권 안내 표시
  HEO_ARTICLE_NOT_BY_AI: false, // AI 미작성 안내 표시
  HEO_ARTICLE_RECOMMEND: true, // 관련 게시글 추천

  HEO_WIDGET_LATEST_POSTS: true, // 최신 게시글 카드 표시
  HEO_WIDGET_ANALYTICS: false, // 통계 카드 표시
  HEO_WIDGET_TO_TOP: true, // 상단 이동 버튼
  HEO_WIDGET_TO_COMMENT: true, // 댓글 영역 이동 버튼
  HEO_WIDGET_DARK_MODE: true, // 다크 모드 토글
  HEO_WIDGET_TOC: true // 모바일 부유식 목차
}
export default CONFIG
