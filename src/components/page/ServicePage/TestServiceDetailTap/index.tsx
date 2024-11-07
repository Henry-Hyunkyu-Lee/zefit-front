'use client';

import './style.css';

interface TestServiceDetailTapProps {
    serviceTap: any;
    lang?: string;
};

export default function TestServiceDetailTap({ serviceTap, lang = 'ko' }: TestServiceDetailTapProps) {
    return (
        <div className="detail_content_box">
            {(serviceTap?.image.length > 0)
                && <div className="detail_content_image_wrapper">
                    {serviceTap?.image.map((item: string, index: number) =>
                        <img
                            key={index}
                            className="detail_content_image"
                            style={{
                                width: (serviceTap?.image.length <= 1) ? '100%' : '',
                                height: (serviceTap?.image.length <= 1) ? '100%' : ''
                            }}
                            src={item}
                            alt={item} />)}
                </div>}
            {(lang === 'en')
                ? (serviceTap?.info_en.length > 0)
                && <div className="detail_content_text_wrapper">
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
                        </li>)}
                </div>
                : (serviceTap?.info.length > 0)
                && <div className="detail_content_text_wrapper">
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
                        </li>)}
                </div>}
        </div>
    )
};