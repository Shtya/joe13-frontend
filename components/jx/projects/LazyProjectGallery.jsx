'use client';

import dynamic from 'next/dynamic';

// The gallery is pure interaction (GSAP crossfades, timers, a portal viewer)
// with no indexable copy, so it skips SSR and hydrates off the critical path.
// The frame keeps its 4:3 box meanwhile, so nothing shifts when it mounts.
const ProjectGallery = dynamic(() => import('./ProjectGallery'), {
    ssr: false,
    loading: () => <div aria-hidden='true' className='aspect-[4/3] w-full rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)]' />,
});

export default ProjectGallery;
