import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { siteInfo } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
        <LazyImage
          src={siteInfo?.icon}
          width={24}
          height={24}
          alt={siteConfig('AUTHOR')}
          className='mr-4 hidden md:block'
        />
        <div id='logo-text' className='flex-none relative'>
          <div className='logo text-lg my-auto rounded dark:border-white'>
            {siteConfig('TITLE')}
          </div>
        </div>
      </div>
    </SmartLink>
  )
}
export default Logo
