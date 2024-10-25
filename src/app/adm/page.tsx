'use client';

import AdmHeader from '@/components/common/AdmHeader';
import './style.css';
import MetaTagTitle from '@/utils/MetaTagTitle';
import AdmScrollTop from '@/components/page/AdminPage/AdmScrollTop';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/Supabase';

export default function Admin() {

    const router = useRouter();

    const [resultData, setResultData] = useState<any>();

    console.log(resultData);

    const dataTitleList = [
        { id: '문의한 글', href: '/adm/inquirys' },
        { id: '연혁', href: '/adm/historys' },
        { id: '인증 및 파트너 현황', href: '/adm/partners' },
        { id: '공지사항', href: '/adm/notices' },
        { id: '보도자료', href: '/adm/news' }
    ];

    const dataChange = (item: any, index: number) => {
        if (index === 1) {
            return {
                step_1: '내용',
                step_2: '내용(영문)',
                answer_1: item?.content_kr,
                answer_2: item?.content_en
            };
        } else if (index === 2) {
            return {
                step_1: '제목',
                step_2: '제목(영문)',
                answer_1: item?.title_kr,
                answer_2: item?.title_en
            };
        } else if (index === 0) {
            return {
                step_1: '회사',
                step_2: '제목',
                answer_1: item?.company,
                answer_2: item?.title
            };
        } else {
            return {
                step_1: '제목',
                step_2: '내용',
                answer_1: item?.title_kr,
                answer_2: item?.content_kr
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let admList = [];
            try {
                const [inquirys, historys, partners, notices, news] = await Promise.all([
                    supabase.from('inquirys').select('*').order('created_at', { ascending: true }).range(0, 2),
                    supabase.from('historys').select('*').order('created_at', { ascending: true }).range(0, 2),
                    supabase.from('partners').select('*').order('created_at', { ascending: true }).range(0, 2),
                    supabase.from('notices').select('*').order('created_at', { ascending: true }).range(0, 2),
                    supabase.from('news').select('*').order('created_at', { ascending: true }).range(0, 2)
                ])
                if (historys.error) {
                    throw historys.error;
                }
                admList.push(inquirys.data);
                admList.push(historys.data);
                admList.push(partners.data);
                admList.push(notices.data);
                admList.push(news.data);

                setResultData(admList);
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            };
        };
        fetchData()
    }, []);

    // 쿠키에서 lastLogin 값을 추출하는 함수
    const getLastLoginFromCookie = () => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'lastLogin') {
                return value;
            }
        }
        return null;
    };

    // lastLogin 값 확인
    const lastLogin = getLastLoginFromCookie();

    const getLastLoginDateTime = (paramData: any) => {
        if (paramData) {
            const loginDate = new Date(paramData); // ISO 문자열을 Date 객체로 변환
            const year = loginDate.getFullYear();
            const month = loginDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
            const day = loginDate.getDate();
            const hours = loginDate.getHours();
            const minutes = loginDate.getMinutes();
            const seconds = loginDate.getSeconds();

            const timeObj = { year, month, day, hours, minutes, seconds };

            return `${timeObj.year}-${timeObj.month}-${timeObj.day}  ${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
        } else {
            return null;
        }
    };

    // 날짜와 시간 출력
    const lastLoginDateTime = getLastLoginDateTime(lastLogin);

    if (!lastLogin) {
        // lastLogin 값이 없으면 로그인 페이지로 이동
        alert('로그인이 필요합니다.');
        router.push('/login');
    } else {
        // lastLogin 값이 있으면 시간 확인
        const lastLoginDate = new Date(lastLogin);
        const now = new Date();
        const timeDiff = now.getTime() - lastLoginDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        if (dayDiff > 1) {
            // 하루가 지났으면 로그인 페이지로 이동
            alert('로그인 시간이 만료되었습니다.\n로그인 페이지로 이동합니다.')
            router.push('/login');
        } else {
            return (
                <article className='adm_layout'>
                    <MetaTagTitle title='관리자모드' />
                    <AdmHeader title='관리자메인' />
                    <section className='adm_content_wrapper'>
                        <ul className='adm_content_box'>
                            <li style={{ width: '100%' }}>
                                <table className='adm_table_container'>
                                    <thead className='adm_table_header_container'>
                                        <tr className='adm_table_header_box'>
                                            <th className='small_table_header'>
                                                회원아이디
                                            </th>
                                            <th className='small_table_header'>
                                                등급
                                            </th>
                                            <th style={{ width: '100%' }} className='table_header_text'>
                                                로그인 일시
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='table_body_container'>
                                        <tr className='table_body_lane'>
                                            <td style={{ color: '#64c5b1' }} className='small_table_body'>
                                                cloudtree
                                            </td>
                                            <td className='small_table_body'>
                                                <img
                                                    className='manager_icon'
                                                    src='http://www.zefit.co.kr/theme/basic/img/no_profile.gif'
                                                    alt='관리자' />
                                                관리자
                                            </td>
                                            <td className='table_body_content_room'>
                                                <span className='table_body_content_room_span'>
                                                    {lastLoginDateTime}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                        {resultData?.map((item: any, index: number) =>
                            <ul
                                key={index}
                                className='adm_content_box'>
                                <label className='adm_content_part_title'>
                                    * {dataTitleList[index].id}
                                </label>
                                <li style={{ width: '100%' }}>
                                    <table className='adm_table_container'>
                                        <thead className='adm_table_header_container'>
                                            <tr className='adm_table_header_box'>
                                                <th className='small_table_header'>
                                                    {(index === 0) ? '이름' : '닉네임'}
                                                </th>
                                                <th style={{ width: '100%' }} className='table_header_text'>
                                                    {dataChange(item, index).step_1}
                                                </th>
                                                <th style={{ width: '100%' }} className='table_header_text'>
                                                    {dataChange(item, index).step_2}
                                                </th>
                                                <th className='medium_table_header'>
                                                    날짜
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='table_body_container'>
                                            {item?.map((data: any, idx: number) =>
                                                <tr
                                                    key={idx}
                                                    className='table_body_lane'>
                                                    <td
                                                        style={{
                                                            color: (index === 0) ? '#333333' : '#64c5b1'
                                                        }}
                                                        className='small_table_body'>
                                                        {(index === 0) ? data?.name : 'cloudtree'}
                                                    </td>
                                                    <td className='table_body_content_room'>
                                                        <span className='table_body_content_room_span'>
                                                            {dataChange(data, index).answer_1}
                                                        </span>
                                                    </td>
                                                    <td className='table_body_content_room'>
                                                        <span className='table_body_content_room_span'>
                                                            {dataChange(data, index).answer_2}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            fontSize: (index === 0) ? '13px' : '14px'
                                                        }}
                                                        className='medium_table_body'>
                                                        {(index === 0)
                                                            ? getLastLoginDateTime(data?.created_at)
                                                            : data?.created_at.slice(0, 10)}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </li>
                                <a
                                    href={dataTitleList[index].href}
                                    className='full_view_link_button'>
                                    {dataTitleList[index].id} 전체 보기
                                </a>
                            </ul>
                        )}
                    </section>
                    <AdmScrollTop />
                </article>
            )
        }
    }
};