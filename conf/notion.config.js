/**
 * Notion 데이터 읽기 관련 설정
 * Notion 데이터베이스에 커스텀 필드를 추가하려는 경우 이 파일을 수정하세요.
 */
module.exports = {
  // Notion 데이터베이스 보기 인덱스 (몇 번째 보기를 데이터 및 정렬 기준으로 사용할지 설정)
  NOTION_INDEX: process.env.NEXT_PUBLIC_NOTION_INDEX || 0,  // 기본값: 첫 번째 보기 (0)
  // 인덱스는 0부터 시작합니다. (0: 첫 번째, 1: 두 번째, -1: 마지막 보기)

  // Notion 데이터베이스 속성(필드) 이름 설정
  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password', // 비밀번호
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type', // 글 유형 필드 이름
    type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post', // 'Post'인 경우 블로그 게시글로 인식
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page', // 'Page'인 경우 단일 페이지로 인식
    type_notice:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice', // 'Notice'인 경우 공지사항으로 인식
    type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || 'Menu', // 'Menu'인 경우 메뉴로 인식
    type_sub_menu:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || 'SubMenu', // 'SubMenu'인 경우 하위 메뉴로 인식
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title', // 제목 필드 이름
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status', // 상태 필드 이름
    status_publish:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published', // 게시됨 상태 값
    status_invisible:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible', // 숨김 게시 상태 값
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary', // 요약
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug', // 슬러그(경로명)
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category', // 카테고리
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date', // 날짜
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags', // 태그
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon', // 아이콘
    ext: process.env.NEXT_PUBLIC_NOTION_PROPERTY_EXT || 'ext' // 확장 데이터 필드 (JSON 문자열)
  },
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || '',
  NOTION_TOKEN_V2: process.env.NOTION_TOKEN_V2 || '' // 데이터베이스를 비공개로 유지하고 싶은 경우 필요합니다.
}
