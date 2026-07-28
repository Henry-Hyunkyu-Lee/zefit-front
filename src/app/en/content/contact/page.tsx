'use client';

import PageHeader from '@/components/common/PageHeader';
import '../../../content/contact/style.css';
import PageBanner from '@/components/common/PageBanner';
import PageTap from '@/components/common/PageTap';
import { useEffect, useState } from 'react';
import MetaTagTitle from '@/utils/MetaTagTitle';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { isLoading } from '@/modules/loading';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

export default function ContactMap() {

    const [, setLoading] = useRecoilState(isLoading);
    const googleAppKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';
    const isMobile = useMediaQuery({ maxWidth: 1170 });

    const [location, setLocation] = useState<any>({
        lat: 0,
        lng: 0
    });

    const address = '대구광역시 서구 와룡로 307 디센터1976 지식산업센터';

    useEffect(() => {
        const geocodeAddress = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        address
                    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setLocation({ lat, lng });
                } else {
                    console.error("No results found for the address.");
                }
            } catch (error) {
                console.error("Geocoding API error:", error);
            } finally {
                setLoading(false);
            }
        };

        geocodeAddress();
    }, [address]);

    return (
        <article className='english_contact_page'>
            <MetaTagTitle title='Location' ko={false} />
            <PageHeader />
            <PageBanner pageTitle='Location' />
            <PageTap tap='company' />
            <div
                style={{ backgroundColor: '#F6F6F6' }}
                className='page_layout'>
                <section className='contact_map_page_container'>
                    <h2 className='contact_map_page_title_wrapper'>
                        Location
                    </h2>
                    <div className='map_content_wrapper'>
                        <div className='kakao_map_info_wrapper'>
                            <div className='kakao_map_box'>
                                <LoadScript
                                    language="en"
                                    googleMapsApiKey={googleAppKey}>
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '400px' }}
                                        center={location.lat !== 0 ? location : { lat: 37.7749, lng: -122.4194 }}
                                        zoom={16}>
                                        {location.lat !== 0 && <Marker position={location} />}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                            <ul className='location_info_wrapper'>
                                <li className='location_info_lane_wrapper'>
                                    <strong className='location_info_category'>
                                        Addr.
                                    </strong>
                                    <div className='location_info_content_wrapper'>
                                        <span className='info_sub_title'>
                                            Headquarters
                                        </span>
                                        <p className='info_text compact_address'>
                                            #422, D-center1976, 307 Waryong-ro, Seo-gu, Daegu, <span className='address_no_wrap'>Republic of Korea</span>
                                        </p>
                                        <span
                                            style={{ marginTop: (isMobile) ? '10px' : '24px' }}
                                            className='info_sub_title'>
                                            Corporate Research Institute
                                        </span>
                                        <p className='info_text compact_address'>
                                            #424, D-center1976, 307 Waryong-ro, Seo-gu, Daegu, <span className='address_no_wrap'>Republic of Korea</span>
                                        </p>
                                        <span
                                            style={{ marginTop: (isMobile) ? '10px' : '24px' }}
                                            className='info_sub_title'>
                                            Corporate Research Institute&nbsp;&nbsp;– Jeonbuk
                                        </span>
                                        <p className='info_text'>
                                            #209, 13-6 Iksan-daero 78-gil, Hamyeol-eup, Iksan-si, <span className='address_no_wrap'>Jeonbuk-do</span>, <span className='address_no_wrap'>Republic of Korea</span>
                                        </p>
                                    </div>
                                </li>
                                <li className='location_info_lane_wrapper'>
                                    <strong className='location_info_category'>
                                        Tel.
                                    </strong>
                                    <p className='info_text'>
                                        +82-53-716-0816
                                    </p>
                                </li>
                                <li className='location_info_lane_wrapper'>
                                    <strong className='location_info_category'>
                                        Fax
                                    </strong>
                                    <p className='info_text'>
                                        +82-53-719-0654
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 반영안 */}
                    {/* <ul className='come_way_wrapper'>
                        <li className='come_way_columns_lane'>
                            <h3
                                style={{ backgroundColor: '#fb5852' }}
                                className='come_way_columns_lane_title'>
                                By Bus
                            </h3>
                            <div className='come_way_columns_lane_content_wrapper'>
                                <p className='come_way_columns_lane_content'>
                                    Daegu Medical Center Raphael Wellness Center
                                </p>
                                <p className='come_way_content_plus'>
                                    <b style={{ color: '#3cc344', fontWeight: '700' }}>
                                        West1
                                    </b>&nbsp;
                                    <b style={{ color: '#fb5852', fontWeight: '700' }}>
                                        Express1
                                    </b>&nbsp;
                                    <b style={{ color: '#fb5852', fontWeight: '700' }}>
                                        Express8
                                    </b>&nbsp;
                                    Get off after boarding
                                </p>
                            </div>
                            <div className='come_way_columns_lane_content_wrapper'>
                                <p className='come_way_columns_lane_content'>
                                    Across from Daegu Medical Center Raphael Wellness Center
                                </p>
                                <p className='come_way_content_plus'>
                                    <b style={{ color: '#3cc344', fontWeight: '700' }}>
                                        West1-1
                                    </b>&nbsp;
                                    <b style={{ color: '#fb5852', fontWeight: '700' }}>
                                        Express1
                                    </b>&nbsp;
                                    <b style={{ color: '#fb5852', fontWeight: '700' }}>
                                        Express8
                                    </b>&nbsp;
                                    Get off after boarding
                                </p>
                            </div>
                        </li>
                        <li className='come_way_columns_lane'>
                            <h3
                                style={{ backgroundColor: '#3cb44a' }}
                                className='come_way_columns_lane_title'>
                                By Subway
                            </h3>
                            <div className='come_way_columns_lane_content_wrapper'>
                                <p className='come_way_columns_lane_content'>
                                    <b style={{ color: '#3cb44a', fontWeight: '800' }}>
                                        Jukjeon Station(Daegu Line 2)
                                    </b><br />
                                    a 17-minute walk after getting off
                                </p>
                            </div>
                        </li>
                        <li className='come_way_columns_lane'>
                            <h3
                                style={{ backgroundColor: '#EB9A28' }}
                                className='come_way_columns_lane_title'>
                                By Car
                            </h3>
                            <div className='come_way_columns_lane_content_wrapper'>
                                <p className='come_way_columns_lane_content'>
                                    Parking available in the center
                                </p>
                            </div>
                        </li>
                    </ul> */}
                    
                </section>
            </div>
        </article>
    )
};
