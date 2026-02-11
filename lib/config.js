'use client'

import BLOG from '@/blog.config'
import { useGlobal } from './global'
import { deepClone, isUrlLikePath } from './utils'

/**
 * 설정 읽기 순서:
 * 1. NotionConfig 테이블 우선 읽기
 * 2. 환경 변수 읽기
 * 3. blog.config.js 또는 각 테마의 CONFIG 파일 읽기
 * @param {*} key ; 설정 키 이름
 * @param {*} defaultVal ; 기본값 (설정이 없을 경우)
 * @param {*} extendConfig ; 참조 설정 객체 {key:val}, Notion에서 찾지 못할 경우 여기서 우선 검색
 * @returns
 */
export const siteConfig = (key, defaultVal = null, extendConfig = {}) => {
  if (!key) {
    return null
  }
  const getValue = (value, fallback) => (hasVal(value) ? value : fallback)
  const hasVal = value => value !== undefined && value !== null

  // 특수 설정 처리; 아래 설정들은 서버 측에서만 유효합니다. 
  // Global의 NOTION_CONFIG는 클라이언트 컴포넌트 전용이므로 extendConfig에서 읽어야 합니다.
  switch (key) {
    case 'NEXT_REVALIDATE_SECOND':
    case 'POST_RECOMMEND_COUNT':
    case 'IMAGE_COMPRESS_WIDTH':
    case 'PSEUDO_STATIC':
    case 'POSTS_SORT_BY':
    case 'POSTS_PER_PAGE':
    case 'POST_PREVIEW_LINES':
    case 'POST_URL_PREFIX':
    case 'POST_LIST_STYLE':
    case 'POST_LIST_PREVIEW':
    case 'POST_URL_PREFIX_MAPPING_CATEGORY':
    case 'POST_SCHEDULE_PUBLISH':
    case 'IS_TAG_COLOR_DISTINGUISHED':
    case 'TAG_SORT_BY_COUNT':
    case 'THEME':
    case 'LINK':
    case 'AI_SUMMARY_API':
    case 'AI_SUMMARY_KEY':
    case 'AI_SUMMARY_CACHE_TIME':
    case 'AI_SUMMARY_WORD_LIMIT':
    case 'UUID_REDIRECT':
      // LINK는 특별 처리가 필요함
      if (key === 'LINK') {
        if (!extendConfig || Object.keys(extendConfig).length === 0) {
          break
        }
      }
      return convertVal(
        getValue(extendConfig[key], getValue(defaultVal, BLOG[key]))
      )
    default:
  }

  let global = {}
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    global = useGlobal()
  } catch (error) {
    // 로컬 디버깅용
    // console.warn('SiteConfig 경고', key, error)
  }

  // Notion 테이블 설정을 최우선으로 읽음
  let val = null
  let siteInfo = null

  if (global) {
    siteInfo = global.siteInfo
    val = global.NOTION_CONFIG?.[key] || global.THEME_CONFIG?.[key]
  }

  if (!val) {
    // 일부 키에 대한 호환성 처리
    switch (key) {
      case 'HOME_BANNER_IMAGE':
        val = siteInfo?.pageCover // Notion 커버 이미지 사용
        break
      case 'AVATAR':
        val = siteInfo?.icon // Notion 아이콘 사용
        break
      case 'TITLE':
        val = siteInfo?.title // Notion 제목 사용
        break
      case 'DESCRIPTION':
        val = siteInfo?.description // Notion 설명 사용
        break
    }
  }

  // 두 번째로 extendConfig에서 읽기 시도
  if (!hasVal(val) && extendConfig) {
    val = extendConfig[key]
  }

  // 세 번째로 Notion에 설정이 없으면 blog.config.js에서 읽음
  if (!hasVal(val)) {
    val = BLOG[key]
  }

  if (!hasVal(val)) {
    return defaultVal
  }

  return convertVal(val)
}

export const cleanJsonString = val => {
  // 정규표현식을 사용하여 불필요한 공백, 줄바꿈, 탭 제거
  return val.replace(/\s+/g, ' ').trim()
}

/**
 * 환경 변수나 NotionConfig에서 읽어온 값은 모두 문자열 타입입니다.
 * 숫자, 불리언, 배열([]), 객체({}) 형태인 경우 해당 타입으로 변환합니다.
 * @param {*} val
 * @returns
 */
export const convertVal = val => {
  // 이미 객체, 배열, 불리언 타입인 경우 처리 불필요
  if (typeof val !== 'string' || !val) {
    return val
  }

  // 숫자인지 확인하고 오버플로우 방지
  if (/^\d+$/.test(val)) {
    const parsedNum = Number(val)
    // MAX_SAFE_INTEGER보다 크면 문자열로 유지
    if (parsedNum > Number.MAX_SAFE_INTEGER) {
      return val + ''
    }
    return parsedNum
  }

  // 불리언 확인
  if (val === 'true' || val === 'false') {
    return JSON.parse(val)
  }

  // URL 형태인 경우 그대로 반환
  if (isUrlLikePath(val)) {
    return val
  }

  // 문자열 시작 부분의 공백 제거 후 객체/배열 형태인지 확인
  if (!val.trim().startsWith('{') && !val.trim().startsWith('[')) {
    return val
  }

  // [] 또는 {} 형태의 문자열을 객체로 변환
  try {
    val = cleanJsonString(val)
    const parsedJson = JSON.parse(val)
    if (parsedJson !== null) {
      return parsedJson
    }
  } catch (error) {
    // 파싱 실패 시 원본 문자열 반환
    return val
  }

  return val
}

/**
 * 모든 설정 읽기
 * 1. NotionConfig 테이블 우선
 * 2. 환경 변수
 * 3. blog.config.js 파일
 * @returns
 */
export const siteConfigMap = () => {
  const val = deepClone(BLOG)
  for (const key in val) {
    val[key] = siteConfig(key)
  }
  return val
}
