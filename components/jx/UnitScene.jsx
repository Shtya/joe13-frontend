'use client';

import { getModalItems } from '@/components/molecules/Modal';
import JxDossier from '@/components/jx/JxDossier';
import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useSceneMotion, weightMorph } from '@/components/jx/motion';
import { FeatureRail, UnitLocator } from '@/components/jx/UnitParts';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

/*
 * Unit scene — the shared composition for every business-unit slide.
 *
 *   ┌───────────────────────────────────────────────┬───────────┐
 *   │ ● tag                                         │           │
 *   │ Title line one (light)                        │   glyph   │
 *   │ Title line two (chrome gradient)              │  (line    │
 *   │ Lede — one sentence, larger                   │   art)    │
 *   │ Body copy                                     │           │
 *   │ ─●── feature ─── feature ─── feature ───      │           │
 *   │ [ Read more  + ]          (◦◦●◦◦◦) Unit 2/6   │           │
 *   └───────────────────────────────────────────────┴───────────┘
 *
 * variant="mega": the title becomes a single oversized word that morphs
 * from hairline-wide to heavy-tight on entry (Alexandria wght 100 → 800).
 *
 * "Read more" opens the JxDossier from the button's own position.
 */
export default function UnitScene({
    id,
    headingId,
    data,
    loading,
    active,
    units,
    slideIndex,
    fallbackTitle,
    fallbackLede,
    fallbackBody,
    tagFallback,
    tagPartsFallback,
    features = [],
    glyph,
    imageFallback,
    imagePosition,
    variant = 'standard',
}) {
    const t = useTranslations();
    const locale = useLocale();
    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState(null);

    const title = data?.title?.[locale] || fallbackTitle;
    const lede = data?.content?.[locale] || fallbackLede;
    const body = pickUi(data, locale, 'body', fallbackBody);
    const tagParts = pickUi(data, locale, 'eyebrowParts') || tagPartsFallback;
    const tag = pickUi(data, locale, 'eyebrow', tagFallback);
    const labels = pickUi(data, locale, 'features');
    const featureItems = features.map((f, i) => ({ ...f, label: (Array.isArray(labels) && labels[i]) || t(f.key) }));
    const items = getModalItems(data, locale);
    const mega = variant === 'mega';

    const parts = mega ? [title] : splitTitle(title);
    const lines = parts.map((text, i) => ({
        text,
        tone: mega ? 'strong' : i === parts.length - 1 ? 'accent' : 'light',
        className: mega ? 'jx-accent jx-morph' : '',
    }));
    const long = Math.max(...parts.map(part => part.length)) > 14;

    const ref = useSceneMotion(active, {
        deps: [loading, locale, title],
        extend: mega ? (tl, root) => weightMorph(tl, root.querySelector('.jx-morph')) : undefined,
    });

    const titleSize = mega
        ? 'text-[length:var(--jx-fs-mega)] leading-[1.05]'
        : long
          ? 'text-[length:var(--jx-fs-4xl)] leading-[1.18] ltr:tracking-[-0.02em]'
          : 'text-[length:var(--jx-fs-5xl)] leading-[1.12] ltr:tracking-[-0.03em]';

    return (
        <JxScene
            ref={ref}
            id={id}
            labelledBy={headingId}
            busy={loading}
            image={cmsImage(data?.image?.url, imageFallback)}
            imagePosition={imagePosition}
            shade='start'
            glyph={glyph}
            glyphClassName='end-[4%] top-[14%] aspect-square w-[min(40vw,620px)] max-lg:[--jx-sw:2] max-lg:end-[-22%] max-lg:top-[6%] max-lg:w-[86vw] max-lg:opacity-35'
        >
            {loading ? (
                <p className='sr-only'>{t('loading')}</p>
            ) : (
                <div className={`w-full text-start ${mega ? 'max-w-[900px]' : 'max-w-[660px]'}`}>
                    {tagParts?.length ? <JxTag parts={tagParts} /> : tag ? <JxTag>{tag}</JxTag> : null}

                    <JxHeading id={headingId} lines={lines} className={`mt-5 ${titleSize}`} />

                    {lede ? (
                        <p data-jx='rise' className={`m-0 mt-5 max-w-[36rem] text-pretty font-[400] leading-[1.6] text-[var(--jx-text)] ${body && !mega ? 'text-[length:var(--jx-fs-xl)]' : 'text-[length:var(--jx-fs-lg)] text-[var(--jx-text-2)]'}`}>
                            {lede}
                        </p>
                    ) : null}

                    {body && !mega ? (
                        <p data-jx='rise' className='m-0 mt-4 max-w-[34rem] text-pretty text-[length:var(--jx-fs-md)] font-[400] leading-[1.7] text-[var(--jx-text-2)]'>
                            {body}
                        </p>
                    ) : null}

                    {featureItems.length ? <FeatureRail items={featureItems} className='mt-10 max-w-[700px]' /> : null}

                    <div className='mt-9 flex flex-wrap items-center gap-x-8 gap-y-5'>
                        <JxButton
                            icon='plus'
                            aria-haspopup='dialog'
                            onClick={event => {
                                const r = event.currentTarget.getBoundingClientRect();
                                setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
                                setOpen(true);
                            }}
                        >
                            {pickUi(data, locale, 'cta', t('readMore'))}
                        </JxButton>
                        <UnitLocator units={units} current={slideIndex} />
                    </div>
                </div>
            )}

            <JxDossier open={open} onClose={() => setOpen(false)} origin={origin} title={title} lede={lede} items={items} glyph={glyph} />
        </JxScene>
    );
}
