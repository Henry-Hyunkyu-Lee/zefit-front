'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../service/[service]/style.css';
import './style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useRecoilState } from "recoil";
import { isLoading } from "@/modules/loading";

export default function Pharmaceuticals() {

    const developmentData = businessNavList[2].list?.map((item: any) => item.id);
    const [, setLoading] = useRecoilState(isLoading);

    const [pharmaceuticalsData, setPharmaceuticalsData] = useState<any>(null);
    console.log("🚀 ~ Pharmaceuticals ~ pharmaceuticalsData:", pharmaceuticalsData)

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
            <MetaTagTitle title='신약개발기술' />
            <PageHeader />
            <PageBanner pageTitle='신약개발' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>
                <section className='pharmaceuticals_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        신약개발기술
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
                                    {pharmaceuticalsData?.title}
                                </h3>
                                <p className='top_info_content'>
                                    {pharmaceuticalsData?.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
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
                                    alt={`${item?.title} 아이콘`} />
                                <strong className='card_box_title'>
                                    {item?.title}
                                </strong>
                                <div className='card_text_box'>
                                    {item?.content.map((text: string, idx: number) =>
                                        <div
                                            key={idx}
                                            className='card_text_box_lane'>
                                            <div className='card_text_box_lane_point' />
                                            <p className='card_text_box_lane_font'>
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