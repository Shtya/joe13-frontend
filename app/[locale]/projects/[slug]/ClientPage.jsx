'use client';

import { Link } from '@/navigation';
import { baseImage } from '@/helpers/baseUrl';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TITLE_ACCENT =
  'bg-[linear-gradient(180deg,#28b8ff,#0873ed)] bg-clip-text font-bold text-transparent';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';
const STAT_ICON =
  'size-[42px] fill-none stroke-[#08a0ff] stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_6px_rgba(0,147,255,0.7))] max-[600px]:size-8';
const GLASS_CARD =
  'absolute rounded-[15px] border border-[rgba(17,143,238,0.6)] bg-[linear-gradient(145deg,rgba(21,107,169,0.24),rgba(1,24,48,0.12))] shadow-[inset_0_0_25px_rgba(0,108,190,0.07)]';
const BG = '/landing/project-details.png';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts.slice(0, -1).join(' '), accent: parts[parts.length - 1] };
}

function descriptionParagraphs(raw) {
  const html = String(raw || '').trim();
  if (!html) return [];
  if (/<p[\s>]/i.test(html)) {
    return html
      .split(/<\/p>/i)
      .map(part => part.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  }
  const withBreaks = html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ');
  const parts = withBreaks
    .split(/\n+/)
    .map(part => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return parts.length ? parts : [withBreaks.replace(/\s+/g, ' ').trim()].filter(Boolean);
}

function CategoryIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='size-5 fill-none stroke-white stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round] max-[600px]:size-4'>
      <rect x='3' y='5' width='18' height='16' rx='2' />
      <path d='M7 3v4M17 3v4M3 10h18' />
      <path d='M8 14h2M14 14h2M8 17h2' />
    </svg>
  );
}

function IconStrategic() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={STAT_ICON}>
      <path d='M9 51V36h10v15H9Z' />
      <path d='M27 51V25h10v26H27Z' />
      <path d='M45 51V13h10v38H45Z' />
      <path d='M9 27l13-9 11 5 19-13' />
      <path d='M45 10h10v10' />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={STAT_ICON}>
      <circle cx='22' cy='20' r='7' />
      <circle cx='43' cy='20' r='7' />
      <path d='M8 48c0-9 5-14 14-14s14 5 14 14' />
      <path d='M29 48c0-9 5-14 14-14s14 5 14 14' />
    </svg>
  );
}

function IconPosition() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={STAT_ICON}>
      <path d='M8 51V39h10v12H8Z' />
      <path d='M27 51V30h10v21H27Z' />
      <path d='M46 51V20h10v31H46Z' />
      <path d='M8 31l13-10 11 6 18-17' />
      <path d='M45 10h10v10' />
    </svg>
  );
}

export default function ProjectDetails({ project }) {
  const locale = useLocale();
  const tp = useTranslations('projects');
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';

  if (!project) {
    return <ProjectDetailsSkeleton isAr={isAr} bodyFont={bodyFont} />;
  }

  const name = project.name?.[locale] || '';
  const { lead, accent } = splitTitle(name);
  const category = project.department?.name?.[locale] || '';
  const paragraphs = descriptionParagraphs(project.description?.[locale]);
  const stats = [
    { Icon: IconStrategic, lead: tp('statStrategic'), sub: tp('statPartnership') },
    { Icon: IconPeople, lead: tp('statCustomer'), sub: tp('statEngagement') },
    { Icon: IconPosition, lead: tp('statStronger'), sub: tp('statPosition') },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className={`relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-[#020a14] text-white ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <Image src={BG} alt='' fill priority sizes='100vw' className='object-cover object-center' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[9] bg-[radial-gradient(ellipse_at_80%_42%,rgba(0,102,190,0.2),transparent_40%),radial-gradient(ellipse_at_25%_100%,rgba(0,87,170,0.2),transparent_45%),linear-gradient(110deg,rgba(2,9,20,0.72)_0%,rgba(3,20,38,0.55)_52%,rgba(2,11,23,0.68)_100%)] rtl:bg-[radial-gradient(ellipse_at_20%_42%,rgba(0,102,190,0.2),transparent_40%),radial-gradient(ellipse_at_75%_100%,rgba(0,87,170,0.2),transparent_45%),linear-gradient(250deg,rgba(2,9,20,0.72)_0%,rgba(3,20,38,0.55)_52%,rgba(2,11,23,0.68)_100%)]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[400px] -end-[360px] -z-[8] size-[850px] rounded-full border border-[rgba(0,127,245,0.25)] shadow-[0_0_80px_rgba(0,111,255,0.08)] max-[600px]:size-[420px] max-[600px]:-bottom-[220px] max-[600px]:-end-[180px]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -start-[300px] -top-[250px] -z-[8] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,104,197,0.17),transparent_65%)] max-[600px]:size-[320px]'
      />

      <div className='relative z-[5] mx-auto grid w-[calc(100%-210px)] grid-cols-[minmax(470px,0.88fr)_minmax(650px,1.3fr)] items-center gap-[50px] pb-[72px] pt-[100px] min-[1700px]:w-[calc(100%-250px)] min-[1700px]:grid-cols-[minmax(520px,0.88fr)_minmax(700px,1.3fr)] min-[1700px]:gap-[70px] max-[1250px]:w-[calc(100%-100px)] max-[1250px]:grid-cols-[minmax(410px,0.9fr)_minmax(520px,1.1fr)] max-[1250px]:gap-5 max-[900px]:w-[calc(100%-50px)] max-[900px]:grid-cols-1 max-[900px]:pb-10 max-[900px]:pt-[90px] max-[600px]:w-[calc(100%-30px)] max-[600px]:pb-8 max-[600px]:pt-[80px]'>
        <div className='relative z-[5] max-[900px]:pb-0'>
          <div className={`mb-[18px] flex items-center gap-[17px] text-xs text-[#079df5] max-[600px]:mb-3.5 max-[600px]:gap-[9px] max-[600px]:text-[8px] ${isAr ? 'tracking-[3px]' : 'tracking-[5px] max-[600px]:tracking-[3px]'}`}>
            <span className='block h-px w-[62px] bg-[#079df5] max-[600px]:w-7' />
            {tp('ourPartners')}
            <i className='block h-px w-[47px] bg-[#079df5] max-[600px]:w-7' />
          </div>

          {name ? (
            <h1 className='mb-[17px] text-[clamp(62px,5vw,88px)] font-bold leading-[0.95] tracking-[-3px] max-[1250px]:text-[65px] max-[600px]:mb-3.5 max-[600px]:text-[49px] max-[600px]:tracking-[-2px]'>
              {lead ? <>{lead} </> : null}
              {accent ? <span className={TITLE_ACCENT}>{accent}</span> : null}
            </h1>
          ) : null}

          {category ? (
            <div className='mb-[18px] flex h-10 w-max items-center gap-[9px] rounded-[22px] border border-[rgba(0,145,255,0.75)] bg-[linear-gradient(90deg,rgba(0,104,187,0.22),rgba(0,117,237,0.55))] px-[17px] shadow-[0_0_12px_rgba(0,115,255,0.15)] max-[600px]:mb-3.5 max-[600px]:h-[35px] max-[600px]:px-[13px]'>
              <CategoryIcon />
              <span className='text-[15px] font-medium max-[600px]:text-xs'>{category}</span>
            </div>
          ) : null}

          {paragraphs.length ? (
            <div className='max-w-[570px]'>
              {paragraphs.map((text, index) => (
                <p key={`${index}-${text.slice(0, 24)}`} className='mb-3.5 text-base leading-[1.55] tracking-[0.15px] text-[rgba(238,244,251,0.9)] last:mb-0 max-[1250px]:text-sm max-[600px]:text-[11px]'>
                  {text}
                </p>
              ))}
            </div>
          ) : null}

          <div className='mt-[26px] flex max-w-[590px] origin-center items-center max-[1250px]:origin-start max-[1250px]:scale-[0.92] max-[600px]:mt-5 max-[600px]:w-full max-[600px]:max-w-none max-[600px]:scale-100 max-[600px]:justify-between rtl:max-[1250px]:origin-end'>
            {stats.map((stat, index) => (
              <div key={stat.lead} className='contents'>
                {index > 0 ? <div className='mx-[18px] h-[42px] w-px shrink-0 bg-[rgba(117,167,202,0.4)] max-[600px]:mx-[5px] max-[600px]:h-[30px]' /> : null}
                <div className='flex min-w-0 items-center gap-[11px] max-[600px]:gap-[5px]'>
                  <div className='flex size-[45px] items-center justify-center max-[600px]:size-[35px]'>
                    <stat.Icon />
                  </div>
                  <div className='flex flex-col leading-[1.35]'>
                    <strong className='text-[13px] font-medium max-[600px]:text-[8px]'>{stat.lead}</strong>
                    <span className='text-[13px] text-[#e6eef7] max-[600px]:text-[8px]'>{stat.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href='/contact-us'
            className={`${FOCUS} mt-8 flex h-[62px] w-[270px] items-center gap-3 rounded-[34px] bg-[linear-gradient(105deg,#119cf5,#0870eb)] ps-[30px] text-white no-underline shadow-[0_7px_25px_rgba(0,126,255,0.28)] transition duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(0,143,255,0.42)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:mt-[23px] max-[600px]:h-[52px] max-[600px]:w-[220px] max-[600px]:ps-[21px]`}
          >
            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[23px] fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
              <path d='M7 11a5 5 0 0 1 10 0' />
              <path d='M5 11v5a2 2 0 0 0 2 2h1v-6H5Z' />
              <path d='M19 11v5a2 2 0 0 1-2 2h-1v-6h3Z' />
              <path d='M16 19c0 1-2 2-4 2' />
            </svg>
            <span className='text-lg font-semibold max-[600px]:text-[15px]'>{tp('btn')}</span>
            <b className='ms-auto me-[9px] flex size-[43px] items-center justify-center rounded-full border border-white/40 bg-[rgba(2,49,104,0.35)] max-[600px]:size-[37px]'>
              <svg viewBox='0 0 24 24' aria-hidden='true' className='size-5 fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
                <path d='M5 12h13' />
                <path d='m13 6 6 6-6 6' />
              </svg>
            </b>
          </Link>
        </div>

        <Gallery project={project} name={name} tp={tp} />
      </div>

      <div className={`absolute inset-x-[6%] bottom-[30px] z-[6] flex items-center justify-between text-[9px] text-[#0b80bd] max-[900px]:relative max-[900px]:inset-auto max-[900px]:bottom-auto max-[900px]:mx-auto max-[900px]:mb-[25px] max-[900px]:mt-[35px] max-[900px]:w-[calc(100%-50px)] max-[600px]:mt-[5px] max-[600px]:w-[calc(100%-30px)] max-[600px]:text-[6px] ${isAr ? 'tracking-[2px]' : 'tracking-[4px] max-[600px]:tracking-[2px]'}`}>
        <div className='flex items-center gap-2.5'>
          {tp('trustedPartners')}
          <span className='text-[#147eaf]'>{tp('realImpact')}</span>
          <i className='ms-[5px] block h-px w-[60px] bg-[#168cc8]' />
        </div>
        <div className='flex items-center gap-2.5 max-[600px]:hidden'>
          {tp('people')}
          <b className='text-[10px] text-[#078ee0]'>•</b>
          {tp('ideas')}
          <b className='text-[10px] text-[#078ee0]'>•</b>
          {tp('growth')}
          <i className='ms-2 block h-px w-[60px] bg-[#168cc8]' />
        </div>
      </div>
    </section>
  );
}

function ProjectDetailsSkeleton({ isAr, bodyFont }) {
  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className={`relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-[#020a14] text-white ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <Image src={BG} alt='' fill priority sizes='100vw' className='object-cover object-center' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[9] bg-[linear-gradient(110deg,rgba(2,9,20,0.72)_0%,rgba(3,20,38,0.55)_52%,rgba(2,11,23,0.68)_100%)]'
      />
      <div className='relative z-[5] mx-auto grid w-[calc(100%-210px)] grid-cols-2 items-center gap-[50px] pb-[72px] pt-[100px] max-[900px]:w-[calc(100%-50px)] max-[900px]:grid-cols-1 max-[900px]:pb-10 max-[900px]:pt-[90px] max-[600px]:w-[calc(100%-30px)] max-[600px]:pb-8 max-[600px]:pt-[80px]'>
        <div className='flex flex-col gap-4'>
          <div className='h-4 w-[180px] rounded skeleton-box' />
          <div className='h-[70px] w-[70%] rounded-lg skeleton-box' />
          <div className='h-10 w-[180px] rounded-full skeleton-box' />
          <div className='h-20 w-[80%] rounded-md skeleton-box' />
          <div className='h-[62px] w-[270px] rounded-[34px] skeleton-box' />
        </div>
        <div className='relative h-[590px] max-[900px]:h-[480px] max-[600px]:h-[360px]'>
          <div className='absolute inset-x-[7%] inset-y-[30px] rounded-[17px] skeleton-box' />
        </div>
      </div>
    </section>
  );
}

function projectImages(project) {
  if (project?.images?.length) return project.images;
  if (project?.image_url) return [{ url: project.image_url, alt: project.image_alt, id: 'cover' }];
  return [];
}

function Gallery({ project, name, tp }) {
  const [images, setImages] = useState(() => projectImages(project));
  const [isPlaying, setIsPlaying] = useState(true);
  const [popupImage, setPopupImage] = useState(null);

  useEffect(() => {
    setImages(projectImages(project));
  }, [project]);

  useEffect(() => {
    if (!isPlaying || images.length < 2) return;

    const interval = setInterval(() => {
      setImages(prevImages => {
        if (prevImages.length < 2) return prevImages;
        const [first, ...rest] = prevImages;
        return [...rest, first];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const current = images[0];

  return (
    <div className='relative flex h-[590px] items-center justify-center min-[1700px]:h-[610px] max-[1250px]:h-[530px] max-[900px]:mt-[15px] max-[900px]:h-[480px] max-[600px]:h-[360px]'>
      <div className={`${GLASS_CARD} start-[8%] top-0 h-[565px] w-[215px] opacity-55 min-[1700px]:h-[585px] max-[1250px]:h-[500px] max-[600px]:start-0 max-[600px]:h-[330px] max-[600px]:w-[110px]`} />
      <div className={`${GLASS_CARD} end-[15%] top-0 h-[145px] w-[210px] opacity-65 max-[600px]:end-0 max-[600px]:h-[90px] max-[600px]:w-[130px]`} />
      <div className={`${GLASS_CARD} -bottom-2.5 end-[18%] h-[510px] w-[230px] opacity-42 max-[600px]:end-[3%] max-[600px]:h-[280px] max-[600px]:w-[130px]`} />

      <div className='relative z-[5] h-[525px] w-[86%] overflow-hidden rounded-[17px] border-2 border-[rgba(113,198,255,0.75)] bg-[#02101f] shadow-[0_0_0_1px_rgba(0,98,176,0.25),0_0_25px_rgba(0,128,255,0.22),inset_0_0_35px_rgba(0,135,255,0.1)] min-[1700px]:h-[535px] min-[1700px]:w-[87%] max-[1250px]:h-[475px] max-[1250px]:w-[90%] max-[900px]:h-[440px] max-[900px]:w-[82%] max-[600px]:h-[325px] max-[600px]:w-[91%] max-[600px]:rounded-xl'>
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 z-[3] rounded-[inherit] shadow-[inset_0_0_35px_rgba(0,143,255,0.18)]' />

        {current?.url ? (
          <Image
            src={baseImage(current.url)}
            alt={current.alt || name || ''}
            fill
            priority
            sizes='(max-width: 900px) 90vw, 50vw'
            className='scale-[1.015] object-cover object-center brightness-[0.68] contrast-[1.04] saturate-[0.9]'
          />
        ) : (
          <div className='flex size-full items-center justify-center text-white/60'>{tp('noImages')}</div>
        )}

        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(90deg,rgba(0,16,31,0.3),transparent_35%,rgba(0,8,18,0.25)),linear-gradient(180deg,rgba(0,16,32,0.08),rgba(0,10,20,0.28))] rtl:bg-[linear-gradient(270deg,rgba(0,16,31,0.3),transparent_35%,rgba(0,8,18,0.25)),linear-gradient(180deg,rgba(0,16,32,0.08),rgba(0,10,20,0.28))]'
        />

        {current?.url ? (
          <button
            type='button'
            onClick={() => setPopupImage(current)}
            aria-label={tp('expandImage')}
            className={`${FOCUS} absolute end-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/30 bg-[rgba(2,49,104,0.55)] text-white transition hover:bg-[rgba(2,49,104,0.8)]`}
          >
            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
              <path d='M15 3h6v6' />
              <path d='M9 21H3v-6' />
              <path d='M21 3l-7 7' />
              <path d='M3 21l7-7' />
            </svg>
          </button>
        ) : null}

        {images.length > 1 ? (
          <button
            type='button'
            onClick={() => setIsPlaying(playing => !playing)}
            aria-label={isPlaying ? tp('pauseGallery') : tp('playGallery')}
            className={`${FOCUS} absolute bottom-3 left-1/2 z-10 flex size-[44px] -translate-x-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black`}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
        ) : null}
      </div>

      <AnimatePresence mode='wait'>
        {popupImage ? (
          <motion.div
            className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-[7px]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopupImage(null)}
          >
            <motion.div
              className='relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[20px] bg-[#ceced0]'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={baseImage(popupImage.url)}
                alt={popupImage.alt || name || ''}
                width={1200}
                height={800}
                className='h-[80vh] w-full object-contain'
              />
              <button
                type='button'
                onClick={() => setPopupImage(null)}
                aria-label={tp('closeImage')}
                className={`${FOCUS} absolute end-2 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-[linear-gradient(105deg,#119cf5,#0870eb)] text-white`}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
