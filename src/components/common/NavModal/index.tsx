'use client';

import { useRecoilState } from 'recoil';
import './style.css';
import { navModalOpen } from '@/modules/navModal';
import { useEffect, useRef } from 'react';
import { aboutNavList, businessNavList, communityNavList } from '@/data/navData';

interface NavModalProps {
    path: string | null;
    position: number;
    navOpen: string | null;
    setNavOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NavModal({ path, position, navOpen, setNavOpen }: NavModalProps) {

    const navModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navModalRef.current) return;
        if (navOpen) {
            navModalRef.current.style.display = 'flex';

            setTimeout(() => {
                if (!navModalRef.current) return;
                navModalRef.current.style.opacity = '1';
            }, 20);
        } else {
            navModalRef.current.style.opacity = '0'

            setTimeout(() => {
                if (!navModalRef.current) return;
                navModalRef.current.style.display = 'none';
            }, 300);
        }
    }, [navOpen]);

    return (
        <div
            ref={navModalRef}
            style={{
                backgroundColor: ((path !== '/' && path !== '/en') || position > 0) ? '' : '#ffffffe5'
            }}
            className='nav_modal_container'>
            <div className='nav_modal_in_container'>
                <div className='empty_left_box' />
                <ul className='nav_button_wrapper'>
                    <li className='length_lane_wrapper'>
                        {aboutNavList?.map((item: any, index: number) =>
                            <div
                                key={index}
                                className='nav_modal_button_box'>
                                <a
                                    href={item.href}
                                    className='nav_modal_button'>
                                    {item.id}
                                </a>
                            </div>
                        )}
                    </li>
                    <li className='length_lane_wrapper'>
                        {businessNavList?.map((item: any, index: number) =>
                            <div
                                key={index}
                                className='nav_modal_button_box'>
                                <a
                                    href={item.href}
                                    className='nav_modal_button'>
                                    {item.id}
                                </a>
                                {item.list?.map((list: any, idx: number) =>
                                    <a
                                        key={idx}
                                        href={list.href}
                                        style={{
                                            marginTop:(idx === 0) ? '6px' : ''
                                        }}
                                        className='nav_modal_detail_button'>
                                        <div className='nav_modal_detail_button_point' />
                                        {list.id}
                                    </a>
                                )}

                            </div>
                        )}
                    </li>
                    <li className='length_lane_wrapper'>
                        {communityNavList?.map((item: any, index: number) =>
                            <div
                                key={index}
                                className='nav_modal_button_box'>
                                <a
                                    href={item.href}
                                    className='nav_modal_button'>
                                    {item.id}
                                </a>
                            </div>
                        )}
                    </li>
                </ul>
                <div className='empty_right_box' />
            </div>
        </div>
    )
};