'use client';

import '../../../content/privacy/style.css'
import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import { isLoading } from '@/modules/loading';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function PrivacyEN() {

    const [, setLoading] = useRecoilState(isLoading);
    const [privacyData, setPrivacyData] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/inquiry/privacy`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setPrivacyData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='privacy policy' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='privacy policy' />
            <section className='page_layout'>
                <div className='provacy_page_container'>
                    <div className='provacy_page_content_wrapper'>
                        <strong className='provacy_paragraph_title'>
                            {privacyData?.normal.title_en}
                        </strong>
                        {privacyData?.normal.content_en.map((item: any, index: number) =>
                            <p
                                key={index}
                                className='provacy_paragraph_content'>
                                {item}
                            </p>
                        )}
                    </div>
                    <div className='provacy_page_out_wrapper'>
                        <strong className='provacy_paragraph_mini_title'>
                            {privacyData?.manager.title_en}
                        </strong>
                        {privacyData?.manager.content_en.map((item: any, index: number) =>
                            <div
                                key={index}
                                className='provacy_page_content_wrapper'>
                                {item?.map((text: string, idx: number) =>
                                    <p
                                        key={idx}
                                        className='provacy_paragraph_mini_content'>
                                        {text}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </article>
    )
};