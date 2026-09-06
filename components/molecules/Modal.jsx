'use client';

import { useValues } from '@/app/context';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

export function getModalItems(data, locale) {
  if (!data) return [];

  const list = data.list?.[locale];
  if (Array.isArray(list) && list.length > 0) {
    return list.filter(Boolean).map(label => ({ label: String(label).trim() }));
  }

  const objectData = data.objectData?.[locale];
  if (objectData && typeof objectData === 'object') {
    const entries = Object.entries(objectData).filter(([key]) => !String(key).startsWith('_'));
    if (entries.length > 0) {
      return entries.map(([label, desc]) => ({ label, desc }));
    }
  }

  const listObject = data.list_Object?.[locale];
  if (Array.isArray(listObject) && listObject.length > 0) {
    const items = [];
    listObject.forEach(entry => {
      if (entry?.title) items.push({ label: entry.title, desc: entry.desc });
      entry?.list?.forEach(sub => {
        if (sub) items.push({ label: String(sub).trim() });
      });
    });
    return items;
  }

  return [];
}

const Modal = ({ isOpen, onClose, children, title, description, items = [] }) => {
  const { isModalOpen, setModalOpen } = useValues();
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add('modal-body');
      setModalOpen(false);
    } else {
      body.classList.remove('modal-body');
      setModalOpen(true);
    }

    return () => {
      body.classList.remove('modal-body');
    };
  }, [isOpen, setModalOpen]);

  useEffect(() => {
    if (isModalOpen) onClose();
  }, [isModalOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const swiper = document.querySelector('.mySwiper')?.swiper;
    if (!swiper) return undefined;

    swiper.allowTouchMove = false;
    swiper.allowSlideNext = false;
    swiper.allowSlidePrev = false;
    swiper.autoplay?.stop();
    swiper.mousewheel?.disable();

    const closeOnSlide = () => onClose();
    swiper.on('slideChange', closeOnSlide);

    return () => {
      swiper.off('slideChange', closeOnSlide);
      swiper.allowTouchMove = true;
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      const paused = swiper.el?.classList.contains('is-user-paused');
      if (!paused && !swiper.isEnd) swiper.autoplay?.start();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000000000000] flex items-center justify-center p-3 max-[900px]:p-5 max-[700px]:p-3 ${
        isOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
      } transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none`}
      role='dialog'
      aria-modal='true'
      aria-hidden={!isOpen}
      aria-label={title || t('Hero.ourServices')}
      aria-labelledby={title ? titleId : undefined}
    >
      <div
        aria-hidden='true'
        onClick={onClose}
        className='absolute inset-0 bg-[rgba(0,4,10,0.47)] backdrop-blur-[8px]'
      />

      <div
        className={`relative z-[2] h-[calc(100vh-24px)] w-[calc(100vw-24px)] min-[701px]:h-[calc(100vh-40px)] min-[701px]:w-[calc(100vw-40px)] min-[901px]:h-[min(816px,calc(100vh-105px))] min-[901px]:min-h-[650px] min-[901px]:w-[min(1265px,calc(100vw-70px))] min-[1201px]:w-[min(1265px,calc(100vw-130px))] ${
          isOpen ? 'animate-services-modal-enter' : 'translate-y-[15px] scale-[0.985]'
        } motion-reduce:animate-none`}
      >
        <button
          type='button'
          onClick={onClose}
          aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
          className='absolute end-[-8px] top-[-8px] z-30 flex size-[56px] items-center justify-center rounded-full border-2 border-[#2ab7f6] bg-[radial-gradient(circle_at_38%_32%,rgba(28,92,160,0.98),rgba(3,18,36,0.98)_72%)] shadow-[0_0_0_3px_rgba(4,16,30,0.55),0_0_22px_rgba(20,170,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.22)] transition duration-[250ms] hover:rotate-90 hover:scale-110 hover:border-[#7ae0ff] hover:shadow-[0_0_0_3px_rgba(4,16,30,0.55),0_0_28px_rgba(40,190,255,0.75),inset_0_1px_2px_rgba(255,255,255,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ae0ff] motion-reduce:transition-none motion-reduce:hover:rotate-0 max-[900px]:size-[48px] max-[700px]:end-2 max-[700px]:top-2 max-[700px]:size-[44px]'
        >
          <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[22px] fill-none stroke-white stroke-[2.6] [stroke-linecap:round] [filter:drop-shadow(0_0_5px_rgba(90,200,255,0.7))] max-[900px]:size-[19px] max-[700px]:size-[17px]'>
            <path d='M6 6l12 12' />
            <path d='M18 6L6 18' />
          </svg>
        </button>

        <div className='flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-[rgba(39,128,195,0.75)] bg-[linear-gradient(118deg,rgba(5,25,42,0.97)_0%,rgba(7,24,39,0.965)_43%,rgba(16,27,35,0.96)_100%)] shadow-[0_25px_70px_rgba(0,0,0,0.58),0_0_35px_rgba(0,90,170,0.13),inset_0_1px_1px_rgba(130,201,246,0.13)] min-[701px]:grid min-[701px]:grid-cols-[300px_1fr] min-[701px]:rounded-[22px] min-[901px]:grid-cols-[360px_1fr] min-[901px]:rounded-[27px] min-[1201px]:grid-cols-[440px_1fr]'>
          <aside className='relative isolate h-full overflow-hidden border-e border-[rgba(51,115,161,0.18)] bg-[linear-gradient(145deg,rgba(9,39,65,0.54),rgba(5,23,39,0.27)_50%,rgba(3,17,29,0.14))] px-[42px] pb-9 ps-[57px] pt-[73px] before:pointer-events-none before:absolute before:start-[-210px] before:top-[-130px] before:size-[470px] before:rotate-[22deg] before:rounded-full before:border before:border-[rgba(21,128,218,0.25)] after:pointer-events-none after:absolute after:bottom-[-300px] after:start-[-225px] after:size-[500px] after:-rotate-[20deg] after:rounded-full after:border after:border-[rgba(20,123,214,0.23)] after:shadow-[0_0_30px_rgba(0,111,215,0.05)] max-[1200px]:px-6 max-[1200px]:ps-[38px] max-[900px]:px-[22px] max-[900px]:pb-5 max-[900px]:ps-[30px] max-[900px]:pt-[45px] max-[700px]:hidden'>
          <div className='relative z-10 mb-6 flex items-center gap-6 max-[900px]:mb-[13px] max-[900px]:gap-3.5'>
            <span
              className={`whitespace-nowrap text-[#12a8ef] ${
                isAr
                  ? 'font-cairo text-[11px] font-medium tracking-[2px] max-[900px]:text-[10px] max-[700px]:text-[8px]'
                  : 'font-inter text-[13px] font-medium tracking-[5.5px] max-[900px]:text-[10px] max-[900px]:tracking-[3.5px] max-[700px]:text-[8px] max-[700px]:tracking-[3px]'
              }`}
            >
              {t('Hero.ourServices')}
            </span>
            <i className='block h-px w-[73px] bg-[linear-gradient(90deg,#22b3f1,rgba(28,155,224,0.15))] max-[900px]:w-[45px] max-[700px]:w-10 rtl:bg-[linear-gradient(90deg,rgba(28,155,224,0.15),#22b3f1)]' />
          </div>

          <h2
            id={titleId}
            className={`${bodyFont} relative z-10 m-0 text-[58px] font-bold leading-[1.02] tracking-[-2.9px] text-[#f7f9fc] max-[1200px]:text-[47px] max-[900px]:text-[38px]`}
          >
            {t('Hero.fullService')}
            <br />
            {title ? (
              <strong className={`${TITLE_ACCENT} font-bold`}>
                {title}
              </strong>
            ) : null}
            {title ? <br /> : null}
            {t('Hero.solutions')}
          </h2>

          {description ? (
            <p className={`${bodyFont} relative z-10 mt-[25px] text-[19px] font-normal leading-[1.55] tracking-[-0.3px] text-[rgba(215,228,241,0.77)] max-[1200px]:text-base max-[900px]:text-sm max-[700px]:mt-3 max-[700px]:text-xs max-[700px]:leading-[1.4] max-[390px]:text-[11px]`}>
              {description}
            </p>
          ) : null}

          <ModalIllustration />

          <div className='pointer-events-none absolute bottom-10 start-[105px] z-10 -rotate-[7deg] font-serif text-[33px] italic leading-[0.8] text-[rgba(159,209,250,0.9)] [text-shadow:0_0_5px_rgba(26,143,233,0.25)] max-[900px]:bottom-[27px] max-[900px]:start-[65px] max-[900px]:text-[27px] max-[700px]:bottom-[7px] max-[700px]:start-[72px] max-[700px]:text-[22px] max-[390px]:bottom-[5px] max-[390px]:start-[63px] max-[390px]:text-[19px] rtl:rotate-[7deg]'>
            {t('Hero.ideasThatGrow')}
            <br />
            <span className='ms-3.5'>{t('Hero.thatGrow')}</span>
          </div>
          </aside>

          <div
          role='list'
          className='grid h-full grid-cols-2 content-center gap-x-[27px] gap-y-2 overflow-y-auto overflow-x-hidden px-[39px] py-[58px] pe-[39px] ps-[35px] max-[1200px]:px-7 max-[1200px]:ps-[25px] max-[900px]:gap-x-3 max-[900px]:gap-y-1.5 max-[900px]:px-5 max-[900px]:py-10 max-[700px]:h-full max-[700px]:flex-1 max-[700px]:content-start max-[700px]:gap-2 max-[700px]:px-3 max-[700px]:py-12 max-[700px]:pb-5 max-[390px]:gap-1.5 [scrollbar-color:rgba(21,139,219,0.5)_transparent] [scrollbar-width:thin]'
        >
          {items.length > 0
            ? items.map((item, index) => {
                const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
                return (
                  <div
                    key={`${item.label}-${index}`}
                    role='listitem'
                    className={`${bodyFont} group relative flex min-h-[82px] min-w-0 items-center overflow-hidden rounded-2xl border border-[rgba(78,110,137,0.34)] bg-[linear-gradient(105deg,rgba(26,39,51,0.82),rgba(17,30,42,0.76))] px-[15px] py-[9px] ps-[13px] text-[#f3f7fb] shadow-[inset_0_1px_1px_rgba(255,255,255,0.045),0_5px_13px_rgba(0,0,0,0.12)] transition duration-[250ms] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(110deg,rgba(24,151,232,0.07),transparent_38%)] hover:translate-x-[3px] hover:border-[rgba(26,158,235,0.68)] hover:bg-[linear-gradient(105deg,rgba(23,49,70,0.9),rgba(15,33,48,0.84))] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.07),0_0_17px_rgba(0,125,220,0.11)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 rtl:hover:-translate-x-[3px] max-[1200px]:min-h-[74px] max-[900px]:min-h-[67px] max-[900px]:rounded-xl max-[700px]:min-h-[92px] max-[700px]:flex-col max-[700px]:items-center max-[700px]:justify-center max-[700px]:gap-1.5 max-[700px]:px-2 max-[700px]:py-2.5 max-[700px]:text-center max-[390px]:min-h-[84px] max-[390px]:ps-2`}
                  >
                    <span className='relative z-[2] flex size-[61px] shrink-0 items-center justify-center rounded-[13px] border border-[rgba(11,166,246,0.76)] bg-[linear-gradient(145deg,rgba(10,89,151,0.88),rgba(3,45,81,0.9))] shadow-[inset_0_1px_2px_rgba(255,255,255,0.16),0_0_11px_rgba(0,137,226,0.14)] max-[1200px]:size-[54px] max-[900px]:size-[46px] max-[900px]:rounded-[10px] max-[700px]:size-10 max-[390px]:size-9'>
                      <Icon />
                    </span>
                    <span className='relative z-[2] min-w-0 ms-[25px] pe-[30px] text-[17px] font-normal leading-[1.25] tracking-[-0.25px] text-[#edf2f8] max-[1200px]:ms-[17px] max-[1200px]:text-[15px] max-[900px]:ms-3 max-[900px]:text-xs max-[700px]:ms-0 max-[700px]:pe-0 max-[700px]:text-[11px] max-[390px]:text-[10px]'>
                      <span className='block'>{item.label}</span>
                      {item.desc ? <span className='mt-0.5 block text-[13px] leading-snug text-[rgba(215,228,241,0.65)] max-[900px]:text-[11px]'>{item.desc}</span> : null}
                    </span>
                    <span className='absolute end-[18px] top-1/2 z-[2] -translate-y-1/2 font-sans text-[26px] font-light leading-none text-[#a9d2f4] transition duration-[250ms] group-hover:translate-x-1 group-hover:text-[#2ab7f6] motion-reduce:transition-none rtl:rotate-180 rtl:group-hover:-translate-x-1 max-[900px]:end-3 max-[900px]:text-[21px] max-[700px]:hidden'>
                      →
                    </span>
                  </div>
                );
              })
            : children || null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

function iconClass() {
  return 'size-[35px] fill-none stroke-[#bfe7ff] stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_4px_rgba(38,164,241,0.38))] max-[1200px]:size-[31px] max-[900px]:size-[27px] max-[390px]:size-[25px]';
}

function IconMegaphone() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <path d='M7 21h9l18-9v24l-18-9H7z' />
      <path d='M16 27v10' />
      <path d='M35 17c3 2.3 4.5 4.8 4.5 8s-1.5 5.7-4.5 8' />
    </svg>
  );
}

function IconPrint() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='9' y='15' width='30' height='20' rx='2' />
      <path d='M14 15v-5h20v5' />
      <path d='M15 35v5h18v-5' />
      <path d='M14 24h20' />
    </svg>
  );
}

function IconPlacement() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <path d='M24 7L38 15v18L24 41 10 33V15z' />
      <path d='M10 15l14 8 14-8' />
      <path d='M24 23v18' />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='7' y='9' width='34' height='24' rx='2' />
      <path d='M18 39h12' />
      <path d='M24 33v6' />
    </svg>
  );
}

function IconSocial() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='8' y='8' width='32' height='32' rx='8' />
      <circle cx='24' cy='24' r='8' />
      <circle cx='34' cy='14' r='2' />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <circle cx='21' cy='21' r='12' />
      <path d='M30 30l10 10' />
    </svg>
  );
}

function IconContent() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <path d='M9 10h22v28H9z' />
      <path d='M15 17h10M15 23h10' />
      <path d='M28 31l9-9' />
      <path d='M32 19h6v6' />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='7' y='11' width='34' height='26' rx='4' />
      <path d='M20 17l12 7-12 7z' />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <path d='M24 6l5.2 10.5L41 18l-8.5 8.3L34.5 38 24 32.5 13.5 38l2-11.7L7 18l11.8-1.5z' />
    </svg>
  );
}

function IconImage() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='7' y='8' width='34' height='32' rx='3' />
      <circle cx='17' cy='18' r='3' />
      <path d='M10 35l10-10 7 7 5-5 6 8' />
    </svg>
  );
}

function IconMotion() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <rect x='8' y='7' width='32' height='34' rx='4' />
      <path d='M18 18l12 8-12 8z' />
      <path d='M34 11v5' />
      <path d='M31.5 13.5h5' />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <circle cx='24' cy='24' r='15' />
      <circle cx='24' cy='24' r='6' />
      <path d='M24 24l12-12' />
      <path d='M32 12h5v5' />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <circle cx='18' cy='17' r='6' />
      <circle cx='31' cy='18' r='5' />
      <path d='M7 38c0-7 4.5-11 11-11s11 4 11 11' />
      <path d='M28 29c1.5-2 3.5-3 6-3 4.2 0 7 3 7 8' />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <circle cx='24' cy='17' r='7' />
      <path d='M10 40c0-8 5.8-12 14-12s14 4 14 12' />
      <circle cx='24' cy='17' r='3' />
    </svg>
  );
}

function IconNetwork() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={iconClass()}>
      <circle cx='10' cy='24' r='5' />
      <circle cx='38' cy='12' r='5' />
      <circle cx='38' cy='36' r='5' />
      <path d='M14.5 22l18.5-8' />
      <path d='M14.5 26l18.5 8' />
    </svg>
  );
}

const SERVICE_ICONS = [
  IconMegaphone,
  IconPrint,
  IconPlacement,
  IconMonitor,
  IconSocial,
  IconSearch,
  IconContent,
  IconPlay,
  IconStar,
  IconImage,
  IconMotion,
  IconTarget,
  IconPeople,
  IconUser,
  IconMegaphone,
  IconNetwork,
];

function ModalIllustration() {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(420px,68%)] w-full max-[900px]:h-[min(280px,58%)] max-[700px]:h-[170px]'
    >
      <Image
        src='/landing/icon-popup.png'
        alt=''
        fill
        sizes='(min-width: 1201px) 440px, (min-width: 901px) 360px, (min-width: 701px) 300px, 100vw'
        className='object-contain object-left-bottom mix-blend-screen rtl:object-right-bottom'
      />
    </div>
  );
}

export default Modal;
