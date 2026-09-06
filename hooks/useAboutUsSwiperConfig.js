'use client';

import { useValues } from '@/app/context';
import { usePathname } from '@/navigation';
import { useEffect, useRef } from 'react';
import { EffectCreative, Pagination, Navigation, Autoplay, Mousewheel } from 'swiper/modules';

const SLIDE_SPEED = 1000;
const AUTOPLAY_DELAY = 7000;
const PROGRESS_CIRC = 2 * Math.PI * 13;
const AUTOPLAY_PAUSED_KEY = 'joe13-hero-autoplay-paused';

function readStoredPaused() {
    try {
        return window.localStorage.getItem(AUTOPLAY_PAUSED_KEY) === '1';
    } catch {
        return false;
    }
}

function writeStoredPaused(paused) {
    try {
        window.localStorage.setItem(AUTOPLAY_PAUSED_KEY, paused ? '1' : '0');
    } catch {
        /* ignore quota / private-mode errors */
    }
}

function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function markUserIntent(ref) {
    ref.current = true;
}

function syncDirection(swiper) {
    if (!swiper?.el) return;
    const goingNext = swiper.activeIndex >= swiper.previousIndex;
    swiper.el.dataset.dir = goingNext ? 'next' : 'prev';
}

function setProgress(swiper, elapsed01) {
    const ring = swiper?.pagination?.el?.querySelector('.hero-progress-ring');
    if (!ring) return;
    const circ = Number(ring.dataset.circ) || PROGRESS_CIRC;
    ring.style.strokeDashoffset = String(circ * (1 - Math.min(1, Math.max(0, elapsed01))));
}

function paginationInset() {
    return window.matchMedia('(max-width: 768px)').matches ? '10px' : '28px';
}

function pinPagination(pag) {
    pag.classList.add('hero-pagination', 'swiper-pagination-vertical');
    pag.classList.remove('swiper-pagination-horizontal');
    pag.style.setProperty('position', 'fixed', 'important');
    pag.style.setProperty('right', paginationInset(), 'important');
    pag.style.setProperty('left', 'auto', 'important');
}

function ensurePaginationChrome(swiper) {
    const pag = swiper?.pagination?.el;
    if (!pag) return;

    pinPagination(pag);
    pag.querySelectorAll('.hero-pagination-rail').forEach(el => el.remove());

    if (!pag.querySelector('.hero-pagination-thumb')) {
        const thumb = document.createElement('span');
        thumb.className = 'hero-pagination-thumb';
        thumb.setAttribute('aria-hidden', 'true');
        thumb.innerHTML = `
            <svg class="hero-pagination-svg" viewBox="0 0 32 32">
                <circle class="hero-progress-track" cx="16" cy="16" r="13" fill="none" />
                <circle class="hero-progress-ring" cx="16" cy="16" r="13" fill="none" data-circ="${PROGRESS_CIRC}" />
            </svg>
            <span class="hero-pagination-thumb-dot"></span>
        `;
        pag.appendChild(thumb);
        const ring = thumb.querySelector('.hero-progress-ring');
        if (ring) {
            ring.style.strokeDasharray = String(PROGRESS_CIRC);
            ring.style.strokeDashoffset = String(PROGRESS_CIRC);
        }
    }

    if (!pag.querySelector('.hero-pagination-pause')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hero-pagination-pause';
        btn.innerHTML = `
            <span>
                <svg class="icon-pause" viewBox="0 0 12 12" aria-hidden="true">
                    <rect x="2" y="1.5" width="2.75" height="9" rx="0.6"></rect>
                    <rect x="7.25" y="1.5" width="2.75" height="9" rx="0.6"></rect>
                </svg>
                <svg class="icon-play" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z"></path>
                </svg>
            </span>
        `;
        btn.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            setUserPaused(swiper, !isUserPaused(swiper));
        });
        pag.appendChild(btn);
        syncPauseButton(swiper);
    }
}

function layoutPagination(swiper) {
    const pag = swiper?.pagination?.el;
    if (!pag) return;

    ensurePaginationChrome(swiper);

    pinPagination(pag);

    const bullets = pag.querySelectorAll('.swiper-pagination-bullet');
    const thumb = pag.querySelector('.hero-pagination-thumb');
    const pause = pag.querySelector('.hero-pagination-pause');

    if (!bullets.length) return;

    const first = bullets[0];
    const last = bullets[bullets.length - 1];
    const top = first.offsetTop + first.offsetHeight / 2;
    const bottom = last.offsetTop + last.offsetHeight / 2;
    pag.style.setProperty('--rail-top', `${top}px`);
    pag.style.setProperty('--rail-height', `${Math.max(0, bottom - top)}px`);

    const active = pag.querySelector('.swiper-pagination-bullet-active') || first;
    if (thumb) {
        const y = active.offsetTop + (active.offsetHeight - thumb.offsetHeight) / 2;
        thumb.style.transform = `translate(-50%, ${Math.max(0, y)}px)`;
    }
    if (pause) {
        pause.style.top = `${last.offsetTop + last.offsetHeight + 14}px`;
        pause.style.bottom = 'auto';
    }
}

function isUserPaused(swiper) {
    return Boolean(swiper?.el?.classList.contains('is-user-paused'));
}

function pauseLabel(paused) {
    const isAr = typeof document !== 'undefined' && document.documentElement.lang === 'ar';
    if (paused) return isAr ? 'تشغيل التمرير التلقائي' : 'Play auto slide';
    return isAr ? 'إيقاف التمرير التلقائي' : 'Pause auto slide';
}

function syncPauseButton(swiper) {
    const btn = swiper?.pagination?.el?.querySelector('.hero-pagination-pause');
    if (!btn) return;
    const paused = isUserPaused(swiper);
    btn.classList.toggle('is-paused', paused);
    btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    btn.setAttribute('aria-label', pauseLabel(paused));
    btn.hidden = prefersReducedMotion();
    swiper.pagination?.el?.classList.toggle('is-user-paused', paused);
}

function setUserPaused(swiper, paused) {
    swiper?.el?.classList.toggle('is-user-paused', paused);
    writeStoredPaused(paused);
    if (paused) {
        swiper.autoplay?.stop();
    } else if (!prefersReducedMotion() && !swiper.isEnd) {
        swiper.autoplay?.start();
    }
    syncPauseButton(swiper);
}

function resetAutoplay(swiper) {
    if (prefersReducedMotion() || !swiper?.autoplay || isUserPaused(swiper)) return;
    if (swiper.isEnd) {
        swiper.autoplay.stop();
        return;
    }
    swiper.autoplay.stop();
    swiper.autoplay.start();
}

function markLastSlidePagination(swiper) {
    const pag = swiper?.pagination?.el;
    if (!pag) return;
    pag.classList.remove('is-last');
}

export function useAboutUsSwiperConfig(handleScrollInside, setIsLastSlide) {
    const { isModalOpen } = useValues();
    const swiperRef = useRef(null);
    const userIntentRef = useRef(false);
    const pathnmae = usePathname();
    const reduced = prefersReducedMotion();

    function bgNavbar(swiper) {
        if (!swiper) return;
        const nav = document.querySelector('.second-nav');
        window.setTimeout(() => {
            // Keep About Us header transparent on every slide (no dark bar after hero).
            if (nav) nav.classList.add('bg-remove');
        }, reduced ? 0 : SLIDE_SPEED);
    }

    const config = {
        modules: [EffectCreative, Pagination, Navigation, Autoplay, Mousewheel],
        effect: 'creative',
        watchSlidesProgress: true,
        speed: reduced ? 0 : SLIDE_SPEED,
        direction: 'vertical',
        simulateTouch: true,
        allowTouchMove: true,
        preventClicks: false,
        preventClicksPropagation: false,
        touchRatio: 1,
        touchAngle: 45,
        threshold: 8,
        shortSwipes: true,
        longSwipesRatio: 0.25,
        resistanceRatio: 0.55,
        followFinger: true,
        creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: false,
            prev: {
                shadow: false,
                translate: [reduced ? 0 : '7%', reduced ? 0 : '-10%', 0],
                scale: reduced ? 1 : 1.05,
                opacity: reduced ? 1 : 0,
            },
            next: {
                shadow: false,
                translate: [reduced ? 0 : '-7%', reduced ? 0 : '10%', 0],
                scale: reduced ? 1 : 0.97,
                opacity: reduced ? 1 : 0,
            },
        },
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            thresholdDelta: 32,
            thresholdTime: 520,
        },
        autoplay: reduced
            ? false
            : {
                  delay: AUTOPLAY_DELAY,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                  stopOnLastSlide: true,
                  waitForTransition: true,
              },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) =>
                `<button type="button" class="${className}" aria-label="Slide ${index + 1}"><span class="hero-bullet-core"></span></button>`,
        },

        onInit: swiper => {
            handleScrollInside(swiper);
            swiperRef.current = swiper;
            swiper.el?.style.setProperty('--hero-autoplay', `${AUTOPLAY_DELAY}ms`);
            swiper.el?.style.setProperty('--hero-speed', `${SLIDE_SPEED}ms`);
            swiper.pagination?.el?.style.setProperty('--hero-speed', `${SLIDE_SPEED}ms`);
            swiper.pagination?.el?.addEventListener('click', event => {
                if (event.target.closest('.hero-pagination-pause')) return;
                markUserIntent(userIntentRef);
            });
            swiper.pagination?.el?.addEventListener('pointerdown', event => {
                const bullet = event.target.closest('.swiper-pagination-bullet');
                if (bullet) requestAnimationFrame(() => bullet.blur());
            });
            syncDirection(swiper);
            markLastSlidePagination(swiper);
            bgNavbar(swiper);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => layoutPagination(swiper));
            });

            if (readStoredPaused()) {
                swiper.el?.classList.add('is-user-paused');
                setUserPaused(swiper, true);
                queueMicrotask(() => swiper.autoplay?.stop());
            }

            if (!isModalOpen) {
                swiper.mousewheel.disable();
            }
        },

        onTouchStart: () => markUserIntent(userIntentRef),
        onScroll: () => markUserIntent(userIntentRef),
        onKeyPress: () => markUserIntent(userIntentRef),

        onSlideChangeTransitionStart: swiper => {
            syncDirection(swiper);
            setProgress(swiper, 0);
            requestAnimationFrame(() => layoutPagination(swiper));
        },

        onSlideChange: swiper => {
            const isLast = swiper.activeIndex === swiper.slides.length - 1;
            setIsLastSlide(isLast);
            syncDirection(swiper);
            markLastSlidePagination(swiper);
            requestAnimationFrame(() => layoutPagination(swiper));
            if (userIntentRef.current) {
                resetAutoplay(swiper);
                userIntentRef.current = false;
            }
            bgNavbar(swiper);
        },

        onAutoplayTimeLeft: (swiper, _timeLeft, percentage) => {
            setProgress(swiper, 1 - percentage);
        },

        onAutoplayStart: swiper => {
            if (isUserPaused(swiper) || readStoredPaused()) {
                swiper.autoplay?.stop();
            }
        },

        onPaginationRender: swiper => {
            requestAnimationFrame(() => layoutPagination(swiper));
        },

        onResize: swiper => {
            requestAnimationFrame(() => layoutPagination(swiper));
        },
    };

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
        bgNavbar(swiper);
    }, [pathnmae]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => {
            const swiper = swiperRef.current;
            if (!swiper) return;
            if (mq.matches) {
                swiper.params.speed = 0;
                swiper.autoplay?.stop();
            } else {
                swiper.params.speed = SLIDE_SPEED;
                if (!swiper.isEnd && !isUserPaused(swiper)) swiper.autoplay?.start();
            }
        };
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

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

                if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
                    swiper.mousewheel.disable();
                } else {
                    swiper.mousewheel.enable();
                }
            },
            { passive: true },
        );
    };

    return { handleScrollInside };
}
