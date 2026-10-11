'use client';

import { JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useSceneMotion, weightMorph } from '@/components/jx/motion';

/*
 * Statement scene — a belief stated plainly (vision, mission, values).
 *
 *   ● tag
 *   Title (chrome, light sweep)            ┌──────────┐
 *   Lede — the statement itself, large     │  glyph   │
 *   ─ pillar ─── pillar ─── pillar ─        └──────────┘
 *   ───── closing line ─────
 */
export default function StatementScene({ id, headingId, loading, active, image, shade = 'start', tag, title, lede, pillars = [], glyph, caption }) {
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));

    const ref = useSceneMotion(active, {
        deps: [loading, title],
        extend: (tl, root) => weightMorph(tl, root.querySelector('.jx-morph')),
    });

    return (
        <JxScene
            ref={ref}
            id={id}
            labelledBy={headingId}
            busy={loading}
            image={image}
            shade={shade}
            glyph={glyph}
            glyphClassName='end-[4%] top-[14%] aspect-square w-[min(40vw,600px)] max-lg:[--jx-sw:2] max-lg:end-[-22%] max-lg:top-[6%] max-lg:w-[86vw] max-lg:opacity-30'
        >
            <div className='w-full max-w-[680px] text-start'>
                {tag ? <JxTag>{tag}</JxTag> : null}
                <JxHeading id={headingId} lines={lines} className='mt-5 text-[length:var(--jx-fs-5xl)] leading-[1.12]' />
                {lede ? (
                    <p data-jx='rise' className='jx-display m-0 mt-6 max-w-[38rem] text-pretty text-[length:var(--jx-fs-xl)] font-[400] leading-[1.75] text-[var(--jx-platinum)]'>
                        {lede}
                    </p>
                ) : null}

                {pillars.length ? (
                    <ul className='m-0 mt-10 grid max-w-[620px] list-none grid-cols-3 gap-x-5 gap-y-6 p-0'>
                        {pillars.map(({ Icon, lines: label }, i) => (
                            <li key={i} data-jx='rise' className='group relative pt-5'>
                                <span aria-hidden='true' className='absolute inset-x-0 top-0 h-px bg-[var(--jx-line-strong)]' />
                                <span aria-hidden='true' className='absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#fff,var(--jx-steel))] transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right' />
                                <span aria-hidden='true' className='absolute -top-[3px] start-0 size-[7px] rounded-full bg-white shadow-[var(--jx-glint-glow)]' />
                                <span className='block size-11 text-[var(--jx-silver)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:text-white sm:size-12'>
                                    <Icon />
                                </span>
                                <span className='jx-display mt-3 block text-[15px] font-[700] leading-[1.5] text-[var(--jx-platinum)] sm:text-[16px]'>
                                    {label[0]}
                                    {label[1] ? <span className='block font-[400] text-[var(--jx-text-2)]'>{label[1]}</span> : null}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : null}

                {caption ? (
                    <p data-jx='rise' className='m-0 mt-12 flex items-center gap-4 text-[14px] text-[var(--jx-text-3)]'>
                        <i aria-hidden='true' className='block h-px w-10 bg-[linear-gradient(90deg,transparent,var(--jx-silver))] rtl:bg-[linear-gradient(270deg,transparent,var(--jx-silver))]' />
                        {caption}
                    </p>
                ) : null}
            </div>
        </JxScene>
    );
}

/* Pillar icons — silver line icons on a 48 grid. */
const I = 'size-full fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]';

export function IconInnovation() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <path d='M24 5c-7.2 0-12.8 5.6-12.8 12.8 0 3.8 1.7 7.3 4.6 9.7V33h16.4v-5.5c2.9-2.4 4.6-5.9 4.6-9.7C36.8 10.6 31.2 5 24 5Z' />
            <path d='M18 38h12M20 43h8M24 12v10M19 17h10' />
        </svg>
    );
}
export function IconGrowth() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <path d='M6 42h36M10 36v-7M19 36V23M28 36V18M37 36V11' />
            <path d='M8 22l10-7 8 4 13-10M33 9h6v6' />
        </svg>
    );
}
export function IconGlobe() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <circle cx='24' cy='24' r='17' />
            <path d='M7 24h34M24 7c5.5 5 8 10.5 8 17s-2.5 12-8 17M24 7c-5.5 5-8 10.5-8 17s2.5 12 8 17' />
        </svg>
    );
}
export function IconTeam() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <circle cx='24' cy='14' r='6' />
            <circle cx='12' cy='19' r='4.5' />
            <circle cx='36' cy='19' r='4.5' />
            <path d='M14 37c0-6.5 4-10.5 10-10.5S34 30.5 34 37M4 35c0-5 3-8 7.5-8M44 35c0-5-3-8-7.5-8' />
        </svg>
    );
}
export function IconAscend() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <path d='M6 40 18 26l8 7 16-20' />
            <path d='M34 13h8v8' />
            <path d='M6 44h36' />
        </svg>
    );
}
export function IconMark() {
    return (
        <svg viewBox='0 0 48 48' aria-hidden='true' className={I}>
            <path d='M24 5l5.4 11 12.1 1.7-8.8 8.5 2.1 12L24 32.5 13.2 38.2l2.1-12-8.8-8.5 12.1-1.7z' />
        </svg>
    );
}
