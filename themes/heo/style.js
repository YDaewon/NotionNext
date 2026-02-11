/* eslint-disable react/no-unknown-property */
/**
 * 여기에 정의된 스타일은 현재 테마에만 적용됩니다.
 * 여기서는 tailwindCSS의 @apply 구문을 지원하지 않습니다.
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      .dark body {
        background-color: #0a0a0a; /* 순수 무채색 회색 */
      }

      // 공지사항의 글꼴 색상
      #theme-heo #announcement-content .notion,
      #theme-heo #announcement-content .notion * {
        color: #18181b !important; /* 라이트 모드: 검은색 */
      }

      .dark #theme-heo #announcement-content .notion,
      .dark #theme-heo #announcement-content .notion * {
        color: #fafafa !important; /* 다크 모드: 흰색 */
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(60, 60, 67, 0.4);
        border-radius: 8px;
        cursor: pointer;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #more {
        white-space: nowrap;
      }

      .today-card-cover {
        -webkit-mask-image: linear-gradient(to top, transparent 5%, black 70%);
        mask-image: linear-gradient(to top, transparent 5%, black 70%);
      }

      .recent-top-post-group::-webkit-scrollbar {
        display: none;
      }

      .scroll-hidden::-webkit-scrollbar {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      // 태그 롤링 애니메이션
      .tags-group-wrapper {
        animation: rowup 60s linear infinite;
      }

      @keyframes rowup {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  )
}

export { Style }

