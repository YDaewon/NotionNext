import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

/**
 * 이전 글, 다음 글 추천 컴포넌트
 * @param {prev,next} param0
 * @returns
 */
export default function PostAdjacent({ prev, next }) {
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()
  const { locale } = useGlobal()

  useEffect(() => {
    setIsShow(false)
  }, [router])

  useEffect(() => {
    // 페이지 하단 도달 시 다음 글 추천 표시
    const articleEnd = document.getElementById('article-end')
    const footerBottom = document.getElementById('footer-bottom')

    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.target === articleEnd) {
          if (entry.isIntersecting) {
            setIsShow(true)
          }
        } else if (entry.target === footerBottom) {
          if (entry.isIntersecting) {
            setIsShow(false)
          }
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    if (articleEnd) observer.observe(articleEnd)
    if (footerBottom) observer.observe(footerBottom)

    return () => {
      if (articleEnd) observer.unobserve(articleEnd)
      if (footerBottom) observer.unobserve(footerBottom)
      observer.disconnect()
    }
  }, [])

  if (!prev || !next || !siteConfig('HEO_ARTICLE_ADJACENT', null, CONFIG)) {
    return <></>
  }

  return (
    <div id='article-end'>
      {/* 모바일 뷰 */}
      <section className='lg:hidden pt-8 text-gray-800 items-center text-xs md:text-sm flex flex-col m-1 '>
        <SmartLink
          href={`/${prev.slug}`}
          passHref
          className='cursor-pointer justify-between space-y-1 px-5 py-6 rounded-t-xl dark:bg-[#1e1e1e] border dark:border-gray-600 border-b-0 items-center dark:text-white flex flex-col w-full h-18 duration-200'>
          <div className='flex justify-start items-center w-full'>이전 글</div>
          <div className='flex justify-center items-center text-lg font-bold'>
            {prev.title}
          </div>
        </SmartLink>
        <SmartLink
          href={`/${next.slug}`}
          passHref
          className='cursor-pointer justify-between space-y-1 px-5 py-6 rounded-b-xl dark:bg-[#1e1e1e] border dark:border-gray-600 items-center dark:text-white flex flex-col w-full h-18 duration-200'>
          <div className='flex justify-start items-center w-full'>다음 글</div>
          <div className='flex justify-center items-center text-lg font-bold'>
            {next.title}
          </div>
        </SmartLink>
      </section>

      {/* 데스크톱 뷰 */}
      <div
        id='pc-next-post'
        className={`${isShow ? 'mb-5 opacity-100' : '-mb-24 opacity-0'} hidden md:block fixed z-40 right-10 bottom-4 duration-200 transition-all`}>
        <SmartLink
          href={`/${next.slug}`}
          className='text-sm block p-4 w-72 h-28 cursor-pointer drop-shadow-xl duration transition-all bg-[#efefef] dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:font-bold hover:text-zinc-500 rounded-lg'>
          <div className='font-semibold'>{locale.COMMON.NEXT_POST}</div>
          <hr className='mt-2 mb-3' />
          <div className='line-clamp-2'>{next?.title}</div>
        </SmartLink>
      </div>
    </div>
  )
}
