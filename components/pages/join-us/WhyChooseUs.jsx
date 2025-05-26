'use client';
import Input from '@/components/atoms/input/Input';
import UploadFile from '@/components/atoms/input/UploadFile';
import Select from '@/components/atoms/select/Select';
import { Cities } from '@/data/Data';
import TextSlide from '@/helpers/TextSlide';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

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
