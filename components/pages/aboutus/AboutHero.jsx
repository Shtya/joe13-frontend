'use client';

import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useSceneMotion, weightMorph } from '@/components/jx/motion';
import { cmsImage, pickUi } from '@/helpers/cms';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';

/*
 * About 1 — "Origin".
 * A chrome title over the company's story, and the signature: a timeline
 * from the founding year to today. The rail draws itself, each year's tick
 * lights in turn, a glint travels the journey and settles on "today" while
 * the year counts up to the present.
 */
const FALLBACK_FOUNDED = 2013;

export default function AboutHero({ data, loading, active = true }) {
    const t = useTranslations();
    const tj = useTranslations('Jx');
    const locale = useLocale();

    const title = data?.title?.[locale] || t('aboutUs.aboutUsTitle');
    const description = data?.content?.[locale] || t('aboutUs.aboutUs');
    const eyebrow = pickUi(data, locale, 'eyebrow', t('Hero.aboutEyebrow'));
    const slogan = pickUi(data, locale, 'slogan', t('Hero.tagline'));
    const founded = foundingYear(`${data?.content?.en || ''} ${description}`);
    const now = new Date().getFullYear();
    const years = Array.from({ length: Math.max(1, now - founded + 1) }, (_, i) => founded + i);

    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));

    const ref = useSceneMotion(active, {
        deps: [loading, locale, title],
        extend: (tl, root) => {
            weightMorph(tl, root.querySelector('.jx-morph'));
            runTimeline(tl, root, founded, now);
        },
    });

    return (
        <JxScene
            ref={ref}
            id='about'
            labelledBy='about-heading'
            busy={loading}
            priority
            image={cmsImage(data?.image?.url, '/landing/about-us-bg-1.png')}
            shade='start'
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className='w-full max-w-[1180px]'>
                    <JxTag parts={[eyebrow, slogan].filter(Boolean)} />
                    <JxHeading as='h1' id='about-heading' lines={lines} className='mt-5 text-[length:var(--jx-fs-mega)] leading-[1.1]' />
                    {description ? (
                        <p data-jx='rise' className='mt-6 max-w-[44rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                            {description}
                        </p>
                    ) : null}
                    <div className='mt-8'>
                        <JxButton href='/contact-us'>{t('contact us')}</JxButton>
                    </div>

                    {/* Timeline: founding year → today */}
                    <figure data-timeline className='m-0 mt-[clamp(40px,8vh,80px)]' aria-label={tj('timeline')}>
                        <div className='flex items-end justify-between gap-6'>
                            <div data-jx='rise'>
                                <span className='block text-[13px] text-[var(--jx-text-3)]'>{tj('founded')}</span>
                                <span dir='ltr' className='jx-display jx-accent mt-1 block text-[clamp(2rem,1.2rem+2.4vw,3.4rem)] font-[300] leading-none tabular-nums'>
                                    {founded}
                                </span>
                            </div>
                            <div data-jx='rise' className='text-end'>
                                <span className='block text-[13px] text-[var(--jx-text-3)]'>{tj('today')}</span>
                                <span dir='ltr' data-year-now className='jx-display mt-1 block text-[clamp(2rem,1.2rem+2.4vw,3.4rem)] font-[800] leading-none text-white tabular-nums'>
                                    {now}
                                </span>
                            </div>
                        </div>

                        <div className='relative mt-5 h-6' aria-hidden='true'>
                            <span className='absolute inset-x-0 top-1/2 h-px bg-[var(--jx-line)]' />
                            <span data-rail className='absolute inset-x-0 top-1/2 h-px origin-left bg-[linear-gradient(90deg,var(--jx-steel),#fff)] shadow-[0_0_10px_rgba(255,255,255,0.5)] rtl:origin-right rtl:bg-[linear-gradient(270deg,var(--jx-steel),#fff)]' />
                            <ol className='absolute inset-0 m-0 flex list-none items-center justify-between p-0'>
                                {years.map((year, i) => (
                                    <li key={year} data-tick className='relative flex h-full w-px items-center justify-center'>
                                        <span className={`block w-px bg-[var(--jx-silver)] ${i === 0 || i === years.length - 1 ? 'h-6' : 'h-2.5'}`} />
                                    </li>
                                ))}
                            </ol>
                            <span data-bead className='absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-[var(--jx-glint-glow)] [inset-inline-start:0]' />
                        </div>

                        <ol className='m-0 mt-2 hidden list-none justify-between p-0 text-[11.5px] tabular-nums text-[var(--jx-steel)] md:flex' dir='ltr'>
                            {(locale === 'ar' ? [...years].reverse() : years).map(year => (
                                <li key={year} className='relative h-4 w-px'>
                                    <span className='absolute left-1/2 top-0 -translate-x-1/2'>{String(year).slice(2)}</span>
                                </li>
                            ))}
                        </ol>
                    </figure>
                </div>
            )}
        </JxScene>
    );
}

function foundingYear(text) {
    const m = String(text).match(/\b(19[89]\d|20[0-2]\d)\b/);
    return m ? Number(m[1]) : FALLBACK_FOUNDED;
}

/* Rail draws → ticks light in sequence → glint travels → present year counts up. */
function runTimeline(tl, root, founded, now) {
    const rail = root.querySelector('[data-rail]');
    const ticks = [...root.querySelectorAll('[data-tick] > span')];
    const bead = root.querySelector('[data-bead]');
    const nowEl = root.querySelector('[data-year-now]');
    const box = root.querySelector('[data-timeline] .relative');
    if (!rail || !bead || !box) return;
    const start = 0.9;
    const span = 2.2;

    gsap.set(rail, { scaleX: 0 });
    tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: span, ease: 'power2.inOut', immediateRender: false }, start);

    if (ticks.length) {
        const from = { backgroundColor: 'rgba(140,145,153,0.35)', boxShadow: '0 0 0 rgba(255,255,255,0)' };
        gsap.set(ticks, from);
        tl.fromTo(
            ticks,
            from,
            { backgroundColor: '#ffffff', boxShadow: '0 0 8px rgba(255,255,255,0.9)', duration: 0.3, stagger: span / ticks.length, ease: 'power1.out', immediateRender: false },
            start,
        );
    }

    const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    const distance = () => (box.clientWidth - bead.offsetWidth) * dir;
    gsap.set(bead, { x: 0, opacity: 0 });
    tl.fromTo(bead, { x: 0, opacity: 0 }, { x: distance, opacity: 1, duration: span, ease: 'power2.inOut', immediateRender: false }, start);

    if (nowEl) {
        const state = { y: founded };
        nowEl.textContent = String(founded);
        tl.to(state, { y: now, duration: span, ease: 'power2.inOut', onUpdate: () => (nowEl.textContent = String(Math.round(state.y))) }, start);
    }
}
