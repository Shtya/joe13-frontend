'use client';

import { useValues } from '@/app/context';
import { JxHeading, JxTag } from '@/components/jx/primitives';
import { prefersReducedMotion, useSceneMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/*
 * Dossier — the services overlay for a business unit.
 *
 * Opens as an iris from the exact button that summoned it (a silver ring
 * bursts at that point), then the unit's glyph draws itself large beside a
 * three-line chrome title while the services cascade in on hairlines.
 * Closes by collapsing back into the button. Esc, backdrop-less close
 * button, focus trap and focus return are built in. The slider is frozen
 * while it is open (same contract as the legacy Modal).
 */
export default function JxDossier({ open, onClose, origin, title, lede, items = [], glyph }) {
    const t = useTranslations();
    const locale = useLocale();
    const { isModalOpen, setModalOpen } = useValues();
    const headingId = useId();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const closeRef = useRef(null);
    const returnRef = useRef(null);
    const originRef = useRef(origin);
    if (open && origin) originRef.current = origin;

    const iris = () => {
        const o = originRef.current || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        return `${o.x}px ${o.y}px`;
    };

    const ref = useSceneMotion(open && visible, {
        deps: [visible, locale, items.length],
        start: 0.55,
        extend: (tl, root) => {
            const shell = root.querySelector('.jx-dossier-iris');
            const ring = root.querySelector('.jx-dossier-burst');
            if (!shell) return;
            const at = iris();
            gsap.set(shell, { clipPath: `circle(0px at ${at})` });
            tl.fromTo(shell, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(150vmax at ${at})`, duration: 1.05, ease: 'expo.inOut', immediateRender: false }, 0);
            if (ring) {
                const o = originRef.current || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                gsap.set(ring, { left: o.x, top: o.y, scale: 0, opacity: 0 });
                tl.fromTo(ring, { scale: 0, opacity: 1 }, { scale: 9, opacity: 0, duration: 1.1, ease: 'expo.out', immediateRender: false }, 0.05);
            }
        },
    });

    useEffect(() => setMounted(true), []);

    // open → render; close → collapse the iris back into its origin, then unmount
    useEffect(() => {
        if (open) {
            returnRef.current = document.activeElement;
            setVisible(true);
            return undefined;
        }
        if (!visible) return undefined;
        const root = ref.current;
        const shell = root?.querySelector('.jx-dossier-iris');
        const finish = () => {
            setVisible(false);
            returnRef.current?.focus?.({ preventScroll: true });
        };
        if (!shell || prefersReducedMotion()) {
            finish();
            return undefined;
        }
        const tween = gsap.to(shell, { clipPath: `circle(0px at ${iris()})`, duration: 0.7, ease: 'expo.inOut', onComplete: finish });
        gsap.to(root.querySelectorAll('[data-jx]'), { opacity: 0, duration: 0.25, overwrite: 'auto' });
        return () => tween.kill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // freeze the slider + hide page chrome while open (legacy Modal contract)
    useEffect(() => {
        const body = document.body;
        if (open) {
            body.classList.add('modal-body');
            setModalOpen(false);
        } else {
            body.classList.remove('modal-body');
            setModalOpen(true);
        }
        return () => body.classList.remove('modal-body');
    }, [open, setModalOpen]);

    useEffect(() => {
        if (open && isModalOpen) onClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOpen]);

    useEffect(() => {
        if (!open) return undefined;
        const swiper = document.querySelector('.mySwiper')?.swiper;
        if (!swiper) return undefined;
        swiper.allowTouchMove = false;
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
        swiper.autoplay?.stop();
        swiper.mousewheel?.disable();
        return () => {
            swiper.allowTouchMove = true;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            const paused = swiper.el?.classList.contains('is-user-paused');
            if (!paused && !swiper.isEnd) swiper.autoplay?.start();
        };
    }, [open]);

    // Esc to close, Tab stays inside, focus the close control on open
    const onKeyDown = useCallback(
        event => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;
            const nodes = ref.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
            if (!nodes?.length) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onClose],
    );

    useEffect(() => {
        if (!open || !visible) return undefined;
        const id = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 450);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            window.clearTimeout(id);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, visible, onKeyDown]);

    if (!mounted || !visible) return null;

    const lines = [
        { text: t('Hero.fullService'), tone: 'light' },
        { text: title, tone: 'accent' },
        { text: t('Hero.solutions'), tone: 'light' },
    ].filter(l => l.text);
    const dense = items.length > 8;

    return createPortal(
        <div
            ref={ref}
            role='dialog'
            aria-modal='true'
            aria-labelledby={headingId}
            className='jx jx-dossier fixed inset-0 z-[1000000000000]'
        >
            <span aria-hidden='true' className='jx-dossier-burst pointer-events-none fixed z-[3] size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.35)]' />

            <div className='jx-dossier-iris absolute inset-0 overflow-y-auto overflow-x-hidden bg-[var(--jx-ink)] [scrollbar-color:var(--jx-gunmetal)_transparent] [scrollbar-width:thin]'>
                {/* ambient: soft silver bloom + grain */}
                <div aria-hidden='true' className='pointer-events-none fixed inset-0 bg-[radial-gradient(70%_60%_at_15%_85%,rgba(199,203,209,0.09),transparent_60%),radial-gradient(60%_50%_at_90%_0%,rgba(199,203,209,0.06),transparent_60%)] rtl:bg-[radial-gradient(70%_60%_at_85%_85%,rgba(199,203,209,0.09),transparent_60%),radial-gradient(60%_50%_at_10%_0%,rgba(199,203,209,0.06),transparent_60%)]' />
                <div aria-hidden='true' className='jx-scene-grain fixed' />

                <button
                    ref={closeRef}
                    type='button'
                    onClick={onClose}
                    aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
                    data-jx='pop'
                    className='group fixed end-[clamp(16px,3vw,40px)] top-[clamp(16px,3vw,36px)] z-20 grid size-14 place-items-center rounded-full bg-[rgba(11,12,14,0.7)] text-[var(--jx-platinum)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] backdrop-blur-md transition-[background,color,box-shadow,transform] duration-300 hover:rotate-90 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-md:size-12'
                >
                    <svg viewBox='0 0 24 24' aria-hidden='true' className='size-5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round]'>
                        <path d='M6 6l12 12M18 6 6 18' />
                    </svg>
                </button>

                <div className='relative mx-auto grid min-h-full w-full max-w-[1500px] gap-x-[clamp(32px,5vw,96px)] gap-y-10 px-[clamp(20px,5vw,96px)] py-[clamp(88px,12vh,128px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center'>
                    {/* Start column: identity of the unit */}
                    <div className='relative lg:sticky lg:top-0 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center'>
                        <JxTag>{t('Hero.ourServices')}</JxTag>
                        <JxHeading id={headingId} lines={lines} className='mt-5 text-[length:var(--jx-fs-4xl)] leading-[1.15]' />
                        {lede ? (
                            <p data-jx='rise' className='mt-6 max-w-[30rem] text-[length:var(--jx-fs-lg)] font-[400] leading-[1.75] text-[var(--jx-text-2)]'>
                                {lede}
                            </p>
                        ) : null}
                        {items.length ? (
                            <p data-jx='rise' className='jx-display mt-8 flex items-baseline gap-3 text-[var(--jx-text-3)]'>
                                <span dir='ltr' className='jx-accent text-[clamp(2.6rem,1.6rem+2.4vw,4rem)] font-[400] leading-none' data-jx-count={items.length}>
                                    {items.length}
                                </span>
                                <span className='text-[length:var(--jx-fs-md)]'>{t('Jx.services')}</span>
                            </p>
                        ) : null}
                        {glyph ? (
                            <div aria-hidden='true' className='jx-scene-glyph pointer-events-none !fixed bottom-[-14vh] start-[-8vw] -z-[1] aspect-square w-[min(36vw,520px)] !transform-none opacity-40 max-lg:hidden'>
                                {glyph}
                            </div>
                        ) : null}
                    </div>

                    {/* End column: the services, as an index on hairlines */}
                    <ul role='list' className={`m-0 grid list-none gap-x-8 p-0 ${dense ? 'md:grid-cols-2' : ''}`}>
                        {items.map((item, i) => {
                            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                            return (
                                <li
                                    key={`${item.label}-${i}`}
                                    data-jx='rise'
                                    className='group relative flex items-center gap-4 border-b border-[var(--jx-line)] py-4 sm:gap-5 sm:py-5'
                                >
                                    <span aria-hidden='true' className='absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#fff,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 rtl:origin-right rtl:bg-[linear-gradient(270deg,#fff,transparent)]' />
                                    <span className='grid size-12 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[color,box-shadow,background] duration-300 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)] sm:size-14'>
                                        <Icon />
                                    </span>
                                    <span className='min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5'>
                                        <span className='jx-display block text-[16px] font-[500] leading-[1.45] text-[var(--jx-platinum)] sm:text-[18px]'>{item.label}</span>
                                        {item.desc ? <span className='mt-1 block text-[14px] leading-[1.7] text-[var(--jx-text-3)]'>{item.desc}</span> : null}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>,
        document.body,
    );
}

/* Service icons — silver line icons, 1.6 stroke, 24px live area */
const icon = paths => {
    const Icon = () => (
        <svg viewBox='0 0 48 48' aria-hidden='true' className='size-6 fill-none stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] sm:size-7'>
            {paths}
        </svg>
    );
    return Icon;
};

const SERVICE_ICONS = [
    icon(<><path d='M7 21h9l18-9v24l-18-9H7z' /><path d='M16 27v10' /><path d='M35 17c3 2.3 4.5 4.8 4.5 8s-1.5 5.7-4.5 8' /></>),
    icon(<><rect x='9' y='15' width='30' height='20' rx='2' /><path d='M14 15v-5h20v5' /><path d='M15 35v5h18v-5' /><path d='M14 24h20' /></>),
    icon(<><path d='M24 7L38 15v18L24 41 10 33V15z' /><path d='M10 15l14 8 14-8' /><path d='M24 23v18' /></>),
    icon(<><rect x='7' y='9' width='34' height='24' rx='2' /><path d='M18 39h12' /><path d='M24 33v6' /></>),
    icon(<><rect x='8' y='8' width='32' height='32' rx='8' /><circle cx='24' cy='24' r='8' /><circle cx='34' cy='14' r='2' /></>),
    icon(<><circle cx='21' cy='21' r='12' /><path d='M30 30l10 10' /></>),
    icon(<><path d='M9 10h22v28H9z' /><path d='M15 17h10M15 23h10' /><path d='M28 31l9-9' /><path d='M32 19h6v6' /></>),
    icon(<><rect x='7' y='11' width='34' height='26' rx='4' /><path d='M20 17l12 7-12 7z' /></>),
    icon(<path d='M24 6l5.2 10.5L41 18l-8.5 8.3L34.5 38 24 32.5 13.5 38l2-11.7L7 18l11.8-1.5z' />),
    icon(<><rect x='7' y='8' width='34' height='32' rx='3' /><circle cx='17' cy='18' r='3' /><path d='M10 35l10-10 7 7 5-5 6 8' /></>),
    icon(<><rect x='8' y='7' width='32' height='34' rx='4' /><path d='M18 18l12 8-12 8z' /><path d='M34 11v5' /><path d='M31.5 13.5h5' /></>),
    icon(<><circle cx='24' cy='24' r='15' /><circle cx='24' cy='24' r='6' /><path d='M24 24l12-12' /><path d='M32 12h5v5' /></>),
    icon(<><circle cx='18' cy='17' r='6' /><circle cx='31' cy='18' r='5' /><path d='M7 38c0-7 4.5-11 11-11s11 4 11 11' /><path d='M28 29c1.5-2 3.5-3 6-3 4.2 0 7 3 7 8' /></>),
    icon(<><circle cx='24' cy='17' r='7' /><path d='M10 40c0-8 5.8-12 14-12s14 4 14 12' /></>),
    icon(<><circle cx='10' cy='24' r='5' /><circle cx='38' cy='12' r='5' /><circle cx='38' cy='36' r='5' /><path d='M14.5 22l18.5-8' /><path d='M14.5 26l18.5 8' /></>),
];
