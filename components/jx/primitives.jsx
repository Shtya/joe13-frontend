'use client';

import { Link } from '@/navigation';
import Image from '@/components/jx/SafeImage';
import { forwardRef } from 'react';

/* ------------------------------------------------------------------------
   Scene — full-screen slide shell: photo plate, directional shade, grain,
   an optional line-art glyph layer, and a padded body that clears the rail.
   ------------------------------------------------------------------------ */
export const JxScene = forwardRef(function JxScene(
    { id, labelledBy, busy, image, imagePosition = 'center', priority = false, shade = 'start', glyph, glyphClassName = '', className = '', bodyClassName = '', overlay, aura = false, children },
    ref,
) {
    return (
        <section ref={ref} id={id} aria-labelledby={labelledBy} aria-busy={busy || undefined} className={`jx jx-scene ${className}`}>
            {image ? (
                <div className={`jx-scene-bg ${aura ? 'jx-scene-bg--aura' : ''}`} aria-hidden='true'>
                    <Image
                        src={image}
                        alt=''
                        fill
                        priority={priority}
                        sizes='100vw'
                        quality={72}
                        className='jx-kenburns object-cover'
                        style={{ objectPosition: imagePosition }}
                    />
                </div>
            ) : null}
            <div className='jx-scene-shade' data-side={shade} aria-hidden='true' />
            <div className='jx-scene-grain' aria-hidden='true' />
            {glyph ? (
                <div className={`jx-scene-glyph ${glyphClassName}`} aria-hidden='true' data-jx-track='ambient'>
                    {glyph}
                </div>
            ) : null}
            <div className={`jx-scene-body ${bodyClassName}`}>{children}</div>
            {overlay}
        </section>
    );
});

/* ------------------------------------------------------------------------
   Heading — each line is masked and revealed on its own. Tone per line:
   'thin' (weight 200) | 'strong' (600) | 'accent' (600 + signal gradient).
   ------------------------------------------------------------------------ */
const TONES = {
    thin: 'font-[200]',
    light: 'font-[300]',
    strong: 'font-[700]',
    accent: 'font-[700] jx-accent',
};

export function JxHeading({ as: Tag = 'h2', id, lines, className = '', style }) {
    return (
        <Tag id={id} className={`jx-display m-0 ${className}`} style={style}>
            {lines.map((line, i) => (
                <span key={i} className='jx-line'>
                    {i > 0 ? ' ' : null}
                    <span data-jx='line' className={`${TONES[line.tone] || ''} ${line.className || ''}`}>
                        {line.text}
                    </span>
                </span>
            ))}
        </Tag>
    );
}

/* ------------------------------------------------------------------------
   Tag — the "live signal" label above a heading. Sentence case, ember dot.
   Accepts a string or an array of parts (rendered with hairline joins).
   ------------------------------------------------------------------------ */
const FUNCTION_WORDS = new Set(['في', 'كل', 'التي', 'الذي', 'من', 'على', 'و', 'in', 'every', 'that', 'of', 'the', 'and', 'to', 'for']);

export function JxTag({ children, parts, className = '', motion = 'rise' }) {
    // CMS sometimes splits a sentence into "parts"; only true word-lists get hairline joins
    const isSentence = parts?.some(p => FUNCTION_WORDS.has(String(p).trim().toLowerCase()));
    if (parts?.length && isSentence) {
        children = parts.join(' ');
        parts = null;
    }
    const items = parts?.length ? parts : null;
    return (
        <p data-jx={motion} className={`jx-tag ${className}`}>
            {items
                ? items.map((part, i) => (
                      <span key={`${part}-${i}`} className='inline-flex items-center gap-[10px]'>
                          {i > 0 ? <i aria-hidden='true' className='jx-tag-sep' /> : null}
                          {sentenceCase(part)}
                      </span>
                  ))
                : sentenceCase(children)}
        </p>
    );
}

/** CMS eyebrows arrive in ALL CAPS for English; the system speaks in sentence case. */
export function sentenceCase(text) {
    const s = String(text ?? '').trim();
    if (!s || s !== s.toUpperCase() || !/[A-Z]/.test(s)) return s;
    const lower = s.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/* ------------------------------------------------------------------------
   Button — the charged capsule. Variants: 'primary' | 'ghost'.
   Icons: 'arrow' | 'download' | 'plus'.
   ------------------------------------------------------------------------ */
const ICONS = {
    arrow: (
        <svg viewBox='0 0 24 24' data-flip aria-hidden='true'>
            <path d='M5 12h14' />
            <path d='m13 6 6 6-6 6' />
        </svg>
    ),
    download: (
        <svg viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M12 4v11' />
            <path d='m7 10 5 5 5-5' />
            <path d='M5 20h14' />
        </svg>
    ),
    plus: (
        <svg viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M12 5v14' />
            <path d='M5 12h14' />
        </svg>
    ),
};

export function JxButton({ href, onClick, children, icon = 'arrow', variant = 'primary', className = '', motion = 'rise', ...rest }) {
    const classes = `jx-btn ${variant === 'ghost' ? 'jx-btn--ghost' : ''} ${className}`.trim();
    const content = (
        <>
            <span>{children}</span>
            <span className='jx-btn-orb' aria-hidden='true'>
                {ICONS[icon] || ICONS.arrow}
            </span>
        </>
    );
    if (href) {
        return (
            <Link href={href} onClick={onClick} className={classes} data-icon={icon} data-jx={motion || undefined} {...rest}>
                {content}
            </Link>
        );
    }
    return (
        <button type='button' onClick={onClick} className={classes} data-icon={icon} data-jx={motion || undefined} {...rest}>
            {content}
        </button>
    );
}

/* ------------------------------------------------------------------------
   Copy helpers
   ------------------------------------------------------------------------ */

/**
 * Split a CMS title into two balanced lines at the most natural joint:
 * a comma, an ampersand or the Arabic conjunction "و". The second line
 * carries the emphasis. Single words stay on one line.
 */
export function splitTitle(title) {
    const text = String(title ?? '').trim();
    if (!text) return [];
    const candidates = [];
    const push = (cut, keepLeft) => candidates.push({ cut, keepLeft });

    for (const m of text.matchAll(/[,،]\s*/g)) push(m.index + m[0].length, true);
    // conjunctions open the second line ("Software / & AI", "Units / and their services")
    for (const m of text.matchAll(/\s(&|and)\s/gi)) push(m.index + 1, false);
    for (const m of text.matchAll(/\sو(?=[؀-ۿ])/g)) push(m.index + 1, false);

    if (!candidates.length) {
        const words = text.split(/\s+/);
        if (words.length < 3) return [text];
        const mid = Math.ceil(words.length / 2);
        return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
    }

    const middle = text.length / 2;
    const best = candidates.reduce((a, b) => (Math.abs(b.cut - middle) < Math.abs(a.cut - middle) ? b : a));
    return [text.slice(0, best.cut).trim(), text.slice(best.cut).trim()].filter(Boolean);
}

/** Split copy into two sentences at the first comma, for paced two-line ledes. */
export function splitAtComma(text) {
    const s = String(text ?? '');
    const i = Math.max(s.indexOf(','), s.indexOf('،'));
    if (i < 0) return [s];
    return [s.slice(0, i + 1).trim(), s.slice(i + 1).trim()].filter(Boolean);
}

/* ------------------------------------------------------------------------
   Slider navigation (the home page is a single Swiper instance)
   ------------------------------------------------------------------------ */
export function slideTo(index) {
    const swiper = typeof document !== 'undefined' ? document.querySelector('.mySwiper')?.swiper : null;
    swiper?.slideTo(index);
}

export function slideNext(event) {
    const swiper = typeof document !== 'undefined' ? document.querySelector('.mySwiper')?.swiper : null;
    if (!swiper || swiper.isEnd) return;
    event?.preventDefault();
    swiper.slideNext();
}
