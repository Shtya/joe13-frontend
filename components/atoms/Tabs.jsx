'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Hash } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { baseImage } from '@/helpers/baseUrl';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function Tabs({ loading, projects }) {
    const departmentsMap = new Map();
    const locale = useLocale();

    projects?.data?.forEach(project => {
        const deptId = project.department.id;
        if (!departmentsMap.has(deptId)) {
            departmentsMap.set(deptId, project);
        }
    });

    const uniqueDepartmentProjects = Array.from(departmentsMap.values());
    const [activeDepartment, setActiveDepartment] = useState(uniqueDepartmentProjects[0]?.department?.id ?? 1);

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 3;

    const swiperRef = useRef(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);

    const handleSwiperChange = swiper => {
        setShowLeftFade(!swiper.isBeginning);
        setShowRightFade(!swiper.isEnd);
    };

    const filteredProjects = activeDepartment ? projects?.data?.filter(project => project.department.id === activeDepartment) : projects?.data;

    const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);
    const paginatedProjects = filteredProjects?.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeDepartment]);

    return (
        <div className=' py-[70px] flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white '>
            {/* Tabs */}
            {loading ? (
                <SkeletonTabs />
            ) : (
                <div className='relative  rounded-[15px] px-[60px] py-[30px] w-full max-w-[1000px]  mb-6'>
                    <button className={`  backdrop-blur-[10px]  ${!showLeftFade && 'pointer-events-none opacity-30 '} w-[35px] h-[36px] backdrop-blur-[10px] bg-white/40 rounded-full absolute rtl:rotate-[-180deg] rtl:right-[20px] ltr:left-[20px] top-1/2 -translate-y-1/2 z-20 p-2`} onClick={() => swiperRef.current?.slidePrev()}>
                        <ArrowLeft className='text-black' size={20} />
                    </button>
                    <button className={` backdrop-blur-[10px]  ${!showRightFade && 'pointer-events-none opacity-30 '} w-[35px] h-[36px] backdrop-blur-[10px] bg-white/40 rounded-full absolute rtl:rotate-[-180deg] rtl:left-[20px] ltr:right-[20px] top-1/2 -translate-y-1/2 z-20 p-2`} onClick={() => swiperRef.current?.slideNext()}>
                        <ArrowRight className='text-black' size={20} />
                    </button>

                    <Swiper onSwiper={swiper => (swiperRef.current = swiper)} onSlideChange={handleSwiperChange} onResize={handleSwiperChange} slidesPerView='auto' spaceBetween={6} navigation={false} loop={false} modules={[Navigation]}>
                        {uniqueDepartmentProjects.map(project => (
                            <SwiperSlide key={project.department.id} className='!w-auto flex-shrink-0'>
                                <button onClick={() => setActiveDepartment(project.department.id)} className={`  px-[15px] py-2 text-nowrap text-sm rounded-full transition-all duration-200 ${activeDepartment === project.department.id ? ' text-white   btn-blue-3d ' : 'bg-white/30 text-black'} !rounded-[12px]  btn-blue-3d-hover backdrop-blur-[10px] capitalize hover:text-white duration-500 `}>
                                    {project.department.name?.[locale]}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Projects */}
            <div className=' container  px-4'>
                {loading 
                  ?  <div className="pb-[50px] grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] max-md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] max-md:gap-3 gap-6">
                      {Array.from({ length: 3 }).map((_, i) => ( <SkeletonCard />   ))}
                      </div>
                  : filteredProjects.length === 0 
                    ? <p className='text-center'>No projects found.</p>
                    : (
                    <>
                        <div className=' pb-[50px] grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] max-md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] max-md:gap-3 gap-6'>
                            {paginatedProjects.map((project, i) => (
                                <Project key={project.id} i={i} project={project} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className='flex rtl:flex-row-reverse z-[1000] relative justify-center items-center gap-2 mt-6'>
                                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30'}`}>
                                    ←
                                </button>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-full text-sm font-semibold ${currentPage === i + 1 ? 'bg-white text-black' : 'bg-white/20 text-white hover:bg-white/40'}`}>
                                        {i + 1}
                                    </button>
                                ))}

                                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30'}`}>
                                    →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function Project({ project, i }) {
    const [mainImage, setMainImage] = useState(project?.images?.[0]);
    const locale = useLocale();
    const t = useTranslations();

    return (
        <div data-aos='fade-up' data-aos-delay={`${i}00`} className='bg-[#ceced0]/50 !rounded-[12px] p-[10px]  shadow-xl backdrop-blur'>
            <div className=' grid grid-cols-[1fr_90px]  max-md:grid-cols-1  items-start gap-[10px]'>
                <div className='w-full max-md:h-[200px] !rounded-[12px] h-[300px] bg-[#cdcdcf]  p-[8px] '>
                    <img onError={(e) => { e.currentTarget.src = '/not-image.jpg' }} className=' overflow-hidden  w-full h-full object-contain  ' src={baseImage(mainImage?.url)} alt={mainImage?.alt} width={300} height={200} />
                </div>

                <div className='max-md:grid max-md:grid-cols-3 h-full  flex md:flex-col flex-none w-full  items-center gap-[10px]  '>
                    {project?.images?.slice(0, 3)?.map((e, i) => (
                        <img onError={(e) => { e.currentTarget.src = '/not-image.jpg' }} onClick={() => setMainImage(e)} className={`  ${mainImage?.url == e?.url ? '  scale-[.95]  btn-blue-3d  ' : ''}  !rounded-[12px] hover:scale-[.95] hover:border-primary border-2 border-transparent  duration-500 cursor-pointer w-full max-md:h-[60px] h-[93px]  p-[5px]   bg-[#cdcdcf] object-contain`} src={baseImage(e.url)} alt={e.alt} width={70} height={70} />
                    ))}
                </div>
            </div>

            <h3 className=' mt-[15px]  mb-[8px] text-xl font-bold !truncate '>{project.name?.[locale]}</h3>
            <p className='text-xs text-balance  text-white/80 line-clamp-2 '>{project?.description?.[locale]}</p>

            <div className='mt-[20px] flex items-center justify-between gap-[10px] flex-wrap '>
                <div className='!rounded-[12px] text-xs bg-white/20 w-fit h-[35px] flex items-center gap-[5px] px-[10px] py-[5px]  select-none '>
                    <Hash size={16} className='text-white' /> {project?.department?.name?.[locale]}
                </div>
                <Link href={`projects/${project.slug}`} className=' !rounded-[12px] btn-blue btn-blue-3d w-fit text-sm !min-w-[110px] !px-[10px] capitalize  !h-[35px]   '>
                    {t('show-more')}
                    <Image  className='rtl:rotate-[-270deg] rotate-[0deg] ' src='/down-right-arrow.png' alt='' width={18} height={18} />
                </Link>
            </div>
        </div>
    );
}

function SkeletonTabs() {
    return (
        <div className='relative rounded-[15px] px-[60px] py-[30px] w-full max-w-[1000px] mb-6'>
            {/* Left Skeleton Button */}
            <div className='w-[35px] h-[36px] rounded-full bg-white/30 skeleton-box absolute left-[20px] top-1/2 -translate-y-1/2 z-20' />

            {/* Right Skeleton Button */}
            <div className='w-[35px] h-[36px] rounded-full bg-white/30 skeleton-box absolute right-[20px] top-1/2 -translate-y-1/2 z-20' />

            {/* Fake Swiper Slides */}
            <div className='flex gap-2 overflow-x-auto'>
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className='px-[15px] py-2 rounded-full bg-white/30 backdrop-blur-[10px] w-[170px] h-[36px] skeleton-box' />
                ))}
            </div>
        </div>
    );
}


function SkeletonCard (){
  return <div className="bg-white/10 p-[10px] shadow-xl backdrop-blur animate-pulse">
  <div className="grid grid-cols-[1fr_90px] max-md:grid-cols-1 items-start gap-[10px]">
    {/* Main Image Placeholder */}
    <div className="w-full max-md:h-[200px] h-[300px] bg-[#cdcdcf] p-[8px] flex items-center justify-center">
      <div className="w-full h-full bg-white/30" />
    </div>

    {/* Thumbnails Placeholder */}
    <div className="max-md:grid max-md:grid-cols-3 h-full flex md:flex-col flex-none w-full items-center gap-[10px]">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-full max-md:h-[60px] h-[93px] bg-white/30 rounded" />
      ))}
    </div>
  </div>

  {/* Title */}
  <div className="mt-[15px] mb-[8px] h-6 bg-white/30 w-3/4 rounded" />

  {/* Description */}
  <div className="space-y-1">
    <div className="h-4 bg-white/20 w-full rounded" />
    <div className="h-4 bg-white/20 w-[90%] rounded" />
    <div className="h-4 bg-white/20 w-[70%] rounded" />
  </div>

  {/* Footer: Department + Button */}
  <div className="mt-[20px] flex items-center justify-between gap-[10px] flex-wrap">
    <div className="h-[35px] w-[100px] bg-white/20 rounded" />
    <div className="h-[35px] w-[110px] bg-white/30 rounded" />
  </div>
</div>

}
