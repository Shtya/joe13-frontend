'use client';

import { prefersReducedMotion } from '@/components/jx/motion';
import VerticalSlider, { useAboutUsSwiperConfig } from '@/hooks/useAboutUsSwiperConfig';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

const SCROLLABLE_PANEL =
    'relative z-[100] flex h-full min-h-[100svh] max-h-screen w-full flex-col overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable_both-edges]';
const SCROLLABLE_STYLE = { touchAction: 'pan-y', willChange: 'scroll-position' };

/*
 * JxSlider — the full-screen scene slider used by the home and About pages.
 * Same engine everywhere: Swiper creative transition, the named vertical
 * rail (.jx-home styles), a silver scan band in the travel direction, and
 * pointer depth (--jx-px / --jx-py) on the visible slide.
 *
 * slides: [{ key, render: active => node, scrollable?: boolean, className?: string }]
 */
export default function JxSlider({ slides, labels }) {
    const swiperRef = useRef(null);
    const scanRef = useRef(null);
    const [active, setActive] = useState(0);
    const [, setIsLastSlide] = useState(false);
    const { handleScrollInside } = VerticalSlider();
    const config = useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide, { labels });

    useEffect(() => {
        if (swiperRef.current?.swiper) handleScrollInside(swiperRef.current.swiper);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return undefined;
        let frame = 0;
        let x = 0;
        let y = 0;
        const apply = () => {
            frame = 0;
            const s = swiperRef.current?.swiper;
            const slide = s?.slides?.[s.activeIndex];
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

    const sweep = direction => {
        const band = scanRef.current;
        if (!band || prefersReducedMotion()) return;
        const down = direction === 'next';
        gsap.killTweensOf(band);
        gsap.fromTo(
            band,
            { yPercent: down ? 300 : -100, opacity: 0 },
            { yPercent: down ? -100 : 300, duration: 1.05, ease: 'power2.inOut', keyframes: { opacity: [0, 1, 1, 0] } },
        );
    };

    return (
        <div className='jx-home bg-[#050506]'>
            <Swiper
                {...config}
                ref={swiperRef}
                className='mySwiper h-screen'
                onActiveIndexChange={s => setActive(s.activeIndex)}
                onSlideNextTransitionStart={() => sweep('next')}
                onSlidePrevTransitionStart={() => sweep('prev')}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide
                        key={slide.key}
                        className={slide.scrollable ? `flex items-start justify-center overflow-x-hidden ${slide.className || ''}` : slide.className}
                    >
                        {slide.scrollable ? (
                            <div data-scrollable style={SCROLLABLE_STYLE} className={SCROLLABLE_PANEL}>
                                {slide.render(active === i)}
                            </div>
                        ) : (
                            slide.render(active === i)
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div ref={scanRef} className='jx-scan' aria-hidden='true' />
            <div className='swiper-pagination hero-pagination'></div>
        </div>
    );
}
