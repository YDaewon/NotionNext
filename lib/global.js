import { APPEARANCE, LANG, NOTION_PAGE_ID, THEME } from '@/blog.config'
import {
  THEMES,
  getThemeConfig,
  initDarkMode,
  saveDarkModeToLocalStorage
} from '@/themes/theme'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { generateLocaleDict, initLocale, redirectUserLang } from './utils/lang'

/**
 * 전역 컨텍스트 (Global Context)
 */
const GlobalContext = createContext()

export function GlobalContextProvider(props) {
  const {
    post,
    children,
    siteInfo,
    categoryOptions,
    tagOptions,
    NOTION_CONFIG
  } = props

  const [lang, updateLang] = useState(NOTION_CONFIG?.LANG || LANG) // 기본 언어
  const [locale, updateLocale] = useState(
    generateLocaleDict(NOTION_CONFIG?.LANG || LANG)
  ) // 기본 로케일 딕셔너리
  const [theme, setTheme] = useState(NOTION_CONFIG?.THEME || THEME) // 기본 블로그 테마
  const [THEME_CONFIG, SET_THEME_CONFIG] = useState(null) // 테마 상세 설정
  const [isLiteMode, setLiteMode] = useState(false) // 라이트(극경량) 모드 여부

  const defaultDarkMode = NOTION_CONFIG?.APPEARANCE || APPEARANCE
  const [isDarkMode, updateDarkMode] = useState(defaultDarkMode === 'dark') // 다크 모드 여부
  const [onLoading, setOnLoading] = useState(false) // 데이터 로딩 중 여부
  const router = useRouter()

  // 로그인 인증 관련 (Clerk 사용 시)
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const { isLoaded, isSignedIn, user } = enableClerk
    ? /* eslint-disable-next-line react-hooks/rules-of-hooks */
    useUser()
    : { isLoaded: true, isSignedIn: false, user: false }

  // 전체 너비 여부
  const fullWidth = post?.fullWidth ?? false

  // 테마 전환 함수
  function switchTheme() {
    const query = router.query
    const currentTheme = query.theme || theme
    const currentIndex = THEMES.indexOf(currentTheme)
    const newIndex = currentIndex < THEMES.length - 1 ? currentIndex + 1 : 0
    const newTheme = THEMES[newIndex]
    query.theme = newTheme
    router.push({ pathname: router.pathname, query })
    return newTheme
  }

  // 테마 설정 업데이트
  const updateThemeConfig = async theme => {
    const config = await getThemeConfig(theme)
    SET_THEME_CONFIG(config)
  }

  // 다크 모드 토글
  const toggleDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToLocalStorage(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  function changeLang(lang) {
    if (lang) {
      updateLang(lang)
      updateLocale(generateLocaleDict(lang))
    }
  }

  // 라우트 변경 시 언어 처리 및 라이트 모드 처리
  useEffect(() => {
    initLocale(router.locale, changeLang, updateLocale)
    if (router.query.lite && router.query.lite === 'true') {
      setLiteMode(true)
    }
  }, [router])

  // 첫 로드 시 다크 모드 및 언어 리다이렉트 설정
  useEffect(() => {
    initDarkMode(updateDarkMode, defaultDarkMode)
    if (
      NOTION_CONFIG?.REDIRECT_LANG &&
      JSON.parse(NOTION_CONFIG?.REDIRECT_LANG)
    ) {
      redirectUserLang(NOTION_PAGE_ID)
    }
    setOnLoading(false)
  }, [])

  useEffect(() => {
    const handleStart = url => {
      const themeValue = router.query.theme
      const themeStr = Array.isArray(themeValue) ? themeValue[0] : themeValue

      if (themeStr && !url.includes(`theme=${themeStr}`)) {
        const newUrl = `${url}${url.includes('?') ? '&' : '?'}theme=${themeStr}`
        router.push(newUrl)
      }

      if (!onLoading) {
        setOnLoading(true)
      }
    }

    const handleStop = () => {
      if (onLoading) {
        setOnLoading(false)
      }
    }

    const currentTheme = router?.query?.theme || theme
    updateThemeConfig(currentTheme)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeError', handleStop)
    router.events.on('routeChangeComplete', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router, onLoading])

  return (
    <GlobalContext.Provider
      value={{
        isLiteMode,
        isLoaded,
        isSignedIn,
        user,
        fullWidth,
        NOTION_CONFIG,
        THEME_CONFIG,
        toggleDarkMode,
        onLoading,
        setOnLoading,
        lang,
        changeLang,
        locale,
        updateLocale,
        isDarkMode,
        updateDarkMode,
        theme,
        setTheme,
        switchTheme,
        siteInfo,
        categoryOptions,
        tagOptions
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
