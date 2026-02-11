/**
 * 이미지 관련 설정
 */
module.exports = {
  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || 'https://www.notion.so', // Notion 도메인. 역방향 프록시를 사용하는 경우 수정하세요.
  IMAGE_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_WIDTH || 1080, // 이미지 압축 너비 기본값. 낮을수록 로딩이 빨라집니다.
  IMAGE_ZOOM_IN_WIDTH: process.env.NEXT_PUBLIC_IMAGE_ZOOM_IN_WIDTH || 1920, // 아티클 이미지 확대 시 화질 너비
  IMAGE_COMPRESS_QUALITY: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_QUALITY || 80, // 이미지 압축 품질 (0-100)
  RANDOM_IMAGE_URL: process.env.NEXT_PUBLIC_RANDOM_IMAGE_URL || '', // 랜덤 이미지 API 주소. 설정 시 커버 및 아바타가 랜덤 이미지로 대체될 수 있습니다.
  RANDOM_IMAGE_REPLACE_TEXT:
    process.env.NEXT_PUBLIC_RANDOM_IMAGE_NOT_REPLACE_TEXT ||
    'images.unsplash.com', // 특정 키워드가 포함된 이미지 URL만 위 랜덤 이미지로 대체합니다.

  // 사이트 이미지 관련
  IMG_LAZY_LOAD_PLACEHOLDER:
    process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // 지연 로딩(Lazy Load) 시 보여줄 자리 표시자 이미지
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || 'Notion', // 더 이상 사용되지 않음. Notion 방식만 지원합니다.
  IMG_SHADOW: process.env.NEXT_PUBLIC_IMG_SHADOW || false, // 아티클 이미지에 자동으로 그림자 효과를 줄지 여부
  IMG_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMG_COMPRESS_WIDTH || 800 // Notion 이미지 압축 너비
}
