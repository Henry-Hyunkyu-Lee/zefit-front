'use client';

import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import './style.css';

export default function Notice(admData: any) {

    const noticeList = admData.admData;
    const resultData = noticeList?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const textChange = (item: string) => {
        return item.replace(/\\n/g, ' ');
    };

    return (
        <div className='adm_content_container'>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th style={{ minWidth: '100px' }} className='table_header_text'>
                            이미지
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            제목
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            제목(영문)
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용(영문)
                        </th>
                        <th style={{ minWidth: '120px' }} className='table_header_text'>
                            작성자
                        </th>
                        <th style={{ minWidth: '140px' }} className='table_header_text'>
                            작성자(영문)
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
                            className='table_body_lane'>
                            <td style={{ minWidth: '100px' }} className='table_body'>
                                {(item?.image)
                                    ? <img
                                        className='notice_thumbnail_image'
                                        src={item?.image}
                                        alt={item?.title_kr} />
                                    : '없음'}
                            </td>
                            <td className='notice_table_body_content_room'>
                                <span className='notice_table_body_content_room_span'>
                                    {textChange(item?.title_kr)}
                                </span>
                            </td>
                            <td className='notice_table_body_content_room'>
                                <span className='notice_table_body_content_room_span'>
                                    {textChange(item?.title_en)}
                                </span>
                            </td>
                            <td className='notice_table_body_content_room'>
                                <span className='notice_table_body_content_room_span'>
                                    {textChange(item?.content_kr)}
                                </span>
                            </td>
                            <td className='notice_table_body_content_room'>
                                <span className='notice_table_body_content_room_span'>
                                    {textChange(item?.content_en)}
                                </span>
                            </td>
                            <td style={{ minWidth: '120px' }} className='table_body'>
                                {item?.writer_kr}
                            </td>
                            <td style={{ minWidth: '140px' }} className='table_body'>
                                {item?.writer_en}
                            </td>
                            <td style={{ minWidth: '100px' }} className='table_body'>
                                {item?.created_at}
                            </td>
                            <td style={{ minWidth: '100px' }} className='table_body'>
                                <a
                                    href={`/adm/notices/${item?.id}`}
                                    className='table_icon_box'>
                                    <i className='icon-pencil'></i>
                                </a>
                                <button
                                    className='table_icon_box'
                                    onClick={(e) => onClickRemoveHandler(e, admData, item?.id, 'notices')}>
                                    <i className='icon-trash'></i>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};