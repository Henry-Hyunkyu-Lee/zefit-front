'use client';

import '../../../content/provision/style.css';
import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import { isLoading } from '@/modules/loading';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ProvisionEN() {

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
            <MetaTagTitle title='Term of Use' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Term of Use' />
            <section className='page_layout'>
                <ul className='provision_page_container'>
                    {provisionData?.map((item: any, index: number) =>
                        <li
                            key={index}
                            className='provision_page_content_wrapper'>
                            <strong className='provision_paragraph_title'>
                                {item?.title_en}
                            </strong>
                            {item?.content_en.map((text: string, idx: number) =>
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