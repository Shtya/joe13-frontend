'use client';
import React, { useRef , useState , useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import Footer from '@/components/molecules/Footer';
import Section from '@/components/molecules/Section';

import VerticalSlider from '@/hooks/useAboutUsSwiperConfig';
import { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import { usePages } from '@/hooks/usePages';
import Board from '@/components/pages/aboutus/Board';


export default function Page() {
    const { loading , data } = usePages({ page_name: 'about-us' });
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
                <SwiperSlide>  <Section opacity_overly={.1} data={section1} loading={loading} /> </SwiperSlide>
                

                <SwiperSlide className='  flex justify-center items-start '>
                    <div data-scrollable style={{ backgroundColor: 'rgba(255,255,255,0.001)', touchAction: 'pan-y', willChange: 'scroll-position', }} className='bg-white/0 z-[100] max-h-screen overflow-auto  rounded shadow w-full'>
                        {/* <BoardMembers  />  */}
                        <Board />
                    </div>
                </SwiperSlide>


                <SwiperSlide> <Section bg_cover={true} loading={loading} data={section2} /> </SwiperSlide>
                <SwiperSlide> <Section bg_cover={true} loading={loading} data={section3} /> </SwiperSlide>

                <SwiperSlide className="  flex justify-center items-start ">
                    <div data-scrollable className=" grid items-center max-h-screen min-h-screen overflow-auto  bg-[#ffffff] p-6 rounded shadow w-full" >
                        <Footer id={'footer2'} cn={"w-full"} /> 
                    </div>
                </SwiperSlide>

            </Swiper>

            <div className='swiper-pagination'></div>
        </div>
    );
}


