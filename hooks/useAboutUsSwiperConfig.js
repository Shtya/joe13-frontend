'use client';

import { useValues } from '@/app/context';
import { usePathname } from '@/navigation';
import { useState, useEffect, useRef } from 'react';
import { EffectCreative, Pagination, Navigation, Autoplay, Mousewheel } from 'swiper/modules';

export function useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide) {
    const { setModalOpen, isModalOpen } = useValues();
    const swiperRef = useRef(null);
    const pathnmae = usePathname();

    function bgNavbar(swiper) {
        const nav = document.querySelector('.second-nav');
        setTimeout(() => {
            if (nav) {
                if (swiper.activeIndex === 0) {
                    nav.classList.add('bg-remove');
                } else {
                    nav.classList.remove('bg-remove');
                }
            }
        }, 500);
    }

    const config = {
        modules: [EffectCreative, Pagination, Navigation, Autoplay, Mousewheel],
        effect: 'creative',
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, '-100%', -100],
            },
            next: {
                translate: [0, '100%', 0],
            },
        },
        direction: 'vertical',
        speed: 1200,
        mousewheel: true,
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },

        onInit: swiper => {
            handleScrollInside(swiper);
            swiperRef.current = swiper;

            // Initial state
            if (!isModalOpen) {
                swiper.mousewheel.disable();
            }

            // bgNavbar(swiper);
        },

        onSlideChange: swiper => {
            const isLast = swiper.activeIndex === swiper.slides.length - 1;
            setIsLastSlide(isLast);

            bgNavbar(swiper);
        },
    };

    // Dynamically enable/disable mousewheel when modal state changes
    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        if (isModalOpen) {
            swiper.mousewheel.enable();
        } else {
            swiper.mousewheel.disable();
        }
    }, [isModalOpen]);


    useEffect(() => {
        const swiper = swiperRef.current;
        bgNavbar(swiper)
    }, [pathnmae]);

    return config;
}
export default function VerticalSlider() {
    const handleScrollInside = swiper => {
        swiper.el.addEventListener(
            'wheel',
            e => {
                if (!swiper.slides || swiper.activeIndex == null) return;

                const slide = swiper.slides[swiper.activeIndex];
                if (!slide) return;

                const target = slide.querySelector('[data-scrollable]');
                if (!target) return;

                const { scrollTop, scrollHeight, clientHeight } = target;
                const buffer = 2;

                const isAtBottom = scrollTop + clientHeight >= scrollHeight - buffer;
                const isAtTop = scrollTop <= buffer;

                if (
                    (e.deltaY > 0 && !isAtBottom) || // scrolling down but not at bottom
                    (e.deltaY < 0 && !isAtTop) // scrolling up but not at top
                ) {
                    swiper.mousewheel.disable(); // stop swiper from interfering
                } else {
                    swiper.mousewheel.enable(); // allow swiper to handle the scroll
                }
            },
            { passive: true }, // ← DO NOT block scroll event
        );
    };

    return { handleScrollInside };
}
