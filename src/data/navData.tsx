type navListType = {
    id: string,
    id_en: string,
    href: string,
    href_en: string,
    criteria?: string,
    list: {
        id: string,
        en: string,
        href: string,
        href_en: string
    }[] | undefined
}[];

export const aboutNavList: navListType = [
    {
        id: '회사개요',
        id_en: 'Overview',
        href: '/content/company',
        href_en: '/en/content/company',
        list: undefined
    },
    {
        id: '연혁',
        id_en: 'History',
        href: '/content/history',
        href_en: '/en/content/history',
        list: undefined
    },
    {
        id: '인증 및 파트너 현황',
        id_en: 'Certifications & Partners',
        href: '/status',
        href_en: '/en/status',
        list: undefined
    },
    {
        id: '오시는 길',
        id_en: 'Location',
        href: '/content/contact',
        href_en: '/en/content/contact',
        list: undefined
    },
];

export const businessNavList: navListType = [
    {
        id: '모델',
        id_en: 'Model',
        href: '/content/zebrafish',
        href_en: '/en/content/zebrafish',
        criteria: '/content/zebrafish',
        list: undefined
    },
    {
        id: 'CRO 서비스',
        id_en: 'CRO Service',
        href: '/content/service/Overview',
        href_en: '/en/content/service/Overview',
        criteria: '/content/service',
        list: [
            {
                id: 'Overview',
                en: 'Overview',
                href: '/content/service/Overview',
                href_en: '/en/content/service/Overview'
            },
            {
                id: 'CNS_FIT',
                en: 'CNS_FIT',
                href: '/content/service/CNS_FIT',
                href_en: '/en/content/service/CNS_FIT'
            },
            {
                id: 'Meta_FIT',
                en: 'Meta_FIT',
                href: '/content/service/Meta_FIT',
                href_en: '/en/content/service/Meta_FIT'
            },
            {
                id: 'Onco_FIT',
                en: 'Onco_FIT',
                href: '/content/service/Onco_FIT',
                href_en: '/en/content/service/Onco_FIT'
            },
            {
                id: 'Gene_FIT',
                en: 'Gene_FIT',
                href: '/content/service/Gene_FIT',
                href_en: '/en/content/service/Gene_FIT'
            },
            {
                id: 'Tox_FIT',
                en: 'Tox_FIT',
                href: '/content/service/Tox_FIT',
                href_en: '/en/content/service/Tox_FIT'
            }
        ]
    },
    {
        id: 'AI 플랫폼',
        id_en: 'AI Platform',
        href: '/content/ai_platform/Pro_FIT',
        href_en: '/en/content/ai_platform/Pro_FIT',
        criteria: '/content/ai_platform',
        list: [
            {
                id: 'Pro:FIT AI',
                en: 'Pro:FIT AI',
                href: '/content/ai_platform/Pro_FIT',
                href_en: '/en/content/ai_platform/Pro_FIT'
            },
            {
                id: 'Re:FIT AI',
                en: 'Re:FIT AI',
                href: '/content/ai_platform/Re_FIT',
                href_en: '/en/content/ai_platform/Re_FIT'
            },
        ]
    },
];

export const communityNavList: navListType = [
    {
        id: '공지사항',
        id_en: 'Notice',
        criteria: '/notice',
        href: '/notice',
        href_en: '/en/notice',
        list: undefined
    },
    {
        id: '보도자료',
        id_en: 'News',
        criteria: '/news',
        href: '/news',
        href_en: '/en/news',
        list: undefined
    },
    {
        id: '문의하기',
        id_en: 'Contact',
        criteria: '/requests',
        href: '/requests',
        href_en: '/en/requests',
        list: undefined
    },
];