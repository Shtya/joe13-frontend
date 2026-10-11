'use client';

import FilterRail from '@/components/jx/FilterRail';
import { JxHeading, JxTag, splitAtComma } from '@/components/jx/primitives';
import { prefersReducedMotion, useViewMotion } from '@/components/jx/motion';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

/*
 * Archive — any collection, filterable by department.
 * Header (tag + chrome title) → FilterRail with counts → grid that re-deals
 * its cards on every filter change → "show more" in pages.
 *
 * Cards must render a root with [data-card] so they can be dealt.
 */
export default function JxArchive({ id, items = [], loading, tag, title, renderCard, emptyText, page = 9, skeletonClass = 'aspect-[4/5]' }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const [active, setActive] = useState('all');
    const [limit, setLimit] = useState(page);
    const gridRef = useRef(null);

    const options = useMemo(() => {
        const map = new Map();
        items.forEach(item => {
            const dep = item.department;
            if (dep?.id == null) return;
            const entry = map.get(dep.id) || { id: dep.id, name: dep.name?.[locale] || dep.name?.en, count: 0 };
            entry.count += 1;
            map.set(dep.id, entry);
        });
        return [{ id: 'all', name: tj('all'), count: items.length }, ...map.values()];
    }, [items, locale, tj]);

    const filtered = active === 'all' ? items : items.filter(item => item.department?.id === active);
    const visible = filtered.slice(0, limit);

    const ref = useViewMotion({ deps: [loading, locale] });
    const headingId = `${id}-heading`;
    const lines = splitAtComma(title).map((text, i, all) => ({ text, tone: i === all.length - 1 && all.length > 1 ? 'accent' : 'light' }));

    // re-deal cards when the filter or page changes (the first reveal is the section's entrance)
    const dealFrom = useRef(0);
    const firstDeal = useRef(true);
    useEffect(() => {
        if (firstDeal.current) {
            firstDeal.current = false;
            return;
        }
        const grid = gridRef.current;
        if (!grid || prefersReducedMotion()) return;
        const cards = [...grid.querySelectorAll('[data-card]')].slice(dealFrom.current);
        if (cards.length) gsap.fromTo(cards, { opacity: 0, y: 34, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, clearProps: 'transform' });
    }, [active, limit]);

    const choose = value => {
        dealFrom.current = 0;
        setActive(value);
        setLimit(page);
    };

    return (
        <section ref={ref} id={id} aria-labelledby={headingId} className='jx relative isolate overflow-hidden bg-[var(--jx-ink)] py-[clamp(80px,12vh,140px)]'>
            <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(60%_40%_at_50%_0%,rgba(199,203,209,0.08),transparent_70%)]' />
            <div className='mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,72px)]'>
                <div className='flex flex-col items-center text-center'>
                    <JxTag>{tag}</JxTag>
                    <JxHeading id={headingId} lines={lines} className='mt-5 text-[length:var(--jx-fs-3xl)] leading-[1.25]' />
                </div>

                {options.length > 2 ? (
                    <div data-jx='rise' className='relative mx-auto mt-10 max-w-full'>
                        <FilterRail options={options} active={active} onChange={choose} label={tag} />
                    </div>
                ) : null}

                <div ref={gridRef} role='tabpanel' data-jx='rise' className='mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8'>
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <div key={i} className={`${skeletonClass} rounded-[var(--jx-r-lg)] skeleton-box bg-white/5`} />)
                        : visible.map((item, i) => renderCard(item, i))}
                </div>

                {!loading && !filtered.length ? <p className='mt-16 text-center text-[var(--jx-text-3)]'>{emptyText}</p> : null}

                {filtered.length > limit ? (
                    <div className='mt-12 flex justify-center'>
                        <button
                            type='button'
                            onClick={() => {
                                dealFrom.current = limit;
                                setLimit(n => n + page);
                            }}
                            className='jx-btn jx-btn--ghost'
                        >
                            <span>{tj('showMore')}</span>
                            <span className='jx-btn-orb' aria-hidden='true'>
                                <svg viewBox='0 0 24 24'>
                                    <path d='M12 5v14' />
                                    <path d='M5 12h14' />
                                </svg>
                            </span>
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
