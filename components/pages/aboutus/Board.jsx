'use client';

import { JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { prefersReducedMotion, useSceneMotion } from '@/components/jx/motion';
import { cmsImage } from '@/helpers/cms';
import { useTeamMemeberData } from '@/hooks/useTeamMemeber';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { useEffect, useMemo, useRef, useState } from 'react';

const DELAY = 6500;

/*
 * About 2 — "Spotlight".
 * One member stands in the light: a tall portrait on brushed metal (white
 * studio backgrounds melt into the metal via multiply), name, role and bio.
 * The whole team waits beside it as a roster; choosing a face moves the
 * spotlight. It turns by itself while the slide is on stage and pauses
 * under the pointer or keyboard focus.
 */
function linkedinUrl(member) {
    const value = member?.linkedin || member?.linkedin_url || member?.linkedinUrl || member?.social_linkedin || member?.social?.linkedin;
    return typeof value === 'string' && /^https?:\/\//i.test(value.trim()) ? value.trim() : '';
}

export default function Board({ initialTeam, active = false }) {
    const { data, loading } = useTeamMemeberData(initialTeam);
    const locale = useLocale();
    const t = useTranslations();
    const ta = useTranslations('aboutUs');
    const tj = useTranslations('Jx');
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const barRef = useRef(null);

    const members = useMemo(() => [...(data?.data || [])].sort((a, b) => (a.order || 0) - (b.order || 0)), [data]);
    const n = members.length;
    const go = dir => n && setIndex(i => (i + dir + n) % n);

    const title = t('MEET OUR TEAM');
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light' }));

    const ref = useSceneMotion(active, { deps: [loading, locale, n] });

    useEffect(() => {
        if (!active || paused || n < 2 || prefersReducedMotion()) return undefined;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, paused, index, n]);

    const member = members[index];
    const name = member?.name?.[locale] || member?.name?.en || '';
    const role = member?.position?.[locale] || member?.position?.en || '';
    const bio = member?.bio?.[locale] || member?.bio?.en || '';
    const social = linkedinUrl(member);

    return (
        <JxScene ref={ref} id='team' labelledBy='team-heading' busy={loading} shade='center' bodyClassName='!justify-start lg:!justify-center'>
            <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(55%_60%_at_30%_50%,rgba(199,203,209,0.10),transparent_70%)] rtl:bg-[radial-gradient(55%_60%_at_70%_50%,rgba(199,203,209,0.10),transparent_70%)]' />

            <div className='w-full'>
                <header className='flex flex-wrap items-end justify-between gap-x-10 gap-y-3'>
                    <div>
                        <JxTag>{ta('peopleEyebrow')}</JxTag>
                        <JxHeading id='team-heading' lines={lines} className='mt-4 text-[length:var(--jx-fs-4xl)] leading-[1.15]' />
                    </div>
                    <p data-jx='rise' className='m-0 max-w-[26rem] text-[length:var(--jx-fs-md)] leading-[1.8] text-[var(--jx-text-2)]'>
                        {ta('teamSubtitle')}
                    </p>
                </header>

                {loading ? (
                    <div className='mt-10 aspect-[16/7] rounded-[var(--jx-r-lg)] skeleton-box bg-white/5' />
                ) : !n ? (
                    <p className='mt-10 text-[var(--jx-text-3)]'>{ta('teamEmpty')}</p>
                ) : (
                    <div
                        className='mt-[clamp(28px,5vh,56px)] grid items-center gap-x-[clamp(28px,5vw,88px)] gap-y-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'
                        onPointerEnter={() => setPaused(true)}
                        onPointerLeave={() => setPaused(false)}
                        onFocusCapture={() => setPaused(true)}
                        onBlurCapture={() => setPaused(false)}
                    >
                        {/* Spotlight */}
                        <div data-jx='rise' className='grid items-end gap-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]'>
                            <div className='relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[var(--jx-r-lg)] bg-[image:var(--jx-brushed)] shadow-[var(--jx-shadow-metal),0_50px_80px_-40px_rgba(0,0,0,0.9)] max-sm:mx-auto max-sm:max-w-[260px] lg:max-h-[50vh] lg:max-w-none'>
                                {members.map((m, i) => (
                                    <div
                                        key={m.id ?? i}
                                        aria-hidden={i !== index}
                                        className={`absolute inset-0 transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            i === index ? 'scale-100 opacity-100 blur-0' : 'scale-[1.05] opacity-0 blur-[6px]'
                                        }`}
                                    >
                                        {m.image_url ? (
                                            <Image
                                                src={cmsImage(m.image_url, m.image_url)}
                                                alt={i === index ? m.image_alt || m.name?.[locale] || '' : ''}
                                                fill
                                                sizes='(max-width: 640px) 260px, 340px'
                                                className='object-cover object-top mix-blend-multiply [filter:grayscale(1)_contrast(1.08)]'
                                            />
                                        ) : null}
                                    </div>
                                ))}
                                <span aria-hidden='true' className='pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_60px_rgba(0,0,0,0.25)]' />
                            </div>

                            <div aria-live='polite' className='min-w-0 max-sm:text-center'>
                                <p className='jx-display m-0 text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] font-[700] leading-[1.3] text-white'>{name}</p>
                                {role ? <p className='m-0 mt-2 text-[15px] text-[var(--jx-silver)]'>{role}</p> : null}
                                {bio ? <p className='m-0 mt-4 line-clamp-5 text-[15px] leading-[1.85] text-[var(--jx-text-2)]'>{bio}</p> : null}
                                {social ? (
                                    <a
                                        href={social}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label='LinkedIn'
                                        className='mt-4 inline-grid size-10 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)]'
                                    >
                                        <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-current'>
                                            <path d='M5 8H2v13h3V8Zm.2-4.1C5.2 2.8 4.4 2 3.5 2S1.8 2.8 1.8 3.9s.8 1.9 1.7 1.9 1.7-.8 1.7-1.9ZM22 13.5c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.3-3.9 2.2V8H10v13h3.2v-7.2c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2 2.2 3.8V21H21v-7.5h1Z' />
                                        </svg>
                                    </a>
                                ) : null}

                                {n > 1 ? (
                                    <div className='mt-6 flex items-center gap-4 max-sm:justify-center'>
                                        <span dir='ltr' className='jx-display tabular-nums text-[14px] text-[var(--jx-steel)]'>
                                            <b className='font-[700] text-white'>{String(index + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
                                        </span>
                                        <span className='relative h-px w-24 overflow-hidden bg-[var(--jx-line)] sm:flex-1'>
                                            <span ref={barRef} className='absolute inset-0 origin-left bg-white rtl:origin-right' style={{ transform: 'scaleX(0)' }} />
                                        </span>
                                        <span className='flex gap-2'>
                                            <RoundButton label={tj('prevMember')} onClick={() => go(-1)} flip />
                                            <RoundButton label={tj('nextMember')} onClick={() => go(1)} />
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Roster */}
                        <ul
                            data-jx='rise'
                            className='m-0 grid list-none grid-cols-4 gap-3 p-0 max-lg:flex max-lg:gap-3 max-lg:overflow-x-auto max-lg:pb-2 max-lg:[scrollbar-width:none]'
                            aria-label={title}
                        >
                            {members.map((m, i) => {
                                const on = i === index;
                                const mName = m.name?.[locale] || m.name?.en || '';
                                return (
                                    <li key={m.id ?? i} className='max-lg:w-[96px] max-lg:shrink-0'>
                                        <button
                                            type='button'
                                            onClick={() => setIndex(i)}
                                            aria-current={on ? 'true' : undefined}
                                            className='group block w-full text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
                                        >
                                            <span
                                                className={`relative block aspect-square overflow-hidden rounded-[14px] bg-[image:var(--jx-brushed)] transition-[box-shadow,opacity] duration-500 ${
                                                    on ? 'opacity-100 shadow-[0_0_0_2px_#fff,0_0_24px_rgba(255,255,255,0.3)]' : 'opacity-50 group-hover:opacity-90'
                                                }`}
                                            >
                                                {m.image_url ? (
                                                    <Image
                                                        src={cmsImage(m.image_url, m.image_url)}
                                                        alt=''
                                                        fill
                                                        sizes='120px'
                                                        className='object-cover object-top mix-blend-multiply [filter:grayscale(1)]'
                                                    />
                                                ) : null}
                                            </span>
                                            <span className={`mt-2 block truncate text-[12.5px] transition-colors ${on ? 'font-[700] text-white' : 'text-[var(--jx-text-3)] group-hover:text-[var(--jx-text)]'}`}>{mName}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </JxScene>
    );
}

function RoundButton({ label, onClick, flip }) {
    return (
        <button
            type='button'
            aria-label={label}
            onClick={onClick}
            className='grid size-10 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
        >
            <svg viewBox='0 0 24 24' aria-hidden='true' className={`size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] ${flip ? '-scale-x-100 rtl:scale-x-100' : 'rtl:-scale-x-100'}`}>
                <path d='M5 12h14' />
                <path d='m13 6 6 6-6 6' />
            </svg>
        </button>
    );
}
