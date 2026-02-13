'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../service/[service]/style.css';
// import '../../service/[service]/test-style.css'; // 반영안을 보고 싶으면 이 라인을 주석 해제
import './style.css';
import { useEffect, useState } from "react";
import SideTap from "@/components/common/SideTap";
import { businessNavList } from "@/data/navData";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { useRecoilState } from "recoil";
import { isLoading } from "@/modules/loading";

export default function ProFIT() {

    const developmentData = businessNavList[2].list?.map((item: any) => item.id);
    const [, setLoading] = useRecoilState(isLoading);

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
            'custom-step-2': (
                <svg
                    className='ai_platform_step_icon_svg ai_platform_step_icon_svg--thick'
                    viewBox='0 0 384 384'
                    aria-hidden='true'
                    focusable='false'>
                    <path d='M261.75,0h122.25v124.57c-1.72-3.47-4.44-6.15-8.61-5.49-3.55.56-6.58,3.55-6.33,7.91.18,3.27,2.81,6.56,7.06,6.91,3.39.28,6.36-2.26,7.89-5.71v255.81h-252.75c7.44-1.68,14.29-4.44,19.99-10.14l24.25-24.29c3.54-3.54,4.8-8.33,3.61-13.56-.85-3.74-3.95-7.51-8.34-9.5-8.1-3.68-12.39-12.05-10.94-20.7,1.35-8.05,8.07-14.56,16.15-15.64,8.75-1.16,16.77,3.41,20.38,11.55,1.92,4.34,6.07,7.21,9.74,7.94,5.24,1.04,9.77-.46,13.29-3.99l24.02-24.05c7.47-7.48,10.86-17.36,9.98-28.24,10.89.85,20.74-2.54,28.22-9.99l23.37-23.26c7.31,14.36,21.85,21.46,36.99,18.89,14.06-2.38,25.47-14.03,27.6-28.16,2.26-14.95-4.86-29.13-18.96-36.29l14.13-14.42c3.09-3.15,1.9-8.27-.92-10.55-3.15-2.54-7.42-2.23-10.35.72l-14.89,14.97c-3.35,3.36-4.39,8.22-3.42,12.75.86,4.02,3.78,7.81,8.09,9.7,8.35,3.68,12.98,12.07,11.49,21.02-1.34,8.04-8.11,14.57-16.19,15.62-8.8,1.15-16.82-3.49-20.4-11.65-1.97-4.48-6.02-7.39-10.36-8.16s-9.06.54-12.39,3.85l-24.4,24.34c-7.65,7.63-19.92,7.68-27.57.02l-23.33-23.34c14.36-7.31,21.47-21.81,18.93-36.97-2.36-14.06-14.06-25.54-28.17-27.66-14.99-2.25-29.13,4.85-36.34,19.05l-23.38-23.35c-7.19-7.18-7.98-19.37-.62-26.76l23.96-24.08c7.26,14.27,21.8,21.31,36.86,18.75,14.07-2.39,25.54-14.01,27.65-28.16,2.22-14.84-4.83-29.06-18.85-36.25l22.87-22.96c8.09-8.12,20.32-8.05,28.39.02l24.32,24.31c3.35,3.35,8.25,4.34,12.69,3.4,4.03-.85,7.87-3.78,9.75-8.05,3.7-8.38,12.02-13.03,21.08-11.52,7.96,1.33,14.55,8.07,15.6,16.18,1.13,8.74-3.45,16.8-11.63,20.38-4.31,1.88-7.21,5.72-8.07,9.75-.95,4.5.1,9.34,3.43,12.69l14.58,14.64c3.16,3.17,8.12,2.87,10.91-.17s2.62-7.45-.37-10.48l-13.09-13.26c14.34-7.33,21.43-21.77,18.86-36.95-2.38-14.04-14-25.48-28.12-27.63-15.23-2.32-29.34,5.23-36.45,19l-21.34-21.44c-6.3-6.34-13.33-10.32-21.83-11.94Z' />
                    <path d='M252,0c-7.99,1.97-14.71,5.5-20.72,11.55l-22.72,22.86c-3.39,3.41-4.79,7.84-3.79,12.97.71,3.67,3.6,7.87,7.98,9.81,8.13,3.62,12.69,11.65,11.53,20.36-1.08,8.11-7.61,14.79-15.57,16.15-9,1.54-17.36-3.1-21.05-11.43-1.94-4.39-6.1-7.24-9.74-7.96-5.35-1.06-9.86.53-13.38,4.07l-24.21,24.28c-7.35,7.38-10.57,17.22-9.69,28-11.37-1.06-21.32,2.92-29.04,10.65l-22.51,22.55c-7.09-13.8-21.16-21.36-36.45-19.02-14.08,2.15-25.78,13.61-28.13,27.66-2.53,15.15,4.58,29.65,18.92,36.96l-23.35,23.42c-5.6,5.61-8.43,12.46-10.06,19.86V0h252Z' />
                    <path d='M261.75,0c8.5,1.62,15.52,5.61,21.83,11.94l21.34,21.44c7.11-13.76,21.22-21.32,36.45-19,14.11,2.15,25.74,13.6,28.12,27.63,2.57,15.18-4.52,29.62-18.86,36.95l13.09,13.26c2.99,3.03,3.07,7.54.37,10.48s-7.75,3.34-10.91.17l-14.58-14.64c-3.33-3.35-4.38-8.19-3.43-12.69.85-4.04,3.76-7.87,8.07-9.75,8.18-3.58,12.77-11.63,11.63-20.38-1.05-8.11-7.64-14.85-15.6-16.18-9.06-1.51-17.38,3.14-21.08,11.52-1.89,4.28-5.72,7.2-9.75,8.05-4.44.94-9.34-.06-12.69-3.4l-24.32-24.31c-8.07-8.06-20.3-8.14-28.39-.02l-22.87,22.96c14.02,7.18,21.06,21.41,18.85,36.25-2.12,14.15-13.58,25.77-27.65,28.16-15.06,2.56-29.6-4.47-36.86-18.75l-23.96,24.08c-7.36,7.39-6.57,19.58.62,26.76l23.38,23.35c7.2-14.2,21.34-21.29,36.34-19.05,14.11,2.11,25.81,13.6,28.17,27.66,2.54,15.16-4.57,29.66-18.93,36.97l23.33,23.34c7.66,7.66,19.93,7.6,27.57-.02l24.4-24.34c3.33-3.32,7.94-4.64,12.39-3.85s8.39,3.68,10.36,8.16c3.58,8.16,11.6,12.8,20.4,11.65,8.08-1.06,14.85-7.58,16.19-15.62,1.49-8.95-3.14-17.35-11.49-21.02-4.31-1.9-7.24-5.69-8.09-9.7-.97-4.53.07-9.38,3.42-12.75l14.89-14.97c2.93-2.95,7.2-3.26,10.35-.72,2.82,2.27,4.01,7.4.92,10.55l-14.13,14.42c14.1,7.16,21.22,21.34,18.96,36.29-2.13,14.13-13.54,25.79-27.6,28.16-15.15,2.56-29.69-4.54-36.99-18.89l-23.37,23.26c-7.48,7.45-17.34,10.84-28.22,9.99.87,10.88-2.51,20.76-9.98,28.24l-24.02,24.05c-3.52,3.53-8.06,5.03-13.29,3.99-3.67-.73-7.82-3.6-9.74-7.94-3.61-8.14-11.63-12.71-20.38-11.55-8.08,1.07-14.8,7.59-16.15,15.64-1.45,8.65,2.84,17.02,10.94,20.7,4.39,1.99,7.48,5.76,8.34,9.5,1.19,5.22-.07,10.01-3.61,13.56l-24.25,24.29c-5.69,5.7-12.54,8.45-19.99,10.14h-9c-7.86-1.72-14.75-4.89-20.68-10.85l-23.51-23.61c-3.54-3.55-4.83-8.27-3.61-13.54.85-3.66,3.94-7.49,8.29-9.46,8.11-3.69,12.41-12.02,10.98-20.71-1.33-8.05-8.05-14.58-16.18-15.66-8.74-1.16-16.75,3.42-20.36,11.59-1.83,4.12-5.8,7-9.15,7.79-5.29,1.24-10.03-.08-13.59-3.62l-23.93-23.85c-5.83-5.81-8.78-12.67-10.51-20.33v-9c1.63-7.4,4.46-14.25,10.06-19.86l23.35-23.42c-14.34-7.31-21.45-21.81-18.92-36.96,2.35-14.05,14.05-25.51,28.13-27.66,15.29-2.34,29.36,5.22,36.45,19.02l22.51-22.55c7.72-7.73,17.67-11.71,29.04-10.65-.87-10.78,2.34-20.62,9.69-28l24.21-24.28c3.53-3.54,8.04-5.13,13.38-4.07,3.64.73,7.8,3.58,9.74,7.96,3.68,8.33,12.05,12.96,21.05,11.43,7.96-1.36,14.49-8.04,15.57-16.15,1.16-8.71-3.39-16.74-11.53-20.36-4.37-1.94-7.27-6.15-7.98-9.81-.99-5.14.4-9.56,3.79-12.97l22.72-22.86c6.02-6.05,12.73-9.59,20.72-11.55h9.75ZM140.75,363.1l23.11-23.14c-14.29-7.32-21.33-21.77-18.78-36.85,2.38-14.07,14.02-25.56,28.16-27.68,14.85-2.22,29.09,4.81,36.28,18.87l23.27-23.27c7.68-7.68,7.65-19.95.01-27.6l-24.35-24.41c-3.5-3.51-4.72-8.33-3.74-12.98.92-4.37,4.03-8.04,8.53-10.06,8.15-3.66,12.5-12.03,11.07-20.76-1.32-8.04-8.08-14.62-16.21-15.67-8.77-1.14-16.81,3.52-20.39,11.7-1.97,4.5-6.01,7.39-10.4,8.14s-9.01-.53-12.35-3.86l-24.41-24.35c-7.68-7.66-19.91-7.63-27.57.01l-24.42,24.35c-3.5,3.49-8.35,4.73-13,3.72-4.04-.88-7.86-3.75-9.73-8.03-3.68-8.39-12-13.07-21.07-11.57-7.98,1.32-14.56,8.05-15.62,16.21-1.13,8.71,3.43,16.75,11.61,20.35,4.29,1.89,7.22,5.7,8.08,9.8.93,4.42-.09,9.3-3.43,12.65l-24.68,24.78c-7.6,7.63-7.64,19.87.01,27.53l23.29,23.31c7.33-14.29,21.81-21.37,36.96-18.77,14.02,2.41,25.47,14.01,27.58,28.17s-4.86,29.07-18.87,36.24l22.89,22.95c7.79,7.81,20.04,8.32,28.17.18Z' />
                    <path d='M122.25,384H0v-122.25c1.73,7.65,4.68,14.51,10.51,20.33l23.93,23.85c3.55,3.54,8.3,4.86,13.59,3.62,3.35-.79,7.33-3.66,9.15-7.79,3.62-8.16,11.62-12.75,20.36-11.59,8.13,1.08,14.85,7.6,16.18,15.66,1.43,8.69-2.87,17.02-10.98,20.71-4.34,1.97-7.44,5.8-8.29,9.46-1.22,5.27.07,9.99,3.61,13.54l23.51,23.61c5.93,5.96,12.82,9.13,20.68,10.85Z' />
                    <path d='M384,124.57v3.62c-1.53,3.45-4.5,6-7.89,5.71-4.25-.36-6.88-3.65-7.06-6.91-.24-4.37,2.78-7.36,6.33-7.91,4.17-.66,6.89,2.03,8.61,5.49Z' />
                    <path d='M140.75,363.1c-8.13,8.14-20.38,7.64-28.17-.18l-22.89-22.95c14.02-7.17,21.09-21.42,18.87-36.24s-13.56-25.77-27.58-28.17c-15.16-2.6-29.63,4.48-36.96,18.77l-23.29-23.31c-7.65-7.66-7.61-19.9-.01-27.53l24.68-24.78c3.34-3.35,4.36-8.23,3.43-12.65-.86-4.09-3.79-7.91-8.08-9.8-8.18-3.6-12.75-11.64-11.61-20.35,1.06-8.16,7.65-14.89,15.62-16.21,9.08-1.51,17.4,3.17,21.07,11.57,1.87,4.28,5.69,7.14,9.73,8.03,4.65,1.02,9.5-.23,13-3.72l24.42-24.35c7.67-7.65,19.89-7.68,27.57-.01l24.41,24.35c3.34,3.33,7.95,4.61,12.35,3.86s8.43-3.64,10.4-8.14c3.58-8.18,11.62-12.84,20.39-11.7,8.13,1.05,14.89,7.63,16.21,15.67,1.43,8.73-2.92,17.1-11.07,20.76-4.5,2.02-7.61,5.69-8.53,10.06-.98,4.65.24,9.47,3.74,12.98l24.35,24.41c7.63,7.65,7.67,19.92-.01,27.6l-23.27,23.27c-7.19-14.07-21.43-21.1-36.28-18.87-14.13,2.12-25.78,13.61-28.16,27.68-2.55,15.08,4.49,29.53,18.78,36.85l-23.11,23.14Z' />
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
            <MetaTagTitle title='Pro:FIT' />
            <PageHeader />
            <PageBanner pageTitle='AI 플랫폼' />
            <PageTap tap='business' />
            <SideTap tap={developmentData} content='ai_platform' />
            <div className='page_layout'>
                <>
                    {aiPlatformSections
                        .filter((item: any) => item?.section_type !== 'cta' && (item?.title || item?.text || item?.image || item?.pain_points?.length || item?.steps?.length))
                        .map((item: any) => {
                            if (item?.pain_points?.length) {
                                return (
                                    <section key={item.id} className='ai_platform_section_block'>
                                        <div className='ai_platform_pain_section'>
                                            <div className='ai_platform_pain_header'>
                                                <h3 className='ai_platform_pain_title'>
                                                    {`"당신의 후보물질, 어디에 써야 할지 막막하신가요?"`}
                                                </h3>
                                                <p className='ai_platform_pain_subtitle'>
                                                    신약 개발 과정에서 마주하는 가장 큰 고민들을 해결해 드립니다.
                                                </p>
                                            </div>
                                            <div className='ai_platform_pain_cards'>
                                                {item.pain_points.map((painItem: any, index: number) => {
                                                    const isLucide = ['target'].includes(painItem.icon);
                                                    const isFirst = index === 0;
                                                    return (
                                                    <article key={painItem.id} className='ai_platform_pain_card'>
                                                        <div className={`ai_platform_pain_icon_wrap${isLucide ? ' is-lucide' : ''}${isFirst ? ' is-first' : ''}`}>
                                                            {renderPainIcon(painItem.icon, painItem.title, isFirst)}
                                                        </div>
                                                        <h4 className='ai_platform_pain_card_title'>{painItem.title}</h4>
                                                        <p className='ai_platform_pain_card_text'>{painItem.text}</p>
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
                                                    {renderTitle(item.title, item?.title_em)}
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
                                                                {step.optional_label || '\u00A0'}
                                                            </span>
                                                        </div>
                                                        <div className={`ai_platform_step_icon_wrap${isCustomIcon ? ' is-lucide' : ''}`}>
                                                            {renderStepIcon(step.icon, step.title)}
                                                        </div>
                                                        <h4 className='ai_platform_step_title'>{step.title}</h4>
                                                        <p className='ai_platform_step_text is-center'>{step.text}</p>
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
                                            <h3 className='ai_platform_features_title'>{item.title}</h3>
                                            <div className='ai_platform_features_grid'>
                                                {item.cards.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_features_card'>
                                                        <div className='ai_platform_features_icon_wrap'>
                                                            {renderFeatureIcon(card.icon, card.title)}
                                                        </div>
                                                        <h4 className='ai_platform_features_card_title'>{card.title}</h4>
                                                        <p className='ai_platform_features_card_text'>{card.text}</p>
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
                                                <h3 className='ai_platform_compare_title'>{item.title}</h3>
                                                <p className='ai_platform_compare_subtitle'>{item.subtitle}</p>
                                            </div>
                                            <div className='ai_platform_compare_table'>
                                                <div className='ai_platform_compare_row ai_platform_compare_head'>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_label'>
                                                        {item?.table_header?.label}
                                                    </div>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_conventional_head'>
                                                        {item?.table_header?.conventional}
                                                    </div>
                                                    <div className='ai_platform_compare_cell ai_platform_compare_profit_head'>
                                                        {item?.table_header?.profit}
                                                    </div>
                                                </div>
                                                {item?.rows?.map((row: any) => (
                                                    <div key={row.id} className='ai_platform_compare_row'>
                                                        <div className='ai_platform_compare_cell ai_platform_compare_label_cell'>
                                                            {row.label}
                                                        </div>
                                                        <div className='ai_platform_compare_cell'>
                                                            {row.conventional}
                                                        </div>
                                                        <div className='ai_platform_compare_cell ai_platform_compare_profit_cell'>
                                                            {row.profit}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='ai_platform_compare_cards'>
                                                {item?.cards?.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_compare_card'>
                                                        <h4 className='ai_platform_compare_card_title'>{card.title}</h4>
                                                        <p className='ai_platform_compare_card_text'>{card.text}</p>
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
                                                <h3 className='ai_platform_use_title'>{item.title}</h3>
                                                <p className='ai_platform_use_subtitle'>{item.subtitle}</p>
                                            </div>
                                            <div className='ai_platform_use_cards'>
                                                {item.cards.map((card: any) => (
                                                    <article key={card.id} className='ai_platform_use_card'>
                                                        <div className='ai_platform_use_icon_wrap'>
                                                            {renderUseCaseIcon(card.icon, card.title)}
                                                        </div>
                                                        <h4 className='ai_platform_use_card_title'>{card.title}</h4>
                                                        <p className='ai_platform_use_card_text'>{card.text}</p>
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
                                            {item?.title && (
                                                <h2 className='ai_platform_title'>
                                                    {renderTitle(item.title, item?.title_em)}
                                                </h2>
                                            )}
                                            {item?.text && (
                                                <p className='ai_platform_text'>{item.text}</p>
                                            )}
                                        </div>
                                        {item?.image && (
                                            <div className='ai_platform_image_wrap'>
                                                <img
                                                    className='ai_platform_image'
                                                    src={item.image}
                                                    alt={item?.title || 'ai platform'} />
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
                        Pro:FIT
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
                                    {pharmaceuticalsData?.title}
                                </h3>
                                <p className='top_info_content'>
                                    {pharmaceuticalsData?.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* 반영안 */}
                {/* <section className='service_page_container2'>
                    <h2 className='service_page_title2'>
                        <div className='service_page_side_bar2' />
                        신약개발기술
                    </h2>
                    <div className='service_page_info_wrapper2'>
                        <img
                            className='service_info_image2'
                            src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_adult_eeg_system_bg.jpg'
                            alt='신약개발기술' />
                        <div className='service_page_info_box2'>
                            <h3 className='service_page_info_box_title2'>
                                {pharmaceuticalsData?.title}
                            </h3>
                            <p className='service_page_info_box_content2'>
                                {pharmaceuticalsData?.subtitle}
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
                                        {renderTitle(ctaSection.title, ctaSection?.title_em)}
                                    </h3>
                                    <p className='ai_platform_cta_subtitle'>{ctaSection.subtitle}</p>
                                </div>
                                <div className='ai_platform_cta_actions'>
                                    <a
                                        href={ctaSection?.button_link}
                                        className='ai_platform_cta_button'>
                                        {ctaSection?.button_text}
                                    </a>
                                </div>
                            </div>
                            <div className='ai_platform_cta_wave' />
                        </div>
                    )}
                </section>
            </div>
        </article>
    )
};
