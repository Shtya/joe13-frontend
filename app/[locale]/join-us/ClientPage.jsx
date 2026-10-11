'use client';

import WhyChooseUs from '@/components/pages/join-us/WhyChooseUs';
import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion, weightMorph } from '@/components/jx/motion';
import { cmsImage, pickList, pickUi } from '@/helpers/cms';
import { hookJoinUs } from '@/hooks/hookJoinUs';
import { usePages } from '@/hooks/usePages';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Careers — Black & Silver.
 *   1. Hero: an open door. Chrome title, the invitation, one action, and the
 *      four things people get here as silver-ringed pillars. The JOE13 mark
 *      stands along the edge as an engraved watermark.
 *   2. The application opens as a sheet from the floor: why JOE13 on one
 *      side, the application plate on the other. Esc, focus trap and focus
 *      return are built in.
 */
const BG = '/landing/join-us-bg.png';
const SHEET_OUT = 380;

function paragraphs(raw) {
    return String(raw || '')
        .split(/\n+/)
        .map(part => part.trim())
        .filter(Boolean);
}

function normalizePairs(raw, fallback) {
    const source = Array.isArray(raw) && raw.length ? raw : fallback;
    return (fallback || []).map((item, index) => {
        const entry = source[index];
        if (Array.isArray(entry)) return [entry[0] || item[0], entry[1] || item[1] || ''];
        if (typeof entry === 'string' && entry.trim()) {
            const parts = entry.trim().split(/\s+/);
            if (parts.length === 1) return [parts[0], item[1] || ''];
            return [parts[0], parts.slice(1).join(' ')];
        }
        return item;
    });
}

export default function JoinPage({ initialData }) {
    const { loading: loadingPage, data } = usePages({ page_name: 'join-us', initialData });
    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const locale = useLocale();
    const t = useTranslations('JoinUs');
    const { register, errors, trigger, setValue, submit, watch, loading } = hookJoinUs();
    const [panelMounted, setPanelMounted] = useState(false);
    const [panelClosing, setPanelClosing] = useState(false);
    const sheetRef = useRef(null);
    const closeRef = useRef(null);
    const returnRef = useRef(null);

    const title = section1?.title?.[locale] || t('joinUs');
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));
    const description = paragraphs(section1?.content?.[locale] || t('aboutJoe13th'));
    const eyebrow = pickUi(section1, locale, 'eyebrow', t('eyebrow'));
    const watermark = pickUi(section1, locale, 'watermark', t('watermark'));
    const caption = pickUi(section1, locale, 'caption') || t.raw('caption');
    const benefits = normalizePairs(pickList(section1, locale, 'benefits'), t.raw('benefits'));

    const ref = useViewMotion({
        deps: [loadingPage, locale],
        threshold: 0.05,
        extend: (tl, root) => weightMorph(tl, root.querySelector('.jx-morph')),
    });

    const openPanel = () => {
        returnRef.current = document.activeElement;
        setPanelClosing(false);
        setPanelMounted(true);
    };

    const closePanel = useCallback(() => {
        setPanelClosing(true);
        window.setTimeout(() => {
            setPanelMounted(false);
            setPanelClosing(false);
            returnRef.current?.focus?.();
        }, SHEET_OUT);
    }, []);

    // lock the page, focus the sheet, Esc closes, Tab stays inside
    useEffect(() => {
        if (!panelMounted) return undefined;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus({ preventScroll: true });
        const onKey = e => {
            if (e.key === 'Escape') closePanel();
            if (e.key !== 'Tab' || !sheetRef.current) return;
            const items = [...sheetRef.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea,select,[tabindex]:not([tabindex="-1"])')].filter(el => el.offsetParent !== null);
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [panelMounted, closePanel]);

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={ref} id='join' labelledBy='join-heading' busy={loadingPage} priority image={cmsImage(section1?.image?.url, BG)} imagePosition='72% center' shade='deep'>
                {watermark ? (
                    <span
                        aria-hidden='true'
                        data-jx='fade'
                        data-jx-track='ambient'
                        className='jx-display pointer-events-none absolute bottom-[6%] start-[clamp(6px,1.2vw,22px)] top-[6%] z-[-1] flex items-center text-[clamp(84px,7.4vw,140px)] font-[800] leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:1px_rgba(199,203,209,0.13)] [writing-mode:vertical-rl] max-md:hidden rtl:rotate-180'
                    >
                        {watermark}
                    </span>
                ) : null}

                <div className='relative max-w-[46rem] text-start md:ps-[clamp(72px,8.6vw,160px)]'>
                    {eyebrow ? <JxTag>{eyebrow}</JxTag> : null}
                    <JxHeading as='h1' id='join-heading' lines={lines} className='mt-5 text-[length:var(--jx-fs-mega)] leading-[1.1]' />

                    {loadingPage ? (
                        <div className='mt-7 space-y-3'>
                            <span className='block h-5 w-full max-w-[600px] rounded skeleton-box' />
                            <span className='block h-5 w-4/5 max-w-[520px] rounded skeleton-box' />
                        </div>
                    ) : (
                        description.map((paragraph, i) => (
                            <p key={i} data-jx='rise' className='m-0 mt-6 max-w-[40rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                                {paragraph}
                            </p>
                        ))
                    )}

                    <div className='mt-9 flex flex-wrap gap-3'>
                        <JxButton icon='arrow' onClick={openPanel} aria-haspopup='dialog' aria-expanded={panelMounted}>
                            {t('applyNow')}
                        </JxButton>
                    </div>

                    {benefits.length ? (
                        <ul className='m-0 mt-[clamp(40px,7vh,64px)] grid max-w-[40rem] list-none grid-cols-2 gap-y-6 border-t border-[var(--jx-line)] p-0 pt-7 sm:grid-cols-4'>
                            {benefits.map((pair, index) => {
                                const Icon = BENEFIT_ICONS[index] || PeopleIcon;
                                return (
                                    <li key={`${pair[0]}-${index}`} data-jx='rise' className='flex flex-col items-start gap-3 sm:px-4 sm:first:ps-0 sm:[&:not(:first-child)]:border-s sm:[&:not(:first-child)]:border-[var(--jx-line)]'>
                                        <span className='grid size-14 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] [&_svg]:size-7'>
                                            <Icon />
                                        </span>
                                        <span className='jx-display text-[15px] font-[700] leading-[1.45] text-[var(--jx-platinum)]'>
                                            {pair[0]}
                                            {pair[1] ? (
                                                <>
                                                    {' '}
                                                    <span className='block font-[400] text-[var(--jx-text-2)]'>{pair[1]}</span>
                                                </>
                                            ) : null}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null}
                </div>

                {Array.isArray(caption) && caption.length ? (
                    <p data-jx='rise' className='pointer-events-none absolute bottom-[clamp(24px,5vh,48px)] end-[calc(var(--jx-gutter)+var(--jx-rail-safe))] m-0 flex items-center gap-3 text-[13px] text-[var(--jx-text-3)] max-lg:hidden'>
                        {caption.map((item, index) => (
                            <span key={item} className='flex items-center gap-3'>
                                {index > 0 ? <i aria-hidden='true' className='block h-px w-5 bg-[var(--jx-line-strong)]' /> : null}
                                {item}
                            </span>
                        ))}
                    </p>
                ) : null}
            </JxScene>

            {panelMounted ? (
                <div className='fixed inset-0 z-[99990] flex items-end justify-center' role='dialog' aria-modal='true' aria-labelledby='apply-heading'>
                    <div aria-hidden='true' className={`absolute inset-0 bg-[rgba(5,5,6,0.8)] backdrop-blur-[6px] ${panelClosing ? 'join-backdrop-out' : 'join-backdrop-in'}`} onClick={closePanel} />
                    <div
                        ref={sheetRef}
                        className={`${panelClosing ? 'join-slide-down' : 'join-slide-up'} relative z-10 flex max-h-[min(94svh,1000px)] w-[min(1320px,calc(100%-24px))] flex-col overflow-hidden rounded-t-[28px] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_-40px_120px_rgba(0,0,0,0.7)] max-sm:w-full`}
                    >
                        <span aria-hidden='true' className='pointer-events-none absolute inset-x-16 top-0 h-px bg-[image:var(--jx-chrome)] opacity-70' />
                        <header className='flex shrink-0 items-center justify-between gap-4 border-b border-[var(--jx-line)] px-[clamp(18px,3vw,44px)] py-4'>
                            <span className='flex items-center gap-3 text-[13.5px] text-[var(--jx-text-2)]'>
                                <i aria-hidden='true' className='block h-px w-6 bg-[image:var(--jx-chrome)]' />
                                {t('careersEyebrow')}
                            </span>
                            <button
                                ref={closeRef}
                                type='button'
                                onClick={closePanel}
                                aria-label={t('viewLess')}
                                className='grid size-11 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                            >
                                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round]'>
                                    <path d='M6 6l12 12M18 6 6 18' />
                                </svg>
                            </button>
                        </header>
                        <div data-lenis-prevent className='overflow-y-auto overscroll-contain px-[clamp(18px,3vw,44px)] pb-[max(36px,env(safe-area-inset-bottom))] pt-[clamp(24px,4vh,44px)]'>
                            <WhyChooseUs
                                data={section1}
                                register={register}
                                errors={errors}
                                trigger={trigger}
                                setValue={setValue}
                                submit={submit}
                                watch={watch}
                                loading={loading}
                                onViewLess={closePanel}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function Svg({ children }) {
    return (
        <svg viewBox='0 0 32 32' aria-hidden='true' className='fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]'>
            {children}
        </svg>
    );
}

function PeopleIcon() {
    return (
        <Svg>
            <circle cx='16' cy='10' r='4' />
            <circle cx='7.5' cy='13' r='3' />
            <circle cx='24.5' cy='13' r='3' />
            <path d='M9.5 25c0-4.4 2.6-7 6.5-7s6.5 2.6 6.5 7' />
            <path d='M2.5 23.5c0-3.3 1.8-5.2 4.6-5.2' />
            <path d='M29.5 23.5c0-3.3-1.8-5.2-4.6-5.2' />
        </Svg>
    );
}

function LearnIcon() {
    return (
        <Svg>
            <path d='M3 11.5 16 5l13 6.5L16 18 3 11.5Z' />
            <path d='M8.5 14.5v6c2 1.9 4.5 2.9 7.5 2.9s5.5-1 7.5-2.9v-6' />
            <path d='M29 11.5v8' />
        </Svg>
    );
}

function GrowthIcon() {
    return (
        <Svg>
            <path d='M4 27h24' />
            <path d='M7 27v-6M13 27v-10M19 27v-8M25 27V10' />
            <path d='m6 15 7-6 6 4 8-8' />
            <path d='M22 5h5v5' />
        </Svg>
    );
}

function ImpactIcon() {
    return (
        <Svg>
            <circle cx='16' cy='16' r='12' />
            <circle cx='16' cy='16' r='7' />
            <circle cx='16' cy='16' r='2' />
        </Svg>
    );
}

const BENEFIT_ICONS = [PeopleIcon, LearnIcon, GrowthIcon, ImpactIcon];
