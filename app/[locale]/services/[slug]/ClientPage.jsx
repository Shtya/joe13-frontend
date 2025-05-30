import BenefitsSection from '@/components/pages/services/BenefitsSection';
import CallToAction from '@/components/pages/services/CallToAction ';
import FaqSection from '@/components/pages/services/Faq';
import HeroSection from '@/components/pages/services/HeroSection';
import ImpactStats from '@/components/pages/services/ImpactStats';
import Partners from '@/components/pages/services/Partners';
import { baseImage } from '@/helpers/baseUrl';
import React from 'react';

export default function page({ data, locale }) {
    if (!data?.title) {
        return (
            <div>
                <div className='relative pb-[50px] md:pb-[150px] bg-black/20 animate-pulse'>
                    <div className='container'>
                        <div className='container z-[10] relative'>
                            <section className='relative pt-[130px] overflow-hidden text-white py-24'>
                                <div className='text-center max-w-3xl mx-auto px-4'>
                                    <div className='h-10 md:h-16 bg-white/10 rounded w-3/4 mx-auto mb-4'></div>
                                    <div className='h-6 md:h-8 bg-white/10 rounded w-5/6 mx-auto'></div>
                                </div>
                            </section>
                        </div>

                        <section className='text-white !pt-[10px] pb-[70px]'>
                            <div className='grid grid-cols-1 lg:grid-cols-[500px,1fr] items-end gap-[30px] lg:gap-[100px]'>
                                {/* Left Section */}
                                <div className='max-w-[500px] w-full'>
                                    <div className='h-4 w-1/2 bg-white/20 rounded mb-2 skeleton-box'></div>
                                    <div className='h-6 md:h-10 w-3/4 bg-white/20 rounded mb-6 skeleton-box'></div>
                                    <div className='flex gap-4 mt-8'>
                                        {[...Array(3)].map((_, idx) => (
                                            <div key={idx} className='w-full h-[400px] bg-white/10 rounded-xl skeleton-box'></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className='space-y-10'>
                                    {[...Array(4)].map((_, idx) => (
                                        <div key={idx} className='space-y-2'>
                                            <div className='h-5 bg-white/20 rounded w-3/4 skeleton-box'></div>
                                            <div className='h-4 bg-white/10 rounded w-full skeleton-box'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='relative pb-[50px] md:pb-[150px] ' style={{ background: 'linear-gradient(150.97deg, #000000 -0.69%, rgba(0, 0, 0, 0.33) 95.9%)' }}>
            <img className=' z-[1] w-full h-screen fixed top-0 object-cover object-top  ' src={baseImage(data?.image?.url)} alt={data?.image?.alt} />
            <div className=' z-[2] absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/90 to-black/90 z-10'></div>

            <div className='container z-[10] relative '>
                <section className='relative pt-[130px] overflow-hidden  text-white py-24'>
                    <div className='relative z-10 text-center max-w-3xl mx-auto px-4'>
                        <h1 data-aos='fade-up' className='text-xl md:text-5xl font-bold mb-4 relative '>
                            {' '}
                            {data?.title?.[locale]}{' '}
                        </h1>
                        <p data-aos='fade-up' data-aos-delay={100} className='text-base md:text-xl mt-[10px] text-gray-300 font-medium'>
                            {' '}
                            {data?.subTitle?.[locale]}{' '}
                        </p>
                    </div>
                </section>

                <HeroSection loading={!data} data={data?.hero} locale={locale} />
                <Partners loading={!data} data={data?.partners} locale={locale} />
                <BenefitsSection loading={!data} data={data?.benefits} locale={locale} />
                <ImpactStats loading={!data} data={data?.impact} locale={locale} />
                <FaqSection loading={!data} data={data?.faqs} locale={locale} />
                <CallToAction loading={!data} data={data?.call} locale={locale} />
            </div>
        </div>
    );
}
