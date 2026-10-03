'use client';

import { cmsImage } from '@/helpers/cms';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CmsFillImage({
  url,
  fallback,
  alt = '',
  priority,
  className,
  sizes = '100vw',
}) {
  const resolved = cmsImage(url, fallback) || fallback || '';
  const [src, setSrc] = useState(resolved);

  useEffect(() => {
    setSrc(cmsImage(url, fallback) || fallback || '');
  }, [url, fallback]);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => {
        if (fallback && src !== fallback) setSrc(fallback);
      }}
    />
  );
}
