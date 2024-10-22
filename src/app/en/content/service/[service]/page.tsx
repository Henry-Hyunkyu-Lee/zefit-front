'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import MetaTagTitle from "@/utils/MetaTagTitle";

export default function ServiceEN() {

    const { service }: any = useParams();

    const [serviceData, setServiceData] = useState<any>(null);
    const [serviceTap, setServiceTap] = useState<any>(null);
    console.log("🚀 ~ Service ~ serviceData:", serviceData);

    const findData = serviceData?.find((item: any) => item?.service === service);
    const sideTapData = serviceData?.map((item: any) => item?.service);

    const onClickTapHandler = (param: string) => {
        const tapData = findData?.content.find((item: any) => item.name === param);
        setServiceTap(tapData);
    };

    useEffect(() => {
        if (service) {
            fetch(`/api/inquiry/service/${service}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((jsonData) => {
                    const findData = jsonData?.find((item: any) => item?.service === service);
                    setServiceData(jsonData);
                    setServiceTap(findData.content[0]);
                })
                .catch((error) => console.error("Fetch error:", error));
        };
    }, [service]);

    return (
        <article>
            <MetaTagTitle title='Service' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='service' />
            <PageTap tap='business' />
            <SideTap tap={sideTapData} content='service' />
            <div className='page_layout'>
                <section className='service_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        {service}
                    </h2>
                    <div className='service_page_info_wrapper'>
                        <div className='service_page_info_box'>
                            <h3 className='service_page_info_box_title'>
                                {findData?.model_en}
                            </h3>
                            {findData?.introduce_en.map((item: string, index: number) =>
                                <p
                                    key={index}
                                    className='service_page_info_box_content'>
                                    {item}
                                </p>
                            )}
                        </div>
                        <img
                            className='service_info_image'
                            src={findData?.thumbnail}
                            alt={findData?.service} />
                        <div className='service_back_deco_box' />
                    </div>
                </section>
                <section className='service_page_detail_container'>
                    <div className='service_page_detail_wrapper'>
                        <ul className='detail_tap_wrapper'>
                            {findData?.content.map((item: any, index: number) =>
                                <li
                                    key={index}
                                    className='detail_tap_button_list'>
                                    <button
                                        onClick={() => onClickTapHandler(item.name)}
                                        style={{
                                            fontWeight: (item.name_en === serviceTap?.name_en) ? '700' : '400',
                                            backgroundColor: (item.name_en === serviceTap?.name_en) ? '#0055a7' : '#e9e9e9',
                                            color: (item.name_en === serviceTap?.name_en) ? '#ffffff' : '#6B6B6B'
                                        }}
                                        className='detail_tap_button'>
                                        {item.name_en}
                                    </button>
                                </li>
                            )}

                        </ul>
                        <ul className='detail_tap_image_wrapper'>
                            {serviceTap?.image.map((item: string, index: number) =>
                                <li key={index}>
                                    <img
                                        style={{
                                            width: (serviceTap?.image.length <= 1) ? '800px' : '500px',
                                            height: (serviceTap?.image.length <= 1) ? '500px' : '350px'
                                        }}
                                        className='detail_tap_image'
                                        src={item}
                                        alt='CNS-FIT 이미지' />
                                </li>
                            )}
                        </ul>
                    </div>
                    {(serviceTap?.info_en.length > 0)
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
                        </div>}
                </section>
            </div>
        </article>
    )
};