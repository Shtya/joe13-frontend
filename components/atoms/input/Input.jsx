import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'


export default function Input({ place , dataAos , error , cnInput , cn , label , type , icon , KEY , register , cnLabel}) {
  const t = useTranslations()


	return (
	<div data-aos={dataAos} className={`${cn}  flex flex-col  gap-[5px] relative `} >
		{label && <label htmlFor={KEY} className={`text16 ${cnLabel}`} > {label} </label> }
		
		<div className={`border-b-[#BCBBBF] pointer-events-none  w-full  overflow-hidden  border-b-[1px] relative  h-[45px]  ${cnInput} `} >
			<input className={` pointer-events-auto placeholder:capitalize focus:border-primary1  text16 w-full ${icon ? "rtl:pr-[40px] ltr:pl-[40px]" : "px-[10px]" } bg-transparent  h-full outline-none  `} {...register} id={KEY} placeholder={place} type={type} />
			{icon && <Image className='absolute rtl:right-[10px] ltr:left-[10px] top-[50%] translate-y-[-50%] '  src={icon} alt="" width={20} height={20} /> }

		</div>
		{error && <div className='error absolute  ' > {t(error?.message)} </div>}
	</div>
  )
}
