'use client';

import JxArchive from '@/components/jx/JxArchive';
import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion, weightMorph } from '@/components/jx/motion';
import ServiceCard from '@/components/jx/services/ServiceCard';
import ServiceTicker from '@/components/jx/services/ServiceTicker';
import { cmsImage } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Services — Black & Silver.
 *   1. Hero: chrome title, lede, the number of services, actions; the
 *      signature is the moving service index (two counter-scrolling columns
 *      of names, each a link).
 *   2. Catalog: every service as a card.
 */
export default function ClientPage({ pageData, services = [] }) {
    const t = useTranslations();
    const tj = useTranslations('Jx');
    const locale = useLocale();
    const section1 = pageData?.sections?.find(e => e.id == 'sec1');

    const title = section1?.title?.[locale] || tj('servicesTitle');
    const lede = (section1?.content?.[locale] || tj('servicesLede')).replace(/<[^>]+>/g, ' ');
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));
    const tags = tj.raw('servicesTag');

    const ref = useViewMotion({
        deps: [locale, services.length],
        threshold: 0.05,
        extend: (tl, root) => weightMorph(tl, root.querySelector('.jx-morph')),
    });

    const toCatalog = () => document.getElementById('all-services')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={ref} id='services' labelledBy='services-heading' priority image={cmsImage(section1?.image?.url, '/landing/bg-6-section.png')} shade='deep'>
                <div className='grid w-full items-center gap-x-[clamp(32px,6vw,110px)] gap-y-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'>
                    <div className='min-w-0 text-start'>
                        <JxTag parts={Array.isArray(tags) ? tags : undefined}>{Array.isArray(tags) ? null : tj('servicesTitle')}</JxTag>
                        <JxHeading as='h1' id='services-heading' lines={lines} className='mt-5 text-[length:var(--jx-fs-mega)] leading-[1.1]' />
                        <p data-jx='rise' className='m-0 mt-6 max-w-[36rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                            {lede}
                        </p>
                        <div className='mt-9 flex flex-wrap gap-3'>
                            <JxButton icon='arrow' onClick={toCatalog}>
                                {tj('browseServices')}
                            </JxButton>
                            <JxButton href='/contact-us' variant='ghost'>
                                {t('contact us')}
                            </JxButton>
                        </div>
                        {services.length ? (
                            <p data-jx='rise' className='jx-display m-0 mt-12 flex items-baseline gap-3 border-t border-[var(--jx-line-strong)] pt-4 text-[var(--jx-text-3)]'>
                                <span dir='ltr' className='jx-accent text-[clamp(2.4rem,1.4rem+2.4vw,3.6rem)] font-[300] leading-none tabular-nums' data-jx-count={services.length}>
                                    {services.length}
                                </span>
                                <span className='text-[length:var(--jx-fs-md)]'>{tj('servicesCount')}</span>
                            </p>
                        ) : null}
                    </div>

                    <div data-jx='fade' className='min-w-0 max-lg:hidden'>
                        <ServiceTicker services={services} label={tj('allServices')} />
                    </div>
                </div>
            </JxScene>

            <JxArchive
                id='all-services'
                items={services}
                loading={false}
                tag={tj('allServices')}
                title={tj('catalogTitle')}
                emptyText=''
                page={15}
                renderCard={(service, i) => <ServiceCard key={service.id || service.slug} service={service} priority={i < 3} />}
            />
        </div>
    );
}
