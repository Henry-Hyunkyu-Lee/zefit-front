'use client';

import MetaTagTitle from '@/utils/MetaTagTitle';
import './style.css';
import '../../adm/style.css';
import '@/components/page/AdminPage/History/style.css';
import '@/components/page/AdminPage/Notice/style.css';
import '../[content]/style.css';
import AdmHeader from '@/components/common/AdmHeader';
import AdmScrollTop from '@/components/page/AdminPage/AdmScrollTop';
import { onClickListUpdateHandler } from '@/utils/UpdateDataHandler';
import { useEffect, useState } from 'react';
import { getLastLoginDateTime } from '@/utils/DateTime';
import { supabase } from '@/utils/Supabase';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

export default function RequestsAdmin() {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const [, setLoading] = useRecoilState(isLoading);

    const [requestsData, setRequestsData] = useState<any>(null);
    const [totalCount, setTotalCount] = useState<any>(0);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [checkList, setCheckList] = useState<number[]>([]);
    const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

    const start = (page - 1) * 10;
    const end = start + 10 - 1;

    const dataCount = totalCount;
    const division = Math.ceil(dataCount / 10);
    const startPage = (pageCount - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, division);

    let pageList: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    };

    const onClickPageHandler = (item: number) => {
        if (page === item) return;
        setPage(item);
    };

    const onClickCheckHandler = (item: number) => {
        if (checkList.includes(item)) {
            const exception = checkList.filter((num: number) => num !== item);
            setCheckList(exception);
        } else {
            const additional = [...checkList, item];
            setCheckList(additional);
        }
    };

    const onClickAllCheckHandler = () => {
        if (!requestsData) return;

        const idList = requestsData?.map((item: any) => item?.id);

        if (checkList.length !== 0) {
            if (checkList.length === requestsData?.length) {
                setCheckList([]);
                setIsAllCheck(false);
            } else {
                setCheckList(idList);
                setIsAllCheck(true);
            }
        } else {
            setCheckList(idList);
            setIsAllCheck(true);
        }
    };

    const onClickAnswerHandler = (e: any) => {
        if (!requestsData) return;

        if (checkList.length === 0) {
            alert('선택하신 문의글이 없습니다.\n선택을 완료 후 눌러주세요.');
        } else {
            onClickListUpdateHandler(e, { status: true }, checkList, 'inquirys');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inquirys, total] = await Promise.all([
                    supabase.from('inquirys').select('*').order('created_at', { ascending: false }).range(start, end),
                    supabase.from('inquirys').select('*', { count: 'exact' })
                ]);
                if (inquirys.error) {
                    throw inquirys.error;
                }
                setRequestsData(inquirys.data);
                setTotalCount(total.count);
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            } finally {
                setLoading(false);
            };
        };

        fetchData();
    }, [page]);

    return (
        <article className='adm_layout'>
            <MetaTagTitle title={`관리자모드: 문의한 글`} />
            <AdmHeader title='문의한 글' />
            <section className='adm_content_wrapper'>
                <div className='adm_content_container'>
                    <div className='requests_answer_wrapper'>
                        <button
                            onClick={onClickAllCheckHandler}
                            className='requests_check_button'>
                            <div className='requests_check_box'
                                style={{
                                    backgroundColor: (checkList.length === requestsData?.length) ? '#234cc7' : 'transparent',
                                    border: (checkList.length === requestsData?.length) ? 'none' : '1px solid #8c8c8c'
                                }}>
                                {(checkList.length === requestsData?.length)
                                    && '✔'}
                            </div>
                            전체 선택
                        </button>
                        <label className='requests_total_count_text'>
                            전체&nbsp;
                            <b className='requests_check_button_highlight'>
                                {totalCount}
                            </b> 건의 메세지 / {page} 페이지
                        </label>
                        {(checkList.length === 0)
                            ? <button
                                className='list_answer_button_default'>
                                답변 완료
                            </button>
                            : <button
                                onClick={onClickAnswerHandler}
                                className='list_answer_button'>
                                답변 완료 {checkList.length}
                            </button>}
                    </div>
                    <table className='adm_table_container'>
                        <thead className='adm_table_header_container'>
                            <tr className='adm_table_header_box'>
                                <th className='tiny_table_header'>

                                </th>
                                <th className='medium_table_header'>
                                    회사
                                </th>
                                <th className='medium_table_header'>
                                    이름
                                </th>
                                <th className='large_table_header'>
                                    이메일
                                </th>
                                <th style={{ width: '100%' }} className='table_header_text'>
                                    제목
                                </th>
                                <th style={{ width: '100%' }} className='table_header_text'>
                                    내용
                                </th>
                                <th className='tiny_table_header'>
                                    날짜
                                </th>
                                <th className='tiny_table_header'>
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table_body_container'>
                            {requestsData?.map((item: any, index: number) =>
                                <tr
                                    key={index}
                                    className='notice_table_body_lane'>
                                    <td
                                        style={{
                                            fontSize: (isMobile) ? '7px' : '13px',
                                            fontWeight: '700',
                                            color: (item?.status) ? '#17bf49' : '#b61919'
                                        }}
                                        className='tiny_table_body'>
                                        <button
                                            onClick={() => onClickCheckHandler(item?.id)}
                                            className='requests_check_box'
                                            style={{
                                                backgroundColor: (checkList.includes(item?.id)) ? '#234cc7' : 'transparent',
                                                border: (checkList.includes(item?.id)) ? 'none' : '1px solid #8c8c8c'
                                            }}>
                                            {(checkList.includes(item?.id))
                                                && '✔'}
                                        </button>
                                        {(item?.status) ? '답변완료' : '미답변'}
                                    </td>
                                    <td className='medium_table_body'>
                                        {item?.company}
                                    </td>
                                    <td className='medium_table_body'>
                                        {item?.name}
                                    </td>
                                    <td className='large_table_body'>
                                        {item?.email}
                                    </td>
                                    <td className='notice_table_body_content_room'>
                                        <span className='notice_table_body_content_room_span'>
                                            {item?.title}
                                        </span>
                                    </td>
                                    <td className='notice_table_body_content_room'>
                                        <span className='notice_table_body_content_room_span'>
                                            {item?.content}
                                        </span>
                                    </td>
                                    <td className='tiny_table_body'>
                                        {getLastLoginDateTime(item?.created_at)}
                                    </td>
                                    <td className='tiny_table_body'>
                                        <a
                                            href={`/adm/inquirys/${item?.id}`}
                                            className='table_icon_box'>
                                            <i className='icon-eye'></i>
                                        </a>
                                        <button className='table_icon_box'>
                                            <i className='icon-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='requests_page_number_wrapper'>
                        {(pageCount > 1)
                            && <button
                                onClick={() => setPageCount(prev => prev - 1)}
                                className='default_page_number'>
                                <i className='icon-arrow-left'></i>
                            </button>}
                        {pageList?.map((item: number, index: number) =>
                            <button
                                onClick={() => onClickPageHandler(item)}
                                key={index}
                                className={(item === page) ? 'present_page_number' : 'default_page_number'}>
                                {item}
                            </button>
                        )}
                        {(pageList?.length >= 5)
                            && <button
                                onClick={() => setPageCount(prev => prev + 1)}
                                className='default_page_number'>
                                <i className='icon-arrow-right'></i>
                            </button>}
                    </div>
                </div >
            </section>
            <AdmScrollTop />
        </article>
    )
};