'use client';

import ScrollGuide from '@/components/LandingPage/ScrollGuide';
import './style.css';
import MainHeader from '@/components/common/MainHeader';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Home() {

    // 뷰포트 반응형
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    // 파트너 리스트 state
    const [partner, setPartner] = useState<any[]>([]);

    // 마운트했을 때 api통신을 통해 파트너 리스트 데이터 가져오기
    useEffect(() => {
        fetch('/api/inquiry/partner')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => setPartner(jsonData))
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    return (
        <article>

            {/* 메인 페이지 헤더 */}
            <MainHeader />

            {/* 상단 배너 */}
            <section className='landing_top_banner_container'>
                <div className='landing_top_banner' />
                <div className='top_banner_text_box'>
                    <h1 className='top_banner_title'>
                        Greater Value For Your Life
                    </h1>
                    <p className='top_banner_caption'>
                        Using zebrafish, in-vivo model based biotech & pharmaceutical company
                    </p>
                </div>
                <ScrollGuide />
            </section>

            {/* 랜딩 페이지 컨텐츠 */}
            <div className='landing_content_wrapper'>

                {/* 회사 소개 섹션 */}
                <section className='landing_company_intro_wrapper'>
                    <h2 className='company_title'>
                        ABOUT COMPANY
                    </h2>
                    <h3 className='company_sub_title'>
                        <span className='company_bold_text'>제핏은 제브라피쉬 전문 CRO로 혁신적인 진단장비</span>
                        {`를 활용하여 전\n임상단계의 신약후보물질의 발굴을 돕는 `}
                        <span className='company_bold_text'>비임상 CRO 회사입니다.</span>
                    </h3>
                    <img
                        className='company_image'
                        src='http://www.zefit.co.kr/theme/basic/assets/images/zefit/main_img1.jpg'
                        alt='회사소개 이미지' />
                    <ul className='company_link_button_wrapper'>
                        <li className='company_link_button_box'>
                            <a 
                                href='/content/company'
                                className='company_link_button'>
                                <div className='link_button_text_wrapper'>
                                    <strong className='link_button_title'>
                                        회사 개요
                                    </strong>
                                    <p className='link_button_content'>
                                        {`인류 최대 행복 실현을 위한 끊임없는 혁신`}
                                    </p>
                                </div>
                                <span className='link_button_arrow'>
                                    →
                                </span>
                            </a>
                        </li>
                        <div className='company_link_center_bar' />
                        <li className='company_link_button_box'>
                            <a
                                href='/content/history'
                                className='company_link_button'>
                                <div className='link_button_text_wrapper'>
                                    <strong className='link_button_title'>
                                        회사 연혁
                                    </strong>
                                    <p className='link_button_content'>
                                        {`혁신적인 발전을 이루는 노력의 길`}
                                    </p>
                                </div>
                                <span className='link_button_arrow'>
                                    →
                                </span>
                            </a>
                        </li>
                    </ul>
                </section>

                {/* 비즈니스 소개 섹션 */}
                <section className='landing_business_content'>
                    <div className='business_content_wrapper'>
                        <h2 className='business_title'>
                            OUR BUSINESS
                        </h2>
                        <ul className='business_card_wrapper'>
                            <li className='business_card_out_wrapper'>
                                <a className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(http://www.zefit.co.kr/theme/basic/assets/images/zefit/main_img2.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Model
                                        </strong>
                                        <p className='business_card_content'>
                                            제핏의 경쟁력과 핵심가치
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className='business_card_out_wrapper'>
                                <a className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(http://www.zefit.co.kr/theme/basic/assets/images/zefit/main_img3.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Service
                                        </strong>
                                        <p className='business_card_content'>
                                            제핏의 서비스는 정확합니다
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className='business_card_out_wrapper'>
                                <a className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(http://www.zefit.co.kr/theme/basic/assets/images/zefit/main_img10.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Pharmaceuticals
                                        </strong>
                                        <p className='business_card_content'>
                                            신약개발 혁신 플랫폼
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 파트너 리스트 섹션 */}
                <section className='landing_partner_content'>
                    <h2 className='partner_title'>
                        THE PARTNER
                    </h2>
                    <ul className='partner_list'>
                        {partner?.map((item: any, index: number) =>
                            <li key={index} className='partner_link_box'>
                                <a href='/adm' className='partner_link'>
                                    <img
                                        className='partner_link_logo'
                                        src={item.src}
                                        alt={item.title} />
                                </a>
                            </li>
                        )}
                    </ul>
                </section>

                {/* 문의하기 섹션 */}
                <section className='landing_contact_container'>
                    <div className='landing_contact_content_wrapper'>
                        <h2 className='contact_title'>
                            CONTACT US
                        </h2>
                        <p className='contact_content'>
                            혁신을 향한 끊임없는 발전, ZEFIT과 함께하세요
                        </p>
                        <a className='contact_button'>
                            <svg className='contact_button_svg' viewBox="0 0 182 56" preserveAspectRatio="none">
                                <rect className='contact_button_svg_child' x="1" y="1" width="180" height="54" />
                            </svg>
                            <span className='contact_button_text'>
                                문의하기
                                <img
                                    className='contact_button_arrow'
                                    src='/icons/arrow.png'
                                    alt='화살표' />
                            </span>
                        </a>
                    </div>
                </section>
            </div>
        </article>
    );
};