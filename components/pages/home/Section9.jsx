'use client';

import Modal, { getModalItems } from '@/components/molecules/Modal';
import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import GlowFeatureCard, { GlowFeatureGrid } from '@/components/atoms/GlowFeatureCard';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const SERVICES = [
  { key: 'Hero.talentAcquisition', src: '/landing/icon-8-1.png' },
  { key: 'Hero.hrConsulting', src: '/landing/icon-8-2.png' },
  { key: 'Hero.workforceManagement', src: '/landing/icon-8-3.png' },
  { key: 'Hero.employeeDeployment', src: '/landing/icon-8-4.png' },
];

export default function Section9({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Manpower & HR Solutions');
  const subtitle = data?.content?.[locale] || t('section9');
  const items = getModalItems(data, locale);
  const featureLabels = pickUi(data, locale, 'features');
  const featureItems = SERVICES.map((item, index) => ({
    ...item,
    label: Array.isArray(featureLabels) ? featureLabels[index] : null,
  }));
  const eyebrowParts = pickUi(data, locale, 'eyebrowParts') || [
    t('Hero.captionPeople'),
    t('Hero.eyebrowPower'),
    t('Hero.eyebrowProgress'),
  ];

  return (
    <section
      id='manpower-hr'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-hr-heading' : undefined}
      className='relative isolate flex min-h-screen flex-col overflow-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-8-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center max-md:object-[65%_center]'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col px-6 pb-[10vh] pt-[11%] pointer-events-auto max-[390px]:px-[19px] md:px-[5%] md:pt-[12%] xl:px-[6.7%] xl:pt-[13.1%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <HrSkeleton />
          </>
        ) : (
          <div className='hero-stage w-full max-w-[610px] text-start min-[1600px]:max-w-[640px] max-[1100px]:max-w-[535px] max-[850px]:max-w-[475px]'>
            <div
              className={`mb-[34px] flex items-center gap-[23px] whitespace-nowrap text-[#0b9fe7] max-md:mb-[26px] max-md:gap-[13px] max-[1100px]:gap-4 ${
                isAr
                  ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[7px] max-[1100px]:text-[10px] max-[390px]:text-[6.5px]'
                  : 'font-inter text-xs font-medium tracking-[6.2px] max-md:text-[7px] max-md:tracking-[3.1px] max-[1100px]:text-[10px] max-[1100px]:tracking-[4.5px] max-[390px]:text-[6.5px] max-[390px]:tracking-[2.7px]'
              }`}
            >
              {eyebrowParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
              <i className='block h-px w-[164px] bg-[linear-gradient(90deg,rgba(21,166,235,0.9),rgba(21,166,235,0.15))] max-md:w-[47px] max-[1100px]:w-[100px] max-[390px]:w-[35px] rtl:bg-[linear-gradient(90deg,rgba(21,166,235,0.15),rgba(21,166,235,0.9))]' />
            </div>

            {title ? <HrTitle id='home-hr-heading' title={title} locale={locale} className={bodyFont} /> : null}

            {subtitle ? (
              <p className={`${bodyFont} mt-[19px] text-[23px] font-normal leading-[1.38] tracking-[-0.35px] text-[rgba(232,238,246,0.82)] [text-shadow:0_2px_9px_rgba(0,0,0,0.3)] max-md:mt-[15px] max-md:text-[15px] max-md:leading-[1.35] max-[1100px]:text-[19px] max-[850px]:text-[17px] max-[390px]:text-[13px] min-[1600px]:text-2xl`}>
                {subtitle}
              </p>
            ) : null}

            <GlowFeatureGrid>
              {featureItems.map(({ key, src, label }) => (
                <GlowFeatureCard key={key} src={src} className={bodyFont}>
                  {label || t(key)}
                </GlowFeatureCard>
              ))}
            </GlowFeatureGrid>

            <GlowCtaButton className={`${bodyFont} mt-[26px] max-md:mt-[22px]`} onClick={() => setIsModalOpen(true)}>
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

function HrTitle({ id, title, locale, className }) {
  const titleClass = `${className} m-0 flex w-full max-w-[590px] flex-wrap text-[clamp(45px,13.2vw,68px)] font-bold leading-[0.95] tracking-[-2.6px] text-[#f7f9fc] [text-shadow:0_3px_14px_rgba(0,0,0,0.2)] max-[390px]:text-[45px] max-[390px]:tracking-[-2.3px] max-[1100px]:max-w-[520px] max-[1100px]:md:text-[67px] max-[1100px]:md:tracking-[-3px] max-[850px]:max-w-[470px] max-[850px]:md:text-[59px] md:text-[82px] md:leading-[0.96] md:tracking-[-4px] min-[1600px]:text-[86px]`;
  const accentClass = `me-[18px] inline ${TITLE_ACCENT} font-bold leading-[0.98] max-md:me-3`;

  if (locale !== 'ar') {
    const hrIndex = title.indexOf('HR');
    if (hrIndex >= 0) {
      return (
        <h2 id={id} className={titleClass}>
          <span className='block w-full'>{title.slice(0, hrIndex).trim()}</span>
          <strong className={accentClass}>HR</strong>
          <span>{title.slice(hrIndex + 2).trim()}</span>
        </h2>
      );
    }
  }

  const arAccent = 'الموارد البشرية';
  const arIndex = title.indexOf(arAccent);
  if (arIndex >= 0) {
    const before = title
      .slice(0, arIndex)
      .replace(/و\s*$/, '')
      .trim();
    const after = title.slice(arIndex + arAccent.length).trim();
    return (
      <h2 id={id} className={titleClass}>
        {before ? <span className='block w-full'>{before}</span> : null}
        <strong className={accentClass}>{arAccent}</strong>
        {after ? <span>{after}</span> : null}
      </h2>
    );
  }

  return (
    <h2 id={id} className={titleClass}>
      {title}
    </h2>
  );
}

function HrSkeleton() {
  return (
    <div className='w-full max-w-[610px]'>
      <div className='h-3 w-64 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-12 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-12 w-full max-w-[360px] rounded skeleton-box bg-white/20' />
      <div className='mt-5 h-5 w-full max-w-[480px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='min-h-[148px] rounded-[16px] skeleton-box bg-white/20' />
        ))}
      </div>
      <div className='mt-7 h-[53px] w-[204px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}

