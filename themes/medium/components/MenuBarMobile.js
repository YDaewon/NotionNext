import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'

export const MenuBarMobile = props => {
  const { customMenu, customNav } = props
  const { locale } = useGlobal()

  let links = [
    // { name: locale.NAV.INDEX, href: '/' || '/', show: true },
    {
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('MEDIUM_MENU_CATEGORY', null, CONFIG)
    },
    {
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('MEDIUM_MENU_TAG', null, CONFIG)
    },
    {
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('MEDIUM_MENU_ARCHIVE', null, CONFIG)
    }
    // { name: locale.NAV.SEARCH, href: '/search', show: siteConfig('MENU_SEARCH', null, CONFIG) }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 커스텀 메뉴를 사용할 경우, 페이지 기반 메뉴 대신 커스텀 메뉴를 사용합니다.
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav id='nav' className=' text-md'>
      {links?.map((link, index) => (
        <MenuItemCollapse
          onHeightChange={props.onHeightChange}
          key={index}
          link={link}
        />
      ))}
    </nav>
  )
}
