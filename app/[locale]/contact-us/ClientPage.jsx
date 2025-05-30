"use client"
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/input/Input';
import TextArea from '@/components/atoms/input/TextArea'; 
import Title from '@/components/atoms/Title';
import EffectFixed from '@/helpers/EffectFixed';
import { hookContactUs } from '@/hooks/hookContactUs';
import { usePages } from '@/hooks/usePages';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';



export default function page() {
    const t = useTranslations('ContactUs');
    const { register, errors , loading , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookContactUs() 
    
    const { loading: loading_section, data } = usePages({ page_name: 'contact-us' });
    const section1 = data?.sections?.find(e => e.id == 'sec1');
    
    const locale = useLocale()
    
    return (
        <EffectFixed image={'/assets/imgs/contactus.png'}>
            <Title cnLoading="ltr:mr-auto rtl:ml-auto h-[50px] " cn="ltr:text-left rtl:text-right w-full text40 font-[600]" title={section1?.title?.[locale]} loading={loading_section} />
            <Title cnLoading="ltr:mr-auto rtl:ml-auto !w-[300px]  mb-[30px] " delay={100} cn="ltr:text-left rtl:text-right w-full text24 font-[400] mb-[30px] " title={section1?.content?.[locale]} loading={loading_section} />

                    <div className="w-full z-[10000000] relative  ">
                        <form data-aos="fade-up" data-aos-delay={200} className={`grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-y-[30px] gap-x-[60px]  `} >
                            <Input  register={register("name")}        error={errors?.name}        type={"text"}  KEY={"fullName"}        cnInput={""}  label={""} place={t("fullName")} />
                            <Input  register={register("phone")}           error={errors?.phone}           type={"email"} KEY={"phone"}           cnInput={""}  label={""} place={t("phoneNumber")} />
                            <Input  register={register("email")}           error={errors?.email}           type={"text"}  KEY={"email"}           cnInput={""}  label={""} place={t("email")} />
                            <TextArea  register={register("message")}           error={errors?.message}     cnInput={""}  label={""} place={t("message")} />
                            
                        </form>
                        <div data-aos="fade-up" data-aos-delay={300} onClick={submit} > <Button disabled={loading} loading={loading} name={t("send")} borderAll={true}  cn={" mt-[40px]   "} /> </div>
                    </div>
				
        </EffectFixed>
    );
}
