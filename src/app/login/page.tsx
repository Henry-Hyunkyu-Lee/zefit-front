'use client';

import { useState } from 'react';
import './style.css';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/Supabase';

export default function Login() {

    const router = useRouter();

    const zefitId = process.env.NEXT_PUBLIC_MANAGER_ID;
    const zefitPassword = process.env.NEXT_PUBLIC_MANAGER_PASSWORD;

    const [autoLogin, setAutoLogin] = useState<boolean>(false);
    const [login, setLogin] = useState<any>({
        id: '',
        password: ''
    });
    const { id, password } = login;

    const onChangeLoginHandler = (e: any) => {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    };

    const onSubmitLoginHandler = async (e: any) => {
        e.preventDefault();
        if ((id === zefitId) && (password === zefitPassword)) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: 'someone@email.com',
                    password: 'scFgykcvhhUmghhJoPMt'
                })

                if (error) {
                    throw error;
                };

                console.log(data);
                alert('로그인에 성공하였습니다.');
                // 현재 날짜와 시간을 쿠키에 저장
                const now = new Date();
                const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 하루 후 만료
                document.cookie = `lastLogin=${now.toISOString()}; expires=${expirationDate.toUTCString()}; path=/`;
                router.push('/adm');
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            };
        } else {
            alert('아이디 혹은 비밀번호 정보가 일치하지 않습니다.\n다시 입력해주십시오.');
        };
    };

    const onClickAutoLoginHandler = (e: any) => {
        e.preventDefault();
        if (!autoLogin) {
            const result = confirm('예?');
            if (result) setAutoLogin(true);
        } else {
            setAutoLogin(false);
        };
    };

    return (
        <article className='login_layout'>
            <MetaTagTitle title='로그인' />
            <a
                href='/'
                className='login_logo_box'>
                <img
                    className='login_logo'
                    src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_logo-dark.png' />
            </a>
            <form
                onSubmit={onSubmitLoginHandler}
                className='login_form_container'>
                <h1 className='login_form_title'>
                    관리자 로그인
                </h1>
                <fieldset className='login_field'>
                    <label className='login_input_label'>
                        <input
                            className='login_input'
                            type='text'
                            name='id'
                            value={id}
                            onChange={onChangeLoginHandler}
                            placeholder='아이디'
                            required />
                    </label>
                    <label className='login_input_label'>
                        <input
                            className='login_input'
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChangeLoginHandler}
                            placeholder='비밀번호'
                            required />
                    </label>
                    <button
                        typeof='submit'
                        onClick={onSubmitLoginHandler}
                        className='login_button'>
                        로그인
                    </button>
                    <div className='auto_login_wrapper'>
                        <button
                            onClick={onClickAutoLoginHandler}
                            className='auto_login_button'>
                            <i
                                style={{
                                    backgroundColor: (autoLogin) ? '#3a8afd' : '#fff',
                                    color: (autoLogin) ? '#fff' : 'inherif'
                                }}
                                className='auto_login_checkbox'>
                                {(autoLogin) && '✔'}
                            </i>
                            자동로그인
                        </button>
                    </div>
                </fieldset>
            </form>
        </article>
    )
};