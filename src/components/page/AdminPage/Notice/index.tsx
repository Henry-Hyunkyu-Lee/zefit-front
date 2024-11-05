'use client';

import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import './style.css';

export default function Notice(admData: any) {

    const resultData = admData?.admData;

    const textChange = (item: string) => {
        return item.replace(/\\n/g, ' ');
    };

    return (
        <div className='adm_content_container'>
            <ul className='notice_table_wrapper'>
                {resultData?.map((item: any, index: number) =>
                    <li
                        key={index}
                        style={{
                            borderBottom: (index === 0 && (resultData?.length > 1)) ? 'none' : '1px solid #d3d3d3'
                        }}
                        className='notice_table'>
                        {(item?.image)
                            ? <img
                                className='notice_table_thumbnail_image'
                                src={item?.image}
                                alt={item?.id} />
                            : <div className='notice_alternate_image_box'>
                                <i style={{ fontSize: '30px' }} className='icon-picture'></i>
                                <p data-info='No Image' className='reflected-text'>
                                    No Image
                                </p>
                            </div>}
                        <div className='notice_table_content_wrapper'>
                            <div className='notice_table_content_lane_wrapper'>
                                <h2 className='notice_table_title_text'>
                                    {item?.title_kr}
                                </h2>
                                <h2 className='notice_table_title_text'>
                                    {item?.title_en}
                                </h2>
                            </div>
                            <div className='notice_table_content_lane_wrapper'>
                                <p className='notice_table_content_text'>
                                    {item?.content_kr}
                                </p>
                                <p className='notice_table_content_text'>
                                    {item?.content_en}
                                </p>
                            </div>
                            <div className='notice_table_bottom_lane'>
                                {(item?.is_special)
                                    && <span className='notice_table_special_span'>
                                        특별 공지
                                    </span>}
                                <p className='notice_table_writer_date'>
                                    {item?.writer_kr} ({item?.writer_en}) / {item?.created_at}
                                </p>
                            </div>
                        </div>
                        <div className='notice_table_setting_wrapper'>
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
                        </div>
                    </li>
                )}
            </ul>
            {/* <table className='adm_table_container'>
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
                        <th className='small_table_header'>
                            작성자
                        </th>
                        <th className='medium_table_header'>
                            작성자(영문)
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
                    {resultData?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane'>
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
                            <td className='small_table_body'>
                                {item?.writer_kr}
                            </td>
                            <td className='medium_table_body'>
                                {item?.writer_en}
                            </td>
                            <td className='tiny_table_body'>
                                {item?.created_at}
                            </td>
                            <td className='tiny_table_body'>
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
            </table> */}
        </div>
    )
};