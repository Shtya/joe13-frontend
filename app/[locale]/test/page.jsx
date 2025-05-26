'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import VerticalSlider from '@/hooks/useAboutUsSwiperConfig';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

export default function TestSwiperPage() {
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
    <div className="relative">
      <Swiper {...config} ref={swiperRef} className="mySwiper h-screen" >
        
		<SwiperSlide className="bg-blue-800 h-full flex items-center justify-center">
          <h1 className="text-3xl  ">Slide 1</h1>
        </SwiperSlide>

        <SwiperSlide className="bg-green-900 flex justify-center items-start px-10 py-10">
          <div
            data-scrollable
            className="max-h-screen overflow-auto bg-white p-6 rounded shadow w-full"
          >
            <h2 className="text-xl font-bold mb-4">Scrollable Content</h2>
            <p>
              {Array(100)
                .fill('This is a long paragraph. ')
                .join('')}
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="bg-yellow-300 flex items-center justify-center">
          <h1 className="text-3xl">Slide 3 (Last)</h1>
        </SwiperSlide>
      </Swiper>

      <div className="swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-50"></div>
    </div>
  );
}
