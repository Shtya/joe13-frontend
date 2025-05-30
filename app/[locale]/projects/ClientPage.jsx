'use client';
import Hero from '@/components/atoms/Hero';
import Tabs from '@/components/atoms/Tabs';
import { usePages } from '@/hooks/usePages';
import { useProjects } from '@/hooks/useProjects';

export default function ClientPage() {
    const { loading:loadingProjects, projects } = useProjects();
    const { loading, data } = usePages({ page_name: 'projects' });
    const section1 = data?.sections?.find(e => e.id == 'sec1');

    const projectsHeroSection = projects?.data?.filter((e)=> e.department.id == 1 )

    
    return (
        <div className="min-h-screen" >
            <Hero data={section1} projects={projectsHeroSection} loading={loading} loadingProjects={loadingProjects} />
            <Tabs loading={loadingProjects} projects={projects}/>
        </div>

    );
}
