'use client'

import './style.css';
import '../../style.css';
import AdmHeader from "@/components/common/AdmHeader";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { supabase } from '@/utils/Supabase';
import { correctContentConfig } from '@/data/contentConfig';
import AdmScrollTop from '@/components/page/AdminPage/AdmScrollTop';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';

export default function AdmHistoryDetail() {

    const path = usePathname() as string;
    const { contentsId } = useParams() as { contentsId: string };

    const content = path?.split('/')[2];

    const [, setLoading] = useRecoilState(isLoading);
    const [admData, setAdmData] = useState<any>(null);
    const [isUpload, setIsUpload] = useState<boolean>((contentsId === 'update') ? true : false);
    const [isClient, setIsClient] = useState(false);

    const config = correctContentConfig[content] || { title: '관리자메인' };
    const Component = config.component;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setLoading(false);

        if (!isUpload) {
            const fetchData = async () => {
                try {
                    const { data, error } = await supabase
                        .from(content)
                        .select('*')
                        .eq('id', contentsId);
                    if (error) {
                        throw error;
                    }
                    setAdmData(data[0]);
                } catch (error) {
                    console.error("Error fetching data from Supabase:", error);
                }
            };

            fetchData();
        }
    }, [path, contentsId]);

    if (!isClient) {
        return null; // 또는 로딩 표시
    }

    return (
        <article className='adm_layout'>
            <MetaTagTitle title={`수정 및 업데이트: ${config.title}`} />
            <AdmHeader title={`수정 및 업데이트: ${config.title}`} />
            <section className='adm_content_wrapper'>
                {Component && <Component admData={admData} isUpload={isUpload} setIsUpload={setIsUpload} />}
            </section>
            <AdmScrollTop />
        </article>
    )
};