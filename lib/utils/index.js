import { memo } from 'react'

/**
 * 브라우저(클라이언트) 환경인지 확인
 * @returns {boolean}
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * 배열의 순서를 무작위로 섞음 (Shuffle)
 * @param {*} array
 * @returns
 */
export const shuffleArray = array => {
  if (!array) {
    return []
  }
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * 검색 엔진 봇(Google, Bing, Baidu 등)인지 확인
 * @returns
 */
export const isSearchEngineBot =
  typeof navigator !== 'undefined' &&
  /Googlebot|bingbot|Baidu/.test(navigator.userAgent)

/**
 * 컴포넌트 메모이제이션 (성능 최적화)
 */
export const memorize = Component => {
  const MemoizedComponent = props => {
    return <Component {...props} />
  }
  return memo(MemoizedComponent)
}

/**
 * article/https://test.com 과 같이 잘못 결합된 슬러그에서 URL 추출
 * @param {*} str
 * @returns
 */
export function sliceUrlFromHttp(str) {
  if (str?.includes('http:') || str?.includes('https:')) {
    const index = str?.indexOf('http')
    return str.slice(index, str.length)
  } else {
    return str
  }
}

/**
 * 상대 경로를 절대 경로로 변환 (시작 부분에 / 추가)
 * 중복된 슬래시(//)는 하나로 제거
 * @param {*} str
 */
export function convertUrlStartWithOneSlash(str) {
  if (!str) {
    return '#'
  }
  if (!str.startsWith('/')) {
    str = '/' + str
  }
  str = str.replace(/\/+/g, '/')
  return str
}

/**
 * 'URL 스타일'의 경로인지 확인 (내부 또는 외부 링크)
 * @param str
 * @returns {boolean}
 */
export function isUrlLikePath(str) {
  return typeof str === 'string' && (str.startsWith('/') || isHttpLink(str))
}

/**
 * http(s)로 시작하는 외부 링크인지 확인
 * @param str
 * @returns {boolean}
 */
export function isHttpLink(str) {
  return typeof str === 'string' && /^https?:\/\//i.test(str)
}

/**
 * 이메일(mailto:) 또는 전화(tel:) 링크인지 확인
 * @param href
 * @returns {boolean}
 */
export function isMailOrTelLink(href) {
  return /^(mailto:|tel:)/i.test(href)
}

/**
 * 문자열이 UUID 형식인지 확인
 * @param str
 * @returns {boolean}
 */
export function checkStrIsUuid(str) {
  if (!str) {
    return false
  }
  const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  return regex.test(str)
}

/**
 * 문자열이 Notion ID(32자리 영숫자) 형식인지 확인
 * @param str
 * @returns {boolean}
 */
export function checkStrIsNotionId(str) {
  if (!str) {
    return false
  }
  const regex = /^[a-zA-Z0-9]{32}$/
  return regex.test(str)
}

/**
 * URL의 마지막 슬래시(/) 이후의 내용을 가져옴
 * @param url
 * @returns
 */
export function getLastPartOfUrl(url) {
  if (!url) {
    return ''
  }
  const lastSlashIndex = url.lastIndexOf('/')
  if (lastSlashIndex === -1) {
    return url
  }
  return url.substring(lastSlashIndex + 1)
}

/**
 * 외부 리소스(JS, CSS, 폰트) 비동기 로드
 * @param url 리소스 주소
 * @param type 리소스 타입 (js, css, font)
 * @returns {Promise<unknown>}
 */
export function loadExternalResource(url, type = 'js') {
  const elements =
    type === 'js'
      ? document.querySelectorAll(`[src='${url}']`)
      : document.querySelectorAll(`[href='${url}']`)

  return new Promise((resolve, reject) => {
    if (elements.length > 0 || !url) {
      resolve(url)
      return url
    }

    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'font') {
      tag = document.createElement('link')
      tag.rel = 'preload'
      tag.as = 'font'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }
    if (tag) {
      tag.onload = () => {
        resolve(url)
      }
      tag.onerror = () => {
        console.warn('Load Error', url)
        reject(url)
      }
      document.head.appendChild(tag)
    }
  })
}

/**
 * URL에서 쿼리 파라미터 값 가져오기
 * @param key 파라미터 키
 * @returns
 */
export function getQueryVariable(key) {
  const query = isBrowser ? window.location.search.substring(1) : ''
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  return false
}

/**
 * 특정 URL 문자열에서 쿼리 파라미터 값 추출
 * @param {string} url
 * @param {string} param
 * @returns {string|null}
 */
export function getQueryParam(url, param) {
  if (!url) {
    return ''
  }
  const urlWithoutHash = url.split('#')[0]
  const searchParams = new URLSearchParams(urlWithoutHash.split('?')[1])
  return searchParams.get(param)
}

/**
 * 두 서비스 객체를 깊은 수준에서 병합 (Deep Merge)
 * @param target
 * @param sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

/**
 * 객체인지 확인 (배열 제외)
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 반복 가능한(Iterable) 객체인지 확인
 * @param {*} obj
 * @returns
 */
export function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === 'function'
}

/**
 * 객체 깊은 복사 (Deep Clone)
 * @param {*} obj
 * @returns
 */
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  } else if (obj && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] instanceof Date) {
          newObj[key] = new Date(obj[key].getTime()).toISOString()
        } else {
          newObj[key] = deepClone(obj[key])
        }
      }
    }
    return newObj
  } else {
    return obj
  }
}

/**
 * 지연 시간 (밀리초)
 * @param {*} ms
 * @returns
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 특정 페이지 범위의 목록 가져오기
 * @param list 전체 목록
 * @param pageIndex 현재 페이지 번호
 * @param pageSize 페이지당 크기
 * @returns {*}
 */
export const getListByPage = function (list, pageIndex, pageSize) {
  return list.slice(0, pageIndex * pageSize)
}

/**
 * 모바일 기기인지 확인
 */
export const isMobile = () => {
  let isMobile = false
  if (!isBrowser) {
    return isMobile
  }

  if (!isMobile && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    isMobile = true
  }

  if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
    isMobile = true
  }

  if (typeof window.orientation !== 'undefined') {
    isMobile = true
  }

  return isMobile
}

/**
 * 페이지 내 텍스트 노드를 스캔하여 URL 형식을 링크로 변환
 * @param {*} node
 */
export const scanAndConvertToLinks = node => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    const urlRegex = /https?:\/\/[^\s]+/g
    let lastIndex = 0
    let match

    const newNode = document.createElement('span')

    while ((match = urlRegex.exec(text)) !== null) {
      const beforeText = text.substring(lastIndex, match.index)
      const url = match[0]

      if (beforeText) {
        newNode.appendChild(document.createTextNode(beforeText))
      }

      const link = document.createElement('a')
      link.href = url
      link.target = '_blank'
      link.textContent = url

      newNode.appendChild(link)

      lastIndex = urlRegex.lastIndex
    }

    if (lastIndex < text.length) {
      newNode.appendChild(document.createTextNode(text.substring(lastIndex)))
    }

    node.parentNode.replaceChild(newNode, node)
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      scanAndConvertToLinks(childNode)
    }
  }
}

/**
 * URL의 마지막 세그먼트(슬래시 이후) 추출
 * @param {*} url
 * @returns
 */
export function getLastSegmentFromUrl(url) {
  if (!url) {
    return ''
  }
  const trimmedUrl = url.split('?')[0]
  const segments = trimmedUrl.split('/')
  return segments[segments.length - 1]
}
