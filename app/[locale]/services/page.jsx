"use client"
import Filter from '@/components/pages/services/Filter'
import { serviceDummy } from '@/data/Data';
import EffectFixed from '@/helpers/EffectFixed';
import { hookServices } from '@/hooks/hookServices';
import { useLocale, useTranslations } from 'next-intl';
import React , {useState} from 'react';

export default function page() {
    const t = useTranslations('Services');
    const locale = useLocale();
    const [category, setcategory] = useState();
    const {  loading , services } = hookServices()


    return (
        <EffectFixed cn={category?.image ? "opacity-20" : ""} image={category?.image || '/assets/imgs/services.png'}>
            {
                category 
                ? <div  className={'w-fit mx-auto  text-primary text-center font-[700]  max-md:text24 text40 '} > {category?.[`name_${locale}`]} </div>
                : <>
                    <div data-aos={category == null && "fade-down"} className={'w-fit mx-auto mb-[10px] text-center font-[700]  max-md:text24 text40 '} > {t("projectsTitle")} </div>
                    <div data-aos={category == null && "fade-down"} className={` text-center  w-full text20  text-balance`} > {t("projectsDescription")} </div>
                </>
            }
            <Filter skeltonCount={6} showItem={true} services={services}  loading={loading}  setcategory={setcategory} />
        </EffectFixed>
    );
}
