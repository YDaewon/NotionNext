import Tabs from '@/components/Tabs'
import { siteConfig } from '@/lib/config'
import { isBrowser, isSearchEngineBot } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Artalk from './Artalk'

/**
 * 댓글 컴포넌트
 * 브라우저의 가시 범위 내에 있을 때만 내용을 로드합니다.
 * @param {*} param0
 * @returns
 */
const Comment = ({ frontMatter, className }) => {
  const router = useRouter()
  const [shouldLoad, setShouldLoad] = useState(false)
  const commentRef = useRef(null)

  const COMMENT_ARTALK_SERVER = siteConfig('COMMENT_ARTALK_SERVER')
  const COMMENT_TWIKOO_ENV_ID = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const COMMENT_WALINE_SERVER_URL = siteConfig('COMMENT_WALINE_SERVER_URL')
  const COMMENT_VALINE_APP_ID = siteConfig('COMMENT_VALINE_APP_ID')
  const COMMENT_GISCUS_REPO = siteConfig('COMMENT_GISCUS_REPO')
  const COMMENT_CUSDIS_APP_ID = siteConfig('COMMENT_CUSDIS_APP_ID')
  const COMMENT_UTTERRANCES_REPO = siteConfig('COMMENT_UTTERRANCES_REPO')
  const COMMENT_GITALK_CLIENT_ID = siteConfig('COMMENT_GITALK_CLIENT_ID')
  const COMMENT_WEBMENTION_ENABLE = siteConfig('COMMENT_WEBMENTION_ENABLE')

  useEffect(() => {
    // 컴포넌트가 뷰포트에 표시되는지 확인
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.unobserve(entry.target)
        }
      })
    })

    if (commentRef.current) {
      observer.observe(commentRef.current)
    }

    return () => {
      if (commentRef.current) {
        observer.unobserve(commentRef.current)
      }
    }
  }, [frontMatter])

  // URL에 특수 파라미터가 있을 경우 댓글 섹션으로 이동
  if (
    isBrowser &&
    ('giscus' in router.query || router.query.target === 'comment')
  ) {
    setTimeout(() => {
      const url = router.asPath.replace('?target=comment', '')
      history.replaceState({}, '', url)
      document
        ?.getElementById('comment')
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 1000)
  }

  if (!frontMatter) {
    return null
  }

  if (isSearchEngineBot) {
    return null
  }

  // 특정 게시글에서 댓글 섹션 비활성화
  if (frontMatter?.comment === 'Hide') {
    return null
  }

  return (
    <div
      key={frontMatter?.id}
      id='comment'
      ref={commentRef}
      className={`comment mt-5 text-gray-800 dark:text-gray-300 ${className || ''}`}>
      {/* 댓글 섹션 지연 로딩 */}
      {!shouldLoad && (
        <div className='text-center'>
          로딩 중...
          <i className='fas fa-spinner animate-spin text-3xl ' />
        </div>
      )}

      {shouldLoad && (
        <Tabs>
          {COMMENT_ARTALK_SERVER && (
            <div key='Artalk'>
              <Artalk />
            </div>
          )}

          {COMMENT_TWIKOO_ENV_ID && (
            <div key='Twikoo'>
              <TwikooCompenent />
            </div>
          )}

          {COMMENT_WALINE_SERVER_URL && (
            <div key='Waline'>
              <WalineComponent />
            </div>
          )}

          {COMMENT_VALINE_APP_ID && (
            <div key='Valine' name='reply'>
              <ValineComponent path={frontMatter.id} />
            </div>
          )}

          {COMMENT_GISCUS_REPO && (
            <div key='Giscus'>
              <GiscusComponent className='px-2' />
            </div>
          )}

          {COMMENT_CUSDIS_APP_ID && (
            <div key='Cusdis'>
              <CusdisComponent frontMatter={frontMatter} />
            </div>
          )}

          {COMMENT_UTTERRANCES_REPO && (
            <div key='Utterance'>
              <UtterancesComponent
                issueTerm={frontMatter.id}
                className='px-2'
              />
            </div>
          )}

          {COMMENT_GITALK_CLIENT_ID && (
            <div key='GitTalk'>
              <GitalkComponent frontMatter={frontMatter} />
            </div>
          )}

          {COMMENT_WEBMENTION_ENABLE && (
            <div key='WebMention'>
              <WebMentionComponent frontMatter={frontMatter} className='px-2' />
            </div>
          )}
        </Tabs>
      )}
    </div>
  )
}

const WalineComponent = dynamic(
  () => {
    return import('@/components/WalineComponent')
  },
  { ssr: false }
)

const CusdisComponent = dynamic(
  () => {
    return import('@/components/CusdisComponent')
  },
  { ssr: false }
)

const TwikooCompenent = dynamic(
  () => {
    return import('@/components/Twikoo')
  },
  { ssr: false }
)

const GitalkComponent = dynamic(
  () => {
    return import('@/components/Gitalk')
  },
  { ssr: false }
)
const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/Giscus')
  },
  { ssr: false }
)
const WebMentionComponent = dynamic(
  () => {
    return import('@/components/WebMention')
  },
  { ssr: false }
)

const ValineComponent = dynamic(() => import('@/components/ValineComponent'), {
  ssr: false
})

export default Comment
