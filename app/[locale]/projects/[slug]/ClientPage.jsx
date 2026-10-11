'use client';

import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion } from '@/components/jx/motion';
import ProjectCard from '@/components/jx/projects/ProjectCard';
import ProjectGallery from '@/components/jx/projects/ProjectGallery';
import { paragraphs, projectImages, projectName } from '@/components/jx/projects/utils';
import { Link } from '@/navigation';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Project detail — Black & Silver.
 *   1. Hero scene: the project's own photograph as a deep-shaded backdrop;
 *      breadcrumb, chrome title, department + photo chips, actions and a
 *      value readout — beside the framed gallery, which unveils from its
 *      centre like the home wordmark.
 *   2. About: the full story in a readable column beside a fixed info panel.
 *   3. Related projects.
 */
export default function ProjectDetails({ project, related = [] }) {
    const locale = useLocale();
    const t = useTranslations();
    const tp = useTranslations('projects');
    const tj = useTranslations('Jx');

    const name = projectName(project, locale);
    const dept = project?.department?.name?.[locale] || project?.department?.name?.en || '';
    const images = projectImages(project);
    const story = paragraphs(project?.description?.[locale] || project?.description?.en);
    const parts = splitTitle(name);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light' }));
    const longest = Math.max(...parts.map(p => p.length), 0);
    const titleSize = longest > 22 ? 'text-[length:var(--jx-fs-3xl)]' : longest > 12 ? 'text-[length:var(--jx-fs-4xl)]' : 'text-[length:var(--jx-fs-5xl)]';

    const values = [
        { Icon: IconStrategy, lead: tp('statStrategic'), sub: tp('statPartnership') },
        { Icon: IconPeople, lead: tp('statCustomer'), sub: tp('statEngagement') },
        { Icon: IconGrowth, lead: tp('statStronger'), sub: tp('statPosition') },
    ];

    const heroRef = useViewMotion({ deps: [locale, project?.slug], threshold: 0.05, extend: unveilFrame });
    const aboutRef = useViewMotion({ deps: [locale, project?.slug] });
    const relatedRef = useViewMotion({ deps: [locale, project?.slug] });

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={heroRef} labelledBy='project-heading' priority image={images[0]?.src || '/landing/project-details.png'} shade='deep' aura>
                <div className='grid w-full items-center gap-x-[clamp(32px,5vw,96px)] gap-y-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'>
                    <div className='min-w-0 text-start'>
                        <nav aria-label={tj('projects')} data-jx='rise' className='flex flex-wrap items-center gap-2 text-[13px] text-[var(--jx-text-3)]'>
                            <Link href='/projects' className='transition-colors hover:text-white'>
                                {tj('projects')}
                            </Link>
                            <i aria-hidden='true' className='block h-px w-4 bg-[var(--jx-line-strong)]' />
                            <span aria-current='page' className='text-[var(--jx-silver)]'>
                                {dept || name}
                            </span>
                        </nav>

                        <JxHeading as='h1' id='project-heading' lines={lines} className={`mt-5 leading-[1.2] ${titleSize}`} />

                        <div data-jx='rise' className='mt-6 flex flex-wrap gap-2'>
                            {dept ? <Chip>{dept}</Chip> : null}
                            {images.length ? <Chip muted>{tj('photos', { count: images.length })}</Chip> : null}
                        </div>

                        <div className='mt-9 flex flex-wrap gap-3'>
                            <JxButton href='/contact-us'>{tp('btn')}</JxButton>
                            <JxButton href='/projects' variant='ghost'>
                                {tj('allProjects')}
                            </JxButton>
                        </div>

                        <ul data-jx='rise' className='m-0 mt-12 grid max-w-[600px] list-none grid-cols-3 gap-4 p-0' aria-label={tj('values')}>
                            {values.map(({ Icon, lead, sub }) => (
                                <li key={lead} className='border-t border-[var(--jx-line-strong)] pt-4'>
                                    <span className='block size-9 text-[var(--jx-silver)]'>
                                        <Icon />
                                    </span>
                                    <span className='jx-display mt-3 block text-[15px] font-[700] text-[var(--jx-platinum)]'>{lead}</span>
                                    <span className='mt-0.5 block text-[13px] text-[var(--jx-text-3)]'>{sub}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div data-gallery className='min-w-0'>
                        <ProjectGallery images={images} name={name} />
                    </div>
                </div>
            </JxScene>

            {story.length ? (
                <section ref={aboutRef} aria-labelledby='about-heading' className='jx relative py-[clamp(80px,12vh,140px)]'>
                    <div className='mx-auto grid w-full max-w-[1280px] gap-x-[clamp(32px,6vw,110px)] gap-y-10 px-[clamp(20px,5vw,72px)] lg:grid-cols-[300px_minmax(0,1fr)]'>
                        <aside data-jx='rise' className='lg:sticky lg:top-32 lg:self-start'>
                            <div className='rounded-[var(--jx-r-lg)] p-6 shadow-[inset_0_0_0_1px_var(--jx-line)]'>
                                <dl className='m-0 grid gap-5'>
                                    {dept ? <Meta term={t('department')} value={dept} /> : null}
                                    {images.length ? <Meta term={tj('gallery')} value={tj('photos', { count: images.length })} /> : null}
                                </dl>
                                <Link
                                    href='/contact-us'
                                    className='group mt-6 flex items-center justify-between border-t border-[var(--jx-line)] pt-5 text-[14px] font-[700] text-[var(--jx-platinum)]'
                                >
                                    {tp('btn')}
                                    <span className='grid size-9 place-items-center rounded-full bg-[image:var(--jx-brushed)] text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1'>
                                        <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                            <path d='M5 12h14' />
                                            <path d='m13 6 6 6-6 6' />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </aside>

                        <div className='min-w-0'>
                            <JxTag>{tj('aboutProject')}</JxTag>
                            <h2 id='about-heading' className='sr-only'>
                                {tj('aboutProject')}
                            </h2>
                            <div className='mt-6 max-w-[68ch]'>
                                {story.map((text, i) => (
                                    <p
                                        key={i}
                                        data-jx='rise'
                                        className={`m-0 mb-6 last:mb-0 ${
                                            i === 0
                                                ? 'jx-display text-[length:var(--jx-fs-xl)] font-[400] leading-[1.75] text-[var(--jx-platinum)]'
                                                : 'text-[length:var(--jx-fs-lg)] leading-[1.9] text-[var(--jx-text-2)]'
                                        }`}
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {related.length ? (
                <section ref={relatedRef} aria-labelledby='related-heading' className='jx relative border-t border-[var(--jx-line)] py-[clamp(72px,11vh,128px)]'>
                    <div className='mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,72px)]'>
                        <div className='flex flex-wrap items-end justify-between gap-6'>
                            <JxHeading id='related-heading' lines={[{ text: tj('related'), tone: 'accent' }]} className='text-[length:var(--jx-fs-3xl)] leading-[1.2]' />
                            <Link
                                href='/projects'
                                data-jx='rise'
                                className='text-[14px] text-[var(--jx-text-2)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] transition-colors hover:text-white hover:decoration-white'
                            >
                                {tj('allProjects')}
                            </Link>
                        </div>
                        <div data-jx='rise' className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8'>
                            {related.map(p => (
                                <ProjectCard key={p.id || p.slug} project={p} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
}

/* The gallery frame unveils from its centre (the home wordmark's gesture). */
function unveilFrame(tl, root) {
    const frame = root.querySelector('[data-gallery] [data-frame]');
    if (!frame) return;
    const from = { clipPath: 'inset(0% 50% 0% 50% round 22px)', scale: 1.04 };
    gsap.set(frame, from);
    tl.fromTo(frame, from, { clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1, duration: 1.5, ease: 'expo.inOut', immediateRender: false, clearProps: 'clipPath,transform' }, 0.25);
}

function Chip({ children, muted }) {
    return (
        <span
            className={`inline-flex h-9 items-center rounded-full px-4 text-[13.5px] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] ${
                muted ? 'text-[var(--jx-text-3)]' : 'text-[var(--jx-platinum)]'
            }`}
        >
            {children}
        </span>
    );
}

function Meta({ term, value }) {
    return (
        <div>
            <dt className='text-[12.5px] text-[var(--jx-text-3)]'>{term}</dt>
            <dd className='jx-display m-0 mt-1 text-[16px] font-[700] text-[var(--jx-platinum)]'>{value}</dd>
        </div>
    );
}

const ICON = 'size-full fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]';

function IconStrategy() {
    return (
        <svg viewBox='0 0 36 36' aria-hidden='true' className={ICON}>
            <circle cx='18' cy='18' r='13' />
            <circle cx='18' cy='18' r='7' />
            <circle cx='18' cy='18' r='1.5' />
            <path d='M18 18 29 7M25 6h5v5' />
        </svg>
    );
}

function IconPeople() {
    return (
        <svg viewBox='0 0 36 36' aria-hidden='true' className={ICON}>
            <circle cx='13' cy='12' r='4.5' />
            <circle cx='24' cy='13' r='3.5' />
            <path d='M4 29c0-5.5 3.8-9 9-9s9 3.5 9 9' />
            <path d='M22 20.5c4.5-.5 9 2 9.5 7.5' />
        </svg>
    );
}

function IconGrowth() {
    return (
        <svg viewBox='0 0 36 36' aria-hidden='true' className={ICON}>
            <path d='M5 30h26' />
            <path d='M8 25V19M15 25v-9M22 25V13M29 25V8' />
            <path d='M7 14 15 9l6 3 9-7M25 5h5v5' />
        </svg>
    );
}
