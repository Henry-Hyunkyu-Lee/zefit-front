'use client';

import ScrollGuide from '@/components/LandingPage/ScrollGuide';
import '../style.css';
import './style.css'
import MainHeader from '@/components/common/MainHeader';
import { useEffect, useState } from 'react';

export default function Home() {

    const [partner, setPartner] = useState<any[]>([]);

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
            <MainHeader />
            <section className='landing_top_banner'>
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
            <div className='landing_content_wrapper'>
                <section className='landing_company_intro_wrapper'>
                    <h2 className='company_title'>
                        ABOUT COMPANY
                    </h2>
                    <h3 style={{ textAlign: 'center' }} className='company_sub_title_en'>
                        {'Zefit is a nonclinical CRO company that uses\ninnovative diagnostic equipment to help discover\ncandidates in pre-clinical stage.'}
                    </h3>
                    <img
                        className='company_image'
                        src='http://www.zefit.co.kr/theme/basic/assets/images/zefit/main_img1.jpg'
                        alt='회사소개 이미지' />
                    <ul className='company_link_button_wrapper'>
                        <li className='company_link_button_box'>
                            <a className='company_link_button'>
                                <div className='link_button_text_wrapper'>
                                    <strong className='link_button_title'>
                                        Overview
                                    </strong>
                                    <p className='link_button_content'>
                                        {`Constant innovation for happiness for the greatest happiness of humanity`}
                                    </p>
                                </div>
                                <span className='link_button_arrow'>
                                    →
                                </span>
                            </a>
                        </li>
                        <div className='company_link_center_bar' />
                        <li className='company_link_button_box'>
                            <a className='company_link_button'>
                                <div className='link_button_text_wrapper'>
                                    <strong className='link_button_title'>
                                        History
                                    </strong>
                                    <p className='link_button_content'>
                                        {`A path of efforts to achieve innovative development`}
                                    </p>
                                </div>
                                <span className='link_button_arrow'>
                                    →
                                </span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section className='landing_business_content'>
                    <div className='business_content_wrapper'>
                        <h2 className='business_title'>
                            OUR BUSINESS
                        </h2>
                        <ul className='business_card_wrapper'>
                            <li>
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
                                            Zefit's competitiveness and core value
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
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
                                            Zefit's service is accurate
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
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
                                            innovative drug discovery platform
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
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
                <section className='landing_contact_container'>
                    <div className='landing_contact_content_wrapper'>
                        <h2 className='contact_title'>
                            CONTACT US
                        </h2>
                        <p className='contact_content'>
                            Endless development toward Innovation with Zefit.
                        </p>
                        <a className='contact_button'>
                            <svg className='contact_button_svg' viewBox="0 0 182 56" preserveAspectRatio="none">
                                <rect className='contact_button_svg_child' x="1" y="1" width="180" height="54" />
                            </svg>
                            <span className='contact_button_text'>
                                CONTACT
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