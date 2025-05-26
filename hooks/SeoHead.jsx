'use client';

import { useEffect } from 'react';

export default function SeoHead({
  headScript,
  structuredData,
  bodyScript,
}) {
  useEffect(() => {
    if (headScript) {
      const headTag = document.createElement('script');
      headTag.innerHTML = headScript;
      document.head.appendChild(headTag);
    }

    if (structuredData) {
      const jsonLdTag = document.createElement('script');
      jsonLdTag.type = 'application/ld+json';
      jsonLdTag.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(jsonLdTag);
    }

    if (bodyScript) {
      const bodyTag = document.createElement('script');
      bodyTag.innerHTML = bodyScript;
      document.body.appendChild(bodyTag);
    }
  }, [headScript, structuredData, bodyScript]);

  return null;
}
