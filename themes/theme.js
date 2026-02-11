import BLOG, { LAYOUT_MAPPINGS } from '@/blog.config'
import * as ThemeComponents from '@theme-components'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { getQueryParam, getQueryVariable, isBrowser } from '../lib/utils'

// next.config.js에서 스캔된 모든 테마 목록
export const { THEMES = [] } = getConfig()?.publicRuntimeConfig || {}

/**
 * 테마 설정 가져오기
 * @param {string} themeQuery - 테마 쿼리 파라미터 (여러 테마일 경우 콤마로 구분)
 * @returns {Promise<object>} 테마 설정 객체
 */
export const getThemeConfig = async themeQuery => {
  // themeQuery가 존재하고 기본 테마와 다를 경우 다중 테마 처리
  if (typeof themeQuery === 'string' && themeQuery.trim()) {
    // themeQuery에서 첫 번째 테마 추출 (콤마 기준)
    const themeName = themeQuery.split(',')[0].trim()

    // themeQuery가 현재 기본 테마와 다를 경우 지정된 테마 설정 로드
    if (themeName !== BLOG.THEME) {
      try {
        // 테마 설정 동적 임포트
        const THEME_CONFIG = await import(`@/themes/${themeName}`)
          .then(m => m.THEME_CONFIG)
          .catch(err => {
            console.error(`${themeName} 테마를 로드하지 못했습니다:`, err)
            return null // 로드 실패 시 null 또는 기본값 반환
          })

        // 테마 설정 로드 성공 시 해당 설정 반환
        if (THEME_CONFIG) {
          return THEME_CONFIG
        } else {
          // 로드 실패 시 기본 테마 설정으로 대체
          console.warn(
            `${themeName} 로드 실패. 기본 테마로 돌아갑니다.`
          )
          return ThemeComponents?.THEME_CONFIG
        }
      } catch (error) {
        // 임포트 과정에서 예외 발생 시 기본 테마 설정 반환
        console.error(
          `${themeName} 테마 설정 로드 중 오류 발생:`,
          error
        )
        return ThemeComponents?.THEME_CONFIG
      }
    }
  }

  // themeQuery가 없거나 기본 테마와 같을 경우 기본 설정 반환
  return ThemeComponents?.THEME_CONFIG
}

/**
 * 전체 레이아웃 로드
 * @param {*} theme
 * @returns
 */
export const getBaseLayoutByTheme = theme => {
  const LayoutBase = ThemeComponents['LayoutBase']
  const isDefaultTheme = !theme || theme === BLOG.THEME
  if (!isDefaultTheme) {
    return dynamic(
      () => import(`@/themes/${theme}`).then(m => m['LayoutBase']),
      { ssr: true }
    )
  }

  return LayoutBase
}

/**
 * 레이아웃 동적 획득
 * @param {*} props
 */
export const DynamicLayout = props => {
  const { theme, layoutName } = props
  const SelectedLayout = useLayoutByTheme({ layoutName, theme })
  return <SelectedLayout {...props} />
}

/**
 * 테마 파일 로드
 * @param {*} layoutName
 * @param {*} theme
 * @returns
 */
export const useLayoutByTheme = ({ layoutName, theme }) => {
  // const layoutName = getLayoutNameByPath(router.pathname, router.asPath)
  const LayoutComponents =
    ThemeComponents[layoutName] || ThemeComponents.LayoutSlug

  const router = useRouter()
  const themeQuery = getQueryParam(router?.asPath, 'theme') || theme
  const isDefaultTheme = !themeQuery || themeQuery === BLOG.THEME

  // 기본 테마가 아닌 경우 로드
  if (!isDefaultTheme) {
    const loadThemeComponents = componentsSource => {
      const components =
        componentsSource[layoutName] || componentsSource.LayoutSlug
      setTimeout(fixThemeDOM, 500)
      return components
    }
    return dynamic(
      () => import(`@/themes/${themeQuery}`).then(m => loadThemeComponents(m)),
      { ssr: true }
    )
  }

  setTimeout(fixThemeDOM, 100)
  return LayoutComponents
}

/**
 * 경로에 따른 레이아웃 명칭 획득
 * @param {*} path
 * @returns
 */
const getLayoutNameByPath = path => {
  const layoutName = LAYOUT_MAPPINGS[path] || 'LayoutSlug'
  // console.log('경로-레이아웃', path, layoutName)
  return layoutName
}

/**
 * 테마 전환 시 특수 처리
 * 불필요한 요소 삭제
 */
const fixThemeDOM = () => {
  if (isBrowser) {
    const elements = document.querySelectorAll('[id^="theme-"]')
    if (elements?.length > 1) {
      for (let i = 0; i < elements.length - 1; i++) {
        if (
          elements[i] &&
          elements[i].parentNode &&
          elements[i].parentNode.contains(elements[i])
        ) {
          elements[i].parentNode.removeChild(elements[i])
        }
      }
      elements[0]?.scrollIntoView()
    }
  }
}

/**
 * 다크모드 초기화 (우선순위: query > cookies > systemPrefer)
 * @param isDarkMode
 * @param updateDarkMode 다크모드 상태 변경 함수
 * @description 로컬스토리지에 저장된 사용자 테마 설정 읽기
 */
export const initDarkMode = (updateDarkMode, defaultDarkMode) => {
  // 사용자 브라우저/시스템의 다크모드 선호 여부 확인
  let newDarkMode = isPreferDark()

  // 로컬스토리지에 저장된 사용자의 이전 설정 확인
  const userDarkMode = loadDarkModeFromLocalStorage()
  if (userDarkMode) {
    newDarkMode = userDarkMode === 'dark' || userDarkMode === 'true'
    saveDarkModeToLocalStorage(newDarkMode) // 사용자가 수동으로 설정한 경우에만 저장
  }

  // 사이트에서 기본 다크모드를 강제한 경우 해당 설정 적용
  if (defaultDarkMode === 'true') {
    newDarkMode = true
  }

  // URL 쿼리 파라미터에 모드 설정이 있는 경우 확인
  const queryMode = getQueryVariable('mode')
  if (queryMode) {
    newDarkMode = queryMode === 'dark'
  }

  updateDarkMode(newDarkMode)
  document
    .getElementsByTagName('html')[0]
    .setAttribute('class', newDarkMode ? 'dark' : 'light')
}

/**
 * 다크모드 선호 여부 (시스템 설정 및 현재 시간 기준)
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  if (BLOG.APPEARANCE === 'auto') {
    // 시스템이 다크모드이거나 현재 시간이 야간일 경우 다크모드 강제 적용
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    )
  }
  return false
}

/**
 * 다크모드 설정 읽기
 * @returns {*}
 */
export const loadDarkModeFromLocalStorage = () => {
  return localStorage.getItem('darkMode')
}

/**
 * 다크모드 설정 저장
 * @param newTheme
 */
export const saveDarkModeToLocalStorage = newTheme => {
  localStorage.setItem('darkMode', newTheme)
}