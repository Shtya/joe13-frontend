'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

/*
 * Reading progress — a silver hairline across the top of the screen that
 * fills as the article body is read (measured against `targetId`).
 */
export function ReadingProgress({ targetId }) {
    const tj = useTranslations('Jx');
    const barRef = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const el = document.getElementById(targetId);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.6;
            const p = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / Math.max(1, total)));
            if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
            setValue(Math.round(p * 100));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, [targetId]);

    return (
        <div role='progressbar' aria-label={tj('readingProgress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className='pointer-events-none fixed inset-x-0 top-0 z-[100001] h-[2px] bg-transparent'>
            <span ref={barRef} className='block h-full origin-left bg-[linear-gradient(90deg,var(--jx-steel),#fff)] shadow-[0_0_10px_rgba(255,255,255,0.7)] rtl:origin-right rtl:bg-[linear-gradient(270deg,var(--jx-steel),#fff)]' style={{ transform: 'scaleX(0)' }} />
        </div>
    );
}

/* Share panel — copy link + share intents. Vertical on desktop, a row on mobile. */
export function ShareBar({ title }) {
    const tj = useTranslations('Jx');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);
    useEffect(() => setUrl(window.location.href), []);

    const enc = encodeURIComponent;
    const links = url
        ? [
              { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: <path d='M4 20l1.3-4A8 8 0 1 1 8 18.7z' /> },
              {
                  key: 'linkedin',
                  label: 'LinkedIn',
                  href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
                  icon: <path d='M6 9v9M6 6v.01M10 18V9M10 13c0-2.5 1.5-4 3.5-4S17 10.5 17 13v5' />,
              },
              { key: 'x', label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, icon: <path d='M5 5l14 14M19 5 5 19' /> },
          ]
        : [];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2200);
        } catch {
            /* clipboard unavailable */
        }
    };

    const ring =
        'grid size-11 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

    return (
        <div>
            <p className='m-0 text-[13px] text-[var(--jx-text-3)]'>{tj('share')}</p>
            <ul className='m-0 mt-3 flex list-none gap-2.5 p-0 lg:flex-col'>
                <li>
                    <button type='button' onClick={copy} aria-label={tj('copyLink')} className={ring}>
                        {copied ? (
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                                <path d='m5 12 5 5L20 7' />
                            </svg>
                        ) : (
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                                <path d='M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1' />
                                <path d='M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1' />
                            </svg>
                        )}
                    </button>
                </li>
                {links.map(link => (
                    <li key={link.key}>
                        <a href={link.href} target='_blank' rel='noopener noreferrer' aria-label={link.label} className={ring}>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                                {link.icon}
                            </svg>
                        </a>
                    </li>
                ))}
            </ul>
            <p role='status' className='m-0 mt-2 h-4 text-[12px] text-[var(--jx-silver)]'>
                {copied ? tj('copied') : ''}
            </p>
        </div>
    );
}
