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
  { key: 'Hero.strategicMerchandising', src: '/landing/icon-9-1.png' },
  { key: 'Hero.brandActivation', src: '/landing/icon-9-2.png' },
  { key: 'Hero.eventManagement', src: '/landing/icon-9-3.png' },
  { key: 'Hero.measurableResults', src: '/landing/icon-9-4.png' },
];

export default function Section10({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Merchandising, Activation and Event Management');
  const subtitle = data?.content?.[locale] || t('section10');
  const items = getModalItems(data, locale);
  const featureLabels = pickUi(data, locale, 'features');
  const featureItems = SERVICES.map((item, index) => ({
    ...item,
    label: Array.isArray(featureLabels) ? featureLabels[index] : null,
  }));
  const eyebrowParts = pickUi(data, locale, 'eyebrowParts') || [
    t('Hero.eyebrowBrands'),
    t('Hero.eyebrowIn'),
    t('Hero.eyebrowEvery'),
    t('Hero.eyebrowExperience'),
  ];

  return (
    <section
      id='merchandising'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-merchandising-heading' : undefined}
      className='relative isolate flex min-h-screen flex-col overflow-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-9-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center max-md:object-[65%_center] max-[850px]:object-[64%_center]'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col px-6 pb-[10vh] pt-[11%] pointer-events-auto max-[390px]:px-[19px] md:px-[5%] md:pt-[12%] xl:px-[6.65%] xl:pt-[14.1%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <MerchSkeleton />
          </>
        ) : (
          <div className='hero-stage w-full max-w-[620px] text-start min-[1600px]:max-w-[650px] max-[1100px]:max-w-[530px] max-[850px]:max-w-[470px]'>
            <div
              className={`mb-[31px] flex items-center gap-[22px] whitespace-nowrap text-[#0aa5eb] [text-shadow:0_0_10px_rgba(0,157,236,0.22)] max-md:mb-6 max-md:gap-[11px] max-[1100px]:gap-[15px] ${
                isAr
                  ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[6.7px] max-[1100px]:text-[9px] max-[390px]:text-[6.2px]'
                  : 'font-inter text-[11px] font-medium tracking-[5.8px] max-md:text-[6.7px] max-md:tracking-[3px] max-[1100px]:text-[9px] max-[1100px]:tracking-[4.2px] max-[390px]:text-[6.2px] max-[390px]:tracking-[2.5px]'
              }`}
            >
              {eyebrowParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
              <i className='block h-px w-[93px] bg-[linear-gradient(90deg,rgba(25,173,240,0.92),rgba(25,173,240,0.16))] max-md:w-[41px] max-[1100px]:w-[70px] max-[390px]:w-8 rtl:bg-[linear-gradient(90deg,rgba(25,173,240,0.16),rgba(25,173,240,0.92))]' />
            </div>

            {title ? (
              <MerchTitle id='home-merchandising-heading' title={title} locale={locale} className={bodyFont} />
            ) : null}

            {subtitle ? (
              <p className={`${bodyFont} mt-[18px] text-lg font-normal leading-[1.55] tracking-[-0.3px] text-[rgba(230,237,245,0.82)] [text-shadow:0_2px_9px_rgba(0,0,0,0.3)] max-md:mt-[15px] max-md:text-[12.5px] max-md:leading-[1.48] max-[1100px]:text-base max-[850px]:text-sm max-[390px]:text-[11.5px] min-[1600px]:text-[19px]`}>
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

            <GlowCtaButton className={`${bodyFont} mt-7 max-md:mt-[22px]`} onClick={() => setIsModalOpen(true)}>
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

function MerchTitle({ id, title, locale, className }) {
  const titleClass = `${className} m-0 block w-full max-w-[620px] text-[clamp(38px,11.9vw,62px)] font-bold leading-[0.97] tracking-[-2.2px] text-[#f8fafc] [text-shadow:0_3px_14px_rgba(0,0,0,0.24)] max-[390px]:text-[37px] max-[390px]:tracking-[-1.9px] max-[1100px]:max-w-[530px] max-[1100px]:md:text-[57px] max-[1100px]:md:tracking-[-2.8px] max-[850px]:max-w-[470px] max-[850px]:md:text-[51px] md:text-[67px] md:tracking-[-3.4px] min-[1600px]:max-w-[650px] min-[1600px]:text-[70px]`;
  const accentClass = `${TITLE_ACCENT} font-bold not-italic`;
  const andClass = 'ms-2 font-bold not-italic text-[#f8fafc] max-md:ms-1';

  if (locale !== 'ar') {
    const actIndex = title.indexOf('Activation');
    if (actIndex >= 0) {
      const before = title.slice(0, actIndex).trim();
      const rest = title.slice(actIndex + 'Activation'.length).trim();
      const andMatch = rest.match(/^(and)\s+(.*)$/i);
      return (
        <h2 id={id} className={titleClass}>
          {before ? <span className='block'>{before}</span> : null}
          <span className='block'>
            <strong className={accentClass}>Activation</strong>
            {andMatch ? <em className={andClass}>{andMatch[1]}</em> : null}
          </span>
          <span className='block'>{andMatch ? andMatch[2] : rest}</span>
        </h2>
      );
    }
  }

  const arAccent = 'التنشيط';
  const arIndex = title.indexOf(arAccent);
  if (arIndex >= 0) {
    const before = title
      .slice(0, arIndex)
      .replace(/و\s*$/, '')
      .trim();
    const after = title
      .slice(arIndex + arAccent.length)
      .replace(/^و\s*/, '')
      .trim();
    return (
      <h2 id={id} className={titleClass}>
        {before ? <span className='block'>{before}</span> : null}
        <span className='block'>
          <strong className={accentClass}>{arAccent}</strong>
          {after ? <em className={andClass}>و</em> : null}
        </span>
        {after ? <span className='block'>{after}</span> : null}
      </h2>
    );
  }

  return (
    <h2 id={id} className={titleClass}>
      {title}
    </h2>
  );
}

function MerchSkeleton() {
  return (
    <div className='w-full max-w-[620px]'>
      <div className='h-3 w-72 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-12 w-full max-w-[480px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-12 w-full max-w-[400px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-12 w-full max-w-[360px] rounded skeleton-box bg-white/20' />
      <div className='mt-5 h-5 w-full max-w-[500px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='min-h-[148px] rounded-[16px] skeleton-box bg-white/20' />
        ))}
      </div>
      <div className='mt-7 h-[53px] w-[202px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}

