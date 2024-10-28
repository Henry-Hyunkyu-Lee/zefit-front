'use client';

import MainHeader from "@/components/common/MainHeader";
import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import './style.css';
import { companyData } from "@/data/companyData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useMediaQuery } from "react-responsive";

export default function Company() {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    return (
        <article>
            <MetaTagTitle title='회사개요' />
            <PageHeader />
            <PageBanner pageTitle='회사개요' />
            <PageTap tap='company' />

            {/* 회사 개요 페이지 레이아웃 */}
            <div className='page_layout'>
                <section className='company_introduce_container'>
                    <h2 className='page_title'>
                        About Us
                    </h2>
                    <h3 className='company_introduce_sub_title'>
                        제핏은 early in-vivo testing model인
                        <br />
                        <b className='sub_title_span'>
                            제브라피쉬를 활용
                        </b>하여 새로운 화합물의
                        <br />
                        <b className='sub_title_span'>
                            안전성, 유효성 및 의학적 연관성을 분석
                        </b>
                        하여 제공하고 있습니다.
                    </h3>
                    <div className='company_center_bar' />
                    <div className='introduce_additional_wrapper'>
                        <p className='introduce_additional'>
                            제브라피쉬을 통한 의약품개발은 실험동물모델의 사용을 줄이고 대체하는 실험 방법입니다.
                        </p>
                        <p className='introduce_additional'>
                            {'제브라피쉬는 수명주기가 빨라 HTS 접근이 가능하며\n이를 통해 고객사는 연구 의약품의 상용화를 앞당길 수 있습니다.'}
                        </p>
                        <p className='introduce_additional'>
                            {'제핏은 생명과학 전문가와 자동화 기술 전문가가 함께 구축한\n차별화된 신약개발 플랫폼을 보유하고 있습니다.'}
                        </p>
                    </div>
                </section>
                <section className='different_develop_intro_container'>
                    <div className='different_develop_background_image' />
                    <div className='different_develop_gradient_back' />
                    <div className='different_develop_content_container'>
                        <div className='different_develop_title_container'>
                            <h4 className='different_develop_title'>
                                차별화된 신약개발 플랫폼
                            </h4>
                            <p className='different_develop_sub_title'>
                                {'현재 제핏은 국내 유수 연구기관과 제약회사에\n화합물 시험 서비스를 제공하고 있습니다.'}
                            </p>
                            <div className='company_center_bar' />
                            <p className='different_develop_introduce'>
                                {'제브라피쉬 유전자 편집기술을 활용하여 맞춤형 질병 모델을 제작하고,\n자동화된 실험 인프라로 실험기간과 데이터 간 편차를 줄이며\n보유한 실험 데이터를 활용한 신약개발 플랫폼을 구축하고 있습니다.'}
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
                            )}
                        </ul>
                    </div>
                </section>
                <section className='mission_container'>
                    <div className='mission_in_wrapper'>
                        <div className='mission_content_container'>
                            <h3 className='mission_content_title'>
                                Mission
                            </h3>
                            <p className='mission_content_sub_title'>
                                {'질병 없는 삶을 통한\n인류의 최대가치 실현'}
                            </p>
                            <p className='mission_content_text'>
                                {'우리는 고효율의 신약개발기술을 통해 삶을 더 건강하게 만들고\n더 큰 가치를 실현할 수 있도록 합니다.\n\n신약개발과정을 효율화 하는 제핏의 플랫폼은\n더 나은 미래를 위한 핵심입니다.'}
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