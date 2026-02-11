import { siteConfig } from '@/lib/config'

/**
 * 게시글 만료 알림 컴포넌트
 * 게시글이 지정된 기간을 초과했을 때 알림을 표시합니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.post - 게시글 데이터
 * @param {number} [props.daysThreshold=90] - 만료 기준일 (일)
 * @returns {JSX.Element|null}
 */
export default function ArticleExpirationNotice({
  post,
  daysThreshold = siteConfig('ARTICLE_EXPIRATION_DAYS', 90)
}) {
  const articleExpirationEnabled = siteConfig(
    'ARTICLE_EXPIRATION_ENABLED',
    false
  )
  if (!articleExpirationEnabled || !post?.lastEditedDay) {
    return null
  }

  const postDate = new Date(post.lastEditedDate || post.lastEditedDay)
  const today = new Date()
  const diffTime = Math.abs(today - postDate)
  const daysOld = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const isVisible = daysOld >= daysThreshold

  if (!isVisible) {
    return null
  }

  // %%DAYS%%를 자리 표시자로 사용
  const articleExpirationMessage = siteConfig(
    'ARTICLE_EXPIRATION_MESSAGE',
    '이 게시물은 작성된 지 %%DAYS%% 일이 지났습니다. 내용이 최신 정보와 다를 수 있으니 주의해서 참고해 주세요.'
  )
  const articleExpirationMessageParts =
    articleExpirationMessage.split('%%DAYS%%')

  // JSX 반환
  return (
    <div
      className={
        'p-4 rounded-lg border border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 shadow-sm'
      }>
      <div className='flex items-start'>
        <i className='fas fa-exclamation-triangle text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0' />
        <div className='ml-1'>
          <div className='text-blue-600 dark:text-blue-400 font-medium'>
            {siteConfig('ARTICLE_EXPIRATION_TITLE', '알림')}
          </div>
          <div className='flex items-center mt-1 text-sm text-gray-700 dark:text-gray-300'>
            <i className='far fa-clock text-red-500 dark:text-red-400 mr-1' />
            <span>
              {(() => {
                return (
                  <>
                    {articleExpirationMessageParts[0]}
                    <span className='text-red-500 dark:text-red-400 font-bold'>
                      {daysOld}
                    </span>
                    {articleExpirationMessageParts[1]}
                  </>
                )
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
