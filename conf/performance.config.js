/**
 * 성능 최적화 설정
 */
module.exports = {
  // 프리로드(Preload) 설정
  PRELOAD_CRITICAL_RESOURCES: process.env.NEXT_PUBLIC_PRELOAD_CRITICAL_RESOURCES || true,

  // 지연 로딩(Lazy Load) 설정
  LAZY_LOAD_IMAGES: process.env.NEXT_PUBLIC_LAZY_LOAD_IMAGES || true,
  LAZY_LOAD_THRESHOLD: process.env.NEXT_PUBLIC_LAZY_LOAD_THRESHOLD || '200px',

  // 코드 분할(Code Splitting) 설정
  ENABLE_CODE_SPLITTING: process.env.NEXT_PUBLIC_ENABLE_CODE_SPLITTING || true,
  CHUNK_SIZE_LIMIT: process.env.NEXT_PUBLIC_CHUNK_SIZE_LIMIT || 244000, // 244KB

  // 캐시 설정
  BROWSER_CACHE_TTL: process.env.NEXT_PUBLIC_BROWSER_CACHE_TTL || 86400, // 24시간
  CDN_CACHE_TTL: process.env.NEXT_PUBLIC_CDN_CACHE_TTL || 604800, // 7일

  // 압축 설정
  ENABLE_GZIP: process.env.NEXT_PUBLIC_ENABLE_GZIP || true,
  ENABLE_BROTLI: process.env.NEXT_PUBLIC_ENABLE_BROTLI || true,

  // 폰트 최적화
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap',
  PRELOAD_FONTS: process.env.NEXT_PUBLIC_PRELOAD_FONTS || true,

  // 제3자 스크립트 최적화
  DEFER_THIRD_PARTY_SCRIPTS: process.env.NEXT_PUBLIC_DEFER_THIRD_PARTY_SCRIPTS || true,

  // 이미지 최적화
  WEBP_SUPPORT: process.env.NEXT_PUBLIC_WEBP_SUPPORT || true,
  AVIF_SUPPORT: process.env.NEXT_PUBLIC_AVIF_SUPPORT || true,

  // 프리페치(Prefetch) 설정
  PREFETCH_LINKS: process.env.NEXT_PUBLIC_PREFETCH_LINKS || true,
  PREFETCH_IMAGES: process.env.NEXT_PUBLIC_PREFETCH_IMAGES || false,

  // 성능 모니터링
  ENABLE_WEB_VITALS: process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS || true,
  PERFORMANCE_BUDGET: {
    FCP: 1800, // First Contentful Paint (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1   // Cumulative Layout Shift
  }
}
