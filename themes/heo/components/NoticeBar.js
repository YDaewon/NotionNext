import { ArrowRightCircle } from '@/components/HeroIcons'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import Swipe from './Swipe'

/**
 * 상단 알림바 (Notice Bar)
 */
export function NoticeBar() {
  let notices = siteConfig('HEO_NOTICE_BAR', null, CONFIG)
  const { locale } = useGlobal()
  if (typeof notices === 'string') {
    notices = JSON.parse(notices)
  }
  if (!notices || notices?.length === 0) {
    return <></>
  }

  return (
    <div className='max-w-[86rem] w-full mx-auto flex h-12 mb-4 px-5 font-bold'>
      <div className='animate__animated animate__fadeIn animate__fast group cursor-pointer bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-500 dark:hover:border-zinc-400 border border-zinc-300 dark:border-zinc-700  duration-200 hover:shadow-md transition-all rounded-xl w-full h-full flex items-center justify-between px-5'>
        <span className='whitespace-nowrap'>{locale.COMMON.NOW}</span>
        <div className='w-full h-full hover:text-zinc-500 dark:hover:text-zinc-400 flex justify-center items-center'>
          <Swipe items={notices} />
        </div>
        <div>
          <ArrowRightCircle className={'w-5 h-5'} />
        </div>
      </div>
    </div>
  )
}
