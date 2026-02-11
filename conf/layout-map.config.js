/**
 * 경로와 컴포넌트 매핑 설정
 * 특정 경로에서 어떤 테마 레이아웃 컴포넌트를 사용할지 정의합니다.
 */
module.exports = {
  LAYOUT_MAPPINGS: {
    '-1': 'LayoutBase',
    '/': 'LayoutIndex',
    '/archive': 'LayoutArchive',
    '/page/[page]': 'LayoutPostList',
    '/category/[category]': 'LayoutPostList',
    '/category/[category]/page/[page]': 'LayoutPostList',
    '/tag/[tag]': 'LayoutPostList',
    '/tag/[tag]/page/[page]': 'LayoutPostList',
    '/search': 'LayoutSearch',
    '/search/[keyword]': 'LayoutSearch',
    '/search/[keyword]/page/[page]': 'LayoutSearch',
    '/404': 'Layout404',
    '/tag': 'LayoutTagIndex',
    '/category': 'LayoutCategoryIndex',
    '/[prefix]': 'LayoutSlug',
    '/[prefix]/[slug]': 'LayoutSlug',
    '/[prefix]/[slug]/[...suffix]': 'LayoutSlug',
    '/auth/result': 'LayoutAuth',
    '/sign-in/[[...index]]': 'LayoutSignIn',
    '/sign-up/[[...index]]': 'LayoutSignUp',
    '/dashboard/[[...index]]': 'LayoutDashboard'
  }
}
