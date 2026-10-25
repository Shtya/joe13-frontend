'use client';

import { useValues } from '@/app/context';
import { JxButton } from '@/components/jx/primitives';
import SocialIcon from '@/components/jx/SocialIcon';
import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

/*
 * Footer — Black & Silver.
 *
 *   ┌────────────────────────────────────────────────────────────────┐
 *   │ ● Let's talk                                                   │
 *   │ Let's build what's next            [ Contact us → ] [WhatsApp] │
 *   │ supporting line                                                │
 *   ├────────────────────────────────────────────────────────────────┤
 *   │ JOE13 mark      │ Products   │ Services     │ Contact          │
 *   │ description     │ links      │ links (+more)│ address / mail…  │
 *   │ (○)(○)(○)       │            │              │ Branches         │
 *   ├────────────────────────────────────────────────────────────────┤
 *   │ © copyright        connect · create · grow        Back to top ↑ │
 *   └────────────────────────────────────────────────────────────────┘
 *   (an oversized wordmark rests at the bottom as a watermark)
 */

const SERVICE_PREVIEW_COUNT = 8;

const Footer = ({ cn, id }) => {
    const t = useTranslations('Footer');
    const tj = useTranslations('Jx');
    const locale = useLocale();
    const { projects, loading, settings, services } = useValues();
    const [showAllServices, setShowAllServices] = useState(false);

    const ourProduct = projects?.data?.filter(e => e.department?.id == 1);
    const productLinks = ourProduct
        ?.filter(e => e?.slug && (e?.name?.[locale] || e?.name?.en))
        ?.slice(0, 6)
        ?.map(e => ({ name: e?.name?.[locale] || e?.name?.en, link: `/projects/${e.slug}` }));
    const serviceLinks = services?.data
        ?.filter(e => e?.slug && (e?.title?.[locale] || e?.title?.en))
        ?.map(e => ({ name: e?.title?.[locale] || e?.title?.en, link: `/services/${e.slug}` }));
    const visibleServices = showAllServices ? serviceLinks : serviceLinks?.slice(0, SERVICE_PREVIEW_COUNT);
    const hasMoreServices = (serviceLinks?.length || 0) > SERVICE_PREVIEW_COUNT;
    const socials = Object.entries(settings?.social_media || {}).filter(([, value]) => value);
    const address = settings?.contact_us?.address?.[locale];
    const email = settings?.contact_us?.email;
    const phone = settings?.contact_us?.phone;
    const branches = settings?.branch?.[locale] || [];
    const description = settings?.about_us_footer?.[locale] || t('description');
    const year = new Date().getFullYear();

    const backToTop = () => {
        const swiper = document.querySelector('.mySwiper')?.swiper;
        if (swiper) swiper.slideTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className={`jx relative min-h-screen bg-[var(--jx-ink)] py-[120px] ${cn || ''}`}>
                <p className='sr-only'>{locale === 'ar' ? 'جاري التحميل' : 'Loading'}</p>
                <div className='mx-auto grid w-[min(1400px,calc(100%-40px))] gap-8 sm:grid-cols-2 xl:grid-cols-4'>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='h-40 rounded-[var(--jx-r-md)] skeleton-box bg-white/10' />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <footer
            id={id}
            className={`jx relative isolate z-[1000] flex min-h-screen flex-col overflow-hidden bg-[var(--jx-ink)] text-[var(--jx-text)] ${cn || ''}`}
        >
            {/* atmosphere: silver blooms, grain, and the resting wordmark */}
            <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-[1]'>
                <div className='absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(199,203,209,0.10),transparent_70%),radial-gradient(50%_45%_at_10%_100%,rgba(199,203,209,0.07),transparent_70%)] rtl:bg-[radial-gradient(60%_50%_at_15%_0%,rgba(199,203,209,0.10),transparent_70%),radial-gradient(50%_45%_at_90%_100%,rgba(199,203,209,0.07),transparent_70%)]' />
                <div className='jx-scene-grain' />
                <div className='absolute inset-x-[4%] bottom-[-3vw] h-[22vw] opacity-[0.045] [-webkit-mask:linear-gradient(to_bottom,#000_30%,transparent)] [mask:linear-gradient(to_bottom,#000_30%,transparent)]'>
                    <Image src='/assets/svg/logo-white.svg' alt='' fill sizes='92vw' className='object-contain object-bottom' />
                </div>
            </div>

            <div className='mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-[clamp(20px,5vw,72px)] pb-8 pt-[clamp(108px,14vh,160px)] max-md:!pr-[52px]'>
                {/* 1 — invitation */}
                <div className='grid items-end gap-x-10 gap-y-8 border-b border-[var(--jx-line)] pb-[clamp(44px,8vh,88px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'>
                    <div>
                        <p className='jx-tag'>{t('letsTalk')}</p>
                        <p className='jx-display m-0 mt-5 text-[length:var(--jx-fs-4xl)] font-[700] leading-[1.15]'>
                            <span className='jx-accent'>{t('letsBuild')}</span>
                        </p>
                        <p className='m-0 mt-4 max-w-[34rem] text-[length:var(--jx-fs-lg)] leading-[1.75] text-[var(--jx-text-2)]'>{t('brighterFuture')}</p>
                    </div>
                    <div className='flex flex-wrap gap-3 lg:justify-end'>
                        <JxButton href='/contact-us' motion={null}>
                            {t('contact_us')}
                        </JxButton>
                        {phone ? (
                            <a
                                href={`https://wa.me/${String(phone).replace(/[^\d]/g, '')}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='jx-btn jx-btn--ghost'
                            >
                                <span>WhatsApp</span>
                                <span className='jx-btn-orb' aria-hidden='true'>
                                    <svg viewBox='0 0 24 24'>
                                        <path d='M4 20l1.3-4A8 8 0 1 1 8 18.7z' />
                                        <path d='M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1-1.3 1.8.8c0 1.2-1 2-2.3 2A6.3 6.3 0 0 1 7.5 9.3c0-1.3.8-2.3 2-2.3l.8 1.8z' />
                                    </svg>
                                </span>
                            </a>
                        ) : null}
                    </div>
                </div>

                {/* 2 — directory */}
                <div className='grid gap-x-[clamp(24px,4vw,64px)] gap-y-12 py-[clamp(44px,8vh,80px)] sm:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]'>
                    <section className='sm:col-span-2 xl:col-span-1'>
                        <Link href='/?section=home' aria-label='JOE13' className='relative block h-[46px] w-[170px]'>
                            <Image src='/assets/svg/logo-white.svg' alt='JOE13' fill sizes='170px' className='object-contain object-left rtl:object-right' />
                        </Link>
                        <p className='m-0 mt-3 text-[13px] text-[var(--jx-steel)]'>{t('tomorrowMade')}</p>
                        {description ? (
                            <p className='m-0 mt-5 max-w-[26rem] text-[15px] leading-[1.8] text-[var(--jx-text-2)]'>{description}</p>
                        ) : null}
                        {socials.length ? (
                            <div className='mt-7'>
                                <p className='m-0 mb-3 text-[13px] text-[var(--jx-text-3)]'>{tj('followUs')}</p>
                                <ul className='m-0 flex list-none flex-wrap gap-2.5 p-0'>
                                    {socials.map(([key, value]) => (
                                        <li key={key}>
                                            <a
                                                href={value}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label={key}
                                                className='grid size-11 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[color,background,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)]'
                                            >
                                                <SocialIcon name={key} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </section>

                    {productLinks?.length ? (
                        <FooterColumn heading={ourProduct?.[0]?.department?.name?.[locale] || t('ourProduct')}>
                            <LinkList items={productLinks} />
                        </FooterColumn>
                    ) : null}

                    {visibleServices?.length ? (
                        <FooterColumn heading={t('services')}>
                            <LinkList items={[...visibleServices, { name: tj('allServices'), link: '/services' }]} />
                            {hasMoreServices ? (
                                <button
                                    type='button'
                                    onClick={() => setShowAllServices(open => !open)}
                                    aria-expanded={showAllServices}
                                    className='mt-4 inline-flex items-center gap-2 text-[14px] font-[700] text-[var(--jx-platinum)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] transition-colors hover:decoration-white'
                                >
                                    {showAllServices ? t('showLess') : t('readMore')}
                                </button>
                            ) : null}
                        </FooterColumn>
                    ) : null}

                    <FooterColumn heading={t('contact_us')}>
                        <ul className='m-0 grid list-none gap-1 p-0'>
                            {address ? <ContactRow icon='pin'>{address}</ContactRow> : null}
                            {email ? (
                                <ContactRow icon='mail' href={`mailto:${email}`}>
                                    {email}
                                </ContactRow>
                            ) : null}
                            {phone ? (
                                <ContactRow icon='phone' href={`tel:${phone}`} ltr>
                                    {phone}
                                </ContactRow>
                            ) : null}
                        </ul>
                        {branches.length ? (
                            <>
                                <p className='jx-display m-0 mt-8 text-[14px] font-[700] text-[var(--jx-silver)]'>{tj('branches')}</p>
                                <ul className='m-0 mt-3 flex list-none flex-wrap gap-2 p-0'>
                                    {branches.map((branch, i) => (
                                        <li key={i} className='rounded-full px-3.5 py-1.5 text-[13px] text-[var(--jx-text-2)] shadow-[inset_0_0_0_1px_var(--jx-line)]'>
                                            {branch}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : null}
                    </FooterColumn>
                </div>

                {/* 3 — signature bar */}
                <div className='mt-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--jx-line)] pt-6 text-[13px] text-[var(--jx-text-3)]'>
                    <span>{settings?.copyright?.[locale] || `© ${year} JOE13`}</span>
                    <span className='flex items-center gap-3 text-[var(--jx-steel)]'>
                        <span>{t('connect')}</span>
                        <i aria-hidden='true' className='block h-px w-5 bg-[var(--jx-line-strong)]' />
                        <span>{t('create')}</span>
                        <i aria-hidden='true' className='block h-px w-5 bg-[var(--jx-line-strong)]' />
                        <span>{t('grow')}</span>
                    </span>
                    <button
                        type='button'
                        onClick={backToTop}
                        className='group inline-flex items-center gap-3 text-[var(--jx-text-2)] transition-colors hover:text-white'
                    >
                        {tj('backToTop')}
                        <span className='grid size-9 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[inset_0_0_0_1px_#fff,var(--jx-glow-sm)]'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                                <path d='M12 19V5' />
                                <path d='m6 11 6-6 6 6' />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

function FooterColumn({ heading, children }) {
    return (
        <section>
            {heading ? (
                <div className='jx-display m-0 flex items-center gap-3 text-[17px] font-[700] text-[var(--jx-platinum)]'>
                    <i aria-hidden='true' className='block h-px w-6 bg-[linear-gradient(90deg,#fff,var(--jx-steel))] rtl:bg-[linear-gradient(270deg,#fff,var(--jx-steel))]' />
                    {heading}
                </div>
            ) : null}
            <div className='mt-5'>{children}</div>
        </section>
    );
}

function LinkList({ items }) {
    return (
        <ul className='m-0 grid list-none gap-0.5 p-0'>
            {items.map((item, i) => (
                <li key={item.link || i}>
                    <Link
                        href={item.link}
                        className='group flex items-center gap-0 py-1.5 text-[15px] leading-[1.5] text-[var(--jx-text-2)] transition-colors duration-300 hover:text-white'
                    >
                        <i aria-hidden='true' className='block h-px w-0 bg-white transition-[width,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:me-2.5 group-hover:w-3.5' />
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

const CONTACT_ICONS = {
    pin: (
        <>
            <path d='M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z' />
            <circle cx='12' cy='10' r='2.4' />
        </>
    ),
    mail: (
        <>
            <rect x='3.5' y='5.5' width='17' height='13' rx='2' />
            <path d='m4.5 7 7.5 6 7.5-6' />
        </>
    ),
    phone: <path d='M6.6 3.8 9 4.5l1.3 4-2 1.6a12.5 12.5 0 0 0 5.6 5.6l1.6-2 4 1.3.7 2.4c-.4 1.6-1.8 2.6-3.4 2.6A15.6 15.6 0 0 1 4 6.9c0-1.6 1-3 2.6-3.1Z' />,
};

function ContactRow({ icon, href, ltr, children }) {
    const inner = (
        <>
            <span className='grid size-10 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[color,background,box-shadow] duration-300 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)]'>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]'>
                    {CONTACT_ICONS[icon]}
                </svg>
            </span>
            <span dir={ltr ? 'ltr' : undefined} className='min-w-0 break-words text-[15px] leading-[1.6] text-[var(--jx-text-2)] transition-colors group-hover:text-white'>
                {children}
            </span>
        </>
    );
    return (
        <li>
            {href ? (
                <a href={href} className='group flex items-center gap-3.5 py-2'>
                    {inner}
                </a>
            ) : (
                <div className='group flex items-center gap-3.5 py-2'>{inner}</div>
            )}
        </li>
    );
}

export default Footer;
