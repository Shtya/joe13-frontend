
import Title from '@/components/atoms/Title';
import { baseImage } from '@/helpers/baseUrl';
import EffectFixed from '@/helpers/EffectFixed';
import { useLocale } from 'next-intl';

export default function Section4({data , loading}) {
    const locale = useLocale()
    
    return (
        <EffectFixed loading={loading} image={baseImage(data?.image.url)} alt={data?.image?.alt} >

            <Title  cn={"text-[40px] max-md:text-[25px] text-balance !px-[20px] font-[600] text-white text-center"} title={data?.title?.[locale]} />
           
        </EffectFixed>
    );
}

