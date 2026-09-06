'use client';

import { baseImage } from '@/helpers/baseUrl';
import { useBlog } from '@/hooks/useBlog';
import { Link } from '@/navigation';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const BG = '/landing/blog-details-hero.png';
const TITLE_ACCENT =
  'inline-block bg-[linear-gradient(90deg,#008cf2,#13c1ed)] bg-clip-text font-extrabold text-transparent';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';
const FEATURE_ICON =
  'size-[37px] fill-none stroke-[#0b9df7] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,145,255,0.8))] max-[1150px]:size-[29px] max-[760px]:size-7';
const SERVICE_ICON =
  'size-[38px] fill-none stroke-[#079bf5] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,148,255,0.7))]';
const META_ICON = 'size-[31px] shrink-0 fill-none stroke-[#079cf5] stroke-2 max-[760px]:size-[25px]';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  if (parts.length === 2) return { lead: parts[0], accent: parts[1] };
  return { lead: parts.slice(0, -2).join(' '), accent: parts.slice(-2).join(' ') };
}

function plainText(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptOf(html, wordCount = 42) {
  const words = plainText(html).split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const slice = words.slice(0, wordCount).join(' ');
  return words.length > wordCount ? `${slice}...` : slice;
}

function formatDate(value, locale) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale === 'ar' ? 'ar' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function IconPeople() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={FEATURE_ICON}>
      <circle cx='24' cy='14' r='6' />
      <circle cx='11' cy='20' r='4' />
      <circle cx='37' cy='20' r='4' />
      <path d='M14 38c0-7 4-11 10-11s10 4 10 11' />
      <path d='M3 37c0-5 3-8 8-8' />
      <path d='M45 37c0-5-3-8-8-8' />
    </svg>
  );
}

function IconBars() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={FEATURE_ICON}>
      <path d='M8 39V25' />
      <path d='M20 39V17' />
      <path d='M32 39V9' />
      <path d='M4 39h36' />
      <path d='m30 13 7-7' />
      <path d='M29 6h8v8' />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={FEATURE_ICON}>
      <circle cx='24' cy='24' r='7' />
      <path d='M24 5v7M24 36v7M5 24h7M36 24h7' />
      <path d='m10.5 10.5 5 5M32.5 32.5 37.5 37.5M37.5 10.5l-5 5M15.5 32.5l-5 5' />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={FEATURE_ICON}>
      <path d='M8 23c4-7 10-10 16-10' />
      <path d='M40 23c-4-7-10-10-16-10' />
      <path d='M18 28 8 18' />
      <path d='m30 28 10-10' />
      <path d='m17 31 5 5 14-14' />
    </svg>
  );
}

const FEATURE_ICONS = [IconPeople, IconBars, IconTarget, IconCheck];

function ServicePeople() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={SERVICE_ICON}>
      <circle cx='24' cy='13' r='5' />
      <circle cx='12' cy='18' r='4' />
      <circle cx='36' cy='18' r='4' />
      <path d='M14 38c0-7 4-11 10-11s10 4 10 11' />
      <path d='M3 37c0-5 3-8 8-8' />
      <path d='M45 37c0-5-3-8-8-8' />
    </svg>
  );
}

function ServiceBars() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={SERVICE_ICON}>
      <path d='M8 39V25M20 39V17M32 39V9M4 39h40' />
    </svg>
  );
}

function ServiceTeam() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={SERVICE_ICON}>
      <circle cx='24' cy='13' r='5' />
      <circle cx='12' cy='19' r='4' />
      <circle cx='36' cy='19' r='4' />
      <path d='M14 39c0-7 4-11 10-11s10 4 10 11' />
    </svg>
  );
}

function ServiceGrowth() {
  return (
    <svg viewBox='0 0 48 48' aria-hidden='true' className={SERVICE_ICON}>
      <path d='M8 38V28M19 38V21M30 38V14' />
      <path d='m28 15 8-8' />
      <path d='M29 7h7v7' />
      <path d='M5 40h37' />
    </svg>
  );
}

const SERVICE_ICONS = [ServicePeople, ServiceBars, ServiceTeam, ServiceGrowth];

function UserDot({ className }) {
  return (
    <div className={`absolute z-[6] flex size-[59px] items-center justify-center rounded-full border border-[rgba(23,155,249,0.65)] bg-[rgba(3,24,43,0.8)] shadow-[0_0_18px_rgba(0,132,255,0.3)] ${className}`}>
      <span className='relative size-5 rounded-full bg-[#f2f8ff] shadow-[0_0_12px_rgba(255,255,255,0.8)] after:absolute after:-start-[7px] after:top-[17px] after:h-[22px] after:w-[34px] after:rounded-[18px_18px_8px_8px] after:bg-[#edf5fb] after:content-[""]' />
    </div>
  );
}

export default function ProjectDetails({ initialData }) {
  const { slug } = useParams();
  const { blog, loading } = useBlog({ slug_name: slug, initialData });
  const locale = useLocale();
  const t = useTranslations();
  const tb = useTranslations('Blogs');
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';

  if (loading) return <BlogSkeleton isAr={isAr} bodyFont={bodyFont} />;
  if (!blog) notFound();

  const title = blog.title?.[locale] || '';
  const { lead, accent } = splitTitle(title);
  const excerpt = excerptOf(blog.content?.[locale]);
  const tagline = tb('tagline');
  const dateLabel = formatDate(blog.published_at || blog.created_at, locale);
  const department = blog.department?.name?.[locale] || '';
  const views = Number(blog.views_count || 0).toLocaleString(locale === 'ar' ? 'ar' : 'en-US');
  const fallbackFeatures = tb.raw('detailFeatures') || [];
  const features = (blog.tags?.length ? blog.tags.slice(0, 4).map(tag => [tag, '']) : fallbackFeatures).slice(0, 4);
  const services = tb.raw('detailServices') || [];
  const scriptLines = tb('script').split('\n');
  const quoteLines = tb('quote').split('\n');

  return (
    <div className={`bg-[#020b15] text-white ${bodyFont}`}>
      <section dir={isAr ? 'rtl' : 'ltr'} className='relative isolate min-h-screen overflow-hidden bg-[#020b15] max-[760px]:min-h-0 max-[760px]:pb-[70px]'>
        <div className='pointer-events-none absolute inset-0 z-0'>
          <Image src={BG} alt={blog.image_alt || title || ''} fill priority sizes='100vw' className='object-cover object-center' />
        </div>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(1,9,17,0.94)_0%,rgba(1,12,22,0.8)_31%,rgba(2,17,30,0.25)_62%,rgba(1,9,17,0.15)_100%)] rtl:bg-[linear-gradient(270deg,rgba(1,9,17,0.94)_0%,rgba(1,12,22,0.8)_31%,rgba(2,17,30,0.25)_62%,rgba(1,9,17,0.15)_100%)] max-[760px]:bg-[linear-gradient(180deg,rgba(1,9,17,0.92)_0%,rgba(1,12,22,0.86)_58%,rgba(1,9,17,0.8)_100%)]'
        />

        <div className='relative z-[5] mx-auto grid min-h-[calc(100vh-100px)] w-[90%] max-w-[1500px] grid-cols-[47%_53%] items-center pt-[100px] max-[1150px]:w-[94%] max-[1150px]:grid-cols-[52%_48%] max-[760px]:mt-[25px] max-[760px]:flex max-[760px]:min-h-0 max-[760px]:w-[calc(100%-30px)] max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:pt-[75px]'>
          <div className='relative z-[8] pb-[50px] max-[760px]:pb-0'>
            <div className={`mb-[17px] flex items-center gap-5 text-[11px] text-[#059cf3] max-[760px]:gap-2 max-[760px]:text-[8px] ${isAr ? 'tracking-[3px]' : 'tracking-[6px] max-[760px]:tracking-[3px]'}`}>
              <span className='block h-0.5 w-[50px] bg-[#079bf1] max-[760px]:w-[25px]' />
              {tb('detailEyebrow')}
              <i className='block h-0.5 w-[38px] bg-[#079bf1] max-[760px]:w-[25px]' />
            </div>

            {title ? (
              <h1 className='m-0 max-w-[620px] text-[clamp(36px,3.6vw,54px)] font-extrabold leading-[1.12] tracking-[-1.2px] max-[1150px]:max-w-[520px] max-[1150px]:text-[clamp(32px,4vw,44px)] max-[760px]:text-[clamp(28px,8vw,38px)] max-[760px]:tracking-[-0.8px]'>
                {lead ? <span className='me-[0.35em]'>{lead}</span> : null}
                {accent ? <strong className={TITLE_ACCENT}>{accent}</strong> : null}
              </h1>
            ) : null}

            {tagline ? <h2 className='mb-3 mt-[13px] text-[22px] font-bold leading-[1.25] max-[760px]:mt-3 max-[760px]:text-lg'>{tagline}</h2> : null}

            {excerpt ? (
              <p className='m-0 max-w-[570px] text-base leading-[1.65] text-[rgba(245,249,253,0.88)] max-[1150px]:text-sm max-[760px]:text-xs max-[760px]:leading-[1.55]'>
                {excerpt}
              </p>
            ) : null}

            {features.length ? (
              <div className='mt-[26px] flex flex-wrap items-start gap-x-6 gap-y-5 max-[1150px]:gap-x-4 max-[760px]:mt-5 max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-4'>
                {features.map((item, index) => {
                  const Icon = FEATURE_ICONS[index] || IconPeople;
                  const [line1, line2] = Array.isArray(item) ? item : [item, ''];
                  const label = [line1, line2].filter(Boolean).join(' ');
                  return (
                    <div key={`${label}-${index}`} className='flex w-[110px] flex-col items-center text-center max-[1150px]:w-[96px] max-[760px]:w-auto'>
                      <div className='flex size-[58px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(0,146,241,0.5)] bg-[linear-gradient(145deg,rgba(8,47,79,0.9),rgba(4,21,37,0.9))] shadow-[inset_0_0_15px_rgba(0,123,225,0.15)] max-[1150px]:size-[50px] max-[760px]:size-[46px]'>
                        <Icon />
                      </div>
                      <span className='mt-2.5 text-[12px] font-medium leading-[1.35] text-[#e8f2fa] max-[1150px]:text-[11px] max-[760px]:text-[10px]'>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            <Link
              href='/contact-us'
              className={`${FOCUS} mt-[25px] flex h-[57px] w-[295px] items-center rounded-[30px] bg-[linear-gradient(100deg,#10a9f8,#0872ec)] ps-[31px] text-white no-underline shadow-[0_8px_30px_rgba(0,139,255,0.35)] transition duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_12px_38px_rgba(0,139,255,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[760px]:mt-5 max-[760px]:h-[52px] max-[760px]:w-[235px] max-[760px]:ps-[23px]`}
            >
              <span className='text-[17px] font-medium max-[760px]:text-sm'>{tb('contactTeam')}</span>
              <b className='ms-auto me-[7px] flex size-[42px] items-center justify-center rounded-full border border-white/25 bg-[rgba(0,56,127,0.4)] max-[760px]:size-[38px]'>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='size-5 fill-none stroke-white stroke-2 rtl:rotate-180'>
                  <path d='M5 12h13' />
                  <path d='m13 6 6 6-6 6' />
                </svg>
              </b>
            </Link>

            <div className='mt-[35px] flex items-center max-[760px]:mt-[25px] max-[760px]:flex-wrap max-[760px]:gap-[15px]'>
              <div className='flex min-h-[46px] items-center gap-[11px] border-e border-[rgba(105,147,181,0.35)] pe-[23px] max-[760px]:min-h-[38px] max-[760px]:pe-3'>
                <svg viewBox='0 0 48 48' aria-hidden='true' className={META_ICON}>
                  <path d='M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z' />
                  <circle cx='24' cy='24' r='5' />
                </svg>
                <div className='flex flex-col'>
                  <strong className='text-[13px] font-semibold max-[760px]:text-[10px]'>{views}</strong>
                  <span className='mt-0.5 text-[10px] text-[#aab9c7] max-[760px]:text-[8px]'>{t('views')}</span>
                </div>
              </div>

              {blog.author || dateLabel ? (
                <div className='flex min-h-[46px] items-center gap-[11px] border-e border-[rgba(105,147,181,0.35)] px-[23px] max-[760px]:min-h-[38px] max-[760px]:px-3 last:border-e-0'>
                  <svg viewBox='0 0 48 48' aria-hidden='true' className={META_ICON}>
                    <circle cx='24' cy='14' r='7' />
                    <path d='M10 40c0-9 6-14 14-14s14 5 14 14' />
                  </svg>
                  <div className='flex flex-col'>
                    {blog.author ? <strong className='text-[13px] font-semibold max-[760px]:text-[10px]'>{blog.author}</strong> : null}
                    {dateLabel ? <span className='mt-0.5 text-[10px] text-[#aab9c7] max-[760px]:text-[8px]'>{dateLabel}</span> : null}
                  </div>
                </div>
              ) : null}

              {department ? (
                <div className='flex min-h-[46px] items-center gap-[11px] px-[23px] max-[760px]:min-h-[38px] max-[760px]:px-3'>
                  <svg viewBox='0 0 48 48' aria-hidden='true' className={META_ICON}>
                    <path d='M7 14h14l4 5h16v22H7Z' />
                    <path d='M7 14V9h13l5 5' />
                  </svg>
                  <div className='flex flex-col'>
                    <strong className='text-[13px] font-semibold max-[760px]:text-[10px]'>{department}</strong>
                    <span className='mt-0.5 text-[10px] text-[#aab9c7] max-[760px]:text-[8px]'>{t('department')}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className='relative h-[720px] -ms-[30px] max-[1150px]:origin-end max-[1150px]:scale-[0.88] max-[760px]:mx-[-15px] max-[760px]:mt-5 max-[760px]:h-[550px] max-[760px]:origin-top max-[760px]:scale-[0.72]'>
            <div className={`absolute start-[180px] top-[45px] z-[6] -rotate-[10deg] text-center text-[31px] leading-[1.05] text-[#f0f4f8] ${isAr ? '' : "font-['Brush_Script_MT','Segoe_Script',cursive]"}`}>
              {scriptLines.map(line => (
                <span key={line} className='block'>
                  {line}
                </span>
              ))}
              <span className='mx-auto mt-[7px] block h-[3px] w-[145px] -rotate-[9deg] bg-[linear-gradient(90deg,transparent,#078ff4,transparent)]' />
            </div>

            <div className='absolute start-[40px] top-[100px] z-[4] h-[460px] w-[580px] max-[1150px]:start-[20px]'>
              <div className='absolute start-[85px] top-[55px] h-[300px] w-[390px] -rotate-[18deg] rounded-full border-2 border-[rgba(18,153,247,0.55)] shadow-[0_0_15px_rgba(0,145,255,0.2)]' />
              <div className='absolute start-[20px] top-6 h-[360px] w-[530px] -rotate-[18deg] rounded-full border-2 border-[rgba(16,122,209,0.35)] shadow-[0_0_15px_rgba(0,145,255,0.2)]' />

              <div className='absolute start-[175px] top-[70px] z-[5] h-[280px] w-[210px] overflow-hidden rounded-[26px] border-2 border-[rgba(113,198,255,0.75)] bg-[#02101f] shadow-[0_0_32px_rgba(112,202,255,0.55)] max-[1150px]:start-[160px] max-[1150px]:h-[250px] max-[1150px]:w-[185px]'>
                {blog.image_url ? (
                  <img
                    src={baseImage(blog.image_url)}
                    alt={blog.image_alt || title || ''}
                    onError={e => {
                      e.currentTarget.src = '/not-image.jpg';
                    }}
                    className='size-full object-cover'
                  />
                ) : (
                  <div className='flex size-full items-center justify-center text-3xl font-bold text-white/40'>{(title || 'B').charAt(0)}</div>
                )}
              </div>

              <UserDot className='start-[195px] top-2' />
              <UserDot className='start-[55px] top-[115px]' />
              <UserDot className='end-[70px] top-[105px]' />
              <UserDot className='start-[70px] top-[250px]' />
              <UserDot className='end-[85px] top-[255px]' />
              <UserDot className='start-[215px] top-[340px]' />
            </div>

            <div className='absolute end-0 top-[60px] z-10 w-[215px] rounded-2xl border border-[rgba(15,134,223,0.55)] bg-[linear-gradient(145deg,rgba(5,28,48,0.9),rgba(2,16,29,0.88))] px-5 py-[13px] shadow-[0_0_35px_rgba(0,98,180,0.18)] backdrop-blur-[12px]'>
              {services.map((item, index) => {
                const Icon = SERVICE_ICONS[index] || ServicePeople;
                const [line1, line2] = Array.isArray(item) ? item : [item, ''];
                return (
                  <div key={`${line1}-${index}`} className='flex min-h-[102px] flex-col items-center justify-center border-b border-[rgba(95,139,172,0.3)] text-center last:border-b-0'>
                    <div className='flex size-[45px] items-center justify-center'>
                      <Icon />
                    </div>
                    <strong className='mt-[3px] text-[13px] font-semibold leading-[1.3]'>
                      {line1}
                      {line2 ? (
                        <>
                          <br />
                          {line2}
                        </>
                      ) : null}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className='absolute bottom-[70px] end-0 z-[11] w-[315px] rounded-2xl border border-[rgba(0,145,245,0.75)] bg-[linear-gradient(145deg,rgba(5,31,53,0.93),rgba(2,17,30,0.93))] px-[23px] py-[18px] shadow-[0_0_25px_rgba(0,111,206,0.17)] backdrop-blur-[10px] max-[760px]:bottom-5'>
              <div className='text-[48px] font-extrabold leading-[0.6] text-[#008ff4]' aria-hidden='true'>
                “
              </div>
              <p className='mb-3 mt-[7px] text-[15px] italic leading-[1.4] text-[#c9e2f6]'>
                {quoteLines.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
              <span className='block h-0.5 w-[45px] bg-[#0a9cf6]' />
              <small className={`mt-[13px] block text-[9px] text-[#087dbd] ${isAr ? 'tracking-[2px]' : 'tracking-[5px]'}`}>{tb('quoteBrand')}</small>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-7 start-[4.8%] z-20 flex items-center gap-3 text-[8px] text-[#0878ae] max-[760px]:bottom-5 max-[760px]:start-5 max-[760px]:text-[6px] ${isAr ? 'tracking-[2px]' : 'tracking-[4px] max-[760px]:tracking-[2px]'}`}>
          {tb('bottomLead')}
          <b className='text-[#079cf2]'>•</b>
          {tb('bottomAccent')}
          <span className='ms-2 block h-0.5 w-[60px] bg-[#087eb9]' />
        </div>
      </section>

      {(blog.content?.[locale] || blog.image_url) ? (
        <section className='relative z-[5] flex min-h-[100vh] flex-col bg-[#020b15]'>
          <article className='relative mx-auto flex w-full max-w-[980px] flex-1 flex-col justify-center px-5 py-16 max-[760px]:py-12'>
            {blog.image_url ? (
              <figure className='mb-12 overflow-hidden rounded-[22px] border border-[rgba(20,146,235,0.45)] shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(0,120,220,0.12)] max-[760px]:mb-8 max-[760px]:rounded-[16px]'>
                <img
                  src={baseImage(blog.image_url)}
                  alt={blog.image_alt || title || ''}
                  onError={e => {
                    e.currentTarget.src = '/not-image.jpg';
                  }}
                  className='block h-[min(52vh,480px)] w-full object-cover max-[760px]:h-[240px]'
                />
              </figure>
            ) : null}

            {blog.content?.[locale] ? (
              <div
                className='blog-detail-prose text-[17px] leading-[1.85] tracking-[0.01em] text-[rgba(232,240,248,0.9)] max-md:text-[15px] max-md:leading-[1.75] [&_a]:font-medium [&_a]:text-[#079cf5] [&_a]:underline-offset-2 hover:[&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-s-2 [&_blockquote]:border-[#079cf5] [&_blockquote]:bg-[rgba(7,40,70,0.35)] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-[rgba(210,230,245,0.92)] [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-[clamp(26px,3vw,34px)] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.4px] [&_h2]:text-[#f4f8fc] [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:text-[clamp(20px,2.2vw,24px)] [&_h3]:font-semibold [&_h3]:text-[#eef5fb] [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[18px] [&_img]:border [&_img]:border-[rgba(20,146,235,0.35)] [&_li]:ms-5 [&_li]:mb-2 [&_li]:list-disc [&_ol]:my-5 [&_ol_li]:list-decimal [&_p]:mb-5 [&_p]:whitespace-pre-line [&_ul]:my-5'
                dangerouslySetInnerHTML={{ __html: blog.content[locale] }}
              />
            ) : null}
          </article>
        </section>
      ) : null}
    </div>
  );
}

function BlogSkeleton({ isAr, bodyFont }) {
  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className={`relative isolate min-h-screen overflow-hidden bg-[#020b15] text-white ${bodyFont}`}>
      <div className='relative z-[5] mx-auto grid min-h-screen w-[90%] max-w-[1500px] grid-cols-2 items-center gap-10 pt-[100px] max-[760px]:grid-cols-1'>
        <div className='space-y-4'>
          <div className='h-4 w-[180px] rounded skeleton-box' />
          <div className='h-[70px] w-[80%] rounded-lg skeleton-box' />
          <div className='h-8 w-[60%] rounded skeleton-box' />
          <div className='h-24 w-full rounded skeleton-box' />
          <div className='h-[57px] w-[295px] rounded-[30px] skeleton-box' />
        </div>
        <div className='h-[500px] rounded-2xl skeleton-box' />
      </div>
    </section>
  );
}
