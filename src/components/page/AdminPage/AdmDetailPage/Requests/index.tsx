'use client';

import { useState } from 'react';
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
                        동의 여부
                    </th>
                    <td
                        style={{
                            color: (status) ? '#333333' : '#919191'
                        }}
                        className='input_table_body_room'>
                        {(status) ? '동의' : '미동의'}
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
                    <a href='/adm/inquirys' className='update_button'>
                        전체 목록
                    </a>
                </tr>
            </tbody>
        </table>
    )
};