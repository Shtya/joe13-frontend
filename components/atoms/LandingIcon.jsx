import Image from 'next/image';

export default function LandingIcon({ src, alt = '', className = '', width = 256, height = 256, sizes = '88px' }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={`pointer-events-none h-full w-full object-contain mix-blend-screen ${className}`.trim()}
    />
  );
}
