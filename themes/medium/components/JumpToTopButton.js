import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 페이지 상단으로 이동하는 버튼 컴포넌트
 * 화면이 500픽셀 이상 아래로 스크롤되면 표시될 수 있습니다 (AOS 애니메이션 적용).
 * @param showPercent 퍼센트 표시 여부
 * @param percent 현재 스크롤 퍼센트
 * @param className 추가적인 CSS 클래스
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = ({ showPercent = false, percent, className }) => {
  if (!siteConfig('MEDIUM_WIDGET_TO_TOP', null, CONFIG)) {
    return <></>
  }
  return (
    <div
      id="jump-to-top"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className='fixed xl:right-80 right-2 mr-10 bottom-24 z-20'>
      <i className='fas fa-chevron-up cursor-pointer p-2 rounded-full border bg-white dark:bg-hexo-black-gray' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </div>
  )
}

export default JumpToTopButton
