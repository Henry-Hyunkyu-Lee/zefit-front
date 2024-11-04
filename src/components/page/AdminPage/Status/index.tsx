'use client';

import { onClickRemoveHandler } from '@/utils/RemoveDataHandler';
import '../History/style.css';
import './style.css';

export default function Status(admData: any) {

    const resultData = admData?.admData;
    const stateObj: { [key: string]: string } = {
        partner: '파트너',
        certification: '인증'
    }

    console.log(admData);

    return (
        <div className='adm_content_container'>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th className='large_table_header'>
                            이미지
                        </th>
                        <th className='small_table_header'>
                            분류
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            이름
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            이름(영문)
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
                            className='partner_table_body_line'>
                            <td className='large_table_body'>
                                <img
                                    className='partner_table_image'
                                    src={item?.image}
                                    alt={item?.title_kr} />
                            </td>
                            <td className='small_table_body'>
                                {stateObj[item?.state]}
                            </td>
                            <td style={{ width: '100%' }} className='table_body_content_room'>
                                {item?.title_kr}
                            </td>
                            <td style={{ width: '100%' }} className='table_body_content_room'>
                                {item?.title_en}
                            </td>
                            <td className='small_table_body'>
                                {item?.created_at.slice(0,10)}
                            </td>
                            <td className='small_table_body'>
                                <a
                                    href={`/adm/partners/${item?.id}`}
                                    className='table_icon_box'>
                                    <i className='icon-pencil'></i>
                                </a>
                                <button
                                    className='table_icon_box'
                                    onClick={(e) => onClickRemoveHandler(e, admData, item?.id, 'partners')}>
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