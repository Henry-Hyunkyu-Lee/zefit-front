'use client';

import { useState } from 'react';
import './style.css';
import { supabase } from '@/utils/Supabase';
import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import { onClickAddHandler } from '@/utils/AddDataHandler';
import { onClickUpdateHandler } from '@/utils/UpdateDataHandler';
import { useMediaQuery } from 'react-responsive';

export interface CorrectProps {
    admData: any;
    isUpload: boolean;
    setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CorrectHistory({ admData, isUpload, setIsUpload }: CorrectProps) {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const id = admData?.id
    const date = admData?.created_at;
    const contentKR = admData?.content_kr;
    const contentEN = admData?.content_en;

    const [historyInput, setHistoryInput] = useState<any>({
        created_at: isUpload ? '' : date,
        content_kr: isUpload ? '' : contentKR,
        content_en: isUpload ? '' : contentEN
    });
    const { created_at, content_kr, content_en } = historyInput;

    const onChangeInputHandler = (e: any) => {
        const { name, value } = e.target;
        setHistoryInput({
            ...historyInput,
            [name]: value
        });
    };

    return (
        <table className='input_table_container'>
            <tbody className='input_table_body'>
                <tr style={{ height: '80px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        날짜
                    </th>
                    <td className='input_table_body_room'>
                        <input
                            className='table_input'
                            type='text'
                            name='created_at'
                            defaultValue={date}
                            value={created_at}
                            autoComplete='off'
                            placeholder='0000-00-00'
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        내용
                    </th>
                    <td className='input_table_body_room'>
                        <textarea
                            className='table_input'
                            name='content_kr'
                            defaultValue={contentKR}
                            value={content_kr}
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        내용(영문)
                    </th>
                    <td className='input_table_body_room'>
                        <textarea
                            className='table_input'
                            name='content_en'
                            defaultValue={contentEN}
                            value={content_en}
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr className='update_button_container'>
                    {(isUpload)
                        ? <button
                            onClick={(e) => onClickAddHandler(e, historyInput, 'historys')}
                            className='update_button'>
                            추가하기
                        </button>
                        : <button
                            onClick={(e) => onClickUpdateHandler(e, historyInput, id, 'historys')}
                            className='update_button'>
                            수정 완료
                        </button>}
                    {(!isUpload)
                        && <button
                            onClick={(e) => onClickRemoveHandler(e, admData, id, 'historys')}
                            className='update_button'>
                            삭제
                        </button>}
                    {(!isUpload)
                        && <a
                            href='/adm/historys/update'
                            className='update_button'>
                            추가하기
                        </a>}
                    <a href='/adm/historys' className='update_button'>
                        전체 목록
                    </a>
                </tr>
            </tbody>
        </table>
    )
};