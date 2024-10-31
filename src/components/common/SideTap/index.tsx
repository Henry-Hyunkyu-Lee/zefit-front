import { usePathname } from 'next/navigation';
import './style.css';
import { businessNavList } from '@/data/navData';
import { useEffect, useRef, useState } from 'react';

interface SideTapProps {
    tap: any;
    content: string;
};

export default function SideTap({ tap, content }: SideTapProps) {

    const path = usePathname();

    const sideTapRef = useRef<HTMLDivElement>(null);

    const isEnglish = path?.includes('/en');

    const [scrolly, setScrolly] = useState<number>(0);

    const linkControl = (item: string) => {
        if (content === 'development') {
            const find = (isEnglish)
                ? businessNavList[2].list?.find((data: any) => data.en === item)
                : businessNavList[2].list?.find((data: any) => data.id === item);
            const resultKo = find?.href;
            const resultEn = find?.href_en;

            return (isEnglish) ? resultEn : resultKo;
        } else {
            return (isEnglish) ? `/en/content/${content}/${item}` : `/content/${content}/${item}`;
        }
    };

    useEffect(() => {
        const scrollEvent = () => {
            if (!sideTapRef.current) return;
            const y = window.scrollY;
            
            if (y < 400) {
                sideTapRef.current.style.position = 'absolute';
                sideTapRef.current.style.bottom = 'auto';
                sideTapRef.current.style.top = '540px';
            } else {
                sideTapRef.current.style.position = 'fixed';
                sideTapRef.current.style.bottom = 'calc(2% + 180px)';
                sideTapRef.current.style.top = 'auto';
            };
        };

        window.addEventListener('scroll', scrollEvent);

        return () => {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, []);

    return (
        <section ref={sideTapRef} className='service_side_tap_container'>
            <ul className='side_tap_list_wrapper'>
                {tap?.map((item: string, index: number) =>
                    <li key={index}>
                        <a
                            href={linkControl(item)}
                            className='side_tap_lane_wrapper'>
                            <p
                                style={{
                                    color: (path === linkControl(item)) ? '#0190D6' : '#57575780',
                                    fontSize: (path === linkControl(item)) ? '18px' : '16px',
                                    fontWeight: (path === linkControl(item)) ? '700' : '500',
                                    textShadow: (path === linkControl(item)) ? '2px 2px 4px #0190D63f 2px 2px 4px #ffffff3f' : ''
                                }}
                                className='side_tap_text'>
                                {item}
                            </p>
                            <div className='side_tap_right_bar_wrapper'>
                                <div
                                    style={{
                                        backgroundColor: (path === linkControl(item)) ? '#0190D6' : '#57575780',
                                        width: (path === linkControl(item)) ? '40px' : '30px',
                                        height: (path === linkControl(item)) ? '4px' : '2px',
                                        boxShadow: (path === linkControl(item)) ? '2px 2px 4px 0px #0190D63f' : ''
                                    }}
                                    className='side_tap_right_bar' />
                            </div>
                        </a>
                    </li>
                )}
            </ul>
        </section>
    )
};