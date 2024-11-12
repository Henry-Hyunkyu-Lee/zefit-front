'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../status/style.css';
import { useEffect, useState } from "react";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { supabase } from "@/utils/Supabase";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function StatusEN() {

    const [, setLoading] = useRecoilState(isLoading);
    const [partner, setPartner] = useState<any[]>([]);
    const [certification, setCertification] = useState<any[]>([]);

    useEffect(() => {
        const fetchPartnerData = async () => {
            try {
                const { data, error } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('state', 'partner')
                    .order('created_at', { ascending: true });
                if (error) {
                    throw error;
                }
                setPartner(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        const fetchCertifyData = async () => {
            try {
                const { data, error } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('state', 'certification')
                    .order('created_at', { ascending: true });
                if (error) {
                    throw error;
                }
                setCertification(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartnerData();
        fetchCertifyData();
    }, []);

    return (
        <article>
            <MetaTagTitle title='Certifications & Partners' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Certifications & Partners' />
            <PageTap tap='company' />
            <div className='page_layout'>
                <section className='status_page_container'>
                    <h2 className='page_left_title'>
                        Certification
                    </h2>
                    <ul className='status_page_content_list'>
                        {certification?.map((item: any, index: number) =>
                            <li
                                key={index}>
                                <a className='status_image_wrapper'>
                                    <img
                                        className='status_image'
                                        src={item?.image}
                                        alt={item?.title_en} />
                                </a>
                            </li>
                        )}
                    </ul>
                    <h2
                        style={{ marginTop: '40px' }}
                        className='page_left_title'>
                        Partner
                    </h2>
                    <ul className='status_page_content_list'>
                        {partner?.map((item: any, index: number) =>
                            <li
                                key={index}>
                                <a className='status_image_wrapper'>
                                    <img
                                        className='status_image'
                                        src={item?.image}
                                        alt={item?.title_en} />
                                </a>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </article>
    )
};