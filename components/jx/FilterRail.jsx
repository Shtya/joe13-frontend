'use client';

import { prefersReducedMotion } from '@/components/jx/motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * Filter rail — a row of options on a hairline capsule; a brushed-metal
 * indicator slides to the active one and the rail scrolls it into view.
 * options: [{ id, name, count? }]
 */
export default function FilterRail({ options, active, onChange, label }) {
    const railRef = useRef(null);
    const [indicator, setIndicator] = useState(null);

    const measure = () => {
        const btn = railRef.current?.querySelector(`[data-filter="${active}"]`);
        if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
        return btn;
    };

    useLayoutEffect(() => {
        const rail = railRef.current;
        const btn = measure();
        if (!rail || !btn) return;
        rail.scrollTo({ left: btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, options.length]);

    useEffect(() => {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div
            ref={railRef}
            role='tablist'
            aria-label={label}
            className='relative mx-auto flex w-max max-w-full gap-1 overflow-x-auto rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--jx-line)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
            {indicator ? (
                <span
                    aria-hidden='true'
                    className='absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-[image:var(--jx-brushed)] shadow-[var(--jx-shadow-metal)] transition-[left,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
                    style={{ left: indicator.left, width: indicator.width }}
                />
            ) : null}
            {options.map(o => {
                const on = o.id === active;
                return (
                    <button
                        key={o.id}
                        type='button'
                        role='tab'
                        aria-selected={on}
                        data-filter={o.id}
                        onClick={() => onChange(o.id)}
                        className={`relative z-[1] flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 text-[14px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                            on ? 'font-[700] text-[var(--jx-ink)]' : 'text-[var(--jx-text-2)] hover:text-white'
                        }`}
                    >
                        {o.name}
                        {o.count != null ? <span className={`text-[12px] tabular-nums ${on ? 'text-[#3a3e44]' : 'text-[var(--jx-steel)]'}`}>{o.count}</span> : null}
                    </button>
                );
            })}
        </div>
    );
}
