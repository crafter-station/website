import { a as createComponent, b as createAstro, m as maybeRenderHead, j as renderScript, e as addAttribute, d as renderTemplate, r as renderComponent } from './astro/server_BEF4PhYa.mjs';
import 'kleur/colors';
import 'clsx';
import { u as ui, d as defaultLang, l as languages, g as getRelativeLocaleUrl } from './BaseLayout_BN0uzPaZ.mjs';

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}
function useTranslatedPath(lang) {
  return function translatePath(path, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`;
  };
}
function getRouteFromUrl(url) {
  const pathname = url.pathname;
  const [, maybeLang, ...rest] = pathname.split("/");
  if (maybeLang in ui && maybeLang !== defaultLang) {
    return `/${rest.join("/")}`;
  }
  return pathname;
}

const $$Astro$2 = createAstro();
const $$LanguagePicker = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguagePicker;
  const lang = getLangFromUrl(Astro2.url);
  const route = getRouteFromUrl(Astro2.url);
  return renderTemplate`${maybeRenderHead()}<div class="relative group"> <button type="button" class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors" aria-haspopup="true" aria-expanded="false" aria-label="Select language" id="lang-btn"> ${lang.toUpperCase()} <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="transition-transform group-hover:rotate-180" aria-hidden="true"> <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> <div id="lang-dropdown" class="absolute right-0 top-full mt-1 hidden min-w-[120px] bg-background border border-divider z-50" role="menu"> ${Object.entries(languages).map(([code, label]) => renderTemplate`<a${addAttribute(getRelativeLocaleUrl(code, route), "href")} role="menuitem"${addAttribute([
    "block px-4 py-2 text-sm transition-colors",
    code === lang ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
  ], "class:list")}${addAttribute(code, "hreflang")}> ${label} </a>`)} </div> </div> ${renderScript($$result, "/Users/cuevaio/projects/cs-web/src/components/LanguagePicker.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/cuevaio/projects/cs-web/src/components/LanguagePicker.astro", void 0);

const $$Astro$1 = createAstro();
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const tp = useTranslatedPath(lang);
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { key: t("nav.events"), href: tp("/events") },
    { key: t("nav.projects"), href: tp("/projects") },
    { key: t("nav.team"), href: tp("/team") },
    { key: t("nav.blog"), href: tp("/blog") }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 w-full bg-background border-b border-divider"> <div class="flex items-center justify-between px-6 h-[72px] max-w-[1280px] mx-auto"> <!-- Logo --> <a${addAttribute(tp("/"), "href")} class="flex items-center gap-2 group" aria-label="Crafter Station"> <img src="/brand/icon-white.svg" alt="" width="20" height="20" class="shrink-0" aria-hidden="true"> <span class="text-foreground font-bold text-base leading-none tracking-tight">crafter</span> <span class="text-muted-foreground font-bold text-base leading-none tracking-tight">station</span> </a> <!-- Desktop Nav --> <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute([
    "text-sm transition-colors",
    currentPath === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  ], "class:list")}> ${item.key} </a>`)} </nav> <!-- Right: Join + Language Picker --> <div class="flex items-center gap-4"> ${renderComponent($$result, "LanguagePicker", $$LanguagePicker, {})} <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" class="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium hover:bg-muted-foreground transition-colors"> ${t("nav.join")} </a> <!-- Mobile menu button --> <button id="mobile-menu-toggle" type="button" class="md:hidden flex flex-col gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle navigation" aria-expanded="false"> <span class="block w-5 h-px bg-current transition-transform" id="menu-line-1"></span> <span class="block w-5 h-px bg-current transition-opacity" id="menu-line-2"></span> <span class="block w-5 h-px bg-current transition-transform" id="menu-line-3"></span> </button> </div> </div> <!-- Mobile nav drawer --> <div id="mobile-nav" class="hidden md:hidden border-t border-divider bg-background" role="navigation" aria-label="Mobile navigation"> <div class="flex flex-col px-6 py-4 gap-0"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-sm text-muted-foreground hover:text-foreground transition-colors py-3 border-b border-divider last:border-b-0"> ${item.key} </a>`)} <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" class="mt-4 text-sm text-foreground font-medium py-3"> ${t("nav.join")} →
</a> </div> </div> </header> ${renderScript($$result, "/Users/cuevaio/projects/cs-web/src/components/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/cuevaio/projects/cs-web/src/components/Nav.astro", void 0);

const $$Astro = createAstro();
const $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SiteFooter;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const tp = useTranslatedPath(lang);
  const socialLinks = [
    {
      label: t("footer.github"),
      href: "https://github.com/crafter-station",
      external: true
    },
    {
      label: t("footer.discord"),
      href: "https://discord.gg/QvsS4jNpKa",
      external: true
    },
    {
      label: t("footer.linkedin"),
      href: "https://linkedin.com/company/crafter-station",
      external: true
    },
    {
      label: t("footer.x"),
      href: "https://x.com/CrafterStation",
      external: true
    },
    {
      label: t("footer.instagram"),
      href: "https://www.instagram.com/crafter.station/",
      external: true
    },
    {
      label: t("footer.whatsapp"),
      href: "https://crafters.chat",
      external: true
    },
    { label: t("footer.luma"), href: "https://luma.com/hack0", external: true }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="w-full border-t border-divider"> <!-- Social links row — horizontal grid like opencode.ai footer --> <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[repeat(7,1fr)] border-b border-divider"> ${socialLinks.map((link, i) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(link.external ? "_blank" : void 0, "target")}${addAttribute(link.external ? "noopener noreferrer" : void 0, "rel")}${addAttribute([
    "flex items-center justify-center py-5 text-sm text-muted-foreground hover:text-foreground transition-colors",
    i < socialLinks.length - 1 ? "border-r border-divider" : ""
  ], "class:list")}> ${link.label} </a>`)} </div> <!-- Copyright row --> <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-5 max-w-[1280px] mx-auto"> <span class="text-sm text-muted-foreground">${t("footer.copy")}</span> <div class="flex items-center gap-6"> <a${addAttribute(tp("/brand"), "href")} class="text-sm text-muted-foreground hover:text-foreground transition-colors"> ${t("footer.brand")} </a> <a href="/legal/privacy-policy" class="text-sm text-muted-foreground hover:text-foreground transition-colors"> ${t("footer.privacy")} </a> <a href="/legal/terms-of-service" class="text-sm text-muted-foreground hover:text-foreground transition-colors"> ${t("footer.terms")} </a> </div> </div> </footer>`;
}, "/Users/cuevaio/projects/cs-web/src/components/SiteFooter.astro", void 0);

export { $$Nav as $, $$SiteFooter as a, useTranslatedPath as b, getLangFromUrl as g, useTranslations as u };
