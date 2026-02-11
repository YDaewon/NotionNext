import { useGlobal } from '@/lib/global'

/**
 * 글자 수 및 읽기 시간 통계 컴포넌트
 * @returns
 */
export default function WordCount({ wordCount, readTime }) {
  const { locale } = useGlobal()
  return (
    <span id='wordCountWrapper' className='flex gap-3 font-light'>
      <span className='flex whitespace-nowrap items-center'>
        <i className='pl-1 pr-2 fas fa-file-word' />
        <span>{locale.COMMON.WORD_COUNT}</span>&nbsp;
        <span id='wordCount'>{wordCount}</span>
      </span>
      <span className='flex whitespace-nowrap items-center'>
        <i className='mr-1 fas fa-clock' />
        <span>{locale.COMMON.READ_TIME}≈</span>&nbsp;
        <span id='readTime'>{readTime}</span>&nbsp;{locale.COMMON.MINUTE}
      </span>
    </span>
  )
}