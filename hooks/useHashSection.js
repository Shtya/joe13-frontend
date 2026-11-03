'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Home-page slides are addressed with a fragment (/#partners) rather than a
// ?section= query, so nav links stay parameter-free for crawlers.
const readHash = () => (typeof window === 'undefined' ? null : decodeURIComponent(window.location.hash.slice(1)) || null);

export function useHashSection() {
    const pathname = usePathname();
    const [section, setSection] = useState(null);

    useEffect(() => {
        const read = () => setSection(readHash());
        // Client-side navigation uses pushState, which fires no hashchange, so
        // re-read shortly after any link click as well.
        let timer;
        const onClick = event => {
            if (!event.target?.closest?.('a[href]')) return;
            clearTimeout(timer);
            timer = setTimeout(read, 60);
        };
        read();
        window.addEventListener('hashchange', read);
        document.addEventListener('click', onClick);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('hashchange', read);
            document.removeEventListener('click', onClick);
        };
    }, [pathname]);

    return section;
}
