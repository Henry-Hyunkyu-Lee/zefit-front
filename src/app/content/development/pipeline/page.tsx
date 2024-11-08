'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../service/[service]/style.css';
import './style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useRecoilState } from "recoil";
import { isLoading } from "@/modules/loading";

export default function Pipeline() {

    const developmentData = businessNavList[2].list?.map((item: any) => item.id);

    const [, setLoading] = useRecoilState(isLoading);
    const [pipelineData, setPipelineData] = useState<any>(null);
    const [percent, setPercent] = useState<string[]>(['0%', '0%', '0%']);

    useEffect(() => {
        fetch('/api/inquiry/pipeline')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                const targetPercent = jsonData?.graph.target.map((item: any) => item.percent);

                setPipelineData(jsonData);

                setTimeout(() => {
                    setPercent(targetPercent);
                }, 200);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='파이프라인' />
            <PageHeader />
            <PageBanner pageTitle='신약개발' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>
                <section className='pipeline_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        파이프라인
                    </h2>
                    <h3 className='pipeline_page_title'>
                        {pipelineData?.title}
                    </h3>
                </section>
                <section className='pipeline_table_container'>
                    <p className='pipeline_table_label_title'>
                        {pipelineData?.subtitle}
                        &nbsp;
                        <b style={{ fontWeight: '700' }}>
                            {`"${pipelineData?.strongtext}"`}
                        </b>
                    </p>
                    <table className='table_box'>
                        <thead className='table_header'>
                            <tr className='table_header_wrapper'>
                                {pipelineData?.graph.category.map((item: any, index: number) =>
                                    <th
                                        key={index}
                                        style={{ borderRight: (index === 0) ? '1px solid #cfcfcf' : 'none' }}
                                        className='table_header_room'>
                                        {item}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            {pipelineData?.graph.target.map((item: any, index: number) =>
                                <tr
                                    key={index}
                                    className='table_body_lane'>
                                    <th rowSpan={2} className='table_body_room_head'>
                                        {(index === 0)
                                            ? <div className='table_body_room_head_text'>
                                                {item?.id}
                                            </div>
                                            : (index === pipelineData?.graph.target.length - 1) && item?.id}
                                    </th>
                                    <td
                                        style={{
                                            borderBottom: (index === pipelineData?.graph.target.length - 1) ? 'none' : ''
                                        }}
                                        className='table_body_room_sub_head'>
                                        {item?.product}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: (index === pipelineData?.graph.target.length - 1) ? 'none' : ''
                                        }}
                                        className='table_body_room_graph'>
                                        <div className='graph_box'>
                                            <div
                                                style={{ width: percent[index] }}
                                                className='graph' />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </article>
    )
};