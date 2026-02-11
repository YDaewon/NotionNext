import { createRef, useEffect } from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'
import '@waline/client/style'
import { siteConfig } from '@/lib/config'

const path = ''
let waline = null
/**
 * Waline 댓글 컴포넌트
 * @see https://waline.js.org/guide/get-started.html
 * @param {*} props
 * @returns
 */
const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

  const updateWaline = url => {
    if (url !== path && waline) {
      waline.update(props)
    }
  }

  useEffect(() => {
    if (!waline) {
      waline = init({
        ...props,
        el: containerRef.current,
        serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
        lang: siteConfig('LANG'),
        reaction: true,
        dark: 'html.dark',
        emoji: [
          '//npm.elemecdn.com/@waline/emojis@1.1.0/tieba',
          '//npm.elemecdn.com/@waline/emojis@1.1.0/weibo',
          '//npm.elemecdn.com/@waline/emojis@1.1.0/bilibili'
        ]
      })
    }

    // 경로 변경 시 댓글 업데이트
    router.events.on('routeChangeComplete', updateWaline)
    const anchor = window.location.hash
    if (anchor) {
      // 변동을 관찰할 노드 선택
      const targetNode = document.getElementsByClassName('wl-cards')[0]

      // 변동 관찰 시 실행될 콜백 함수
      const mutationCallback = (mutations) => {
        for (const mutation of mutations) {
          const type = mutation.type
          if (type === 'childList') {
            const anchorElement = document.getElementById(anchor.substring(1))
            if (anchorElement && anchorElement.className === 'wl-item') {
              anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
              setTimeout(() => {
                anchorElement.classList.add('animate__animated')
                anchorElement.classList.add('animate__bounceInRight')
                observer.disconnect()
              }, 300)
            }
          }
        }
      }

      // 자식 노드 변화 관찰 시작
      const observer = new MutationObserver(mutationCallback)
      observer.observe(targetNode, { childList: true })
    }

    return () => {
      if (waline) {
        waline.destroy()
        waline = null
      }
      router.events.off('routeChangeComplete', updateWaline)
    }
  }, [])

  return <div ref={containerRef} />
}

export default WalineComponent
