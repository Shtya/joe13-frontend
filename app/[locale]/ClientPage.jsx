'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Section1 from '@/components/pages/home/Section1';
import Section2 from '@/components/pages/home/Section2';
import Section3 from '@/components/pages/home/Section3';
import Section4 from '@/components/pages/home/Section4';
import dynamic from 'next/dynamic';

// Slides past the first four are off-screen at load: split them into their own
// chunks so they don't weigh on the initial bundle. SSR stays on so their
// content is still in the HTML for crawlers.
const Section5 = dynamic(() => import('@/components/pages/home/Section5'));
const Section6 = dynamic(() => import('@/components/pages/home/Section6'));
const Section8 = dynamic(() => import('@/components/pages/home/Section8'));
const Section9 = dynamic(() => import('@/components/pages/home/Section9'));
const Section10 = dynamic(() => import('@/components/pages/home/Section10'));
const Section11 = dynamic(() => import('@/components/pages/home/Section11'));
const Footer = dynamic(() => import('@/components/molecules/Footer'));

import { Swiper, SwiperSlide } from 'swiper/react';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import VerticalSlider, { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import { useSearchParams } from 'next/navigation';
import { usePages } from '@/hooks/usePages';
import { useLocale, useTranslations } from 'next-intl';
import { prefersReducedMotion } from '@/components/jx/motion';

const SCROLLABLE_PANEL =
    'relative z-[100] flex h-full min-h-[100svh] max-h-screen w-full flex-col overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable_both-edges]';
const SCROLLABLE_STYLE = { touchAction: 'pan-y', willChange: 'scroll-position' };

/* Slide indices of the six business units (also used by the hub & locator). */
const UNIT_SLIDES = [
    { id: 'sec5', slideIndex: 4 },
    { id: 'sec6', slideIndex: 5 },
    { id: 'sec8', slideIndex: 6 },
    { id: 'sec9', slideIndex: 7 },
    { id: 'sec10', slideIndex: 8 },
    { id: 'sec11', slideIndex: 9 },
];

export default function ClientPage({ initialData }) {
    const { loading, data } = usePages({ page_name: 'home-page', initialData });
    const t = useTranslations('Jx');
    const locale = useLocale();

    const section = id => data?.sections?.find(e => e.id == id);
    const section1 = section('sec1');
    const section2 = section('sec2');
    const section3 = section('sec3');
    const section4 = section('sec4');
    const section5 = section('sec5');
    const section6 = section('sec6');
    const section8 = section('sec8');
    const section9 = section('sec9');
    const section10 = section('sec10');
    const section11 = section('sec11');

    const unitSlides = UNIT_SLIDES.map(u => ({ data: section(u.id), slideIndex: u.slideIndex }));
    const locatorUnits = unitSlides
        .map(u => ({ slideIndex: u.slideIndex, title: u.data?.title?.[locale] || u.data?.title?.en || '' }))
        .filter(u => u.title);

    const swiperRef = useRef(null);
    const scanRef = useRef(null);
    const [active, setActive] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const { handleScrollInside } = VerticalSlider();

    const labels = useMemo(() => {
        const raw = t.raw('slides');
        return Array.isArray(raw) ? raw : undefined;
    }, [t]);
    const config = useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide, { labels });

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
        if (name === 'partners') goToSlide(2);
        if (name === 'home') goToSlide(0);
    }, [name]);

    // Pointer depth: one rAF-throttled listener feeds --jx-px / --jx-py to the
    // visible slide only (photo, glyph and logo layers read them in CSS).
    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        let frame = 0;
        let x = 0;
        let y = 0;
        const apply = () => {
            frame = 0;
            const slide = swiperRef.current?.swiper?.slides?.[swiperRef.current.swiper.activeIndex];
            if (!slide) return;
            slide.style.setProperty('--jx-px', x.toFixed(3));
            slide.style.setProperty('--jx-py', y.toFixed(3));
        };
        const onMove = e => {
            x = (e.clientX / window.innerWidth) * 2 - 1;
            y = (e.clientY / window.innerHeight) * 2 - 1;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    // Scene transition: a light band sweeps in the direction of travel.
    const sweep = direction => {
        const band = scanRef.current;
        if (!band || prefersReducedMotion()) return;
        const down = direction === 'next';
        gsap.killTweensOf(band);
        gsap.fromTo(
            band,
            { yPercent: down ? 300 : -100, opacity: 0 },
            {
                yPercent: down ? -100 : 300,
                duration: 1.05,
                ease: 'power2.inOut',
                keyframes: { opacity: [0, 1, 1, 0] },
            },
        );
    };

    return (
        <div className='jx-home bg-[#050506]'>
            <Swiper
                {...config}
                ref={swiperRef}
                className='mySwiper h-screen'
                onActiveIndexChange={swiper => setActive(swiper.activeIndex)}
                onSlideNextTransitionStart={() => sweep('next')}
                onSlidePrevTransitionStart={() => sweep('prev')}
            >
                <SwiperSlide>
                    <Section1 data={section1} loading={loading} active={active === 0} />
                </SwiperSlide>

                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section2 data={section2} loading={loading} active={active === 1} />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <Section3 data={section3} loading={loading} active={active === 2} />
                </SwiperSlide>

                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section4 data={section4} loading={loading} units={unitSlides} active={active === 3} />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <Section5 data={section5} loading={loading} active={active === 4} units={locatorUnits} slideIndex={4} />
                </SwiperSlide>
                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section6 data={section6} loading={loading} active={active === 5} units={locatorUnits} slideIndex={5} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section8 data={section8} loading={loading} active={active === 6} units={locatorUnits} slideIndex={6} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section9 data={section9} loading={loading} active={active === 7} units={locatorUnits} slideIndex={7} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section10 data={section10} loading={loading} active={active === 8} units={locatorUnits} slideIndex={8} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex items-start justify-center overflow-x-hidden'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                        <Section11 data={section11} loading={loading} active={active === 9} units={locatorUnits} slideIndex={9} />
                    </div>
                </SwiperSlide>

                <SwiperSlide className='footer-slide overflow-auto !flex flex-col'>
                    <div data-scrollable style={SCROLLABLE_STYLE} className={`${SCROLLABLE_PANEL} overflow-auto`}>
                        <Footer id={'footer2'} />
                    </div>
                </SwiperSlide>
            </Swiper>
            <div ref={scanRef} className='jx-scan' aria-hidden='true' />
            <div className='swiper-pagination hero-pagination'></div>
        </div>
    );
}
