'use client';

import { cmsImage } from '@/helpers/cms';
import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';

export function serviceTitle(service, locale) {
    return String(service?.title?.[locale] || service?.title?.en || '').trim();
}

/*
 * Service card — a plate with the service's artwork toned to silver, the
 * name, its promise in two lines, and a count of what's included.
 */
export default function ServiceCard({ service, priority = false }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const title = serviceTitle(service, locale);
    const sub = String(service?.subTitle?.[locale] || service?.subTitle?.en || '').trim();
    const img = service?.image?.url ? cmsImage(service.image.url, service.image.url) : '';
    const features = service?.featureCount || 0;

    return (
        <article data-card className='h-full'>
            <Link
                href={`/services/${service.slug}`}
                className='group relative flex h-full flex-col overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line),0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_40px_70px_-30px_rgba(0,0,0,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
            >
                <div className='relative aspect-[16/10] overflow-hidden bg-[var(--jx-graphite)]'>
                    {img ? (
                        <Image
                            src={img}
                            alt={service?.image?.alt || title}
                            fill
                            priority={priority}
                            sizes='(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 30vw'
                            quality={72}
                            className='object-cover [filter:grayscale(0.8)_brightness(0.78)] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:[filter:grayscale(0)_brightness(1)]'
                        />
                    ) : null}
                    <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_top,rgba(11,12,14,0.9),rgba(11,12,14,0)_60%)]' />
                </div>

                <div className='flex flex-1 flex-col px-6 pb-5 pt-5'>
                    <h3 className='jx-display m-0 line-clamp-2 text-[19px] font-[700] leading-[1.5] text-[var(--jx-platinum)] sm:text-[20px]'>{title}</h3>
                    {sub ? <p className='m-0 mb-5 mt-2 line-clamp-2 text-[14px] leading-[1.8] text-[var(--jx-text-3)]'>{sub}</p> : null}
                    <span className='mt-auto flex items-center justify-between border-t border-[var(--jx-line)] pt-4'>
                        <span className='text-[13.5px] text-[var(--jx-text-2)]'>{features ? tj('featuresCount', { count: features }) : tj('serviceDetails')}</span>
                        <span className='grid size-10 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow,transform] duration-500 group-hover:translate-x-1 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)] rtl:group-hover:-translate-x-1'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                <path d='M5 12h14' />
                                <path d='m13 6 6 6-6 6' />
                            </svg>
                        </span>
                    </span>
                </div>

                <span
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 -skew-x-12 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[420%] group-hover:opacity-100 rtl:group-hover:-translate-x-[420%]'
                />
            </Link>
        </article>
    );
}
