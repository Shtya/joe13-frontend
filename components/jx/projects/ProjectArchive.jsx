'use client';

import JxArchive from '@/components/jx/JxArchive';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

/* Every project, filterable by department (see JxArchive). */
export default function ProjectArchive({ projects = [], loading }) {
    const tj = useTranslations('Jx');
    const tp = useTranslations('projects');
    return (
        <JxArchive
            id='all-projects'
            items={projects}
            loading={loading}
            tag={tj('allProjects')}
            title={tj('archiveTitle')}
            emptyText={tp('noneFound')}
            renderCard={(project, i) => <ProjectCard key={project.id || project.slug} project={project} priority={i < 3} />}
        />
    );
}
