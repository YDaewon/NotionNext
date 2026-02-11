import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 비밀번호 잠금 게시글 확인 컴포넌트
 * @param {password, validPassword} props
 * @param password 올바른 비밀번호
 * @param validPassword(bool) 콜백 함수, 인증 성공 시 true를 인자로 호출
 * @returns
 */
export const ArticleLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()

  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }

  const passwordInputRef = useRef(null)
  useEffect(() => {
    // 비밀번호 입력창에 포커스 설정
    passwordInputRef.current.focus()
  }, [])

  return <div id='container' className='w-full flex justify-center items-center h-96 '>
    <div className='text-center space-y-3'>
      <div className='font-bold'>{locale.COMMON.ARTICLE_LOCK_TIPS}</div>
      <div className='flex mx-4'>
        <input id="password" type='password'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitPassword()
            }
          }}
          ref={passwordInputRef} // passwordInputRef 변수에 ref 바인딩
          className='outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-gray-300 font-light leading-10 text-black bg-gray-100 dark:bg-gray-500'>
        </input>
        <div onClick={submitPassword} className="px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2 bg-green-500 hover:bg-green-400 text-white rounded-r duration-300" >
          <i className={'duration-200 cursor-pointer fas fa-key'} >&nbsp;{locale.COMMON.SUBMIT}</i>
        </div>
      </div>
      <div id='tips'>
      </div>
    </div>
  </div>
}
