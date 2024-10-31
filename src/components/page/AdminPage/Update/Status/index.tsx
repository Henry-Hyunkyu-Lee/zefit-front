'use client';

import { useEffect, useState } from 'react';
import { CorrectProps } from '../History';
import './style.css';
import { supabase } from '@/utils/Supabase';
import { handleImageChange, handleImageDelete } from '@/utils/HandleImage';
import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import { onClickAddHandler, uploadFileAndGetUrl } from '@/utils/AddDataHandler';
import { onClickUpdateHandler } from '@/utils/UpdateDataHandler';

export default function CorrectStatus({ admData, isUpload, setIsUpload }: CorrectProps) {

    const id = admData?.id;

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [inputImg, setInputImg] = useState<File | null>(null);
    const [statusInput, setStatusInput] = useState<any>({
        image: null,
        state: 'partner',
        title_kr: '',
        title_en: ''
    });
    const { state, title_kr, title_en } = statusInput;

    console.log(admData, isUpload);

    const onChangeInputHandler = (e: any) => {
        const { name, value } = e.target;
        setStatusInput({
            ...statusInput,
            [name]: value
        });
    };

    const onClickStatusAdd = async (e: any) => {
        const isReal = confirm("이대로 추가하시겠습니까?");

        if (isReal) {
            if (inputImg && previewUrl) {
                const imageUrl = await uploadFileAndGetUrl(inputImg);
                if (!imageUrl) return alert('업로드에 실패했습니다.');
                onClickAddHandler(e, { ...statusInput, image: imageUrl }, 'partners');
            } else {
                onClickAddHandler(e, statusInput, 'partners');
            };
        };
    };

    const onClickStatusUpdate = async (e: any) => {
        const isReal = confirm("수정을 완료하시겠습니까?");

        if (isReal) {
            if (admData?.image === previewUrl) {
                onClickUpdateHandler(e, statusInput, id, 'partners');
            } else {
                if (inputImg && previewUrl) {
                    const imageUrl = await uploadFileAndGetUrl(inputImg);
                    onClickUpdateHandler(e, { ...statusInput, image: imageUrl }, id, 'partners');
                } else {
                    onClickUpdateHandler(e, statusInput, id, 'partners');
                }

            };
        }
    };

    useEffect(() => {
        if (admData) {
            setPreviewUrl(isUpload ? null : admData?.image);
            setStatusInput({
                image: isUpload ? null : admData?.image,
                state: isUpload ? 'partner' : admData?.state,
                title_kr: isUpload ? '' : admData?.title_kr,
                title_en: isUpload ? '' : admData?.title_en
            });
        }
    }, [admData, isUpload]);

    return (
        <table className='input_table_container'>
            <tbody className='input_table_body'>
                <tr style={{ height: '200px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        이미지
                    </th>
                    <td className='input_table_body_room'>
                        <div className="image_container">
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                id='files'
                                name='inputImg'
                                onChange={(e) => handleImageChange(e, setInputImg, setPreviewUrl)} />
                            {(previewUrl)
                                ? <div className="image_preview_overlay">
                                    <button
                                        onClick={() => handleImageDelete(setInputImg, setPreviewUrl, setStatusInput, statusInput)}
                                        className='image_delete_button'>
                                        <i className='icon-close' />
                                    </button>
                                    <img src={previewUrl} alt="Preview" className="image_preview" />
                                </div>
                                : <label htmlFor='files' className='image_input'>
                                    <i className='icon-picture' />
                                    <div className='image_input_button'>
                                        이미지 업로드
                                    </div>
                                </label>}
                        </div>
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        분류
                    </th>
                    <td className='input_table_body_room'>
                        <span
                            style={{
                                color: (state === 'partner') ? '#64c5b1' : '#858585',
                                fontWeight: (state === 'partner') ? '700' : '400'
                            }}
                            onClick={() => setStatusInput({ ...statusInput, state: 'partner' })}
                            className='radio_button_wrapper'>
                            <div className='radio_button_select'>
                                {state === 'partner' && <div className='radio_button_point' />}
                            </div>
                            파트너
                        </span>
                        <span
                            style={{
                                color: (state === 'certification') ? '#64c5b1' : '#858585',
                                fontWeight: (state === 'certification') ? '700' : '400'
                            }}
                            onClick={() => setStatusInput({ ...statusInput, state: 'certification' })}
                            className='radio_button_wrapper'>
                            <div className='radio_button_select'>
                                {state === 'certification' && <div className='radio_button_point' />}
                            </div>
                            인증
                        </span>
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        이름
                    </th>
                    <td className='input_table_body_room'>
                        <input
                            className='table_input'
                            name='title_kr'
                            value={title_kr}
                            autoComplete='off'
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        이름(영문)
                    </th>
                    <td className='input_table_body_room'>
                        <input
                            className='table_input'
                            name='title_en'
                            value={title_en}
                            autoComplete='off'
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr style={{ width: '100%' }}>
                    <td className='update_button_container'>
                        {(isUpload)
                            ? <button
                                onClick={onClickStatusAdd}
                                className='update_button'>
                                추가하기
                            </button>
                            : <button
                                onClick={onClickStatusUpdate}
                                className='update_button'>
                                수정 완료
                            </button>}
                        {(!isUpload)
                            && <button
                                onClick={(e) => onClickRemoveHandler(e, admData, id, 'partners')}
                                className='update_button'>
                                삭제
                            </button>}
                        {(!isUpload)
                            && <a
                                href='/adm/partners/update'
                                className='update_button'>
                                추가하기
                            </a>}
                        <a href='/adm/partners' className='update_button'>
                            전체 목록
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
};