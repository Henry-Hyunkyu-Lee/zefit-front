'use client';

import { useMediaQuery } from 'react-responsive';
import './style.css';

interface ServiceDetailTapProps {
    serviceTap: any;
    findData: any;
    onClickTapHandler: (e: any) => void;
    lang?: string;
};

export default function ServiceDetailTap({
    serviceTap,
    onClickTapHandler,
    findData,
    lang = 'ko'
}: ServiceDetailTapProps) {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const imageSizeChanger = (style: string) => {
        if (style === 'width') {
            if (isMobile) {
                return (serviceTap?.image.length <= 1) ? '90dvw' : 'calc((100dvw / 2) - 10px)'
            } else {
                return (serviceTap?.image.length <= 1) ? '800px' : '500px'
            };
        } else {
            if (isMobile) {
                return (serviceTap?.image.length <= 1) ? '200px' : '100px'
            } else {
                return (serviceTap?.image.length <= 1) ? '500px' : '350px'
            };
        };
    };

    return (
        <section className='service_page_detail_container'>
            <div className='service_page_detail_wrapper'>
                <ul className='detail_tap_wrapper'>
                    {findData?.content.map((item: any, index: number) =>
                        <li
                            key={index}
                            className='detail_tap_button_list'>
                            <button
                                onClick={() => onClickTapHandler((lang === 'en') ? item.name_en : item.name)}
                                style={{
                                    fontWeight: (item.name === serviceTap?.name) ? '700' : '400',
                                    backgroundColor: (item.name === serviceTap?.name) ? '#0055a7' : '#e9e9e9',
                                    color: (item.name === serviceTap?.name) ? '#ffffff' : '#6B6B6B'
                                }}
                                className='detail_tap_button'>
                                {(lang === 'en') ? item.name_en : item.name}
                            </button>
                        </li>
                    )}
                </ul>
                <ul className='detail_tap_image_wrapper'>
                    {serviceTap?.image.map((item: string, index: number) =>
                        <li key={index}>
                            <img
                                style={{
                                    width: imageSizeChanger('width'),
                                    height: imageSizeChanger('height')
                                }}
                                className='detail_tap_image'
                                src={item}
                                alt='CNS-FIT 이미지' />
                        </li>
                    )}
                </ul>
            </div>
            {(lang === 'en')
                ? (serviceTap?.info_en.length > 0)
                && <div className='detail_text_wrapper'>
                    <ul className='detail_text_box'>
                        {serviceTap?.info_en.map((item: any, index: number) =>
                            <li
                                key={index}
                                className='detail_text_lane_box'>
                                <div className='detail_text_title_box'>
                                    <div className='detail_text_title_point' />
                                    <strong className='detail_text_title'>
                                        {item.title}
                                    </strong>
                                </div>
                                <p className='detail_text_content'>
                                    {item.text}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
                : (serviceTap?.info.length > 0)
                && <div className='detail_text_wrapper'>
                    <ul className='detail_text_box'>
                        {serviceTap?.info.map((item: any, index: number) =>
                            <li
                                key={index}
                                className='detail_text_lane_box'>
                                <div className='detail_text_title_box'>
                                    <div className='detail_text_title_point' />
                                    <strong className='detail_text_title'>
                                        {item.title}
                                    </strong>
                                </div>
                                <p className='detail_text_content'>
                                    {item.text}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>}
        </section>
    )
};