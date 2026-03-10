import { ui, defaultLang, languages } from './ui';
import type { Lang, UiKey } from './ui';

export { languages, defaultLang };
export type { Lang, UiKey };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (ui[lang] as any)[key] ?? (ui[defaultLang] as any)[key] ?? key;
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang): string {
    return l === defaultLang ? path : `/${l}${path}`;
  };
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const [, maybeLang, ...rest] = pathname.split('/');
  if (maybeLang in ui && maybeLang !== defaultLang) {
    return `/${rest.join('/')}`;
  }
  return pathname;
}
