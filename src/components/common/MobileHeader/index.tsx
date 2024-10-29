'use client';

import { usePathname } from 'next/navigation';
import './style.css';
import { useState } from 'react';
import { aboutNavList, businessNavList, communityNavList } from '@/data/navData';

export default function MobileHeader() {

    const path = usePathname();

    const isEng = path?.includes('/en');

    const [modalOpen, setModalOpen] = useState<{
        menu: boolean,
        trans: boolean
    }>({
        menu: false,
        trans: false
    });
    const [detailNav, setDetailNav] = useState<string | null>(null);
    const { menu, trans } = modalOpen;

    const onClickTapHandler = (item: string) => {
        if (item === detailNav) return setDetailNav(null);
        setDetailNav(item);
    };

    return (
        <header className='mobile_header_container'>
            <nav className='mobile_header_wrapper'>
                <button
                    onClick={() => setModalOpen({ ...modalOpen, menu: !menu, trans: false })}
                    className='mobile_header_icon_box'>
                    <i className='icon-menu'></i>
                </button>
                <a
                    href={(isEng) ? '/en' : '/'}
                    className='mobile_header_logo_box'>
                    <img
                        className='mobile_header_logo'
                        src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_logo-dark.png'
                        alt='모바일 로고' />
                </a>
                <img
                    onClick={() => setModalOpen({ ...modalOpen, menu: false, trans: !trans })}
                    className='mobile_button_box'
                    src={(isEng)
                        ? 'https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_flags/4x3/us.svg'
                        : 'http://www.zefit.co.kr/theme/basic/assets/images/flags/4x3/kr.svg'} />
            </nav>
            {(menu)
                && <ul className='menu_modal_wrapper'>
                    <li
                        onClick={() => onClickTapHandler('company')}
                        className='menu_modal_lane_wrapper'>
                        회사소개
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </li>
                    {(detailNav === 'company')
                        && <ul className='menu_modal_detail_wrapper'>
                            {aboutNavList?.map((item: any, index: number) =>
                                <li key={index} style={{ width: '100%' }}>
                                    <a
                                        href={(isEng) ? `/en${item.href}` : item.href}
                                        className='menu_modal_detail_lane_wrapper'>
                                        {item.id}
                                    </a>
                                </li>
                            )}
                        </ul>}
                    <a
                        href={(isEng) ? '/en/content/zebrafish' : '/content/zebrafish'}
                        className='menu_modal_lane_wrapper'>
                        모델
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </a>
                    <li
                        onClick={() => onClickTapHandler('service')}
                        className='menu_modal_lane_wrapper'>
                        서비스
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </li>
                    {(detailNav === 'service')
                        && <ul className='menu_modal_detail_wrapper'>
                            {businessNavList[1].list?.map((item: any, index: number) =>
                                <li key={index} style={{ width: '100%' }}>
                                    <a
                                        href={(isEng) ? `/en${item.href}` : item.href}
                                        className='menu_modal_detail_lane_wrapper'>
                                        {item.id}
                                    </a>
                                </li>
                            )}
                        </ul>}
                    <li
                        onClick={() => onClickTapHandler('pharmaceuticals')}
                        className='menu_modal_lane_wrapper'>
                        신약개발
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </li>
                    {(detailNav === 'pharmaceuticals')
                        && <ul className='menu_modal_detail_wrapper'>
                            {businessNavList[2].list?.map((item: any, index: number) =>
                                <li key={index} style={{ width: '100%' }}>
                                    <a
                                        href={(isEng) ? `/en${item.href}` : item.href}
                                        className='menu_modal_detail_lane_wrapper'>
                                        {item.id}
                                    </a>
                                </li>
                            )}
                        </ul>}
                    <li
                        onClick={() => onClickTapHandler('community')}
                        className='menu_modal_lane_wrapper'>
                        커뮤니티
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </li>
                    {(detailNav === 'community')
                        && <ul className='menu_modal_detail_wrapper'>
                            {communityNavList?.map((item: any, index: number) =>
                                <li key={index} style={{ width: '100%' }}>
                                    <a
                                        href={(isEng) ? `/en${item.href}` : item.href}
                                        className='menu_modal_detail_lane_wrapper'>
                                        {item.id}
                                    </a>
                                </li>
                            )}
                        </ul>}
                    <a
                        href={(isEng) ? '/en/requests' : '/requests'}
                        className='menu_modal_lane_wrapper'>
                        문의하기
                        <i style={{ fontSize: '10px' }} className='icon-arrow-right'></i>
                    </a>
                </ul>}
        </header>
    )
};