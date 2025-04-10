'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";

// 현재안
import './style.css';

// 반영안
// import './test-style.css';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useRecoilState } from "recoil";
import { isLoading } from "@/modules/loading";
import TestServiceDetailTap from "@/components/page/ServicePage/TestServiceDetailTap";
import ServiceDetailTap from "@/components/page/ServicePage/ServiceDetailTap";
import { onClickRequestsHandler } from "@/utils/AddDataHandler";

const PARTNER_LOGO_COUNT = 22;
const BASE_LOGO_URL = "https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/logo_img/logo_";

export default function Service() {

    const { service }: any = useParams();

    const [, setLoading] = useRecoilState(isLoading);

    const [serviceData, setServiceData] = useState<any>(null);
    const [serviceTap, setServiceTap] = useState<any>(null);
    const [present, setPresent] = useState<number>(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [formInput, setFormInput] = useState<any>({
        name: '',
        email: '',
        company: '',
        title: '',
        content: ''
    });

    const { name, email, company, title, content } = formInput;

    const findData = serviceData?.find((item: any) => item?.service === service);
    const sideTapData = serviceData?.map((item: any) => item?.service);

    const onClickTapHandler = (index: number) => {
        setPresent(index);
        setPrev(present);
    };

    const onChangeFormHandler = (e: any) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value
        });
    };

    const onSubmitFormHandler = (e: any) => {
        e.preventDefault();
        onClickRequestsHandler(e, formInput, 'ko');
    };

    useEffect(() => {
        setLoading(true);

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
                    setServiceTap(findData.content);
                })
                .catch((error) => console.error("Fetch error:", error))
                .finally(() => {
                    setLoading(false);
                });
        };
    }, [service]);

    const renderPartnerLogos = () => {
        const logos = Array.from({ length: PARTNER_LOGO_COUNT }, (_, i) => i + 1);
        return (
            <>
                {logos.map((num) => (
                    <img 
                        key={`logo-${num}`}
                        src={`${BASE_LOGO_URL}${num.toString().padStart(2, '0')}.png`}
                        alt={`partner logo ${num}`}
                        className="overview_page_partners_logo"
                    />
                ))}
                {/* Duplicate logos for seamless scrolling */}
                {logos.map((num) => (
                    <img 
                        key={`logo-dup-${num}`}
                        src={`${BASE_LOGO_URL}${num.toString().padStart(2, '0')}.png`}
                        alt={`partner logo ${num}`}
                        className="overview_page_partners_logo"
                    />
                ))}
            </>
        );
    };

    return (
        <article style={{ position: 'relative' }}>
            <MetaTagTitle title='서비스' />
            <PageHeader />
            <PageBanner pageTitle='서비스' />
            <PageTap tap='business' />
            <SideTap tap={sideTapData} content='service' />

            {/* 현재안 */}
            {service === 'Overview' ? (
                <div className="page_layout">
                    <section className="overview_page_container">
                        <header className="overview_page_header">
                            <h2 className="overview_page_title">
                                Difference makes better
                            </h2>
                            <p className="overview_page_subtitle">제핏의 서비스를 통해 전임상 시험 기간을 단축하고 신속한 IND를 진행해보세요.</p>
                            <picture className="overview_page_title_image">
                                <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//main_title_img.png" media="(min-width: 1170px)" />
                                <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/main_title_mobile_img.png" media="(max-width: 1169px)" />
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//main_title_img_mobile.png" alt="overview_image" />
                            </picture>
                            <div className="overview_page_partners_box">
                                <div className="partners_title">THE PARTNERS</div>
                                <div className="partners_logo_container">
                                    {renderPartnerLogos()}
                                </div>
                            </div>
                            <p className="overview_page_paragraph">Let&rsquo;s talk biotech</p>
                            <h3 className="overview_page_subsubtitle">A new era of bio research</h3>
                            <p className="overview_page_paragraph paragraph_center">
                                바이오 연구는 전통적으로 복잡하고 까다롭습니다. 그래서 ZEFIT은 완전히 새로운 접근 방식을 제시합니다.<br />
                                제브라피쉬 기반 플랫폼을 활용해 신약 개발을 가속화하고, 효율적인 연구를 지원하며, 혁신적인 바이오 솔루션을 제공합니다.
                            </p>
                            <p className="paragraph_small nowrap">10K+ 연구 데이터 • 제브라피쉬 기반 실험 플랫폼 • 신뢰할 수 있는 바이오 연구 솔루션</p>
                            <div className="certificates">
                                <div className="overview_page_certificate_box">
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                    <p className="paragraph_small">
                                        제브라피쉬 유효성 시험<br />
                                        ISO 9001:2015<br />
                                        품질 경영시스템 인증
                                    </p>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                                </div>
                                <div className="overview_page_certificate_box">
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                    <p className="paragraph_small">
                                        한국생명공학연구원<br />
                                        LMO 2등급 등록<br />
                                    </p>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                                </div>
                                <div className="overview_page_certificate_box">
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                    <p className="paragraph_small">
                                        과학기술정보통신부<br />
                                        전문연구사업자 등록<br />
                                    </p>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                                </div>
                                <div className="overview_page_certificate_box">
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                    <p className="paragraph_small">
                                        식품의약품안전처<br />
                                        동물실험시설 등록<br />
                                    </p>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                                </div>
                            </div>
                        </header>
                        <section className="overview_page_content_section">
                            <div className="overview_page_content_divider">
                                <div className="overview_page_content_box">
                                    <div className="overview_page_content_box_icon">
                                        <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//section_title_icon.png" alt="section_title_icon" />
                                        <span>Screen-FIT™</span>
                                    </div>
                                    <h3 className="overview_page_subtitle">다양한 후보물질을 스크리닝하여 최적의 리드물질을 선별하고 싶으신가요?</h3>
                                    <p className="overview_page_content_subheader">Screen-FIT™ 제브라피쉬 시험 데이터 기반 약물 스크리닝 서비스</p>
                                    <p className="overview_page_paragraph">In-vitro 스크리닝 결과와 in-vivo 시험 결과는 일치하지 않은 경우가 대부분이며 그 원인은 급격한 scale-up입니다.</p>
                                    <p className="overview_page_paragraph">Screen-FIT™은 일반 스크리닝 서비스로 대량 후보물질의 in-vivo 스크리닝을 통해 유효성 및 독성을 평가하고 in-vitro와 in-vivo의 차이를 보완하여 최적의 리드물질을 신속하게 선별합니다.</p>
                                </div>
                                <picture className="overview_page_content_image">
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_img.png" media="(min-width: 1170px)" />
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/Screen-FIT_mobile_img.png" media="(max-width: 1169px)" />
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/Screen-FIT_img.png" alt="Screen-FIT" />
                                </picture>
                            </div>
                            <hr />
                            <div className="overview_page_content_three">
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_icon01.png" alt="Screen-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>최적화된 타겟 질환 선정</h4>
                                    <p>제브라피쉬 모델을 활용하여 특정 질환에 대한 약물 반응을 분석하고, 가장 적합한 타겟 질환을 도출합니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_icon02.png" alt="Screen-FIT_icon" className="overview_page_content_three_icon " />
                                    <h4>최적의 리드 물질 선별</h4>
                                    <p>대량의 후보 물질을 스크리닝하여 유효성과 안전성이 검증된 리드물질을 신속하게 선별합니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_icon03.png" alt="Screen-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>신속한 In-vivo 데이터 확보</h4>
                                    <p>제브라피쉬 기반 고속 in-vivo 스크리닝으로 유효성 독성 동시 확인, 리드물질 빠르게 선별합니다.</p>
                                </div>
                            </div>
                        </section>
                        <section className="overview_page_content_section">
                            <div className="overview_page_content_divider_right">
                                <div className="overview_page_content_box">
                                    <div className="overview_page_content_box_icon_right">
                                        <span>Pre-FIT™</span>
                                        <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//section_title_icon.png" alt="section_title_icon" />
                                    </div>
                                    <h3 className="overview_page_subtitle">전임상시험의 RISK를 낮추고 기간을 단축하고 싶으신가요?</h3>
                                    <p className="overview_page_content_subheader">Pre-FIT™ 토탈 제브라피쉬 시험 데이터 기반 전임상 시험 Dose Range Finding 서비스</p>
                                    <p className="overview_page_paragraph">제약산업의 전임상단계 성공률은 평균 약 9.6%로 성공 확률이 낮으며 이는 대부분 독성 예측 및 용량 설정 실패가 원인입니다.</p>
                                    <p className="overview_page_paragraph">Pre-FIT™은 유효성 및 토탈 독성(급성, 간, 심장, 신장, 위, 신경) 시험 데이터를 기반으로 전임상단계의 유효 용량과 독성 용량을 예측하고 최적 용량을 추천합니다.</p>
                                </div>
                                <picture className="overview_page_content_image">
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_img.png" media="(min-width: 1170px)" />
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/Pre-FIT_mobile_img.png" media="(max-width: 1169px)" />
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_img.png" alt="Pre-FIT" />
                                </picture>
                            </div>
                            <hr />
                            <div className="overview_page_content_three">
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_icon01.png" alt="Pre-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>전임상 성공률 향상</h4>
                                    <p>제브라피쉬 기반 연구를 통해 신약 후보물질의 효과와 안전성을 미리 평가하여, 성공 가능성을 높입니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_icon02.png" alt="Pre-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>전임상 기간 단축</h4>
                                    <p>신속한 데이터 분석과 실험 자동화를 통해 기존 전임상 대비 연구 기간을 대폭 줄입니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_icon03.png" alt="Pre-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>전임상 시험 디자인 및 전략 수립 지원</h4>
                                    <p>맞춤형 실험 설계 및 최적화된 전략 수립을 지원하여, 효율적인 연구 진행을 돕습니다.</p>
                                </div>
                            </div>
                        </section>
                        <section className="overview_page_content_section">
                            <div className="overview_page_content_divider">
                                <div className="overview_page_content_box">
                                    <div className="overview_page_content_box_icon">
                                        <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//section_title_icon.png" alt="section_title_icon" />
                                        <span>IND-FIT™</span>
                                    </div>
                                    <h3 className="overview_page_subtitle">규제기관 요구수준의 제브라피쉬 전임상 데이터를 통해 임상시험계획(IND)을 신속하게 승인 받아보세요.</h3>
                                    <p className="overview_page_content_subheader">IND-FIT™ 규제기관 제출에 적합한 수준으로 제브라피쉬 전임상시험 서비스를 제공합니다.</p>
                                    <p className="overview_page_paragraph">기존의 포유류 기반 동물 실험은 많은 비용과 실험 기간을 요구하며 이는 신약개발 과정의 주요 병목 구간입니다.</p>
                                    <p className="overview_page_paragraph">IND-FIT™은 규제기관 요구수준의 시험 설계 및 데이터 Filing을 통해 제브라피쉬 시험 데이터를 전임상 데이터로 인정받을 수 있도록 시험 데이터를 제공합니다.</p>
                                </div>
                                <picture className="overview_page_content_image">
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_img.png" media="(min-width: 1170px)" />
                                    <source srcSet="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/IND-FIT_mobile_img.png" media="(max-width: 1169px)" />
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/mobile_img/IND-FIT_img.png" alt="IND-FIT" />
                                </picture>
                            </div>
                            <hr />
                            <div className="overview_page_content_three">
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_icon01.png" alt="IND-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>IND 제출 요건 부합 전임상 데이터 제공</h4>
                                    <p>IND 신청에 필요한 신뢰할 수 있는 전임상 데이터를 확보하여 규제기관의 승인 요건을 충족합니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_icon02.png" alt="IND-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>비용 효율적인 IND 승인</h4>
                                    <p>기존 전임상 대비 비용을 절감하면서도 높은 신뢰도의 데이터를 제공합니다.</p>
                                </div>
                                <div>
                                    <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_icon03.png" alt="IND-FIT_icon" className="overview_page_content_three_icon" />
                                    <h4>신속한 IND 승인</h4>
                                    <p>빠른 연구 수행 및 데이터 분석을 통해 IND 승인 프로세스를 단축합니다.</p>
                                </div>
                            </div>
                        </section>
                        <footer className="overview_page_footer">
                            <h3 className="overview_page_subsubtitle">Have any questions?</h3>
                            <p className="overview_page_paragraph">궁금한 점이 있으신가요? 저희가 답해드립니다.</p>
                            <div className="overview_page_footer_divider">
                                <form onSubmit={onSubmitFormHandler} className="overview_page_footer_form">
                                    <label>이름 <span style={{ color: 'red' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={name}
                                        onChange={onChangeFormHandler}
                                    />
                                    <label>이메일 <span style={{ color: 'red' }}>*</span></label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        onChange={onChangeFormHandler}
                                    />
                                    <label>회사명 (부서/직책) <span style={{ color: 'red' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        name="company"
                                        value={company}
                                        onChange={onChangeFormHandler}
                                    />
                                    <label>문의 제목 <span style={{ color: 'red' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={title}
                                        onChange={onChangeFormHandler}
                                    />
                                    <label>문의 내용 <span style={{ color: 'red' }}>*</span></label>
                                    <textarea 
                                        name="content"
                                        value={content}
                                        onChange={onChangeFormHandler}
                                    ></textarea>
                                    <p className="overview_page_footer_paragraph">
                                        <span style={{ color: 'red' }}>*</span>
                                        제핏은 고객님의 문의요청에 정확하고 성실한 답변을 드리기 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
                                        (<a href="/requests" style={{ color: 'blue' }}>자세히..</a>)
                                    </p>
                                    <button type="submit">SEND</button>
                                </form>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//contact_us_img.png" alt="contact_us_img" className="overview_page_footer_image" />
                            </div>
                        </footer>
                    </section>
                </div>
            ) : (
                <div className='page_layout'>
                    <section className='service_page_container'>
                        <h2 className='service_page_title'>
                            <div className='service_page_side_bar' />
                            {service}
                        </h2>
                        <div className='service_page_info_wrapper'>
                            <div className='service_page_info_box'>
                                <h3 className='service_page_info_box_title'>
                                    {findData?.model}
                                </h3>
                                {findData?.introduce.map((item: string, index: number) =>
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
                        </div>
                    </section>
                    <ServiceDetailTap
                        findData={findData}
                        serviceTap={serviceTap}
                        onClickTapHandler={onClickTapHandler}
                        present={present}
                            prev={prev} />
                </div>
            )}

            {/* 반영안 */}
            {/* <div className="page_layout">
                <section className='service_page_container2'>
                    <h2 className='service_page_title2'>
                        <div className='service_page_side_bar2' />
                        {service}
                    </h2>
                    <div className='service_page_info_wrapper2'>
                        <img
                            className='service_info_image2'
                            src={findData?.thumbnail}
                            alt={findData?.service} />
                        <div className='service_page_info_box2'>
                            <h3 className='service_page_info_box_title2'>
                                {findData?.model}
                            </h3>
                            {findData?.introduce.map((item: string, index: number) =>
                                <p
                                    key={index}
                                    className='service_page_info_box_content2'>
                                    {item}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="service_page_detail_container">
                    <div className="service_page_detail_wrapper">
                        <ul className="detail_tap_wrapper">
                            {findData?.content.map((item: any, index: number) =>
                                <li
                                    key={index}
                                    className="detail_tap_button_list">
                                    <button
                                        onClick={() => onClickTapHandler(index)}
                                        className={
                                            (present === index)
                                                ? "select_detail_tap_button"
                                                : "detail_tap_button"
                                        }>
                                        {item?.name}
                                    </button>
                                </li>
                            )}
                        </ul>
                        <TestServiceDetailTap
                            serviceTap={serviceTap}
                            present={present}
                            prev={prev} />
                    </div>
                </section>
            </div> */}

        </article>
    )
};