import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations();
    return (
        <section className='flex min-h-screen items-center justify-center bg-black px-4 text-white'>
            <div className='max-w-xl text-center'>
                <h1 className='mb-6 text-5xl font-bold'>{t('not-found-page-1')}</h1>
                <p className='mb-8 text-lg text-white/80'>{t('not-found-page-2')}</p>
                <GlowCtaButton href='/'>{t('not-found-page-3')}</GlowCtaButton>
            </div>
        </section>
    );
}
