'use client';

import NextLink from 'next/link';
import { forwardRef } from 'react';
import { useLocale } from 'next-intl';
import { localizePath } from '@/helpers/url';

// next-intl 3.17's Link always renders the /ar prefix during SSR (it can't know
// the default locale), so every crawled Arabic link pointed at a 307. This one
// writes the final URL up front: lowercase, unprefixed for Arabic, /en for English.
const LocaleLink = forwardRef(function LocaleLink({ href, locale, ...rest }, ref) {
    const current = useLocale();
    const target = locale || current;
    return <NextLink ref={ref} href={localizePath(href, target)} hrefLang={target !== current ? target : undefined} {...rest} />;
});

export default LocaleLink;
