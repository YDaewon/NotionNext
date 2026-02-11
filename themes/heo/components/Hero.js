// import Image from 'next/image'
import { ArrowSmallRight, PlusSmall } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 상단 히어로 영역
 * 좌측: 배너 그룹
 * 우측: 추천 카드/포스트 그룹
 * @returns
 */
const Hero = props => {
  const HEO_HERO_REVERSE = siteConfig('HEO_HERO_REVERSE', false, CONFIG)
  return (
    <div
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${HEO_HERO_REVERSE ? 'xl:flex-row-reverse' : ''}
           recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative`}>
        {/* 좌측 배너 그룹 */}
        <BannerGroup {...props} />

        {/* 중앙 여백 */}
        <div className='px-1.5 h-full'></div>

        {/* 우측 상단 고정/추천 포스트 그룹 */}
        <TopGroup {...props} />
      </div>
    </div>
  )
}

/**
 * 히어로 영역 좌측 배너 그룹
 * @returns
 */
function BannerGroup(props) {
  return (
    // 좌측 히어로 섹션
    <div
      id='bannerGroup'
      className='flex flex-col justify-between flex-1 mr-2 max-w-[42rem]'>
      {/* 배너 이미지/텍스트 */}
      <Banner {...props} />
      {/* 카테고리 메뉴 */}
      <GroupMenu />
    </div>
  )
}

/**
 * 히어로 영역 좌측 상단 배너
 * @returns
 */
function Banner(props) {
  const router = useRouter()
  const { allNavPages } = props
  /**
   * 랜덤 포스트로 이동
   */
  function handleClickBanner() {
    const randomIndex = Math.floor(Math.random() * allNavPages.length)
    const randomPost = allNavPages[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  // 마우스 오버 시 표시될 텍스트
  const coverTitle = siteConfig('HEO_HERO_COVER_TITLE')

  return (
    <div
      id='banners'
      onClick={handleClickBanner}
      className='hidden xl:flex xl:flex-col group h-full bg-[#efefef] dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700 mb-3 relative overflow-hidden'>
      <div
        id='banner-title'
        className='z-10 flex flex-col absolute top-10 left-10'>
        <div className='text-4xl font-bold mb-3  dark:text-white'>
          {siteConfig('HEO_HERO_TITLE_1', null, CONFIG)}
          <br />
          {siteConfig('HEO_HERO_TITLE_2', null, CONFIG)}
        </div>
        <div className='text-xs text-gray-600  dark:text-gray-200'>
          {siteConfig('HEO_HERO_TITLE_3', null, CONFIG)}
        </div>
      </div>

      {/* 대각선으로 스크롤되는 기술 아이콘들 */}
      <TagsGroupBar />

      {/* 마우스 오버 커버 */}
      <div
        id='banner-cover'
        style={{ backdropFilter: 'blur(15px)' }}
        className={
          'z-20 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 duration-300 transition-all bg-zinc-900/80 dark:bg-zinc-100/80 dark:text-zinc-900 text-zinc-100 cursor-pointer absolute w-full h-full top-0 flex justify-start items-center'
        }>
        <div className='ml-12 -translate-x-32 group-hover:translate-x-0 duration-300 transition-all ease-in'>
          <div className='text-7xl text-white font-extrabold'>{coverTitle}</div>
          <div className='-ml-3 text-gray-300'>
            <ArrowSmallRight className={'w-24 h-24 stroke-2'} />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 기술 아이콘 스크롤 바
 */
function TagsGroupBar() {
  let groupIcons = siteConfig('HEO_GROUP_ICONS', null, CONFIG)
  if (groupIcons) {
    groupIcons = groupIcons.concat(groupIcons)
  }
  return (
    <div className='tags-group-all flex -rotate-[30deg] h-full'>
      <div className='tags-group-wrapper flex flex-nowrap absolute top-16'>
        {groupIcons?.map((g, index) => {
          return (
            <div key={index} className='tags-group-icon-pair ml-6 select-none'>
              <div
                style={{ background: g.color_1 }}
                className={
                  'tags-group-icon w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'
                }>
                <LazyImage
                  priority={true}
                  src={g.img_1}
                  title={g.title_1}
                  className='w-2/3 hidden xl:block'
                />
              </div>
              <div
                style={{ background: g.color_2 }}
                className={
                  'tags-group-icon  mt-5 w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'
                }>
                <LazyImage
                  priority={true}
                  src={g.img_2}
                  title={g.title_2}
                  className='w-2/3 hidden xl:block'
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 히어로 영역 좌측 하단 고정 카테고리 버튼 3개
 * @returns
 */
function GroupMenu() {
  const url_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.url || ''
  const title_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.title || ''
  const url_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.url || ''
  const title_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.title || ''
  const url_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.url || ''
  const title_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.title || ''

  return (
    <div className='h-[165px] select-none xl:h-20 flex flex-col justify-between xl:space-y-0 xl:flex-row w-28 lg:w-48 xl:w-full xl:flex-nowrap xl:space-x-3'>
      <SmartLink
        href={url_1}
        className='group relative overflow-hidden bg-zinc-300 dark:bg-zinc-600 flex h-20 justify-start items-center text-zinc-900 dark:text-zinc-100 rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold lg:text-lg  pl-5 relative -mt-2'>
          {title_1}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-star text-4xl'></i>
        </div>
      </SmartLink>
      <SmartLink
        href={url_2}
        className='group relative overflow-hidden bg-zinc-400 dark:bg-zinc-500 flex h-20 justify-start items-center text-zinc-900 dark:text-zinc-100 rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold lg:text-lg pl-5 relative -mt-2'>
          {title_2}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-fire-flame-curved text-4xl'></i>
        </div>
      </SmartLink>
      {/* 소형 화면에서는 세 번째 버튼을 숨김 */}
      <SmartLink
        href={url_3}
        className='group relative overflow-hidden bg-zinc-500 dark:bg-zinc-400 hidden h-20 xl:flex justify-start items-center text-zinc-900 dark:text-zinc-100 rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold text-lg pl-5 relative -mt-2'>
          {title_3}
          <span className='absolute -bottom-0.5 left-5 w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full'></span>
        </div>
        <div className='absolute right-6 duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-book-bookmark text-4xl '></i>
        </div>
      </SmartLink>
    </div>
  )
}

/**
 * 상단 추천 포스트 그룹
 */
function TopGroup(props) {
  const { latestPosts, allNavPages, siteInfo } = props
  const { locale } = useGlobal()
  const todayCardRef = useRef()
  function handleMouseLeave() {
    todayCardRef.current.coverUp()
  }

  // 상단 추천 게시글 가져오기
  const topPosts = getTopPosts({ latestPosts, allNavPages })

  return (
    <div
      id='hero-right-wrapper'
      onMouseLeave={handleMouseLeave}
      className='flex-1 relative w-full'>
      {/* 추천 게시글 리스트 */}
      <div
        id='top-group'
        className='w-full flex space-x-3 xl:space-x-0 xl:grid xl:grid-cols-3 xl:gap-3 xl:h-[342px]'>
        {topPosts?.map((p, index) => {
          return (
            <SmartLink href={`${siteConfig('SUB_PATH', '')}/${p?.slug}`} key={index}>
              <div className='cursor-pointer h-[164px] group relative flex flex-col w-52 xl:w-full overflow-hidden shadow bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-xl border border-zinc-300 dark:border-zinc-700'>
                <LazyImage
                  priority={index === 0}
                  className='h-24 object-cover'
                  alt={p?.title}
                  src={p?.pageCoverThumbnail || siteInfo?.pageCover}
                />
                <div className='group-hover:text-zinc-500 dark:group-hover:text-zinc-400 line-clamp-2 overflow-hidden m-2 font-semibold'>
                  {p?.title}
                </div>
                {/* 마우스 오버 시 표시되는 '추천' 배지 */}
                <div className='opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-200 transition-all absolute -top-2 -left-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-xl overflow-hidden pr-2 pb-2 pl-4 pt-4 text-xs'>
                  {locale.COMMON.RECOMMEND_BADGES}
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
      {/* 대형 카드 (오늘의 추천 포스트 서브 영역) */}
      <TodayCard cRef={todayCardRef} siteInfo={siteInfo} />
    </div>
  )
}

/**
 * 추천 게시글 필터링
 */
function getTopPosts({ latestPosts, allNavPages }) {
  // 추천 태그 설정이 없으면 최근 게시물 표시
  if (
    !siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) ||
    siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) === ''
  ) {
    return latestPosts
  }

  // 추천 태그가 포함된 포스트 찾기
  let sortPosts = []

  // 정렬 순서 결정
  if (
    JSON.parse(
      siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', null, CONFIG)
    )
  ) {
    sortPosts = Object.create(allNavPages).sort((a, b) => {
      const dateA = new Date(a?.lastEditedDate)
      const dateB = new Date(b?.lastEditedDate)
      return dateB - dateA
    })
  } else {
    sortPosts = Object.create(allNavPages)
  }

  const topPosts = []
  for (const post of sortPosts) {
    if (topPosts.length === 6) {
      break
    }
    // 태그 포함 여부 확인
    if (
      post?.tags?.indexOf(
        siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG)
      ) >= 0
    ) {
      topPosts.push(post)
    }
  }
  return topPosts
}

/**
 * 히어로 영역 우측 대형 카드
 * @returns
 */
function TodayCard({ cRef, siteInfo }) {
  const router = useRouter()
  const link = siteConfig('HEO_HERO_TITLE_LINK', null, CONFIG)
  const { locale } = useGlobal()
  // 카드가 하단 레이어를 덮고 있는지 여부
  const [isCoverUp, setIsCoverUp] = useState(true)

  /**
   * 외부 컴포넌트에서 호출 가능한 메서드
   */
  useImperativeHandle(cRef, () => {
    return {
      coverUp: () => {
        setIsCoverUp(true)
      }
    }
  })

  /**
   * 더 보기 클릭 처리
   * @param {*} e
   */
  function handleClickShowMore(e) {
    e.stopPropagation()
    setIsCoverUp(false)
  }

  /**
   * 카드 전체 클릭 시 링크 이동
   * @param {*} e
   */
  function handleCardClick(e) {
    router.push(link)
  }

  return (
    <div
      id='today-card'
      className={`${isCoverUp ? ' ' : 'pointer-events-none'
        } overflow-hidden absolute hidden xl:flex flex-1 flex-col h-full top-0 w-full`}>
      <div
        id='card-body'
        onClick={handleCardClick}
        className={`${isCoverUp
          ? 'opacity-100 cursor-pointer'
          : 'opacity-0 transform scale-110 pointer-events-none'
          } shadow transition-all duration-200 today-card h-full bg-black rounded-xl relative overflow-hidden flex items-end`}>
        {/* 카드 텍스트 정보 */}
        <div
          id='today-card-info'
          className='flex justify-between w-full relative text-white p-10 items-end'>
          <div className='flex flex-col'>
            <div className='text-xs font-light'>
              {siteConfig('HEO_HERO_TITLE_4', null, CONFIG)}
            </div>
            <div className='text-3xl font-bold'>
              {siteConfig('HEO_HERO_TITLE_5', null, CONFIG)}
            </div>
          </div>
          {/* 추천 포스트 보기 버튼 */}
          <div
            onClick={handleClickShowMore}
            className={`'${isCoverUp ? '' : 'hidden pointer-events-none'} z-10 group flex items-center px-3 h-10 justify-center  rounded-3xl
            glassmorphism transition-colors duration-100 `}>
            <PlusSmall
              className={
                'group-hover:rotate-180 duration-500 transition-all w-6 h-6 mr-2 bg-white rounded-full stroke-black'
              }
            />
            <div id='more' className='select-none'>
              {locale.COMMON.RECOMMEND_POSTS}
            </div>
          </div>
        </div>

        {/* 배경 이미지 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteInfo?.pageCover}
          id='today-card-cover'
          className={`${isCoverUp ? '' : ' pointer-events-none'
            } hover:scale-110 duration-1000 object-cover cursor-pointer today-card-cover absolute w-full h-full top-0`}
        />
      </div>
    </div>
  )
}

export default Hero
