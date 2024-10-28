'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
import '../../../../content/development/pipeline/style.css';
import { useEffect, useRef, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";

export default function PipelineEN() {

    const developmentData = businessNavList[2].list?.map((item: any) => item.en);

    const [pipelineData, setPipelineData] = useState<any>(null);
    const [percent, setPercent] = useState<string[]>(['0%', '0%', '0%']);
    console.log("🚀 ~ Pipeline ~ percent:", percent)
    console.log("🚀 ~ Pipeline ~ pipelineData:", pipelineData)

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

                setTimeout(() => {setPercent(targetPercent);}, 200);
                // setPercent(targetPercent);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    return (
        <article>
            <MetaTagTitle title='Pipeline' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='pharmaceuticals' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='development' />
            <div className='page_layout'>
                <section className='pipeline_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        Pipeline
                    </h2>
                    <h3 className='pipeline_page_title'>
                        {pipelineData?.title_en}
                    </h3>
                </section>
                <section className='pipeline_table_container'>
                    <p className='pipeline_table_label_title'>
                        <b style={{ fontWeight: '700' }}>
                            {`"${pipelineData?.strongtext_en}"`}
                        </b>
                        <br />
                        {pipelineData?.subtitle_en} 
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