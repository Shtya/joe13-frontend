'use client';
import Hero from '@/components/atoms/Hero';
import Tabs_blogs from '@/components/atoms/Tabs_blogs';
import { useBlogs } from '@/hooks/useblogs';
import { usePages } from '@/hooks/usePages';

export default function ClientPage() {
    const { loading:loadingBlogs, blogs } = useBlogs();
    const { loading, data } = usePages({ page_name: 'blogs' });

    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const latestBlogs = blogs?.data?.slice(0,4)


    
    return (
        <div className="min-h-screen" >
            <Hero type="blog" data={section1} projects={latestBlogs} loading={loading} loadingProjects={loadingBlogs} />
            <Tabs_blogs type="blog" loading={loadingBlogs} projects={blogs}/>
        </div>

    );
}
