'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../../../content/service/[service]/style.css';
// import '../../../../content/service/[service]/test-style.css'; // 반영안을 보고 싶으면 이 라인의 주석을 해제
import '../../../../content/ai_platform/Pro_FIT/style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function ProFITEN() {

    const [, setLoading] = useRecoilState(isLoading);

    const developmentData = businessNavList[2].list?.map((item: any) => item.en);

    const [pharmaceuticalsData, setPharmaceuticalsData] = useState<any>(null);
    const [aiPlatformSections, setAiPlatformSections] = useState<any[]>([]);
    const ctaSection = aiPlatformSections.find((item: any) => item?.section_type === 'cta');

    useEffect(() => {
        fetch('/api/inquiry/pharmaceuticals')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setPharmaceuticalsData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('/data/ai_platform.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setAiPlatformSections(jsonData?.Pro_FIT?.sections || []);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    const renderTitle = (title: string, emphasis?: string) => {
        if (!emphasis || !title.includes(emphasis)) return title;
        const [before, after] = title.split(emphasis);
        return (
            <>
                {before}
                <span className='ai_platform_title_em'>{emphasis}</span>
                {after}
            </>
        );
    };

    const renderUseCaseIcon = (icon: string, title: string) => {
        const iconMap: Record<string, JSX.Element> = {
            'trending-up': (
                <svg
                    className='ai_platform_use_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <polyline points='3 17 9 11 13 15 21 7' />
                    <polyline points='14 7 21 7 21 14' />
                </svg>
            ),
            timer: (
                <svg
                    className='ai_platform_use_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <line x1='10' y1='2' x2='14' y2='2' />
                    <circle cx='12' cy='14' r='8' />
                    <line x1='12' y1='14' x2='12' y2='10' />
                </svg>
            ),
            'layers-plus': (
                <svg
                    className='ai_platform_use_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z' />
                    <path d='M16 17h6' />
                    <path d='M19 14v6' />
                    <path d='M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178' />
                    <path d='M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962' />
                </svg>
            ),
            search: (
                <svg
                    className='ai_platform_use_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <circle cx='11' cy='11' r='8' />
                    <line x1='21' y1='21' x2='16.65' y2='16.65' />
                </svg>
            ),
        };

        return iconMap[icon] || (
            <img
                src={icon}
                alt={title}
                className='ai_platform_use_icon' />
        );
    };

    const renderPainIcon = (icon: string, title: string, isFirst?: boolean) => {
        const iconMap: Record<string, JSX.Element> = {
            target: (
                <svg
                    className={`ai_platform_pain_icon_svg${isFirst ? ' is-first' : ''}`}
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <circle cx='12' cy='12' r='8' />
                    <circle cx='12' cy='12' r='4' />
                    <line x1='12' y1='2' x2='12' y2='4' />
                    <line x1='12' y1='20' x2='12' y2='22' />
                    <line x1='2' y1='12' x2='4' y2='12' />
                    <line x1='20' y1='12' x2='22' y2='12' />
                    <line x1='17' y1='7' x2='21' y2='3' />
                </svg>
            ),
        };

        return iconMap[icon] || (
            <img
                src={icon}
                alt={title}
                className='ai_platform_pain_icon' />
        );
    };

    const renderFeatureIcon = (icon: string, title: string) => {
        const iconMap: Record<string, JSX.Element> = {
            blocks: (
                <svg
                    className='ai_platform_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2' />
                    <rect x='14' y='2' width='8' height='8' rx='1' />
                </svg>
            ),
            clock: (
                <svg
                    className='ai_platform_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <circle cx='12' cy='12' r='9' />
                    <path d='M12 7v5l3 3' />
                </svg>
            ),
            'flask-conical': (
                <svg
                    className='ai_platform_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M10 2v5l-5 8a4 4 0 0 0 3.4 6h7.2a4 4 0 0 0 3.4-6l-5-8V2' />
                    <path d='M7 16h10' />
                </svg>
            ),
            'shield-check': (
                <svg
                    className='ai_platform_features_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
                    <path d='m9 12 2 2 4-4' />
                </svg>
            ),
            'chart-column': (
                <svg
                    className='ai_platform_features_icon_svg'
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
                    className='ai_platform_features_icon_svg'
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
                className='ai_platform_features_icon'
            />
        );
    };

    const renderStepIcon = (icon: string, title: string) => {
        const iconMap: Record<string, JSX.Element> = {
            search: (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <circle cx='11' cy='11' r='8' />
                    <line x1='21' y1='21' x2='16.65' y2='16.65' />
                </svg>
            ),
            'clipboard-list': (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
                    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
                    <path d='M12 11h4' />
                    <path d='M12 16h4' />
                    <path d='M8 11h.01' />
                    <path d='M8 16h.01' />
                </svg>
            ),
            'fish-symbol': (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'
                    style={{ transform: 'rotate(180deg)', transformOrigin: '50% 50%' }}>
                    <path d='M2 16s9-15 20-4C11 23 2 8 2 8' />
                </svg>
            ),
            'custom-step-2': (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M9.5 2a1.5 1.5 0 0 1 3 0V3h1.5a2 2 0 0 1 2 2V7h-1a1.5 1.5 0 1 0 0 3h1v4h-1a1.5 1.5 0 1 0 0 3h1v1.5a2 2 0 0 1-2 2H12v-1a1.5 1.5 0 1 0-3 0v1H7.5a2 2 0 0 1-2-2V17h1a1.5 1.5 0 1 0 0-3h-1v-4h1a1.5 1.5 0 1 0 0-3h-1V5a2 2 0 0 1 2-2H9.5z' />
                </svg>
            ),
            'custom-step-3': (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <rect x='6' y='4' width='12' height='16' rx='2' />
                    <rect x='9' y='2' width='6' height='4' rx='1' />
                    <rect x='8' y='9' width='3' height='3' rx='0.4' />
                    <rect x='13' y='9' width='3' height='3' rx='0.4' />
                    <rect x='8' y='13' width='3' height='3' rx='0.4' />
                    <rect x='13' y='13' width='3' height='3' rx='0.4' />
                    <line x1='9.5' y1='10.5' x2='14.5' y2='13.5' />
                    <line x1='9.5' y1='14.5' x2='14.5' y2='11.5' />
                    <line x1='7.5' y1='18' x2='16.5' y2='18' />
                </svg>
            ),
            'custom-step-4': (
                <svg
                    className='ai_platform_step_icon_svg'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M3 12c2-2 5-4 9-4 4 0 7 2 9 4-2 2-5 4-9 4-4 0-7-2-9-4z' />
                    <path d='M3 12l-2-2v4z' />
                    <circle cx='15' cy='12' r='1' />
                </svg>
            ),
        };

        return iconMap[icon] || (
            <img
                src={icon}
                alt={title}
                className='ai_platform_step_icon' />
        );
    };

    return (
        <article>
            <MetaTagTitle title='Pro:FIT' ko={false} 
            description='CNS drug development focuses on testing treatments for brain and spinal cord disorders, including drug discovery, preclinical testing, and clinical trials.'
            keywords={['CNS drug development ','Pro:FIT',]} 
            />
            <PageHeader />
            <PageBanner pageTitle='Drug discovery' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='ai_platform' />
            <div className='page_layout lang-en'>
                <>
                    {aiPlatformSections
                        .filter((item: any) => item?.section_type !== 'cta' && (item?.title_en || item?.text_en || item?.image || item?.pain_points?.length || item?.steps?.length))
                        .map((item: any) => {
                            if (item?.pain_points?.length) {
                                return (
                                    <section key={item.id} className='ai_platform_section_block'>
                                        <div className='ai_platform_pain_section'>
                                            <div className='ai_platform_pain_header'>
                                                <h3 className='ai_platform_pain_title'>
                                                    {`"Not sure where your candidate should be used?"`}
                                                </h3>
                                                <p className='ai_platform_pain_subtitle'>
                                                    We help resolve the biggest uncertainties in drug development.
                                                </p>
                                            </div>
                                            <div className='ai_platform_pain_cards'>
                                                {item.pain_points.map((painItem: any, index: number) => {
                                                    const isLucide = ['target'].includes(painItem.icon);
                                                    const isFirst = index === 0;
                                                    return (
                                                    <article key={painItem.id} className='ai_platform_pain_card'>
                                                        <div className={`ai_platform_pain_icon_wrap${isLucide ? ' is-lucide' : ''}${isFirst ? ' is-first' : ''}`}>
                                                            {renderPainIcon(painItem.icon, painItem.title_en, isFirst)}
                                                        </div>
                                                        <h4 className='ai_platform_pain_card_title'>{painItem.title_en}</h4>
                                                        <p className='ai_platform_pain_card_text'>{painItem.text_en}</p>
                                                    </article>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }

                            if (item?.section_type === 'profit_steps' && item?.steps?.length) {
                                return (
                                    <section key={item.id} className='ai_platform_section_block'>
                                        <div className='ai_platform_steps_section'>
                                            <div className='ai_platform_steps_header'>
                                                <h3 className='ai_platform_steps_title'>
                                                    {renderTitle(item.title_en, item?.title_em_en)}
                                                </h3>
                                            </div>
                                            <div className='ai_platform_steps_grid'>
                                                {item.steps.map((step: any) => {
                                                    const isCustomIcon = [
                                                        'search',
                                                        'custom-step-2',
                                                        'custom-step-3',
                                                        'custom-step-4',
                                                    ].includes(step.icon);
                                                    return (
                                                    <article key={step.id} className='ai_platform_step_card'>
                                                        <div className='ai_platform_step_header'>
                                                            <span className='ai_platform_step_label'>{step.step}</span>
                                                            <span className='ai_platform_step_optional'>
                                                                {step.optional_label_en || '\u00A0'}
                                                            </span>
                                                        </div>
                                                        <div className={`ai_platform_step_icon_wrap${isCustomIcon ? ' is-lucide' : ''}`}>
                                                            {renderStepIcon(step.icon, step.title_en)}
                                                        </div>
                                                        <h4 className='ai_platform_step_title'>{step.title_en}</h4>
                                                        <p className='ai_platform_step_text is-center'>{step.text_en}</p>
                                                    </article>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }

                            if (item?.section_type === 'profit_features' && item?.cards?.length) {
                                return (
                                    <section key={item.id} className='ai_platform_section_block ai_platform_section_block--features'>
                                        <div className='ai_platform_features_section'>
                                            <h3 className='ai_platform_features_title'>{item.title_en}</h3>
                                            <div className='ai_platform_features_grid'>
                                                {item.cards.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_features_card'>
                                                        <div className='ai_platform_features_icon_wrap'>
                                                            {renderFeatureIcon(card.icon, card.title_en)}
                                                        </div>
                                                        <h4 className='ai_platform_features_card_title'>{card.title_en}</h4>
                                                        <p className='ai_platform_features_card_text'>{card.text_en}</p>
                                                    </article>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }

                            if (item?.section_type === 'profit_compare') {
                                return (
                                    <section key={item.id} className='ai_platform_section_block'>
                                        <div className='ai_platform_compare_section'>
                                            <div className='ai_platform_compare_header'>
                                                <h3 className='ai_platform_compare_title'>{item.title_en}</h3>
                                                <p className='ai_platform_compare_subtitle'>{item.subtitle_en}</p>
                                            </div>
                                            <div className='ai_platform_compare_table'>
                                                <div className='ai_platform_compare_row ai_platform_compare_head'>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_label'>
                                                        {item?.table_header?.label_en}
                                                    </div>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_conventional_head'>
                                                        {item?.table_header?.conventional_en}
                                                    </div>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_profit_head'>
                                                        {item?.table_header?.profit_en}
                                                    </div>
                                                </div>
                                                {item?.rows?.map((row: any) => (
                                                    <div key={row.id} className='ai_platform_compare_row'>
                                                        <div className='ai_platform_compare_cell ai_platform_compare_label_cell'>
                                                            {row.label_en}
                                                        </div>
                                                        <div className='ai_platform_compare_cell'>
                                                            {row.conventional_en}
                                                        </div>
                                                        <div className='ai_platform_compare_cell ai_platform_compare_profit_cell'>
                                                            {row.profit_en}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='ai_platform_compare_cards'>
                                                {item?.cards?.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_compare_card'>
                                                        <h4 className='ai_platform_compare_card_title'>{card.title_en}</h4>
                                                        <p className='ai_platform_compare_card_text'>{card.text_en}</p>
                                                    </article>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }

                            if (item?.section_type === 'use_cases' && item?.cards?.length) {
                                return (
                                    <section key={item.id} className='ai_platform_section_block ai_platform_section_block--use-cases'>
                                        <div className='ai_platform_use_section'>
                                            <div className='ai_platform_use_header'>
                                                <h3 className='ai_platform_use_title'>{item.title_en}</h3>
                                                <p className='ai_platform_use_subtitle'>{item.subtitle_en}</p>
                                            </div>
                                            <div className='ai_platform_use_cards'>
                                                {item.cards.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_use_card'>
                                                        <div className='ai_platform_use_icon_wrap'>
                                                            {renderUseCaseIcon(card.icon, card.title_en)}
                                                        </div>
                                                        <h4 className='ai_platform_use_card_title'>{card.title_en}</h4>
                                                        <p className='ai_platform_use_card_text'>{card.text_en}</p>
                                                    </article>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }

                            const isFirstSection = item?.id === 1;
                            return (
                                <section key={item.id} className={`ai_platform_section_block${isFirstSection ? ' ai_platform_section_block--intro' : ''}`}>
                                    <div className='ai_platform_section_inner'>
                                        <div className='ai_platform_text_box'>
                                            {isFirstSection && (
                                                <span className='ai_platform_section_kicker'>Pro:FIT AI</span>
                                            )}
                                            {item?.title_en && (
                                                <h2 className='ai_platform_title'>
                                                    {renderTitle(item.title_en, item?.title_em_en)}
                                                </h2>
                                            )}
                                            {item?.text_en && (
                                                <p className='ai_platform_text'>{item.text_en}</p>
                                            )}
                                        </div>
                                        {item?.image && (
                                            <div className='ai_platform_image_wrap'>
                                                <img
                                                    className='ai_platform_image'
                                                    src={item.image}
                                                    alt={item?.title_en || 'ai platform'} />
                                            </div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                </>

                {/* 현재안 */}
                {/* <section className='pharmaceuticals_page_container'>
                    <h2 className='service_page_title'>
                        <div className='service_page_side_bar' />
                        Technology
                    </h2>
                    <div className='pharmaceuticals_page_top_info_container'>
                        <div className='top_info_background_box' />
                        <img
                            className='top_info_image'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='top_info_content_wrapper'>
                            <div className='top_info_content_box'>
                                <h3 className='top_info_title'>
                                    {pharmaceuticalsData?.title_en}
                                </h3>
                                <p className='top_info_content'>
                                    {pharmaceuticalsData?.subtitle_en}
                                </p>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* 반영안 */}
                {/* <section className='service_page_container2'>
                    <h2 className='service_page_title2'>
                        <div className='service_page_side_bar2' />
                        Technology
                    </h2>
                    <div className='service_page_info_wrapper2'>
                        <img
                            className='service_info_image2'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='service_page_info_box2'>
                            <h3 className='service_page_info_box_title2'>
                                {pharmaceuticalsData?.title_en}
                            </h3>
                            <p className='service_page_info_box_content2'>
                                {pharmaceuticalsData?.subtitle_en}
                            </p>
                        </div>
                    </div>
                </section> */}

                <section className='bottom_content_container'>
                    {ctaSection && (
                        <div className='ai_platform_cta_section'>
                            <div className='ai_platform_cta_inner'>
                                <div className='ai_platform_cta_text'>
                                    <h3 className='ai_platform_cta_title'>
                                        {renderTitle(ctaSection.title_en, ctaSection?.title_em_en)}
                                    </h3>
                                    <p className='ai_platform_cta_subtitle'>{ctaSection.subtitle_en}</p>
                                </div>
                                <div className='ai_platform_cta_actions'>
                                    <a
                                        href={ctaSection?.button_link_en}
                                        className='ai_platform_cta_button'>
                                        {ctaSection?.button_text_en}
                                    </a>
                                </div>
                            </div>
                            <div className='ai_platform_cta_wave' />
                        </div>
                    )}
                </section>

                {/* <section className='bottom_content_container'>
                    <ul className='bottom_content_card_wrapper'>
                        {pharmaceuticalsData?.step?.map((item: any, index: number) =>
                            <li
                                key={index}
                                className='card_box'>
                                {(index !== pharmaceuticalsData?.step?.length - 1)
                                    && <div className='card_next_step_arrow'>
                                        <i className='icon-arrow-right' />
                                    </div>}
                                <img
                                    className='card_box_icon'
                                    src={item?.icon}
                                    alt={`${item?.title_en} 아이콘`} />
                                <strong style={{ fontSize: '15px' }} className='card_box_title'>
                                    {item?.title_en}
                                </strong>
                                <div className='card_text_box'>
                                    {item?.content_en.map((text: string, idx: number) =>
                                        <div
                                            key={idx}
                                            className='card_text_box_lane'>
                                            <div className='card_text_box_lane_point_en' />
                                            <p
                                                style={{ fontSize: '12px' }}
                                                className='card_text_box_lane_font'>
                                                {text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>
                </section> */}
            </div>
        </article>
    )
};
