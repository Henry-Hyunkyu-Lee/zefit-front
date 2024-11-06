import { usePathname } from 'next/navigation';
import './style.css';
import { businessNavList } from '@/data/navData';

interface SideTapProps {
    tap: any;
    content: string;
};

export default function SideTap({ tap, content }: SideTapProps) {

    const path = usePathname();
    const isEnglish = path?.includes('/en');

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

    return (
        // 현재안
        <section className='service_side_tap_container'>
            <ul className='side_tap_list_wrapper'>
                {tap?.map((item: string, index: number) =>
                    <li key={index}>
                        <a
                            href={linkControl(item)}
                            className='side_tap_lane_wrapper'>
                            <p
                                className={(path === linkControl(item)) ? 'select_side_tap_text' : 'side_tap_text'}>
                                {item}
                            </p>
                            <div className='side_tap_right_bar_wrapper'>
                                <div className={(path === linkControl(item)) ? 'select_side_tap_right_bar' : 'side_tap_right_bar'} />
                            </div>
                        </a>
                    </li>
                )}
            </ul>
        </section>

        // 반영안
        // <section className='service_side_tap_wrapper'>
        //     <ul className='service_side_tap_list'>
        //         {tap?.map((item: any, index: number) =>
        //             <li key={index}>
        //                 <a
        //                     href={linkControl(item)}
        //                     className={
        //                         (path === linkControl(item))
        //                             ? 'select_side_tap_button'
        //                             : 'service_side_tap_button'}>
        //                     {item}
        //                 </a>
        //             </li>
        //         )}
        //     </ul>
        // </section>
    )
};