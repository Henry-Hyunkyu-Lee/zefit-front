'use client';

import { useMediaQuery } from 'react-responsive';
import './style.css';

interface ServiceDetailTapProps {
    serviceTap: any;
    findData: any;
    onClickTapHandler: (e: any) => void;
    present: number;
    prev: number | null;
    lang?: string;
};

export default function ServiceDetailTap({
    serviceTap,
    onClickTapHandler,
    findData,
    present,
    prev,
    lang = 'ko'
}: ServiceDetailTapProps) {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const imageList = serviceTap?.map((item: any) => item?.image);

    const imageSizeChanger = (style: string) => {
        if (style === 'width') {
            if (isMobile) {
                return (imageList[present]?.length <= 1) ? '90dvw' : 'calc((100dvw / 2) - 10px)'
            } else {
                return (imageList[present]?.length <= 1) ? '800px' : '500px'
            };
        } else {
            if (isMobile) {
                return (imageList[present]?.length <= 1) ? '200px' : '100px'
            } else {
                return (imageList[present]?.length <= 1) ? '500px' : '350px'
            };
        };
    };

    return (
        <section className='service_page_detail_container'>
            <div className='service_page_detail_wrapper'>
                <ul className='detail_tap_wrapper'>
                    {findData?.content && findData.content.map((item: any, index: number) =>
                        <li
                            key={index}
                            className='detail_tap_button_list'>
                            <button
                                onClick={() => onClickTapHandler(index)}
                                style={{
                                    fontWeight: (present === index) ? '700' : '400',
                                    backgroundColor: (present === index) ? '#0055a7' : '#e9e9e9',
                                    color: (present === index) ? '#ffffff' : '#6B6B6B'
                                }}
                                className='detail_tap_button'>
                                {(lang === 'en') ? item.name_en : item.name}
                            </button>
                        </li>
                    )}
                </ul>
                <ul className='detail_tap_image_wrapper'>
                    {(imageList && imageList[present])
                        && imageList[present]?.map((item: any, index: number) =>
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
                        )
                    }
                </ul>
            </div>
            <div className='detail_text_wrapper'>
                {(lang === 'en')
                    ? (serviceTap && serviceTap[present]?.info_en.length > 0)
                    && <ul className='detail_text_box'>
                        {serviceTap[present]?.info_en.map((content: any, idx: number) =>
                            <li
                                key={idx}
                                className='detail_text_lane_box'>
                                <div className='detail_text_title_box'>
                                    <div className='detail_text_title_point' />
                                    <strong className='detail_text_title'>
                                        {content.title}
                                    </strong>
                                </div>
                                <p className='detail_text_content'>
                                    {content.text}
                                </p>
                            </li>
                        )}
                    </ul>
                    : (serviceTap && serviceTap[present]?.info.length > 0)
                    && <ul className='detail_text_box'>
                        {serviceTap[present]?.info.map((content: any, idx: number) =>
                            <li
                                key={idx}
                                className='detail_text_lane_box'>
                                <div className='detail_text_title_box'>
                                    <div className='detail_text_title_point' />
                                    <strong className='detail_text_title'>
                                        {content.title}
                                    </strong>
                                </div>
                                <p className='detail_text_content'>
                                    {content.text}
                                </p>
                            </li>
                        )}
                    </ul>}
            </div>
        </section>
    )
};