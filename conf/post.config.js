/**
 * 게시글 관련 설정
 */
module.exports = {
  // 게시글 URL 접두사 (Prefix)
  POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX ?? 'article',
  // 게시글 유형의 기본 경로 접두사. 예: /article/[slug]
  // 비워두면 접두사 없이 / [slug] 형태로 접근합니다.
  // WP 스타일의 커스텀 퍼머링크 지원: %year%/%month%/%day% 등 사용 가능

  POST_SCHEDULE_PUBLISH:
    process.env.NEXT_PUBLIC_NOTION_SCHEDULE_PUBLISH || true, // 게시글의 게시일 필드에 따라 자동 게시/내림 제어

  // 공유 바 (Share Bar)
  POST_SHARE_BAR_ENABLE: process.env.NEXT_PUBLIC_POST_SHARE_BAR || 'true', // 게시글 하단 공유 바 활성화 여부
  POSTS_SHARE_SERVICES:
    process.env.NEXT_PUBLIC_POST_SHARE_SERVICES ||
    'link,email', // 표시할 공유 서비스 목록 (쉼표로 구분)

  POST_TITLE_ICON: process.env.NEXT_PUBLIC_POST_TITLE_ICON || true, // 제목 아이콘 표시 여부
  POST_DISABLE_GALLERY_CLICK:
    process.env.NEXT_PUBLIC_POST_DISABLE_GALLERY_CLICK || false, // 갤러리 뷰에서 클릭 비활성화 (링크 삽입 등을 위해 사용)
  POST_LIST_STYLE: process.env.NEXT_PUBLIC_POST_LIST_STYLE || 'page', // 게시글 목록 스타일: 'page'(페이지 번호), 'scroll'(무한 스크롤)
  POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false', // 목록에서 게시글 미리보기 표시 여부
  POST_PREVIEW_LINES: process.env.NEXT_PUBLIC_POST_POST_PREVIEW_LINES || 12, // 미리보기 행 수
  POST_RECOMMEND_COUNT: process.env.NEXT_PUBLIC_POST_RECOMMEND_COUNT || 6, // 추천 게시글 수
  POSTS_PER_PAGE: process.env.NEXT_PUBLIC_POST_PER_PAGE || 12, // 페이지당 게시글 수
  POSTS_SORT_BY: process.env.NEXT_PUBLIC_POST_SORT_BY || 'notion', // 정렬 방식: 'date'(날짜순), 'notion'(Notion 설정에 따름)

  // 게시글 오래됨 알림 설정 (현재 heo 테마에만 적용 가능)
  ARTICLE_EXPIRATION_DAYS:
    process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_DAYS || 90, // 게시글 만료 기준일 (일)
  ARTICLE_EXPIRATION_MESSAGE:
    process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_MESSAGE ||
    '이 게시물은 작성된 지 %%DAYS%% 일이 지났습니다. 내용이 최신 정보와 다를 수 있으니 주의해서 참고해 주세요.', // 알림 메시지 (%%DAYS%%는 자리 표시자)
  ARTICLE_EXPIRATION_ENABLED:
    process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_ENABLED || 'false', // 게시글 오래됨 알림 활성화 여부

  POST_WAITING_TIME_FOR_404:
    process.env.NEXT_PUBLIC_POST_WAITING_TIME_FOR_404 || '8', // 게시글 로딩 대기 시간 (초). 초과 시 404 페이지로 이동

  // 태그 관련
  TAG_SORT_BY_COUNT: true, // 태그를 게시글 수가 많은 순으로 정렬할지 여부
  IS_TAG_COLOR_DISTINGUISHED:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === 'true' || true // 같은 이름의 태그에 대해 색상을 구분할지 여부
}
