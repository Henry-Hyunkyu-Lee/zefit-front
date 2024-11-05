'use client';

import PageHeader from '@/components/common/PageHeader';
import './style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import { useEffect, useRef, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { supabase } from '@/utils/Supabase';
import { useMediaQuery } from 'react-responsive';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';

export default function History() {

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    // const [visibleItems, setVisibleItems] = useState([]);
    // const itemRefs = useRef<HTMLDivElement[]>([]);
    const pointKRRef = useRef<HTMLDivElement[]>([]);
    const lineKRRef = useRef<HTMLDivElement>(null);

    const [, setLoading] = useRecoilState(isLoading);
    const [historyData, setHistoryData] = useState<any[]>([]);

    const date = new Date();
    const year = `${date.getFullYear()}`;

    const transformData = (data: any[]) => {
        // 연도별로 그룹화할 객체
        const result: Record<number, any> = {};

        data.forEach(item => {
            const date = new Date(item.created_at);
            const created_year = date.getFullYear(); // 연도 추출
            const created_month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 (2자리로)

            // 해당 연도의 데이터가 없으면 초기화
            if (!result[created_year]) {
                result[created_year] = {
                    id: item.id, // id 추가
                    created_year: String(created_year),
                    content: {},
                };
            }

            // 해당 연도와 월에 해당하는 content를 추가
            if (!result[created_year].content[created_month]) {
                result[created_year].content[created_month] = {
                    created_month,
                    kr: item.content_kr,
                    en: item.content_en,
                };
            } else {
                result[created_year].content[created_month].kr += '\n\n' + item.content_kr;
                result[created_year].content[created_month].en += '\n\n' + item.content_en;
            }
        });

        // content 객체를 배열로 변환
        Object.keys(result).forEach(year => {
            result[Number(year)].content = Object.values(result[Number(year)].content)
                .sort((a: any, b: any) => parseInt(b.created_month) - parseInt(a.created_month)); // 월 순서로 정렬
        });

        const resultArray = Object.values(result);
        const sortArray = resultArray.sort((a: any, b: any) => b.created_year - a.created_year);

        // 객체를 배열로 변환해서 반환
        return sortArray;
    };

    const transformedData = transformData(historyData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('historys')
                    .select('*');
                if (error) {
                    throw error;
                }
                setHistoryData(data);
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            } finally {
                setLoading(false);
            };
        };

        fetchData()
    }, []);

    useEffect(() => {
        const firstPoint = pointKRRef.current[0]?.getBoundingClientRect();
        const lastPoint = pointKRRef.current[pointKRRef.current.length - 1]?.getBoundingClientRect();

        const top = firstPoint?.top;
        const bottom = lastPoint?.bottom;

        const distance = bottom - top;

        if (pointKRRef.current.length > 0) {
            if (lineKRRef.current) {
                lineKRRef.current.style.top = (isMobile) ? `10px` : `23px`;
                lineKRRef.current.style.height = (isMobile) ? `${distance - 4}px` : `${distance}px`;
            }
        }

        const resizeAction = () => {
            const firstPointM = pointKRRef.current[0]?.getBoundingClientRect();
            const lastPointM = pointKRRef.current[pointKRRef.current.length - 1]?.getBoundingClientRect();

            const top = firstPointM?.top;
            const bottom = lastPointM?.bottom;

            const distance = bottom - top;

            if (pointKRRef.current.length > 0) {
                if (lineKRRef.current) {
                    lineKRRef.current.style.top = (isMobile) ? `10px` : `23px`;
                    lineKRRef.current.style.height = (isMobile) ? `${distance - 4}px` : `${distance}px`;
                }
            }
        };

        window.addEventListener('resize', resizeAction);

        return () => {
            window.removeEventListener('resize', resizeAction);
        };
    }, [historyData, isMobile]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             console.log(entries);
    //             entries.forEach((entry) => {
    //                 const index = parseInt(entry.target.getAttribute('data-index') as string, 10);
    //                 if (entry.isIntersecting) {
    //                     // 화면에 들어온 요소만 추가하기 위해 조건을 확인 후 상태 업데이트
    //                     setVisibleItems((prevVisibleItems: any) => {
    //                         if (!prevVisibleItems.includes(index)) {
    //                             return [...prevVisibleItems, index];
    //                         }
    //                         return prevVisibleItems;
    //                     });
    //                 }
    //             });
    //         },
    //         {
    //             threshold: 0.1, // 요소가 10% 보일 때 애니메이션 시작
    //         }
    //     );

    //     // 각 요소를 observer에 등록
    //     itemRefs.current.forEach((ref: any) => {
    //         if (ref) observer.observe(ref);
    //     });

    //     // 컴포넌트 언마운트 시 옵저버 해제
    //     return () => observer.disconnect();
    // }, []);

    return (
        <article>
            <MetaTagTitle title='연혁' />
            <PageHeader />
            <PageBanner pageTitle='연혁' />
            <PageTap tap='company' />
            <div className='page_layout'>
                <section className='history_page_container'>
                    <div className='history_page_title_container'>
                        <h2 className='page_title'>
                            History
                        </h2>
                        <h3 className='history_page_sub_title'>
                            {'많은 사람들의 건강한 삶으로 행복한 사회를 만들기 위해\n혁신적인 발전을 이루는 노력의 길'}
                        </h3>
                    </div>
                    <ul className='history_wrapper'>
                        <div ref={lineKRRef} className='timeline_connected_line' />
                        {transformedData?.map((item: any, index: number) =>
                            <li
                                key={index}
                                className='timeline_lane_container'>
                                <div
                                    data-index={index}
                                    // ref={(el: HTMLDivElement | null) => {
                                    //     if (el) itemRefs.current[index] = el;
                                    // }}
                                    style={{
                                        // opacity: (visibleItems.includes(String(index))) ? '1' : '0',
                                        fontWeight: (item?.created_year === year) ? '800' : '600'
                                    }}
                                    className='timeline_year'>
                                    {item?.created_year}
                                </div>
                                <div
                                    ref={(el: HTMLDivElement | null) => {
                                        if (el) pointKRRef.current[index] = el;
                                    }}
                                    className='timeline_point'
                                    style={{
                                        backgroundColor: (item?.created_year === year) ? '#00AEEF' : '#ffffff',
                                        // marginLeft: (item?.created_year === year) ? '-3px' : '0px'
                                    }} />
                                <ul className='timeline_month_list'>
                                    {item?.content.map((mon: any, idx: number) =>
                                        <li
                                            key={idx}
                                            className='timeline_month_lane'>
                                            <strong className='timeline_month'>
                                                {mon.created_month}
                                            </strong>
                                            <p className='timeline_month_content'>
                                                {mon.kr}
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </article>
    )
};