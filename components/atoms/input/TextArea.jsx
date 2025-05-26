import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'


export default function TextArea({ unite , place , dataAos , rounded=true , error , cnInput , classname , label , type , icon , KEY , register , cnLabel}) {
  const t = useTranslations()


	return (
	<div data-aos={dataAos} className={`${classname} flex flex-col  gap-[5px]  relative `} >
		{label && <label htmlFor={KEY} className={`h5 ${cnLabel}`} > {label} </label> }
		<div className={`border-b-[#BCBBBF] pointer-events-none  w-full   overflow-hidden  border-b-[1px] relative  h-[80px]  ${cnInput} `} >
			<textarea className={` p-[10px] pointer-events-auto  placeholder:text-[#9ca3af] text16 w-full h-full outline-none  bg-transparent `} {...register} id={KEY} placeholder={place} />
		</div>
		{error && <div className='error absolute  ' > {t(error?.message)} </div>}
	</div>
  )
}
