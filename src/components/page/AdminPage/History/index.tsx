'use client';

import './style.css';
import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';

export default function History(admData: any) {

    const resultData = admData.admData;

    return (
        <div className='adm_content_container'>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th className='small_table_header'>
                            년도
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용(영문)
                        </th>
                        <th className='small_table_header'>
                            날짜
                        </th>
                        <th className='small_table_header'>
                            관리
                        </th>
                    </tr>
                </thead>
                <tbody className='table_body_container'>
                    {resultData?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane'>
                            <td className='small_table_body'>
                                {item?.created_at.slice(0, 4)}년
                            </td>
                            <td className='table_body_content_room'>
                                <span className='table_body_content_room_span'>
                                    {item?.content_kr}
                                </span>
                            </td>
                            <td className='table_body_content_room'>
                                <span className='table_body_content_room_span'>
                                    {item?.content_en}
                                </span>
                            </td>
                            <td className='small_table_body'>
                                {item?.created_at}
                            </td>
                            <td className='small_table_body'>
                                <a
                                    href={`/adm/historys/${item?.id}`}
                                    className='table_icon_box'>
                                    <i className='icon-pencil'></i>
                                </a>
                                <button
                                    onClick={(e) => onClickRemoveHandler(e, admData, item?.id, 'historys')}
                                    className='table_icon_box'>
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