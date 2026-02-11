import DarkModeButton from '@/components/DarkModeButton'
import { useGlobal } from '@/lib/global'
import { Dialog, Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import {
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { MenuListSide } from './MenuListSide'
import TagGroups from './TagGroups'

/**
 * 사이드 드로어
 * 모바일 메뉴가 여기에 위치합니다.
 */
export default function SlideOver(props) {
  const { cRef, tagOptions } = props
  const [open, setOpen] = useState(false)
  const { locale } = useGlobal()
  const router = useRouter()
  /**
   * useImperativeHandle을 통한 함수 컴포넌트 메서드 노출
   **/
  useImperativeHandle(cRef, () => ({
    toggleSlideOvers: toggleSlideOvers
  }))

  /**
   * 사이드 드로어 열기/닫기
   */
  const toggleSlideOvers = () => {
    setOpen(!open)
  }

  /**
   * 드로어 자동 닫기
   */
  useEffect(() => {
    setOpen(false)
  }, [router])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 glassmorphism bg-black bg-opacity-30 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto relative w-96 max-w-md'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}>
                        <span className='sr-only'>Close panel</span>
                        <i className='fa-solid fa-xmark px-2'></i>
                      </button>
                    </div>
                  </Transition.Child>
                  {/* 콘텐츠 */}
                  <div className='flex h-full flex-col overflow-y-scroll bg-white dark:bg-[#18171d] py-6 shadow-xl'>
                    <div className='relative mt-6 flex-1 flex-col space-y-3 px-4 sm:px-6 dark:text-white '>
                      <section className='space-y-2 flex flex-col'>
                        {/* 다크 모드 전환 */}
                        <DarkModeBlockButton />
                      </section>

                      <section className='space-y-2 flex flex-col'>
                        <div>{locale.COMMON.BLOG}</div>
                        {/* 네비게이션 버튼 */}
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'홈'} url={'/'} />
                          <Button title={'소개'} url={'/about'} />
                        </div>
                        {/* 사용자 정의 메뉴 */}
                        <MenuListSide {...props} />
                      </section>

                      <section className='space-y-2 flex flex-col'>
                        <div>{locale.COMMON.TAGS}</div>
                        <TagGroups tags={tagOptions} />
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

/**
 * 아이콘이 포함된 버튼
 */
function DarkModeBlockButton() {
  const darkModeRef = useRef()
  const { isDarkMode, locale } = useGlobal()

  function handleChangeDarkMode() {
    darkModeRef?.current?.handleChangeDarkMode()
  }
  return (
    <button
      onClick={handleChangeDarkMode}
      className={
        'group duration-200 hover:text-zinc-100 dark:hover:text-zinc-900 hover:shadow-md hover:bg-zinc-900 dark:hover:bg-zinc-100 flex justify-between items-center px-2 py-2 border border-zinc-300 dark:border-zinc-700 bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg'
      }>
      <DarkModeButton cRef={darkModeRef} className='group-hover:text-current' />{' '}
      {isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
    </button>
  )
}

/**
 * 일반 버튼
 */
function Button({ title, url }) {
  return (
    <SmartLink
      href={url}
      className={
        'duration-200 hover:text-zinc-100 dark:hover:text-zinc-900 hover:shadow-md flex cursor-pointer justify-between items-center px-2 py-2 border border-zinc-300 dark:border-zinc-700 bg-[#efefef] dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-100 rounded-lg'
      }>
      {title}
    </SmartLink>
  )
}
