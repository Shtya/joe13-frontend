'use client';

import WhyChooseUs from '@/components/pages/join-us/WhyChooseUs';
import { pickUi } from '@/helpers/cms';
import { hookJoinUs } from '@/hooks/hookJoinUs';
import { usePages } from '@/hooks/usePages';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BG = '/landing/join-us-bg.png';
const TITLE_ACCENT =
  'bg-[linear-gradient(180deg,#59d9ff_0%,#13baff_34%,#087cf0_72%,#0759df_100%)] bg-clip-text font-bold text-transparent [filter:drop-shadow(0_0_12px_rgba(0,132,255,0.2))]';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';
const ICON =
  'size-[43px] fill-none stroke-[#10b7ff] stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,163,255,0.9))_drop-shadow(0_0_13px_rgba(0,109,255,0.45))] max-[600px]:size-9';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts[0], accent: parts.slice(1).join(' ') };
}

function paragraphs(raw) {
  const text = String(raw || '').trim();
  if (!text) return [];
  return text
    .split(/\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}

function normalizePairs(raw, fallback) {
  const source = Array.isArray(raw) && raw.length ? raw : fallback;
  return (fallback || []).map((item, index) => {
    const entry = source[index];
    if (Array.isArray(entry)) return [entry[0] || item[0], entry[1] || item[1] || ''];
    if (typeof entry === 'string' && entry.trim()) {
      const parts = entry.trim().split(/\s+/);
      if (parts.length === 1) return [parts[0], item[1] || ''];
      return [parts[0], parts.slice(1).join(' ')];
    }
    return item;
  });
}

function BenefitPeople() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <circle cx='32' cy='18' r='8' />
      <circle cx='17' cy='25' r='6' />
      <circle cx='47' cy='25' r='6' />
      <path d='M19 48c0-9 5-14 13-14s13 5 13 14' />
      <path d='M5 45c0-7 4-11 10-11 4 0 7 2 9 5' />
      <path d='M59 45c0-7-4-11-10-11-4 0-7 2-9 5' />
    </svg>
  );
}

function BenefitLearn() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <path d='M32 7c-10 0-17 7-17 17 0 6 3 10 7 14v7h20v-7c4-4 7-8 7-14 0-10-7-17-17-17Z' />
      <path d='M24 51h16' />
      <path d='M26 57h12' />
      <path d='M32 17v17' />
      <path d='M25 27h14' />
    </svg>
  );
}

function BenefitGrowth() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <path d='M9 51V39h10v12H9Z' />
      <path d='M26 51V29h10v22H26Z' />
      <path d='M43 51V16h10v35H43Z' />
      <path d='M9 29l13-10 10 6 19-17' />
      <path d='M43 8h9v9' />
    </svg>
  );
}

function BenefitHeart() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <path d='M32 52S10 39 10 23c0-8 5-13 12-13 5 0 9 3 10 7 1-4 5-7 10-7 7 0 12 5 12 13 0 16-22 29-22 29Z' />
    </svg>
  );
}

const BENEFIT_ICONS = [BenefitPeople, BenefitLearn, BenefitGrowth, BenefitHeart];

export default function page({ initialData }) {
  const { loading: loadingPage, data } = usePages({ page_name: 'join-us', initialData });
  const section1 = data?.sections?.find(e => e.id == 'sec1');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const t = useTranslations('JoinUs');
  const { register, errors, trigger, setValue, submit, watch, loading } = hookJoinUs();
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);

  const title = section1?.title?.[locale] || t('joinUs');
  const { lead, accent } = splitTitle(title);
  const description = paragraphs(section1?.content?.[locale] || t('aboutJoe13th'));
  const eyebrow = pickUi(section1, locale, 'eyebrow', t('eyebrow'));
  const watermark = pickUi(section1, locale, 'watermark', t('watermark'));
  const caption = pickUi(section1, locale, 'caption') || t.raw('caption');
  const benefits = normalizePairs(pickUi(section1, locale, 'benefits'), t.raw('benefits'));

  useEffect(() => {
    if (!panelMounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [panelMounted]);

  useEffect(() => {
    if (!panelMounted) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelMounted]);

  const openPanel = () => {
    setPanelClosing(false);
    setPanelMounted(true);
  };

  const closePanel = () => {
    setPanelClosing(true);
    window.setTimeout(() => {
      setPanelMounted(false);
      setPanelClosing(false);
    }, 380);
  };

  if (loadingPage) {
    return (
      <div className={`flex h-screen flex-col items-start justify-center gap-7 px-[clamp(55px,8.15vw,157px)] ${bodyFont}`}>
        <span className='h-4 w-[220px] rounded skeleton-box' />
        <span className='h-[70px] w-[min(100%,420px)] rounded-lg skeleton-box' />
        <span className='h-5 w-full max-w-[620px] rounded skeleton-box' />
        <span className='h-5 w-4/5 max-w-[540px] rounded skeleton-box' />
        <span className='h-[62px] w-[260px] rounded-full skeleton-box' />
      </div>
    );
  }

  return (
    <>
      <section
        id='join'
        dir={isAr ? 'rtl' : 'ltr'}
        className={`relative isolate h-full min-h-screen w-full overflow-hidden bg-[#020914] text-white max-[1200px]:min-h-[680px] max-[850px]:h-auto max-[850px]:min-h-[760px] max-[600px]:min-h-[750px] ${bodyFont}`}
      >
        <div className='pointer-events-none absolute inset-0 -z-[10]'>
          <Image
            src={BG}
            alt={section1?.image?.alt || ''}
            fill
            priority
            sizes='100vw'
            className='object-cover object-center max-[600px]:object-[62%_center]'
          />
        </div>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-[5] hidden bg-[linear-gradient(90deg,rgba(1,8,17,0.48),rgba(1,8,17,0.1))] max-[600px]:block rtl:bg-[linear-gradient(270deg,rgba(1,8,17,0.48),rgba(1,8,17,0.1))]'
        />

        <div
          aria-hidden='true'
          className='pointer-events-none absolute start-[-35px] top-[3%] z-[1] flex h-[94%] items-center justify-center text-[clamp(100px,9vw,170px)] font-bold tracking-[3px] text-[rgba(22,60,94,0.18)] [text-orientation:mixed] [writing-mode:vertical-rl] max-[1200px]:opacity-60 max-[850px]:start-[-50px] max-[850px]:opacity-35 max-[600px]:start-[-67px] max-[600px]:top-[4%] max-[600px]:text-[90px] max-[600px]:opacity-30'
        >
          {watermark}
        </div>

        <div className='relative z-10 flex h-full min-h-screen items-center max-[850px]:min-h-[760px] max-[850px]:items-start max-[600px]:min-h-[750px]'>
          <div className='ms-[clamp(55px,8.15vw,157px)] w-[clamp(550px,39vw,750px)] min-[1600px]:w-[750px] max-[1200px]:ms-[7vw] max-[1200px]:w-[43vw] max-[850px]:mx-auto max-[850px]:w-[calc(100%-70px)] max-[850px]:px-0 max-[850px]:py-[100px] max-[850px]:pb-[150px] max-[600px]:w-[calc(100%-34px)] max-[600px]:py-[75px] max-[600px]:pb-[130px] max-[600px]:text-start max-[390px]:w-[calc(100%-26px)] max-[390px]:pt-[65px]'>
            <div className='mb-[19px] flex items-center gap-[34px] max-[600px]:mb-[17px] max-[600px]:gap-4'>
              <span className='block h-0.5 w-[clamp(35px,2.25vw,45px)] bg-[#16b8ff] shadow-[0_0_8px_rgba(0,164,255,0.65)] max-[600px]:w-[30px]' />
              <span
                className={`whitespace-nowrap text-[clamp(10px,0.78vw,15px)] font-medium leading-none text-[#049cf2] [text-shadow:0_0_10px_rgba(0,153,255,0.3)] max-[600px]:text-[8px] ${
                  isAr ? 'tracking-[3px]' : 'tracking-[clamp(5px,0.55vw,9px)] max-[600px]:tracking-[3px]'
                }`}
              >
                {eyebrow}
              </span>
            </div>

            {title ? (
              <h2 className='m-0 text-[clamp(68px,5.4vw,103px)] font-bold leading-[0.9] tracking-[-4px] text-[#f8faff] [text-shadow:0_4px_15px_rgba(0,0,0,0.35)] max-[600px]:text-[51px] max-[600px]:tracking-[-2px] max-[390px]:text-[45px]'>
                {lead ? `${lead} ` : ''}
                {accent ? <strong className={TITLE_ACCENT}>{accent}</strong> : null}
              </h2>
            ) : null}

            <div className='mt-[25px] w-full max-w-[690px] min-[1600px]:max-w-[720px] max-[850px]:max-w-[650px] max-[600px]:mt-5'>
              {description.map(paragraph => (
                <p
                  key={paragraph}
                  className='mb-[17px] text-[clamp(15px,1.16vw,22px)] font-normal leading-[1.43] tracking-[-0.15px] text-[rgba(247,249,253,0.96)] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] last:mb-0 max-[1200px]:text-base max-[850px]:text-[15px] max-[600px]:mb-[13px] max-[600px]:text-[13px] max-[600px]:leading-[1.65] max-[390px]:text-xs'
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <button
              type='button'
              onClick={openPanel}
              className={`${FOCUS} mt-6 flex h-[62px] w-[260px] items-center justify-between rounded-[34px] border border-[rgba(0,183,255,0.8)] bg-[linear-gradient(105deg,#13aaf7_0%,#078bf0_52%,#075ee1_100%)] py-0 ps-[34px] pe-2 text-white shadow-[0_0_10px_rgba(0,154,255,0.75),0_0_25px_rgba(0,114,255,0.38),inset_0_1px_1px_rgba(255,255,255,0.2)] transition duration-[250ms] hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(0,170,255,0.9),0_0_34px_rgba(0,114,255,0.48),inset_0_1px_1px_rgba(255,255,255,0.25)] motion-reduce:transition-none max-[1200px]:h-[58px] max-[1200px]:w-[245px] max-[600px]:mt-[21px] max-[600px]:h-[54px] max-[600px]:w-[215px] max-[600px]:ps-[25px] max-[390px]:w-[200px]`}
            >
              <span className='text-[18px] font-medium leading-none max-[600px]:text-[15px]'>{t('viewMore')}</span>
              <span className='flex size-12 items-center justify-center rounded-full border border-[rgba(123,210,255,0.35)] bg-[rgba(4,83,180,0.65)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.08)] max-[600px]:size-[42px]'>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[22px] fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180 max-[600px]:size-[19px]'>
                  <path d='M5 12h13' />
                  <path d='m13 6 6 6-6 6' />
                </svg>
              </span>
            </button>

            <div className='mt-[35px] flex w-max items-center min-[1600px]:mt-[38px] max-[850px]:w-full max-[850px]:justify-start max-[600px]:mt-7 max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-4 max-[600px]:gap-1'>
              {benefits.map((lines, index) => {
                const Icon = BENEFIT_ICONS[index] || BenefitPeople;
                return (
                  <div key={`${lines[0]}-${index}`} className='contents'>
                    {index > 0 ? (
                      <div className='mx-[13px] h-[77px] w-px bg-[linear-gradient(180deg,transparent_0%,rgba(144,187,219,0.55)_20%,rgba(144,187,219,0.55)_80%,transparent_100%)] max-[1200px]:mx-2 max-[600px]:hidden' />
                    ) : null}
                    <div className='flex min-w-[105px] flex-col items-center justify-center text-center min-[1600px]:min-w-[115px] max-[1200px]:min-w-[90px] max-[600px]:min-w-0'>
                      <div className='mb-2 flex size-[49px] items-center justify-center max-[600px]:mb-[5px] max-[600px]:h-[43px] max-[600px]:w-[39px]'>
                        <Icon />
                      </div>
                      <span className='whitespace-nowrap text-[clamp(13px,0.88vw,17px)] font-normal leading-[1.3] text-[rgba(249,251,255,0.96)] max-[600px]:whitespace-normal max-[600px]:text-[9px] max-[600px]:leading-[1.35] max-[390px]:text-[8px]'>
                        {lines[0]}
                        {lines[1] ? (
                          <>
                            <br />
                            {lines[1]}
                          </>
                        ) : null}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {Array.isArray(caption) && caption.length ? (
          <div
            className={`pointer-events-none absolute bottom-[7.1%] end-[5.1%] z-[8] flex items-center gap-[11px] whitespace-nowrap text-[clamp(8px,0.62vw,12px)] font-medium text-[rgba(214,228,241,0.82)] max-[600px]:bottom-[4%] max-[600px]:end-[4%] max-[600px]:gap-[7px] max-[600px]:text-[6px] ${
              isAr ? 'tracking-[2px]' : 'tracking-[clamp(3px,0.38vw,6px)] max-[600px]:tracking-[2px]'
            }`}
          >
            {caption.map((item, index) => (
              <span key={item} className='contents'>
                {index > 0 ? <i className='not-italic text-[#159fe8]'>•</i> : null}
                <span>{item}</span>
              </span>
            ))}
            <b className='ms-[15px] block h-px w-[clamp(40px,4vw,70px)] bg-[linear-gradient(90deg,rgba(100,190,245,0.75),transparent)] font-normal max-[600px]:ms-[7px] max-[600px]:w-[30px] rtl:bg-[linear-gradient(270deg,rgba(100,190,245,0.75),transparent)]' />
          </div>
        ) : null}
      </section>

      {panelMounted ? (
        <div className='fixed inset-0 z-[99990] flex items-end justify-center' role='dialog' aria-modal='true' aria-label={t('whyChooseTitle')}>
          <button
            type='button'
            aria-label={t('viewLess')}
            className={`absolute inset-0 bg-black/70 backdrop-blur-[3px] ${panelClosing ? 'join-backdrop-out' : 'join-backdrop-in'}`}
            onClick={closePanel}
          />
          <div
            className={`${panelClosing ? 'join-slide-down' : 'join-slide-up'} relative z-10 max-h-[min(94vh,980px)] w-[min(1480px,calc(100%-20px))] overflow-y-auto rounded-t-[26px] border border-[rgba(40,140,210,0.45)] border-b-0 bg-[linear-gradient(180deg,rgba(3,18,34,0.985),rgba(2,12,24,0.99))] px-10 pb-[max(36px,env(safe-area-inset-bottom))] pt-7 shadow-[0_-24px_70px_rgba(0,0,0,0.5)] max-[1100px]:px-7 max-[900px]:w-[calc(100%-12px)] max-[600px]:px-4 max-[600px]:pt-5`}
          >
            <div className='mx-auto mb-6 h-1.5 w-14 rounded-full bg-white/25' />
            <WhyChooseUs
              data={section1}
              register={register}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
              submit={submit}
              watch={watch}
              loading={loading}
              onViewLess={closePanel}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
