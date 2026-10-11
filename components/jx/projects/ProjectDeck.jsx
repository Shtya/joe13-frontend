'use client';

import { prefersReducedMotion } from '@/components/jx/motion';
import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { useEffect, useRef, useState } from 'react';
import { plainText, projectImages, projectName } from './utils';

const DELAY = 6000;
const DEPTH = 3; // cards visible behind the front one

/*
 * Featured deck — the projects hero's signature.
 * Projects are stacked as physical plates fanned back into depth. The deck
 * advances on its own (a silver hairline shows the countdown), pauses under
 * the pointer, and can be driven with the controls or arrow keys. The front
 * plate is the link.
 */
export default function ProjectDeck({ projects = [], heading, onViewAll }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const tp = useTranslations('projects');
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef(null);
    const n = projects.length;

    const go = dir => n && setIndex(i => (i + dir + n) % n);

    useEffect(() => {
        if (n < 2 || paused || prefersReducedMotion()) return undefined;
        const bar = progressRef.current;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, paused, n]);

    if (!n) return null;

    const current = projects[index];

    return (
        <div
            className='w-full'
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className='mb-5 flex items-center justify-between'>
                <h2 className='jx-display m-0 text-[17px] font-[700] text-[var(--jx-platinum)]'>{heading}</h2>
                {onViewAll ? (
                    <button type='button' onClick={onViewAll} className='text-[14px] text-[var(--jx-text-2)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] transition-colors hover:text-white hover:decoration-white'>
                        {tp('viewAll')}
                    </button>
                ) : null}
            </div>

            <div
                className='relative aspect-[4/5] w-full [perspective:1400px] max-sm:aspect-[4/4.4]'
                role='region'
                aria-roledescription='carousel'
                aria-label={heading}
                onKeyDown={e => {
                    if (e.key === 'ArrowRight') go(locale === 'ar' ? -1 : 1);
                    if (e.key === 'ArrowLeft') go(locale === 'ar' ? 1 : -1);
                }}
            >
                {projects.map((project, i) => {
                    const pos = (i - index + n) % n;
                    if (pos > DEPTH) return null;
                    const img = projectImages(project)[0];
                    const name = projectName(project, locale);
                    const front = pos === 0;
                    const style = {
                        transform: `translate3d(calc(var(--jx-deck-dir, 1) * ${pos * -5.5}%), ${pos * -4.5}%, ${pos * -90}px) rotate(calc(var(--jx-deck-dir, 1) * ${pos * -3}deg))`,
                        opacity: pos === DEPTH ? 0 : 1 - pos * 0.24,
                        zIndex: 10 - pos,
                    };
                    return (
                        <div
                            key={project.id || project.slug}
                            data-deck-card
                            aria-hidden={!front}
                            className='absolute inset-0 overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_50px_80px_-40px_rgba(0,0,0,0.95)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-origin:50%_100%] motion-reduce:transition-none rtl:[--jx-deck-dir:-1]'
                            style={style}
                        >
                            {img ? (
                                <Image
                                    src={img.src}
                                    alt={front ? img.alt || name : ''}
                                    fill
                                    sizes='(max-width: 1023px) 90vw, 460px'
                                    quality={75}
                                    priority={pos < 2}
                                    className={`object-cover transition-[filter,transform] duration-[1200ms] ${front ? '[filter:grayscale(0.15)_brightness(0.9)] scale-100' : '[filter:grayscale(1)_brightness(0.55)] scale-105'}`}
                                />
                            ) : null}
                            <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,6,0.95)_0%,rgba(5,5,6,0.35)_45%,rgba(5,5,6,0)_70%)]' />
                            {front ? (
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className='group absolute inset-0 flex flex-col justify-end p-6 text-start focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white sm:p-7'
                                >
                                    <span className='jx-tag !text-[12.5px]'>{tj('featured')}</span>
                                    <span className='jx-display mt-3 line-clamp-2 text-[clamp(1.35rem,1rem+1.2vw,1.9rem)] font-[700] leading-[1.35] text-white'>{name}</span>
                                    <span className='mt-2 line-clamp-2 text-[14px] leading-[1.7] text-[var(--jx-text-2)]'>
                                        {plainText(project?.description?.[locale] || project?.description?.en)}
                                    </span>
                                    <span className='mt-5 inline-flex items-center gap-3 text-[14px] font-[700] text-[var(--jx-platinum)]'>
                                        {tj('viewProject')}
                                        <span className='grid size-9 place-items-center rounded-full bg-[image:var(--jx-brushed)] text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1'>
                                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                                <path d='M5 12h14' />
                                                <path d='m13 6 6 6-6 6' />
                                            </svg>
                                        </span>
                                    </span>
                                </Link>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            {n > 1 ? (
                <div className='mt-6 flex items-center gap-4'>
                    <span dir='ltr' className='jx-display tabular-nums text-[14px] text-[var(--jx-steel)]'>
                        <b className='font-[700] text-white'>{String(index + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
                    </span>
                    <span className='relative h-px flex-1 overflow-hidden bg-[var(--jx-line)]'>
                        <span ref={progressRef} className='absolute inset-0 origin-left bg-white shadow-[0_0_8px_#fff] rtl:origin-right' style={{ transform: 'scaleX(0)' }} />
                    </span>
                    <span className='flex gap-2'>
                        <DeckButton label={tp('prevProject')} onClick={() => go(-1)} flip />
                        <DeckButton label={tp('nextProject')} onClick={() => go(1)} />
                    </span>
                </div>
            ) : null}
            <p className='sr-only' aria-live='polite'>
                {projectName(current, locale)}
            </p>
        </div>
    );
}

function DeckButton({ label, onClick, flip }) {
    return (
        <button
            type='button'
            aria-label={label}
            onClick={onClick}
            className='grid size-11 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
        >
            <svg viewBox='0 0 24 24' aria-hidden='true' className={`size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] ${flip ? '-scale-x-100 rtl:scale-x-100' : 'rtl:-scale-x-100'}`}>
                <path d='M5 12h14' />
                <path d='m13 6 6 6-6 6' />
            </svg>
        </button>
    );
}
