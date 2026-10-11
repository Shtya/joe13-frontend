'use client';

import { SpotlightGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

const FEATURES = [
    { key: 'Hero.strategicMerchandising', src: '/landing/icon-9-1.png' },
    { key: 'Hero.brandActivation', src: '/landing/icon-9-2.png' },
    { key: 'Hero.eventManagement', src: '/landing/icon-9-3.png' },
    { key: 'Hero.measurableResults', src: '/landing/icon-9-4.png' },
];

/* Slide 9 — Merchandising, activation & events. Personality: a spotlight on a stage. */
export default function Section10({ data, loading, active = false, units = [], slideIndex = 8 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='merchandising'
            headingId='home-merchandising-heading'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Merchandising, Activation and Event Management')}
            fallbackLede={t('section10')}
            tagPartsFallback={[t('Hero.eyebrowBrands'), t('Hero.eyebrowIn'), t('Hero.eyebrowEvery'), t('Hero.eyebrowExperience')]}
            features={FEATURES}
            glyph={<SpotlightGlyph />}
            imageFallback='/landing/bg-9-section.png'
            imagePosition='65% center'
        />
    );
}
