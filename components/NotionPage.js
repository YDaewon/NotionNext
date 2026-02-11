import { siteConfig } from '@/lib/config'
import { compressImage, mapImgUrl } from '@/lib/db/notion/mapImage'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import mediumZoom from '@fisch0920/medium-zoom'
import 'katex/dist/katex.min.css'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { NotionRenderer } from 'react-notion-x'

/**
 * 전체 사이트의 핵심 컴포넌트
 * Notion 데이터를 웹페이지로 렌더링합니다.
 * @param {*} param0
 * @returns
 */
const NotionPage = ({ post, className }) => {
  // 데이터베이스 및 갤러리 뷰의 클릭 이동 비활성화 여부
  const POST_DISABLE_GALLERY_CLICK = siteConfig('POST_DISABLE_GALLERY_CLICK')
  const POST_DISABLE_DATABASE_CLICK = siteConfig('POST_DISABLE_DATABASE_CLICK')
  const SPOILER_TEXT_TAG = siteConfig('SPOILER_TEXT_TAG')

  const zoom =
    isBrowser &&
    mediumZoom({
      //   container: '.notion-viewport',
      background: 'rgba(0, 0, 0, 0.2)',
      margin: getMediumZoomMargin()
    })

  const zoomRef = useRef(zoom ? zoom.clone() : null)
  const IMAGE_ZOOM_IN_WIDTH = siteConfig('IMAGE_ZOOM_IN_WIDTH', 1200)

  // 페이지가 처음 열릴 때 실행
  useEffect(() => {
    // 현재 URL을 감지하여 해당 위치(Hash)로 자동 스크롤
    autoScrollToHash()
  }, [])

  // 게시글 데이터가 변경될 때 실행
  useEffect(() => {
    // 갤러리 뷰 클릭 시 링크 이동 금지, 이미지 확대만 가능하도록 설정
    if (POST_DISABLE_GALLERY_CLICK) {
      processGalleryImg(zoomRef?.current)
    }

    // 페이지 내 데이터베이스 클릭 시 링크 이동 금지
    if (POST_DISABLE_DATABASE_CLICK) {
      processDisableDatabaseUrl()
    }

    /**
     * 이미지 확대 시 고해상도 이미지로 교체
     */
    const observer = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          if (mutation.target.classList.contains('medium-zoom-image--opened')) {
            // 애니메이션 완료 후 고해상도 이미지로 교체
            setTimeout(() => {
              const src = mutation?.target?.getAttribute('src')
              mutation?.target?.setAttribute(
                'src',
                compressImage(src, IMAGE_ZOOM_IN_WIDTH)
              )
            }, 800)
          }
        }
      })
    })

    // 페이지 요소 및 속성 변화 감시
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [post])

  useEffect(() => {
    // 스포일러 텍스트 기능
    if (SPOILER_TEXT_TAG) {
      import('lodash/escapeRegExp').then(escapeRegExp => {
        Promise.all([
          loadExternalResource('/js/spoilerText.js', 'js'),
          loadExternalResource('/css/spoiler-text.css', 'css')
        ]).then(() => {
          window.textToSpoiler &&
            window.textToSpoiler(escapeRegExp.default(SPOILER_TEXT_TAG))
        })
      })
    }

    // Notion 자체 페이지 속성(notion-collection-page-properties) 제거
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        '.notion-collection-page-properties'
      )
      elements?.forEach(element => {
        element?.remove()
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [post])

  return (
    <div
      id='notion-article'
      className={`mx-auto overflow-hidden ${className || ''}`}>
      <NotionRenderer
        recordMap={post?.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          Tweet
        }}
      />

      <AdEmbed />
      <PrismMac />
    </div>
  )
}

/**
 * 페이지 내 데이터베이스 링크 이동 비활성화
 */
const processDisableDatabaseUrl = () => {
  if (isBrowser) {
    const links = document.querySelectorAll('.notion-table a')
    for (const e of links) {
      e.removeAttribute('href')
    }
  }
}

/**
 * 갤러리 뷰 설정: 클릭 시 이미지 확대 여부 결정
 */
const processGalleryImg = zoom => {
  setTimeout(() => {
    if (isBrowser) {
      const imgList = document?.querySelectorAll(
        '.notion-collection-card-cover img'
      )
      if (imgList && zoom) {
        for (let i = 0; i < imgList.length; i++) {
          zoom.attach(imgList[i])
        }
      }

      const cards = document.getElementsByClassName('notion-collection-card')
      for (const e of cards) {
        e.removeAttribute('href')
      }
    }
  }, 800)
}

/**
 * URL 파라미터에 따라 앵커 위치로 자동 스크롤
 */
const autoScrollToHash = () => {
  setTimeout(() => {
    const hash = window?.location?.hash
    const needToJumpToTitle = hash && hash.length > 0
    if (needToJumpToTitle) {
      console.log('jump to hash', hash)
      const tocNode = document.getElementById(hash.substring(1))
      if (tocNode && tocNode?.className?.indexOf('notion') > -1) {
        tocNode.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }, 180)
}

/**
 * ID를 게시글 내부 링크로 매핑
 * @param {*} id
 * @returns
 */
const mapPageUrl = id => {
  return '/' + id.replace(/-/g, '')
}

/**
 * 브라우저 너비에 따른 이미지 줌 마진 설정
 * @returns
 */
function getMediumZoomMargin() {
  const width = window.innerWidth

  if (width < 500) {
    return 8
  } else if (width < 800) {
    return 20
  } else if (width < 1280) {
    return 30
  } else if (width < 1600) {
    return 40
  } else if (width < 1920) {
    return 48
  } else {
    return 72
  }
}

// 코드 블록 컴포넌트 로드
const Code = dynamic(
  () =>
    import('react-notion-x/build/third-party/code').then(m => {
      return m.Code
    }),
  { ssr: false }
)

// 수식 컴포넌트 로드
const Equation = dynamic(
  () =>
    import('@/components/Equation').then(async m => {
      // 화학식 지원 플러그인
      await import('@/lib/plugins/mhchem')
      return m.Equation
    }),
  { ssr: false }
)

// PDF 컴포넌트 로드
const Pdf = dynamic(() => import('@/components/Pdf').then(m => m.Pdf), {
  ssr: false
})

// PrismMac 코드 블록 스타일링
const PrismMac = dynamic(() => import('@/components/PrismMac'), {
  ssr: false
})

/**
 * 트윗 임베드
 */
const TweetEmbed = dynamic(() => import('react-tweet-embed'), {
  ssr: false
})

/**
 * 구글 애드센스 본문 광고
 */
const AdEmbed = dynamic(
  () => import('@/components/GoogleAdsense').then(m => m.AdEmbed),
  { ssr: true }
)

// 컬렉션(DB) 컴포넌트 로드
const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      m => m.Collection
    ),
  {
    ssr: true
  }
)

// 모달 컴포넌트 로드
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)

const Tweet = ({ id }) => {
  return <TweetEmbed tweetId={id} />
}

export default NotionPage
