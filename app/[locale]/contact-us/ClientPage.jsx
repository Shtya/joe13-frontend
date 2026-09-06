'use client';

import { useValues } from '@/app/context';
import LandingIcon from '@/components/atoms/LandingIcon';
import { hookContactUs } from '@/hooks/hookContactUs';
import { usePages } from '@/hooks/usePages';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const CONTACT_BG = '/landing/contact-us.png';

const FIELD =
  'relative flex items-center rounded-[9px] border border-[rgba(103,145,178,0.55)] bg-[rgba(1,9,19,0.39)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.025),0_0_0_1px_rgba(0,40,72,0.06)] transition-[border-color,box-shadow,background-color] duration-[250ms] ease-out focus-within:border-[rgba(8,151,239,0.9)] focus-within:bg-[rgba(2,17,32,0.56)] focus-within:shadow-[0_0_0_1px_rgba(0,143,239,0.08),0_0_18px_rgba(0,109,192,0.08)]';

const INPUT =
  'min-w-0 w-full border-0 bg-transparent text-base text-[#eef7ff] outline-none placeholder:text-[rgba(210,219,230,0.7)] max-[767px]:text-sm';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(23,170,255,0.9)]';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts.slice(0, -1).join(' '), accent: parts[parts.length - 1] };
}

function telHref(phone) {
  const cleaned = String(phone || '').replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '#';
}

function mapsHref(address) {
  return address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : '#';
}

export default function page({ initialData }) {
  const t = useTranslations('ContactUs');
  const tRoot = useTranslations();
  const tFooter = useTranslations('Footer');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';

  const { register, errors, loading, submit } = hookContactUs();
  const { loading: loadingSection, data } = usePages({ page_name: 'contact-us', initialData });
  const { settings } = useValues();

  const section1 = data?.sections?.find(e => e.id == 'sec1');
  const { lead, accent } = splitTitle(section1?.title?.[locale] || t('contactUsTitle'));
  const subtitle = section1?.content?.[locale] || t('stayConnected');

  const address = settings?.contact_us?.address?.[locale];
  const email = settings?.contact_us?.email;
  const phone = settings?.contact_us?.phone;

  return (
    <section
      id='contact'
      className={`relative isolate flex min-h-screen w-full items-center overflow-x-hidden bg-[#010812] text-white max-[1050px]:items-start max-[1050px]:overflow-y-visible ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[3]'>
        <Image
          src={CONTACT_BG}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[2] bg-[linear-gradient(90deg,rgba(0,5,13,0.93)_0%,rgba(0,8,17,0.87)_28%,rgba(0,7,17,0.32)_59%,rgba(0,4,12,0.12)_100%)] rtl:bg-[linear-gradient(270deg,rgba(0,5,13,0.93)_0%,rgba(0,8,17,0.87)_28%,rgba(0,7,17,0.32)_59%,rgba(0,4,12,0.12)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(0,5,13,0.9)_0%,rgba(0,7,15,0.88)_55%,rgba(0,5,13,0.78)_100%)] max-[767px]:rtl:bg-[linear-gradient(180deg,rgba(0,5,13,0.9)_0%,rgba(0,7,15,0.88)_55%,rgba(0,5,13,0.78)_100%)]'
      />

      <div className='relative mx-auto grid w-[min(1370px,calc(100%-120px))] grid-cols-[minmax(0,1fr)_390px] items-center gap-x-[115px] py-[calc(100px+24px)] max-[1450px]:w-[calc(100%-110px)] max-[1450px]:gap-x-20 max-[1400px]:grid-cols-[minmax(0,1fr)_350px] max-[1400px]:gap-x-[55px] max-[1400px]:py-[calc(85px+24px)] max-[1200px]:w-[calc(100%-60px)] max-[1050px]:block max-[1050px]:pb-[max(88px,env(safe-area-inset-bottom))] max-[1050px]:pt-[94px] max-[900px]:w-[calc(100%-42px)] max-[767px]:pb-[max(96px,calc(env(safe-area-inset-bottom)+72px))] max-[767px]:pt-[84px] max-[640px]:w-[calc(100%-36px)] max-[400px]:pt-[76px] max-[390px]:w-[calc(100%-28px)]'>
        <div className='relative w-full max-w-[825px] max-[1050px]:max-w-none'>
          <div className='flex h-[23px] items-center gap-6 whitespace-nowrap text-[17px] font-medium leading-none tracking-[5.8px] text-[#0ca1f3] rtl:flex-row-reverse rtl:justify-end max-[767px]:gap-[13px] max-[767px]:text-[11px] max-[767px]:tracking-[3.7px]'>
            <span>{t('letsConnect')}</span>
            <i className='block h-px w-[128px] bg-[linear-gradient(90deg,#1bb7ff,rgba(25,148,233,0.25))] shadow-[0_0_5px_rgba(0,143,239,0.35)] max-[767px]:w-[70px] rtl:bg-[linear-gradient(270deg,#1bb7ff,rgba(25,148,233,0.25))]' />
          </div>

          {loadingSection ? (
            <div className='mt-7 h-[70px] w-[min(100%,420px)] rounded-lg skeleton-box' />
          ) : (
            <h2 className='mb-2 mt-7 break-words font-bold leading-[0.98] tracking-[-3.8px] text-[#f8fafc] text-[clamp(64px,5vw,88px)] max-[1400px]:text-[68px] max-[767px]:mt-[22px] max-[767px]:text-[clamp(40px,12vw,58px)] max-[767px]:tracking-[-2.5px] max-[400px]:text-[38px]'>
              {lead ? `${lead} ` : ''}
              {accent ? (
                <strong className='bg-[linear-gradient(100deg,#0870ed_0%,#168fff_55%,#02a8ff_100%)] bg-clip-text font-bold text-transparent'>
                  {accent}
                </strong>
              ) : null}
            </h2>
          )}

          {loadingSection ? (
            <div className='mb-2 h-7 w-[min(100%,360px)] rounded skeleton-box' />
          ) : (
            <p className='m-0 text-2xl font-normal leading-[1.35] tracking-[-0.35px] text-[rgba(224,232,241,0.86)] max-[1400px]:text-[21px] max-[767px]:text-[17px] max-[767px]:leading-[1.45] max-[400px]:text-[15px]'>
              {subtitle}
            </p>
          )}

          <div className='mt-[18px] h-0.5 w-[53px] bg-[linear-gradient(90deg,#08a5f5,#0c73db)] shadow-[0_0_7px_rgba(0,153,247,0.3)] max-[767px]:mt-[15px]' />

          <form className='mt-[25px]' onSubmit={submit} noValidate>
            <div className='grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1 max-[900px]:gap-3'>
              <Field
                icon={<NameIcon />}
                error={errors?.name}
                tRoot={tRoot}
              >
                <input
                  {...register('name')}
                  type='text'
                  name='name'
                  autoComplete='name'
                  placeholder={t('fullName')}
                  className={`${INPUT} ms-[13px] h-full`}
                />
              </Field>

              <Field
                icon={<PhoneIcon />}
                error={errors?.phone}
                tRoot={tRoot}
              >
                <input
                  {...register('phone')}
                  type='tel'
                  name='phone'
                  autoComplete='tel'
                  placeholder={t('phoneNumber')}
                  className={`${INPUT} ms-[13px] h-full`}
                />
              </Field>

              <Field
                icon={<MailIcon />}
                error={errors?.email}
                tRoot={tRoot}
              >
                <input
                  {...register('email')}
                  type='email'
                  name='email'
                  autoComplete='email'
                  placeholder={t('email')}
                  className={`${INPUT} ms-[13px] h-full`}
                />
              </Field>
            </div>

            <div className='relative mt-6 max-[767px]:mt-3'>
              <label className={`${FIELD} !items-start h-[157px] w-full rounded-[9px] px-[18px] py-[21px] max-[900px]:h-[135px] max-[900px]:pt-[17px]`}>
                <span className='mt-[3px] flex size-7 shrink-0 items-center justify-center text-[#078af1]'>
                  <MessageIcon />
                </span>
                <textarea
                  {...register('message')}
                  name='message'
                  placeholder={t('message')}
                  className={`${INPUT} ms-[13px] h-[110px] resize py-0 leading-[1.4] max-[767px]:h-[100px]`}
                />
              </label>
              {errors?.message ? (
                <span className='mt-1 block text-sm text-red-500'>
                  {tRoot(errors.message.message)}
                </span>
              ) : null}
            </div>

            <button
              type='submit'
              disabled={loading}
              className={`relative mt-[31px] flex h-[66px] w-[306px] items-center justify-center rounded-[34px] border-0 bg-[linear-gradient(105deg,#0c93ef_0%,#087fe9_47%,#135de3_100%)] p-0 text-lg font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.24),0_0_15px_rgba(0,143,245,0.28),0_8px_25px_rgba(0,75,170,0.15)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_26px_rgba(0,157,255,0.4),0_10px_28px_rgba(0,75,170,0.2)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[767px]:mt-[23px] max-[767px]:h-[61px] max-[767px]:w-full max-[767px]:max-w-[305px] max-[767px]:text-base ${FOCUS}`}
            >
              {loading ? (
                <span className='flex items-center gap-2.5'>
                  <span className='size-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent' />
                  <span>{tRoot('loading')}</span>
                </span>
              ) : (
                <span>{t('sendMessage')}</span>
              )}
              <span className='absolute end-[15px] flex size-10 items-center justify-center rounded-full border border-[rgba(228,246,255,0.9)] bg-[rgba(4,106,214,0.35)]'>
                <svg viewBox='0 0 24 24' className='size-[19px] fill-none stroke-white stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
                  <path d='M4 12h15' />
                  <path d='m13 5 7 7-7 7' />
                </svg>
              </span>
            </button>
          </form>

          <div className='mt-10 flex w-full items-center max-[1050px]:flex-wrap max-[1050px]:gap-y-6 max-[767px]:mt-[34px] max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:gap-5'>
            <Feature
              src='/landing/contact-us-icon-1.png'
              title={t('trustedSupport')}
              copy={t('trustedSupportDesc')}
            />
            <span className='mx-[27px] h-[82px] w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(73,105,133,0.65),transparent)] max-[1400px]:mx-[18px] max-[1050px]:hidden' />
            <Feature
              src='/landing/contact-us-icon-2.png'
              title={t('quickResponse')}
              copy={t('quickResponseDesc')}
            />
            <span className='mx-[27px] h-[82px] w-px shrink-0 bg-[linear-gradient(180deg,transparent,rgba(73,105,133,0.65),transparent)] max-[1400px]:mx-[18px] max-[1050px]:hidden' />
            <Feature
              src='/landing/icon-10-3.png'
              title={t('expertTeam')}
              copy={t('expertTeamDesc')}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[23px] max-[1050px]:mt-10 max-[1050px]:grid max-[1050px]:grid-cols-1 max-[1050px]:gap-3.5 max-[767px]:mt-8 max-[767px]:flex max-[767px]:gap-3'>
          {address ? (
            <InfoCard
              href={mapsHref(address)}
              src='/landing/location.png'
              title={tFooter('head_office')}
              copy={address}
            />
          ) : null}

          {email ? (
            <InfoCard
              href={`mailto:${email}`}
              src='/landing/emails.png'
              title={t('emailUs')}
              copy={email}
            />
          ) : null}

          {phone ? (
            <InfoCard
              href={telHref(phone)}
              src='/landing/phone.png'
              title={t('callUs')}
              copy={phone}
              phone
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Field({ icon, error, tRoot, children }) {
  return (
    <div className='relative'>
      <label className={`${FIELD} h-[73px] px-[18px] max-[767px]:h-[62px]`}>
        <span className='flex size-7 shrink-0 items-center justify-center text-[#078af1]'>{icon}</span>
        {children}
      </label>
      {error ? (
        <span className='mt-1 block text-sm text-red-500'>{tRoot(error.message)}</span>
      ) : null}
    </div>
  );
}

function Feature({ src, title, copy }) {
  return (
    <div className='flex min-w-0 items-center'>
      <div className='relative me-4 flex size-[76px] shrink-0 items-center justify-center max-[767px]:me-3 max-[767px]:size-[60px]'>
        {src ? <LandingIcon src={src} sizes='76px' className='scale-[1.28]' /> : null}
      </div>
      <div>
        <strong className='block text-base font-semibold leading-tight text-[#f6f8fb] max-[767px]:text-sm'>
          {title}
        </strong>
        <p className='mt-[7px] whitespace-pre-line text-[15px] font-normal leading-[1.45] text-[rgba(196,210,225,0.78)] max-[767px]:mt-[5px] max-[767px]:text-[13px]'>
          {copy}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ href, src, title, copy, phone }) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${FOCUS} relative flex min-h-[137px] w-full items-center overflow-hidden rounded-[15px] border border-[rgba(88,130,165,0.37)] bg-[linear-gradient(105deg,rgba(19,37,56,0.63),rgba(7,21,37,0.55))] px-6 py-5 text-white no-underline shadow-[inset_0_1px_1px_rgba(255,255,255,0.035),0_10px_30px_rgba(0,0,0,0.14)] transition-[transform,border-color,box-shadow] duration-[250ms] ease-out after:absolute after:inset-y-0 after:end-0 after:w-[3px] after:rounded-e-[15px] after:bg-[linear-gradient(180deg,#20aaff,#076bea)] after:shadow-[0_0_10px_rgba(0,148,255,0.6)] after:content-[''] hover:-translate-y-0.5 hover:border-[rgba(16,145,231,0.65)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(0,103,187,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[1400px]:min-h-[122px] max-[1050px]:min-h-[125px] max-[1050px]:p-4 max-[767px]:min-h-[108px] max-[767px]:rounded-xl max-[767px]:px-[18px] max-[767px]:py-4 max-[400px]:min-h-[102px]`}
    >
      <span className='relative flex size-[52px] shrink-0 items-center justify-center max-[1050px]:size-[44px] max-[400px]:size-10'>
        {src ? <LandingIcon src={src} sizes='52px' /> : null}
      </span>
      <span className='ms-[27px] flex min-w-0 flex-col max-[1050px]:ms-[15px] max-[767px]:ms-4 max-[400px]:ms-3'>
        <strong className='text-[19px] font-semibold leading-tight text-[#f8fafc] max-[1050px]:text-base max-[767px]:text-[15px] max-[400px]:text-sm'>
          {title}
        </strong>
        <span
          dir={phone ? 'ltr' : undefined}
          className={`mt-2.5 text-base font-normal leading-[1.45] text-[rgba(216,226,237,0.78)] max-[1050px]:text-[13px] max-[767px]:mt-1.5 max-[767px]:text-[13px] max-[400px]:text-xs ${phone ? 'font-semibold tracking-[0.15px] text-[#087ff0]' : ''}`}
        >
          {copy}
        </span>
      </span>
    </a>
  );
}

function svgField(children) {
  return (
    <svg viewBox='0 0 24 24' className='size-[22px] fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]'>
      {children}
    </svg>
  );
}

function NameIcon() {
  return svgField(
    <>
      <circle cx='12' cy='8' r='3.2' />
      <path d='M5.5 20c0-3.7 2.7-6 6.5-6s6.5 2.3 6.5 6' />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox='0 0 24 24' className='size-[22px] fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]'>
      <path d='M6.7 3.8 9.5 3c.7-.2 1.4.2 1.7.8l1.4 3.4c.2.6.1 1.3-.4 1.7L10.6 10c1.2 2.3 3 4.2 5.4 5.4l1.1-1.6c.4-.5 1.1-.7 1.7-.4l3.4 1.4c.6.3 1 .9.8 1.7l-.8 2.8c-.2.7-.8 1.2-1.5 1.2C10.7 20.5 3.5 13.3 3.5 4.3c0-.7.5-1.3 1.2-1.5Z' />
    </svg>
  );
}

function MailIcon() {
  return svgField(
    <>
      <rect x='3.5' y='5.5' width='17' height='13' rx='1.5' />
      <path d='m4.5 7 7.5 5.5L19.5 7' />
    </>
  );
}

function MessageIcon() {
  return svgField(
    <>
      <path d='M4 5.5h16v11H9l-5 3v-14Z' />
      <path d='M8 10h8M8 13h5' />
    </>
  );
}
