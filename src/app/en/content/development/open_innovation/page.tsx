'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
// import '../../../../content/service/[service]/test-style.css'; // 반영안을 보고 싶으면 이 라인의 주석을 해제
import '../../../../content/development/pharmaceuticals/style.css';
import '../../../../content/development/open_innovation/style.css';
import { useEffect, useState } from "react";
import { businessNavList } from "@/data/navData";
import SideTap from "@/components/common/SideTap";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function OpenInnovationEN() {

    const [, setLoading] = useRecoilState(isLoading);

    const developmentData = businessNavList[2].list?.map((item: any) => item.en);

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
            <MetaTagTitle title='Open Innovation' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Drug discovery' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>

                {/* 현재안 */}
                <section className='open_Innovation_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        Open Innovation
                    </h2>
                    <div className='pharmaceuticals_page_top_info_container'>
                        <div className='top_info_background_box' />
                        <img
                            className='top_info_image'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='오픈이노베이션' />
                        <div className='top_info_content_wrapper'>
                            <div className='top_info_content_box'>
                                <h3 className='top_info_title'>
                                    {innovationData?.title_en}
                                </h3>
                                <div className='open_Innovation_page_top_info_wrapper'>
                                    {innovationData?.subtitle_en.map((item: string, index: number) =>
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

                {/* 반영안 */}
                {/* <section className='service_page_container2'>
                    <h2 className='service_page_title2'>
                        <div className='service_page_side_bar2' />
                        Open Innovation
                    </h2>
                    <div className='service_page_info_wrapper2'>
                        <img
                            className='service_info_image2'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='service_page_info_box2'>
                            <h3 className='service_page_info_box_title2'>
                                {innovationData?.title_en}
                            </h3>
                            <div className='open_Innovation_page_top_info_wrapper'>
                                {innovationData?.subtitle_en.map((item: string, index: number) =>
                                    <p
                                        key={index}
                                        className='service_page_info_box_content2'>
                                        {item}
                                    </p>)}
                            </div>
                        </div>
                    </div>
                </section> */}

                <div className='bottom_step_content_container'>
                    <h3 className='bottom_step_title'>
                        {innovationData?.steptitle_en}
                    </h3>

                    {/* pharmaceuticals 페이지 style 사용 */}
                    <ul className='bottom_step_card_wrapper'>
                        {innovationData?.step.map((item: any, index: number) =>
                            <li key={index} className='card_box'>
                                <div className='card_step_box'>
                                    step {item?.id}
                                </div>
                                {(index !== innovationData?.step.length - 1)
                                    && <div className='card_next_step_arrow'>
                                        <i className='icon-arrow-right' />
                                    </div>}
                                <img
                                    className='card_box_icon'
                                    src={item?.icon}
                                    alt={`${item?.title_en} 아이콘`} />
                                <strong style={{ fontSize: '17px' }} className='card_box_title'>
                                    {item?.title_en}
                                </strong>
                                <div className='card_text_box'>
                                    <div className='card_text_box_lane'>
                                        <p className='step_card_text_box_lane_font'>
                                            {item?.content_en}
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