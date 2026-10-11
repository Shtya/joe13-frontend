'use client';

import { JxButton, JxHeading, JxScene, JxTag, slideNext, slideTo, splitTitle } from '@/components/jx/primitives';
import { useSceneMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

/*
 * Slide 4 — "Hub".
 * JOE13 at the centre, its six business units as satellites on one orbit.
 * Pointing at a unit lights its spoke; choosing it flies to that slide.
 * Below desktop the orbit unrolls into a rail list with the same nodes.
 */

function unitTitle(unit, locale) {
    return String(unit?.data?.title?.[locale] || unit?.data?.title?.en || '').trim();
}

export default function Section4({ data, loading, units = [], active = false }) {
    const t = useTranslations();
    const locale = useLocale();
    const isAr = locale === 'ar';
    const title = data?.title?.[locale] || t('section4');
    const description = data?.content?.[locale] || t('Hero.unitsDescription');
    const visible = units.filter(u => typeof u.slideIndex === 'number' && unitTitle(u, locale));
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 && parts.length > 1 ? 'accent' : 'light' }));

    const ref = useSceneMotion(active, { deps: [loading, locale, visible.length], extend: launchSatellites });

    return (
        <JxScene
            ref={ref}
            id='business-units'
            labelledBy='home-units-heading'
            busy={loading}
            image={cmsImage(data?.image?.url, '/landing/bg-4-section.png')}
            shade='start'
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className='flex w-full items-center justify-between gap-[clamp(32px,5vw,96px)] max-lg:flex-col max-lg:items-start'>
                    <div className='w-full max-w-[600px] text-start'>
                        <JxTag>{pickUi(data, locale, 'eyebrow', t('Hero.expertise'))}</JxTag>
                        <JxHeading
                            id='home-units-heading'
                            lines={lines}
                            className='mt-5 text-[length:var(--jx-fs-4xl)] leading-[1.12] tracking-[-0.02em]'
                        />
                        {description ? (
                            <p data-jx='rise' className='mt-6 max-w-[34rem] text-[length:var(--jx-fs-lg)] font-[400] leading-[1.65] text-[var(--jx-text-2)]'>
                                {description}
                            </p>
                        ) : null}
                        <div className='mt-9'>
                            <JxButton href='/projects' onClick={slideNext}>
                                {pickUi(data, locale, 'cta', t('Hero.exploreUnits'))}
                            </JxButton>
                        </div>
                    </div>

                    {visible.length ? (
                        <>
                            <Hub units={visible} locale={locale} mirror={isAr} hubLabel={t('Jx.hub')} />
                            <UnitList units={visible} locale={locale} />
                        </>
                    ) : null}
                </div>
            )}
        </JxScene>
    );
}

function Hub({ units, locale, mirror, hubLabel }) {
    const [hot, setHot] = useState(-1);
    const n = units.length;
    const R = 37;
    const nodes = units.map((unit, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const x = Math.round((50 + R * Math.cos(a) * (mirror ? -1 : 1)) * 1000) / 1000;
        const y = Math.round((50 + R * Math.sin(a)) * 1000) / 1000;
        return { unit, x, y, i };
    });

    return (
        <nav aria-label={hubLabel} data-jx-track='ambient' className='relative mx-[clamp(64px,8vw,150px)] aspect-square w-[min(34vw,520px)] shrink-0 max-lg:hidden'>
            {/* 1000-unit canvas (positions are % × 10): small viewBoxes distort pathLength dashes */}
            <svg viewBox='0 0 1000 1000' aria-hidden='true' style={{ '--jx-sw': 1.8 }} className='absolute inset-0 size-full overflow-visible text-[var(--jx-silver)]'>
                <g className='jx-spin jx-spin--rev jx-loop'>
                    <circle cx='500' cy='500' r='470' className='jx-stroke jx-stroke--dim' strokeDasharray='3 12' />
                </g>
                <circle cx='500' cy='500' r={R * 10} pathLength='1' data-jx='draw' className='jx-stroke jx-stroke--mid' />
                <circle cx='500' cy='500' r='150' pathLength='1' data-jx='draw' className='jx-stroke jx-stroke--dim' />
                {nodes.map(({ x, y, i }) => (
                    <line
                        key={i}
                        x1='500'
                        y1='500'
                        x2={x * 10}
                        y2={y * 10}
                        pathLength='1'
                        data-jx='draw'
                        className={`jx-stroke transition-[opacity,color] duration-300 ${hot === i ? 'text-[var(--jx-glint)] opacity-100' : 'opacity-[0.22]'}`}
                    />
                ))}
                <g className='jx-spin jx-loop'>
                    <circle cx='500' cy={500 - R * 10} r='6' className='jx-node' />
                </g>
            </svg>

            <div data-jx='pop' className='absolute left-1/2 top-1/2 grid aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(5,5,6,0.7)_70%)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_0_60px_rgba(255,255,255,0.25)] backdrop-blur-sm'>
                <Image src='/assets/svg/logo-white.svg' alt={hubLabel} width={120} height={36} className='h-auto w-[62%]' />
            </div>

            <span aria-hidden='true' className='jx-radar jx-loop' />
            <ul className='m-0 list-none p-0'>
                {nodes.map(({ unit, x, y, i }) => {
                    const side = x > 56 ? 'right' : x < 44 ? 'left' : y < 50 ? 'top' : 'bottom';
                    const label = {
                        right: 'left-[calc(100%+12px)] top-1/2 -translate-y-1/2 text-left',
                        left: 'right-[calc(100%+12px)] top-1/2 -translate-y-1/2 text-right',
                        top: 'bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 text-center',
                        bottom: 'top-[calc(100%+12px)] left-1/2 -translate-x-1/2 text-center',
                    }[side];
                    return (
                        <li key={unit.slideIndex} data-sat className='absolute' style={{ left: `${x}%`, top: `${y}%` }}>
                            <button
                                type='button'
                                onClick={() => slideTo(unit.slideIndex)}
                                onPointerEnter={() => setHot(i)}
                                onPointerLeave={() => setHot(-1)}
                                onFocus={() => setHot(i)}
                                onBlur={() => setHot(-1)}
                                className='group absolute grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full'
                            >
                                <span className='block size-[11px] rounded-full border border-[var(--jx-silver)] bg-[var(--jx-ink)] transition-[transform,background-color,box-shadow] duration-300 group-hover:scale-125 group-hover:bg-[var(--jx-glint)] group-hover:shadow-[var(--jx-glint-glow)] group-focus-visible:bg-[var(--jx-glint)]' />
                                <span
                                    className={`absolute ${label} w-max max-w-[150px] text-[14.5px] font-[500] leading-[1.4] text-[var(--jx-text-2)] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white`}
                                >
                                    {unitTitle(unit, locale)}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function UnitList({ units, locale }) {
    return (
        <ul className='relative m-0 grid w-full list-none gap-0 p-0 lg:hidden'>
            <span aria-hidden='true' className='absolute bottom-5 start-[5px] top-5 w-px bg-[var(--jx-line-strong)]' />
            {units.map(unit => (
                <li key={unit.slideIndex} data-jx='rise'>
                    <button
                        type='button'
                        onClick={() => slideTo(unit.slideIndex)}
                        className='group flex w-full items-center gap-4 py-2.5 text-start text-[16px] font-[500] text-[var(--jx-text-2)] transition-colors hover:text-white'
                    >
                        <span aria-hidden='true' className='relative z-[1] size-[11px] shrink-0 rounded-full border border-[var(--jx-silver)] bg-[var(--jx-ink)] transition-colors group-hover:bg-[var(--jx-glint)]' />
                        <span className='line-clamp-2'>{unitTitle(unit, locale)}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

/* Units launch from the JOE13 core out to their orbit, one after another. */
function launchSatellites(tl, root) {
    const hub = root.querySelector('nav[data-jx-track]');
    const sats = hub ? [...hub.querySelectorAll('[data-sat]')] : [];
    if (!sats.length) return;
    const box = hub.getBoundingClientRect();
    const from = sats.map(li => {
        const x = parseFloat(li.style.left) || 50;
        const y = parseFloat(li.style.top) || 50;
        return { x: ((50 - x) / 100) * box.width, y: ((50 - y) / 100) * box.height, opacity: 0, scale: 0.3 };
    });
    sats.forEach((li, i) => {
        gsap.set(li, from[i]);
        tl.fromTo(li, from[i], { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.15, ease: 'expo.out', immediateRender: false }, 0.55 + i * 0.11);
    });
}
