import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 게시글 목록 상단 바
 * @param {*} props
 * @returns
 */
export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  // ref 생성
  const categoryBarItemsRef = useRef(null)

  // #right 클릭 시 #category-bar-items를 맨 오른쪽으로 스크롤
  const handleToggleScroll = () => {
    if (categoryBarItemsRef.current) {
      const { scrollWidth, clientWidth } = categoryBarItemsRef.current
      if (scrollRight) {
        categoryBarItemsRef.current.scrollLeft = 0
      } else {
        categoryBarItemsRef.current.scrollLeft = scrollWidth - clientWidth
      }
      setScrollRight(!scrollRight)
    }
  }

  return (
    <div
      id='category-bar'
      className={`wow fadeInUp flex flex-nowrap justify-between items-center h-12 mb-4 space-x-2 w-full lg:bg-[#efefef] dark:lg:bg-zinc-800  
            ${border ? 'lg:border lg:hover:border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-400 ' : ''}  py-2 lg:px-2 rounded-xl transition-colors duration-200`}>
      <div
        id='category-bar-items'
        ref={categoryBarItemsRef}
        className='scroll-smooth max-w-4xl rounded-lg scroll-hidden flex justify-start flex-nowrap items-center overflow-x-scroll'>
        <MenuItem href='/' name={locale.NAV.INDEX} />
        {categoryOptions?.map((c, index) => (
          <MenuItem key={index} href={`/category/${c.name}`} name={c.name} />
        ))}
      </div>

      <div id='category-bar-next' className='flex items-center justify-center'>
        <div
          id='right'
          className='cursor-pointer mx-2 dark:text-zinc-300 dark:hover:text-zinc-100 hover:text-zinc-900'
          onClick={handleToggleScroll}>
          {scrollRight ? (
            <ChevronDoubleLeft className={'w-5 h-5'} />
          ) : (
            <ChevronDoubleRight className={'w-5 h-5'} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * 버튼
 * @param {*} param0
 * @returns
 */
const MenuItem = ({ href, name }) => {
  const router = useRouter()
  const { category } = router.query
  const selected = category === name
  return (
    <div
      className={`whitespace-nowrap mr-2 duration-200 transition-all font-bold px-2 py-0.5 rounded-md text-zinc-900 dark:text-zinc-100 hover:text-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 ${selected ? 'text-zinc-100 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900' : ''}`}>
      <SmartLink href={href}>{name}</SmartLink>
    </div>
  )
}
