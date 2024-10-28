'use client';

import { usePathname } from 'next/navigation';
import './style.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export default function FloatingButton() {

    const path = usePathname();
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const isEnglish = path?.includes('/en');

    const [isScroll, setIsScroll] = useState<string>('stop');
    const [scrollValue, setScrollValue] = useState<number>(window.scrollY);

    const onClickScrollTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const scrollEvent = (e: any) => {
            const scrolly = window.scrollY;
            
            if (scrolly > scrollValue) {
                setIsScroll('down');
            } else if (scrolly < scrollValue) {
                setIsScroll('up');
            } else {
                setIsScroll('stop')
            }
            
            setScrollValue(scrolly);
        };

        document.addEventListener('scroll', scrollEvent);

        return () => {
            document.removeEventListener('scroll', scrollEvent);
        };
    }, [scrollValue]);

    return (
        <div
            style={{
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