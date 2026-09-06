'use client';

import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section1({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || t('section1');
  const description = data?.content?.[locale] || t('Hero.description');

  return (
    <section
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-hero-heading' : undefined}
      aria-label={title ? undefined : 'JOE 13'}
      className='relative isolate flex h-full min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-hero.png')}
          alt=''
          fill
          priority
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center px-[23px] pb-28 pt-[76px] pointer-events-auto max-[390px]:px-[19px] max-md:pb-24 md:px-[5vw] md:pt-[100px] [@media(min-width:768px)_and_(max-height:800px)]:pb-20 [@media(min-width:768px)_and_(max-height:800px)]:pt-20'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <HeroSkeleton />
          </>
        ) : (
          <div className='hero-stage flex w-full max-w-[980px] flex-col items-center text-center'>
            <div className='relative mb-[38px] h-[72px] w-[240px] max-lg:mb-8 max-md:mb-[29px] md:h-[140px] md:w-[473px] [@media(min-width:768px)_and_(max-height:800px)]:mb-[25px]'>
              <Image
                src={cmsImage(pickUi(data, locale, 'logo'), '/assets/svg/logo-white.svg')}
                alt='JOE13'
                fill
                priority
                sizes='(max-width: 767px) 240px, 473px'
                className='object-contain object-center [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.28))]'
              />
            </div>

            {title ? (
              <TitleWithAccent
                id='home-hero-heading'
                title={title}
                locale={locale}
                className={`${bodyFont} m-0 w-full min-w-0 max-w-[46rem] whitespace-normal text-[clamp(32px,3.2vw,50px)] font-semibold leading-[1.2] tracking-[-1.7px] text-[#f5f7fb] [text-shadow:0_2px_12px_rgba(0,0,0,0.2)] max-lg:max-w-[40rem] max-lg:text-[clamp(30px,4.4vw,44px)] max-md:max-w-[24rem] max-md:text-[clamp(24px,7vw,34px)] max-md:leading-[1.22] max-md:tracking-[-0.8px] max-[390px]:max-w-[18.5rem] max-[390px]:text-[23px]`}
              />
            ) : null}

            {description ? (
              <p
                className={`${bodyFont} mt-[22px] max-w-[42rem] whitespace-normal text-pretty text-[clamp(17px,1.38vw,22px)] font-normal leading-[1.45] tracking-[-0.35px] text-[rgba(239,243,249,0.82)] max-lg:text-[17px] max-md:mt-[17px] max-md:max-w-[30rem] max-md:text-[clamp(13px,3.7vw,17px)] max-md:leading-[1.45] max-[390px]:text-xs [@media(min-width:768px)_and_(max-height:800px)]:mt-4`}
              >
                <HeroDescription text={description} />
              </p>
            ) : null}

            <GlowCtaButton href='/contact-us' className={`${bodyFont} mt-[33px] max-md:mt-[25px]`}>
              {pickUi(data, locale, 'cta', t('contact us'))}
            </GlowCtaButton>
          </div>
        )}
      </div>
    </section>
  );
}

function TitleWithAccent({ title, id, className, locale }) {
  const pattern =
    locale === 'ar'
      ? /(خبرة تزيد عن \d+\s*عامًا|بخبرة[^،.]*)/
      : /(\+\s*\d+\s*years?(?:\s+of\s+experience)?)/i;

  const match = title.match(pattern);
  if (!match) {
    return (
      <h1 id={id} className={className}>
        {title}
      </h1>
    );
  }

  const accent = match[0];
  const before = title.slice(0, match.index).trimEnd();
  const after = title.slice(match.index + accent.length).trim();
  const withSplit = before.match(/^(.*)\s+(with)$/i);
  const firstLine = withSplit ? withSplit[1] : before;
  const withWord = withSplit ? withSplit[2] : null;

  return (
    <h1 id={id} className={className}>
      {firstLine}
      {firstLine ? <br /> : null}
      {withWord ? (
        <span className='whitespace-nowrap'>
          {withWord}{' '}
          <span className={TITLE_ACCENT}>{accent}</span>
        </span>
      ) : (
        <span className={`whitespace-nowrap ${TITLE_ACCENT}`}>{accent}</span>
      )}
      {after ? (
        <>
          {' '}
          <span className='whitespace-nowrap'>{after}</span>
        </>
      ) : null}
    </h1>
  );
}

function HeroDescription({ text }) {
  const comma = Math.max(text.indexOf(','), text.indexOf('،'));
  if (comma < 0) return text;

  return (
    <>
      {text.slice(0, comma + 1).trim()}
      <br />
      {text.slice(comma + 1).trim()}
    </>
  );
}

function HeroSkeleton() {
  return (
    <div className='flex w-full max-w-[900px] flex-col items-center'>
      <div className='h-[72px] w-[240px] rounded skeleton-box bg-white/20 md:h-[140px] md:w-[473px]' />
      <div className='mt-4 h-3 w-40 rounded skeleton-box bg-white/20 sm:w-56' />
      <div className='mt-8 h-8 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-8 w-full max-w-[320px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-[54px] w-[208px] rounded-full skeleton-box bg-white/20 sm:h-[68px] sm:w-[264px]' />
    </div>
  );
}
