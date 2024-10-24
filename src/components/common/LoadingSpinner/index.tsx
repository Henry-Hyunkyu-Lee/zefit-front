'use client';

import { isLoading } from '@/modules/loading';
import './style.css';
import { useRecoilValue } from 'recoil';

export default function Loading() {

    const loading = useRecoilValue(isLoading);

    return (
        <section
            style={{ display: (loading) ? 'flex' : 'none' }}
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