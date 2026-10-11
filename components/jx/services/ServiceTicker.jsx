'use client';

import { Link } from '@/navigation';
import { useLocale } from 'next-intl';
import { serviceTitle } from './ServiceCard';

/*
 * Service index — every service name set large, scrolling in two columns
 * that travel in opposite directions like a departures board. Masked top
 * and bottom; a column pauses under the pointer; every name is a link.
 * Reduced motion: the columns stand still.
 */
export default function ServiceTicker({ services = [], label }) {
    const locale = useLocale();
    if (!services.length) return null;
    const half = Math.ceil(services.length / 2);
    const columns = [services.slice(0, half), services.slice(half).length ? services.slice(half) : services.slice(0, half)];

    return (
        <nav
            aria-label={label}
            className='relative grid h-[min(64vh,600px)] grid-cols-2 gap-x-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]'
        >
            {columns.map((col, ci) => (
                <div key={ci} className='group/col relative overflow-hidden'>
                    <ul
                        className={`m-0 flex list-none flex-col gap-1 p-0 group-hover/col:![animation-play-state:paused] group-focus-within/col:![animation-play-state:paused] motion-reduce:!animate-none ${
                            ci === 0 ? 'animate-[jx-ticker_38s_linear_infinite]' : 'animate-[jx-ticker_44s_linear_infinite_reverse]'
                        }`}
                    >
                        {[...col, ...col].map((service, i) => (
                            <li key={`${service.slug}-${i}`} aria-hidden={i >= col.length || undefined}>
                                <Link
                                    href={`/services/${service.slug}`}
                                    tabIndex={i >= col.length ? -1 : undefined}
                                    className='jx-display group flex items-start gap-3 py-3 text-[clamp(1.05rem,0.8rem+0.8vw,1.5rem)] font-[700] leading-[1.45] text-[var(--jx-text-3)] transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none'
                                >
                                    <i aria-hidden='true' className='mt-[0.75em] block h-px w-3 shrink-0 bg-[var(--jx-gunmetal)] transition-[width,background] duration-300 group-hover:w-6 group-hover:bg-white' />
                                    <span className='line-clamp-2'>{serviceTitle(service, locale)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
