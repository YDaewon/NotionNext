/**
 * 애니메이션 및 시각 효과 설정
 */
module.exports = {
  // 마우스 클릭 불꽃(폭죽) 효과
  FIREWORKS: process.env.NEXT_PUBLIC_FIREWORKS || false, // 활성화 여부
  // 불꽃 색상 (제공: https://github.com/Vixcity)
  FIREWORKS_COLOR: [
    '255, 20, 97',
    '24, 255, 146',
    '90, 135, 255',
    '251, 243, 140'
  ],

  // 마우스 따라다니는 효과
  MOUSE_FOLLOW: process.env.NEXT_PUBLIC_MOUSE_FOLLOW || false, // 활성화 여부
  // 마우스 따라다니는 효과가 활성화되었을 때만 적용됩니다.
  // 마우스 효과 유형 
  // 1: 경로 흩뿌리기, 2: 낙하 입자, 3: 상승 입자, 4: 가장자리 이동 입자, 5: 회전 추적 입자, 6: 경로 선, 
  // 7: 집결 입자, 8: 집결 그리드, 9: 이동 그리드, 10: 상승 파티클, 11: 회전 랜덤 색상 파티클, 12: 원뿔 방사 푸른 파티클
  MOUSE_FOLLOW_EFFECT_TYPE: 11, // 1-12
  MOUSE_FOLLOW_EFFECT_COLOR: '#ef672a', // 효과 색상 (예: #xxxxxx 또는 rgba(r,g,b,a))

  // 벚꽃 흩날리기 효과
  SAKURA: process.env.NEXT_PUBLIC_SAKURA || false, // 활성화 여부
  // 떠다니는 선 효과 (Nest)
  NEST: process.env.NEXT_PUBLIC_NEST || false, // 활성화 여부
  // 움직이는 리본 효과
  FLUTTERINGRIBBON: process.env.NEXT_PUBLIC_FLUTTERINGRIBBON || false, // 활성화 여부
  // 정적 리본 효과
  RIBBON: process.env.NEXT_PUBLIC_RIBBON || false, // 활성화 여부
  // 별이 빛나는 밤 효과 (다크 모드에서만 적용)
  STARRY_SKY: process.env.NEXT_PUBLIC_STARRY_SKY || false, // 활성화 여부
  // ANIMATE.css 애니메이션
  ANIMATE_CSS_URL:
    process.env.NEXT_PUBLIC_ANIMATE_CSS_URL ||
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' // 애니메이션 CDN 주소
}
