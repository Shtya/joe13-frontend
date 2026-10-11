'use client';

import Input from '@/components/atoms/input/Input';
import InputNational from '@/components/atoms/input/InputNational';
import UploadFile from '@/components/atoms/input/UploadFile';
import UploadFileField from '@/components/atoms/input/UploadFileField';
import SelectValue from '@/components/atoms/select/SelectValue';
import { JxButton } from '@/components/jx/primitives';
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

/*
 * The application sheet — why JOE13 on the reading side (values as silver
 * rings, the culture as a list on hairlines) and the application plate on
 * the other. The legacy input atoms keep their bindings and validation;
 * `.jx-form` re-skins them (see joe-system.css → Forms).
 */
const CONTROL = 'jx-control';
const UPLOAD = 'jx-upload';

function parseCultureItems(list, fallback) {
  const source = Array.isArray(list) && list.length ? list : Array.isArray(fallback) ? fallback : [];
  return source.map(item => {
    if (item && typeof item === 'object') {
      return { title: stripIndex(item.title || ''), body: item.content || item.description || item.body || '' };
    }
    const text = String(item || '').trim();
    const split = text.indexOf(':');
    if (split > 0 && split < 80) return { title: stripIndex(text.slice(0, split)), body: text.slice(split + 1).trim() };
    return { title: '', body: text };
  });
}

/* "1. Innovation" → "Innovation": the culture is a set, not a sequence */
function stripIndex(title) {
  return String(title).replace(/^\s*\d+\s*[.)\-–]\s*/, '').trim();
}

function FieldLabel({ htmlFor, icon, children }) {
  const Tag = htmlFor ? 'label' : 'span';
  return (
    <Tag htmlFor={htmlFor} className='jx-label'>
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        {icon}
      </svg>
      {children}
    </Tag>
  );
}

function Ring({ children, size = 'size-14' }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] [&_svg]:size-[26px]`}>
      <svg viewBox='0 0 32 32' aria-hidden='true' className='fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]'>
        {children}
      </svg>
    </span>
  );
}

const VALUE_ICONS = [
  <>
    <circle cx='16' cy='10' r='4' />
    <circle cx='7.5' cy='13' r='3' />
    <circle cx='24.5' cy='13' r='3' />
    <path d='M9.5 25c0-4.4 2.6-7 6.5-7s6.5 2.6 6.5 7' />
  </>,
  <>
    <path d='M4 27h24' />
    <path d='M7 27v-6M13 27v-10M19 27v-8M25 27V10' />
    <path d='m6 15 7-6 6 4 8-8' />
  </>,
  <>
    <circle cx='16' cy='16' r='12' />
    <circle cx='16' cy='16' r='7' />
    <circle cx='16' cy='16' r='2' />
  </>,
];

const CULTURE_ICONS = [
  <>
    <path d='M16 4c-5 0-8.5 3.6-8.5 8.4 0 3.3 1.9 5.4 3.8 7.2V23h9.4v-3.4c1.9-1.8 3.8-3.9 3.8-7.2C24.5 7.6 21 4 16 4Z' />
    <path d='M12.5 27h7' />
  </>,
  <>
    <path d='M4 27h24' />
    <path d='M7 27v-6M13 27v-10M19 27v-8M25 27V10' />
    <path d='M22 5h5v5M27 5l-8 8' />
  </>,
  <>
    <circle cx='16' cy='10' r='4' />
    <circle cx='7.5' cy='13' r='3' />
    <circle cx='24.5' cy='13' r='3' />
    <path d='M9.5 25c0-4.4 2.6-7 6.5-7s6.5 2.6 6.5 7' />
  </>,
  <>
    <circle cx='16' cy='16' r='11' />
    <path d='M16 5v22M5 16h22' />
    <path d='M16 5c3.5 3 5 6.7 5 11s-1.5 8-5 11M16 5c-3.5 3-5 6.7-5 11s1.5 8 5 11' />
  </>,
  <>
    <path d='M16 27S5 20.5 5 12.5C5 8.6 7.6 6 11 6c2.4 0 4.3 1.4 5 3.4C16.7 7.4 18.6 6 21 6c3.4 0 6 2.6 6 6.5C27 20.5 16 27 16 27Z' />
  </>,
];

export default function WhyChooseUs({ data, register, errors, trigger, setValue, watch, submit, loading, onViewLess }) {
  const t = useTranslations('JoinUs');
  const tRoot = useTranslations();
  const locale = useLocale();
  const cmsBlock = data?.list_Object?.[locale]?.[0];
  const cultureTitle = cmsBlock?.title || t('ourCulture');
  const cultureItems = parseCultureItems(cmsBlock?.list, t.raw('cultureItems'));
  const values = t.raw('valueItems') || [];
  const display = locale === 'ar' ? 'name_ar' : 'name_en';

  return (
    <div className='jx-sheet-body grid w-full items-start gap-x-[clamp(32px,5vw,88px)] gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'>
      {/* Why JOE13 */}
      <div className='min-w-0 text-start'>
        <h2 className='jx-display m-0 text-[length:var(--jx-fs-3xl)] font-[700] leading-[1.25] text-white'>
          <span className='jx-accent'>{t('whyChooseTitle')}</span>
        </h2>

        {values.length ? (
          <ul className='m-0 mt-8 grid list-none grid-cols-3 gap-4 p-0'>
            {values.map((pair, index) => (
              <li key={`${pair[0]}-${index}`} className='flex flex-col items-start gap-3'>
                <Ring>{VALUE_ICONS[index] || VALUE_ICONS[0]}</Ring>
                <span className='jx-display text-[14.5px] font-[700] leading-[1.45] text-[var(--jx-platinum)]'>
                  {pair[0]}
                  {pair[1] ? <span className='block font-[400] text-[var(--jx-text-2)]'> {pair[1]}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className='jx-display m-0 mt-10 text-[20px] font-[700] text-[var(--jx-platinum)]'>{cultureTitle}</h3>
        <ul className='m-0 mt-3 list-none p-0'>
          {cultureItems.map((item, index) => (
            <li key={`${item.title}-${index}`} className='flex items-start gap-4 border-b border-[var(--jx-line)] py-4 last:border-b-0'>
              <Ring size='size-11'>{CULTURE_ICONS[index % CULTURE_ICONS.length]}</Ring>
              <div className='min-w-0'>
                {item.title ? <h4 className='m-0 text-[15.5px] font-[700] leading-[1.5] text-[var(--jx-platinum)]'>{item.title}</h4> : null}
                {item.body ? <p className='m-0 mt-1 text-[14px] leading-[1.75] text-[var(--jx-text-3)]'>{item.body}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Application plate */}
      <form
        onSubmit={event => {
          event.preventDefault();
          submit?.();
        }}
        noValidate
        aria-labelledby='apply-heading'
        className='jx-form relative min-w-0 rounded-[24px] bg-[rgba(255,255,255,0.02)] p-[clamp(20px,2.6vw,40px)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)]'
      >
        <span aria-hidden='true' className='pointer-events-none absolute inset-x-10 top-0 h-px bg-[image:var(--jx-chrome)] opacity-60' />
        <h2 id='apply-heading' className='jx-display m-0 text-[clamp(1.5rem,1.1rem+1.2vw,2.2rem)] font-[700] leading-[1.3] text-[var(--jx-platinum)]'>
          {t('applyNow')}
        </h2>

        <div className='mt-7 grid gap-x-4 gap-y-6 sm:grid-cols-2'>
          <div className='min-w-0'>
            <FieldLabel htmlFor='fullName' icon={<><circle cx='12' cy='8' r='3.6' /><path d='M5 20c0-3.8 2.9-6.2 7-6.2s7 2.4 7 6.2' /></>}>
              {t('fullName')}
            </FieldLabel>
            <Input register={register('name')} error={errors?.name} type='text' KEY='fullName' cnInput={CONTROL} place={t('fullName')} />
          </div>

          <div className='min-w-0'>
            <FieldLabel htmlFor='national_id' icon={<><rect x='3.5' y='5' width='17' height='14' rx='2' /><circle cx='9' cy='11' r='2' /><path d='M6 16c.6-1.6 1.6-2.4 3-2.4s2.4.8 3 2.4M14.5 10h3M14.5 13.5h3' /></>}>
              {t('national_id')}
            </FieldLabel>
            <InputNational register={register} error={errors?.national_id} KEY='national_id' cnInput={CONTROL} place={t('national_id')} setValue={setValue} trigger={trigger} watch={watch} />
          </div>

          <div className='relative z-[3] min-w-0'>
            <FieldLabel icon={<><path d='M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z' /><circle cx='12' cy='9.5' r='2.4' /></>}>{t('city')}</FieldLabel>
            <SelectValue data={Cities} place={t('selectCity')} trigger={trigger} watch={watch} setValue={setValue} error={errors?.city} KEY='city' valueField='value' displayField={display} cnSelect={CONTROL} />
          </div>

          <div className='relative z-[2] min-w-0'>
            <FieldLabel icon={<><rect x='4' y='7.5' width='16' height='12.5' rx='2' /><path d='M9 7.5V5.5h6v2M4 12.5h16' /></>}>{t('offers_name')}</FieldLabel>
            <SelectValue data={Positions} place={t('selectPosition')} trigger={trigger} watch={watch} setValue={setValue} error={errors?.offers_name} KEY='offers_name' valueField='value' displayField={display} cnSelect={CONTROL} />
          </div>

          <div className='min-w-0'>
            <FieldLabel htmlFor='email' icon={<><rect x='3.5' y='5.5' width='17' height='13' rx='2' /><path d='m4.5 7 7.5 5.5L19.5 7' /></>}>
              {t('email')}
            </FieldLabel>
            <Input register={register('email')} error={errors?.email} type='email' KEY='email' cnInput={CONTROL} place='name@company.com' />
          </div>

          <div className='min-w-0'>
            <FieldLabel htmlFor='phone' icon={<path d='M6.7 3.8 9.5 3c.7-.2 1.4.2 1.7.8l1.4 3.4c.2.6.1 1.3-.4 1.7L10.6 10c1.2 2.3 3 4.2 5.4 5.4l1.1-1.6c.4-.5 1.1-.7 1.7-.4l3.4 1.4c.6.3 1 .9.8 1.7l-.8 2.8c-.2.7-.8 1.2-1.5 1.2C10.7 20.5 3.5 13.3 3.5 4.3c0-.7.5-1.3 1.2-1.5Z' />}>
              {t('phoneNumber')}
            </FieldLabel>
            <Input
              register={register('phone', { required: 'phoneRequired', pattern: { value: /^05[0-9]{8}$/, message: 'phoneInvalid' } })}
              error={errors?.phone}
              type='tel'
              KEY='phone'
              cnInput={CONTROL}
              place='05XXXXXXXX'
              onBlur={() => trigger('phone')}
            />
          </div>

          <div className='min-w-0'>
            <FieldLabel htmlFor='offers_price' icon={<><circle cx='12' cy='12' r='8.5' /><path d='M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.6.8-2.6 2s1.1 1.6 2.6 2 2.6.8 2.6 2-1.1 2-2.6 2c-1.1 0-2-.4-2.5-1.2M12 6.5V8M12 16v1.5' /></>}>
              {t('offers_price')}
            </FieldLabel>
            <Input register={register('offers_price')} error={errors?.offers_price} type='number' KEY='offers_price' cnInput={CONTROL} place={t('offers_price')} />
          </div>

          <div className='min-w-0'>
            <FieldLabel icon={<><rect x='3.5' y='5' width='17' height='14' rx='2' /><circle cx='12' cy='11' r='3' /><path d='M7 19c.8-2 2.6-3.2 5-3.2s4.2 1.2 5 3.2' /></>}>{t('personalPhoto')}</FieldLabel>
            <UploadFileField setValue={setValue} watch={watch} trigger={trigger} error={errors?.personal_photo} KEY='personal_photo' cn={UPLOAD} place={t('uploadPhoto')} optional accept='image/*' maxSize={5} />
          </div>

          <div className='min-w-0 sm:col-span-2'>
            <FieldLabel icon={<><path d='M6 3h9l4 4v14H6z' /><path d='M14 3v5h5' /><path d='M9 13h6M9 17h6' /></>}>{t('uploadCV')}</FieldLabel>
            <UploadFile setValue={setValue} watch={watch} trigger={trigger} error={errors?.CV} KEY='CV' cn={UPLOAD} accept='application/pdf' place={t('uploadCV')} />
          </div>
        </div>

        <div className='mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--jx-line)] pt-7 max-sm:flex-col-reverse max-sm:items-stretch'>
          <button
            type='button'
            onClick={onViewLess}
            className='text-[14px] text-[var(--jx-text-2)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:py-2'
          >
            {t('viewLess')}
          </button>
          <JxButton type='submit' disabled={loading} aria-busy={loading || undefined} motion={false} className='disabled:pointer-events-none disabled:opacity-60 max-sm:justify-between'>
            {loading ? tRoot('loading') : t('sendNow')}
          </JxButton>
        </div>
      </form>
    </div>
  );
}
