const CONFIG = {

  // Style
  MEDIUM_RIGHT_PANEL_DARK: process.env.NEXT_PUBLIC_MEDIUM_RIGHT_DARK || false, // 오른쪽 패널 다크 모드 활성화 여부

  MEDIUM_POST_LIST_COVER: true, // 게시글 목록에 커버 이미지 표시 여부
  MEDIUM_POST_LIST_PREVIEW: true, // 게시글 목록에 미리보기 내용 표시 여부
  MEDIUM_POST_LIST_CATEGORY: true, // 게시글 목록에 카테고리 표시 여부
  MEDIUM_POST_LIST_TAG: true, // 게시글 목록에 태그 표시 여부

  MEDIUM_POST_DETAIL_CATEGORY: true, // 게시글 상세 페이지에 카테고리 표시 여부
  MEDIUM_POST_DETAIL_TAG: true, // 게시글 상세 페이지에 태그 표시 여부

  // 메뉴 (Navigation)
  MEDIUM_MENU_CATEGORY: false, // 카테고리 메뉴 표시 여부
  MEDIUM_MENU_TAG: false, // 태그 메뉴 표시 여부
  MEDIUM_MENU_ARCHIVE: false, // 아카이브 메뉴 표시 여부
  MEDIUM_MENU_SEARCH: false, // 검색 메뉴 표시 여부

  // 위젯 (Widget)
  MEDIUM_WIDGET_REVOLVER_MAPS: process.env.NEXT_PUBLIC_WIDGET_REVOLVER_MAPS || 'false', // Revolver 수분 지도 플러그인
  MEDIUM_WIDGET_TO_TOP: true // 상단으로 스크롤 버튼 활성화 여부
}
export default CONFIG
