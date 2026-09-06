import { useRouter, usePathname } from '@/navigation'
import { useLocale } from 'next-intl'
import React from 'react'

export default function SwitchLang({cn}) {
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const handleLanguageChange = () => {
		router.push(pathname, { locale: locale == 'ar' ? 'en' : 'ar' });
	};

  return (
	<button
		type='button'
		onClick={handleLanguageChange}
		aria-label={locale === 'ar' ? 'تغيير اللغة' : 'Change language'}
		className='group flex min-h-11 items-center gap-2 bg-transparent p-0 font-inter text-base font-normal uppercase transition-colors duration-300 max-md:gap-1.5 max-md:text-sm'
	>
		<svg viewBox='0 0 24 24' aria-hidden='true' className={`h-6 w-6 fill-none stroke-current stroke-[1.7] duration-300 group-hover:text-primary max-md:h-[21px] max-md:w-[21px] ${cn}`}>
			<circle cx='12' cy='12' r='9.25'></circle>
			<path d='M2.75 12h18.5'></path>
			<path d='M12 2.75c2.65 2.55 4.05 5.63 4.05 9.25S14.65 18.7 12 21.25'></path>
			<path d='M12 2.75C9.35 5.3 7.95 8.38 7.95 12S9.35 18.7 12 21.25'></path>
		</svg>
		<span className={`duration-300 group-hover:text-primary ${cn}`}>{locale == 'en' ? 'AR' : 'EN'}</span>
	</button>
  )
}
