'use client';

import Input from '@/components/atoms/input/Input';
import InputNational from '@/components/atoms/input/InputNational';
import UploadFile from '@/components/atoms/input/UploadFile';
import UploadFileField from '@/components/atoms/input/UploadFileField';
import SelectValue from '@/components/atoms/select/SelectValue';
import { useLocale, useTranslations } from 'next-intl';

export const Cities = [
  { name_ar: 'الرياض', name_en: 'Riyadh', value: 'Riyadh' },
  { name_ar: 'الخرج', name_en: 'Al-Kharj', value: 'Al_Kharj' },
  { name_ar: 'المجمعة', name_en: "Al-Majma'ah", value: 'Al_Majmaah' },
  { name_ar: 'الدوادمي', name_en: 'Dawadmi', value: 'Dawadmi' },
  { name_ar: 'الزلفي', name_en: 'Al-Zulfi', value: 'Al_Zulfi' },
  { name_ar: 'شقراء', name_en: 'Shaqra', value: 'Shaqra' },
  { name_ar: 'وادي الدواسر', name_en: 'Wadi Al-Dawasir', value: 'Wadi_Al_Dawasir' },
  { name_ar: 'عفيف', name_en: 'Afif', value: 'Afif' },
  { name_ar: 'الغاط', name_en: 'Al-Ghat', value: 'Al_Ghat' },
  { name_ar: 'حوطة بني تميم', name_en: 'Hotat Bani Tamim', value: 'Hotat_Bani_Tamim' },
  { name_ar: 'مكة', name_en: 'Makkah', value: 'Makkah' },
  { name_ar: 'جدة', name_en: 'Jeddah', value: 'Jeddah' },
  { name_ar: 'الطائف', name_en: 'Taif', value: 'Taif' },
  { name_ar: 'رابغ', name_en: 'Rabigh', value: 'Rabigh' },
  { name_ar: 'الليث', name_en: 'Al-Lith', value: 'Al_Lith' },
  { name_ar: 'خليص', name_en: 'Khulais', value: 'Khulais' },
  { name_ar: 'الكامل', name_en: 'Al-Kamil', value: 'Al_Kamil' },
  { name_ar: 'الدمام', name_en: 'Dammam', value: 'Dammam' },
  { name_ar: 'الخبر', name_en: 'Al-Khobar', value: 'Al_Khobar' },
  { name_ar: 'الظهران', name_en: 'Dhahran', value: 'Dhahran' },
  { name_ar: 'الأحساء', name_en: 'Al-Ahsa', value: 'Al_Ahsa' },
  { name_ar: 'الجبيل', name_en: 'Jubail', value: 'Jubail' },
  { name_ar: 'القطيف', name_en: 'Qatif', value: 'Qatif' },
  { name_ar: 'رأس تنورة', name_en: 'Ras Tanura', value: 'Ras_Tanura' },
  { name_ar: 'الخفجي', name_en: 'Khafji', value: 'Khafji' },
  { name_ar: 'حفر الباطن', name_en: 'Hafar Al-Batin', value: 'Hafar_Al_Batin' },
  { name_ar: 'النعيرية', name_en: 'Al-Nairyah', value: 'Al_Nairyah' },
  { name_ar: 'المدينة المنورة', name_en: 'Madinah', value: 'Madinah' },
  { name_ar: 'ينبع', name_en: 'Yanbu', value: 'Yanbu' },
  { name_ar: 'بدر', name_en: 'Badr', value: 'Badr' },
  { name_ar: 'العلا', name_en: 'Al-Ula', value: 'Al_Ula' },
  { name_ar: 'خيبر', name_en: 'Khaybar', value: 'Khaybar' },
  { name_ar: 'الحناكية', name_en: 'Al-Hanakiyah', value: 'Al_Hanakiyah' },
  { name_ar: 'بريدة', name_en: 'Buraidah', value: 'Buraidah' },
  { name_ar: 'عنيزة', name_en: 'Unaizah', value: 'Unaizah' },
  { name_ar: 'الرس', name_en: 'Al-Rass', value: 'Al_Rass' },
  { name_ar: 'البكيرية', name_en: 'Al-Bukayriyah', value: 'Al_Bukayriyah' },
  { name_ar: 'المذنب', name_en: 'Muthnab', value: 'Muthnab' },
  { name_ar: 'رياض الخبراء', name_en: 'Riyadh Al-Khabra', value: 'Riyadh_Al_Khabra' },
  { name_ar: 'أبها', name_en: 'Abha', value: 'Abha' },
  { name_ar: 'خميس مشيط', name_en: 'Khamis Mushait', value: 'Khamis_Mushait' },
  { name_ar: 'النماص', name_en: 'Al-Namas', value: 'Al_Namas' },
  { name_ar: 'بيشة', name_en: 'Bisha', value: 'Bisha' },
  { name_ar: 'رجال ألمع', name_en: 'Rijal Almaa', value: 'Rijal_Almaa' },
  { name_ar: 'ظهران الجنوب', name_en: 'Dhahran Al-Janub', value: 'Dhahran_Al_Janub' },
  { name_ar: 'أحد رفيدة', name_en: 'Ahad Rafidah', value: 'Ahad_Rafidah' },
  { name_ar: 'تبوك', name_en: 'Tabuk', value: 'Tabuk' },
  { name_ar: 'ضباء', name_en: 'Duba', value: 'Duba' },
  { name_ar: 'الوجه', name_en: 'Al-Wajh', value: 'Al_Wajh' },
  { name_ar: 'أملج', name_en: 'Umluj', value: 'Umluj' },
  { name_ar: 'حقل', name_en: 'Haql', value: 'Haql' },
  { name_ar: 'تيماء', name_en: 'Tayma', value: 'Tayma' },
  { name_ar: 'حائل', name_en: 'Hail', value: 'Hail' },
  { name_ar: 'بقعاء', name_en: "Baqa'a", value: 'Baqaa' },
  { name_ar: 'الشنان', name_en: 'Shinan', value: 'Shinan' },
  { name_ar: 'الغزالة', name_en: 'Al-Ghazalah', value: 'Al_Ghazalah' },
  { name_ar: 'نجران', name_en: 'Najran', value: 'Najran' },
  { name_ar: 'شرورة', name_en: 'Sharurah', value: 'Sharurah' },
  { name_ar: 'حبونا', name_en: 'Habuna', value: 'Habuna' },
  { name_ar: 'جازان', name_en: 'Jazan', value: 'Jazan' },
  { name_ar: 'صبيا', name_en: 'Sabya', value: 'Sabya' },
  { name_ar: 'أبو عريش', name_en: 'Abu Arish', value: 'Abu_Arish' },
  { name_ar: 'بيش', name_en: 'Baysh', value: 'Baysh' },
  { name_ar: 'الدرب', name_en: 'Al-Darb', value: 'Al_Darb' },
  { name_ar: 'صامطة', name_en: 'Samtah', value: 'Samtah' },
  { name_ar: 'الباحة', name_en: 'Al-Bahah', value: 'Al_Bahah' },
  { name_ar: 'المخواة', name_en: 'Al-Mikhwah', value: 'Al_Mikhwah' },
  { name_ar: 'بلجرشي', name_en: 'Baljurashi', value: 'Baljurashi' },
  { name_ar: 'القنفذة', name_en: 'Al-Qunfudhah', value: 'Al_Qunfudhah' },
  { name_ar: 'سكاكا', name_en: 'Sakakah', value: 'Sakakah' },
  { name_ar: 'دومة الجندل', name_en: 'Domat Al-Jandal', value: 'Domat_Al_Jandal' },
  { name_ar: 'طبرجل', name_en: 'Tabarjal', value: 'Tabarjal' },
  { name_ar: 'القريات', name_en: 'Qurayyat', value: 'Qurayyat' },
  { name_ar: 'عرعر', name_en: 'Arar', value: 'Arar' },
  { name_ar: 'رفحاء', name_en: 'Rafha', value: 'Rafha' },
  { name_ar: 'طريف', name_en: 'Turaif', value: 'Turaif' },
  { name_ar: 'العويقيلة', name_en: 'Al-Uwayqilah', value: 'Al_Uwayqilah' },
];

export const Positions = [
  { name_ar: 'مدير عام', name_en: 'General Manager', value: 'general_manager' },
  { name_ar: 'مدير مبيعات', name_en: 'Sales Manager', value: 'sales_manager' },
  { name_ar: 'مدير تسويق', name_en: 'Marketing Manager', value: 'marketing_manager' },
  { name_ar: 'مدير موارد بشرية', name_en: 'HR Manager', value: 'hr_manager' },
  { name_ar: 'مدير مالي', name_en: 'Finance Manager', value: 'finance_manager' },
  { name_ar: 'مدير تقنية المعلومات', name_en: 'IT Manager', value: 'it_manager' },
  { name_ar: 'مهندس برمجيات', name_en: 'Software Engineer', value: 'software_engineer' },
  { name_ar: 'مطور ويب', name_en: 'Web Developer', value: 'web_developer' },
  { name_ar: 'مصمم جرافيك', name_en: 'Graphic Designer', value: 'graphic_designer' },
  { name_ar: 'أخصائي تسويق', name_en: 'Marketing Specialist', value: 'marketing_specialist' },
  { name_ar: 'مندوب مبيعات', name_en: 'Sales Representative', value: 'sales_representative' },
  { name_ar: 'أخصائي موارد بشرية', name_en: 'HR Specialist', value: 'hr_specialist' },
  { name_ar: 'محاسب', name_en: 'Accountant', value: 'accountant' },
  { name_ar: 'مسؤول علاقات عملاء', name_en: 'Customer Service Representative', value: 'customer_service' },
  { name_ar: 'مدير مشاريع', name_en: 'Project Manager', value: 'project_manager' },
  { name_ar: 'مهندس شبكات', name_en: 'Network Engineer', value: 'network_engineer' },
  { name_ar: 'محلل أعمال', name_en: 'Business Analyst', value: 'business_analyst' },
  { name_ar: 'مدير تشغيلي', name_en: 'Operations Manager', value: 'operations_manager' },
  { name_ar: 'مدير جودة', name_en: 'Quality Manager', value: 'quality_manager' },
  { name_ar: 'فني دعم', name_en: 'Support Technician', value: 'support_technician' },
  { name_ar: 'مدير تسويق رقمي', name_en: 'Digital Marketing Manager', value: 'digital_marketing_manager' },
  { name_ar: 'مختص SEO', name_en: 'SEO Specialist', value: 'seo_specialist' },
  { name_ar: 'مختص وسائل تواصل اجتماعي', name_en: 'Social Media Specialist', value: 'social_media_specialist' },
  { name_ar: 'مطور تطبيقات', name_en: 'Mobile App Developer', value: 'mobile_app_developer' },
  { name_ar: 'مدير منتج', name_en: 'Product Manager', value: 'product_manager' },
  { name_ar: 'مهندس أمن سيبراني', name_en: 'Cybersecurity Engineer', value: 'cybersecurity_engineer' },
  { name_ar: 'محلل بيانات', name_en: 'Data Analyst', value: 'data_analyst' },
  { name_ar: 'علم بيانات', name_en: 'Data Scientist', value: 'data_scientist' },
  { name_ar: 'مدير علاقات عامة', name_en: 'Public Relations Manager', value: 'pr_manager' },
  { name_ar: 'مدير مبيعات إقليمي', name_en: 'Regional Sales Manager', value: 'regional_sales_manager' },
];

const CONTROL =
  '!h-[48px] overflow-hidden rounded-[10px] !border !border-dashed !border-[rgba(130,170,200,0.55)] !bg-[rgba(1,12,22,0.5)] !border-b-[rgba(130,170,200,0.55)] px-3.5 text-[14px] text-white';
const SELECT =
  '!h-[48px] rounded-[10px] !border !border-dashed !border-[rgba(130,170,200,0.55)] !bg-[rgba(1,12,22,0.5)] !border-b-[rgba(130,170,200,0.55)] px-3.5 text-[14px] text-white';
const UPLOAD =
  '!h-[48px] overflow-hidden rounded-[10px] !border !border-dashed !border-[rgba(130,170,200,0.55)] !bg-[rgba(1,12,22,0.5)] px-3.5 text-[14px] text-[rgba(220,232,243,0.9)] [&_label]:!border-0 [&_label]:!border-b-0 [&_label]:h-full [&_label]:!px-0 [&_label]:!pb-0';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';
const CULTURE_ICON =
  'size-9 fill-none stroke-[#079bf7] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,145,255,0.65))] max-[600px]:size-[30px]';
const VALUE_ICON =
  'size-[42px] fill-none stroke-[#079bf8] stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_7px_rgba(0,143,255,0.75))]';
const TITLE_ACCENT =
  'bg-[linear-gradient(180deg,#1eb8ff,#0875ed)] bg-clip-text font-bold text-transparent';

function parseCultureItems(list, fallback) {
  if (Array.isArray(list) && list.length) {
    return list.map((item, index) => {
      if (item && typeof item === 'object') {
        return {
          title: item.title || `${index + 1}.`,
          body: item.content || item.description || item.body || '',
        };
      }
      const text = String(item || '').trim();
      const split = text.indexOf(':');
      if (split > 0 && split < 80) {
        return { title: `${index + 1}. ${text.slice(0, split).trim()}`, body: text.slice(split + 1).trim() };
      }
      return { title: `${index + 1}.`, body: text };
    });
  }
  return Array.isArray(fallback) ? fallback : [];
}

function FieldLabel({ children }) {
  return <span className='mb-2.5 flex items-center gap-2.5 text-[14px] font-medium text-white'>{children}</span>;
}

function LabelGlyph({ children }) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[17px] fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
      {children}
    </svg>
  );
}

function CultureIcon({ index }) {
  if (index === 1) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={CULTURE_ICON}>
        <path d='M8 52V40h10v12H8Z' />
        <path d='M27 52V29h10v23H27Z' />
        <path d='M46 52V15h10v37H46Z' />
        <path d='M8 29l13-10 11 6 18-16' />
        <path d='M46 9h10v10' />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={CULTURE_ICON}>
        <circle cx='32' cy='19' r='7' />
        <circle cx='17' cy='27' r='5' />
        <circle cx='47' cy='27' r='5' />
        <path d='M18 49c0-9 5-14 14-14s14 5 14 14' />
        <path d='M6 46c0-7 4-11 10-11 5 0 8 3 10 7' />
        <path d='M58 46c0-7-4-11-10-11-5 0-8 3-10 7' />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={CULTURE_ICON}>
        <path d='M32 53S10 40 10 24c0-8 5-13 12-13 5 0 9 3 10 7 1-4 5-7 10-7 7 0 12 5 12 13 0 16-22 29-22 29Z' />
        <path d='M20 28h8l3-7 4 14 3-7h7' />
      </svg>
    );
  }
  if (index === 4) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={CULTURE_ICON}>
        <circle cx='32' cy='32' r='23' />
        <path d='M9 32h46M32 9c7 7 10 15 10 23s-3 16-10 23M32 9c-7 7-10 15-10 23s3 16 10 23' />
        <path d='M13 19h38M13 45h38' />
      </svg>
    );
  }
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={CULTURE_ICON}>
      <path d='M32 8c-10 0-17 7-17 17 0 7 4 11 8 15v7h18v-7c4-4 8-8 8-15 0-10-7-17-17-17Z' />
      <path d='M25 53h14M27 59h10' />
      <path d='M32 17v17M25 27h14' />
    </svg>
  );
}

function ValueIcon({ index }) {
  if (index === 0) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={VALUE_ICON}>
        <circle cx='32' cy='17' r='7' />
        <circle cx='17' cy='25' r='5' />
        <circle cx='47' cy='25' r='5' />
        <path d='M18 48c0-9 5-14 14-14s14 5 14 14' />
        <path d='M6 46c0-7 4-11 10-11 5 0 8 3 10 7' />
        <path d='M58 46c0-7-4-11-10-11-5 0-8 3-10 7' />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox='0 0 64 64' aria-hidden='true' className={VALUE_ICON}>
        <path d='M8 52V40h10v12H8Z' />
        <path d='M27 52V29h10v23H27Z' />
        <path d='M46 52V15h10v37H46Z' />
        <path d='M8 29l13-10 11 6 18-16' />
      </svg>
    );
  }
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={VALUE_ICON}>
      <path d='M19 34l-8-8c-3-3-3-7 0-10s7-3 10 0l11 11' />
      <path d='M45 34l8-8c3-3 3-7 0-10s-7-3-10 0L32 27' />
      <path d='M23 29l9 9 9-9' />
      <path d='M20 38l7 7c3 3 7 3 10 0l7-7' />
    </svg>
  );
}

export default function WhyChooseUs({
  data,
  register,
  errors,
  trigger,
  setValue,
  watch,
  submit,
  loading,
  onViewLess,
}) {
  const t = useTranslations('JoinUs');
  const tRoot = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const cmsBlock = data?.list_Object?.[locale]?.[0];
  const cultureTitle = cmsBlock?.title || t('ourCulture');
  const cultureItems = parseCultureItems(cmsBlock?.list, t.raw('cultureItems'));
  const heading = t('whyChooseTitle');
  const parts = heading.trim().split(/\s+/);
  const lead = parts.length <= 1 ? '' : parts.slice(0, -1).join(' ');
  const accent = parts.length <= 1 ? heading : parts[parts.length - 1];
  const values = t.raw('valueItems') || [];
  const applyParts = t('applyNow').trim().split(/\s+/);
  const applyLead = applyParts.slice(0, -1).join(' ');
  const applyAccent = applyParts[applyParts.length - 1] || t('applyNow');

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className={`relative bg-transparent text-white ${bodyFont}`}>
      <div className='mx-auto grid w-full grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] items-start gap-12 max-[1200px]:gap-9 max-[900px]:grid-cols-1 max-[900px]:gap-8'>
        <div className='min-w-0 pt-2'>
          <div className={`mb-5 flex items-center gap-[18px] text-[13px] font-medium text-[#079cf4] max-[600px]:mb-4 max-[600px]:gap-[10px] max-[600px]:text-[9px] ${isAr ? 'tracking-[3px]' : 'tracking-[5px] max-[600px]:tracking-[3px]'}`}>
            <span className='block h-px w-[48px] bg-[#71cfff] max-[600px]:w-[28px]' />
            {t('careersEyebrow')}
            <span className='block h-px w-[52px] bg-[#71cfff] max-[600px]:w-[28px]' />
          </div>

          <h2 className='m-0 text-[clamp(42px,3.8vw,68px)] font-bold leading-[0.95] tracking-[-2px] max-[600px]:text-[36px]'>
            {lead ? (
              <>
                {lead}{' '}
              </>
            ) : null}
            <strong className={TITLE_ACCENT}>{accent}</strong>
          </h2>

          {values.length ? (
            <div className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 max-[600px]:mt-5 max-[600px]:gap-x-4 max-[600px]:gap-y-3'>
              {values.map((lines, index) => (
                <div key={`${lines[0]}-${index}`} className='flex min-w-[120px] items-center gap-3'>
                  <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,rgba(8,139,239,0.24),rgba(0,44,83,0.35))] shadow-[inset_0_0_12px_rgba(0,128,255,0.12)]'>
                    <ValueIcon index={index} />
                  </div>
                  <strong className='text-[14px] font-medium leading-[1.35] text-[rgba(245,249,255,0.95)] max-[600px]:text-[13px]'>
                    {lines[0]}
                    {lines[1] ? (
                      <>
                        <br />
                        {lines[1]}
                      </>
                    ) : null}
                  </strong>
                </div>
              ))}
            </div>
          ) : null}

          <h3 className='mb-4 mt-9 text-[24px] font-bold leading-none max-[600px]:mt-7 max-[600px]:mb-3 max-[600px]:text-[20px]'>{cultureTitle}</h3>
          <div className='flex flex-col gap-4'>
            {cultureItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className='grid grid-cols-[64px_1fr] items-start gap-3 max-[600px]:grid-cols-[52px_1fr] max-[600px]:gap-2.5'>
                <div className='flex size-[56px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,rgba(8,139,239,0.24),rgba(0,44,83,0.35))] shadow-[inset_0_0_12px_rgba(0,128,255,0.12)] max-[600px]:size-12'>
                  <CultureIcon index={index} />
                </div>
                <div className='min-w-0 pt-1'>
                  <h4 className='mb-1.5 text-[16px] font-semibold leading-[1.3] max-[600px]:text-[14px]'>{item.title}</h4>
                  {item.body ? (
                    <p className='m-0 text-[14px] leading-[1.5] text-[rgba(225,235,246,0.88)] max-[600px]:text-[12px]'>{item.body}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={event => {
            event.preventDefault();
            submit?.();
          }}
          className='min-w-0 rounded-[20px] border border-[rgba(55,134,187,0.55)] bg-[linear-gradient(100deg,rgba(1,20,35,0.92),rgba(2,24,42,0.88))] px-8 pb-8 pt-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_8px_30px_rgba(0,0,0,0.22)] max-[600px]:px-5 max-[600px]:pb-6 max-[600px]:pt-5'
        >
          <h3 className='m-0 mb-7 text-[34px] leading-none tracking-[-0.6px] max-[600px]:mb-5 max-[600px]:text-[28px]'>
            {applyLead ? `${applyLead} ` : ''}
            <strong className='font-bold text-[#0c91f4]'>{applyAccent}</strong>
          </h3>

          <div className='grid grid-cols-2 gap-x-5 gap-y-5 max-[600px]:grid-cols-1 max-[600px]:gap-y-4'>
            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <circle cx='12' cy='8' r='4' />
                  <path d='M4 21c0-5 3-8 8-8s8 3 8 8' />
                </LabelGlyph>
                {t('fullName')}
              </FieldLabel>
              <Input register={register('name')} error={errors?.name} type='text' KEY='fullName' cnInput={CONTROL} place={t('fullName')} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <rect x='4' y='4' width='16' height='16' rx='2' />
                  <path d='M8 8h8M8 12h5M8 16h7' />
                </LabelGlyph>
                {t('national_id')}
              </FieldLabel>
              <InputNational register={register} error={errors?.national_id} KEY='national_id' cnInput={CONTROL} place={t('national_id')} setValue={setValue} trigger={trigger} watch={watch} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <path d='M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z' />
                  <circle cx='12' cy='9' r='2' />
                </LabelGlyph>
                {t('city')}
              </FieldLabel>
              <SelectValue data={Cities} place={t('selectCity')} trigger={trigger} watch={watch} setValue={setValue} error={errors?.city} KEY='city' valueField='value' displayField={locale === 'ar' ? 'name_ar' : 'name_en'} cnSelect={SELECT} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <rect x='5' y='7' width='14' height='13' rx='2' />
                  <path d='M9 7V5h6v2' />
                </LabelGlyph>
                {t('offers_name')}
              </FieldLabel>
              <SelectValue data={Positions} place={t('selectPosition')} trigger={trigger} watch={watch} setValue={setValue} error={errors?.offers_name} KEY='offers_name' valueField='value' displayField={locale === 'ar' ? 'name_ar' : 'name_en'} cnSelect={SELECT} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <rect x='4' y='5' width='16' height='14' rx='2' />
                  <path d='M4 9h16' />
                  <path d='M8 3v4M16 3v4' />
                </LabelGlyph>
                {t('email')}
              </FieldLabel>
              <Input register={register('email')} error={errors?.email} type='email' KEY='email' cnInput={CONTROL} place={t('email')} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <path d='M6 4h12v16H6z' />
                  <path d='M9 2h6v4H9z' />
                </LabelGlyph>
                {t('phoneNumber')}
              </FieldLabel>
              <Input
                register={register('phone', { required: 'phoneRequired', pattern: { value: /^05[0-9]{8}$/, message: 'phoneInvalid' } })}
                error={errors?.phone}
                type='tel'
                KEY='phone'
                cnInput={CONTROL}
                place={t('phoneNumber')}
                onBlur={() => trigger('phone')}
              />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <circle cx='12' cy='12' r='8' />
                  <path d='M12 7v5l3 2' />
                </LabelGlyph>
                {t('offers_price')}
              </FieldLabel>
              <Input register={register('offers_price')} error={errors?.offers_price} type='number' KEY='offers_price' cnInput={CONTROL} place={t('offers_price')} />
            </div>

            <div className='min-w-0'>
              <FieldLabel>
                <LabelGlyph>
                  <circle cx='12' cy='8' r='4' />
                  <path d='M4 21c0-5 3-8 8-8s8 3 8 8' />
                </LabelGlyph>
                {t('personalPhoto')}
              </FieldLabel>
              <UploadFileField setValue={setValue} watch={watch} trigger={trigger} error={errors?.personal_photo} KEY='personal_photo' cn={UPLOAD} place={t('uploadPhoto')} optional accept='image/*' maxSize={5} />
            </div>

            <div className='col-span-2 min-w-0 max-[600px]:col-span-1'>
              <FieldLabel>
                <LabelGlyph>
                  <path d='M6 3h9l4 4v14H6z' />
                  <path d='M14 3v5h5' />
                  <path d='M9 13h6M9 17h6' />
                </LabelGlyph>
                {t('uploadCV')}
              </FieldLabel>
              <UploadFile setValue={setValue} watch={watch} trigger={trigger} error={errors?.CV} KEY='CV' cn={UPLOAD} accept='application/pdf' place={t('uploadCV')} />
            </div>
          </div>

          <div className='mt-9 flex items-center justify-end gap-4 max-[600px]:mt-6 max-[600px]:flex-col-reverse max-[600px]:items-stretch'>
            <button
              type='button'
              onClick={onViewLess}
              className={`${FOCUS} h-[52px] min-w-[170px] rounded-[26px] border border-white/80 bg-transparent px-5 text-[15px] text-white transition duration-[250ms] hover:-translate-y-0.5 motion-reduce:transition-none max-[600px]:w-full`}
            >
              {t('viewLess')}
            </button>
            <button
              type='submit'
              disabled={loading}
              className={`${FOCUS} flex h-[52px] min-w-[190px] items-center justify-center gap-2.5 rounded-[26px] border-0 bg-[linear-gradient(105deg,#078ff2,#0864e7)] px-5 text-[15px] text-white shadow-[0_0_16px_rgba(0,137,255,0.25)] transition duration-[250ms] hover:-translate-y-0.5 disabled:opacity-50 motion-reduce:transition-none max-[600px]:w-full`}
            >
              <svg viewBox='0 0 24 24' aria-hidden='true' className='size-[18px] fill-none stroke-white stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]'>
                <path d='M3 20l18-8L3 4l3 8-3 8Z' />
                <path d='M6 12h15' />
              </svg>
              {loading ? tRoot('loading') : t('sendNow')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
