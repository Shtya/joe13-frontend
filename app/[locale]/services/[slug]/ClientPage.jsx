'use client';

import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion } from '@/components/jx/motion';
import ProjectGallery from '@/components/jx/projects/ProjectGallery';
import { Benefits, Call, Capabilities, Faq, Impact, PartnersStrip, useL } from '@/components/jx/services/ServiceSections';
import { cmsImage } from '@/helpers/cms';
import { Link } from '@/navigation';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Service — Black & Silver, a full brief built from the CMS document:
 * hero (aura + framed artwork) → capabilities → why us → impact →
 * partners → FAQ → call to action. Every section enters as it scrolls in.
 */
export default function ServicePage({ data }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const L = useL();

    const title = L(data?.title).trim();
    const name = L(data?.hero?.serviceName) || title;
    const lede = L(data?.subTitle);
    const heroImages = (data?.hero?.images || []).filter(Boolean);
    const gallery = (heroImages.length ? heroImages : data?.image?.url ? [data.image.url] : []).map(url => ({ src: cmsImage(url, url), alt: name }));
    const backdrop = data?.image?.url ? cmsImage(data.image.url, data.image.url) : '/landing/bg-6-section.png';

    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light' }));
    const longest = Math.max(...parts.map(p => p.length), 0);
    const titleSize = longest > 24 ? 'text-[length:var(--jx-fs-3xl)]' : 'text-[length:var(--jx-fs-4xl)]';

    const heroRef = useViewMotion({ deps: [locale, data?.slug], threshold: 0.05, extend: unveilFrame });

    if (!data?.title) return <div className='min-h-screen bg-[var(--jx-ink)]' aria-busy='true' />;

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={heroRef} labelledBy='service-heading' priority image={backdrop} aura shade='deep'>
                <div className='grid w-full items-center gap-x-[clamp(32px,5vw,96px)] gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
                    <div className='min-w-0 text-start'>
                        <nav aria-label={tj('servicesTitle')} data-jx='rise' className='flex flex-wrap items-center gap-2 text-[13px] text-[var(--jx-text-3)]'>
                            <Link href='/services' className='transition-colors hover:text-white'>
                                {tj('servicesTitle')}
                            </Link>
                            <i aria-hidden='true' className='block h-px w-4 bg-[var(--jx-line-strong)]' />
                            <span aria-current='page' className='text-[var(--jx-silver)]'>
                                {name}
                            </span>
                        </nav>
                        <JxHeading as='h1' id='service-heading' lines={lines} className={`mt-5 leading-[1.25] ${titleSize}`} />
                        {lede ? (
                            <p data-jx='rise' className='m-0 mt-6 max-w-[36rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                                {lede}
                            </p>
                        ) : null}
                        <div className='mt-9 flex flex-wrap gap-3'>
                            <JxButton href='/contact-us'>{tj('requestService')}</JxButton>
                            <JxButton href='/services' variant='ghost'>
                                {tj('allServices')}
                            </JxButton>
                        </div>
                        {data?.hero?.attr?.length ? (
                            <p data-jx='rise' className='m-0 mt-10 flex flex-wrap gap-2'>
                                {data.hero.attr.slice(0, 4).map((a, i) => (
                                    <span key={i} className='rounded-full px-3.5 py-1.5 text-[12.5px] text-[var(--jx-text-2)] shadow-[inset_0_0_0_1px_var(--jx-line)]'>
                                        {L(a.key)}
                                    </span>
                                ))}
                            </p>
                        ) : null}
                    </div>
                    <div data-gallery className='min-w-0'>
                        {gallery.length ? <ProjectGallery images={gallery} name={name} /> : null}
                    </div>
                </div>
            </JxScene>

            <Capabilities hero={data.hero} />
            <Benefits benefits={data.benefits} />
            <Impact impact={data.impact} />
            <PartnersStrip partners={data.partners} />
            <Faq faqs={data.faqs} />
            <Call call={data.call} />
        </div>
    );
}

/* The artwork frame unveils from its centre (the system's signature gesture). */
function unveilFrame(tl, root) {
    const frame = root.querySelector('[data-gallery] [data-frame]');
    if (!frame) return;
    const from = { clipPath: 'inset(0% 50% 0% 50% round 22px)', scale: 1.04 };
    gsap.set(frame, from);
    tl.fromTo(frame, from, { clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1, duration: 1.5, ease: 'expo.inOut', immediateRender: false, clearProps: 'clipPath,transform' }, 0.25);
}
