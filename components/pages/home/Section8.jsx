'use client';

import Modal, { getModalItems } from '@/components/molecules/Modal';
import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import GlowFeatureCard, { GlowFeatureGrid } from '@/components/atoms/GlowFeatureCard';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const FEATURES = [
  { key: 'Hero.networkSolutions', src: '/landing/icon-7-1.png' },
  { key: 'Hero.expertSales', src: '/landing/icon-7-2.png' },
  { key: 'Hero.customizedSolutions', src: '/landing/icon-7-3.png' },
  { key: 'Hero.businessGrowth', src: '/landing/icon-7-4.png' },
];

export default function Section8({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Telecoms');
  const subtitle = data?.content?.[locale] || t('section8');
  const description = pickUi(data, locale, 'body', t('Hero.telecomsDescription'));
  const items = getModalItems(data, locale);
  const featureLabels = pickUi(data, locale, 'features');
  const featureItems = FEATURES.map((item, index) => ({
    ...item,
    label: Array.isArray(featureLabels) ? featureLabels[index] : null,
  }));

  return (
    <section
      id='telecoms'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-telecoms-heading' : undefined}
      className='relative isolate flex h-full min-h-screen flex-col overflow-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-7-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center max-md:object-[64%_center]'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col px-6 pb-[10vh] pt-[11%] pointer-events-auto max-md:justify-center max-md:px-4 max-md:py-[88px] max-[390px]:px-3 md:px-[5%] md:pt-[12%] xl:px-[6.8%] xl:pt-[12.6%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <TelecomsSkeleton />
          </>
        ) : (
          <div className='hero-stage w-full max-w-[620px] text-start min-[1600px]:max-w-[650px] max-[1100px]:max-w-[535px] max-[850px]:max-w-[490px]'>
            <div
              className={`mb-8 flex max-w-full items-center gap-3 text-[#16a9ef] [text-shadow:0_0_10px_rgba(0,155,235,0.25)] max-md:mb-6 max-md:gap-2 ${
                isAr
                  ? 'font-cairo text-[9px] font-medium tracking-[1.2px] sm:text-[10px] sm:tracking-[1.6px]'
                  : 'font-inter text-[9px] font-medium tracking-[2px] sm:text-[10px] sm:tracking-[3.2px] md:text-[11px] md:tracking-[3.8px]'
              }`}
            >
              <span className='min-w-0 whitespace-nowrap'>
                {pickUi(data, locale, 'eyebrow', `${t('Hero.connectingPeople')} ${t('Hero.brighterTomorrow')}`)}
              </span>
              <i className='hidden h-px w-12 shrink-0 bg-[linear-gradient(90deg,#19aef0,rgba(19,156,225,0.15))] sm:block sm:w-[72px] rtl:bg-[linear-gradient(90deg,rgba(19,156,225,0.15),#19aef0)]' />
            </div>

            {title ? <TelecomsTitle id='home-telecoms-heading' title={title} locale={locale} className={bodyFont} /> : null}

            {subtitle ? (
              <h3 className={`${bodyFont} mt-[18px] text-[30px] font-normal leading-[1.27] tracking-[-0.75px] text-[rgba(246,249,252,0.92)] [text-shadow:0_2px_10px_rgba(0,0,0,0.22)] max-md:mt-[15px] max-md:text-[19px] max-md:leading-[1.3] max-[1100px]:text-2xl max-[850px]:text-[22px] max-[390px]:text-[17px] min-[1600px]:text-[31px]`}>
                {subtitle}
              </h3>
            ) : null}

            {description ? (
              <p className={`${bodyFont} mt-[25px] text-[19px] font-normal leading-[1.58] tracking-[-0.25px] text-[rgba(221,231,241,0.72)] [text-shadow:0_2px_9px_rgba(0,0,0,0.3)] max-md:mt-[18px] max-md:text-[13px] max-md:leading-[1.5] max-[1100px]:text-base max-[850px]:text-[15px] max-[390px]:text-xs min-[1600px]:text-[19px]`}>
                {description}
              </p>
            ) : null}

            <GlowFeatureGrid>
              {featureItems.map(({ key, src, label }) => (
                <GlowFeatureCard key={key} src={src} className={bodyFont}>
                  {label || t(key)}
                </GlowFeatureCard>
              ))}
            </GlowFeatureGrid>

            <GlowCtaButton className={`${bodyFont} mt-7 max-md:mt-[23px]`} onClick={() => setIsModalOpen(true)}>
              {pickUi(data, locale, 'cta', t('readMore'))}
            </GlowCtaButton>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={subtitle}
        items={items}
      />
    </section>
  );
}

function TelecomsTitle({ id, title, locale, className }) {
  const titleClass = `${className} m-0 text-[clamp(28px,8.5vw,40px)] font-bold leading-[1.02] tracking-[-1.4px] text-[#f8fafc] [text-shadow:0_3px_15px_rgba(0,0,0,0.25)] max-[1100px]:md:text-[68px] max-[850px]:md:text-[62px] md:text-[clamp(70px,6.3vw,91px)] md:leading-[0.9] md:tracking-[-4.5px] min-[1600px]:text-[91px] ${
    locale === 'ar' ? '' : 'md:whitespace-nowrap'
  }`;
  const accentClass = `${TITLE_ACCENT} font-bold`;

  if (locale !== 'ar' && /coms$/i.test(title)) {
    return (
      <h2 id={id} className={titleClass}>
        <span>{title.slice(0, -4)}</span>
        <strong className={accentClass}>{title.slice(-4)}</strong>
      </h2>
    );
  }

  return (
    <h2 id={id} className={titleClass}>
      <strong className={accentClass}>{title}</strong>
    </h2>
  );
}

function TelecomsSkeleton() {
  return (
    <div className='w-full max-w-[620px]'>
      <div className='h-3 w-52 rounded skeleton-box bg-white/20' />
      <div className='mt-2 h-3 w-64 rounded skeleton-box bg-white/20' />
      <div className='mt-10 h-16 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-6 h-8 w-full max-w-[480px] rounded skeleton-box bg-white/20' />
      <div className='mt-4 h-5 w-full max-w-[400px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='min-h-[148px] rounded-[16px] skeleton-box bg-white/20' />
        ))}
      </div>
      <div className='mt-8 h-[54px] w-[205px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}

