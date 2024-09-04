'use client';

import PageBanner from "@/components/common/PageBanner"
import PageHeader from "@/components/common/PageHeader"
import PageTap from "@/components/common/PageTap";
import ZContent from "@/components/common/ZContent";
import { businessNavList } from "@/data/navData"
import { useParams, usePathname } from "next/navigation";

export default function Service() {

    const { service } = useParams();

    return (
        <main className="w-full flex min-h-screen flex-col items-center justify-between mb-[102px]">
            <PageHeader />
            <article className="w-full flex min-h-screen flex-col justify-start items-center">
                <PageBanner>{service}</PageBanner>
                <PageTap value={1} />
                <ZContent />
            </article>
        </main>
    )
};