/**
 * 소셜 네트워크 버튼 관련 설정
 */
module.exports = {
  // 소셜 링크 설정. 필요하지 않은 경우 빈 값으로 두세요 (예: CONTACT_WEIBO: '')
  CONTACT_EMAIL:
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL &&
      btoa(
        unescape(encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_EMAIL))
      )) ||
    '', // 이메일 주소 (예: mail@tangly1024.com)
  CONTACT_WEIBO: process.env.NEXT_PUBLIC_CONTACT_WEIBO || '', // 웨이보 프로필 페이지
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '', // 트위터(X) 프로필 페이지
  CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB || '', // GitHub 프로필 페이지 (예: https://github.com/tangly1024)
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || '', // 텔레그램 주소 (예: https://t.me/tangly_1024)
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || '', // 링크드인 프로필 페이지
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || '', // 인스타그램 주소
  CONTACT_BILIBILI: process.env.NEXT_PUBLIC_CONTACT_BILIBILI || '', // 비리비리(Bilibili) 프로필 페이지
  CONTACT_YOUTUBE: process.env.NEXT_PUBLIC_CONTACT_YOUTUBE || '', // 유튜브 채널 페이지
  CONTACT_XIAOHONGSHU: process.env.NEXT_PUBLIC_CONTACT_XIAOHONGSHU || '', // 샤오홍슈 프로필 페이지
  CONTACT_ZHISHIXINGQIU: process.env.NEXT_PUBLIC_CONTACT_ZHISHIXINGQIU || '', // 즈시싱추(Knowledge Planet) 주소
  CONTACT_WEHCHAT_PUBLIC: process.env.NEXT_PUBLIC_CONTACT_WEHCHAT_PUBLIC || '' // 위챗 공식 계정 주소
}
