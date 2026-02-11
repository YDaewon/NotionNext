import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 소셜 정보 카드 (프로필 카드)
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const icon3 = siteConfig('HEO_INFO_CARD_ICON3', null, CONFIG)
  const url4 = siteConfig('HEO_INFO_CARD_URL4', null, CONFIG)
  const icon4 = siteConfig('HEO_INFO_CARD_ICON4', null, CONFIG)

  return (
    <Card className='wow fadeInUp bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 flex flex-col w-72 overflow-hidden relative border border-zinc-300 dark:border-zinc-700'>
      {/* 정보 카드 첫 번째 줄 */}
      <div className='flex justify-center'>
        {/* 아바타 */}
        <div className='cursor-pointer justify-center items-center flex transform transition-all duration-200'>
          <LazyImage
            src={siteInfo?.icon}
            className='rounded-full border-2 border-zinc-300 dark:border-zinc-700'
            width={200}
            alt={siteConfig('AUTHOR')}
          />
        </div>
      </div>

      <h2 className='text-3xl font-extrabold mt-3'>{siteConfig('AUTHOR')}</h2>

      {/* 인사말 */}
      <GreetingsWords />

      {/* 공지사항 */}
      <Announcement post={notice} className='text-zinc-900 dark:text-zinc-50' />

      <div className='flex justify-start space-x-3 mt-4'>
        {/* 소셜 버튼 그룹 (무채색 톤) */}
        {[
          { url: url1, icon: icon1 },
          { url: url2, icon: icon2 },
          { url: url3, icon: icon3 },
          { url: url4, icon: icon4 }
        ].map((item, index) => (
          item.url && (
            <div key={index} className='w-10 h-10 flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 rounded-full transition-all duration-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900'>
              <SmartLink href={item.url}>
                <i className={item.icon} />
              </SmartLink>
            </div>
          )
        ))}
      </div>
    </Card>
  )
}

/**
 * 인사말 컴포넌트
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [currentIndex, setCurrentIndex] = useState(0)
  // 클릭할 때마다 순차적으로 변경
  const handleChangeGreeting = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length)
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className='select-none cursor-pointer py-1 px-2 mt-2 w-fit bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 text-sm rounded-lg duration-200 transition-colors'>
      {greetings[currentIndex]}
    </div>
  )
}
