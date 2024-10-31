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
        id: '서비스',
        id_en: 'Service',
        href: '/content/service/CNS_FIT',
        href_en: '/en/content/service/CNS_FIT',
        criteria: '/content/service',
        list: [
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
                id: 'Toxicology',
                en: 'Toxicology',
                href: '/content/service/Toxicology',
                href_en: '/en/content/service/Toxicology'
            }
        ]
    },
    {
        id: '신약개발',
        id_en: 'Drug Discovery',
        href: '/content/development/pharmaceuticals',
        href_en: '/en/content/development/pharmaceuticals',
        criteria: '/content/development',
        list: [
            {
                id: '신약개발기술',
                en: 'technology',
                href: '/content/development/pharmaceuticals',
                href_en: '/en/content/development/pharmaceuticals'
            },
            {
                id: '파이프라인',
                en: 'pipeline',
                href: '/content/development/pipeline',
                href_en: '/en/content/development/pipeline'
            },
            {
                id: '오픈 이노베이션',
                en: 'open_innovation',
                href: '/content/development/open_innovation',
                href_en: '/en/content/development/open_innovation'
            }
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
];