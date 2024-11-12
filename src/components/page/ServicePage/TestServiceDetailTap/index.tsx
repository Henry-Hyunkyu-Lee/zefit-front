'use client';

import './style.css';

interface TestServiceDetailTapProps {
    serviceTap: any;
    lang?: string;
    present: number;
    prev: number | null
};

export default function TestServiceDetailTap({
    serviceTap,
    lang = 'ko',
    present,
    prev
}: TestServiceDetailTapProps) {

    const imageSizeChanger = (item: any) => {
        if (item?.info.length === 0) {
            return (item?.image.length <= 1) ? '50%' : '';
        } else {
            return (item?.image.length <= 1) ? '100%' : ''
        };
    };

    return (
        <div className='detail_content_out_box'>
            {serviceTap?.map((item: any, index: number) =>
                <div
                    key={index}
                    className={
                        (present === index)
                            ? "detail_content_box"
                            : (prev === index)
                                ? "detail_content_box_prev"
                                : "detail_content_box_etc"
                    }>
                    {(item?.image.length > 0)
                        && <div className="detail_content_image_wrapper">
                            {item?.image.map((img: string, idx: number) =>
                                <img
                                    key={idx}
                                    className="detail_content_image"
                                    style={{
                                        width: imageSizeChanger(item),
                                        height: imageSizeChanger(item)
                                    }}
                                    src={img}
                                    alt={img} />)}
                        </div>}
                    {(lang === 'en')
                        ? (item?.info_en.length > 0)
                        && <div className="detail_content_text_wrapper">
                            {item?.info_en.map((content: any, idx: number) =>
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
                                </li>)}
                        </div>
                        : (item?.info.length > 0)
                        && <div className="detail_content_text_wrapper">
                            {item?.info.map((content: any, idx: number) =>
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
                                </li>)}
                        </div>}
                </div>
            )}
        </div>
    )
};