/**
 * 광고 설정
 */
module.exports = {
  // 구글 애드센스 (Google AdSense)
  ADSENSE_GOOGLE_ID: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_ID || '', // 구글 애드센스 ID 예: ca-pub-xxxxxxxxxxxxxxxx
  ADSENSE_GOOGLE_TEST: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_TEST || false, // 구글 애드센스 테스트 모드. 개발 환경에서 가짜 광고를 표시하는 데 사용됩니다. https://www.tangly1024.com/article/local-dev-google-adsense
  ADSENSE_GOOGLE_SLOT_IN_ARTICLE:
    process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_IN_ARTICLE || '3806269138', // 아티클 내 광고 슬롯 ID (data-ad-slot 값)
  ADSENSE_GOOGLE_SLOT_FLOW:
    process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_FLOW || '1510444138', // 인피드 광고 슬롯 ID
  ADSENSE_GOOGLE_SLOT_NATIVE:
    process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_NATIVE || '4980048999', // 네이티브 광고 슬롯 ID
  ADSENSE_GOOGLE_SLOT_AUTO:
    process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_AUTO || '8807314373', // 자동 광고 슬롯 ID

  // WWADS (Wanwei Ads)
  AD_WWADS_ID: process.env.NEXT_PUBLIC_WWAD_ID || null, // WWADS 유닛 ID https://wwads.cn/
  AD_WWADS_BLOCK_DETECT: process.env.NEXT_PUBLIC_WWADS_AD_BLOCK_DETECT || false // 광고 차단 감지 활성화 여부 @see https://github.com/bytegravity/whitelist-wwads
}
