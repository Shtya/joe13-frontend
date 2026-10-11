'use client';

import JxSlider from '@/components/jx/JxSlider';
import Footer from '@/components/molecules/Footer';
import AboutHero from '@/components/pages/aboutus/AboutHero';
import AboutMission from '@/components/pages/aboutus/AboutMission';
import AboutVision from '@/components/pages/aboutus/AboutVision';
import Board from '@/components/pages/aboutus/Board';
import { usePages } from '@/hooks/usePages';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/*
 * About us — Black & Silver, on the shared scene slider.
 *   1. Who we are — chrome title + a timeline from the founding year to today
 *   2. Team — spotlight + roster
 *   3. Vision — horizon glyph + pillars
 *   4. Mission — compass glyph + pillars
 *   5. Footer
 */
export default function Page({ initialData, initialTeam }) {
    const { loading, data } = usePages({ page_name: 'about-us', initialData });
    const tj = useTranslations('Jx');
    const section = id => data?.sections?.find(e => e.id == id);
    const section1 = section('sec1');
    const section2 = section('sec2');
    const section3 = section('sec3');

    const labels = useMemo(() => {
        const raw = tj.raw('aboutSlides');
        return Array.isArray(raw) ? raw : undefined;
    }, [tj]);

    const slides = [
        { key: 'about', render: active => <AboutHero data={section1} loading={loading} active={active} /> },
        { key: 'team', scrollable: true, render: active => <Board initialTeam={initialTeam} active={active} /> },
        { key: 'vision', scrollable: true, render: active => <AboutVision data={section2} loading={loading} active={active} /> },
        { key: 'mission', scrollable: true, render: active => <AboutMission data={section3} loading={loading} active={active} /> },
        { key: 'footer', scrollable: true, className: 'footer-slide', render: () => <Footer id='footer2' /> },
    ];

    return <JxSlider slides={slides} labels={labels} />;
}
