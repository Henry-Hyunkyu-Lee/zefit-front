'use client';

import { useEffect, useRef } from 'react';
import './style.css';

export default function ScrollGuide() {

    const guideRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollEvent = () => {
            if (!guideRef.current || !arrowRef.current) return;
            const y = window.scrollY;
            
            if (y === 0) {
                guideRef.current.style.animation = 'scroll_guide_text_move 1.5s linear infinite forwards';
                arrowRef.current.style.animation = 'scroll_guide_arrow_move 1.5s linear infinite forwards';
            } else {
                guideRef.current.style.animation = 'none';
                arrowRef.current.style.animation = 'none';
            }
        };

        window.addEventListener('scroll', scrollEvent);

        return () => {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, []);

    return (
        <span className="top_banner_scroll_guide">
            <div ref={guideRef} className='scroll_guide_text'>
                아래로 스크롤
            </div>
            <div ref={arrowRef} className='scroll_guide_arrow_box'>
                <i className='icon-arrow-down'></i>
                <i className='icon-arrow-down'></i>
            </div>
        </span>
    )
};