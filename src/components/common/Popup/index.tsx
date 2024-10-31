'use client';

import { useRecoilState } from 'recoil';
import './style.css';
import { isPopup } from '@/modules/popupModal';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PopupProps {
    popupData: any;
};

export default function Popup({ popupData }: PopupProps) {

    const path = usePathname() as string;
    const isEnglish = path?.includes('/en');
    const popupThumnail = (popupData) ? popupData[0]?.image : '';
    const popupRef = useRef<HTMLDivElement>(null);
    const [popupOpen, setPopupOpen] = useRecoilState(isPopup);

    const onClickPopupSetCookie = () => {
        const now = new Date();
        const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 하루 후 만료
        document.cookie = `zf-pov=${now.toISOString()}; expires=${expirationDate.toUTCString()}; path=/`;
        setPopupOpen(false);
    };

    useEffect(() => {
        if (!popupRef.current) return;

        if (popupOpen) {
            popupRef.current.style.display = 'flex';

            setTimeout(() => {
                if (!popupRef.current) return;
                popupRef.current.style.opacity = '1';
                popupRef.current.style.transform = 'translateY(-20px)';
            }, 300);
        } else {
            popupRef.current.style.opacity = '0';
            popupRef.current.style.transform = 'translateY(0px)';

            setTimeout(() => {
                if (!popupRef.current) return;
                popupRef.current.style.display = 'none';
            }, 300);
        };
    }, [popupOpen]);

    return (
        <section ref={popupRef} className="popup_container">
            <img
                className='popup_thumbnail'
                src={popupThumnail}
                alt='팝업 썸네일' />
            <div className='popup_button_wrapper'>
                <button
                    onClick={onClickPopupSetCookie}
                    className='popup_not_today_button'>
                    {(isEnglish) ? 'Stop watching today' : '오늘 하루 그만 보기'}
                </button>
                <button
                    onClick={() => setPopupOpen(false)}
                    className='popup_close_button'>
                    {(isEnglish) ? 'Close' : '닫기'}
                </button>
            </div>
        </section>
    )
};