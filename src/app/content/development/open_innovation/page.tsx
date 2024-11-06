'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../service/[service]/style.css';
import '../pharmaceuticals/style.css';
import './style.css';
import { useEffect, useState } from "react";
import { businessNavList } from "@/data/navData";
import SideTap from "@/components/common/SideTap";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function OpenInnovation() {

    const [, setLoading] = useRecoilState(isLoading);

    const developmentData = businessNavList[2].list?.map((item: any) => item.id);

    const [innovationData, setInnovationData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/inquiry/open_innovation')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setInnovationData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='오픈 이노베이션' />
            <PageHeader />
            <PageBanner pageTitle='신약개발' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>
                <section className='open_Innovation_page_container'>

                    {/* 서비스 페이지 style 사용 */}
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        오픈 이노베이션
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
                                    {innovationData?.title}
                                </h3>
                                <div className='open_Innovation_page_top_info_wrapper'>
                                    {innovationData?.subtitle.map((item: string, index: number) =>
                                        <p
                                            key={index}
                                            className='top_info_content'>
                                            {item}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='bottom_step_content_container'>
                    <h3 className='bottom_step_title'>
                        {innovationData?.steptitle}
                    </h3>

                    {/* pharmaceuticals 페이지 style 사용 */}
                    <ul className='bottom_step_card_wrapper'>
                        {innovationData?.step.map((item: any, index: number) =>
                            <li key={index} className='card_box'>
                                <div className='card_step_box'>
                                    step {item?.id}
                                </div>
                                {/* {(index !== innovationData?.step.length - 1)
                                    && <div className='card_next_step_arrow'>
                                        <i className='icon-arrow-right' />
                                    </div>} */}
                                <img
                                    className='card_box_icon'
                                    src={item?.icon}
                                    alt={`${item?.title} 아이콘`} />
                                <strong className='card_box_title'>
                                    {item?.title}
                                </strong>
                                <div className='card_text_box'>
                                    <div className='card_text_box_lane'>
                                        <p className='step_card_text_box_lane_font'>
                                            {item?.content}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </article>
    )
};