/* Line/solid social marks, sized to their container (52%). Shared by the
   footer and the side menu. */
export default function SocialIcon({ name }) {
  const key = String(name || '').toLowerCase();
  const fill = 'size-[52%] fill-current';
  const stroke = 'size-[52%] fill-none stroke-current stroke-[1.7]';

  if (key.includes('tiktok')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M14.2 3c.5 2.6 2 4.2 4.8 4.5v3.1c-1.7-.1-3.3-.6-4.7-1.6v6.5c0 3.5-2.5 5.7-5.7 5.7C5.4 21.2 3 19 3 15.9c0-3 2.3-5.4 5.5-5.7v3.2c-1.3.2-2.2 1.1-2.2 2.4 0 1.4 1 2.3 2.4 2.3 1.5 0 2.4-1 2.4-2.5V3h3.1Z' />
      </svg>
    );
  }

  if (key.includes('twitter') || key === 'x') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M5 4h3.9l4.1 5.4L17.5 4H20l-5.9 7 5.9 9h-3.9l-4.4-5.9L6.5 20H4l6.2-7.5L5 4Z' />
      </svg>
    );
  }

  if (key.includes('facebook')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z' />
      </svg>
    );
  }

  if (key.includes('linkedin')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M5 8H2v13h3V8Zm.2-4.1C5.2 2.8 4.4 2 3.5 2S1.8 2.8 1.8 3.9s.8 1.9 1.7 1.9 1.7-.8 1.7-1.9ZM22 13.5c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.3-3.9 2.2V8H10v13h3.2v-7.2c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2 2.2 3.8V21H21v-7.5h1Z' />
      </svg>
    );
  }

  if (key.includes('snap')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M12 2.5c-3.4 0-5.7 2.5-5.7 6v2.3c0 .8-.4 1.2-1.3 1.5l-1.2.4c-.5.2-.6.8-.2 1.1.7.6 1.7 1 2.5 1.2.4.1.6.4.5.8-.2.7.2 1.2.9 1.2.5 0 1-.1 1.4-.3.5-.2.9-.1 1.3.3.5.6 1.2 1.1 2 1.3.5.1.9.2 1.3.2.4 0 .8-.1 1.3-.2.8-.2 1.5-.7 2-1.3.4-.4.8-.5 1.3-.3.4.2.9.3 1.4.3.7 0 1.1-.5.9-1.2-.1-.4.1-.7.5-.8.8-.2 1.8-.6 2.5-1.2.4-.3.3-.9-.2-1.1l-1.2-.4c-.9-.3-1.3-.7-1.3-1.5V8.5c0-3.5-2.3-6-5.7-6Z' />
      </svg>
    );
  }

  if (key.includes('instagram')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <rect x='3' y='3' width='18' height='18' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <circle cx='17.4' cy='6.7' r='1' />
      </svg>
    );
  }

  if (key.includes('youtube')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M22 8.2a3 3 0 0 0-2.1-2.1C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.7.5 7.9.5 7.9.5s6.2 0 7.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.5 12 31 31 0 0 0 22 8.2ZM10 15.5v-7l6 3.5-6 3.5Z' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
      <circle cx='12' cy='12' r='8' />
      <path d='M8 12h8M12 8v8' />
    </svg>
  );
}
