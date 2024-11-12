'use client';

import PageHeader from '@/components/common/PageHeader';
import './style.css';
import '../notice/style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import DropDown from '@/components/common/DropDown';
import { useEffect, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { supabase } from '@/utils/Supabase';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';

export default function News() {

    const [, setLoading] = useRecoilState(isLoading);

    const [dropdownValue, setDropdownValue] = useState<{
        title: string,
        value: string
    }>({
        title: '제목',
        value: 'title_kr'
    });
    const [newsData, setNewsData] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [totalCount, setTotalCount] = useState<any>(0);

    const start = (page - 1) * 10;
    const end = start + 10 - 1;
    const dataCount = totalCount;
    const division = Math.ceil(dataCount / 10);

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
            <MetaTagTitle title='보도자료' />
            <PageHeader />
            <PageBanner pageTitle='보도자료' />
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
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue} />
                        <input
                            className='search_bar'
                            placeholder='검색어를 입력해주세요.'
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
                            전체 {totalCount}건 / {(division) ? division : 0} 페이지
                        </p>
                        <table className='notice_table'>
                            <thead className='notice_table_header_wrapper'>
                                <tr className='notice_table_header'>
                                    <th className='table_header_category_room'>
                                        이미지
                                    </th>
                                    <th className='table_header_title_room'>
                                        제목 & 내용
                                    </th>
                                    <th className='table_header_etc_room'>
                                        작성자
                                    </th>
                                    <th className='table_header_etc_room'>
                                        등록일
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
                                                href={`/news/${item?.id}`}
                                                className='news_table_body_title_room'>
                                                <strong className='news_table_body_title'>
                                                    {item?.title_kr}
                                                </strong>
                                                <p className='news_table_body_title'>
                                                    {item?.content_kr}
                                                </p>
                                            </a>
                                        </td>
                                        <td className='table_body_etc_room'>
                                            {item?.writer_kr}
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