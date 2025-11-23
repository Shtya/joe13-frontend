'use client';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { baseImage } from '@/helpers/baseUrl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Hash, Expand, Pause, Play, Headset, X, ChevronRight, Eye } from 'lucide-react';
import { useBlog } from '@/hooks/useBlog';

export default function ProjectDetails() {
    const { slug } = useParams();
    const { blog, loading } = useBlog({ slug_name: slug });

    const locale = useLocale();
    const t = useTranslations();

    if (loading) {
        return <BlogSkeleton />;
    }

    if (!blog)  notFound()

    function splitHtmlByWords(html, wordCount = 30) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        const text = tmp.textContent || tmp.innerText || '';

        const words = text.split(/\s+/);
        const preview = words.slice(0, wordCount).join(' ');
        const remain = words.slice(wordCount).join(' ');

        return {
            preview: preview + (words.length > wordCount ? '...' : ''),
            remain,
        };
    }

    const { preview, remain } = splitHtmlByWords(blog?.content?.[locale], 30);

    return (
        <div className=' bg-gradient pt-[30px] text-white flex flex-col items-center justify-center'>
            <div className=' min-h-screen container grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] items-center'>
                {/* Text Content */}
                <div className='flex flex-col gap-[10px] max-lg:items-center'>
                    <h1 className='text-4xl max-md:text-2xl font-bold tracking-wide max-lg:text-center'> {blog.title?.[locale]} </h1>
                    <div className=' opacity-30 flex-none max-w-[400px] w-full bg-gray-400 h-[2px] my-[10px]   '></div>

                    <h2 className='text-xl max-md:text-lg font-[600] tracking-wide max-lg:text-center' dangerouslySetInnerHTML={{ __html: preview }} />
                    <div className=' opacity-30 flex-none max-w-[400px] w-full bg-gray-400 h-[2px] my-[10px]   '></div>

                    <div className='flex items-center gap-2'>
                        <div className='text-sm  h-[35px] flex items-center gap-[5px] px-[10px] py-[5px] rounded-md'>
                            {t('department')}
                            <ChevronRight size={16} className='text-white' />
                            {blog.department?.name?.[locale]}
                        </div>
                    </div>

                    <div className='flex flex-col gap-[20px] mt-6'>
                        {/* Tags */}
                        <div className='flex flex-wrap max-md:justify-center  gap-2'>
                            {blog?.tags?.map((tag, index) => (
                                <span key={index} className=' !select-none flex items-center btn-blue-3d  !px-3 !py-1 rounded-full text-sm font-medium'>
                                    <Hash size={15} className='text-white' />{tag}
                                </span>
                            ))}
                        </div>

                        {/* Views Count */}
                        <div className='flex items-center max-md:justify-center gap-2 text-gray-500 text-sm'>
                            <div className="w-[40px] h-[40px] btn-blue-3d !rounded-full flex items-center justify-center" > <Eye size={18}  /> </div>
                            <span className="text-white text-xl   " >{blog?.views_count} {t("views")} </span>
                        </div>


                        <div className='flex  max-md:justify-center items-center gap-[10px] '>
                            <div className='w-[40px] h-[40px] btn-blue-3d !rounded-full flex items-center justify-center  '>
                                <img className=' w-[18px] h-[18px]  ' src='/user.png' />
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-white/80 '>{blog?.author}</h4>
                                <h5 className='text-xs text-white/60 '>
                                    {new Date(blog?.published_at).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </h5>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Blog Image */}
                <div className='relative max-lg:order-[-1] max-lg:pt-[70px] h-[500px]'>
                    <div className='relative w-full h-full overflow-hidden rounded-lg'>
                        <Image src={baseImage(blog.image_url)} alt={blog.image_alt} fill className='object-contain rounded-lg' />
                    </div>
                </div>
            </div>

            <div className='container !pt-[40px] !pb-[80px] '>
                <p className=' text-balance text-lg max-md:text-base text-white/80 max-w-[800px] w-full mx-auto leading-relaxed max-lg:text-center whitespace-pre-line' dangerouslySetInnerHTML={{__html : blog.content?.[locale] }}  />
            </div>
        </div>
    );
}



const BlogSkeleton = () => {
  return (
    <div className="bg-gradient pt-[30px] text-white flex flex-col items-center justify-center">
      <div className="min-h-screen container grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] items-center ">
        {/* Text Skeleton */}
        <div className="flex flex-col gap-[10px] max-lg:items-center">
          <div className="h-10 w-3/4 skeleton-box bg-white/20 rounded" />
          <div className="w-1/2 h-[2px] skeleton-box bg-white/10 my-[10px]" />
          <div className="h-6 w-full skeleton-box bg-white/10 rounded" />
          <div className="w-1/2 h-[2px] skeleton-box bg-white/10 my-[10px]" />

          {/* Department */}
          <div className="h-6 w-[150px] skeleton-box bg-white/10 rounded" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="h-6 w-20 skeleton-box bg-white/10 rounded-full" />
            ))}
          </div>

          {/* Views */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-[40px] h-[40px] skeleton-box bg-white/10 rounded-full" />
            <div className="h-6 w-24 skeleton-box bg-white/10 rounded" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-[40px] h-[40px] skeleton-box bg-white/10 rounded-full" />
            <div>
              <div className="h-4 w-24 skeleton-box bg-white/10 rounded mb-1" />
              <div className="h-3 w-32 skeleton-box bg-white/10 rounded" />
            </div>
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="relative max-lg:order-[-1] max-lg:pt-[70px] h-[500px] w-full">
          <div className="w-full h-full skeleton-box bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container !pt-[40px] !pb-[80px] space-y-2 ">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full max-w-[800px] h-4 skeleton-box bg-white/10 rounded mx-auto" />
        ))}
      </div>
    </div>
  );
};
