import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 접근성 향상 컴포넌트
 * 키보드 네비게이션, 스크린 리더 지원, 고대비 모드 등의 기능을 제공합니다.
 */
const Accessibility = () => {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // 사용자 기본 설정 확인
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches

    setIsReducedMotion(prefersReducedMotion)
    setIsHighContrast(prefersHighContrast)

    // localStorage에서 설정 복원
    const savedFontSize = localStorage.getItem('accessibility-font-size')
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast')

    if (savedFontSize) setFontSize(savedFontSize)
    if (savedHighContrast === 'true') setIsHighContrast(true)

    // 설정 적용
    applyAccessibilitySettings()

    // 키보드 네비게이션 설정
    setupKeyboardNavigation()

    // 건너뛰기 링크 추가
    addSkipLinks()

    // 미디어 쿼리 변경 감지
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')

    motionQuery.addEventListener('change', (e) => setIsReducedMotion(e.matches))
    contrastQuery.addEventListener('change', (e) => setIsHighContrast(e.matches))

    return () => {
      motionQuery.removeEventListener('change', (e) => setIsReducedMotion(e.matches))
      contrastQuery.removeEventListener('change', (e) => setIsHighContrast(e.matches))
    }
  }, [])

  useEffect(() => {
    applyAccessibilitySettings()
  }, [isHighContrast, fontSize, isReducedMotion])

  const applyAccessibilitySettings = () => {
    const root = document.documentElement

    // 글자 크기 적용
    root.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large')
    root.classList.add(`font-${fontSize}`)

    // 고대비 모드 적용
    if (isHighContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // 애니메이션 축소 적용
    if (isReducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // localStorage에 저장
    localStorage.setItem('accessibility-font-size', fontSize)
    localStorage.setItem('accessibility-high-contrast', isHighContrast.toString())
  }

  const setupKeyboardNavigation = () => {
    // 모든 대화형 요소에 초점 표시기 추가
    const style = document.createElement('style')
    style.textContent = `
      .focus-visible:focus {
        outline: 2px solid #0066cc !important;
        outline-offset: 2px !important;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 4px;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      /* 고대비 모드 스타일 */
      .high-contrast {
        filter: contrast(150%);
      }
      
      .high-contrast img {
        filter: contrast(120%);
      }
      
      /* 글자 크기 스타일 */
      .font-small { font-size: 14px; }
      .font-normal { font-size: 16px; }
      .font-large { font-size: 18px; }
      .font-extra-large { font-size: 20px; }
      
      /* 애니메이션 축소 */
      .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      
      /* 스크린 리더 전용 텍스트 */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `
    document.head.appendChild(style)

    // 키보드 이벤트 리스너 추가
    document.addEventListener('keydown', (e) => {
      // Alt + H: 고대비 모드 전환
      if (e.altKey && e.key === 'h') {
        e.preventDefault()
        toggleHighContrast()
      }

      // Alt + +: 글자 크기 확대
      if (e.altKey && e.key === '=') {
        e.preventDefault()
        increaseFontSize()
      }

      // Alt + -: 글자 크기 축소
      if (e.altKey && e.key === '-') {
        e.preventDefault()
        decreaseFontSize()
      }
    })
  }

  const addSkipLinks = () => {
    // 본문 바로가기 링크 추가
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.className = 'skip-link'
    skipLink.textContent = '본문으로 건너뛰기'
    skipLink.setAttribute('aria-label', '본문으로 건너뛰기')

    document.body.insertBefore(skipLink, document.body.firstChild)

    // 메인 콘텐츠 영역에 올바른 ID 설정
    const mainContent = document.querySelector('main') || document.querySelector('#__next')
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content'
    }
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
    announceToScreenReader(isHighContrast ? '고대비 모드가 비활성화되었습니다.' : '고대비 모드가 활성화되었습니다.')
  }

  const increaseFontSize = () => {
    const sizes = ['small', 'normal', 'large', 'extra-large']
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex < sizes.length - 1) {
      const newSize = sizes[currentIndex + 1]
      setFontSize(newSize)
      announceToScreenReader(`글자 크기가 ${newSize}로 변경되었습니다.`)
    }
  }

  const decreaseFontSize = () => {
    const sizes = ['small', 'normal', 'large', 'extra-large']
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex > 0) {
      const newSize = sizes[currentIndex - 1]
      setFontSize(newSize)
      announceToScreenReader(`글자 크기가 ${newSize}로 변경되었습니다.`)
    }
  }

  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // 접근성 기능이 비활성화된 경우 렌더링하지 않음
  if (!siteConfig('ACCESSIBILITY_ENABLED', true)) {
    return null
  }

  return (
    <>
      {/* 접근성 제어 패널 */}
      <div
        className="accessibility-controls fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 border"
        role="region"
        aria-label="접근성 제어"
      >
        <h3 className="text-sm font-semibold mb-2">접근성 설정</h3>

        <div className="space-y-2">
          <button
            onClick={toggleHighContrast}
            className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-pressed={isHighContrast}
          >
            고대비 모드 {isHighContrast ? '비활성화' : '활성화'}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseFontSize}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              aria-label="글자 크기 축소"
              disabled={fontSize === 'small'}
            >
              A-
            </button>
            <span className="text-xs">글자 크기</span>
            <button
              onClick={increaseFontSize}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              aria-label="글자 크기 확대"
              disabled={fontSize === 'extra-large'}
            >
              A+
            </button>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          단축키: Alt+H (고대비), Alt+/- (글자 크기)
        </div>
      </div>

      {/* 스크린 리더 안내 영역 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" />
    </>
  )
}

export default Accessibility
