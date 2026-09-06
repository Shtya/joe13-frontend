'use client';
import React, { useRef , useState , useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import Footer from '@/components/molecules/Footer';
import AboutHero from '@/components/pages/aboutus/AboutHero';
import AboutVision from '@/components/pages/aboutus/AboutVision';
import AboutMission from '@/components/pages/aboutus/AboutMission';

import VerticalSlider from '@/hooks/useAboutUsSwiperConfig';
import { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import { usePages } from '@/hooks/usePages';
import Board from '@/components/pages/aboutus/Board';


export default function Page({ initialData }) {
    const { loading , data } = usePages({ page_name: 'about-us', initialData });
    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const section2 = data?.sections?.find(e => e.id == 'sec2');
    const section3 = data?.sections?.find(e => e.id == 'sec3');


    const swiperRef = useRef(null);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const { handleScrollInside } = VerticalSlider();

    const config = useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide);

    useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
        handleScrollInside(swiperRef.current.swiper);
    }
    }, []);
  
   

    return (
        <div>
            <Swiper {...config} ref={swiperRef} className='mySwiper h-screen'>
                <SwiperSlide>  <AboutHero data={section1} loading={loading} /> </SwiperSlide>
                

                <SwiperSlide className='!flex h-full items-stretch overflow-hidden'>
                    <div className='z-[100] h-full max-h-screen w-full overflow-hidden'>
                        <Board />
                    </div>
                </SwiperSlide>


                <SwiperSlide> <AboutVision loading={loading} data={section2} /> </SwiperSlide>
                <SwiperSlide> <AboutMission loading={loading} data={section3} /> </SwiperSlide>

                <SwiperSlide className='footer-slide overflow-auto !flex flex-col'>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position' }} className='z-[100] max-h-screen min-h-screen w-full overflow-auto'>
                        <Footer id={'footer2'} />
                    </div>
                </SwiperSlide>

            </Swiper>

            <div className='swiper-pagination hero-pagination'></div>
        </div>
    );
}


