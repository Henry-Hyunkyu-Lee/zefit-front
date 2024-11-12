'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
// import '../../../../content/service/[service]/test-style.css'; // 반영안을 보고 싶으면 이 라인의 주석을 해제
import '../../../../content/development/pharmaceuticals/style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function PharmaceuticalsEN() {

    const [, setLoading] = useRecoilState(isLoading);

    const developmentData = businessNavList[2].list?.map((item: any) => item.en);

    const [pharmaceuticalsData, setPharmaceuticalsData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/inquiry/pharmaceuticals')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setPharmaceuticalsData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='Technology' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Drug discovery' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>

                {/* 현재안 */}
                <section className='pharmaceuticals_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        Technology
                    </h2>
                    <div className='pharmaceuticals_page_top_info_container'>
                        <div className='top_info_background_box' />
                        <img
                            className='top_info_image'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='top_info_content_wrapper'>
                            <div className='top_info_content_box'>
                                <h3 className='top_info_title'>
                                    {pharmaceuticalsData?.title_en}
                                </h3>
                                <p className='top_info_content'>
                                    {pharmaceuticalsData?.subtitle_en}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 반영안 */}
                {/* <section className='service_page_container2'>
                    <h2 className='service_page_title2'>
                        <div className='service_page_side_bar2' />
                        Technology
                    </h2>
                    <div className='service_page_info_wrapper2'>
                        <img
                            className='service_info_image2'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='service_page_info_box2'>
                            <h3 className='service_page_info_box_title2'>
                                {pharmaceuticalsData?.title_en}
                            </h3>
                            <p className='service_page_info_box_content2'>
                                {pharmaceuticalsData?.subtitle_en}
                            </p>
                        </div>
                    </div>
                </section> */}

                <section className='bottom_content_container'>
                    <ul className='bottom_content_card_wrapper'>
                        {pharmaceuticalsData?.step?.map((item: any, index: number) =>
                            <li
                                key={index}
                                className='card_box'>
                                {(index !== pharmaceuticalsData?.step?.length - 1)
                                    && <div className='card_next_step_arrow'>
                                        <i className='icon-arrow-right' />
                                    </div>}
                                <img
                                    className='card_box_icon'
                                    src={item?.icon}
                                    alt={`${item?.title_en} 아이콘`} />
                                <strong style={{ fontSize: '15px' }} className='card_box_title'>
                                    {item?.title_en}
                                </strong>
                                <div className='card_text_box'>
                                    {item?.content_en.map((text: string, idx: number) =>
                                        <div
                                            key={idx}
                                            className='card_text_box_lane'>
                                            <div className='card_text_box_lane_point_en' />
                                            <p
                                                style={{ fontSize: '12px' }}
                                                className='card_text_box_lane_font'>
                                                {text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </article>
    )
};