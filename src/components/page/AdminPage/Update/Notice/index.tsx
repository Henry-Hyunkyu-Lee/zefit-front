'use client';

import { useEffect, useState } from 'react';
import { CorrectProps } from '../History';
import './style.css';
import { supabase } from '@/utils/Supabase';
import { handleImageChange, handleImageDelete } from '@/utils/HandleImage';
import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import { onClickAddHandler, uploadFileAndGetUrl } from '@/utils/AddDataHandler';
import { onClickUpdateHandler } from '@/utils/UpdateDataHandler';
import { useMediaQuery } from 'react-responsive';

export default function CorrectNotice({ admData, isUpload, setIsUpload }: CorrectProps) {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const id = admData?.id;

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [inputImg, setInputImg] = useState<File | null>(null);
    const [noticeInput, setNoticeInput] = useState<any>({
        image: null,
        is_special: false,
        title_kr: '',
        title_en: '',
        content_kr: '',
        content_en: '',
        writer_kr: '(주)제핏',
        writer_en: 'Zefit Inc.'
    });
    const { is_special, title_kr, title_en, content_kr, content_en, writer_kr, writer_en } = noticeInput;

    console.log(admData, isUpload);

    const onChangeInputHandler = (e: any) => {
        const { name, value } = e.target;
        setNoticeInput({
            ...noticeInput,
            [name]: value
        });
    };

    const onClickNoticeAdd = async (e: any) => {
        const isReal = confirm("이대로 추가하시겠습니까?");

        if (isReal) {
            if (inputImg && previewUrl) {
                const imageUrl = await uploadFileAndGetUrl(inputImg);
                if (!imageUrl) return alert('업로드에 실패했습니다.');
                onClickAddHandler(e, { ...noticeInput, image: imageUrl }, 'notices');
            } else {
                onClickAddHandler(e, noticeInput, 'notices');
            };
        };
    };

    const onClickNoticeUpdate = async (e: any) => {
        const isReal = confirm("수정을 완료하시겠습니까?");

        if (isReal) {
            if (admData?.image === previewUrl) {
                onClickUpdateHandler(e, noticeInput, id, 'notices');
            } else {
                if (inputImg && previewUrl) {
                    const imageUrl = await uploadFileAndGetUrl(inputImg);
                    onClickUpdateHandler(e, { ...noticeInput, image: imageUrl }, id, 'notices');
                } else {
                    onClickUpdateHandler(e, noticeInput, id, 'notices');
                }

            };
        }
    };

    useEffect(() => {
        if (admData) {
            setPreviewUrl(isUpload ? null : admData?.image);
            setNoticeInput({
                image: isUpload ? null : admData?.image,
                is_special: isUpload ? false : admData?.is_special,
                title_kr: isUpload ? '' : admData?.title_kr,
                title_en: isUpload ? '' : admData?.title_en,
                content_kr: isUpload ? '' : admData?.content_kr,
                content_en: isUpload ? '' : admData?.content_en,
                writer_kr: isUpload ? '(주)제핏' : admData?.writer_kr,
                writer_en: isUpload ? 'Zefit Inc.' : admData?.writer_en
            });
        }
    }, [admData, isUpload]);

    return (
        <table className='input_table_container'>
            <tbody className='input_table_body'>
                <tr
                    style={{
                        height: (isMobile) ? '120px' : '600px'
                    }}
                    className='input_table_body_lane'>
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
                                        onClick={() => handleImageDelete(setInputImg, setPreviewUrl, setNoticeInput, noticeInput)}
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
                                color: (is_special) ? '#64c5b1' : '#858585',
                                fontWeight: (is_special) ? '700' : '400'
                            }}
                            onClick={() => setNoticeInput({ ...noticeInput, is_special: true })}
                            className='radio_button_wrapper'>
                            <div className='radio_button_select'>
                                {(is_special) && <div className='radio_button_point' />}
                            </div>
                            중요
                        </span>
                        <span
                            style={{
                                color: (!is_special) ? '#64c5b1' : '#858585',
                                fontWeight: (!is_special) ? '700' : '400'
                            }}
                            onClick={() => setNoticeInput({ ...noticeInput, is_special: false })}
                            className='radio_button_wrapper'>
                            <div className='radio_button_select'>
                                {(!is_special) && <div className='radio_button_point' />}
                            </div>
                            일반
                        </span>
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        작성자
                    </th>
                    <td className='input_table_body_room'>
                        <input
                            className='table_input'
                            name='writer_kr'
                            value={writer_kr}
                            autoComplete='off'
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        작성자(영문)
                    </th>
                    <td className='input_table_body_room'>
                        <input
                            className='table_input'
                            name='writer_en'
                            value={writer_en}
                            autoComplete='off'
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr style={{ height: '100px' }} className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        제목
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
                        제목(영문)
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
                <tr className='input_table_body_lane'>
                    <th className='input_table_body_head'>
                        내용
                    </th>
                    <td className='input_table_body_room'>
                        <textarea
                            className='table_textarea'
                            name='content_kr'
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
                            className='table_textarea'
                            name='content_en'
                            value={content_en}
                            onChange={onChangeInputHandler} />
                    </td>
                </tr>
                <tr style={{ width: '100%' }}>
                    <td className='update_button_container'>
                        {(isUpload)
                            ? <button
                                onClick={onClickNoticeAdd}
                                className='update_button'>
                                추가하기
                            </button>
                            : <button
                                onClick={onClickNoticeUpdate}
                                className='update_button'>
                                수정 완료
                            </button>}
                        {(!isUpload)
                            && <button
                                onClick={(e) => onClickRemoveHandler(e, admData, id, 'notices')}
                                className='update_button'>
                                삭제
                            </button>}
                        {(!isUpload)
                            && <a
                                href='/adm/notices/update'
                                className='update_button'>
                                추가하기
                            </a>}
                        <a href='/adm/notices' className='update_button'>
                            전체 목록
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
};
