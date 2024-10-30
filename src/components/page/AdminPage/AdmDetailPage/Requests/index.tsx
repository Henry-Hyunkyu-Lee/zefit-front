'use client';

import { useEffect, useState } from 'react';
import './style.css';
import { supabase } from '@/utils/Supabase';
import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import { onClickAddHandler } from '@/utils/AddDataHandler';
import { onClickUpdateHandler } from '@/utils/UpdateDataHandler';
import { getLastLoginDateTime } from '@/utils/DateTime';

export interface CorrectProps {
    admData: any;
    isUpload?: boolean;
    setIsUpload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RequestsDetail({ admData }: CorrectProps) {

    const id = admData?.id
    const date = admData?.created_at;
    const status = admData?.status;
    const name = admData?.name;
    const company = admData?.company;
    const email = admData?.email;
    const title = admData?.title;
    const content = admData?.content;
    console.log(admData);

    const [isCopy, setIsCopy] = useState<boolean>(false);
    const [isAnswer, setIsAnswer] = useState<boolean>(false);

    const onClickCopyHandler = async (e: any) => {
        if (isCopy) return;
        try {
            await navigator.clipboard.writeText(email);
            setIsCopy(true);
        } catch (error) {
            alert("복사에 실패하였습니다.");
        };
    };

    useEffect(() => {
        if (admData) {
            setIsAnswer(admData?.status);
        };
    }, [admData]);

    const onClickOutHandler = (e: any) => {
        if (isAnswer === status) return;
        onClickUpdateHandler(e, { status: isAnswer }, id, 'inquirys');
    };

    console.log(status, isAnswer);

    return (
        <table className='input_table_container'>
            <tbody className='input_table_body'>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        날짜
                    </th>
                    <td className='input_table_body_room'>
                        {getLastLoginDateTime(date)}
                    </td>
                </tr>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        이름
                    </th>
                    <td className='input_table_body_room'>
                        {name}
                    </td>
                </tr>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        이메일
                    </th>
                    <td className='input_table_body_room'>
                        {email}
                        <button
                            style={{
                                color: (isCopy) ? '#6de290' : '#333333',
                                cursor: (isCopy) ? 'default' : 'pointer'
                            }}
                            onClick={onClickCopyHandler}
                            className='copy_button'>
                            {(isCopy)
                                ? <div className='copy_button_icon'>
                                    ✔
                                </div>
                                : <div className='copy_button_icon'>
                                    <div className='copy_icon_box' />
                                    <div className='copy_icon_box' />
                                </div>}
                            {(isCopy) ? '복사 완료' : '복사'}
                        </button>
                    </td>
                </tr>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        회사명
                    </th>
                    <td className='input_table_body_room'>
                        {company}
                    </td>
                </tr>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        답변 여부
                    </th>
                    <td
                        style={{
                            color: (isAnswer) ? '#333333' : '#919191'
                        }}
                        className='input_table_body_room'>
                        {(isAnswer) ? '답변 완료' : '미답변'}
                        <button
                            onClick={() => setIsAnswer(!isAnswer)}
                            className='answer_button'>
                            {(!isAnswer) ? '답변 완료 처리' : '미답변 처리'}
                        </button>
                    </td>
                </tr>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        제목
                    </th>
                    <td className='input_table_body_room'>
                        {title}
                    </td>
                </tr>
                <tr className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        내용
                    </th>
                    <td className='input_table_body_room'>
                        {content}
                    </td>
                </tr>
                <tr className='update_button_container'>
                    <a
                        href='/adm/inquirys'
                        className='update_button'
                        onClick={onClickOutHandler}>
                        전체 목록
                    </a>
                </tr>
            </tbody>
        </table>
    )
};