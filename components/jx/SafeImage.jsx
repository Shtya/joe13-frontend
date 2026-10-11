'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/*
 * next/image that disappears quietly when a CMS file is missing (404),
 * so a frame shows its own dark plate instead of a broken-image icon.
 */
export default function SafeImage({ onError, src, ...props }) {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);
    if (!src || failed) return null;
    return (
        <Image
            {...props}
            src={src}
            onError={event => {
                setFailed(true);
                onError?.(event);
            }}
        />
    );
}
