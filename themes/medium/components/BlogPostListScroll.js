import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 블로그 게시글 목록 무한 스크롤 컴포넌트
 * @param posts 전체 게시글
 * @param currentSearch 현재 검색어
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({ posts = [], currentSearch }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const [page, updatePage] = useState(1)
  const router = useRouter()
  let filteredPosts = Object.assign(posts)
  const searchKey = router?.query?.s || null
  if (searchKey) {
    filteredPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchKey.toLowerCase())
    })
  }
  const postsToShow = getPostByPage(page, filteredPosts, POSTS_PER_PAGE)

  let hasMore = false
  if (filteredPosts) {
    const totalCount = filteredPosts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 스크롤 감지 및 자동 페이지 로딩
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = useRef(null)
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id='posts-wrapper' ref={targetRef} className='w-full'>
        {/* 게시글 목록 */}
        <div className='space-y-1 lg:space-y-4'>
          {postsToShow?.map(post => (
            <BlogPostCard key={post.id} post={post} showSummary={true} />
          ))}
        </div>

        <div>
          <div
            onClick={() => {
              handleGetMore()
            }}
            className='w-full my-4 py-4 text-center cursor-pointer dark:text-gray-200'>
            {' '}
            {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}{' '}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 1페이지부터 지정된 페이지까지의 게시글을 가져옵니다.
 * @param page 현재 페이지 번호
 * @param totalPosts 전체 게시글
 * @param POSTS_PER_PAGE 페이지당 게시글 수
 * @returns {*}
 */
const getPostByPage = function (page, totalPosts, POSTS_PER_PAGE) {
  return totalPosts.slice(0, POSTS_PER_PAGE * page)
}

export default BlogPostListScroll
