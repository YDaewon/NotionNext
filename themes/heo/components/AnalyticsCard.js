import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 블로그 통계 카드 컴포넌트
 * @param {*} props
 * @returns
 */
export function AnalyticsCard(props) {
    const targetDate = new Date(siteConfig('HEO_SITE_CREATE_TIME', null, CONFIG))
    const today = new Date()
    const diffTime = today.getTime() - targetDate.getTime() // 두 날짜 사이의 밀리초 차이 계산
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 밀리초를 일수로 변환
    const postCountTitle = siteConfig('HEO_POST_COUNT_TITLE', null, CONFIG)
    const siteTimeTitle = siteConfig('HEO_SITE_TIME_TITLE', null, CONFIG)
    const siteVisitTitle = siteConfig('HEO_SITE_VISIT_TITLE', null, CONFIG)
    const siteVisitorTitle = siteConfig('HEO_SITE_VISITOR_TITLE', null, CONFIG)

    const { postCount } = props
    return <>
        <div className='text-md flex flex-col space-y-1 justify-center px-3'>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{postCountTitle}</div>
                    <div>{postCount}</div>
                </div>
            </div>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{siteTimeTitle}</div>
                    <div>{diffDays} 일</div>
                </div>
            </div>
            <div className='hidden busuanzi_container_page_pv'>
                <div className='flex justify-between'>
                    <div>{siteVisitTitle}</div>
                    <div className='busuanzi_value_page_pv' />
                </div>
            </div>
            <div className='hidden busuanzi_container_site_uv'>
                <div className='flex justify-between'>
                    <div>{siteVisitorTitle}</div>
                    <div className='busuanzi_value_site_uv' />
                </div>
            </div>
        </div>
    </>
}
