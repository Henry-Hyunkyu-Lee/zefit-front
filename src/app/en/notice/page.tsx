'use client';

import PageHeader from '@/components/common/PageHeader';
import '../../notice/style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import DropDown from '@/components/common/DropDown';
import { useEffect, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { supabase } from '@/utils/Supabase';

export default function NoticeEN() {

    const [dropdownValue, setDropdownValue] = useState<{
        title: string,
        value: string
    }>({
        title: 'Title',
        value: 'title_en'
    });
    const [noticeData, setNoticeData] = useState<any>(null);
    const [specialNotice, setSpecialNotice] = useState<any>(null);
    const [searchNotice, setSearchNotice] = useState<any>(null);
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
                    .from('notices')
                    .select('*')
                    .ilike(dropdownValue?.value, `%${search}%`)
                    .range(start, end);
                if (error) {
                    throw error;
                }
                setSearchNotice(data);
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            };
        };

        fetchDataHandler();
    };

    const mapDataReturn = () => {
        if (searchNotice) {
            return (
                <tbody className='notice_table_body'>
                    {searchNotice?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane_wrapper'>
                            <th className='table_header_category_room'>
                                {index + 1}
                            </th>
                            <td className='table_body_special_title_room'>
                                <a
                                    href={`/en/notice/${item?.id}`}
                                    className='table_body_title_room'>
                                    {item?.title_en}
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
            )
        } else {
            return (
                <tbody className='notice_table_body'>
                    {specialNotice?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane_wrapper'>
                            <th className='table_header_category_room'>
                                <div className='special_notice'>
                                    Notice
                                </div>
                            </th>
                            <td className='table_body_special_title_room'>
                                <a
                                    href={`/en/notice/${item?.id}`}
                                    className='special_link_title_room'>
                                    {item?.title_en}
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
                    {noticeData?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane_wrapper'>
                            <th className='table_header_category_room'>
                                {index + 1}
                            </th>
                            <td className='table_body_special_title_room'>
                                <a
                                    href={`/en/notice/${item?.id}`}
                                    className='table_body_title_room'>
                                    {item?.title_en}
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
            )
        }
    };

    useEffect(() => {
        const specialData = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .eq('is_special', true);
                if (error) {
                    throw error;
                }
                setSpecialNotice(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .eq('is_special', false)
                    .range(start, end);
                if (error) {
                    throw error;
                }
                setNoticeData(data);
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        const fetchTotalCount = async () => {
            try {
                const { count, error } = await supabase
                    .from('notices')
                    .select('*', { count: 'exact' });
                if (error) {
                    throw error;
                }
                setTotalCount(count);
            } catch (error) {
                console.error("Error fetching total count from Supabase:", error);
            }
        };

        specialData();
        fetchData();
        fetchTotalCount();
    }, []);

    return (
        <article>
            <MetaTagTitle title='Notice' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Notice' />
            <PageTap tap='community' />
            <section className='page_layout'>
                <div className='notice_page_container'>
                    <h2 className='page_title'>
                        Notice
                    </h2>
                    <form className='notice_page_searh_bar_container'>
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
                                        Category
                                    </th>
                                    <th className='table_header_title_room'>
                                        Title
                                    </th>
                                    <th className='table_header_etc_room'>
                                        Writer
                                    </th>
                                    <th className='table_header_etc_room'>
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            {mapDataReturn()}
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