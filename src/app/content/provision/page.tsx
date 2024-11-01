'use client';

import './style.css';
import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import { isLoading } from '@/modules/loading';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Provision() {

    const [, setLoading] = useRecoilState(isLoading);
    const [provisionData, setProvisionData] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/inquiry/provision`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setProvisionData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <PageHeader />
            <PageBanner pageTitle='서비스 이용약관' />
            <section className='page_layout'>
                <ul className='provision_page_container'>
                    {provisionData?.map((item: any, index: number) =>
                        <li
                            key={index}
                            className='provision_page_content_wrapper'>
                            <strong className='provision_paragraph_title'>
                                {item?.title}
                            </strong>
                            {item?.content.map((text: string, idx: number) =>
                                <p
                                    key={idx}
                                    className='provision_paragraph_content'>
                                    {text}
                                </p>
                            )}
                        </li>
                    )}
                </ul>
            </section>
        </article>
    )
};