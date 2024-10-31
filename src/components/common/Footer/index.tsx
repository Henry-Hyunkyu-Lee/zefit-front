'use client';

import { usePathname } from 'next/navigation';
import './style.css';

export default function Footer() {

    const path = usePathname() as string;

    return (
        <footer
            style={{ display: (path?.includes('/adm')) ? 'none' : '' }}
            className='footer_container'>
            <div className='wave' />
            <h4>
                <nav>
                    <ul className='footer_link_wrapper'>
                        <li>
                            <a
                                href={(path?.includes('/en'))
                                    ? '/en/content/provision'
                                    : '/content/provision'}
                                className='footer_link'>
                                {(path?.includes('/en'))
                                    ? 'Terms of use'
                                    : '이용약관'}
                            </a>
                        </li>
                        <li>
                            <a
                                href={(path?.includes('/en'))
                                    ? '/en/content/privacy'
                                    : '/content/privacy'}
                                className='footer_link'>
                                {(path?.includes('/en'))
                                    ? 'Privacy policy'
                                    : '개인정보취급방침'}
                            </a>
                        </li>
                        <li>
                            <a
                                href={(path?.includes('/en'))
                                    ? '/en/content/contact'
                                    : '/content/contact'}
                                className='footer_link'>
                                {(path?.includes('/en'))
                                    ? 'Location'
                                    : '오시는길'}
                            </a>
                        </li>
                    </ul>
                </nav>
            </h4>
            <p className='footer_content_wrapper'>
                307, Waryong-ro, Seo-gu, Daegu, Republic of Korea
                <br />
                <i className='icon-envelope'></i>
                info@zefit.co.kr ·&nbsp;&nbsp;
                <i className='icon-earphones'></i>
                053 716 0816 ·
                <br />
                Copyright ⓒ 2018 Zefit. All rights reserved.
            </p>
        </footer>
    )
};