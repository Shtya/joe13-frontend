'use client';
import { useState, useEffect, useRef } from 'react';
import Section1 from '@/components/pages/home/Section1';
import Section2 from '@/components/pages/home/Section2';
import Section3 from '@/components/pages/home/Section3';
import Section4 from '@/components/pages/home/Section4';
import Section5 from '@/components/pages/home/Section5';
import Section6 from '@/components/pages/home/Section6';
import Section8 from '@/components/pages/home/Section8';
import Section9 from '@/components/pages/home/Section9';
import Section10 from '@/components/pages/home/Section10';
import Section11 from '@/components/pages/home/Section11';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import VerticalSlider, { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/molecules/Footer';
import { usePages } from '@/hooks/usePages';

export default function ClientPage({ initialData }) {
    const {loading , data} = usePages({page_name : "home-page", initialData})

    const section1 = data?.sections?.find(e => e.id == "sec1")
    const section2 = data?.sections?.find(e => e.id == "sec2")
    const section3 = data?.sections?.find(e => e.id == "sec3")
    const section4 = data?.sections?.find(e => e.id == "sec4")
    const section5 = data?.sections?.find(e => e.id == "sec5")
    const section6 = data?.sections?.find(e => e.id == "sec6")
    const section8 = data?.sections?.find(e => e.id == "sec8")
    const section9 = data?.sections?.find(e => e.id == "sec9")
    const section10 = data?.sections?.find(e => e.id == "sec10")
    const section11 = data?.sections?.find(e => e.id == "sec11")
 
    const swiperRef = useRef(null);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const { handleScrollInside } = VerticalSlider();

    const config = useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            handleScrollInside(swiperRef.current.swiper);
        }
    }, []);


    const searchParams = useSearchParams();
    const name = searchParams.get('section');

    const goToSlide = index => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };

    useEffect(() => {
        if (name === 'partners')  goToSlide(2);
        if (name === 'home')  goToSlide(0);
    }, [name]);


    return (
        <div className='bg-black'>
            <Swiper {...config} ref={swiperRef} className='mySwiper h-screen'>
                <SwiperSlide> <Section1 data={section1} loading={loading} /> </SwiperSlide>

                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position', }} className='z-[100] max-h-screen w-full overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable_both-edges]'>
                        <Section2  data={section2} loading={loading} />
                    </div> 
                </SwiperSlide>


                <SwiperSlide> <Section3 data={section3} loading={loading} /> </SwiperSlide>
                <SwiperSlide>
                    <Section4
                        data={section4}
                        loading={loading}
                        units={[
                            { data: section5, slideIndex: 4 },
                            { data: section6, slideIndex: 5 },
                            { data: section8, slideIndex: 6 },
                            { data: section9, slideIndex: 7 },
                            { data: section10, slideIndex: 8 },
                            { data: section11, slideIndex: 9 },
                        ]}
                    />
                </SwiperSlide>

                <SwiperSlide> <Section5 data={section5} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section6 data={section6} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section8 data={section8} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section9 data={section9} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section10 data={section10} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section11 data={section11} loading={loading} /> </SwiperSlide>
                
                <SwiperSlide className='footer-slide overflow-auto !flex flex-col'>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position' }} className='z-[100] max-h-screen w-full overflow-auto'>
                         <Footer id={'footer2'} /> 
                    </div> 
                </SwiperSlide>
            </Swiper>
            <div className='swiper-pagination hero-pagination'></div>
        </div>
    );
}



/*
 
img={`/assets/imgs/section9.png`} title={t('Manpower & HR Solutions')} description={t('section9')}  
img={`/assets/imgs/section10.png`} title={t('Merchandising, Activation and Event Management')} description={t('section10')}  
img={`/assets/imgs/section11.png`} title={t('Our Products')} description={t('section11')} list={data11} 

*/
