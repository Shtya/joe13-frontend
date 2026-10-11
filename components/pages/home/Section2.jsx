'use client';

import { JxButton, JxHeading, JxScene, JxTag, splitAtComma } from '@/components/jx/primitives';
import { useSceneMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Slide 2 — "Telemetry".
 * The figures are read off an orbital arc instead of being boxed in cards:
 * each number hangs above its node, its meaning below. On phones the arc
 * folds into a two-column readout on hairlines.
 */

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const ARC = { p0: [20, 236], p1: [500, -40], p2: [980, 236], w: 1000, h: 260 };

function arcPoint(t) {
    const u = 1 - t;
    const x = u * u * ARC.p0[0] + 2 * u * t * ARC.p1[0] + t * t * ARC.p2[0];
    const y = u * u * ARC.p0[1] + 2 * u * t * ARC.p1[1] + t * t * ARC.p2[1];
    return [x, y];
}

export default function Section2({ data, loading, active = false }) {
    const t = useTranslations();
    const locale = useLocale();
    const isAr = locale === 'ar';

    const title = data?.title?.[locale] || t('section2');
    const description = data?.content?.[locale] || t('Hero.successDescription');
    const stats = data?.objectData?.[locale]
        ? Object.entries(data.objectData[locale]).filter(([key]) => !String(key).startsWith('_'))
        : [];
    const captions = pickUi(data, locale, 'statCaptions');
    const titleLines = splitAtComma(title).map((text, i, all) => ({ text, tone: i === all.length - 1 && all.length > 1 ? 'accent' : 'light' }));

    const ref = useSceneMotion(active, { deps: [loading, locale, stats.length], extend: igniteNodes });

    const downloadPDF = () => {
        const link = document.createElement('a');
        link.href = pickUi(data, locale, 'pdf', '/joe-pdf-en2.pdf');
        link.download = 'JOE13 Profile';
        link.click();
    };

    const n = stats.length;

    return (
        <JxScene
            ref={ref}
            id='success'
            labelledBy='home-success-heading'
            busy={loading}
            image={cmsImage(data?.image?.url, '/landing/bg-2-section.png')}
            shade='center'
            bodyClassName='items-center text-center'
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className='mx-auto flex w-full max-w-[1120px] flex-col items-center'>
                    <JxTag>{pickUi(data, locale, 'eyebrow', t('Hero.impact'))}</JxTag>

                    <JxHeading
                        id='home-success-heading'
                        lines={titleLines}
                        className='mt-5 text-[length:var(--jx-fs-3xl)] leading-[1.15] tracking-[-0.02em]'
                    />

                    {description ? (
                        <p data-jx='rise' className='mt-5 max-w-[40rem] text-pretty text-[length:var(--jx-fs-lg)] font-[400] leading-[1.6] text-[var(--jx-text-2)]'>
                            {description}
                        </p>
                    ) : null}

                    {n ? (
                        <div className='relative mt-10 w-full max-md:grid max-md:grid-cols-2 max-md:gap-x-5 max-md:gap-y-6 md:mt-[clamp(56px,9vh,104px)] md:aspect-[1000/260]'>
                            <svg viewBox={`0 0 ${ARC.w} ${ARC.h}`} aria-hidden='true' data-jx-track='ambient' className='absolute inset-0 size-full overflow-visible text-[var(--jx-silver)] max-md:hidden'>
                                <path
                                    d={`M${ARC.p0.join(' ')} Q${ARC.p1.join(' ')} ${ARC.p2.join(' ')}`}
                                    pathLength='1'
                                    data-jx='draw'
                                    className='jx-stroke jx-stroke--mid'
                                />
                                <path
                                    d={`M${ARC.p0.join(' ')} Q${ARC.p1.join(' ')} ${ARC.p2.join(' ')}`}
                                    pathLength='1'
                                    className='jx-comet jx-loop'
                                    style={{ animationDelay: '2.2s', animationDuration: '5s' }}
                                />
                                <g data-jx='fade'>
                                    <path
                                        d={`M${ARC.p0[0]} ${ARC.p0[1] + 22} Q${ARC.p1[0]} ${ARC.p1[1] + 22} ${ARC.p2[0]} ${ARC.p2[1] + 22}`}
                                        pathLength='1'
                                        className='jx-stroke jx-stroke--dim'
                                        strokeDasharray='0.004 0.006'
                                    />
                                </g>
                            </svg>

                            {stats.map(([name, rawValue], i) => {
                                const tt = n === 1 ? 0.5 : 0.1 + (0.8 * i) / (n - 1);
                                const [x, y] = arcPoint(tt);
                                const left = ((isAr ? ARC.w - x : x) / ARC.w) * 100;
                                const top = (y / ARC.h) * 100;
                                const caption = (Array.isArray(captions) && captions[i]) || statCaption(name, t);
                                return (
                                    <Stat
                                        key={name}
                                        name={name}
                                        rawValue={rawValue}
                                        caption={caption}
                                        style={{ '--x': `${left.toFixed(3)}%`, '--y': `${top.toFixed(3)}%` }}
                                    />
                                );
                            })}
                        </div>
                    ) : null}

                    <div className='mt-12 md:mt-[clamp(56px,8vh,88px)]'>
                        <JxButton icon='download' variant='ghost' onClick={downloadPDF}>
                            {pickUi(data, locale, 'cta', t('Download PDF'))}
                        </JxButton>
                    </div>
                </div>
            )}
        </JxScene>
    );
}

function Stat({ name, rawValue, caption, style }) {
    const { number, suffix } = parseStatValue(rawValue);
    return (
        <article
            data-jx='rise'
            style={style}
            className='group relative text-start max-md:border-t max-md:border-[var(--jx-line-strong)] max-md:pt-3 md:absolute md:left-[var(--x)] md:top-[var(--y)] md:size-0 md:text-center'
        >
            <p dir='ltr' className='jx-display m-0 whitespace-nowrap text-[clamp(2.4rem,1rem+2.9vw,4.3rem)] font-[400] leading-none tracking-[-0.04em] text-[var(--jx-text)] tabular-nums max-md:text-start md:absolute md:bottom-[18px] md:left-1/2 md:-translate-x-1/2 rtl:max-md:text-end'>
                <span className='me-0.5 align-top text-[0.42em] font-[400] text-[var(--jx-silver)]'>+</span>
                <span className='jx-accent' data-jx-count={number}>{number}</span>
                {suffix ? <span className='text-[0.5em] font-[300] text-[var(--jx-text-2)]'>{suffix}</span> : null}
            </p>
            <span
                aria-hidden='true'
                data-node className='absolute left-0 top-0 hidden size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--jx-silver)] bg-[var(--jx-ink)] transition-[background-color,box-shadow,transform] duration-300 group-hover:scale-125 group-hover:bg-[var(--jx-glint)] group-hover:shadow-[var(--jx-glint-glow)] md:block'
            />
            <div className='mt-2 md:absolute md:left-1/2 md:top-[18px] md:mt-0 md:w-[min(17vw,200px)] md:-translate-x-1/2'>
                <h3 className='jx-display m-0 text-[16px] font-[600] leading-[1.35] text-[var(--jx-text)] md:text-[18px]'>{name}</h3>
                {caption ? <p className='m-0 mt-1 text-[12.5px] font-[400] leading-[1.45] text-[var(--jx-text-3)] max-sm:hidden md:text-[13px]'>{caption}</p> : null}
            </div>
        </article>
    );
}

function parseStatValue(rawValue) {
    const value = String(rawValue ?? '');
    const hasPercent = value.includes('%') || value.includes('٪');
    const normalized = value.replace(/[٠-٩]/g, d => String(ARABIC_DIGITS.indexOf(d)));
    const number = parseFloat(hasPercent ? normalized.split(/[%٪]/)[0] : normalized) || 0;
    return { number, suffix: hasPercent ? '%' : '' };
}

function statCaption(name, t) {
    const key = String(name || '').toLowerCase();
    if (key.includes('city') || key.includes('cities') || key.includes('مدن')) return t('Hero.statCities');
    if (key.includes('growth') || key.includes('نمو')) return t('Hero.statGrowth');
    if (key.includes('client') || key.includes('عملاء')) return t('Hero.statClients');
    if (key.includes('project') || key.includes('مشروع')) return t('Hero.statProjects');
    return null;
}

/* Each figure's node ignites in turn as the arc finishes drawing. */
function igniteNodes(tl, root) {
    const nodes = [...root.querySelectorAll('[data-node]')];
    if (!nodes.length) return;
    const from = { backgroundColor: 'rgba(5,5,6,1)', boxShadow: '0 0 0 rgba(255,255,255,0)' };
    gsap.set(nodes, from);
    tl.fromTo(nodes, from, { backgroundColor: 'rgba(255,255,255,1)', boxShadow: '0 0 10px rgba(255,255,255,0.95), 0 0 24px rgba(255,255,255,0.45)', duration: 0.45, stagger: 0.16, ease: 'power2.out', immediateRender: false }, 1.1);
}
