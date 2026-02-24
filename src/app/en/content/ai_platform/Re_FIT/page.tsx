'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
import '../../../../content/ai_platform/Re_FIT/style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function ReFITEN() {

    const developmentData = businessNavList[2].list?.map((item: any) => item.en);

    const [, setLoading] = useRecoilState(isLoading);
    const [refitSections, setRefitSections] = useState<any[]>([]);
    const refitSection = refitSections[0];
    const pipelineSection = refitSections.find((section: any) => section?.section_type === 'refit_pipeline');
    const featuresSection = refitSections.find((section: any) => section?.section_type === 'refit_features');
    const weeksSection = refitSections.find((section: any) => section?.section_type === 'refit_weeks');
    const ctaSection = refitSections.find((section: any) => section?.section_type === 'cta');

    const renderTitle = (title?: string, emphasis?: string) => {
        if (!title || !emphasis || !title.includes(emphasis)) return title;
        const [before, after] = title.split(emphasis);
        return (
            <>
                {before}
                <span className='refit_intro_title_em'>{emphasis}</span>
                {after}
            </>
        );
    };

    const renderBarIcon = (icon: string, title: string) => {
        const iconMap: Record<string, JSX.Element> = {
            puzzle: (
                <svg
                    className='refit_bar_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z' />
                </svg>
            ),
            'file-chart-column': (
                <svg
                    className='refit_bar_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z' />
                    <path d='M14 2v5a1 1 0 0 0 1 1h5' />
                    <path d='M8 18v-1' />
                    <path d='M12 18v-6' />
                    <path d='M16 18v-3' />
                </svg>
            ),
            'truck-electric': (
                <svg
                    className='refit_bar_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M14 19V7a2 2 0 0 0-2-2H9' />
                    <path d='M15 19H9' />
                    <path d='M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14' />
                    <path d='M2 13v5a1 1 0 0 0 1 1h2' />
                    <path d='M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02' />
                    <circle cx='17' cy='19' r='2' />
                    <circle cx='7' cy='19' r='2' />
                </svg>
            ),
        };

        return iconMap[icon] || (
            <img
                src={icon}
                alt={title}
                className='refit_bar_icon'
            />
        );
    };

    const renderFeatureIcon = (icon: string, title: string) => {
        const iconMap: Record<string, JSX.Element> = {
            blocks: (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2' />
                    <rect x='14' y='2' width='8' height='8' rx='1' />
                </svg>
            ),
            clock: (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <circle cx='12' cy='12' r='9' />
                    <path d='M12 7v5l3 3' />
                </svg>
            ),
            'flask-conical': (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M10 2v5l-5 8a4 4 0 0 0 3.4 6h7.2a4 4 0 0 0 3.4-6l-5-8V2' />
                    <path d='M7 16h10' />
                </svg>
            ),
            'shield-check': (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
                    <path d='m9 12 2 2 4-4' />
                </svg>
            ),
            'chart-column': (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M3 3v16a2 2 0 0 0 2 2h16' />
                    <path d='M18 17V9' />
                    <path d='M13 17V5' />
                    <path d='M8 17v-3' />
                </svg>
            ),
            'clipboard-pen': (
                <svg
                    className='refit_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <rect width='8' height='4' x='8' y='2' rx='1' />
                    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5' />
                    <path d='M4 13.5V6a2 2 0 0 1 2-2h2' />
                    <path d='M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z' />
                </svg>
            ),
        };

        return iconMap[icon] || (
            <img
                src={icon}
                alt={title}
                className='refit_features_icon'
            />
        );
    };

    useEffect(() => {
        fetch('/data/ai_platform.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setRefitSections(jsonData?.Re_FIT?.sections || []);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article className='lang-en'>
            <MetaTagTitle title='Re:FIT' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='AI Platform' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='ai_platform' />
            <div className='page_layout'>
                {refitSection && refitSection?.section_type === 'refit_all' && (
                    <section className='refit_content_section refit_simple_section refit_main_profit_style'>
                        <div className='refit_simple_inner'>
                            <div className='refit_text_box'>
                                <span className='refit_section_kicker'>Re:FIT AI</span>
                                <h3 className='refit_intro_title'>
                                    {renderTitle(refitSection.title_en, refitSection.title_em_en)}
                                </h3>
                                <p className='refit_intro_subtitle'>
                                    {refitSection?.subtitle_en}
                                </p>
                                {refitSection?.bar_items?.length > 0 && (
                                    <div className='refit_bar_section'>
                                        <div className='refit_bar_items'>
                                            {refitSection.bar_items.map((item: any) => {
                                                const isLucide = ['puzzle', 'file-chart-column', 'truck-electric'].includes(item.icon);
                                                return (
                                                <div key={item.id} className='refit_bar_item'>
                                                    <div className={`refit_bar_icon_wrap${isLucide ? ' is-lucide' : ''}`}>
                                                        {renderBarIcon(item.icon, item.title_en || 'bar item icon')}
                                                    </div>
                                                    <span className='refit_bar_title'>{item.title_en}</span>
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {refitSection?.image && (
                                <div className='refit_image_wrap'>
                                    <img
                                        className='refit_main_image'
                                        src={refitSection.image}
                                        alt={refitSection?.title_en || 'Re:FIT AI'}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {pipelineSection && (
                    <section className='refit_pipeline_wrapper'>
                        <div className='refit_pipeline_inner'>
                            <h3 className='refit_pipeline_title'>
                                {pipelineSection.pipeline_title_en || pipelineSection.pipeline_label_en}
                            </h3>
                            <p className='refit_pipeline_subtitle'>
                                {pipelineSection.pipeline_subtitle_en}
                            </p>
                            <div className='refit_pipeline_section'>
                                <div className='refit_pipeline_cards'>
                                    {pipelineSection.pipeline_steps?.map((step: any, index: number) => {
                                        const stepLabel = `STEP ${String(index + 1).padStart(2, '0')}`;
                                        const stepTitle = step.title_en?.replace(/^Step\s*\d+\s*:\s*/i, '') || step.title_en;
                                        return (
                                        <article key={step.id} className='refit_pipeline_card'>
                                            <span className='refit_pipeline_step_label'>{stepLabel}</span>
                                            <div className='refit_pipeline_icon_wrap'>
                                                <img
                                                    src={step.icon}
                                                    alt={step.title_en}
                                                    className='refit_pipeline_icon' />
                                            </div>
                                            <h4 className='refit_pipeline_card_title'>
                                                {stepTitle}
                                            </h4>
                                            <ul className='refit_pipeline_list'>
                                                {step.bullets_en?.map((text: string, index: number) => (
                                                    <li key={index} className='refit_pipeline_bullet'>
                                                        <span className='refit_pipeline_bullet_point' />
                                                        <span className='refit_pipeline_bullet_text'>
                                                            {text}
                                                        </span>
                                                    </li>
                                                ))}
                                                {step.highlight_label_en && step.highlight_text_en && (
                                                    <li className='refit_pipeline_bullet refit_pipeline_note'>
                                                        <span className='refit_pipeline_bullet_point' />
                                                        <span className='refit_pipeline_note_text'>
                                                            <strong className='refit_pipeline_note_label'>
                                                                {step.highlight_label_en}
                                                            </strong>
                                                            {' '}
                                                            <span className='refit_pipeline_note_highlight'>
                                                                {step.highlight_text_en}
                                                            </span>
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>
                                        </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {featuresSection && (
                    <section className='refit_features_wrapper'>
                        <div className='refit_features_inner'>
                            <h3 className='refit_features_title'>{featuresSection.title_en}</h3>
                            <div className='refit_features_grid'>
                                {featuresSection.cards?.map((card: any) => {
                                    const isLucide = [
                                        'blocks',
                                        'clock',
                                        'flask-conical',
                                        'shield-check',
                                        'chart-column',
                                        'clipboard-pen',
                                    ].includes(card.icon);
                                    return (
                                    <article key={card.id} className='refit_features_card'>
                                        <div className={`refit_features_icon_wrap${isLucide ? ' is-lucide' : ''}`}>
                                            {renderFeatureIcon(card.icon, card.title_en)}
                                        </div>
                                        <h4 className='refit_features_card_title'>{card.title_en}</h4>
                                        <p className='refit_features_card_text'>{card.text_en}</p>
                                    </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {weeksSection && (
                    <section className='refit_weeks_wrapper'>
                        <div className='refit_weeks_inner'>
                            <div className='refit_weeks_content'>
                                <h3 className='refit_weeks_title'>{weeksSection.title_en}</h3>
                                <p className='refit_weeks_text'>{weeksSection.text_en}</p>
                            </div>
                            <div className='refit_weeks_badge'>
                                <span className='refit_weeks_badge_value'>{weeksSection.badge}</span>
                                <span className='refit_weeks_badge_sub'>{weeksSection.badge_sub}</span>
                            </div>
                        </div>
                    </section>
                )}

                {ctaSection && (
                    <section className='refit_cta_section'>
                        <div className='refit_cta_inner'>
                            <div className='refit_cta_text'>
                                <h3 className='refit_cta_title'>
                                    {renderTitle(ctaSection.title_en, ctaSection?.title_em_en)}
                                </h3>
                                <p className='refit_cta_subtitle'>{ctaSection.subtitle_en}</p>
                            </div>
                            <div className='refit_cta_actions'>
                                <a
                                    href={ctaSection?.button_link_en}
                                    className='refit_cta_button'>
                                    {ctaSection?.button_text_en}
                                </a>
                            </div>
                        </div>
                        <div className='refit_cta_wave' />
                    </section>
                )}
            </div>
        </article>
    )
};