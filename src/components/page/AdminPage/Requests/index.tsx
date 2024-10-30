'use client';

import { supabase } from '@/utils/Supabase';
import './style.css';
import { getLastLoginDateTime } from '@/utils/DateTime';
import { useState } from 'react';
import { onClickAllUpdateHandler, onClickListUpdateHandler } from '@/utils/UpdateDataHandler';

export default function Requests(admData: any) {

    const responseData = admData.admData;
    const resultData = responseData?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const [checkList, setCheckList] = useState<number[]>([]);
    const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

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
        if (!resultData) return;

        const idList = resultData?.map((item: any) => item?.id);

        if (checkList.length !== 0) {
            if (checkList.length === resultData?.length) {
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
    console.log(checkList, isAllCheck);

    const onClickAnswerHandler = (e: any) => {
        if (!resultData) return;

        if ((checkList.length === 0) && !isAllCheck) {
            alert('선택하신 문의글이 없습니다.\n선택을 완료 후 눌러주세요.');
        } else {
            if ((checkList.length === resultData?.length) && isAllCheck) {
                onClickAllUpdateHandler(e, { status: true }, 'inquirys');
            } else {
                onClickListUpdateHandler(e, { status: true }, checkList, 'inquirys');
            }
        }
    };

    return (
        <div className='adm_content_container'>
            <div className='requests_answer_wrapper'>
                <button
                    onClick={onClickAllCheckHandler}
                    className='requests_check_button'>
                    <div className='requests_check_box'
                        style={{
                            backgroundColor: ((checkList.length === resultData?.length) && isAllCheck) ? '#234cc7' : 'transparent',
                            border: ((checkList.length === resultData?.length) && isAllCheck) ? 'none' : '1px solid #8c8c8c'
                        }}>
                        {((checkList.length === resultData?.length) && isAllCheck)
                            && '✔'}
                    </div>
                    전체
                </button>
                <button
                    onClick={onClickAnswerHandler}
                    className='list_answer_button'>
                    선택된 문의 답변 완료 처리하기
                </button>
            </div>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th style={{ minWidth: '100px' }} className='table_header_text'>

                        </th>
                        <th style={{ minWidth: '140px' }} className='table_header_text'>
                            회사
                        </th>
                        <th style={{ minWidth: '140px' }} className='table_header_text'>
                            이름
                        </th>
                        <th style={{ minWidth: '180px' }} className='table_header_text'>
                            이메일
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            제목
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용
                        </th>
                        <th style={{ minWidth: '100px' }} className='table_header_text'>
                            날짜
                        </th>
                        <th style={{ minWidth: '100px' }} className='table_header_text'>
                            관리
                        </th>
                    </tr>
                </thead>
                <tbody className='table_body_container'>
                    {resultData?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='notice_table_body_lane'>
                            <td
                                style={{
                                    fontSize: '13px',
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
        </div >
    )
};