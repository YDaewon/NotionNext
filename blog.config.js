// 참고: process.env.XX는 Vercel의 환경 변수입니다. 설정 방법은 다음을 참조하세요: https://docs.tangly1024.com/article/how-to-config-notion-next

const BLOG = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://www.notion.so/api/v3', // API 기본 요청 주소. 본인의 프록시 주소가 있다면 수정 가능합니다.

  // 중요!!! 본인의 노션 페이지 ID를 입력하세요. 
  // 템플릿 복제 주소: https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ||
    'bbc95356c3518388ba8081d53072e231',

  THEME: process.env.NEXT_PUBLIC_THEME || 'heo', // 현재 테마 설정. themes 폴더 내의 폴더명을 입력 (예: hexo, next, medium, fukasawa 등)
  TITLE: process.env.NEXT_PUBLIC_TITLE || 'NotionNext 블로그', // 사이트 제목 (브라우저 탭 및 상단 네비게이션에 표시)
  LANG: process.env.NEXT_PUBLIC_LANG || 'ko-KR', // 언어 설정: 'ko-KR', 'en-US', 'zh-CN' 등 지원
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2023, // 사이트 시작 연도. 비워두면 현재 연도가 표시됩니다.

  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false, // 의사 정적 경로. 활성화 시 모든 게시글 URL이 .html로 끝납니다.
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 60, // 캐시 갱신 간격 (초). 60초 동안은 노션 데이터를 새로 가져오지 않고 정적 페이지를 보여주어 속도를 높입니다.
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'light', // ['light', 'dark', 'auto'], 라이트 모드, 다크 모드, 시간 기반 자동 전환
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], // 다크 모드 자동 전환 시간 (오후 6시부터 오전 6시까지)

  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'Daebok', // 작성자 이름
  BIO: process.env.NEXT_PUBLIC_BIO || '백엔드 개발자를 준비 중인 주니어 개발자입니다 💻', // 작성자 소개란
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://tangly1024.com', // 웹사이트 주소
  KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'Notion, 블로그, 개발 블로그', // 사이트 키워드 (SEO 설정, 쉼표로 구분)
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || '/favicon.ico', // 파비콘 설정. 기본은 /public/favicon.ico 사용
  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '', // (중국 내 사이트용) ICP 신고 번호
  BEI_AN_LINK: process.env.NEXT_PUBLIC_BEI_AN_LINK || 'https://beian.miit.gov.cn/', // 신고 번호 조회 링크
  BEI_AN_GONGAN: process.env.NEXT_PUBLIC_BEI_AN_GONGAN || '', // (중국 내 사이트용) 공안 신고 번호

  // RSS 구독
  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || false, // RSS 구독 기능 활성화 여부

  // 기타 상세 설정
  // 설정 파일이 너무 길어지는 것을 방지하기 위해 /conf/ 폴더로 분리되어 있습니다. 필요에 따라 해당 파일을 수정하세요.
  ...require('./conf/comment.config'), // 댓글 플러그인
  ...require('./conf/contact.config'), // 연락처 설정
  ...require('./conf/post.config'), // 게시글 및 리스트 설정
  ...require('./conf/analytics.config'), // 방문 통계 분석
  ...require('./conf/image.config'), // 이미지 관련 설정
  ...require('./conf/font.config'), // 웹 폰트 설정
  ...require('./conf/right-click-menu'), // 커스텀 우클릭 메뉴 설정
  ...require('./conf/code.config'), // 코드 블록 스타일
  ...require('./conf/animation.config'), // 애니메이션 효과
  ...require('./conf/widget.config'), // 플로팅 위젯 (채팅, 반려동물, 음악 플레이어 등)
  ...require('./conf/ad.config'), // 광고 수익 설정
  ...require('./conf/plugin.config'), // 기타 플러그인 (Algolia 검색 등)
  ...require('./conf/performance.config'), // 성능 최적화 설정

  // 고급 기능 설정
  ...require('./conf/layout-map.config'), // 라우팅 및 레이아웃 커스텀 매핑
  ...require('./conf/notion.config'), // 노션 DB 읽기 관련 확장 설정 (커스텀 헤더 등)
  ...require('./conf/dev.config'), // 개발 및 디버깅용 설정

  // 외부 스크립트 및 스타일 추가
  CUSTOM_EXTERNAL_JS: [''], // 예: ['http://xx.com/script.js']
  CUSTOM_EXTERNAL_CSS: [''], // 예: ['http://xx.com/style.css']

  // 커스텀 메뉴
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || false, // Menu 타입의 메뉴 지원 여부

  // 콘텐츠 보안 설정
  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true, // 콘텐츠 복사 허용 여부. false로 설정 시 복사가 금지됩니다.

  // 사이드바 레이아웃 반전 (좌우 변경). 지원 테마: hexo, next, medium, fukasawa 등
  LAYOUT_SIDEBAR_REVERSE:
    process.env.NEXT_PUBLIC_LAYOUT_SIDEBAR_REVERSE || false,

  // 환영 인사 타이핑 효과. Hexo, Matery 테마 지원. 쉼표로 여러 문장 구분.
  GREETING_WORDS:
    process.env.NEXT_PUBLIC_GREETING_WORDS ||
    '안녕하세요, 백엔드 개발자 지망생입니다. 방문해 주셔서 감사합니다! 🎉',

  // UUID를 Slug로 리다이렉트 여부
  UUID_REDIRECT: process.env.UUID_REDIRECT || false,

  // GitHub 프로젝트 설정 가져오기
  ...require('./conf/github.config')
}

module.exports = BLOG
