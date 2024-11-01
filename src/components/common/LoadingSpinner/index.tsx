'use client';

import { isLoading } from '@/modules/loading';
import './style.css';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';

export default function Loading() {

    const loadRef = useRef<HTMLDivElement>(null);

    const loading = useRecoilValue(isLoading);

    useEffect(() => {
        if (!loadRef.current) return;

        if (loading) {
            loadRef.current.style.display = 'flex';

            setTimeout(() => {
                if (!loadRef.current) return;
                loadRef.current.style.opacity = '1';
            }, 20);
        } else {
            if (!loadRef.current) return;
            loadRef.current.style.opacity = '0';

            setTimeout(() => {
                if (!loadRef.current) return;
                loadRef.current.style.display = 'none';
            }, 300);
        }
    }, [loading]);

    return (
        <section
            ref={loadRef}
            className='loading_container'>
            <div className='loading_spinner_box'>
                <div className='loading_spinner_circle' />
                <div className='loading_spinner_circle' />
                <div className='loading_spinner_circle' />
                <div className='loading_spinner_shadow' />
                <div className='loading_spinner_shadow' />
                <div className='loading_spinner_shadow' />
            </div>
        </section>
    )
};