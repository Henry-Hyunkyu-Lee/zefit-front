'use client';

import Loading from '@/components/common/LoadingSpinner';
import '@/styles/not-found.css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFoundError() {

    const path = usePathname() as string;

    useEffect(() => {
        const isEng = path?.includes('/en');
        window.location.href = (isEng) ? '/en' : '/';
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100dvh',
                backgroundColor: 'white',
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '30'
            }}>
            <Loading />
        </div>
    )
};