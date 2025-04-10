'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";

// 현재안
import '../../../../content/service/[service]/style.css';

// 반영안
// import '../../../../content/service/[service]/test-style.css';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";
import TestServiceDetailTap from "@/components/page/ServicePage/TestServiceDetailTap";
import ServiceDetailTap from "@/components/page/ServicePage/ServiceDetailTap";
import { onClickRequestsHandler } from "@/utils/AddDataHandler";

const PARTNER_LOGO_COUNT = 22;
const BASE_LOGO_URL = "https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/logo_img/logo_";

export default function ServiceEN() {

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
   // TypeScript type definition for service types
type ServiceType = 'CNS_FIT' | 'Meta_FIT' | 'Onco_FIT' | 'Toxicology' | 'Default';

// Configuration object for metadata
const metadataConfig: Record<ServiceType, {title: string, description: string, keywords: string[]}> = {
  'CNS_FIT': {
    title: "Advanced Central Nervous System Model Research",
    description: "ZEFIT provides CNS zebrafish models to study the central nervous system. It enables fast drug discovery, finding compounds to prevent convulsions in two weeks.",
    keywords: ['central nervous system model']
  },
  'Meta_FIT': {
    title: "Metabolic Disease Research for Drug Discovery",
    description: "ZEFIT's Meta_FIT service uses zebrafish models to study metabolic diseases. It detects liver damage and speeds up drug discovery by reducing fat accumulation.",
    keywords: ['metabolic disease research']
  },
  'Onco_FIT': {
    title: "Preclinical Testing Services for Anticancer Drug development",
    description: "ZEFIT works on anticancer drug development using zebrafish CDX models. It accelerates drug discovery by providing tumor growth and metastasis data in five days.",
    keywords: ['anticancer drug development', 'preclinical testing services', 'anticancer drug discovery']
  },
  'Toxicology': {
    title: "Toxicity Testing Services for Drug Discovery",
    description: "ZEFIT provides advanced toxicity testing services to support early drug development process by assessing drug safety and adverse effects before clinical trials.",
    keywords: ['toxicity testing services', 'drug discovery toxicology']
  },
  'Default': {
    title: "Default Service Title or Service Not Found",
    description: "No specific service selected or service data not available.",
    keywords: ['default', 'service']
  }
};

// Function to retrieve metadata based on service type
const customMetaData = (type: ServiceType) => {
  const meta = metadataConfig[type] || metadataConfig['Default'];
  return <MetaTagTitle title={meta.title} ko={false} description={meta.description} keywords={meta.keywords} />;
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
                        <p className="overview_page_subtitle">Accelerate your IND and shorten the preclinical timeline with ZEFIT&rsquo;s services.</p>
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
                            Bio research has traditionally been complex and challenging. That’s why ZEFIT offers a completely new approach.<br />
                            By leveraging a zebrafish-based platform, we accelerate drug development, support efficient research, and deliver innovative bio solutions.
                        </p>
                        <p className="paragraph_small nowrap">10K+ research data • Zebrafish-based platform • Reliable bio research solutions</p>
                        <div className="certificates">
                            <div className="overview_page_certificate_box">
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                <p className="paragraph_small">
                                    Zebrafish Efficacy Test<br />
                                    ISO 9001:2015<br />
                                    Quality Management System
                                </p>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                            </div>
                            <div className="overview_page_certificate_box">
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                <p className="paragraph_small">
                                    Korean Research Institute<br /> 
                                    of Bioscience & Biotechnology<br />
                                    LMO Biosafety Level 2
                                </p>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                            </div>
                            <div className="overview_page_certificate_box">
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                <p className="paragraph_small">
                                    Ministry of Science and ICT<br />
                                    Specialized Research Business
                                </p>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_right.png" alt="certificate_icon_right" />
                            </div>
                            <div className="overview_page_certificate_box">
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//certificate_icon_left.png" alt="certificate_icon_left" />
                                <p className="paragraph_small">
                                    Ministry of Food and Drug Safety<br />
                                    Laboratory Animal Facility
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
                                <h3 className="overview_page_subtitle">Looking for the best lead compound among candidates?</h3>
                                <p className="overview_page_content_subheader">Screen-FIT™ is an in vivo drug screening service based on zebrafish models.</p>
                                <p className="overview_page_paragraph">In many cases, in vitro screening results fail to correlate with in vivo outcomes—primarily due to the challenges of rapid scale-up.</p>
                                <p className="overview_page_paragraph">Screen-FIT™ is a standardized in vivo screening service that evaluates both efficacy and toxicity across large sets of candidate compounds.<br />
                                It bridges the gap between in vitro and in vivo results to accelerate lead identification</p>
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
                                <h4>Optimized Target Disease Selection</h4>
                                <p>Using zebrafish models, we analyze disease-specific drug responses to identify the most appropriate target indications.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_icon02.png" alt="Screen-FIT_icon" className="overview_page_content_three_icon " />
                                <h4>Lead Identification</h4>
                                <p>We rapidly screen a large number of candidate compounds to identify lead compounds with validated efficacy and safety.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Screen-FIT_icon03.png" alt="Screen-FIT_icon" className="overview_page_content_three_icon" />
                                <h4>Rapid In-vivo Data Acquisition</h4>
                                <p>Zebrafish-based high-throughput screening enables simultaneous assessment of efficacy and toxicity, accelerating the identification of lead compounds.</p>
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
                                <h3 className="overview_page_subtitle">Looking to minimize risk and shorten timelines in preclinical trials?</h3>
                                <p className="overview_page_content_subheader">Pre-FIT™ is a comprehensive zebrafish-based Dose Range Finding (DRF) service for preclinical studies.</p>
                                <p className="overview_page_paragraph">The average success rate in the pharmaceutical preclinical phase is just 9.6%, with most failures stemming from inaccurate toxicity prediction and suboptimal dose selection.</p>
                                <p className="overview_page_paragraph">Pre-FIT™ uses zebrafish models to predict effective and toxic dose ranges based on efficacy and comprehensive toxicity data—including acute, hepatic, cardiac, renal, gastric, and neural toxicity—providing optimal dose recommendations for preclinical development.</p>
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
                                <h4>Enhanced Preclinical Success</h4>
                                <p>By conducting early efficacy and safety evaluations using zebrafish models, we increase the likelihood of preclinical success.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_icon02.png" alt="Pre-FIT_icon" className="overview_page_content_three_icon" />
                                <h4>Shortened Preclinical Timelines</h4>
                                <p>Rapid data analysis and experimental automation significantly reduce the study duration compared to traditional preclinical approaches.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//Pre-FIT_icon03.png" alt="Pre-FIT_icon" className="overview_page_content_three_icon" />
                                <h4>Preclinical Design and Strategy Support</h4>
                                <p>We provide customized study designs and strategic planning to streamline and optimize your preclinical research.</p>
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
                                <h3 className="overview_page_subtitle">Looking to accelerate IND approval with cost-effective zebrafish-based preclinical data?</h3>
                                <p className="overview_page_content_subheader">IND-FIT™ provides zebrafish-based preclinical testing data that fully complies with regulatory standards.</p>
                                <p className="overview_page_paragraph">Traditional in vivo preclinical testing using mammalian models is costly and time-consuming, often becoming a major bottleneck in drug development.</p>
                                <p className="overview_page_paragraph">IND-FIT™ offers regulatory-compliant study designs and preclinical test data, enabling zebrafish results to be accepted as valid scientific evidence for IND submission.</p>
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
                                <h4>Regulatory-Compliant Preclinical Data</h4>
                                <p>We provide reliable preclinical data suitable for IND filing and approval.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_icon02.png" alt="IND-FIT_icon" className="overview_page_content_three_icon" />
                                <h4>Cost-Efficient IND Approval</h4>
                                <p>We deliver high-quality preclinical data at a fraction of the cost of conventional studies.</p>
                            </div>
                            <div>
                                <img src="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public//IND-FIT_icon03.png" alt="IND-FIT_icon" className="overview_page_content_three_icon" />
                                <h4>Accelerated IND Process</h4>
                                <p>Faster study execution and data analysis accelerate the IND approval process.</p>
                            </div>
                        </div>
                    </section>
                    <footer className="overview_page_footer">
                        <h3 className="overview_page_subsubtitle">Have any questions?</h3>
                        <p className="overview_page_paragraph">If you have any questions, we’ll be happy to assist you.</p>
                        <div className="overview_page_footer_divider">
                            <form onSubmit={onSubmitFormHandler} className="overview_page_footer_form">
                                <label>Name <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={name}
                                    onChange={onChangeFormHandler}
                                />
                                <label>Email <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={email}
                                    onChange={onChangeFormHandler}
                                />
                                <label>Company Name (Dept./Title.) <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="text" 
                                    name="company"
                                    value={company}
                                    onChange={onChangeFormHandler}
                                />
                                <label>Subject <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={title}
                                    onChange={onChangeFormHandler}
                                />
                                <label>Message <span style={{ color: 'red' }}>*</span></label>
                                <textarea 
                                    name="content"
                                    value={content}
                                    onChange={onChangeFormHandler}
                                ></textarea>
                                <p className="overview_page_footer_paragraph">
                                    <span style={{ color: 'red' }}>*</span>
                                    Zefit collects only the minimum personal information necessary to provide accurate and sincere responses to your inquiries.
                                    (<a href="/requests" style={{ color: 'blue' }}>Learn more..</a>)
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
                    </div>
                </section>
                <ServiceDetailTap
                    findData={findData}
                    serviceTap={serviceTap}
                    onClickTapHandler={onClickTapHandler}
                    present={present}
                    prev={prev}
                    lang="en" />
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
                                {findData?.model_en}
                            </h3>
                            {findData?.introduce_en.map((item: string, index: number) =>
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
                                        {item?.name_en}
                                    </button>
                                </li>
                            )}
                        </ul>
                        <TestServiceDetailTap
                            serviceTap={serviceTap}
                            present={present}
                            prev={prev}
                            lang='en' />
                    </div>
                </section>
            </div> */}

        </article>
    )
};
