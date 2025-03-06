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

export default function ServiceEN() {

    const { service }: any = useParams();

    const [, setLoading] = useRecoilState(isLoading);
    const [serviceData, setServiceData] = useState<any>(null);
    const [serviceTap, setServiceTap] = useState<any>(null);
    const [present, setPresent] = useState<number>(0);
    const [prev, setPrev] = useState<number | null>(null);

    const findData = serviceData?.find((item: any) => item?.service === service);
    const sideTapData = serviceData?.map((item: any) => item?.service);

    const onClickTapHandler = (index: number) => {
        setPresent(index);
        setPrev(present);
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
        <article>
            <PageHeader />
            <PageBanner pageTitle='service' />
            <PageTap tap='business' />
            <SideTap tap={sideTapData} content='service' />

            {/* 현재안 */}
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
