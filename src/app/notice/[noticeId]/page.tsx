'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import './style.css';
import '../../notice/[noticeId]/style.css'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { supabase } from "@/utils/Supabase";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function NoticeDetail() {

    const { noticeId }: any = useParams();

    const [, setLoading] = useRecoilState(isLoading);
    const [noticeData, setNoticeData] = useState<any>(null);

    const db_table_name = 'notices';
    const sql_query = '*';

    useEffect(() => {
        if (noticeId) {
            const fetchData = async () => {
                try {
                    const { data, error } = await supabase
                        .from(db_table_name)
                        .select(sql_query)
                        .eq('id', noticeId);
                    if (error) {
                        throw error;
                    }
                    setNoticeData(data[0]);
                } catch (error) {
                    console.error("Error fetching data from Supabase:", error);
                } finally {
                    setLoading(false);
                };
            };
            fetchData()
        };
    }, [noticeId]);

    return (
        <article>
            <MetaTagTitle title='공지사항' />
            <PageHeader />
            <PageBanner pageTitle='공지사항' />
            <PageTap tap='community' />
            <section className='page_layout'>
                <div className='notice_detail_page_container'>
                    <ul className='notice_detail_tap_wrapper'>
                        <li className='notice_detail_tap_content'>
                            <i className='icon-calendar'></i>
                            {noticeData?.created_at}
                        </li>
                        <li className='notice_detail_tap_content'>
                            /
                        </li>
                        <li className='notice_detail_tap_content'>
                            <i className='icon-user'></i>
                            {noticeData?.writer_kr}
                        </li>
                        <li className='notice_detail_tap_content'>
                            /
                        </li>
                        <li>
                            <a
                                href='/notice'
                                className='notice_detail_tap_button'>
                                <i className='icon-menu'></i>
                                목록
                            </a>
                        </li>
                    </ul>
                    <h2 className='notice_detail_title'>
                        {noticeData?.title_kr}
                    </h2>
                    {/* {newsData?.image.map((item: any, index: number) => */}
                    {(noticeData?.image)
                        && <img
                            // key={index}
                            className='news_detail_Image'
                            src={noticeData?.image}
                            alt={`보도자료 이미지 ${noticeData?.title_kr}`} />}
                    {/* )} */}
                    <p className='notice_detail_content'>
                        {noticeData?.content_kr}
                    </p>
                </div>
            </section>
        </article>
    )
};