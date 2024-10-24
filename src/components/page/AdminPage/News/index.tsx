'use client';

import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import '../Notice/style.css';
import './style.css';

export default function News(admData: any) {

    const newsList = admData?.admData;

    const textChange = (item: string) => {
        return item.replace(/\\n/g, ' ');
    };

    return (
        <div className='adm_content_container'>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th className='tiny_table_header'>
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
                        <th className='tiny_table_header'>
                            날짜
                        </th>
                        <th className='small_table_header'>
                            작성자
                        </th>
                        <th className='medium_table_header'>
                            작성자(영문)
                        </th>
                        <th className='tiny_table_header'>
                            관리
                        </th>
                    </tr>
                </thead>
                <tbody className='table_body_container'>
                    {newsList?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='notice_table_body_lane'>
                            <td className='tiny_table_body'>
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
                            <td className='tiny_table_body'>
                                {item?.created_at}
                            </td>
                            <td className='small_table_body'>
                                {item?.writer_kr}
                            </td>
                            <td className='medium_table_body'>
                                {item?.writer_en}
                            </td>
                            <td className='tiny_table_body'>
                                <a
                                    href={`/adm/news/${item?.id}`}
                                    className='table_icon_box'>
                                    <i className='icon-pencil'></i>
                                </a>
                                <button
                                    className='table_icon_box'
                                    onClick={(e) => onClickRemoveHandler(e, admData, item?.id, 'news')}>
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