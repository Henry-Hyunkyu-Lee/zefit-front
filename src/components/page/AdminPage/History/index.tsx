'use client';

import { supabase } from '@/utils/Supabase';
import './style.css';

export default function History(admData: any) {

    const resultdata = admData.admData?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    console.log(resultdata);

    const onClickRemoveHandler = (e: any, id: string) => {
        e.preventDefault();

        const fetchRemove = async () => {
            try {
                const { error } = await supabase
                    .from('historys')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                window.location.pathname = '/adm/historys';
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        fetchRemove();
    };

    return (
        <div className='adm_content_container'>
            <table className='adm_table_container'>
                <thead className='adm_table_header_container'>
                    <tr className='adm_table_header_box'>
                        <th style={{ minWidth: '120px' }} className='table_header_text'>
                            년도
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용
                        </th>
                        <th style={{ width: '100%' }} className='table_header_text'>
                            내용(영문)
                        </th>
                        <th style={{ minWidth: '120px' }} className='table_header_text'>
                            날짜
                        </th>
                        <th style={{ minWidth: '120px' }} className='table_header_text'>
                            관리
                        </th>
                    </tr>
                </thead>
                <tbody className='table_body_container'>
                    {resultdata?.map((item: any, index: number) =>
                        <tr
                            key={index}
                            className='table_body_lane'>
                            <td style={{ minWidth: '120px' }} className='table_body'>
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
                            <td style={{ minWidth: '120px' }} className='table_body'>
                                {item?.created_at}
                            </td>
                            <td style={{ minWidth: '120px' }} className='table_body'>
                                <a
                                    href={`/adm/historys/${item?.id}`}
                                    className='table_icon_box'>
                                    <i className='icon-pencil'></i>
                                </a>
                                <button
                                    onClick={(e) => onClickRemoveHandler(e, item?.id)}
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