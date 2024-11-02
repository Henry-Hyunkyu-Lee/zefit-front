'use client';

import PageHeader from '@/components/common/PageHeader';
import '../../../content/zebrafish/style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { useMediaQuery } from 'react-responsive';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

export default function ZebrafishModelEN() {

    const [, setLoading] = useRecoilState(isLoading);

    const isMobile = useMediaQuery({ maxWidth: 1170 });

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <article>
            <MetaTagTitle title='Zebrafish' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Zebrafish' />
            <PageTap tap='business' />
            <div className='page_layout'>
                <section className='model_page_first_container'>
                    <h2 className='page_title'>
                        Model
                    </h2>
                    <div className='model_page_top_info_wrapper'>
                        <h3 className='model_page_top_info_title'>
                            {'Great advantages in securing treatment strategies for each disease'}
                        </h3>
                        <div className='top_info_content_wrapper'>
                            <p className='top_info_content'>
                                {'Zebrafish is drug development strategies that have great advantages in securing a disease treatment strategy. Evolutionarily conserved genes are expected to be essential for sustaining life.'}
                            </p>
                            <p className='top_info_content'>
                                {'Disease research utilizing Zebrafish model has great advantages in identifying disease’s core targets and obtaining proof of concept data for treatment strategies.'}
                            </p>
                        </div>
                    </div>
                </section>
                <section className='model_page_second_container'>
                    <div className='model_intro_wrapper'>
                        <div className='model_intro_box'>
                            <h3 
                                style={{ fontSize: (isMobile) ? '16px' : '26px' }}
                                className='model_intro_title'>
                                Zebrafish pre-clinical data use cases
                            </h3>
                            <p
                                style={{ fontSize: (isMobile) ? '13px' : '18px' }}
                                className='model_intro_content'>
                                Research at individual and organ level become best strategy to address bottlenecks in drug R&D
                                According to the FDA report, global pharmaceutical companies, Novartis and Pfizer are reported using Zebrafish to reduce R&D costs by more than 10 million dollars per year.
                                In addition, FDA IND application were reported as only zebrafish research data in 2019, 2020 and 2021.
                                Zebrafish is emerging as a representative test model that can replace existing experimental animals.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='model_page_third_container'>
                    <div className='model_development_intro_wrapper'>
                        <h3 className='model_development_intro_title'>
                            {'Development of Zebrafish Model Utilization Research'}
                        </h3>
                        <p className='model_development_intro_content'>
                            {'Zebrafish was a model with large variations due to limitations in drug delivery methods, etc. at the early stages of drug research. However, with development of various drug delivery methods recently such as oral administration and intravenous injection, more sophisticated drug research is possible.'}
                        </p>
                    </div>
                </section>
            </div>
        </article>
    )
};