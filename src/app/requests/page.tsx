'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import './style.css';
import { useEffect, useState } from "react";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { onClickRequestsHandler } from "@/utils/AddDataHandler";
import { isLoading } from "@/modules/loading";
import { useRecoilState } from "recoil";

export default function Requests() {

    const [, setLoading] = useRecoilState(isLoading);
    const [provisionData, setProvisionData] = useState<any>(null);
    const [requestsInput, setRequestsInput] = useState<any>({
        name: null,
        email: null,
        company: null,
        title: null,
        content: null
    });
    const [check, setCheck] = useState<{
        personal: boolean,
        use: boolean
    }>({
        personal: false,
        use: false
    });
    const { name, email, company, title, content } = requestsInput;
    const { personal, use } = check;

    const onClickCheckHandler = (e: any, param: string) => {
        e.preventDefault();
        if (param === 'personal') return setCheck({ ...check, personal: !personal });
        if (param === 'use') return setCheck({ ...check, use: !use });
        if (param === 'all') {
            if (!personal || !use) return setCheck({ ...check, personal: true, use: true });
            if (personal && use) return setCheck({ ...check, personal: false, use: false });
        };
    };

    const onChangeRequestsHandler = (e: any) => {
        const { name, value } = e.target;
        setRequestsInput({
            ...requestsInput,
            [name]: value
        });
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        if (!personal || !use) return;
        onClickRequestsHandler(e, requestsInput, 'ko');
    };

    useEffect(() => {
        fetch('/api/inquiry/requests/provision')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setProvisionData(jsonData);
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <article>
            <MetaTagTitle title='문의하기' />
            <PageHeader />
            <PageBanner pageTitle='문의하기' />
            <PageTap tap='requests' />
            <section className='requests_page_layout'>
                <img
                    className='requests_page_background_image'
                    src='https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_bg.jpg'
                    alt='문의하기 배경 이미지' />
                <div className='background_color_wrapper'>
                    <h2 className='requests_title'>
                        contact us
                        <div className='requests_title_under_bar' />
                    </h2>
                    <form
                        onSubmit={onSubmitHandler}
                        className='requests_form_content_wrapper'>
                        <div className='requests_lane_wrapper'>
                            <div className='requests_input_wrapper'>
                                <label className='requests_input_label'>
                                    담당자명*
                                </label>
                                <div className='requests_input_box'>
                                    <input
                                        name="name"
                                        value={name}
                                        className='requests_input'
                                        placeholder='이름'
                                        onChange={onChangeRequestsHandler} />
                                </div>
                            </div>
                            <div className='requests_input_wrapper'>
                                <label className='requests_input_label'>
                                    이메일*
                                </label>
                                <div className='requests_input_box'>
                                    <input
                                        name="email"
                                        value={email}
                                        className='requests_input'
                                        placeholder='이메일'
                                        onChange={onChangeRequestsHandler} />
                                </div>
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                회사명(부서/직책)*
                            </label>
                            <div className='requests_input_box'>
                                <input
                                    name="company"
                                    value={company}
                                    className='requests_input'
                                    placeholder='회사명(부서/직책)'
                                    onChange={onChangeRequestsHandler} />
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                문의제목*
                            </label>
                            <div className='requests_input_box'>
                                <input
                                    name="title"
                                    value={title}
                                    className='requests_input'
                                    placeholder='제목'
                                    onChange={onChangeRequestsHandler} />
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                문의내용*
                            </label>
                            <textarea
                                name="content"
                                value={content}
                                className='requests_textarea'
                                placeholder='이곳에 문의할 내용을 입력해주세요.'
                                onChange={onChangeRequestsHandler} />
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                <i className='icon-check'></i>
                                개인정보 처리방침
                            </label>
                            <textarea
                                readOnly
                                className='check_textarea_box'
                                value={provisionData?.privacy}>
                            </textarea>
                            <button
                                style={{
                                    color: (personal) ? '#333333' : ''
                                }}
                                onClick={(e) => onClickCheckHandler(e, 'personal')}
                                className='check_box_button'>
                                <span
                                    style={{
                                        backgroundColor: (personal) ? '#3a8afd' : 'white'
                                    }}
                                    className='check_box'>
                                    {(personal) && '✔'}
                                </span>
                                개인정보취급방침 내용을 읽었으며 귀하의 개인정보를 수집, 이용하는 것에 동의합니다.
                            </button>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                <i className='icon-check'></i>
                                홈페이지 이용약관
                            </label>
                            <textarea
                                readOnly
                                className='check_textarea_box'
                                value={provisionData?.use}>
                            </textarea>
                            <button
                                style={{
                                    color: (use) ? '#333333' : ''
                                }}
                                onClick={(e) => onClickCheckHandler(e, 'use')}
                                className='check_box_button'>
                                <span
                                    style={{
                                        backgroundColor: (use) ? '#3a8afd' : 'white'
                                    }}
                                    className='check_box'>
                                    {(use) && '✔'}
                                </span>
                                홈페이지 이용약관에 동의합니다.
                            </button>
                        </div>
                        <button
                            style={{
                                color: (personal && use) ? '#333333' : ''
                            }}
                            onClick={(e) => onClickCheckHandler(e, 'all')}
                            className='check_box_button'>
                            <span
                                style={{
                                    backgroundColor: (personal && use) ? '#3a8afd' : 'white'
                                }}
                                className='check_box'>
                                {(personal && use) && '✔'}
                            </span>
                            전체 약관에 동의합니다.
                        </button>
                        <button
                            style={{
                                backgroundColor: (!personal || !use) ? '#b8b8b8' : '#275F97'
                            }}
                            className='requests_button'
                            onClick={onSubmitHandler}>
                            문의하기
                        </button>
                    </form>
                </div>
            </section>
        </article>
    )
};