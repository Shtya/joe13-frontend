'use client';

import { useValues } from '@/app/context';
import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion, weightMorph } from '@/components/jx/motion';
import { cmsImage, pickList, pickUi } from '@/helpers/cms';
import { hookContactUs } from '@/hooks/hookContactUs';
import { usePages } from '@/hooks/usePages';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Contact — Black & Silver, a front desk.
 *   Start side: chrome title, lede and the three direct lines (office, mail,
 *   phone) as large dial rows — the fastest way in is one tap away.
 *   End side: the message plate, printed up from the floor as the page
 *   settles; graphite wells whose hairline turns silver on focus.
 *   Beneath: the three promises, quietly, on hairlines.
 */
function telHref(phone) {
    const cleaned = String(phone || '').replace(/[^\d+]/g, '');
    return cleaned ? `tel:${cleaned}` : '#';
}

function mapsHref(address) {
    return address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : '#';
}

export default function ContactPage({ initialData }) {
    const t = useTranslations('ContactUs');
    const tRoot = useTranslations();
    const tFooter = useTranslations('Footer');
    const locale = useLocale();

    const { register, errors, loading, submit } = hookContactUs();
    const { loading: loadingSection, data } = usePages({ page_name: 'contact-us', initialData });
    const { settings } = useValues();

    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const title = section1?.title?.[locale] || t('contactUsTitle');
    const subtitle = section1?.content?.[locale] || t('stayConnected');
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));

    const address = settings?.contact_us?.address?.[locale];
    const email = settings?.contact_us?.email;
    const phone = settings?.contact_us?.phone;

    const cmsFeatures = pickList(section1, locale, 'features');
    const promises = [
        { icon: <ShieldIcon />, title: t('trustedSupport'), copy: t('trustedSupportDesc') },
        { icon: <ClockIcon />, title: t('quickResponse'), copy: t('quickResponseDesc') },
        { icon: <TeamIcon />, title: t('expertTeam'), copy: t('expertTeamDesc') },
    ].map((item, i) => ({ ...item, title: String(cmsFeatures?.[i] || item.title), copy: item.copy.replace(/\s*\n\s*/g, ' ') }));

    const ref = useViewMotion({
        deps: [loadingSection, locale],
        threshold: 0.05,
        extend: (tl, root) => {
            weightMorph(tl, root.querySelector('.jx-morph'));
            raisePlate(tl, root);
        },
    });

    const fieldProps = (key, extra = {}) => ({
        ...register(key),
        id: `contact-${key}`,
        name: key,
        'aria-invalid': errors?.[key] ? true : undefined,
        'aria-describedby': errors?.[key] ? `contact-${key}-error` : undefined,
        ...extra,
    });

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={ref} id='contact' labelledBy='contact-heading' busy={loadingSection} priority image={cmsImage(section1?.image?.url, '/landing/contact-us.png')} imagePosition='right center' shade='deep'>
                <div className='grid w-full items-start gap-x-[clamp(32px,5vw,96px)] gap-y-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center'>
                    {/* Direct lines */}
                    <div className='min-w-0 text-start'>
                        <JxTag>{pickUi(section1, locale, 'eyebrow', t('letsConnect'))}</JxTag>
                        <JxHeading as='h1' id='contact-heading' lines={lines} className='mt-5 text-[length:var(--jx-fs-5xl)] leading-[1.15]' />
                        {subtitle ? (
                            <p data-jx='rise' className='m-0 mt-6 max-w-[34rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                                {subtitle}
                            </p>
                        ) : null}

                        {address || email || phone ? (
                            <ul className='m-0 mt-10 max-w-[34rem] list-none border-t border-[var(--jx-line)] p-0'>
                                {address ? <Channel href={mapsHref(address)} external order={0} label={tFooter('head_office')} value={address} icon={<PinIcon />} /> : null}
                                {email ? <Channel href={`mailto:${email}`} order={1} label={t('emailUs')} value={email} icon={<MailIcon />} ltr /> : null}
                                {phone ? <Channel href={telHref(phone)} order={2} label={t('callUs')} value={phone} icon={<PhoneIcon />} ltr /> : null}
                            </ul>
                        ) : null}
                    </div>

                    {/* Message plate */}
                    <form
                        data-plate
                        onSubmit={submit}
                        noValidate
                        aria-labelledby='contact-form-heading'
                        className='jx-form relative min-w-0 rounded-[28px] bg-[rgba(11,12,14,0.78)] p-[clamp(22px,3vw,44px)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_60px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-[14px]'
                    >
                        <span aria-hidden='true' className='pointer-events-none absolute inset-x-10 top-0 h-px bg-[image:var(--jx-chrome)] opacity-70' />
                        <h2 id='contact-form-heading' data-jx='rise' className='jx-display m-0 text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-[700] leading-[1.3] text-[var(--jx-platinum)]'>
                            {t('sendMessage')}
                        </h2>

                        <div data-jx='rise' className='mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2'>
                            <Field id='contact-name' label={t('fullName')} icon={<PersonIcon />} error={errors?.name} tRoot={tRoot}>
                                <input {...fieldProps('name')} type='text' autoComplete='name' />
                            </Field>
                            <Field id='contact-phone' label={t('phoneNumber')} icon={<PhoneIcon />} error={errors?.phone} tRoot={tRoot}>
                                <input {...fieldProps('phone')} type='tel' autoComplete='tel' inputMode='tel' dir='ltr' placeholder='05XXXXXXXX' className='rtl:text-right' />
                            </Field>
                            <Field id='contact-email' label={t('email')} icon={<MailIcon />} error={errors?.email} tRoot={tRoot} className='sm:col-span-2'>
                                <input {...fieldProps('email')} type='email' autoComplete='email' dir='ltr' placeholder='name@company.com' className='rtl:text-right' />
                            </Field>
                            <Field id='contact-message' label={t('message')} icon={<MessageIcon />} error={errors?.message} tRoot={tRoot} className='sm:col-span-2' area>
                                <textarea {...fieldProps('message')} rows={5} />
                            </Field>
                        </div>

                        <div data-jx='rise' className='mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4'>
                            <JxButton type='submit' disabled={loading} aria-busy={loading || undefined} motion={false} className='disabled:pointer-events-none disabled:opacity-60'>
                                {loading ? tRoot('loading') : t('sendMessage')}
                            </JxButton>
                            <span className='flex items-center gap-2.5 text-[13.5px] text-[var(--jx-text-3)]'>
                                <span className='jx-field-icon !text-[var(--jx-silver)] [&_svg]:!size-[18px]'>
                                    <ClockIcon />
                                </span>
                                {promises[1].copy}
                            </span>
                        </div>
                    </form>
                </div>

                {/* Promises */}
                <ul className='m-0 mt-[clamp(40px,7vh,72px)] grid w-full list-none gap-y-6 border-t border-[var(--jx-line)] p-0 pt-8 sm:grid-cols-3'>
                    {promises.map((item, i) => (
                        <li key={i} data-jx='rise' className='flex items-start gap-4 sm:px-6 sm:first:ps-0 sm:[&:not(:first-child)]:border-s sm:[&:not(:first-child)]:border-[var(--jx-line)]'>
                            <span className='grid size-12 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] [&_svg]:size-[22px]'>{item.icon}</span>
                            <span className='min-w-0'>
                                <strong className='jx-display block text-[16px] font-[700] text-[var(--jx-platinum)]'>{item.title}</strong>
                                <span className='mt-1 block text-[14px] leading-[1.7] text-[var(--jx-text-3)]'>{item.copy}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </JxScene>
        </div>
    );
}

function Field({ id, label, icon, error, tRoot, area = false, className = '', children }) {
    return (
        <div className={`min-w-0 ${className}`}>
            <label htmlFor={id} className='jx-label'>
                {label}
            </label>
            <div className={`jx-field ${area ? 'jx-field--area' : ''}`} data-invalid={error ? '' : undefined}>
                <span className='jx-field-icon' aria-hidden='true'>
                    {icon}
                </span>
                {children}
            </div>
            {error ? (
                <p id={`${id}-error`} role='alert' className='jx-error m-0'>
                    {tRoot(error.message)}
                </p>
            ) : null}
        </div>
    );
}

function Channel({ href, label, value, icon, order = 0, ltr = false, external = false }) {
    return (
        <li className='jx-enter border-b border-[var(--jx-line)]' style={{ '--jx-enter-at': `${0.75 + order * 0.1}s` }}>
            <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className='group flex items-center gap-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
                <span className='grid size-14 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow] duration-500 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)] [&_svg]:size-[22px]'>
                    {icon}
                </span>
                <span className='min-w-0 flex-1'>
                    <span className='block text-[13px] text-[var(--jx-text-3)]'>{label}</span>
                    <span
                        dir={ltr ? 'ltr' : undefined}
                        className={`jx-display mt-1 block text-[clamp(1.05rem,0.92rem+0.45vw,1.35rem)] font-[700] leading-[1.5] text-[var(--jx-platinum)] transition-colors group-hover:text-white ${ltr ? 'truncate rtl:text-right' : 'line-clamp-2'}`}
                    >
                        {value}
                    </span>
                </span>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 shrink-0 fill-none stroke-current stroke-[1.8] text-[var(--jx-steel)] transition-[transform,color] duration-300 [stroke-linecap:round] [stroke-linejoin:round] group-hover:translate-x-1 group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1'>
                    <path d='M5 12h14' />
                    <path d='m13 6 6 6-6 6' />
                </svg>
            </a>
        </li>
    );
}

/* The message plate rises out of the floor while the title settles. */
function raisePlate(tl, root) {
    const plate = root.querySelector('[data-plate]');
    if (!plate) return;
    const from = { clipPath: 'inset(100% 0% 0% 0% round 28px)', y: 40 };
    gsap.set(plate, from);
    tl.fromTo(plate, from, { clipPath: 'inset(0% 0% 0% 0% round 28px)', y: 0, duration: 1.4, ease: 'expo.inOut', immediateRender: false, clearProps: 'clipPath,transform' }, 0.35);
}

function Svg({ children }) {
    return (
        <svg viewBox='0 0 24 24' aria-hidden='true' className='fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]'>
            {children}
        </svg>
    );
}

function PersonIcon() {
    return (
        <Svg>
            <circle cx='12' cy='8' r='3.4' />
            <path d='M5 20c0-3.8 2.9-6.2 7-6.2s7 2.4 7 6.2' />
        </Svg>
    );
}

function PhoneIcon() {
    return (
        <Svg>
            <path d='M6.7 3.8 9.5 3c.7-.2 1.4.2 1.7.8l1.4 3.4c.2.6.1 1.3-.4 1.7L10.6 10c1.2 2.3 3 4.2 5.4 5.4l1.1-1.6c.4-.5 1.1-.7 1.7-.4l3.4 1.4c.6.3 1 .9.8 1.7l-.8 2.8c-.2.7-.8 1.2-1.5 1.2C10.7 20.5 3.5 13.3 3.5 4.3c0-.7.5-1.3 1.2-1.5Z' />
        </Svg>
    );
}

function MailIcon() {
    return (
        <Svg>
            <rect x='3.5' y='5.5' width='17' height='13' rx='2' />
            <path d='m4.5 7 7.5 5.5L19.5 7' />
        </Svg>
    );
}

function MessageIcon() {
    return (
        <Svg>
            <path d='M4 5.5h16v11H9l-5 3v-14Z' />
            <path d='M8 10h8M8 13h5' />
        </Svg>
    );
}

function PinIcon() {
    return (
        <Svg>
            <path d='M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z' />
            <circle cx='12' cy='9.5' r='2.4' />
        </Svg>
    );
}

function ShieldIcon() {
    return (
        <Svg>
            <path d='M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z' />
            <path d='m9 12 2.2 2.2L15.5 10' />
        </Svg>
    );
}

function ClockIcon() {
    return (
        <Svg>
            <circle cx='12' cy='12' r='8.5' />
            <path d='M12 7.5V12l3 2' />
        </Svg>
    );
}

function TeamIcon() {
    return (
        <Svg>
            <circle cx='12' cy='8' r='3' />
            <circle cx='5.5' cy='10' r='2.2' />
            <circle cx='18.5' cy='10' r='2.2' />
            <path d='M7.5 19c0-3 1.8-5 4.5-5s4.5 2 4.5 5' />
            <path d='M2.5 18c0-2.3 1.2-3.8 3.2-3.8' />
            <path d='M21.5 18c0-2.3-1.2-3.8-3.2-3.8' />
        </Svg>
    );
}
