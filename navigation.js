import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', "ar"];
export const localePrefix = 'as-needed';

export const { redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

export { default as Link } from '@/components/atoms/LocaleLink';
