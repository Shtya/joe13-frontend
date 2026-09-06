'use client';

import { useLocale, useTranslations } from 'next-intl';
import LandingIcon from '@/components/atoms/LandingIcon';
import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { cmsImage, pickUi } from '@/helpers/cms';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

const cardShadow =
  'shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_0_22px_rgba(38,127,205,0.08),0_12px_28px_rgba(0,0,0,0.16)]';

export default function Section2({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const title = data?.title?.[locale] || t('section2');
  const description = data?.content?.[locale] || t('Hero.successDescription');
  const stats = data?.objectData?.[locale]
    ? Object.entries(data.objectData[locale]).filter(([key]) => !String(key).startsWith('_'))
    : [];

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pickUi(data, locale, 'pdf', '/joe-pdf-en2.pdf');
    link.download = 'JOE13 Profile';
    link.click();
  };

  return (
    <section
      id='success'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-success-heading' : undefined}
      className='relative isolate flex min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-2-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-6 py-[72px] pointer-events-auto max-[390px]:px-4 md:px-12 lg:px-[96px] lg:py-[80px]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <SuccessSkeleton />
          </>
        ) : (
          <div className='hero-stage mx-auto flex w-full max-w-[1180px] flex-col items-center text-center'>
            <div className='mx-auto w-full max-w-[920px]'>
              <div
                className={`mb-9 flex items-center justify-center gap-[22px] text-[#169be9] [text-shadow:0_0_12px_rgba(0,155,255,0.35)] max-md:mb-[23px] max-md:gap-[13px] ${
                  isAr
                    ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[9px]'
                    : 'font-inter text-[14px] font-medium tracking-[6px] max-md:text-[9px] max-md:tracking-[3.5px]'
                }`}
              >
                <i className='block h-px w-[74px] bg-[linear-gradient(90deg,transparent,rgba(190,222,255,0.9))] max-md:w-[45px]' />
                <span>{pickUi(data, locale, 'eyebrow', t('Hero.impact'))}</span>
                <i className='block h-px w-[74px] bg-[linear-gradient(90deg,rgba(190,222,255,0.9),transparent)] max-md:w-[45px]' />
              </div>

              {title ? (
                <SuccessTitle id='home-success-heading' title={title} locale={locale} className={bodyFont} />
              ) : null}

              {description ? (
                <p
                  className={`${bodyFont} mt-[25px] text-[clamp(17px,1.45vw,22px)] font-normal leading-[1.38] tracking-[-0.35px] text-[rgba(226,234,245,0.78)] max-md:mt-[17px] max-md:text-sm max-md:leading-[1.45]`}
                >
                  {description}
                </p>
              ) : null}
            </div>

            <div
              ref={ref}
              className='mx-auto mt-[35px] grid w-full min-w-0 grid-cols-2 gap-2.5 max-[390px]:gap-2 md:gap-3 lg:mt-10 lg:grid-cols-5 lg:gap-3'
            >
              {stats.map(([name, rawValue], i) => (
                <StatCard
                  key={name}
                  name={name}
                  rawValue={rawValue}
                  inView={inView}
                  iconIndex={i}
                  caption={statCaption(name, t)}
                  bodyFont={bodyFont}
                />
              ))}
            </div>

            <GlowCtaButton icon='download' onClick={downloadPDF} className={`${bodyFont} mt-[31px] lg:mt-10`}>
              {pickUi(data, locale, 'cta', t('Download PDF'))}
            </GlowCtaButton>
          </div>
        )}
      </div>
    </section>
  );
}

function SuccessTitle({ id, title, locale, className }) {
  const accent = locale === 'ar' ? 'عبر مختلف الصناعات' : 'Across Industries';
  const titleClass = `${className} m-0 mx-auto w-full min-w-0 max-w-[16.5em] whitespace-normal text-balance text-[clamp(27px,7.4vw,37px)] font-bold leading-[1.18] tracking-[-1px] text-[#f5f7fb] [text-shadow:0_2px_12px_rgba(0,0,0,0.2)] lg:text-[clamp(36px,3.45vw,54px)] lg:leading-[1.12] lg:tracking-[-1.8px]`;
  const accentClass = TITLE_ACCENT;

  const withAccent = text => {
    const start = text.indexOf(accent);
    if (start < 0) return text;
    return (
      <>
        {text.slice(0, start)}
        <span className={accentClass}>{accent}</span>
        {text.slice(start + accent.length)}
      </>
    );
  };

  const comma = Math.max(title.indexOf(','), title.indexOf('،'));
  if (comma >= 0) {
    return (
      <h2 id={id} className={titleClass}>
        {withAccent(title.slice(0, comma + 1).trim())}
        <br />
        {withAccent(title.slice(comma + 1).trim())}
      </h2>
    );
  }

  return (
    <h2 id={id} className={titleClass}>
      {withAccent(title)}
    </h2>
  );
}

function StatCard({ name, rawValue, inView, iconIndex, caption, bodyFont }) {
  const { number, suffix } = parseStatValue(rawValue);

  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-[16px] border border-[rgba(100,173,226,0.43)] bg-[linear-gradient(145deg,rgba(20,66,105,0.65)_0%,rgba(17,37,61,0.68)_48%,rgba(16,31,49,0.76)_100%)] p-3.5 text-start backdrop-blur-[4px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(130deg,rgba(87,178,245,0.15),transparent_27%,transparent_73%,rgba(72,163,229,0.06))] after:pointer-events-none after:absolute after:-start-[50px] after:-top-[80px] after:h-[150px] after:w-[180px] after:rounded-full after:bg-[rgba(0,130,240,0.12)] after:blur-[35px] max-[390px]:p-3 md:p-4 lg:rounded-[18px] lg:p-4 ${cardShadow}`}
    >
      <div className='relative z-[2] flex min-w-0 items-center justify-between gap-1'>
        <StatIcon index={iconIndex} />
        <StatNumber number={number} suffix={suffix} inView={inView} />
      </div>

      <h3 className={`${bodyFont} relative z-[2] mt-2 text-[13px] font-semibold leading-[1.15] tracking-[-0.4px] text-[#f2f5fa] max-[390px]:text-[12px] lg:mt-2.5 lg:text-[17px]`}>
        {name}
      </h3>

      {caption ? (
        <p className={`${bodyFont} relative z-[2] mt-1.5 text-[10px] font-normal leading-[1.35] tracking-[-0.15px] text-[rgba(196,208,224,0.67)] max-[390px]:text-[9px] lg:mt-1.5 lg:text-[13px] lg:leading-[1.38]`}>
          {caption}
        </p>
      ) : null}
    </article>
  );
}

function StatNumber({ number, suffix, inView }) {
  return (
    <div
      className={`${TITLE_ACCENT} min-w-0 flex-1 text-end text-[clamp(26px,2.1vw,38px)] font-bold leading-none tracking-[-0.06em] tabular-nums max-[390px]:text-[24px]`}
    >
      {inView ? (
        <span dir='ltr' className='inline-block max-w-full whitespace-nowrap'>
          +
          <CountUp start={0} end={number} duration={5} delay={0.1} />
          {suffix ? <span>{suffix}</span> : null}
        </span>
      ) : (
        <span dir='ltr' className='inline-block whitespace-nowrap'>
          +0{suffix}
        </span>
      )}
    </div>
  );
}

function StatIcon({ index }) {
  return (
    <div className='relative size-[64px] shrink-0 max-[390px]:size-[56px] lg:size-[72px]'>
      <LandingIcon src={`/landing/icon-4-${(index % 5) + 1}.png`} />
    </div>
  );
}

function parseStatValue(rawValue) {
  const value = String(rawValue ?? '');
  const hasPercent = value.includes('%') || value.includes('٪');
  const normalized = value.replace(/[٠-٩]/g, d => String(ARABIC_DIGITS.indexOf(d)));
  const number = parseFloat(hasPercent ? normalized.split(/[%٪]/)[0] : normalized) || 0;
  return { number, suffix: hasPercent ? '%' : '' };
}

function statCaption(name, t) {
  const key = String(name || '').toLowerCase();
  if (key.includes('city') || key.includes('cities') || key.includes('مدن')) return t('Hero.statCities');
  if (key.includes('growth') || key.includes('نمو')) return t('Hero.statGrowth');
  if (key.includes('client') || key.includes('عملاء')) return t('Hero.statClients');
  if (key.includes('project') || key.includes('مشروع')) return t('Hero.statProjects');
  return null;
}

function SuccessSkeleton() {
  return (
    <div className='flex w-full max-w-[1325px] flex-col items-center'>
      <div className='h-3 w-40 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-10 w-full max-w-[520px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-6 w-full max-w-[360px] rounded skeleton-box bg-white/20' />
      <div className='mt-10 grid w-full grid-cols-2 gap-3 lg:grid-cols-5'>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className='h-[215px] rounded-[16px] skeleton-box bg-white/15 lg:h-[255px]' />
        ))}
      </div>
      <div className='mt-8 h-[58px] w-[235px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}
