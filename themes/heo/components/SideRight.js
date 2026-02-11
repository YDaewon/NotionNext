import Live2D from '@/components/Live2D'
import dynamic from 'next/dynamic'
import { GitHubProjectsCard } from './GitHubProjectsCard'
import Card from './Card'
import Catalog from './Catalog'
import { InfoCard } from './InfoCard'
import LatestPostsGroupMini from './LatestPostsGroupMini'
import TagGroups from './TagGroups'
import TouchMeCard from './TouchMeCard'

const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * 우측 사이드바
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const { post, tagOptions, currentTag, rightAreaSlot } = props

  // 우측 사이드바가 너무 길어지지 않도록 상위 60개 태그만 표시
  const sortedTags = tagOptions?.slice(0, 60) || []

  return (
    <div id='sideRight' className='hidden xl:block w-72 space-y-4 h-full'>
      <InfoCard {...props} className='w-72 wow fadeInUp' />

      <div className='sticky top-20 space-y-4'>
        {/* 게시글 페이지용 목차(TOC) 표시 */}
        {post && post.toc && post.toc.length > 0 && (
          <Card className='wow fadeInUp'>
            <Catalog toc={post.toc} />
          </Card>
        )}

        {/* 커뮤니티/연락처 */}
        <div className='wow fadeInUp'>
          <TouchMeCard />
        </div>

        {/* Projects */}
        <Card
          className={
            'hover:border-zinc-500 dark:hover:border-zinc-400 duration-200'
          }>
          <GitHubProjectsCard />
        </Card>

        {/* 최신 게시글 목록 */}
        <div
          className={
            'border wow fadeInUp border-zinc-300 dark:border-zinc-700 bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:border-zinc-500 dark:hover:border-zinc-400 duration-200 rounded-xl lg:p-6 p-4 hidden lg:block'
          }>
          <LatestPostsGroupMini {...props} />
        </div>

        {rightAreaSlot}

        <FaceBookPage />
        <Live2D />


      </div>
    </div>
  )
}
