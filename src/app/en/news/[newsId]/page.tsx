'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../news/[newsId]/style.css';
import '../../../notice/[noticeId]/style.css'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { supabase } from "@/utils/Supabase";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function NewsDetailEN() {

    const { newsId }: any = useParams();

    const [, setLoading] = useRecoilState(isLoading);
    const [newsData, setNewsData] = useState<any>(null);
    console.log("🚀 ~ NewsDetail ~ newsData:", newsData)

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
            <MetaTagTitle title='News' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='News' />
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
                            {newsData?.writer_en}
                        </li>
                        <li className='notice_detail_tap_content'>
                            /
                        </li>
                        <li>
                            <a
                                href='/en/news'
                                className='notice_detail_tap_button'>
                                <i className='icon-menu'></i>
                                List
                            </a>
                        </li>
                    </ul>
                    <h2 className='notice_detail_title'>
                        {newsData?.title_en}
                    </h2>
                    {(newsData?.image)
                        && <img
                            className='news_detail_Image'
                            src={newsData?.image}
                            alt={`보도자료 이미지 ${newsData?.title_en}`} />}
                    <p className='notice_detail_content'>
                        {newsData?.content_en}
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