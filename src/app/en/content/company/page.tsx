'use client';

import MainHeader from "@/components/common/MainHeader";
import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../content/company/style.css';
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useMediaQuery } from "react-responsive";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

export default function CompanyEN() {

    const [, setLoading] = useRecoilState(isLoading);
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const [companyData, setCompanyData] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/inquiry/company`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setCompanyData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='Overview' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='OVERVIEW' />
            <PageTap tap='company' />

            {/* 회사 개요 페이지 레이아웃 */}
            <div className='page_layout'>
                <section className='company_introduce_container'>
                    <h2 className='page_title'>
                        About Us
                    </h2>
                    <h3 className='company_introduce_sub_title'>
                        <b className='sub_title_span'>
                            Zefit analyzes and provides safety, efficacy, and medical relevance about new compounds using zebrafish, early in-vivo testing model.
                        </b>
                    </h3>
                    <div className='company_center_bar' />
                    <div className='introduce_additional_wrapper'>
                        <p className='introduce_additional'>
                            Drug development through zebrafish is an method that reduces and replaces the use of experimental animal models. Zebrafish has a fast life cycle, so we can access HTS. This allows customers to accelerate commercialization of research drugs. Zefit has a differentiated drug development platform built by biologist experts and AI technology experts.
                        </p>
                    </div>
                </section>
                <section className='different_develop_intro_container'>
                    <div className='different_develop_background_image' />
                    <div className='different_develop_gradient_back' />
                    <div className='different_develop_content_container'>
                        <div className='different_develop_title_container'>
                            <h4 className='different_develop_title'>
                                Differentiated drug development platform
                            </h4>
                            <p className='different_develop_sub_title'>
                                {'Currently, Zefit provides compound test services to leading domestic research institutes and pharmaceutical companies.'}
                            </p>
                            <div className='company_center_bar' />
                            <p className='different_develop_sub_title'>
                                {'reduce experimental periods and variation between data using AI based experimental infrastructure, and build drug development platforms using experimental data we have.'}
                            </p>
                        </div>
                        <ul className="shape_wrapper">
                            {companyData?.map((item: any, index: number) =>
                                (isMobile)
                                    ? <li
                                        key={index}
                                        style={{
                                            backgroundColor: `${item.color}99`
                                        }}
                                        className='mobile_card_box'>
                                        <div className='hexagon_card_content_container'>
                                            <div className='card_content_top_lane'>
                                                <img
                                                    className='card_content_icon'
                                                    src={item.icon}
                                                    alt={`${item.id} 아이콘`} />
                                                <strong className='card_content_title' style={{ color: item.titlecolor }}>
                                                    {item.title}
                                                </strong>
                                            </div>
                                            <p className='card_content_text' style={{ color: item.textcolor }}>
                                                {item.content}
                                            </p>
                                        </div>
                                    </li>
                                    : <li
                                        key={index}
                                        className='hexagon_card_border_box'
                                        style={{
                                            marginTop: (index === 1) ? '80px' : '0px'
                                        }}>
                                        <svg width="400" height="400" viewBox="0 0 400 400">
                                            {/* <!-- 육각형을 정의, 배경은 투명, 테두리선 추가 --> */}
                                            <polygon points="200,20 370,110 370,290 200,380 30,290 30,110"
                                                style={{
                                                    fill: 'transparent',
                                                    stroke: item.color,
                                                    strokeWidth: 1,
                                                }} />
                                        </svg>
                                        <svg className='hexagon_card' viewBox="0 0 350 350">
                                            <defs>
                                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(255, 255, 255, 0.5)" />
                                                </filter>
                                            </defs>
                                            {/* <!-- 육각형을 정의, 배경은 투명, 테두리선 추가 --> */}
                                            <polygon
                                                points="175,20 315,97.5 315,252.5 175,330 35,252.5 35,97.5"
                                                style={{ fill: `${item.color}99` }} />
                                        </svg>
                                        <div className='hexagon_card_content_container'>
                                            <div className='card_content_top_lane'>
                                                <img
                                                    className='card_content_icon'
                                                    src={item?.icon}
                                                    alt={`${item.id} 아이콘`} />
                                                <strong className='card_content_title_en' style={{ color: item.titlecolor }}>
                                                    {item.title_en}
                                                </strong>
                                            </div>
                                            <p className='card_content_text_en' style={{ color: item.textcolor }}>
                                                {item.content_en}
                                            </p>
                                        </div>
                                    </li>
                            )}
                        </ul>
                    </div>
                </section>
                <section className='mission_container'>
                    <div className='mission_in_wrapper'>
                        <div className='mission_content_container'>
                            <h3 className='company_introduce_title'>
                                Mission
                            </h3>
                            <p className='mission_content_sub_title'>
                                {'Realizing the greatest value of mankind\nthrough a disease-free life'}
                            </p>
                            <p className='mission_content_text'>
                                {"We create values and healthier life through highly efficient new drug development process.\nZefit's platform, which makes the process of developing new drugs highly efficient, is a key to a better future."}
                            </p>
                        </div>
                        <img
                            className='mission_first_image'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img8.jpg'
                            alt='미션1' />
                        <img
                            className='mission_second_image'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img7.jpg'
                            alt='미션2' />
                    </div>
                </section>
            </div>
        </article>
    )
};