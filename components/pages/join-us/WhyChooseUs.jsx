'use client';
import Input from '@/components/atoms/input/Input';
import UploadFile from '@/components/atoms/input/UploadFile';
import Select from '@/components/atoms/select/Select';
import TextSlide from '@/helpers/TextSlide';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';



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



export default function WhyChooseUs({ data, register, errors, trigger, setValue, watch }) {
    const t = useTranslations('JoinUs');
    const locale = useLocale();

    return (
        <div className='w-screen'>
            <div className='container  md:!px-[40px] '>
                <TextSlide cnParent={`w-fit ltr:mr-auto rtl:ml-auto`} cn={` text-left w-full text-[35px] max-md:text-[25px] text-white font-[700] `} text={data?.list_Object?.[locale]?.[0]?.title} />

                <ul className={` mx-auto !px-[10px] md:!px-[35px] list-decimal flex flex-col gap-[10px] mt-[30px] `}>
                    {data?.list_Object?.[locale]?.[0]?.list?.map((item, index) => (
                        <li key={index} className='text-white  opacity-70 text-lg max-md:text-base mb-[10px] font-[500] w-fit '>
                            <TextSlide text={item} />
                        </li>
                    ))}
                </ul>

                <TextSlide cnParent={`mt-[60px] w-fit ltr:mr-auto rtl:ml-auto mb-[30px] `} cn={` text-left   text-[35px] max-md:text-[25px] text-white font-[700] `} text={t('applyNow')} />

                <form className={` pb-[100px] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-y-[40px] gap-x-[60px]  `}>
                    <Input register={register('name')} error={errors?.name} type={'text'} KEY={'fullName'} cnInput={''} label={''} place={t('fullName')} />
                    <Input register={register('phone')} error={errors?.phone} type={'email'} KEY={'phone'} cnInput={''} label={''} place={t('phoneNumber')} />
                    <Select data={Cities} icon={true} place={t('city')} trigger={trigger} watch={watch} setValue={setValue} error={errors?.city} KEY={'city'} />
                    <Input register={register('email')} error={errors?.email} type={'text'} KEY={'email'} cnInput={''} label={''} place={t('email')} />

                    <Input register={register('offers_name')} error={errors?.offers_name} type={'text'} KEY={'offers_name'} cnInput={''} label={''} place={t('offers_name')} />
                    <Input register={register('offers_price')} error={errors?.offers_price} type={'text'} KEY={'offers_price'} cnInput={''} label={''} place={t('offers_price')} />

                    <UploadFile setValue={setValue} watch={watch} trigger={trigger} error={errors?.CV} KEY={'CV'} cnInput={''} label={''} place={t('uploadCV')} />
                </form>
            </div>
        </div>
    );
}
