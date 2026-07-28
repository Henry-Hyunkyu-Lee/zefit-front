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
    const popupCount = Array.isArray(popupData) ? popupData.length : 0;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const popupValue = popupData?.[currentIndex] ?? null;
    const popupRef = useRef<HTMLDivElement>(null);
    const [popupOpen, setPopupOpen] = useRecoilState(isPopup);

    const onClickPrevious = () => {
        setCurrentIndex((current) => (current - 1 + popupCount) % popupCount);
    };

    const onClickNext = () => {
        setCurrentIndex((current) => (current + 1) % popupCount);
    };

    const onClickPopupSetCookie = () => {
        const now = new Date();
        const expirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); // 다음 날 자정으로 설정
        document.cookie = `zf-pov=${now.toISOString()}; expires=${expirationDate.toUTCString()}; path=/`;
        setPopupOpen(false);
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [popupData]);

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
                {popupCount > 1 && (
                    <>
                        <button
                            type='button'
                            onClick={onClickPrevious}
                            className='popup_navigation_button popup_previous_button'
                            aria-label={(isEnglish) ? 'Previous notice' : '이전 공지'}>
                            ‹
                        </button>
                        <button
                            type='button'
                            onClick={onClickNext}
                            className='popup_navigation_button popup_next_button'
                            aria-label={(isEnglish) ? 'Next notice' : '다음 공지'}>
                            ›
                        </button>
                        <div
                            className='popup_page_indicator'
                            aria-label={`${currentIndex + 1} / ${popupCount}`}>
                            {popupData.map((item: any, index: number) => (
                                <button
                                    key={item?.id ?? index}
                                    type='button'
                                    onClick={() => setCurrentIndex(index)}
                                    className={`popup_page_dot${index === currentIndex ? ' popup_page_dot_active' : ''}`}
                                    aria-label={(isEnglish)
                                        ? `Go to notice ${index + 1}`
                                        : `${index + 1}번째 공지로 이동`}
                                    aria-current={(index === currentIndex) ? 'true' : undefined}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className='popup_button_wrapper'>
                <button
                    onClick={onClickPopupSetCookie}
                    className='popup_not_today_button'>
                    {(isEnglish) ? "Don't show again for a day" : "1일 동안 보지 않음"}
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
