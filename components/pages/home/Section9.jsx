'use client';

import { PeopleGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

const FEATURES = [
    { key: 'Hero.talentAcquisition', src: '/landing/icon-8-1.png' },
    { key: 'Hero.hrConsulting', src: '/landing/icon-8-2.png' },
    { key: 'Hero.workforceManagement', src: '/landing/icon-8-3.png' },
    { key: 'Hero.employeeDeployment', src: '/landing/icon-8-4.png' },
];

/* Slide 8 — Manpower & HR. Personality: interlocking circles of people. */
export default function Section9({ data, loading, active = false, units = [], slideIndex = 7 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='manpower-hr'
            headingId='home-hr-heading'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Manpower & HR Solutions')}
            fallbackLede={t('section9')}
            tagPartsFallback={[t('Hero.captionPeople'), t('Hero.eyebrowPower'), t('Hero.eyebrowProgress')]}
            features={FEATURES}
            glyph={<PeopleGlyph />}
            imageFallback='/landing/bg-8-section.png'
            imagePosition='65% center'
        />
    );
}
