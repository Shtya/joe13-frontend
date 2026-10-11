'use client';

import { CubeGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

const FEATURES = [
    { key: 'Hero.innovativeSolutions', src: '/landing/icon-10-1.png' },
    { key: 'Hero.builtForBusinesses', src: '/landing/icon-10-2.png' },
    { key: 'Hero.realImpactFeature', src: '/landing/icon-10-3.png' },
    { key: 'Hero.continuousGrowth', src: '/landing/icon-10-4.png' },
];

/* Slide 10 — Products. Personality: nested isometric cubes. */
export default function Section11({ data, loading, active = false, units = [], slideIndex = 9 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='products'
            headingId='home-products-heading'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Our Products')}
            fallbackLede={t('section11')}
            fallbackBody={t('Hero.productsDescription')}
            features={FEATURES}
            glyph={<CubeGlyph />}
            imageFallback='/landing/bg-10-section.png'
            imagePosition='62% center'
        />
    );
}
