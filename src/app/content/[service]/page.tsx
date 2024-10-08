'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import './style.css';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Service() {

    const { service }: any = useParams();

    const [serviceData, setServiceData] = useState<any>(null);
    const [serviceTap, setServiceTap] = useState<any>(null);
    console.log("🚀 ~ Service ~ serviceData:", serviceData);

    const onClickTapHandler = (param: string) => {
        const tapData = serviceData?.content.find((item: any) => item.name === param);
        setServiceTap(tapData);
    };

    useEffect(() => {
        if (service) {
            fetch(`/api/inquiry/${service}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((jsonData) => {
                    setServiceData(jsonData);
                    setServiceTap(jsonData.content[0]);
                })
                .catch((error) => console.error("Fetch error:", error));
        };
    }, [service]);

    return (
        <article>
            <PageHeader />
            <PageBanner pageTitle='서비스' />
            <PageTap tap='business' />
            <div className='page_layout'>
                <section className='service_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        {service}
                    </h2>
                    <div className='service_page_info_wrapper'>
                        <div className='service_page_info_box'>
                            <h3 className='service_page_info_box_title'>
                                {serviceData?.model}
                            </h3>
                            {serviceData?.introduce.map((item: string, index: number) =>
                                <p
                                    key={index}
                                    className='service_page_info_box_content'>
                                    {item}
                                </p>
                            )}
                        </div>
                        <img
                            className='service_info_image'
                            src={serviceData?.thumbnail}
                            alt={serviceData?.service} />
                        <div className='service_back_deco_box' />
                    </div>
                </section>
                <section className='service_page_detail_container'>
                    <div className='service_page_detail_wrapper'>
                        <ul className='detail_tap_wrapper'>
                            {serviceData?.content.map((item: any, index: number) =>
                                <li
                                    key={index}
                                    className='detail_tap_button_list'>
                                    <button
                                        onClick={() => onClickTapHandler(item.name)}
                                        style={{
                                            backgroundColor: (item.name === serviceTap.name) ? '#0055a7' : '#e9e9e9',
                                            color: (item.name === serviceTap?.name) ? '#ffffff' : '#6B6B6B'
                                        }}
                                        className='detail_tap_button'>
                                        {item.name}
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
                                            height: (serviceTap?.image.length <= 1) ? '600px' : '350px'
                                        }}
                                        className='detail_tap_image'
                                        src={item}
                                        alt='CNS-FIT 이미지' />
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='detail_text_wrapper'>
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
                    </div>
                </section>
            </div>
        </article>
    )
};