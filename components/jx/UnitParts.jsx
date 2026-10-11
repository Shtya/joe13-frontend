'use client';

import LandingIcon from '@/components/atoms/LandingIcon';
import { slideTo } from '@/components/jx/primitives';
import { useTranslations } from 'next-intl';

/* ------------------------------------------------------------------------
   Feature rail — capabilities sit on a light rail, not inside cards.
   Each column: a hairline that charges on hover, an icon, a label.
   ------------------------------------------------------------------------ */
export function FeatureRail({ items, className = '' }) {
    if (!items?.length) return null;
    return (
        <ul role='list' className={`m-0 grid list-none grid-cols-2 gap-x-5 gap-y-5 p-0 sm:grid-cols-4 sm:gap-x-6 ${className}`}>
            {items.map(({ key, src, label }) => (
                <li key={key} data-jx='rise' className='group relative pt-4'>
                    <span aria-hidden='true' className='absolute inset-x-0 top-0 h-px bg-[var(--jx-line-strong)]' />
                    <span
                        aria-hidden='true'
                        className='absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#fff,var(--jx-steel))] shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 rtl:origin-right motion-reduce:transition-none'
                    />
                    <span aria-hidden='true' className='absolute -top-[3px] start-0 size-[7px] rounded-full bg-[var(--jx-silver)] shadow-[0_0_8px_rgba(220,224,230,0.9)] transition-colors duration-300 group-hover:bg-[var(--jx-glint)]' />
                    <span className='relative block size-16 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [filter:grayscale(1)_brightness(1.18)_contrast(1.12)] group-hover:-translate-y-1.5 group-hover:[filter:grayscale(1)_brightness(1.45)_contrast(1.15)_drop-shadow(0_0_14px_rgba(255,255,255,0.35))] sm:size-[72px] xl:size-20'>
                        <LandingIcon src={src} sizes='80px' />
                    </span>
                    <span className='mt-3 block whitespace-pre-line text-[15px] font-[500] leading-[1.45] text-[var(--jx-text)] sm:text-[16px] xl:text-[17px]'>{label}</span>
                </li>
            ))}
        </ul>
    );
}

/* ------------------------------------------------------------------------
   Unit locator — a small orbit of the six business units. The current one
   glows ember; every other node jumps to its slide. It echoes the hub on
   the Business Units slide, so the system feels like one instrument.
   ------------------------------------------------------------------------ */
export function UnitLocator({ units = [], current }) {
    const t = useTranslations('Jx');
    const total = units.length;
    const index = units.findIndex(u => u.slideIndex === current);
    if (!total || index < 0) return null;

    const R = 19;
    return (
        <nav aria-label={t('units')} data-jx='rise' className='flex items-center gap-3.5'>
            <div className='relative size-[52px] shrink-0'>
                <svg viewBox='0 0 52 52' aria-hidden='true' className='absolute inset-0 size-full'>
                    <circle cx='26' cy='26' r={R} className='jx-stroke jx-stroke--dim' />
                    <circle cx='26' cy='26' r='2.5' className='jx-node--soft' />
                </svg>
                {units.map((unit, i) => {
                    const a = -Math.PI / 2 + (i / total) * Math.PI * 2;
                    const x = Math.round((26 + R * Math.cos(a)) * 100) / 100;
                    const y = Math.round((26 + R * Math.sin(a)) * 100) / 100;
                    const isCurrent = i === index;
                    return (
                        <button
                            key={unit.slideIndex}
                            type='button'
                            onClick={() => slideTo(unit.slideIndex)}
                            aria-label={unit.title}
                            aria-current={isCurrent ? 'true' : undefined}
                            title={unit.title}
                            className='absolute grid size-[16px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--jx-focus)]'
                            style={{ left: x, top: y }}
                        >
                            <span
                                className={`block rounded-full transition-all duration-300 ${
                                    isCurrent
                                        ? 'size-[7px] bg-[var(--jx-glint)] shadow-[var(--jx-glint-glow)]'
                                        : 'size-[5px] bg-[rgba(234,242,250,0.45)] hover:scale-150 hover:bg-white'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            <p className='m-0 text-[13px] leading-[1.35] text-[var(--jx-text-3)]'>
                <span className='block text-[var(--jx-text-2)]'>{t('units')}</span>
                {t('unitOf', { current: index + 1, total })}
            </p>
        </nav>
    );
}
