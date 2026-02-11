import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useEffect, useRef } from 'react'
import Card from './Card'
import SearchInput from './SearchInput'
import TagItemMini from './TagItemMini'

/**
 * 검색 페이지 네비게이션
 * @param {*} props
 * @returns
 */
export default function SearchNav(props) {
    const { tagOptions, categoryOptions } = props
    const cRef = useRef(null)
    const { locale } = useGlobal()
    useEffect(() => {
        // 검색창 자동 포커스
        cRef?.current?.focus()
    }, [])

    return <>
        <div className="my-6 px-2">
            <SearchInput cRef={cRef} {...props} />
            {/* 카테고리 */}
            <Card className="w-full mt-4">
                <div className="dark:text-gray-200 mb-5 mx-3 text-3xl">
                    {locale.COMMON.CATEGORY}:
                </div>
                <div id="category-list" className="duration-200 flex flex-wrap mx-8">
                    {categoryOptions?.map(category => {
                        return (
                            <SmartLink
                                key={category.name}
                                href={`/category/${category.name}`}
                                passHref
                                legacyBehavior>
                                <div
                                    className={
                                        ' duration-300 dark:hover:text-zinc-900 dark:text-zinc-100 rounded-2xl px-3 cursor-pointer py-1 hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-zinc-100'
                                    }
                                >
                                    <i className="mr-4 fas fa-folder" />
                                    {category.name}({category.count})
                                </div>
                            </SmartLink>
                        )
                    })}
                </div>
            </Card>
            {/* 태그 */}
            <Card className="w-full mt-4">
                <div className="dark:text-gray-200 mb-5 ml-4 text-3xl">
                    {locale.COMMON.TAGS}:
                </div>
                <div id="tags-list" className="duration-200 flex flex-wrap ml-8">
                    {tagOptions?.map(tag => {
                        return (
                            <div key={tag.name} className="p-2">
                                <TagItemMini key={tag.name} tag={tag} />
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    </>
}
