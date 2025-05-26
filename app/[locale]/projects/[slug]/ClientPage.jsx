'use client';
import { useProject } from '@/hooks/useProject';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { baseImage } from '@/helpers/baseUrl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Hash, Expand, Pause, Play, Headset, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetails() {
    const { slug } = useParams();
    const { project, loading } = useProject({ slug_name: slug });

    const locale = useLocale();
    const t = useTranslations();

    if (loading) {
        return <ProjectDetailsSkeleton />;
    }

    if (!project) {
        return (
            <div className='min-h-screen  bg-gradient text-white flex items-center justify-center'>
                <div className='text-center p-8'>
                    <h1 className='text-3xl font-bold capitalize mb-4'>{t('project-not-found')}</h1>
                    <Link href='/projects' className='btn-blue btn-blue-3d inline-flex items-center gap-2 mt-4'>
                        <ArrowLeft size={18} />
                        {t('back-to-projects')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient pt-[30px]  text-white flex items-center justify-center'>

            <div className='container grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] items-center '>
                {/* Project Header */}
                <div className='flex flex-col  gap-[10px] max-lg:items-center '>
                    <h1 className='text-4xl max-md:text-2xl font-bold  tracking-wide max-lg:text-center '>{project.name?.[locale]}</h1>
                    <div className='  flex items-center gap-2 '>
                        <div className='text-sm bg-white/20 h-[35px] flex items-center gap-[5px] px-[10px] py-[5px]'>
                            <Hash size={16} className='text-white' />
                            {project.department?.name?.[locale]}
                        </div>
                    </div>
                    <p className='text-lg max-md:text-base text-white/80 max-w-[600px] w-full leading-relaxed max-lg:text-center'>{project.description?.[locale]}</p>
                    <button className=' mt-[10px] btn-blue btn-blue-3d flex !rounded-[10px] items-center gap-2'>
                        <Headset size={18} />
                        {t('contact-us')}
                    </button>
                </div>

                <Gallery project={project} />
            </div>
        </div>
    );
}

function ProjectDetailsSkeleton() {
    return (
        <div className='min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20'>
            <div className='container grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] items-center '>
                {/* Text Side */}
                <div className='flex flex-col gap-[10px] max-lg:items-center'>
                    <div className=' skeleton-box h-10 w-[60%] bg-white/10 rounded-md max-lg:mx-auto' />
                    <div className=' skeleton-box h-9 w-[30%] bg-white/10 rounded-md max-lg:mx-auto' />
                    <div className=' skeleton-box h-24 w-[80%] bg-white/10 rounded-md max-lg:mx-auto' />
                    <div className=' skeleton-box h-12 w-[120px] bg-blue-500/30 rounded-md mt-[10px]' />
                </div>

                {/* Gallery Skeleton */}
                <div className='grid grid-cols-2 gap-[10px] h-[500px] max-lg:order-[-1] max-lg:pt-[70px]'>
                    <div className=' skeleton-box row-span-2 bg-white/10 rounded-lg' />
                    <div className=' skeleton-box bg-white/10 rounded-lg' />
                    <div className=' skeleton-box bg-white/10 rounded-lg' />
                </div>
            </div>
        </div>
    );
}

function Gallery({ project }) {
    const [images, setImages] = useState(project.images || []);
    const [isPlaying, setIsPlaying] = useState(true);
    const [popupImage, setPopupImage] = useState(null);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setImages(prevImages => {
                if (prevImages.length >= 3) {
                    const [first, second, third, ...rest] = prevImages;
                    return [second, third, first, ...rest];
                }
                return prevImages;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className='relative max-lg:order-[-1] max-lg:pt-[70px] '>
            {/* Image Gallery */}
            <div className={`grid grid-cols-2 gap-[10px] h-[500px] ${images?.length == 1 && '!grid-cols-1'} `}>
                {images.map((image, index) => (
                    <motion.div layout transition={{ duration: 0.8, ease: 'easeInOut' }} key={image.id} className={`relative bg-white/10 !pointer-events-auto rounded-lg overflow-hidden h-full group ${images?.length > 2 && index === 0 && 'row-span-2'} `}>
                        <Image src={baseImage(image.url)} alt={image.alt} fill className='p-[10px] object-contain transition-transform duration-700' />

                        <button onClick={() => setPopupImage(image)} className={`  absolute !flex-none !rounded-full  !w-[40px] !h-[40px] flex items-center justify-center !cursor-pointer btn-blue-3d btn-blue-3d-hover  top-2 right-2 z-[100] text-white p-1  transition`}>
                            <Expand size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <button onClick={() => setIsPlaying(!isPlaying)} className={` ${images?.length <= 2 && '!hidden'} z-10 bg-black/60 w-[50px] h-[50px] mx-auto mt-[20px] flex items-center justify-center  text-white p-2 rounded-full hover:bg-black transition`}>
                {isPlaying ? <Pause size={25} /> : <Play size={25} />}
            </button>

            {/* Popup Modal */}
            <AnimatePresence>
                {popupImage && (
                    <motion.div className='fixed inset-0 opacity-0 z-[10000000000000000000] !pointer-events-auto bg-black/40 backdrop-blur-[7px] flex items-center justify-center p-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className=' bg-[#ceced0] relative max-w-3xl w-full !pointer-events-auto  max-h-[90vh]  !rounded-[20px] overflow-hidden'
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={e => e.stopPropagation()} // prevent modal close on click inside
                        >
                            <Image src={baseImage(popupImage.url)} alt={popupImage.alt} width={1200} height={800} className='  w-full h-auto !rounded-[20px] object-contain' />
                            <button onClick={() => setPopupImage(null)} className='absolute !flex-none !rounded-full  !w-[40px] !h-[40px] flex items-center justify-center !cursor-pointer btn-blue-3d btn-blue-3d-hover  top-2 right-2 z-[100] text-white p-1  transition'>
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
