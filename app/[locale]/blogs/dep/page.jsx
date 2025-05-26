"use client"
import Blog from '@/components/pages/blogs/Blog';
import Text from '@/components/pages/home/Text';
import Filter from '@/components/pages/services/Filter';
import EffectFixed from '@/helpers/EffectFixed';
import { hookBlogs } from '@/hooks/hookBlogs';
import { useLocale, useTranslations } from 'next-intl';
import React , {useState} from 'react';

export default function page() {
    const t = useTranslations('Blogs');
    const [category, setcategory] = useState();
    const { blogs, loading } = hookBlogs();

    console.log(blogs?.map(e => {
            return {
                slug : e.title_en?.split(" ").join("-").toLowerCase(),
                tilte: {
                    ar: e.title_ar,
                    en: e.title_en,
                },
                content: {
                    en: e.article_en,
                    ar: e.article_ar,
                },
                author : "",
                status : "published",
                published_at: "2025-05-15T09:00:00.000Z",
                tags : [],
                views_count : 300 ,
                meta_title: e.title_en,
                meta_description: e.article_en,
                meta_keywords: [],
                image_url: e?.images[0]?.image,
                image_alt: e?.title_en,
                department_id: e?.service?.title_en,
            };
        }))

    return (
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fuga ducimus autem enim! Laboriosam distinctio quia, maiores nemo accusamus consequatur eum doloremque deserunt debitis aspernatur vero ratione nobis. Vitae, perferendis."
        // <EffectFixed image={'/assets/imgs/blogs.png'}>
        //     {
        //         category 
        //         ? null
        //         : <>
        //             <div data-aos={category == null && "fade-down"} className={'w-fit mx-auto mb-[10px] text-center font-[700]  max-md:text24 text40 '} > {t("blogs")} </div>
        //             <div data-aos={category == null && "fade-down"} className={` text-center  w-full text20 max-md:text16  text-balance`} > {t("blogsDescription")} </div>
        //         </>
        //     }
        //     {!category && <Filter skeltonCount={3}  services={blogs}  loading={loading}  setcategory={setcategory} />}

        //     {category && <Blog data={category} setcategory={setcategory} />}


        //     {/* <Text overlay={true} title={t('blogs')} description={t('blogsDescription')} component={<Filter />} /> */}
        // </EffectFixed>
    );
}
