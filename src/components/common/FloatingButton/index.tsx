'use client';

import { usePathname } from 'next/navigation';
import './style.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export default function FloatingButton() {

    const path = usePathname();
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const viewPort = window.innerHeight;

    const isEnglish = path?.includes('/en');

    const onClickScrollTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);  // 스크롤 속도 조정
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${(viewPort - ((isMobile) ? 90 : 150)) + offset}px`,
                transition: 'top 0.2s ease-out',
                display: ((path?.includes('/adm'))) ? 'none' : 'flex'
            }}
            className='floating_button_container'>
            <a
                href={(isEnglish) ? '/en/requests' : '/requests'}
                className='contact_floating_button'>
                <i
                    style={{ fontSize: (isMobile) ? '14px' : '24px' }}
                    className='icon-envelope'></i>
                Contact
            </a>
            <button
                onClick={onClickScrollTopHandler}
                className='scroll_top_floating_button'>
                <i
                    style={{ fontSize: (isMobile) ? '14px' : '24px' }}
                    className='icon-arrow-up'></i>
                TOP
            </button>
        </div>
    )
};