/**
 * 개발자용 설정
 */
module.exports = {
  SUB_PATH: '', // 하위 폴더에 배포하려는 경우가 아니면 비워두세요.
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false, // 디버그 버튼 표시 여부
  // TAILWINDCSS 커스텀 색상 설정 (현재 미사용)
  BACKGROUND_LIGHT: '#eeeeee', // 라이트 모드 배경색
  BACKGROUND_DARK: '#000000', // 다크 모드 배경색

  // Redis 캐시 데이터베이스 주소
  REDIS_URL: process.env.REDIS_URL || '',

  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === 'build' ||
    process.env.npm_lifecycle_event === 'export', // 빌드 과정 중 캐시를 활성화합니다. 개발 중이나 런타임에는 큰 의미가 없을 수 있습니다.
  isProd: process.env.VERCEL_ENV === 'production' || process.env.EXPORT, // 개발/운영 환경 구분
  BUNDLE_ANALYZER: process.env.ANALYZE === 'true' || false, // 빌드 결과 분석 (의존성 크기 확인) 활성화 여부
  VERSION: (() => {
    try {
      // 환경 변수를 우선 사용하며, 없을 경우 package.json에서 버전을 가져옵니다.
      return (
        process.env.NEXT_PUBLIC_VERSION || require('../package.json').version
      )
    } catch (error) {
      console.warn('Failed to load package.json version:', error)
      return '1.0.0' // 기본 버전
    }
  })()
}
