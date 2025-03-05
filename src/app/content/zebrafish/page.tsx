'use client';

import PageHeader from '@/components/common/PageHeader';
import './style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

export default function ZebrafishModel() {

    const [, setLoading] = useRecoilState(isLoading);

    useEffect(() => {
        setLoading(false);
    }, []);
    
    return (
        <article>
            <MetaTagTitle title='제브라피쉬' />
            <PageHeader />
            <PageBanner pageTitle='제브라피쉬' />
            <PageTap tap='business' />
            <div className='page_layout'>
                <section className='model_page_first_container'>
                    <h2 className='page_title'>
                        Model
                    </h2>
                    <div className='model_page_top_info_wrapper'>
                        <h3 className='model_page_top_info_title'>
                            {'질병 별 치료전략\n확보에 큰 강점'}
                        </h3>
                        <div className='top_info_content_wrapper'>
                            <p className='top_info_content'>
                                {'제브라피쉬는 질병 치료전략 확보에 큰 강점을 가지는 신약개발 전략입니다.\n진화적으로 잘 보존된 유전자일 수록 생명유지에 필수적인 유전자일 가능성이 높습니다.'}
                            </p>
                            <p className='top_info_content'>
                                {'제브라피쉬 모델에서의 질병연구는 질병 연관 핵심 타겟 규명 및 치료전략\nProof Of Concept 데이터 확보에 큰 강점을 가지고 있습니다.'}
                            </p>
                        </div>
                    </div>
                </section>
                <section className='model_page_second_container'>
                    <div className='model_intro_wrapper'>
                        <div className='model_intro_box'>
                            <h3 className='model_intro_title'>
                                제브라피쉬 도입 사례
                            </h3>
                            <p className='model_intro_content'>
                                개체 및 기관 수준에서의 연구는 치료제 연구개발의 병목구간을 해결하는 최고의 전략이 됩니다. FDA 보고서에 따르면 글로벌 제약회사인 노바티스, 화이자는 제브라피쉬를 활용해 연간 1000억원 이상의 R&D 비용을 절감하는 것으로 보고되었습니다. 또한 2019, 2020년에는 제브라피쉬 단독 연구 데이터로 FDA의 임상계획승인이 보고되어 제브라피쉬는 기존의 실험동물을 대체할 수 있는 대표적인 시험모델로 떠오르고 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='model_page_third_container'>
                    <div className='model_development_intro_wrapper'>
                        <h3 className='model_development_intro_title'>
                            {'제브라피쉬 모델\n활용 연구의 발전'}
                        </h3>
                        <p className='model_development_intro_content'>
                            {'제브라피쉬 모델은 약물연구 도입 초기 약물 전달 방법의 한계 등으로 인한 실험 편차가 큰 모델이였습니다.\n그러나 최근 구강투여, 정맥주사 등 다양한 약물전달 방법이 개발 됨에 따라 더욱 정교한 약물 연구가 가능합니다.'}
                        </p>
                    </div>
                </section>
            </div>
        </article>
    )
};