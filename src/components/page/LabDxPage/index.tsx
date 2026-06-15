'use client';

import PageHeader from '@/components/common/PageHeader';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import './style.css';

/**
 * Lab-DX (Scope-FIT) 소개 페이지
 * - 사이트 공통 상단 메뉴(PageHeader / PageBanner / PageTap)는 그대로 유지
 * - 본문 텍스트는 /data/lab_dx.json 으로 분리 (한국어 기본 / `_en` 영문)
 * - 경로에 /en 포함 시 영문 필드를 렌더링
 */
export default function LabDxPage() {

    const path = usePathname();
    const isEnglish = !!path?.includes('/en');

    const [, setLoading] = useRecoilState(isLoading);
    const [data, setData] = useState<any>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    // 언어에 맞는 필드 선택 헬퍼 (영문 누락 시 한국어로 폴백)
    const L = (obj: any, key: string) => {
        if (!obj) return '';
        if (isEnglish) return obj[`${key}_en`] ?? obj[key] ?? '';
        return obj[key] ?? '';
    };

    useEffect(() => {
        fetch('/data/lab_dx.json')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((json) => setData(json))
            .catch((error) => console.error('Fetch error:', error))
            .finally(() => setLoading(false));
    }, []);

    // 스크롤 시 등장 애니메이션 (.reveal -> .in)
    useEffect(() => {
        if (!rootRef.current) return;
        const targets = rootRef.current.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add('in');
            });
        }, { threshold: 0.12 });
        targets.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [data]);

    // 워크플로우 6단계 아이콘 (언어 무관 · 순서 고정)
    const workflowIcons = [
        <svg key='w0' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M6 2v6a6 6 0 0 0 12 0V2' /><path d='M6 2h12' /><path d='M9 22h6' /><path d='M12 14v8' /></svg>,
        <svg key='w1' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M3 12h13' /><path d='M16 6l6 6-6 6' /><circle cx='6' cy='12' r='2' /></svg>,
        <svg key='w2' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><circle cx='11' cy='11' r='7' /><path d='M21 21l-4.3-4.3' /><circle cx='11' cy='11' r='3' /></svg>,
        <svg key='w3' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M9 2h6v6l5 9a4 4 0 0 1-3.5 6h-9A4 4 0 0 1 4 17l5-9z' /><path d='M9 8h6' /></svg>,
        <svg key='w4' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M21 12h-13' /><path d='M8 6L2 12l6 6' /><circle cx='18' cy='12' r='2' /></svg>,
        <svg key='w5' className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M3 3v18h18' /><path d='M7 14l4-4 4 4 5-6' /></svg>,
    ];

    // 차별화 카드 아이콘 (언어 무관 · 순서 고정)
    const diffIcons = [
        <svg key='d0' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M21 12a9 9 0 1 1-3-6.7' /><path d='M21 4v5h-5' /></svg>,
        <svg key='d1' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' /></svg>,
        <svg key='d2' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='7' height='7' rx='1' /></svg>,
        <svg key='d3' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='3' /><path d='M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8' /></svg>,
    ];

    if (!data) {
        return (
            <article>
                <MetaTagTitle title='Lab-DX' ko={!isEnglish} />
                <PageHeader />
                <PageBanner pageTitle='Lab-DX' />
                <PageTap tap='business' />
            </article>
        );
    }

    const { hero, intro, workflow, modules, arch, advantage, diff, orch, cta } = data;

    return (
        <article>
            <MetaTagTitle title='Lab-DX' ko={!isEnglish} />
            <PageHeader />
            <PageBanner pageTitle='Lab-DX' />
            <PageTap tap='business' />

            <div className='lab_dx_page' ref={rootRef}>
                {/* HERO */}
                <header className='hero'>
                    <div className='hero-grid' />
                    <div className='container hero-inner'>
                        <span className='eyebrow'><span className='pulse' /> {L(hero, 'eyebrow')}</span>
                        <h1>
                            <span className={isEnglish ? 'grad' : undefined}>{L(hero, 'title_line1')}</span><br />
                            <span className={isEnglish ? undefined : 'grad'}>{L(hero, 'title_line2')}</span>
                        </h1>
                        <p className='lead'>
                            {L(hero, 'lead')}
                            <span className='hero-slogan'>{L(hero, 'slogan')}</span>
                        </p>
                        <div className='hero-cta'>
                            <a className='btn btn-primary' href='#lab_dx_contact'>
                                {L(hero, 'cta_primary')}
                                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4'><path d='M5 12h14M13 6l6 6-6 6' /></svg>
                            </a>
                        </div>

                        <div className='hero-meta'>
                            {hero.meta.map((m: any, i: number) => (
                                <div className='item' key={i}><div className='num'>{m.num}</div><div className='lab'>{L(m, 'label')}</div></div>
                            ))}
                        </div>
                    </div>
                </header>

                {/* INTRO */}
                <section className='intro'>
                    <div className='container intro-grid'>
                        <div className='intro-copy'>
                            <span className='tag'>{L(intro, 'tag')}</span>
                            <h2>{L(intro, 'title_line1')}<br /><em>{L(intro, 'title_em')}</em></h2>
                            <p className='lead'>{L(intro, 'lead')}</p>
                        </div>
                        <ul className='feature-list'>
                            {intro.features.map((f: any, i: number) => (
                                <li key={i}><span className='check'>✓</span><div><b>{L(f, 'title')}</b><span>{L(f, 'desc')}</span></div></li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* WORKFLOW */}
                <section className='workflow' id='lab_dx_workflow'>
                    <div className='container'>
                        <div className='section-head'>
                            <span className='tag'>{L(workflow, 'tag')}</span>
                            <h2>{L(workflow, 'title')}</h2>
                            <p>{L(workflow, 'desc')}</p>
                        </div>
                        <div className='workflow-bar' aria-hidden='true' />
                        <div className='steps'>
                            {workflow.steps.map((s: any, i: number) => (
                                <div className='step reveal' key={i}><div className='num' />
                                    {workflowIcons[i]}
                                    <h4>{L(s, 'title')}</h4><p>{L(s, 'desc')}</p></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MODULES */}
                <section className='modules'>
                    <div className='container'>
                        <div className='section-head'>
                            <span className='tag'>{L(modules, 'tag')}</span>
                            <h2>{L(modules, 'title')}</h2>
                            <p>{L(modules, 'desc')}</p>
                        </div>
                        <div className='module-grid'>
                            {modules.cards.map((c: any, i: number) => (
                                <article className='module-card reveal' key={i}>
                                    <div className='module-media'>
                                        <img src={c.image} alt={L(c, 'alt')} loading='lazy' />
                                    </div>
                                    <div className='module-body'>
                                        <span className='module-eyebrow'>{c.eyebrow}</span>
                                        <h3>{L(c, 'title')}</h3>
                                        <p>{L(c, 'desc')}</p>
                                        <div className='module-specs'>
                                            {(isEnglish ? c.specs_en : c.specs).map((spec: string, si: number) => (
                                                <span className='spec-chip' key={si}>{spec}</span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ARCHITECTURE */}
                <section className='arch'>
                    <div className='container arch-head'>
                        <div className='section-head'>
                            <span className='tag'>{L(arch, 'tag')}</span>
                            <h2>{L(arch, 'title_line1')}<br />{L(arch, 'title_line2')}</h2>
                            <p>{L(arch, 'desc')}</p>
                        </div>
                        <div className='layers'>
                            {arch.layers.map((layer: any, i: number) => (
                                <div className='layer reveal' key={i}>
                                    <span className='badge'>{layer.badge}</span><h3>{L(layer, 'title')}</h3>
                                    <p>{L(layer, 'desc')}</p>
                                    <ul>{(isEnglish ? layer.items_en : layer.items).map((it: string, ii: number) => (<li key={ii}>{it}</li>))}</ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADVANTAGE */}
                <section className='advantage'>
                    <div className='container'>
                        <div className='section-head'>
                            <span className='tag'>{L(advantage, 'tag')}</span>
                            <h2>{L(advantage, 'title')}</h2>
                            <p>{L(advantage, 'desc')}</p>
                        </div>
                        <div className='advantage-grid'>
                            {advantage.cards.map((c: any, i: number) => (
                                <div className='ad-card reveal' key={i}><div className='ad-num'>{c.num}</div><h4>{L(c, 'title')}</h4>
                                    <p>{L(c, 'desc')}</p></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DIFFERENTIATION */}
                <section className='diff'>
                    <div className='container'>
                        <div className='section-head'>
                            <span className='tag'>{L(diff, 'tag')}</span>
                            <h2>{L(diff, 'title')}</h2>
                            <p>{L(diff, 'desc')}</p>
                        </div>
                        <div className='diff-grid'>
                            {diff.cards.map((c: any, i: number) => (
                                <div className='diff-card reveal' key={i}>
                                    <div className='diff-icon'>{diffIcons[i]}</div>
                                    <div><span className='label'>{c.label}</span><h3>{L(c, 'title')}</h3>
                                        <p>{L(c, 'desc')}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ORCHESTRATOR */}
                <section className='orch'>
                    <div className='container orch-inner'>
                        <span className='tag'>{L(orch, 'tag')}</span>
                        <h2>{L(orch, 'title_line1')}<br />{L(orch, 'title_line2')}</h2>
                        <p>{L(orch, 'desc')}</p>
                        <div className='orch-diagram'>
                            <svg viewBox='0 0 720 280' xmlns='http://www.w3.org/2000/svg'>
                                <defs><linearGradient id='lab_dx_line' x1='0' y1='0' x2='1' y2='0'>
                                    <stop offset='0' stopColor='#1E5799' stopOpacity='0.0' />
                                    <stop offset='0.5' stopColor='#1EA3DD' stopOpacity='0.9' />
                                    <stop offset='1' stopColor='#1E5799' stopOpacity='0.0' />
                                </linearGradient></defs>
                                <circle cx='360' cy='140' r='56' fill='rgba(30,163,221,0.12)' stroke='#1EA3DD' strokeWidth='1.5' />
                                <circle cx='360' cy='140' r='36' fill='rgba(30,87,153,0.6)' stroke='#6da7ff' strokeWidth='1.5' />
                                <text x='360' y='135' textAnchor='middle' fill='#fff' fontSize='14' fontWeight='700'>Scope-FIT</text>
                                <text x='360' y='152' textAnchor='middle' fill='#c8d2e6' fontSize='10'>{L(orch.nodes, 'center_sub')}</text>
                                <g fontSize='13'>
                                    <g transform='translate(80, 60)'><rect width='120' height='44' rx='10' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.2)' /><text x='60' y='27' textAnchor='middle' fill='#fff'>{L(orch.nodes, 'incubator')}</text></g>
                                    <g transform='translate(80, 180)'><rect width='120' height='44' rx='10' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.2)' /><text x='60' y='27' textAnchor='middle' fill='#fff'>{L(orch.nodes, 'microscope')}</text></g>
                                    <g transform='translate(520, 60)'><rect width='120' height='44' rx='10' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.2)' /><text x='60' y='27' textAnchor='middle' fill='#fff'>{L(orch.nodes, 'liquid_handler')}</text></g>
                                    <g transform='translate(520, 180)'><rect width='120' height='44' rx='10' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.2)' /><text x='60' y='27' textAnchor='middle' fill='#fff'>{L(orch.nodes, 'robot_arm')}</text></g>
                                </g>
                                <line x1='200' y1='82' x2='304' y2='120' stroke='url(#lab_dx_line)' strokeWidth='2' />
                                <line x1='200' y1='202' x2='304' y2='160' stroke='url(#lab_dx_line)' strokeWidth='2' />
                                <line x1='520' y1='82' x2='416' y2='120' stroke='url(#lab_dx_line)' strokeWidth='2' />
                                <line x1='520' y1='202' x2='416' y2='160' stroke='url(#lab_dx_line)' strokeWidth='2' />
                                <circle r='4' fill='#1EA3DD'><animateMotion dur='2.5s' repeatCount='indefinite' path='M 200 82 L 304 120' /></circle>
                                <circle r='4' fill='#1EA3DD'><animateMotion dur='2.5s' repeatCount='indefinite' begin='0.6s' path='M 200 202 L 304 160' /></circle>
                                <circle r='4' fill='#6da7ff'><animateMotion dur='2.5s' repeatCount='indefinite' begin='1.2s' path='M 416 120 L 520 82' /></circle>
                                <circle r='4' fill='#6da7ff'><animateMotion dur='2.5s' repeatCount='indefinite' begin='1.8s' path='M 416 160 L 520 202' /></circle>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className='cta' id='lab_dx_contact'>
                    <div className='container'>
                        <div className='cta-box'>
                            <div className='cta-inner'>
                                <div>
                                    <h2>{L(cta, 'title_line1')}<br />{L(cta, 'title_line2')}</h2>
                                    <p>{L(cta, 'desc')}</p>
                                </div>
                                <div className='cta-actions'>
                                    <a className='btn btn-primary' href='mailto:orders@zefit.co.kr'>
                                        {L(cta, 'cta_primary')}
                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4'><path d='M5 12h14M13 6l6 6-6 6' /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
};
