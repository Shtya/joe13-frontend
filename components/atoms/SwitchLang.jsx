import { useRouter , usePathname } from '@/navigation'
import { Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

export default function SwitchLang({cn}) {
	const t = useTranslations()
	const locale = useLocale()

	const pathname  = usePathname()
	const router = useRouter()

	const handleLanguageChange = (language) => {
		router.push(pathname, { locale: language });
	};


  return (
	<div onClick={()=> handleLanguageChange(locale == "ar" ? "en" : "ar") } className="flex items-center gap-[5px] cursor-pointer uppercase group transition-all duration-300 " >
		<Globe className={`${cn} group-hover:text-primary duration-300 `} />
		<span className={` ${cn} group-hover:text-primary duration-300`} > {locale == "en" ? "AR" : "EN"} </span>
	</div>
  )
}
