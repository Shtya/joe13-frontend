'use client';

import { JxButton, JxHeading, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion } from '@/components/jx/motion';
import { parseFigure } from '@/components/jx/projects/utils';
import { IconAscend, IconGlobe, IconGrowth, IconInnovation, IconMark, IconTeam } from '@/components/jx/StatementScene';
import { cmsImage } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { useId, useState } from 'react';

/* Localised CMS value with English fallback. */
export function useL() {
    const locale = useLocale();
    return obj => (obj && typeof obj === 'object' ? obj[locale] || obj.en || '' : obj || '');
}

const ICONS = [IconInnovation, IconGrowth, IconTeam, IconGlobe, IconAscend, IconMark];

function Heading({ id, text, size = 'text-[length:var(--jx-fs-3xl)]', align = 'start' }) {
    const parts = splitTitle(text);
    const lines = parts.map((t, i) => ({ text: t, tone: i === parts.length - 1 ? 'accent' : 'light' }));
    return <JxHeading id={id} lines={lines} className={`${size} leading-[1.3] ${align === 'center' ? 'text-center' : ''}`} />;
}

function Section({ id, label, children, className = '' }) {
    const ref = useViewMotion({ deps: [] });
    return (
        <section ref={ref} id={id} aria-labelledby={label} className={`jx relative py-[clamp(72px,11vh,128px)] ${className}`}>
            <div className='mx-auto w-full max-w-[1320px] px-[clamp(20px,5vw,72px)]'>{children}</div>
        </section>
    );
}

/* What we deliver — the service's capabilities on hairlines. */
export function Capabilities({ hero }) {
    const L = useL();
    const tj = useTranslations('Jx');
    const items = hero?.attr || [];
    if (!items.length) return null;
    return (
        <Section id='capabilities' label='capabilities-heading' className='border-t border-[var(--jx-line)]'>
            <div className='grid gap-x-[clamp(32px,6vw,110px)] gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
                <div className='lg:sticky lg:top-32 lg:self-start'>
                    <JxTag>{tj('capabilities')}</JxTag>
                    <div className='mt-5'>
                        <Heading id='capabilities-heading' text={L(hero?.title) || tj('capabilities')} />
                    </div>
                </div>
                <ul className='m-0 grid list-none gap-x-8 p-0 sm:grid-cols-2'>
                    {items.map((item, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <li key={i} data-jx='rise' className='group relative border-t border-[var(--jx-line)] py-7'>
                                <span aria-hidden='true' className='absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#fff,transparent)] transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right rtl:bg-[linear-gradient(270deg,#fff,transparent)]' />
                                <span className='grid size-12 place-items-center rounded-full p-3 text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-500 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)]'>
                                    <Icon />
                                </span>
                                <h3 className='jx-display m-0 mt-5 text-[18px] font-[700] leading-[1.5] text-[var(--jx-platinum)]'>{L(item.key)}</h3>
                                <p className='m-0 mt-2 text-[15px] leading-[1.85] text-[var(--jx-text-3)]'>{L(item.value)}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}

/* Why us — the argument, a checklist and the evidence image. */
export function Benefits({ benefits }) {
    const L = useL();
    const t = useTranslations();
    const list = benefits?.feature || [];
    if (!list.length && !L(benefits?.title)) return null;
    const img = benefits?.image?.url ? cmsImage(benefits.image.url, benefits.image.url) : '';
    return (
        <Section id='benefits' label='benefits-heading'>
            <div className='grid items-center gap-x-[clamp(32px,6vw,110px)] gap-y-12 lg:grid-cols-2'>
                <div>
                    <Heading id='benefits-heading' text={L(benefits?.title)} />
                    {L(benefits?.subTitle) ? <p data-jx='rise' className='m-0 mt-5 max-w-[34rem] text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>{L(benefits.subTitle)}</p> : null}
                    <ul className='m-0 mt-8 grid list-none gap-1 p-0'>
                        {list.map((item, i) => (
                            <li key={i} data-jx='rise' className='flex items-start gap-4 border-b border-[var(--jx-line)] py-4 last:border-b-0'>
                                <span aria-hidden='true' className='mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[image:var(--jx-brushed)] text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)]'>
                                    <svg viewBox='0 0 24 24' className='size-4 fill-none stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round]'>
                                        <path d='m5 12 5 5L20 7' />
                                    </svg>
                                </span>
                                <span className='text-[16px] leading-[1.75] text-[var(--jx-platinum)]'>{L(item)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-9'>
                        <JxButton href='/contact-us'>{t('contact-us-now')}</JxButton>
                    </div>
                </div>
                {img ? (
                    <div data-jx='rise' className='group relative aspect-[4/3.4] overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_60px_100px_-50px_rgba(0,0,0,0.95)]'>
                        <Image src={img} alt={benefits?.image?.alt || ''} fill sizes='(max-width: 1023px) 92vw, 45vw' quality={78} className='object-cover [filter:grayscale(0.5)] transition-[filter,transform] duration-[1200ms] group-hover:scale-[1.03] group-hover:[filter:grayscale(0)]' />
                    </div>
                ) : null}
            </div>
        </Section>
    );
}

/* Impact — chrome figures that count up, on hairlines. */
export function Impact({ impact }) {
    const L = useL();
    const stats = impact?.statics || [];
    if (!stats.length) return null;
    return (
        <Section id='impact' label='impact-heading' className='bg-[radial-gradient(60%_60%_at_50%_0%,rgba(199,203,209,0.07),transparent_70%)]'>
            <div className='mx-auto flex max-w-[860px] flex-col items-center text-center'>
                <Heading id='impact-heading' text={L(impact?.title)} align='center' />
                {L(impact?.subTitle) ? <p data-jx='rise' className='m-0 mt-5 text-[length:var(--jx-fs-lg)] leading-[1.8] text-[var(--jx-text-2)]'>{L(impact.subTitle)}</p> : null}
            </div>
            <ul className='m-0 mt-14 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4'>
                {stats.map((stat, i) => {
                    const fig = parseFigure(String(stat.count || '').replace(/,/g, ''));
                    return (
                        <li key={i} data-jx='rise' className='border-t border-[var(--jx-line-strong)] pt-5'>
                            <span dir='ltr' className='jx-display jx-accent block text-[clamp(2.6rem,1.6rem+2.4vw,3.8rem)] font-[300] leading-none tabular-nums'>
                                {fig.prefix}
                                {fig.number != null ? <span data-jx-count={fig.number}>{fig.number}</span> : null}
                                {fig.suffix}
                            </span>
                            <h3 className='jx-display m-0 mt-4 text-[16px] font-[700] leading-[1.5] text-[var(--jx-platinum)]'>{L(stat.name)}</h3>
                            {L(stat.desc) ? <p className='m-0 mt-2 text-[14px] leading-[1.8] text-[var(--jx-text-3)]'>{L(stat.desc)}</p> : null}
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
}

/* Partners — a quiet strip of marks. */
export function PartnersStrip({ partners }) {
    const tj = useTranslations('Jx');
    const list = (partners || []).filter(p => p?.url);
    if (!list.length) return null;
    const set = [];
    while (set.length < 10) set.push(...list);
    return (
        <Section id='service-partners' label='partners-heading' className='border-y border-[var(--jx-line)] !py-14'>
            <p id='partners-heading' className='m-0 text-center text-[13px] text-[var(--jx-text-3)]'>
                {tj('partnersTitle')}
            </p>
            <div data-jx='fade' dir='ltr' className='group mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]'>
                <ul className='m-0 flex w-max list-none animate-partners-marquee-ltr gap-0 p-0 group-hover:![animation-play-state:paused] motion-reduce:animate-none'>
                    {[...set, ...set].map((p, i) => (
                        <li key={i} aria-hidden={i >= set.length || undefined} className='flex h-24 w-[220px] shrink-0 items-center justify-center border-e border-[var(--jx-line)]'>
                            <Image src={cmsImage(p.url, p.url)} alt={i >= set.length ? '' : p.alt || ''} width={160} height={80} className='max-h-[60%] w-auto max-w-[70%] object-contain opacity-70 [filter:grayscale(1)_brightness(1.6)]' />
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

/* FAQ — hairline accordion; the + turns into × as the answer opens. */
export function Faq({ faqs }) {
    const L = useL();
    const tj = useTranslations('Jx');
    const [open, setOpen] = useState(0);
    const uid = useId();
    const list = faqs?.list || [];
    if (!list.length) return null;
    return (
        <Section id='faq' label='faq-heading'>
            <div className='grid gap-x-[clamp(32px,6vw,110px)] gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
                <div className='lg:sticky lg:top-32 lg:self-start'>
                    <JxTag>{tj('faq')}</JxTag>
                    <div className='mt-5'>
                        <Heading id='faq-heading' text={L(faqs?.title) || tj('faq')} />
                    </div>
                    {L(faqs?.subTitle) ? <p data-jx='rise' className='m-0 mt-5 text-[length:var(--jx-fs-lg)] leading-[1.8] text-[var(--jx-text-2)]'>{L(faqs.subTitle)}</p> : null}
                </div>
                <ul className='m-0 list-none p-0'>
                    {list.map((item, i) => {
                        const expanded = open === i;
                        const panelId = `${uid}-faq-${i}`;
                        return (
                            <li key={i} data-jx='rise' className='border-b border-[var(--jx-line)] first:border-t'>
                                <h3 className='m-0'>
                                    <button
                                        type='button'
                                        aria-expanded={expanded}
                                        aria-controls={panelId}
                                        onClick={() => setOpen(expanded ? -1 : i)}
                                        className='group flex w-full items-center justify-between gap-6 py-6 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                                    >
                                        <span className={`jx-display text-[17px] font-[700] leading-[1.6] transition-colors sm:text-[18px] ${expanded ? 'text-white' : 'text-[var(--jx-text-2)] group-hover:text-white'}`}>{L(item.question)}</span>
                                        <span
                                            aria-hidden='true'
                                            className={`grid size-10 shrink-0 place-items-center rounded-full transition-[transform,background,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                expanded ? 'rotate-45 bg-[image:var(--jx-brushed)] text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)]' : 'text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)]'
                                            }`}
                                        >
                                            <svg viewBox='0 0 24 24' className='size-4 fill-none stroke-current stroke-[2] [stroke-linecap:round]'>
                                                <path d='M12 5v14M5 12h14' />
                                            </svg>
                                        </span>
                                    </button>
                                </h3>
                                <div id={panelId} role='region' className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className='overflow-hidden'>
                                        <p className='m-0 pb-7 pe-14 text-[15.5px] leading-[1.9] text-[var(--jx-text-3)]'>{L(item.answer)}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}

/* Call to action — a closing panel. */
export function Call({ call }) {
    const L = useL();
    const t = useTranslations();
    if (!L(call?.title)) return null;
    const img = call?.image?.url ? cmsImage(call.image.url, call.image.url) : '';
    return (
        <Section id='call' label='call-heading' className='!pt-0'>
            <div className='relative grid items-center gap-10 overflow-hidden rounded-[28px] px-[clamp(24px,5vw,72px)] py-[clamp(40px,7vh,72px)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
                <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(70%_90%_at_0%_0%,rgba(199,203,209,0.12),transparent_60%)] rtl:bg-[radial-gradient(70%_90%_at_100%_0%,rgba(199,203,209,0.12),transparent_60%)]' />
                <div>
                    <Heading id='call-heading' text={L(call.title)} />
                    {L(call?.content) ? <p data-jx='rise' className='jx-display m-0 mt-5 text-[length:var(--jx-fs-xl)] font-[400] leading-[1.75] text-[var(--jx-platinum)]'>{L(call.content)}</p> : null}
                    {L(call?.subTitle) ? <p data-jx='rise' className='m-0 mt-3 text-[15.5px] leading-[1.85] text-[var(--jx-text-3)]'>{L(call.subTitle)}</p> : null}
                    <div className='mt-9'>
                        <JxButton href='/contact-us'>{t('contact-us-now')}</JxButton>
                    </div>
                </div>
                {img ? (
                    <div data-jx='rise' className='relative aspect-square w-full max-w-[420px] justify-self-center'>
                        <Image src={img} alt={call?.image?.alt || ''} fill sizes='420px' className='object-contain [filter:grayscale(0.6)]' />
                    </div>
                ) : null}
            </div>
        </Section>
    );
}

