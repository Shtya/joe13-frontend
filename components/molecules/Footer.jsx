'use client';

import { useValues } from '@/app/context';
import LandingIcon from '@/components/atoms/LandingIcon';
import { Link, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const socialShadow =
  'shadow-[inset_0_1px_1px_rgba(143,216,255,0.11),0_4px_13px_rgba(0,0,0,0.18)]';

const cardShadow =
  'shadow-[inset_0_1px_1px_rgba(145,220,255,0.1),0_0_20px_rgba(0,105,192,0.09)]';

const contactShadow = 'shadow-[inset_0_1px_1px_rgba(140,214,255,0.06)]';

const talkShadow =
  'shadow-[0_0_20px_rgba(0,134,237,0.14),inset_0_1px_2px_rgba(180,232,255,0.08)]';

const Footer = ({ cn, id }) => {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const { projects, loading, settings, services } = useValues();
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);
  const [showAllServices, setShowAllServices] = useState(false);
  const SERVICE_PREVIEW_COUNT = 8;

  const ourProduct = projects?.data?.filter(e => e.department?.id == 1);
  const productLinks = ourProduct
    ?.filter(e => e?.slug && (e?.name?.[locale] || e?.name?.en))
    ?.slice(0, 5)
    ?.map(e => ({
      name: e?.name?.[locale],
      link: `/projects/${e.slug}`,
    }));
  const serviceLinks = services?.data
    ?.filter(e => e?.slug && (e?.title?.[locale] || e?.title?.en))
    ?.map(e => ({
      name: e?.title?.[locale],
      link: `/services/${e.slug}`,
    }));
  const visibleServices = showAllServices
    ? serviceLinks
    : serviceLinks?.slice(0, SERVICE_PREVIEW_COUNT);
  const hasMoreServices = (serviceLinks?.length || 0) > SERVICE_PREVIEW_COUNT;
  const socials = Object.entries(settings?.social_media || {}).filter(([, value]) => value);
  const address = settings?.contact_us?.address?.[locale];
  const email = settings?.contact_us?.email;
  const phone = settings?.contact_us?.phone;
  const branches = settings?.branch?.[locale] || [];
  const description = settings?.about_us_footer?.[locale] || t('description');

  useEffect(() => {
    if (pathname.startsWith('/services')) setShowFooter(false);
    else setShowFooter(true);
  }, [pathname]);

  if (!showFooter) return;

  if (loading) {
    return (
      <div className={`relative isolate overflow-hidden py-[100px] text-white ${cn || ''}`}>
        <p className='sr-only'>{locale === 'ar' ? 'جاري التحميل' : 'Loading'}</p>
        <div className='mx-auto grid w-[min(1370px,calc(100%-36px))] grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='space-y-4'>
              <div className='h-5 w-3/4 rounded skeleton-box bg-white/20' />
              {Array.from({ length: 3 }).map((_, row) => (
                <div key={row} className='h-4 w-full rounded skeleton-box bg-white/10' />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <footer
      id={id}
      className={`relative isolate z-[1000] min-h-screen overflow-hidden text-white max-[1200px]:min-h-screen max-[1450px]:min-h-screen max-[640px]:min-h-screen max-[640px]:pe-2 ${bodyFont} ${cn || ''}`}
    >
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src='/landing/bg-footer.png'
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-center max-[640px]:object-bottom'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_82%_10%,rgba(0,104,211,0.16),transparent_33%),radial-gradient(ellipse_at_16%_58%,rgba(0,117,213,0.08),transparent_29%)]'
      />

      <div className='relative z-10 mx-auto grid min-h-[805px] w-[min(1370px,calc(100%-120px))] grid-cols-[1.22fr_.95fr_1.22fr_1.12fr_.92fr] pt-2 max-[1450px]:w-[calc(100%-110px)] max-[1200px]:w-[calc(100%-60px)] max-[1200px]:grid-cols-[1.15fr_.9fr_1.25fr_1.1fr] max-[900px]:w-[calc(100%-42px)] max-[900px]:grid-cols-2 max-[900px]:pb-[35px] max-[640px]:block max-[640px]:w-[calc(100%-36px)] max-[640px]:pb-5 max-[390px]:w-[calc(100%-28px)]'>
        <section className='pe-10 pt-[120px] max-[1450px]:pe-[27px] max-[900px]:col-span-2 max-[900px]:pe-0 max-[900px]:pt-[88px] max-[640px]:pt-[68px]'>
          <div className='flex w-[198px] flex-col text-[#f8fbff] max-[640px]:w-40'>
            <span className='block origin-start scale-x-[1.04] text-[51px] font-bold leading-[0.77] tracking-[-5px] [text-shadow:0_0_7px_rgba(255,255,255,0.15)] max-[640px]:text-[42px] max-[390px]:text-[37px]'>
              JOE13
            </span>
            <small className='mt-2.5 ps-1 text-[6.5px] font-medium leading-none tracking-[2px] text-[#e8f3fb] max-[640px]:text-[5px] max-[640px]:tracking-[1.6px]'>
              {t('tomorrowMade')}
            </small>
          </div>

          {description ? (
            <p className='mt-[29px] text-base font-normal leading-[1.5] tracking-[-0.25px] text-[rgba(227,238,248,0.88)] max-[1200px]:text-sm max-[640px]:mt-[23px] max-[640px]:text-[13px] max-[390px]:text-xs'>
              {description}
            </p>
          ) : null}

          {socials.length > 0 ? (
            <div className='mt-[17px] flex w-[285px] flex-wrap gap-[7px] max-[640px]:mt-[18px] max-[640px]:w-full max-[640px]:gap-1.5'>
              {socials.map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={key}
                  className={`flex size-[49px] items-center justify-center rounded-[11px] border border-[rgba(13,143,221,0.63)] bg-[linear-gradient(145deg,rgba(8,69,116,0.85),rgba(3,28,53,0.86))] text-white transition duration-[250ms] hover:-translate-y-[3px] hover:border-[rgba(12,170,244,0.95)] hover:shadow-[0_0_14px_rgba(0,153,242,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[640px]:size-[43px] max-[640px]:rounded-[9px] max-[390px]:size-10 ${socialShadow} ${focusRing}`}
                >
                  <Image className='object-contain' src={`/assets/social/${key}.png`} alt='' width={25} height={25} />
                </a>
              ))}
            </div>
          ) : null}

          <div className='mt-12 flex items-center gap-[11px] text-[9px] font-medium tracking-[1.55px] text-[#079fe9] max-[640px]:mt-[35px] max-[640px]:text-[7px] max-[640px]:tracking-[1.1px]'>
            <span>-{t('connect')}</span>
            <b className='text-[8px] font-medium text-[#1688d0]'>•</b>
            <span>{t('create')}</span>
            <b className='text-[8px] font-medium text-[#1688d0]'>•</b>
            <span>{t('grow')}-</span>
          </div>

          <Link
            href='/contact-us'
            className={`relative mt-[33px] flex min-h-[147px] w-[274px] items-center rounded-[17px] border border-[rgba(13,151,237,0.82)] bg-[linear-gradient(135deg,rgba(4,46,81,0.78),rgba(5,29,53,0.7))] px-[17px] py-[23px] ps-[27px] text-white backdrop-blur-[3px] transition duration-300 hover:-translate-y-1 hover:border-[rgba(18,176,247,1)] hover:shadow-[0_0_25px_rgba(0,130,230,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[1200px]:w-full max-[640px]:mt-[26px] max-[640px]:min-h-[128px] max-[640px]:p-[21px] max-[390px]:min-h-[120px] ${cardShadow} ${focusRing}`}
          >
            <div>
              <strong className='block text-[15px] font-semibold leading-[1.22] text-[#f8fbff] max-[640px]:text-sm'>
                {t('letsBuild')}
              </strong>
              <p className='mt-[13px] text-[11px] leading-[1.45] text-[rgba(216,232,246,0.8)] max-[640px]:text-[10px]'>
                {t('brighterFuture')}
              </p>
            </div>
          </Link>
        </section>

        {productLinks?.length ? (
        <FooterColumn className='max-[1200px]:px-5' heading={ourProduct?.[0]?.department?.name?.[locale] || t('ourProduct')}>
          <ul className='mt-[19px] list-none p-0'>
            {productLinks.map((item, index) => (
              <li
                key={item.link || index}
                className="relative mb-[17px] ps-[34px] before:absolute before:start-0 before:top-[-2px] before:text-[25px] before:font-light before:leading-none before:text-[#079ee9] before:content-['›'] rtl:before:content-['‹']"
              >
                <Link
                  href={item.link}
                  className={`text-sm font-normal leading-[1.3] text-[rgba(227,236,245,0.9)] transition-colors duration-200 hover:text-[#11aeef] max-[640px]:text-[13px] ${focusRing}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>
        ) : null}

        {visibleServices?.length ? (
        <FooterColumn className='max-[900px]:col-span-2 max-[1200px]:px-5' heading={t('services')}>
          <ul className='mt-[19px] list-none p-0 max-[900px]:columns-2 max-[640px]:columns-1'>
            {visibleServices.map((item, index) => (
              <li
                key={item.link || index}
                className="relative mb-3.5 break-inside-avoid ps-[34px] before:absolute before:start-0 before:top-[-2px] before:text-[25px] before:font-light before:leading-none before:text-[#079ee9] before:content-['›'] rtl:before:content-['‹'] max-[640px]:mb-[13px]"
              >
                <Link
                  href={item.link}
                  className={`text-sm font-normal leading-[1.22] text-[rgba(227,236,245,0.9)] transition-colors duration-200 hover:text-[#11aeef] max-[640px]:text-[13px] ${focusRing}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {hasMoreServices ? (
            <button
              type='button'
              onClick={() => setShowAllServices(open => !open)}
              className={`mt-1 ps-[34px] text-sm font-medium text-[#11aeef] transition-colors duration-200 hover:text-[#7ad4ff] max-[640px]:text-[13px] ${focusRing}`}
            >
              {showAllServices ? t('showLess') : t('readMore')}
            </button>
          ) : null}
        </FooterColumn>
        ) : null}

        <FooterColumn className='max-[1200px]:px-5' heading={t('contact_us')}>
          {address ? (
            <div className={`mt-2.5 flex min-h-[85px] w-full items-center gap-[17px] rounded-2xl border border-[rgba(8,127,202,0.39)] bg-[linear-gradient(135deg,rgba(5,48,80,0.65),rgba(3,28,51,0.53))] px-3.5 py-2.5 text-[13px] leading-[1.35] text-[#eef5fa] max-[640px]:min-h-[64px] max-[640px]:gap-3 max-[640px]:px-3 max-[640px]:text-xs ${contactShadow}`}>
              <ContactIcon src='/landing/location.png' />
              <span>{address}</span>
            </div>
          ) : null}

          {email ? (
            <a
              href={`mailto:${email}`}
              className={`mt-2.5 flex min-h-[85px] w-full items-center gap-[17px] rounded-2xl border border-[rgba(8,127,202,0.39)] bg-[linear-gradient(135deg,rgba(5,48,80,0.65),rgba(3,28,51,0.53))] px-3.5 py-2.5 text-[13px] leading-[1.35] text-[#eef5fa] transition duration-[250ms] hover:translate-x-[3px] hover:border-[rgba(10,161,239,0.75)] hover:bg-[rgba(5,55,91,0.72)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 rtl:hover:-translate-x-[3px] max-[640px]:min-h-[64px] max-[640px]:gap-3 max-[640px]:px-3 max-[640px]:text-xs ${contactShadow} ${focusRing}`}
            >
              <ContactIcon src='/landing/emails.png' />
              <span>{email}</span>
            </a>
          ) : null}

          {phone ? (
            <a
              href={`https://wa.me/${phone}`}
              target='_blank'
              rel='noopener noreferrer'
              dir='ltr'
              className={`mt-2.5 flex min-h-[85px] w-full items-center gap-[17px] rounded-2xl border border-[rgba(8,127,202,0.39)] bg-[linear-gradient(135deg,rgba(5,48,80,0.65),rgba(3,28,51,0.53))] px-3.5 py-2.5 text-[13px] leading-[1.35] text-[#eef5fa] transition duration-[250ms] hover:translate-x-[3px] hover:border-[rgba(10,161,239,0.75)] hover:bg-[rgba(5,55,91,0.72)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 rtl:text-right rtl:hover:-translate-x-[3px] max-[640px]:min-h-[64px] max-[640px]:gap-3 max-[640px]:px-3 max-[640px]:text-xs ${contactShadow} ${focusRing}`}
            >
              <ContactIcon src='/landing/phone.png' />
              <span className='underline underline-offset-2'>{phone}</span>
            </a>
          ) : null}

          <Link
            href='/contact-us'
            className={`relative mt-[19px] flex min-h-[113px] w-full items-center rounded-2xl border border-[rgba(8,153,237,0.9)] bg-[linear-gradient(135deg,rgba(7,68,116,0.75),rgba(3,36,65,0.69))] p-[15px] text-white transition duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_0_28px_rgba(0,142,243,0.28),inset_0_1px_2px_rgba(180,232,255,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[640px]:min-h-[88px] max-[640px]:p-3 ${talkShadow} ${focusRing}`}
          >
            <span className='relative flex size-[52px] shrink-0 items-center justify-center max-[640px]:size-9'>
              <LandingIcon src='/landing/msg.png' />
            </span>
            <span className='ms-3 flex flex-col'>
              <strong className='text-[15px] font-semibold leading-[1.2]'>{t('letsTalk')}</strong>
              <small className='mt-[9px] text-[10px] leading-[1.35] text-[rgba(224,237,248,0.8)]'>{t('talkHelp')}</small>
            </span>
          </Link>
        </FooterColumn>

        <FooterColumn className='max-[1200px]:px-5' heading={t('branch_office')}>
          <ul className='mt-[19px] list-none p-0'>
            {branches.map((branch, index) => (
              <li key={index} className='mb-[11px]'>
                <div className='flex min-h-[57px] items-center gap-[17px] rounded-[15px] border border-[rgba(7,117,190,0.26)] bg-[linear-gradient(135deg,rgba(5,47,79,0.57),rgba(3,28,51,0.45))] px-[13px] py-1.5 text-[13px] text-[rgba(227,236,245,0.9)] max-[640px]:min-h-[55px]'>
                  <ContactIcon src='/landing/location.png' />
                  <span>{branch}</span>
                </div>
              </li>
            ))}
          </ul>
        </FooterColumn>
      </div>

      <div className='relative z-10 mx-auto flex min-h-[94px] w-[min(1370px,calc(100%-120px))] items-center justify-between border-t border-[rgba(11,151,232,0.74)] max-[1450px]:w-[calc(100%-110px)] max-[1200px]:w-[calc(100%-60px)] max-[900px]:w-[calc(100%-42px)] max-[640px]:min-h-[125px] max-[640px]:w-[calc(100%-36px)] max-[640px]:flex-col max-[640px]:items-start max-[640px]:justify-center max-[640px]:gap-[23px] max-[640px]:pb-7 max-[390px]:w-[calc(100%-28px)]'>
        {settings?.copyright?.[locale] ? (
          <span className='text-[13px] leading-none text-[rgba(221,234,246,0.83)] max-[640px]:text-[11px]'>
            {settings.copyright[locale]}
          </span>
        ) : null}
      </div>
    </footer>
  );
};

function FooterColumn({ heading, children, className = '' }) {
  return (
    <section
      className={`relative px-[34px] pb-[70px] pt-[120px] before:absolute before:bottom-12 before:start-0 before:top-[123px] before:w-px before:bg-[linear-gradient(to_bottom,rgba(30,107,163,0.16),rgba(30,107,163,0.4)_28%,rgba(30,107,163,0.13)_85%,transparent)] max-[1450px]:px-[27px] max-[640px]:px-0 max-[640px]:pb-[25px] max-[640px]:pt-[52px] max-[640px]:before:hidden max-[900px]:pb-[25px] max-[900px]:pt-[60px] ${className}`}
    >
      {heading ? (
        <>
          <h3 className='m-0 whitespace-nowrap text-[17px] font-semibold leading-[1.2] text-[#f4f7fa] max-[640px]:text-base'>
            {heading}
          </h3>
          <span className='mt-3.5 block h-1 w-[43px] rounded bg-[linear-gradient(90deg,#08aaf1,#0785df)] shadow-[0_0_7px_rgba(0,157,239,0.25)]' />
        </>
      ) : null}
      {children}
    </section>
  );
}

function ContactIcon({ src, className = '' }) {
  return (
    <span className={`relative flex size-[52px] shrink-0 items-center justify-center max-[640px]:size-9 ${className}`}>
      <LandingIcon src={src} />
    </span>
  );
}

export default Footer;
