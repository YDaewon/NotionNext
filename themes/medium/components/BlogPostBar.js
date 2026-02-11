import { useGlobal } from '@/lib/global'

/**
 * 게시글 목록 상단에 표시되는 정보 바
 * @param {*} props
 * @returns
 */
export default function BlogPostBar(props) {
  const { tag, category } = props
  const { locale } = useGlobal()

  if (tag) {
    return (
      <div className='flex items-center text-xl py-8'>
        <i className='mr-2 fas fa-tag' />
        {locale.COMMON.TAGS}: {tag}
      </div>
    )
  } else if (category) {
    return (
      <div className='flex items-center text-xl py-8'>
        <i className='mr-2 fas fa-th' />
        {locale.COMMON.CATEGORY}: {category}
      </div>
    )
  } else {
    return <></>
  }
}
