import { useState } from 'react';
import { siteConfig } from '@/lib/config'

/**
 * 탭 전환 컴포넌트
 * @param {*} param0
 * @returns
 */
const Tabs = ({ className, children }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const validChildren = children.filter(c => c);

  if (validChildren.length === 0) {
    return <></>;
  }

  return (
    <div className={`mb-5 duration-200 ${className}`}>
      {!(validChildren.length === 1 && siteConfig('COMMENT_HIDE_SINGLE_TAB')) && (
        <ul className="flex justify-center space-x-5 pb-4 dark:text-gray-400 text-gray-600 overflow-auto">
          {validChildren.map((item, index) => (
            <li key={index}
              className={`${currentTab === index ? 'font-black border-b-2 border-red-600 text-red-600 animate__animated animate__jello' : 'font-extralight cursor-pointer'} text-sm font-sans`}
              onClick={() => setCurrentTab(index)}>
              {item.key}
            </li>
          ))}
        </ul>
      )}
      {/* 탭 전환 시 DOM 요소를 파괴하지 않고 CSS를 사용해 숨김/노출 처리합니다. */}
      <div>
        {validChildren.map((item, index) => (
          <section
            key={index}
            className={`${currentTab === index ? 'opacity-100 static h-auto' : 'opacity-0 absolute h-0 pointer-events-none overflow-hidden'}`}>
            {item}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
