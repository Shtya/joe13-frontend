'use client';
import { baseImage } from '@/helpers/baseUrl';
import { useTeamMemeberData } from '@/hooks/useTeamMemeber';
import { useLocale, useTranslations } from 'next-intl';

import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ChevronUp, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';



export default function Board() {
    const { data, loading } = useTeamMemeberData();
    const locale = useLocale();
	const t = useTranslations()

    const NextArrow = ({ onClick }) => (
        <div className='hover:scale-[.95] to-white/30 !rounded-[10px] duration-300 rotate-[-180deg] w-[40px] h-[40px] btn-blue-3d flex items-center justify-center absolute z-10 left-[calc(50%-65px)] bottom-[-50px] transform  cursor-pointer' onClick={onClick}>
            <ArrowRight size={24} className='text-white' />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div className='hover:scale-[.95] to-white/30 !rounded-[10px] duration-300 rotate-[-180deg] w-[40px] h-[40px] btn-blue-3d flex items-center justify-center absolute z-10 left-[calc(50%-10px)]  bottom-[-50px] transform  cursor-pointer' onClick={onClick}>
            <ArrowLeft size={24} className='text-white' />
        </div>
    );

	const settings = {
    arrows: true,
	nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    cssEase: 'linear',
    slidesToShow: 2,
    slidesToScroll: 1,
    slidesPerRow: 1,
    responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 830,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

    return (
        <section className=' h-screen flex flex-col justify-center  text-center'>
            {/* <img className=' z-[1] w-full h-screen fixed top-0 object-contain  ' src={"/assets/aboutus/1.png"} alt={""} /> */}
            <div className=' z-[2] absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-black/10 to-black/20 z-10'></div>


			<div className="container z-[10] ">
				<h2 className='text-2xl md:text-3xl font-bold text-white mb-2'> {t("MEET OUR TEAM")} </h2>
				<div className='w-20 h-1 bg-gray-300 mx-auto mb-[20px] lg:mb-10' />

				<Slider {...settings} className='w-full p-[0_60px_0_20px] my-slider-partners '>
					{data?.data
						?.sort((a, b) => b.order - a.order)
						?.map((member, idx) => (
							<div key={idx} className={` !to-white/5 btn-blue-3d bg-white/20 rounded-[10px] shadow-md p-[10px] flex flex-col items-center `}>
								<div className=' aspect-square w-full shadow-lg bg-white   rounded-[10px] overflow-hidden mb-4'>
									<img src={baseImage(member.image_url)} alt={member.image_alt} width={128} height={128} className=' p-[2px] rounded-[10px] object-contain  w-full h-full' />
								</div>
								<h3 className='text-lg font-semibold text-white '>{member.name?.[locale]}</h3>
								<p className='text-sm text-white/70 mb-4'>{member.position?.[locale]}</p>
								<ShowMore member={member} />
							</div>
						))}
				</Slider>

			</div>
        </section>
    );
}
function ShowMore({ member }) {
    const locale = useLocale();
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    const toggleExpanded = () => setExpanded(prev => !prev);

    useEffect(() => {
        const checkOverflow = () => {
            const el = textRef.current;
            if (el) {
                setIsOverflowing(el.scrollHeight > el.offsetHeight + 1); // offsetHeight helps account for padding
            }
        };

        checkOverflow();

        // Listen for font load or layout changes if needed
        const resizeObserver = new ResizeObserver(checkOverflow);
        if (textRef.current) {
            resizeObserver.observe(textRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [member.bio?.[locale]]); // Rerun when bio or locale changes

    return (
        <div className="text-white relative">
            <p
                ref={textRef}
                className={`text-sm text-white/60 mb-2 ltr:pr-[30px] rtl:pl-[30px] transition-all duration-300 ease-in-out overflow-hidden ${
                    expanded ? 'max-h-[800px]' : 'max-h-[20px]'
                }`}
            >
                {member.bio?.[locale]}
            </p>

            {isOverflowing && (
                <button
                    onClick={toggleExpanded}
                    className="absolute top-1/2 -translate-y-1/2 ltr:right-0 rtl:left-0 btn-blue-3d w-[25px] h-[25px] rounded-[10px] flex items-center justify-center text-white"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            )}
        </div>
    );
}