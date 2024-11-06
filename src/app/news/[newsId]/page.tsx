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

export default function NewsDetail() {

    const { newsId }: any = useParams();

    const [, setLoading] = useRecoilState(isLoading);
    const [newsData, setNewsData] = useState<any>(null);

    const db_table_name = 'news';
    const sql_query = '*';

    useEffect(() => {
        if (newsId) {
            const fetchData = async () => {
                try {
                    const { data, error } = await supabase
                        .from(db_table_name)
                        .select(sql_query)
                        .eq('id', newsId);
                    if (error) {
                        throw error;
                    }
                    setNewsData(data[0]);
                } catch (error) {
                    console.error("Error fetching data from Supabase:", error);
                } finally {
                    setLoading(false);
                };
            };
            fetchData()
        };
    }, [newsId]);

    return (
        <article>
            <MetaTagTitle title='보도자료' />
            <PageHeader />
            <PageBanner pageTitle='보도자료' />
            <PageTap tap='community' />
            <section className='page_layout'>
                <div className='notice_detail_page_container'>
                    <ul className='notice_detail_tap_wrapper'>
                        <li className='notice_detail_tap_content'>
                            <i className='icon-calendar'></i>
                            {newsData?.created_at}
                        </li>
                        <li className='notice_detail_tap_content'>
                            /
                        </li>
                        <li className='notice_detail_tap_content'>
                            <i className='icon-user'></i>
                            {newsData?.writer_kr}
                        </li>
                        <li className='notice_detail_tap_content'>
                            /
                        </li>
                        <li>
                            <a
                                href='/news'
                                className='notice_detail_tap_button'>
                                <i className='icon-menu'></i>
                                목록
                            </a>
                        </li>
                    </ul>
                    <h2 className='notice_detail_title'>
                        {newsData?.title_kr}
                    </h2>
                    {/* {newsData?.image.map((item: any, index: number) => */}
                    {(newsData?.image)
                        && <img
                            // key={index}
                            className='news_detail_Image'
                            src={newsData?.image}
                            alt={`보도자료 이미지 ${newsData?.title_kr}`} />}
                    {/* )} */}
                    <p className='notice_detail_content'>
                        {newsData?.content_kr}
                    </p>
                    <a
                        href={newsData?.link}
                        target='_blank'
                        className='news_detail_link_button'>
                        <i className='icon-link'></i>
                        <p className='news_detail_link_button_text'>
                            {newsData?.link}
                        </p>
                    </a>
                </div>
            </section>
        </article>
    )
};