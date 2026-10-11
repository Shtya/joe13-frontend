'use client';

import { prefersReducedMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DELAY = 5200;

/*
 * Gallery — a framed stage for the project's photographs.
 * Photos crossfade with a slow drift; a hairline counts down to the next one.
 * Thumbnails choose directly. The expand control opens a full-screen viewer
 * (keyboard: ← → Esc, swipe on touch, focus kept inside).
 */
export default function ProjectGallery({ images = [], name = '' }) {
    const tp = useTranslations('projects');
    const tj = useTranslations('Jx');
    const locale = useLocale();
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [viewer, setViewer] = useState(false);
    const barRef = useRef(null);
    const n = images.length;

    const go = useCallback(dir => n && setIndex(i => (i + dir + n) % n), [n]);

    useEffect(() => {
        if (n < 2 || !playing || viewer || prefersReducedMotion()) return undefined;
        const bar = barRef.current;
        if (bar) {
            bar.style.transition = 'none';
            bar.style.transform = 'scaleX(0)';
            requestAnimationFrame(() => {
                bar.style.transition = `transform ${DELAY}ms linear`;
                bar.style.transform = 'scaleX(1)';
            });
        }
        const id = window.setTimeout(() => go(1), DELAY);
        return () => window.clearTimeout(id);
    }, [index, playing, viewer, n, go]);

    if (!n) {
        return (
            <div data-frame className='grid aspect-[4/3] place-items-center rounded-[var(--jx-r-lg)] text-[var(--jx-text-3)] shadow-[inset_0_0_0_1px_var(--jx-line)]'>
                {tp('noImages')}
            </div>
        );
    }

    return (
        <div className='w-full'>
            <div
                data-frame
                className='group relative aspect-[4/3] overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_60px_100px_-50px_rgba(0,0,0,0.95)]'
            >
                {images.map((img, i) => (
                    <div
                        key={img.src + i}
                        aria-hidden={i !== index}
                        className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${i === index ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt || name}
                            fill
                            priority={i === 0}
                            sizes='(max-width: 1023px) 92vw, 55vw'
                            quality={80}
                            className='object-cover'
                        />
                    </div>
                ))}
                <span aria-hidden='true' className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,6,0.85)_0%,rgba(5,5,6,0)_40%)]' />
                <span aria-hidden='true' className='pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' />

                <button
                    type='button'
                    onClick={() => setViewer(true)}
                    aria-label={tp('expandImage')}
                    className='absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-[rgba(5,5,6,0.55)] text-white shadow-[inset_0_0_0_1px_var(--jx-line-strong)] backdrop-blur-md transition-[background,color,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                >
                    <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                        <path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' />
                    </svg>
                </button>

                {n > 1 ? (
                    <div className='absolute inset-x-5 bottom-4 flex items-center gap-4'>
                        <span dir='ltr' className='jx-display tabular-nums text-[13px] text-[var(--jx-silver)]'>
                            <b className='font-[700] text-white'>{String(index + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
                        </span>
                        <span className='relative h-px flex-1 overflow-hidden bg-white/20'>
                            <span ref={barRef} className='absolute inset-0 origin-left bg-white rtl:origin-right' style={{ transform: 'scaleX(0)' }} />
                        </span>
                        <button
                            type='button'
                            onClick={() => setPlaying(p => !p)}
                            aria-label={playing ? tp('pauseGallery') : tp('playGallery')}
                            className='grid size-9 place-items-center rounded-full bg-[rgba(5,5,6,0.55)] text-white shadow-[inset_0_0_0_1px_var(--jx-line-strong)] backdrop-blur-md hover:bg-white hover:text-[var(--jx-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
                        >
                            {playing ? (
                                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-3.5 fill-current'>
                                    <rect x='6' y='5' width='4' height='14' rx='1' />
                                    <rect x='14' y='5' width='4' height='14' rx='1' />
                                </svg>
                            ) : (
                                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-3.5 fill-current'>
                                    <path d='M7 4.5v15l12-7.5z' />
                                </svg>
                            )}
                        </button>
                    </div>
                ) : null}
            </div>

            {n > 1 ? (
                <ul className='m-0 mt-4 flex list-none gap-3 p-0' aria-label={tj('gallery')}>
                    {images.map((img, i) => (
                        <li key={img.src + i}>
                            <button
                                type='button'
                                onClick={() => setIndex(i)}
                                aria-label={tj('photoOf', { current: i + 1, total: n })}
                                aria-current={i === index ? 'true' : undefined}
                                className={`relative block h-[64px] w-[88px] overflow-hidden rounded-[10px] transition-[box-shadow,opacity,filter] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                                    i === index
                                        ? 'opacity-100 shadow-[0_0_0_1.5px_#fff,0_0_18px_rgba(255,255,255,0.25)]'
                                        : 'opacity-55 shadow-[inset_0_0_0_1px_var(--jx-line-strong)] [filter:grayscale(1)] hover:opacity-90 hover:[filter:grayscale(0)]'
                                }`}
                            >
                                <Image src={img.src} alt='' fill sizes='88px' className='object-cover' />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}

            {viewer ? <Viewer images={images} name={name} index={index} setIndex={setIndex} onClose={() => setViewer(false)} locale={locale} /> : null}
        </div>
    );
}

function Viewer({ images, name, index, setIndex, onClose, locale }) {
    const tp = useTranslations('projects');
    const tj = useTranslations('Jx');
    const rootRef = useRef(null);
    const closeRef = useRef(null);
    const returnRef = useRef(null);
    const touch = useRef(null);
    const n = images.length;
    const rtl = locale === 'ar';
    const go = dir => setIndex(i => (i + dir + n) % n);

    useEffect(() => {
        returnRef.current = document.activeElement;
        closeRef.current?.focus({ preventScroll: true });
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const root = rootRef.current;
        if (root && !prefersReducedMotion()) {
            gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
            gsap.fromTo(root.querySelector('[data-stage]'), { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.05 });
        }
        return () => {
            document.body.style.overflow = prevOverflow;
            returnRef.current?.focus?.({ preventScroll: true });
        };
    }, []);

    useEffect(() => {
        const onKey = e => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
            if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
            if (e.key === 'Tab') {
                const nodes = rootRef.current?.querySelectorAll('button');
                if (!nodes?.length) return;
                const first = nodes[0];
                const last = nodes[nodes.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [n, rtl]);

    const img = images[index];

    return createPortal(
        <div
            ref={rootRef}
            role='dialog'
            aria-modal='true'
            aria-label={name}
            className='jx fixed inset-0 z-[1000000000000] flex flex-col bg-[rgba(5,5,6,0.96)] backdrop-blur-xl'
            onTouchStart={e => (touch.current = e.touches[0].clientX)}
            onTouchEnd={e => {
                if (touch.current == null) return;
                const dx = e.changedTouches[0].clientX - touch.current;
                if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
                touch.current = null;
            }}
        >
            <div className='flex items-center justify-between px-[clamp(16px,3vw,40px)] py-5'>
                <p className='jx-display m-0 truncate pe-4 text-[15px] font-[700] text-[var(--jx-platinum)]'>{name}</p>
                <button
                    ref={closeRef}
                    type='button'
                    onClick={onClose}
                    aria-label={tp('closeImage')}
                    className='grid size-12 shrink-0 place-items-center rounded-full text-white shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,transform] duration-300 hover:rotate-90 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
                >
                    <svg viewBox='0 0 24 24' aria-hidden='true' className='size-5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round]'>
                        <path d='M6 6l12 12M18 6 6 18' />
                    </svg>
                </button>
            </div>

            <div data-stage className='relative mx-[clamp(16px,6vw,120px)] flex-1'>
                <Image key={img.src} src={img.src} alt={img.alt || name} fill sizes='90vw' quality={90} className='object-contain' />
            </div>

            <div className='flex items-center justify-center gap-5 px-4 py-6'>
                {n > 1 ? <ViewerButton label={tj('prevPhoto')} onClick={() => go(-1)} flip /> : null}
                <span dir='ltr' className='jx-display min-w-[64px] text-center tabular-nums text-[14px] text-[var(--jx-silver)]' aria-live='polite'>
                    <span className='sr-only'>{tj('photoOf', { current: index + 1, total: n })}</span>
                    <span aria-hidden='true'>
                        <b className='text-white'>{index + 1}</b> / {n}
                    </span>
                </span>
                {n > 1 ? <ViewerButton label={tj('nextPhoto')} onClick={() => go(1)} /> : null}
            </div>
        </div>,
        document.body,
    );
}

function ViewerButton({ label, onClick, flip }) {
    return (
        <button
            type='button'
            aria-label={label}
            onClick={onClick}
            className='grid size-12 place-items-center rounded-full text-white shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
        >
            <svg viewBox='0 0 24 24' aria-hidden='true' className={`size-5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] ${flip ? '-scale-x-100 rtl:scale-x-100' : 'rtl:-scale-x-100'}`}>
                <path d='M5 12h14' />
                <path d='m13 6 6 6-6 6' />
            </svg>
        </button>
    );
}
