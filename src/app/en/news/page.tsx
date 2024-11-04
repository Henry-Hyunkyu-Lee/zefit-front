'use client';

import PageHeader from '@/components/common/PageHeader';
import '../../news/style.css';
import '../../notice/style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import DropDown from '@/components/common/DropDown';
import { useEffect, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { supabase } from '@/utils/Supabase';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';

export default function NewsEN() {

    const [, setLoading] = useRecoilState(isLoading);
    
    const [dropdownValue, setDropdownValue] = useState<{
        title: string,
        value: string
    }>({
        title: 'Title',
        value: 'title_en'
    });
    const [newsData, setNewsData] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [totalCount, setTotalCount] = useState<any>(0);

    const start = (page - 1) * 10;
    const end = start + 10 - 1;
    const dataCount = totalCount;
    const division = Math.ceil(dataCount / 10);

    console.log(dropdownValue.value, search);

    let pageList: number[] = [1];

    for (let i = 2; i <= division; i++) {
        pageList.push(i);
    }

    const onSubmitSearchHandler = (e: any) => {
        e.preventDefault();

        const fetchDataHandler = async () => {
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .ilike(dropdownValue?.value, `%${search}%`)
                    .range(start, end);
                if (error) {
                    throw error;
                }
                setNewsData(data);
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            };
        };

        fetchDataHandler();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .range(start, end);
                if (error) {
                    throw error;
                }
                setNewsData(data);
                console.log(start, end, data)
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        const fetchTotalCount = async () => {
            try {
                const { count, error } = await supabase
                    .from('news')
                    .select('*', { count: 'exact' });
                if (error) {
                    throw error;
                }
                setTotalCount(count);
            } catch (error) {
                console.error("Error fetching total count from Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchTotalCount();
    }, [page]);

    return (
        <article>
            <MetaTagTitle title='News' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='News' />
            <PageTap tap='community' />
            <section className='page_layout'>
                <div className='notice_page_container'>
                    <h2 className='page_title'>
                        News
                    </h2>
                    <form
                        onSubmit={onSubmitSearchHandler}
                        className='notice_page_searh_bar_container'>
                        <DropDown
                            isEnglish={true}
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue} />
                        <input
                            className='search_bar'
                            placeholder='Search Word'
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)} />
                        <button
                            onClick={onSubmitSearchHandler}
                            className='search_button'>
                            <i className='icon-magnifier'></i>
                        </button>
                    </form>
                    <div className='notice_table_wrapper'>
                        <p className='notice_table_count'>
                            Total {totalCount} case / {(division) ? division : 0} page
                        </p>
                        <table className='notice_table'>
                            <thead className='notice_table_header_wrapper'>
                                <tr className='notice_table_header'>
                                    <th className='table_header_category_room'>
                                        Image
                                    </th>
                                    <th className='table_header_title_room'>
                                        Title & Content
                                    </th>
                                    <th className='table_header_etc_room'>
                                        Writer
                                    </th>
                                    <th className='table_header_etc_room'>
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='notice_table_body'>
                                {newsData?.map((item: any, index: number) =>
                                    <tr
                                        key={index}
                                        className='table_body_lane_wrapper'>
                                        <th className='table_header_category_room'>
                                            <img
                                                className='news_page_thumbnail'
                                                src={item?.image}
                                                alt={`보도자료 썸네일 ${index}`} />
                                        </th>
                                        <td className='table_body_special_title_room'>
                                            <a
                                                href={`/en/news/${item?.id}`}
                                                className='news_table_body_title_room'>
                                                <strong className='news_table_body_title'>
                                                    {item?.title_en}
                                                </strong>
                                                <p className='news_table_body_title'>
                                                    {item?.content_en}
                                                </p>
                                            </a>
                                        </td>
                                        <td className='table_body_etc_room'>
                                            {item?.writer_en}
                                        </td>
                                        <td className='table_body_etc_room'>
                                            {item?.created_at}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='page_count_wrapper'>
                            {pageList.map((item: any, index: number) =>
                                <div
                                    key={index}
                                    onClick={() => setPage(item)}
                                    className={
                                        (index + 1 === page)
                                            ? 'present_page'
                                            : 'etc_page'
                                    }>
                                    {item}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
};