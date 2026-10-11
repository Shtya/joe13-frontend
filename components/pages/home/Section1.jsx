'use client';

import { JxButton, JxScene, slideNext, splitAtComma } from '@/components/jx/primitives';
import { useSceneMotion } from '@/components/jx/motion';
import { cmsImage, pickUi } from '@/helpers/cms';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

/*
 * Slide 1 — "Aperture".
 *
 * The page opens like a camera shutter: a slit of silver light draws across
 * the black, the two leaves part, and the scene is exposed. The wordmark is
 * unveiled from its centre and behaves like polished metal — a glint sweeps
 * across it every few seconds and a specular highlight follows the pointer.
 * It stands on a black mirror: a stage light, a silver horizon line with a
 * travelling glint, and a faint reflection.
 *
 * The title is set as a lockup: a nameplate (what we are) over a statement
 * (the proof), whose number counts up in chrome.
 */

const CONTENT_START = 1.15; // seconds — copy enters once the aperture is open

export default function Section1({ data, loading, active = true }) {
    const t = useTranslations();
    const locale = useLocale();
    const title = data?.title?.[locale] || t('section1');
    const description = data?.content?.[locale] || t('Hero.description');
    const { nameplate, statement } = heroLockup(title, locale);
    const logo = cmsImage(pickUi(data, locale, 'logo'), '/assets/svg/logo-white.svg');

    const ref = useSceneMotion(active, {
        deps: [loading, locale, title],
        start: CONTENT_START,
        extend: (tl, root) => openAperture(tl, root),
    });

    return (
        <JxScene
            ref={ref}
            labelledBy='home-hero-heading'
            busy={loading}
            priority
            image={cmsImage(data?.image?.url, '/landing/bg-hero.png')}
            imagePosition='center bottom'
            shade='center'
            bodyClassName='items-center text-center'
            overlay={
                <div className='jx-aperture' aria-hidden='true'>
                    <span className='jx-aperture-leaf' data-leaf='top' />
                    <span className='jx-aperture-leaf' data-leaf='bottom' />
                    <span className='jx-aperture-slit' />
                </div>
            }
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className='mx-auto flex w-full max-w-[1080px] flex-col items-center'>
                    {/* Wordmark on a black mirror: stage light, horizon line, reflection */}
                    <div className='relative aspect-[473/140] w-[min(76vw,540px)]'>
                        <span aria-hidden='true' data-jx='fade' data-jx-at='1.1' className='jx-stagelight' />

                        <div className='jx-tilt relative size-full'>
                            <div className='jx-mark relative size-full' style={{ '--jx-mark': `url("${logo}")` }}>
                                <Image
                                    src={logo}
                                    alt='JOE13'
                                    fill
                                    priority
                                    sizes='(max-width: 767px) 76vw, 540px'
                                    className='object-contain [filter:drop-shadow(0_0_22px_rgba(255,255,255,0.22))]'
                                />
                                <span aria-hidden='true' className='jx-mark-light jx-mark-spec' />
                                <span aria-hidden='true' className='jx-mark-light jx-mark-glint jx-loop' />
                            </div>
                        </div>

                        <div aria-hidden='true' className='jx-horizon'>
                            <span className='jx-floor' data-jx='stretch' data-jx-at='1.45' />
                            <span className='jx-floor-bead jx-loop' />
                        </div>
                        <div aria-hidden='true' className='jx-reflection' data-jx='fade' data-jx-at='1.85'>
                            <Image src={logo} alt='' fill sizes='(max-width: 767px) 76vw, 540px' className='object-contain' />
                        </div>
                    </div>

                    {/* Lockup: nameplate over statement */}
                    <h1 id='home-hero-heading' className='jx-display m-0 mt-[clamp(64px,11vh,112px)] flex w-full flex-col items-center'>
                        {nameplate ? (
                            <span className='flex w-full items-center justify-center gap-4 sm:gap-6'>
                                <span aria-hidden='true' data-jx='stretch' className='jx-plate-rule h-px w-[clamp(28px,8vw,96px)] origin-right bg-[linear-gradient(90deg,transparent,var(--jx-silver))] rtl:origin-left rtl:bg-[linear-gradient(270deg,transparent,var(--jx-silver))]' />
                                <span className='jx-line'>
                                    <span data-jx='line' className='text-[length:var(--jx-fs-xl)] font-[400] text-[var(--jx-silver)] [font-family:var(--jx-font)] sm:text-[length:var(--jx-fs-2xl)]'>
                                        {nameplate}
                                    </span>
                                </span>
                                <span aria-hidden='true' data-jx='stretch' className='jx-plate-rule h-px w-[clamp(28px,8vw,96px)] origin-left bg-[linear-gradient(270deg,transparent,var(--jx-silver))] rtl:origin-right rtl:bg-[linear-gradient(90deg,transparent,var(--jx-silver))]' />
                            </span>
                        ) : null}
                        <span className='jx-line mt-3 sm:mt-4'>
                            <span
                                data-jx='line'
                                className='text-balance text-[clamp(1.75rem,0.9rem+3.6vw,3.9rem)] font-[600] leading-[1.25] text-[var(--jx-platinum)]'
                            >
                                <Statement {...statement} />
                            </span>
                        </span>
                    </h1>

                    {description ? (
                        <p data-jx='rise' className='mt-6 max-w-[38rem] text-pretty text-[length:var(--jx-fs-lg)] font-[400] leading-[1.75] text-[var(--jx-text-2)]'>
                            {splitAtComma(description).map((part, i) => (
                                <span key={i} className='block'>
                                    {part}
                                </span>
                            ))}
                        </p>
                    ) : null}

                    <div className='mt-9'>
                        <JxButton href='/contact-us'>{pickUi(data, locale, 'cta', t('contact us'))}</JxButton>
                    </div>
                </div>
            )}

            <button
                type='button'
                onClick={slideNext}
                data-jx='fade'
                className='group absolute bottom-[clamp(20px,4vh,40px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[12px] text-[var(--jx-text-3)] transition-colors hover:text-[var(--jx-text)] max-md:hidden'
            >
                <span aria-hidden='true' className='relative block h-10 w-px overflow-hidden bg-[var(--jx-line)]'>
                    <span className='jx-loop absolute inset-x-0 top-0 h-3 animate-[jx-cue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-white shadow-[var(--jx-glint-glow)]' />
                </span>
                {t('Jx.scroll')}
            </button>
        </JxScene>
    );
}

/* The proof line: the number becomes a chrome numeral that counts up. */
function Statement({ before, number, after, plus }) {
    if (number == null) return before;
    return (
        <>
            {before}
            {before ? ' ' : null}
            <span dir='ltr' className='jx-accent mx-[0.08em] inline-block align-[-0.08em] text-[1.45em] font-[800] leading-[0.9] tabular-nums'>
                {plus ? '+' : null}
                <span data-jx-count={number}>{number}</span>
            </span>
            {after ? ' ' : null}
            {after}
        </>
    );
}

function heroLockup(title, locale) {
    const pattern = locale === 'ar' ? /(بخبرة|خبرة تزيد)/ : /\+\s*\d+/;
    const match = title.match(pattern);
    const nameplate = match ? title.slice(0, match.index).trim() : '';
    const rest = match ? title.slice(match.index).trim() : title;

    const normalized = rest.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
    const num = normalized.match(/\d+/);
    if (!num) return { nameplate, statement: { before: rest } };

    let before = rest.slice(0, num.index).trim();
    const after = rest.slice(num.index + num[0].length).trim();
    const plus = before.endsWith('+');
    if (plus) before = before.slice(0, -1).trim();
    return { nameplate, statement: { before, number: Number(num[0]), after, plus } };
}

/* Shutter → slit → leaves part → wordmark unveils from its centre → glint. */
function openAperture(tl, root) {
    const top = root.querySelector('[data-leaf="top"]');
    const bottom = root.querySelector('[data-leaf="bottom"]');
    const slit = root.querySelector('.jx-aperture-slit');
    const mark = root.querySelector('.jx-mark');
    const glint = root.querySelector('.jx-mark-glint');
    if (!top || !bottom || !slit) return;

    const states = [
        [slit, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.75, ease: 'expo.inOut' }, 0],
        [top, { yPercent: 0 }, { yPercent: -101, duration: 1.25, ease: 'expo.inOut' }, 0.55],
        [bottom, { yPercent: 0 }, { yPercent: 101, duration: 1.25, ease: 'expo.inOut' }, 0.55],
    ];
    if (mark) states.push([mark, { clipPath: 'inset(0% 50% 0% 50%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'expo.inOut' }, 0.75]);
    if (glint) states.push([glint, { backgroundPosition: '130% 0' }, { backgroundPosition: '-30% 0', duration: 1.3, ease: 'power2.inOut' }, 1.7]);

    states.forEach(([el, from, to, at]) => {
        gsap.set(el, from);
        tl.fromTo(el, from, { ...to, immediateRender: false }, at);
    });
    tl.to(slit, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0.95);
}
