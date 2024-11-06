'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import './style.css';
import { isPopup } from '@/modules/popupModal';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isLoading } from '@/modules/loading';

interface PopupProps {
    popupData: any;
};

export default function Popup({ popupData }: PopupProps) {

    const path = usePathname() as string;
    const isEnglish = path?.includes('/en');
    const popupValue = (popupData) ? popupData[0] : null;
    const popupRef = useRef<HTMLDivElement>(null);
    const [popupOpen, setPopupOpen] = useRecoilState(isPopup);

    const onClickPopupSetCookie = () => {
        const now = new Date();
        const expirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); // 다음 날 자정으로 설정
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
            <div className='popup_content_container'>
                <span className='popup_icon'>
                    <i className='icon-bell'></i>
                </span>
                <strong className='popup_title'>
                    {(isEnglish) ? popupValue?.title_en : popupValue?.title_kr}
                </strong>
                <p className='popup_content'>
                    {(isEnglish) ? popupValue?.content_en : popupValue?.content_kr}
                </p>
                <a
                    href={(isEnglish) ? `/en/notice/${popupValue?.id}` : `/notice/${popupValue?.id}`}
                    className='popup_more_button'>
                    {(isEnglish) ? 'More' : '자세히 보기'}
                </a>
            </div>
            <div className='popup_button_wrapper'>
                <button
                    onClick={onClickPopupSetCookie}
                    className='popup_not_today_button'>
                    {(isEnglish) ? 'Stop watching today' : '1일 동안 보지 않음'}
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