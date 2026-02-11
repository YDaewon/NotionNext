import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import ArchiveButton from './ArchiveButton'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import RandomPostButton from './RandomPostButton'
import ReadingProgress from './ReadingProgress'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'

/**
 * 헤더: 상단 네비게이션
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [textWhite, setTextWhite] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const router = useRouter()
  const slideOverRef = useRef()

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  /**
   * 스크롤바에 따른 네비게이션 스타일 전환
   */
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      // 네비게이션 바 흰색 배경 설정
      if (scrollS <= 1) {
        setFixedNav(false)
        setBgWhite(false)
        setTextWhite(false)

        // 게시글 상세 페이지 특수 처리
        if (document?.querySelector('#post-bg')) {
          setFixedNav(true)
          setTextWhite(true)
        }
      } else {
        // 아래로 스크롤 시 네비게이션 스타일
        setFixedNav(true)
        setTextWhite(false)
        setBgWhite(true)
      }
    }, 100)
  )
  useEffect(() => {
    scrollTrigger()
  }, [router])

  // 스크롤 감지
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  // 스크롤에 따른 네비게이션 메뉴 내용 슬라이드
  useEffect(() => {
    let prevScrollY = 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY > prevScrollY) {
            setActiveIndex(1) // 向下滚动时设置activeIndex为1
          } else {
            setActiveIndex(0) // 向上滚动时设置activeIndex为0
          }
          prevScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0.5;
            transform: translateY(-30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0.5;
            transform: translateY(30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-down {
          animation: fade-in-down 0.3s ease-in-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.3s ease-in-out;
        }
      `}</style>

      {/* 고정 상태일 때의 여백 높이 */}
      {fixedNav && !document?.querySelector('#post-bg') && (
        <div className='h-16'></div>
      )}

      {/* 상단 네비게이션 메뉴 바 */}
      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full duration-300 transition-all
            ${fixedNav ? 'fixed' : 'relative bg-transparent'} 
            ${textWhite ? 'text-white ' : 'text-black dark:text-white'}  
            ${navBgWhite ? 'bg-[#efefef]/90 dark:bg-zinc-900/90 shadow' : 'bg-transparent'}`}>
        <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-6'>
          {/* 좌측 로고 */}
          <Logo {...props} />

          {/* 중앙 메뉴 */}
          <div
            id='nav-bar-swipe'
            className={`hidden lg:flex flex-grow flex-col items-center justify-center h-full relative w-full`}>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 0 ? 'opacity-100 mt-0' : '-mt-20 opacity-0 invisible'}`}>
              <MenuListTop {...props} />
            </div>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 1 ? 'opacity-100 mb-0' : '-mb-20 opacity-0 invisible'}`}>
              <h1 className='font-bold text-center text-light-400 dark:text-gray-400'>
                {siteConfig('AUTHOR') || siteConfig('TITLE')}{' '}
                {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
              </h1>
            </div>
          </div>

          {/* 우측 고정 섹션 */}
          <div className='flex flex-shrink-0 justify-end items-center w-48'>
            <ArchiveButton />
            <RandomPostButton {...props} />
            <SearchButton {...props} />
            {!JSON.parse(siteConfig('THEME_SWITCH')) && (
              <div className='hidden md:block'>
                <DarkModeButton {...props} />
              </div>
            )}
            <ReadingProgress />

            {/* 모바일 메뉴 버튼 */}
            <div
              onClick={toggleMenuOpen}
              className='flex lg:hidden w-8 justify-center items-center h-8 cursor-pointer'>
              <i className='fas fa-bars' />
            </div>
          </div>

          {/* 우측 사이드 드로어 */}
          <SlideOver cRef={slideOverRef} {...props} />
        </div>
      </nav>
    </>
  )
}

export default Header
