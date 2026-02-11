import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 아카이브 페이지로 이동하는 버튼
 */
export default function ArchiveButton() {
    const router = useRouter()
    const { locale } = useGlobal()

    function handleClick() {
        router.push('/archive')
    }

    return (
        <div
            title={locale.NAV.ARCHIVE}
            className='cursor-pointer hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all'
            onClick={handleClick}>
            <i className='fa-solid fa-archive'></i>
        </div>
    )
}
