'use client';

import ScrollGuide from '@/components/page/LandingPage/ScrollGuide';
import '../style.css';
import './style.css'
import MainHeader from '@/components/common/MainHeader';
import { useEffect, useRef, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { useMediaQuery } from 'react-responsive';
import { supabase } from '@/utils/Supabase';
import { useRecoilState } from 'recoil';
import { isLoading } from '@/modules/loading';
import Popup from '@/components/common/Popup';

export default function HomeEN() {

    const backRef = useRef<HTMLDivElement>(null);
    const backImage = 'https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_3551210086_0f617416_20811665.jpg';
    const img = new Image();
    const [, setLoading] = useRecoilState(isLoading);

    img.onload = () => {
        if (!backRef.current) return;
        backRef.current.style.backgroundImage = `url('${backImage}')`;
        setLoading(false);
    };

    img.src = backImage;

    // 뷰포트 반응형
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const [serviceHref, setServiceHref] = useState<any>(null); // 서비스 첫번째 데이터 state
    const [partner, setPartner] = useState<any[]>([]); // 파트너 리스트 state
    const [popupData, setPopupData] = useState<any>(null);

    // 마운트했을 때 api통신을 통해 파트너 리스트와 서비스 데이터 가져오기
    useEffect(() => {
        fetch('/api/inquiry/landing/service')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => setServiceHref(jsonData))
            .catch((error) => console.error("Fetch error:", error));

        const fetchPopup = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .eq('is_special', true)
                    .order('created_at', { ascending: false })
                    .limit(1);
                if (error) {
                    throw error;
                }
                setPopupData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            };
        };

        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('state', 'partner');
                if (error) {
                    throw error;
                }
                setPartner(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopup();
        fetchData();
    }, []);

    return (
        <article>
            <Popup popupData={popupData} />
            <MetaTagTitle title='' ko={false} />
            <MainHeader />
            <section className='landing_top_banner_container'>
                <div ref={backRef} className='landing_top_banner' />
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
                        src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img1.jpg'
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
                            <li className='business_card_out_wrapper'>
                                <a
                                    href='/en/content/zebrafish'
                                    className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img2.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Model
                                        </strong>
                                        <p className='business_card_content'>
                                            {"Zefit's competitiveness and core value"}
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className='business_card_out_wrapper'>
                                <a
                                    href={`/en/content/service/${serviceHref?.service}`}
                                    className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img3.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Service
                                        </strong>
                                        <p className='business_card_content'>
                                            {"Zefit's service is accurate"}
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className='business_card_out_wrapper'>
                                <a
                                    href='/en/content/development/pharmaceuticals'
                                    className='business_card_box'>
                                    <div
                                        className='business_card_image'
                                        style={{
                                            backgroundImage: 'url(https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img10.jpg)'
                                        }} />
                                    <div className='business_card_text_box'>
                                        <strong className='business_card_title'>
                                            Drug Dicovery
                                        </strong>
                                        <p className='business_card_content'>
                                            {"innovative drug discovery platform"}
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
                                        src={item.image}
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