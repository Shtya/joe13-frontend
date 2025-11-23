'use client';
import { useState, useEffect, useRef } from 'react';
import Section1 from '@/components/pages/home/Section1';
import Section2 from '@/components/pages/home/Section2';
import Section3 from '@/components/pages/home/Section3';
import Section4 from '@/components/pages/home/Section4';
import TextCopy from '@/components/pages/home/TextCopy';

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

export default function ClientPage() {
    const {loading , data} = usePages({page_name : "home-page"})

    const section1 = data?.sections?.find(e => e.id == "sec1")
    const section2 = data?.sections?.find(e => e.id == "sec2")
    const section3 = data?.sections?.find(e => e.id == "sec3")
    const section4 = data?.sections?.find(e => e.id == "sec4")
    const section5 = data?.sections?.find(e => e.id == "sec5")
    const section6 = data?.sections?.find(e => e.id == "sec6")
    const section7 = data?.sections?.find(e => e.id == "sec7")
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

    useEffect(() => {
        const ele = document.querySelectorAll('.swiper-pagination-bullet');
        if (isLastSlide)
            if (ele)
                ele.forEach(element => {
                    element.classList.add('black');
                });
            else if (ele)
                ele.forEach(element => {
                    element.classList?.remove('black');
                });
    }, [isLastSlide]);


    return (
        <div className='bg-black'>
            <Swiper {...config} ref={swiperRef} className='mySwiper h-screen'>
                <SwiperSlide> <Section1 data={section1} loading={loading} /> </SwiperSlide>

                <SwiperSlide className='  flex justify-center items-start '>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position', }} className='bg-white/0 z-[100] max-h-screen overflow-auto  rounded shadow w-full'>
                        <Section2  data={section2} loading={loading} />
                    </div> 
                </SwiperSlide>


                <SwiperSlide> <Section3 data={section3} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <Section4 data={section4} loading={loading} /> </SwiperSlide>

                <SwiperSlide> <TextCopy data={section5} loading={loading} grid={2}  /> </SwiperSlide>
                <SwiperSlide> <TextCopy data={section6} loading={loading}  /> </SwiperSlide>
                <SwiperSlide> <TextCopy icon={'/assets/imgs/logo2.png'} data={section7} loading={loading}  /> </SwiperSlide>
                <SwiperSlide> <TextCopy data={section8} loading={loading}  /> </SwiperSlide>
                <SwiperSlide> <TextCopy data={section9} loading={loading}  /> </SwiperSlide>
                <SwiperSlide> <TextCopy data={section10} loading={loading} /> </SwiperSlide>
                <SwiperSlide> <TextCopy data={section11} loading={loading} /> </SwiperSlide>
                
                <SwiperSlide className='footer-slide overflow-auto py-[80px] bg-white !flex flex-col justify-center items-center '>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position', }} className='bg-white/0 z-[100] bg-white max-h-screen overflow-auto  rounded  w-full'>
                         <Footer cn={"px-[50px]"} id={'footer2'} /> 
                    </div> 
                </SwiperSlide>
            </Swiper>
            <div className='swiper-pagination'></div>
        </div>
    );
}



/*
 
img={`/assets/imgs/section9.png`} title={t('Manpower & HR Solutions')} description={t('section9')}  
img={`/assets/imgs/section10.png`} title={t('Merchandising, Activation and Event Management')} description={t('section10')}  
img={`/assets/imgs/section11.png`} title={t('Our Products')} description={t('section11')} list={data11} 

*/
