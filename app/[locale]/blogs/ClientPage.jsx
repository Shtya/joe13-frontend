'use client';

import SlidePagination from '@/components/atoms/SlidePagination';
import Tabs_blogs from '@/components/atoms/Tabs_blogs';
import { baseImage } from '@/helpers/baseUrl';
import { pickUi } from '@/helpers/cms';
import { useBlogs } from '@/hooks/useblogs';
import { usePages } from '@/hooks/usePages';
import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const BG = '/landing/hero-blogs.png';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts.slice(0, -1).join(' '), accent: parts[parts.length - 1] };
}

function plainText(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(value, locale) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ClientPage({ initialData }) {
  const tb = useTranslations('Blogs');
  const tNav = useTranslations('Navbar');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';

  const { loading: loadingBlogs, blogs } = useBlogs();
  const { loading, data } = usePages({ page_name: 'blogs', initialData });
  const section1 = data?.sections?.find(e => e.id == 'sec1');

  const latestBlogs = blogs?.data?.slice(0, 8) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (activeIndex >= latestBlogs.length) setActiveIndex(0);
  }, [latestBlogs.length, activeIndex]);

  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (!el || !scrollerRef.current) return;
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  const titleRaw = section1?.title?.[locale] || tb('blogs');
  const { lead, accent } = splitTitle(titleRaw);
  const description = section1?.content?.[locale] || tb('blogsDescription');
  const eyebrow = pickUi(section1, locale, 'eyebrow', tb('eyebrow'));
  const eyebrow2 = pickUi(section1, locale, 'eyebrow2', tb('impact'));

  const total = Math.max(latestBlogs.length, 1);
  const go = dir => {
    if (!latestBlogs.length) return;
    setActiveIndex(i => (i + dir + latestBlogs.length) % latestBlogs.length);
  };

  const scrollToAll = () => {
    document.getElementById('all-blogs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`bg-[#020b15] text-white ${bodyFont}`}>
      <section
        id='blogs'
        className='relative isolate h-screen min-h-screen overflow-hidden bg-[#020b15] max-[1100px]:h-auto'
      >
        <div className='pointer-events-none absolute inset-0 -z-[4]'>
          <Image src={BG} alt='' fill priority sizes='100vw' className='object-cover object-center' />
        </div>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-[3] bg-[linear-gradient(90deg,rgba(1,8,18,0.78)_0%,rgba(1,9,19,0.57)_31%,rgba(0,8,17,0.12)_66%,rgba(0,6,15,0.16)_100%)] rtl:bg-[linear-gradient(270deg,rgba(1,8,18,0.78)_0%,rgba(1,9,19,0.57)_31%,rgba(0,8,17,0.12)_66%,rgba(0,6,15,0.16)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(1,8,18,0.82)_0%,rgba(1,9,19,0.72)_55%,rgba(0,8,17,0.7)_100%)]'
        />

        <div className='relative mx-auto grid h-full w-[calc(100%-218px)] grid-cols-[minmax(0,1fr)_475px] items-center gap-x-[52px] pt-[100px] max-[1700px]:w-[calc(100%-160px)] max-[1700px]:grid-cols-[minmax(0,1fr)_455px] max-[1700px]:gap-x-10 max-[1450px]:w-[calc(100%-130px)] max-[1450px]:grid-cols-[minmax(0,1fr)_430px] max-[1450px]:gap-x-[35px] max-[1100px]:flex max-[1100px]:h-auto max-[1100px]:min-h-screen max-[1100px]:w-[calc(100%-70px)] max-[1100px]:flex-col max-[1100px]:items-stretch max-[1100px]:gap-[45px] max-[1100px]:pb-[100px] max-[1100px]:pt-[130px] max-[767px]:w-[calc(100%-32px)] max-[767px]:gap-[34px] max-[767px]:pb-[90px] max-[767px]:pt-[105px]'>
          <main className='relative flex min-w-0 flex-col justify-center self-center max-[1100px]:h-auto max-[1100px]:w-full'>
            <div className={`flex h-5 items-center gap-[9px] whitespace-nowrap font-medium leading-none text-[#0aa9f8] max-[767px]:gap-1.5 ${isAr ? 'text-[10px] tracking-[2.4px] max-[767px]:text-[8px]' : 'text-[11px] tracking-[4.5px] max-[767px]:text-[8px] max-[767px]:tracking-[2.7px]'}`}>
              <span>{eyebrow}</span>
              <b className='text-[13px] font-medium tracking-normal text-[#0b9bf1]'>•</b>
              <span>{eyebrow2}</span>
              <i className='ms-1 block h-px w-[110px] bg-[linear-gradient(90deg,#19b8ff,rgba(20,154,235,0.1))] shadow-[0_0_6px_rgba(0,145,255,0.25)] max-[767px]:w-[60px] rtl:bg-[linear-gradient(270deg,#19b8ff,rgba(20,154,235,0.1))]' />
            </div>

            {loading ? (
              <div className='mt-[23px] h-[90px] w-[min(100%,420px)] rounded-lg skeleton-box' />
            ) : (
              <h1 className='mb-2.5 mt-[23px] flex flex-col text-[clamp(70px,6vw,92px)] font-extrabold leading-[0.83] tracking-[-4px] text-[#f8fafc] max-[1700px]:text-[80px] max-[1450px]:text-[72px] max-[1450px]:tracking-[-3px] max-[767px]:mt-[18px] max-[767px]:text-[clamp(54px,17vw,75px)] max-[767px]:leading-[0.84] max-[767px]:tracking-[-3px] max-[420px]:text-[52px]'>
                {lead ? <span>{lead}</span> : null}
                {accent ? (
                  <span className='block bg-[linear-gradient(100deg,#f4f9ff_0%,#25b9ff_17%,#078df4_58%,#0868e9_100%)] bg-clip-text text-transparent [filter:drop-shadow(0_0_8px_rgba(0,125,255,0.11))]'>
                    {accent}
                  </span>
                ) : null}
              </h1>
            )}

            {loading ? (
              <div className='mt-[17px] space-y-2'>
                <div className='h-5 w-full max-w-[670px] rounded skeleton-box' />
                <div className='h-5 w-4/5 max-w-[670px] rounded skeleton-box' />
                <div className='h-5 w-3/5 max-w-[670px] rounded skeleton-box' />
              </div>
            ) : (
              <div
                className='mt-[17px] w-[min(670px,100%)] text-[19px] font-normal leading-[1.52] tracking-[-0.2px] text-[rgba(237,243,249,0.9)] max-[1700px]:max-w-[640px] max-[1700px]:text-lg max-[1450px]:max-w-[610px] max-[1450px]:text-[17px] max-[1100px]:max-w-[750px] max-[767px]:mt-4 max-[767px]:w-full max-[767px]:text-sm max-[767px]:leading-[1.55] max-[420px]:text-[13px]'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <Link
              href='/contact-us'
              className={`${FOCUS} relative mt-5 flex h-[61px] w-[279px] items-center rounded-[34px] bg-[linear-gradient(102deg,#0ca5f7_0%,#087fea_57%,#0868df_100%)] px-6 text-lg font-medium text-white no-underline shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_17px_rgba(0,142,255,0.43),0_9px_22px_rgba(0,78,176,0.2)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_0_27px_rgba(0,154,255,0.55),0_11px_28px_rgba(0,78,176,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[767px]:mt-[19px] max-[767px]:h-[57px] max-[767px]:w-[250px] max-[767px]:text-base`}
            >
              <span className='me-[17px] flex size-[29px] items-center justify-center'>
                <svg viewBox='0 0 24 24' className='size-[26px] fill-none stroke-white stroke-[1.65] [stroke-linecap:round] [stroke-linejoin:round]'>
                  <path d='M4 13v-1a8 8 0 0 1 16 0v1' />
                  <path d='M4 13h2v5H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z' />
                  <path d='M20 13h-2v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z' />
                  <path d='M18 18c0 2-1.7 3-4 3h-1' />
                </svg>
              </span>
              <span>{tNav('contact-us')}</span>
              <span className='absolute end-[25px] flex size-[23px] items-center justify-center'>
                <svg viewBox='0 0 24 24' className='size-[21px] fill-none stroke-white stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
                  <path d='M4 12h15' />
                  <path d='m13 5 7 7-7 7' />
                </svg>
              </span>
            </Link>

            <SlidePagination
              current={latestBlogs.length ? activeIndex + 1 : 0}
              total={latestBlogs.length ? total : 0}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              prevLabel={isAr ? 'السابق' : 'Previous blog'}
              nextLabel={isAr ? 'التالي' : 'Next blog'}
              className='mt-8 max-[1100px]:mt-[30px] max-[767px]:mt-[22px]'
            />
          </main>

          <aside className='relative h-[537px] w-full self-center overflow-hidden rounded-[15px] border border-[rgba(77,145,194,0.68)] bg-[linear-gradient(130deg,rgba(16,45,73,0.78),rgba(7,23,40,0.76)_54%,rgba(9,32,56,0.7))] px-5 pb-5 ps-[27px] pt-[18px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),inset_0_-20px_50px_rgba(0,0,0,0.08),0_12px_35px_rgba(0,0,0,0.24)] before:pointer-events-none before:absolute before:end-0 before:top-0 before:size-[190px] before:bg-[radial-gradient(circle,rgba(0,126,255,0.12),transparent_70%)] before:content-[""] max-[1700px]:h-[520px] max-[1450px]:h-[500px] max-[1100px]:mx-auto max-[1100px]:mt-0 max-[1100px]:h-[500px] max-[1100px]:w-[min(700px,100%)] max-[767px]:h-[470px] max-[767px]:rounded-[13px] max-[767px]:px-[13px] max-[767px]:pb-[15px] max-[767px]:ps-4 max-[767px]:pt-[15px] max-[420px]:h-[450px]'>
            <div className='relative z-[2] flex h-[39px] items-center justify-between pe-0.5'>
              <h2 className='m-0 text-[19px] font-bold leading-none text-[#f6f9fc] first-letter:uppercase max-[767px]:text-base'>
                {String(tb('latestLead') || '').toLowerCase()}{' '}
                <span className='text-[#078ff5]'>{String(tb('latestAccent') || '').toLowerCase()}</span>
              </h2>
              <button
                type='button'
                onClick={scrollToAll}
                className={`${FOCUS} flex items-center gap-3 bg-transparent p-0 text-sm text-[#049af4] max-[767px]:gap-[7px] max-[767px]:text-xs`}
              >
                <span>{tb('viewAll')}</span>
                <svg viewBox='0 0 24 24' className='size-5 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180 max-[767px]:size-[17px]'>
                  <path d='M4 12h15' />
                  <path d='m13 5 7 7-7 7' />
                </svg>
              </button>
            </div>

            <div ref={scrollerRef} className='projects-product-scroll relative h-[calc(100%-39px)] overflow-x-hidden overflow-y-auto pe-3.5 rtl:pe-0 rtl:ps-3.5'>
              {loadingBlogs ? (
                <div className='space-y-[11px] pt-2'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='flex min-h-[105px] items-center rounded-[14px] border border-[rgba(73,120,155,0.39)] bg-[rgba(7,25,43,0.6)] px-3 py-2.5'>
                      <div className='size-20 shrink-0 rounded-lg skeleton-box' />
                      <div className='ms-[23px] min-w-0 flex-1 space-y-2'>
                        <div className='h-4 w-1/2 rounded skeleton-box' />
                        <div className='h-3 w-full rounded skeleton-box' />
                      </div>
                    </div>
                  ))}
                </div>
              ) : latestBlogs.length === 0 ? (
                <p className='pt-6 text-sm text-[rgba(209,221,233,0.8)]'>{tb('noneFound')}</p>
              ) : (
                latestBlogs.map((item, i) => {
                  const name = item?.title?.[locale] || item?.title?.en || '';
                  const src = item?.image_url || '';
                  const active = i === activeIndex;
                  const dateLabel = formatDate(item.published_at || item.created_at, locale);
                  return (
                    <article
                      key={item.id || item.slug || i}
                      ref={el => {
                        cardRefs.current[i] = el;
                      }}
                      className='mb-[11px]'
                    >
                      <Link
                        href={`/blogs/${item.slug}`}
                        onClick={() => setActiveIndex(i)}
                        className={`${FOCUS} group relative flex min-h-[105px] w-full items-center rounded-[14px] border px-3 py-2.5 pe-[15px] ps-3 no-underline shadow-[inset_0_1px_1px_rgba(255,255,255,0.025)] transition-[border-color,background,transform,box-shadow] duration-[250ms] ease-out motion-reduce:transition-none max-[1450px]:min-h-[95px] max-[767px]:min-h-[101px] max-[767px]:rounded-[11px] max-[767px]:px-[11px] max-[767px]:py-[9px] ${
                          active
                            ? 'border-[rgba(25,165,242,0.82)] bg-[linear-gradient(105deg,rgba(22,61,91,0.87),rgba(8,32,53,0.82))] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_0_17px_rgba(0,125,218,0.08)]'
                            : 'border-[rgba(73,120,155,0.39)] bg-[linear-gradient(100deg,rgba(17,40,62,0.83),rgba(7,25,43,0.74))] hover:-translate-x-0.5 hover:border-[rgba(12,153,237,0.65)] hover:bg-[linear-gradient(100deg,rgba(18,52,80,0.9),rgba(7,28,48,0.8))] rtl:hover:translate-x-0.5'
                        }`}
                      >
                        <div className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[rgba(167,207,234,0.55)] bg-[#05080b] shadow-[0_0_7px_rgba(0,0,0,0.45)] max-[1700px]:size-[76px] max-[1450px]:size-[68px] max-[767px]:size-[65px] max-[420px]:size-[58px]'>
                          {src ? (
                            <img
                              src={baseImage(src)}
                              alt={item.image_alt || name}
                              width={80}
                              height={80}
                              onError={e => {
                                e.currentTarget.src = '/not-image.jpg';
                              }}
                              className='size-full object-cover'
                            />
                          ) : (
                            <span className='flex size-full items-center justify-center bg-[radial-gradient(circle_at_center,#151515,#000_70%)] text-[42px] font-bold text-white [text-shadow:0_0_5px_rgba(255,255,255,0.25)]'>
                              {(name || 'B').charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className='ms-[23px] min-w-0 flex-1 pe-[42px] max-[1450px]:ms-[17px] max-[767px]:ms-[13px] max-[767px]:pe-[34px] max-[420px]:ms-2.5'>
                          <h3 className='m-0 truncate text-base font-semibold leading-tight text-[#f5f8fc] max-[767px]:text-sm max-[420px]:text-[13px]'>
                            {name}
                          </h3>
                          <p className='mt-[9px] line-clamp-2 max-w-[240px] text-[13px] font-normal leading-[1.4] text-[rgba(209,221,233,0.8)] max-[1450px]:text-xs max-[767px]:mt-1.5 max-[767px]:text-[11px] max-[767px]:leading-[1.35] max-[420px]:text-[10px]'>
                            {plainText(item?.content?.[locale]) || dateLabel}
                          </p>
                        </div>
                        <span className='absolute end-4 top-1/2 flex size-[42px] -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(103,152,186,0.55)] bg-[rgba(11,48,76,0.43)] text-[#d9eafa] transition-[border-color,background,color,box-shadow] duration-200 group-hover:border-[rgba(14,164,247,0.85)] group-hover:bg-[rgba(8,108,181,0.45)] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(0,139,238,0.16)] max-[767px]:end-2.5 max-[767px]:size-[34px]'>
                          <svg viewBox='0 0 24 24' className='size-5 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180 max-[767px]:size-[17px]'>
                            <path d='M5 12h13' />
                            <path d='m13 6 6 6-6 6' />
                          </svg>
                        </span>
                      </Link>
                    </article>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </section>

      <Tabs_blogs loading={loadingBlogs} projects={blogs} />
    </div>
  );
}
