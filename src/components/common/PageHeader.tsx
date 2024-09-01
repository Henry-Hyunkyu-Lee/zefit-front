'use client';

import { useEffect, useRef, useState } from "react"
import NavModal from "./NavModal";
import { aboutNavList, businessNavList, communityNavList } from "@/data/navData";

export default function PageHeader() {

    const headerRef = useRef<HTMLHeadElement>(null);
    const navModalRef = useRef<HTMLUListElement>(null);
    const [isKorean, setIsKorean] = useState<boolean>(false);
    const [scroll, setScroll] = useState<number>(0);
    const [navValue, setNavValue] = useState<{
        id: string,
        href: string,
        list: {
            id: string,
            href: string
        }[] | undefined
    }[] | undefined>(undefined);

    useEffect(() => {
        const scrollEvent = async () => {
            if (!headerRef.current) return;
            const scrolly = window.scrollY;
            setScroll(scrolly);

            if (scrolly !== 0) {
                headerRef.current.style.height = '60px';
            } else {
                headerRef.current.style.height = '100px';
            };
        };

        document.addEventListener('scroll', scrollEvent);

        return () => {
            document.removeEventListener('scroll', scrollEvent);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="transition-all ease-in-out duration-300 flex justify-center items-center bg-white shadow-custom
                text-[#444444] fixed top-0 left-0 w-full h-[100px] z-20">
            <nav className="web:w-[1170px] w-[94%] h-full flex items-center justify-between">
                <a
                    className={(scroll === 0)
                        ? 'w-auto h-full flex items-center justify-center cursor-pointer'
                        : 'w-auto h-[95%] flex items-center justify-center cursor-pointer'}
                    href="/">
                    <img src="http://www.zefit.co.kr/theme/basic/assets/images/logo.png" alt="로고 이미지" className="w-full h-full" />
                </a>
                <ul className="h-full flex justify-center items-center text-[16px] font-medium gap-[103px]">
                    <li
                        className="h-full flex justify-center items-center relative"
                        onMouseOver={() => setNavValue(aboutNavList)}
                        onMouseLeave={() => setNavValue(undefined)}>
                        <a className="cursor-pointer" href="/content/company">
                            회사소개
                        </a>
                        {(navValue && (navValue[0].id === "회사개요")) && <NavModal navModalRef={navModalRef} navValue={navValue} />}
                    </li>
                    <li
                        className="h-full flex justify-center items-center relative"
                        onMouseOver={() => setNavValue(businessNavList)}
                        onMouseLeave={() => setNavValue(undefined)}>
                        <a className="cursor-pointer" href="/content/zebrafish">
                            사업소개
                        </a>
                        {(navValue && (navValue[0].id === "모델")) && <NavModal navModalRef={navModalRef} navValue={navValue} />}
                    </li>
                    <li
                        className="h-full flex justify-center items-center relative"
                        onMouseOver={() => setNavValue(communityNavList)}
                        onMouseLeave={() => setNavValue(undefined)}>
                        <a className="cursor-pointer" href="/notice">
                            커뮤니티
                        </a>
                        {(navValue && (navValue[0].id === "공지사항")) && <NavModal navModalRef={navModalRef} navValue={navValue} />}
                    </li>
                </ul>
                <ul className="w-fit h-full flex justify-center items-center text-[16px] font-semibold gap-6">
                    <li className="h-[80%] flex justify-center items-center">
                        <button
                            onClick={() => setIsKorean(false)}
                            className={(!isKorean)
                                ? `font-bold bg-white text-[#444444] outline-none text-[14px] cursor-pointer w-[50px] h-[24px] rounded-tl-full rounded-bl-full border border-white`
                                : `font-light bg-transparent outline-none text-[14px] cursor-pointer w-[50px] h-[24px] rounded-tl-full rounded-bl-full border border-white border-l-0`}>
                            ENG
                        </button>
                        <button
                            onClick={() => setIsKorean(true)}
                            className={(isKorean)
                                ? "font-bold bg-white text-[#444444] outline-none text-[14px] cursor-pointer w-[50px] h-[24px] rounded-tr-full rounded-br-full border border-white"
                                : "font-light bg-transparent outline-none text-[14px] cursor-pointer w-[50px] h-[24px] rounded-tr-full rounded-br-full border border-white border-l-0"}>
                            KOR
                        </button>
                    </li>
                    <li>
                        <a href="/contact" className="transition-all py-[6px] px-[16px] border border-solid rounded-3xl
                            font-medium hover:bg-zefit-heavy hover:border-zefit-heavy hover:text-white">
                            문의하기
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
};