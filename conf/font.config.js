/**
 * 사이트 폰트 관련 설정
 */
module.exports = {
  // START ************사이트 폰트*****************
  // ['font-serif','font-sans'] 두 가지 옵션 중 선택 (세리프와 산세리프)
  // 뒤에 공백으로 구분된 'font-light' 등은 폰트 두께를 나타냅니다.
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans font-light',

  // 외부 폰트 CSS URL
  FONT_URL: [
    'https://fonts.googleapis.com/css?family=Bitter:300,400,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&display=swap'
  ],

  // 폰트 최적화 설정
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap',
  FONT_PRELOAD: process.env.NEXT_PUBLIC_FONT_PRELOAD || true,
  FONT_SUBSET: process.env.NEXT_PUBLIC_FONT_SUBSET || 'korean',

  // 산세리프(Sans-serif) 폰트 패밀리
  FONT_SANS: [
    '"Noto Sans KR"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ],

  // 세리프(Serif) 폰트 패밀리
  FONT_SERIF: [
    '"Noto Serif KR"',
    'Bitter',
    '"Times New Roman"',
    'Times',
    'serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ],

  FONT_AWESOME:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' // Font Awesome 아이콘 주소

  // END ************사이트 폰트*****************
}
