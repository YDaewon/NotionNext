import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Iconfont(아이콘 폰트) 지원 컴포넌트
 */
export default function IconFont() {
    const router = useRouter()

    useEffect(() => {
        loadExternalResource('/webfonts/iconfont.js')
            .then(u => {
                // console.log('iconfont loaded:', u);

                // 'icon-' 클래스를 포함하는 모든 <i> 태그를 찾아 SVG로 변환
                const iElements = document.querySelectorAll('i[class*="icon-"]');
                iElements.forEach(element => {
                    const className = Array.from(element.classList).find(cls => cls.startsWith('icon-'));
                    if (className) {
                        // 새로운 <svg> 요소 생성
                        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svgElement.setAttribute('class', 'icon');
                        svgElement.setAttribute('aria-hidden', 'true');

                        const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                        useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${className}`);
                        svgElement.appendChild(useElement);

                        // 기존 <i> 요소를 <svg> 요소로 교체
                        element.replaceWith(svgElement);
                    }
                });
            })
            .catch(error => {
                console.warn('Failed to load iconfont.js:', error);
            });
    }, [router]);

    return <style jsx global>
        {`
        .icon {
            width: 1.1em;
            height: 1.1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }

        svg.icon {
            display: inline;
        }
        `}</style>
}
