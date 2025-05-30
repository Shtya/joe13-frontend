'use client';

import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Button({ btnStyle ="btn-blue btn-blue-3d " , cn, loading , disabled , name, onClick, borderAll, href, color }) {
    const router = useRouter();

    return (
        <button
		disabled={disabled}
		className={`${btnStyle}  max-md:!h-[40px] max-md:!text-base max-md:!min-w-[150px] ${cn} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
		onClick={() => onClick?.() || (href && router.push(href))}

		>
		{loading ? <Loading /> : name}
		</button>

    );
}

function Loading() {
	const t = useTranslations()
    return (
		<div  className="flex items-center justify-center gap-[10px]  ">
			<div className="w-6 h-6 flex-none rounded-full animate-spin border-4 border-solid border-white border-t-transparent shadow-md">   </div>
			<span className="text-white text18 " > {t("loading")} </span>
		</div>
    );
}
