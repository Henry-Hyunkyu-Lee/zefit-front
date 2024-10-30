'use client';

import PageBanner from "@/components/common/PageBanner";
import PageHeader from "@/components/common/PageHeader";
import PageTap from "@/components/common/PageTap";
import '../../requests/style.css';
import { useEffect, useState } from "react";
import MetaTagTitle from "@/utils/MetaTagTitle";
import { onClickRequestsHandler } from "@/utils/AddDataHandler";

export default function RequestsEN() {

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
    console.log('문의 데이터', requestsInput);

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
        onClickRequestsHandler(e, { ...requestsInput, status: personal && use }, 'en');
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
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    return (
        <article>
            <MetaTagTitle title='Contact Us' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Contact Us' />
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
                    <form className='requests_form_content_wrapper'>
                        <div className='requests_lane_wrapper'>
                            <div className='requests_input_wrapper'>
                                <label className='requests_input_label'>
                                    RESPONSIBILITY*
                                </label>
                                <div className='requests_input_box'>
                                    <input
                                        name='name'
                                        value={name}
                                        className='requests_input'
                                        placeholder='Responsibility'
                                        onChange={onChangeRequestsHandler} />
                                </div>
                            </div>
                            <div className='requests_input_wrapper'>
                                <label className='requests_input_label'>
                                    EMAIL*
                                </label>
                                <div className='requests_input_box'>
                                    <input
                                        name='email'
                                        value={email}
                                        className='requests_input'
                                        placeholder='Email'
                                        onChange={onChangeRequestsHandler} />
                                </div>
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                COMPANY NAME*
                            </label>
                            <div className='requests_input_box'>
                                <input
                                    name='company'
                                    value={company}
                                    className='requests_input'
                                    placeholder='Company Name'
                                    onChange={onChangeRequestsHandler} />
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                INQUIRY TITLE*
                            </label>
                            <div className='requests_input_box'>
                                <input
                                    name='title'
                                    value={title}
                                    className='requests_input'
                                    placeholder='Title'
                                    onChange={onChangeRequestsHandler} />
                            </div>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                CONTENT OF INQUIRY*
                            </label>
                            <textarea
                                name='content'
                                value={content}
                                className='requests_textarea'
                                placeholder='Please enter the content you want to inquire about here.'
                                onChange={onChangeRequestsHandler} />
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                <i className='icon-check'></i>
                                PRIVACY POLICY
                            </label>
                            <textarea
                                readOnly
                                className='check_textarea_box'
                                value={provisionData?.privacy_en}>
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
                                I have read the privacy policy and agree to the collection and use of your personal information.
                            </button>
                        </div>
                        <div className='requests_input_wrapper'>
                            <label className='requests_input_label'>
                                <i className='icon-check'></i>
                                WEBSITE TERMS OF USE
                            </label>
                            <textarea
                                readOnly
                                className='check_textarea_box'
                                value={provisionData?.use_en}>
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
                                I agree to the website terms and conditions.
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
                            I agree to all terms.
                        </button>
                        <button
                            style={{
                                backgroundColor: (!personal || !use) ? '#b8b8b8' : '#275F97',
                                cursor: (!personal || !use) ? 'default' : 'pointer'
                            }}
                            className='requests_button'
                            onClick={onSubmitHandler}>
                            Inquire
                        </button>
                    </form>
                </div>
            </section>
        </article>
    )
};