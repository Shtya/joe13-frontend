import { Link } from '@/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

// app/not-found.tsx
export default function NotFound() {
    const t = useTranslations();
    return (
        <div className='min-h-screen bg-gradient text-white flex items-center justify-center px-4'>
            <div className='text-center max-w-xl'>
                <h1 className='text-5xl font-bold mb-6'>{t('not-found-page-1')}</h1>
                <p className='text-lg text-white/80 mb-8'>
                    {t("not-found-page-2")}
                </p>
                <Link href='/' className='btn-blue btn-blue-3d inline-flex items-center gap-2 text-sm px-6 py-3 rounded'>
                    <ArrowLeft size={18} />
                    {t('not-found-page-3')}
                </Link>
            </div>
        </div>
    );
}
