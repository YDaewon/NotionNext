/**
 * 각종 플러그인 설정
 */
module.exports = {
  // 사이트 전체 검색 (Algolia)
  ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || null, // 확인: https://dashboard.algolia.com/account/api-keys/
  ALGOLIA_ADMIN_APP_KEY: process.env.ALGOLIA_ADMIN_APP_KEY || null, // 관리자 API Key (보안 주의)
  ALGOLIA_SEARCH_ONLY_APP_KEY:
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_APP_KEY || null, // 클라이언트용 검색 API Key
  ALGOLIA_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_INDEX || null, // Algolia 검색 인덱스 이름

  // AI 게시글 요약 생성
  AI_SUMMARY_API: process.env.AI_SUMMARY_API || '',
  AI_SUMMARY_KEY: process.env.AI_SUMMARY_KEY || '',
  AI_SUMMARY_CACHE_TIME: process.env.AI_SUMMARY_CACHE_TIME || 1800, // 캐시 시간 (초)
  AI_SUMMARY_WORD_LIMIT: process.env.AI_SUMMARY_WORD_LIMIT || 1000, // 요약할 단어 수 제한

  // TianliGPT 게시글 요약 @see https://docs_s.tianli0.top/
  TianliGPT_CSS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_CSS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.css',
  TianliGPT_JS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_JS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.js',
  TianliGPT_KEY: process.env.NEXT_PUBLIC_TIANLI_GPT_KEY || '',

  // 메일 구독 (Mailchimp)
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID || null, // Mailchimp 리스트 ID
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY || null // Mailchimp API Key
}
