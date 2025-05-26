"use client"
import TextSlide from '@/helpers/TextSlide';
import { ArrowBigLeftDash } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React , {useState , useEffect} from 'react';

export default function Blog({ data , setcategory }) {
	const [effect , seteffect] = useState("fade-up")

    const locale = useLocale()

    return (
        <div style={{direction : "ltr"}} data-aos={effect} className={` py-[40px]`}>
            <TextSlide cnParent={'mt-[20px] w-fit mx-auto mb-[30px] '} cn={`   text-center font-[700]  w-full max-md:text24 text40 `} text={data?.[`title_${locale}`]} />
            <Image className="mx-auth max-w-[600px] w-full " src={data?.images[0].image} alt={""} width={800} height={500}  />
            <TextSlide cnParent={"mt-[30px] mb-[40px] "} cn={` text-center w-full text18  text-balance`} text={data?.[`article_${locale}`]} />

            <button onClick={()=> setcategory(null) } data-aos='zoom-in' className=' hover:opacity-80 hover:bg-primary hover:text-white hover:border-primary duration-300 w-[50px] h-[50px] border-[2px] rounded-[50%] border-primary  text-primary   flex justify-center items-center p-[8px] !cursor-pointer '>
                            <ArrowBigLeftDash className=' w-full h-full' />
                        </button>

            {/* <ul className={` mx-auto md:px-[20px] !mt-[60px] flex-col flex gap-[20px] list-disc  `}>
                {storeData?.list?.map((item, index) => (
                    <li key={index} className='text-white  text20 mb-[10px] font-[500] w-fit '>
                        <TextSlide text={item} />
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
