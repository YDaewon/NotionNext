/**
 * 사이트 통계 플러그인
 */
module.exports = {
  ANALYTICS_VERCEL: process.env.NEXT_PUBLIC_ANALYTICS_VERCEL || false, // Vercel 제공 통계 https://vercel.com/docs/concepts/analytics/quickstart https://github.com/tangly1024/NotionNext/issues/897
  ANALYTICS_BUSUANZI_ENABLE:
    process.env.NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE || false, // 조회수, 방문자 수 표시 see http://busuanzi.ibruce.info/
  ANALYTICS_BAIDU_ID: process.env.NEXT_PUBLIC_ANALYTICS_BAIDU_ID || '', // 바이두 통계 ID (예: [baidu_id] -> https://hm.baidu.com/hm.js?[baidu_id])
  ANALYTICS_CNZZ_ID: process.env.NEXT_PUBLIC_ANALYTICS_CNZZ_ID || '', // CNZZ(Umeng) 통계 ID (예: [cnzz_id] -> https://s9.cnzz.com/z_stat.php?id=[cnzz_id]&web_id=[cnzz_id])
  ANALYTICS_GOOGLE_ID: process.env.NEXT_PUBLIC_ANALYTICS_GOOGLE_ID || '', // 구글 애널리틱스 ID 예: G-XXXXXXXXXX

  // 51la 사이트 통계 https://www.51.la/
  ANALYTICS_51LA_ID: process.env.NEXT_PUBLIC_ANALYTICS_51LA_ID || '', // 51la 관리자 페이지에서 획득한 ID (참고: https://docs.tangly1024.com/article/notion-next-51-la)
  ANALYTICS_51LA_CK: process.env.NEXT_PUBLIC_ANALYTICS_51LA_CK || '', // 51la 관리자 페이지에서 획득한 CK

  // Matomo 사이트 통계
  MATOMO_HOST_URL: process.env.NEXT_PUBLIC_MATOMO_HOST_URL || '', // Matomo 서버 주소 (끝에 슬래시 제외)
  MATOMO_SITE_ID: process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '', // Matomo 사이트 ID

  // ACKEE 방문자 분석 도구
  ANALYTICS_ACKEE_TRACKER:
    process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_TRACKER || '', // 예: 'https://ackee.tangly1024.com/tracker.js'
  ANALYTICS_ACKEE_DATA_SERVER:
    process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DATA_SERVER || '', // 예: https://ackee.tangly1024.com (끝에 슬래시 제외)
  ANALYTICS_ACKEE_DOMAIN_ID:
    process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DOMAIN_ID || '', // 예: '82e51db6-dec2-423a-b7c9-b4ff7ebb3302'

  SEO_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION || '', // 구글 사이트 소유권 확인 코드

  SEO_BAIDU_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_BAIDU_SITE_VERIFICATION || '', // 바이두 사이트 소유권 확인 코드

  // Microsoft Clarity 사이트 분석
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || null, // Clarity 스크립트의 ID (10자리 영숫자 조합)

  UMAMI_HOST: process.env.NEXT_PUBLIC_UMAMI_HOST || 'https://cloud.umami.is/script.js', // Umami 서비스 주소
  UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID || '', // Umami 사이트 ID

  // <---- 사이트 통계
}
