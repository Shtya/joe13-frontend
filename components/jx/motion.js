'use client';

import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * JOE13 motion system.
 *
 * Mark elements with `data-jx="<pattern>"` and wrap the scene with
 * `useSceneMotion(active)`. The scene builds one GSAP timeline from the
 * marked elements (DOM order), plays it when the slide becomes active and
 * rewinds it after the slide leaves, so every visit is a fresh entrance.
 *
 *   line  – masked heading line; rises out of its `.jx-line` clip
 *   rise  – fade + lift + de-blur (copy, buttons, tags)
 *   fade  – opacity only (large ambient layers)
 *   pop   – spring scale (nodes, dots, badges)
 *   draw  – SVG stroke draws 0 → 1 (needs pathLength="1")
 *   bloom – a large layer surfaces from blur + scale (glyphs, illustrations)
 *
 * Optional attributes:
 *   data-jx-at="0.4"     absolute start (seconds) instead of the running cursor
 *   data-jx-count="180"  tween the element's text from 0 to the number
 */

export const EASE = {
    out: 'expo.out',
    soft: 'power3.out',
    inOut: 'power2.inOut',
    spring: 'back.out(1.8)',
};

export const DUR = { fast: 0.35, base: 0.75, slow: 1.1, draw: 1.6 };

/** Seconds after a slide becomes active before its entrance begins. */
export const SCENE_DELAY = 0.32;

const PATTERNS = {
    line: {
        from: { yPercent: 112, y: 0, opacity: 1 },
        to: { yPercent: 0, duration: 1.05, ease: EASE.out },
        gap: 0.1,
    },
    rise: {
        from: { opacity: 0, y: 26, filter: 'blur(8px)' },
        to: { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: EASE.out, clearProps: 'filter' },
        gap: 0.08,
    },
    fade: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 1.3, ease: 'power2.out' },
        gap: 0.04,
    },
    pop: {
        from: { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' },
        to: { opacity: 1, scale: 1, duration: 0.8, ease: EASE.spring },
        gap: 0.05,
    },
    stretch: {
        from: { opacity: 0, scaleX: 0 },
        to: { opacity: 1, scaleX: 1, duration: 1.3, ease: 'expo.inOut' },
        gap: 0.04,
    },
    bloom: {
        from: { opacity: 0, scale: 0.86, filter: 'blur(16px)' },
        to: { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: EASE.out, clearProps: 'filter' },
        gap: 0,
    },
    draw: {
        from: { strokeDasharray: 1, strokeDashoffset: 1 },
        to: { strokeDashoffset: 0, duration: DUR.draw, ease: EASE.inOut },
        gap: 0.05,
    },
};

// Dev-only handle for inspecting timelines from the console.
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') window.__jxGsap = gsap;

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function formatCount(value, target) {
    const decimals = String(target).includes('.') ? String(target).split('.')[1].length : 0;
    return value.toFixed(decimals);
}

/*
 * Two parallel tracks so decoration never delays reading:
 *   content — copy, buttons, data (staggered from `start`)
 *   ambient — anything inside [data-jx-track="ambient"] (glyphs, orbits,
 *             illustrations); starts at 0 with a much tighter stagger.
 */
function buildTimeline(tl, root, start = 0) {
    const cursors = { content: start, ambient: 0 };
    root.querySelectorAll('[data-jx]').forEach(el => {
        const pattern = PATTERNS[el.dataset.jx];
        if (!pattern) return;
        const track = el.closest('[data-jx-track="ambient"]') ? 'ambient' : 'content';
        const at = el.dataset.jxAt != null ? Number(el.dataset.jxAt) : cursors[track];
        tl.fromTo(el, pattern.from, { ...pattern.to, immediateRender: false }, at);
        gsap.set(el, pattern.from);
        if (el.dataset.jxAt == null) cursors[track] += track === 'ambient' ? pattern.gap * 0.3 : pattern.gap;

        el.querySelectorAll('[data-jx-count]').forEach(node => countInto(tl, node, at + 0.1));
        if (el.dataset.jxCount != null) countInto(tl, el, at + 0.1);
    });
}

function countInto(tl, node, at) {
    const target = Number(node.dataset.jxCount) || 0;
    const state = { v: 0 };
    node.textContent = formatCount(0, target);
    tl.to(
        state,
        {
            v: target,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () => {
                node.textContent = formatCount(state.v, target);
            },
        },
        at,
    );
}

/**
 * @param {boolean} active  whether this scene is the visible slide
 * @param {object}  opts
 * @param {Array}   opts.deps    rebuild when these change (e.g. loading, locale)
 * @param {number}  opts.start   seconds before the declarative entrances begin
 *                               (leave room for a bespoke opening in extend)
 * @param {(tl: gsap.core.Timeline, root: HTMLElement) => void} opts.extend
 *        add scene-specific tweens after the declarative ones
 */
export function useSceneMotion(active, { deps = [], extend, start = 0 } = {}) {
    const ref = useRef(null);
    const tlRef = useRef(null);
    const activeRef = useRef(active);
    activeRef.current = active;

    useIsoLayoutEffect(() => {
        const root = ref.current;
        if (!root) return undefined;
        const reduced = prefersReducedMotion();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true, delay: SCENE_DELAY });
            buildTimeline(tl, root, start);
            extend?.(tl, root);
            tlRef.current = tl;
            if (reduced) tl.progress(1);
            else if (activeRef.current) tl.restart(true);
        }, root);

        document.documentElement.classList.add('jx-ready');
        return () => {
            tlRef.current = null;
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        const tl = tlRef.current;
        if (!tl) return undefined;
        if (prefersReducedMotion()) {
            tl.progress(1);
            return undefined;
        }
        if (active) {
            tl.restart(true);
            return undefined;
        }
        // rewind once the slide has fully left the viewport
        const id = window.setTimeout(() => tl.pause(0), 1100);
        return () => window.clearTimeout(id);
    }, [active]);

    return ref;
}

/**
 * Scrolling pages: same scene timeline, but it plays once the element
 * scrolls into view (and stays played). Returns the ref to attach.
 */
export function useViewMotion({ threshold = 0.18, ...opts } = {}) {
    const [inView, setInView] = useState(false);
    const ref = useSceneMotion(inView, opts);
    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return undefined;
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            entries => {
                if (entries.some(e => e.isIntersecting)) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold },
        );
        io.observe(el);
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);
    return ref;
}

/**
 * Signature title move. A chrome light sweeps across the word as it sharpens
 * (works with any font); variable fonts (Latin Alexandria) also morph from
 * hairline-wide to heavy-tight. Use on a .jx-accent element.
 */
export function weightMorph(tl, el, at = 0.05) {
    if (!el) return;
    const from = { fontVariationSettings: "'wght' 100", letterSpacing: '0.14em', backgroundPosition: '120% 50%', filter: 'blur(10px)' };
    gsap.set(el, from);
    tl.fromTo(
        el,
        from,
        { fontVariationSettings: "'wght' 800", letterSpacing: '0em', backgroundPosition: '0% 50%', filter: 'blur(0px)', duration: 2.2, ease: 'expo.out', immediateRender: false, clearProps: 'filter' },
        at,
    );
}
