'use client';

import Title from '@/components/atoms/Title';
import { baseImage } from '@/helpers/baseUrl';
import EffectFixed from '@/helpers/EffectFixed';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 3000,
    autoplaySpeed: 0,
    autoplay: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: 'linear',
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 2,
    gap: 20,
    slidesPerRow: 1,
    responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 830,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function Section3({ data, loading }) {
    const locale = useLocale();

    return (
        <EffectFixed id='ourPartners' loading={loading} image={baseImage(data?.image.url)} alt={data?.image?.alt} z={'z-[-150]'}>
            <Title title={data?.title?.[locale]} cn={' text-[40px] max-md:text-[24px] font-[600]  text-white text-center  '} />

            <Slider {...settings} className='w-full  !mt-[30px]'>
                {data?.list?.map((e, i) => (
                    <div key={i} className='w-[100px] h-[80px]'>
                        <Image src={baseImage(e.url)} alt={e.alt} width={80} height={80} className='mx-auto h-full w-[80px] object-contain' />
                    </div>
                ))}
            </Slider>
        </EffectFixed>
    );
}
