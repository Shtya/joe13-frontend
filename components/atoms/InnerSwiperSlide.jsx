import { SwiperSlide } from 'swiper/react';
import React from 'react';

export default function InnerSwiperSlide({ children }) {
    return (
        <SwiperSlide className='flex justify-center items-start'>
            <div
                data-scrollable
                style={{
                    backgroundColor: 'rgba(255,255,255,0.001)', // transparent fix
                    touchAction: 'pan-y',
                    willChange: 'scroll-position',
                }}
                className='bg-white/0 z-[100] max-h-screen overflow-auto p-6 rounded shadow w-full'>
                {children}
            </div>
        </SwiperSlide>
    );
}
