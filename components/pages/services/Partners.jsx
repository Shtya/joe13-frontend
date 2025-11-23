
"use client"
import Title from '@/components/atoms/Title';
import { baseImage } from '@/helpers/baseUrl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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

export default function Partners({  loading = false , data  , locale }) {
    const t = useTranslations()
   

    return (
        <div className="py-[70px]" >
            <div  data-aos="zoom-out"  > <Title title={t("Our Partners")} cn={' text-xl md:text-3xl font-[600]  text-white text-center  '} /> </div>

            <Slider {...settings} className='w-full  !mt-[30px]'>
                {data?.map((e, i) => (
                    <div key={i} data-aos="zoom-out"  className='w-[100px] h-[80px]  max-md:h-[40px] '>
                        <Image src={baseImage(e.url)} alt={e.alt} width={80} height={80} className='mx-auto h-full w-[80px] max-md:w-[60px] object-contain' />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
