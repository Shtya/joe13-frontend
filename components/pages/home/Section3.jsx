'use client';

import { JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useSceneMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

/*
 * Slide 3 — "Runway".
 * Partner marks travel on a ledger plane that tilts away into depth, two
 * lanes in opposite directions. Marks rest in monochrome and take their
 * own colour when pointed at; the lane pauses under the pointer.
 */

export default function Section3({ data, loading, active = false }) {
    const t = useTranslations();
    const locale = useLocale();
    const isAr = locale === 'ar';
    const title = data?.title?.[locale] || t('Our Partners');
    const description = data?.content?.[locale] || t('Hero.partnersSubtitle');
    const logos = data?.list?.length ? data.list : [];
    const half = Math.ceil(logos.length / 2);
    const lanes = logos.length > 5 ? [logos.slice(0, half), [...logos.slice(half), ...logos.slice(0, half - (logos.length - half))]] : [logos, logos];
    const titleParts = splitTitle(title);
    const lines = titleParts.map((text, i) => ({ text, tone: i === titleParts.length - 1 ? 'accent' : 'thin' }));

    const ref = useSceneMotion(active, { deps: [loading, locale, logos.length], extend: landRunway });

    return (
        <JxScene
            ref={ref}
            id='ourPartners'
            labelledBy='home-partners-heading'
            busy={loading}
            image={cmsImage(data?.image?.url, '/landing/bg-3-section.png')}
            shade='center'
            bodyClassName='items-center text-center !px-0'
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className='flex w-full flex-col items-center'>
                    <div className='flex flex-col items-center px-[var(--jx-gutter)]'>
                        <JxTag>{pickUi(data, locale, 'eyebrow', t('Hero.trusted'))}</JxTag>
                        <JxHeading
                            id='home-partners-heading'
                            lines={lines}
                            className='mt-4 text-[length:var(--jx-fs-5xl)] leading-[1.02] tracking-[-0.03em]'
                        />
                        {description ? (
                            <p data-jx='rise' className='mt-5 max-w-[34rem] text-[length:var(--jx-fs-lg)] font-[400] leading-[1.6] text-[var(--jx-text-2)]'>
                                {description}
                            </p>
                        ) : null}
                    </div>

                    {logos.length ? (
                        <div data-jx='fade' className='relative mt-[clamp(36px,7vh,80px)] w-full [perspective:1100px]'>
                            <div
                                dir='ltr'
                                data-runway className='flex flex-col [transform:rotateX(24deg)] [transform-origin:50%_0%] [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] max-md:[transform:rotateX(14deg)]'
                            >
                                {lanes.map((lane, li) => (
                                    <Lane key={li} logos={lane} reverse={(li === 1) !== isAr} slow={li === 1} />
                                ))}
                            </div>
                            <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 -bottom-6 h-16 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,255,255,0.12),transparent)] blur-md' />
                        </div>
                    ) : null}
                </div>
            )}
        </JxScene>
    );
}

function Lane({ logos, reverse, slow }) {
    const set = fill(logos, 10);
    const anim = reverse ? 'animate-partners-marquee-rtl' : 'animate-partners-marquee-ltr';
    return (
        <div data-lane className='group/lane overflow-hidden border-t border-[var(--jx-line)] last:border-b'>
            <ul
                className={`m-0 flex w-max list-none p-0 will-change-transform group-hover/lane:![animation-play-state:paused] motion-reduce:[animation:none] ${anim} jx-loop ${slow ? '[animation-duration:46s]' : ''}`}
            >
                {[...set, ...set].map((logo, i) => (
                    <li
                        key={`${logo.url}-${i}`}
                        aria-hidden={i >= set.length || undefined}
                        className='group relative flex h-[96px] w-[176px] shrink-0 items-center justify-center border-e border-[var(--jx-line)] md:h-[132px] md:w-[260px] xl:h-[150px] xl:w-[300px]'
                    >
                        <Image
                            src={cmsImage(logo.url, logo.url)}
                            alt={i >= set.length ? '' : logo.alt || ''}
                            width={220}
                            height={110}
                            sizes='220px'
                            className='h-auto max-h-[58%] w-auto max-w-[72%] object-contain opacity-75 [filter:grayscale(1)_brightness(2.2)_contrast(0.9)] transition-[filter,opacity,transform] duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:[filter:grayscale(1)_brightness(3)_drop-shadow(0_0_12px_rgba(255,255,255,0.45))]'
                        />
                        <span aria-hidden='true' className='absolute inset-x-6 bottom-0 h-px scale-x-0 bg-[var(--jx-silver)] shadow-[0_0_10px_var(--jx-silver)] transition-transform duration-500 group-hover:scale-x-100' />
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** Repeat a lane until one copy is wider than the widest screens. */
function fill(list, min) {
    if (!list.length) return list;
    const out = [...list];
    while (out.length < min) out.push(...list);
    return out;
}

/* The ledger plane swings down from vertical; lanes slide in from opposite sides. */
function landRunway(tl, root) {
    const plane = root.querySelector('[data-runway]');
    const lanes = [...root.querySelectorAll('[data-lane]')];
    if (!plane) return;
    const tilt = window.matchMedia('(max-width: 767px)').matches ? 14 : 24;
    gsap.set(plane, { rotationX: 78, opacity: 0 });
    tl.fromTo(plane, { rotationX: 78, opacity: 0 }, { rotationX: tilt, opacity: 1, duration: 1.6, ease: 'expo.out', immediateRender: false }, 0.5);
    lanes.forEach((lane, i) => {
        const from = { xPercent: i % 2 ? 18 : -18, opacity: 0 };
        gsap.set(lane, from);
        tl.fromTo(lane, from, { xPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out', immediateRender: false }, 0.65 + i * 0.12);
    });
}
