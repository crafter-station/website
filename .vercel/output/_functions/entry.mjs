import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BZS9GdMA.mjs';
import { manifest } from './manifest_Cclz83bg.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/subscribe.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page4 = () => import('./pages/brand.astro.mjs');
const _page5 = () => import('./pages/cal.astro.mjs');
const _page6 = () => import('./pages/deck.astro.mjs');
const _page7 = () => import('./pages/es/blog.astro.mjs');
const _page8 = () => import('./pages/es/events.astro.mjs');
const _page9 = () => import('./pages/es/projects.astro.mjs');
const _page10 = () => import('./pages/es/team/_member_.astro.mjs');
const _page11 = () => import('./pages/es/team.astro.mjs');
const _page12 = () => import('./pages/es.astro.mjs');
const _page13 = () => import('./pages/events.astro.mjs');
const _page14 = () => import('./pages/projects.astro.mjs');
const _page15 = () => import('./pages/pt-br/blog.astro.mjs');
const _page16 = () => import('./pages/pt-br/events.astro.mjs');
const _page17 = () => import('./pages/pt-br/projects.astro.mjs');
const _page18 = () => import('./pages/pt-br/team/_member_.astro.mjs');
const _page19 = () => import('./pages/pt-br/team.astro.mjs');
const _page20 = () => import('./pages/pt-br.astro.mjs');
const _page21 = () => import('./pages/talents/_id_.astro.mjs');
const _page22 = () => import('./pages/talents.astro.mjs');
const _page23 = () => import('./pages/team/_member_.astro.mjs');
const _page24 = () => import('./pages/team.astro.mjs');
const _page25 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/subscribe.ts", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/blog/[...slug].astro", _page3],
    ["src/pages/brand.astro", _page4],
    ["src/pages/cal/index.astro", _page5],
    ["src/pages/deck.astro", _page6],
    ["src/pages/es/blog/index.astro", _page7],
    ["src/pages/es/events/index.astro", _page8],
    ["src/pages/es/projects/index.astro", _page9],
    ["src/pages/es/team/[member].astro", _page10],
    ["src/pages/es/team/index.astro", _page11],
    ["src/pages/es/index.astro", _page12],
    ["src/pages/events/index.astro", _page13],
    ["src/pages/projects/index.astro", _page14],
    ["src/pages/pt-br/blog/index.astro", _page15],
    ["src/pages/pt-br/events/index.astro", _page16],
    ["src/pages/pt-br/projects/index.astro", _page17],
    ["src/pages/pt-br/team/[member].astro", _page18],
    ["src/pages/pt-br/team/index.astro", _page19],
    ["src/pages/pt-br/index.astro", _page20],
    ["src/pages/talents/[id].astro", _page21],
    ["src/pages/talents/index.astro", _page22],
    ["src/pages/team/[member].astro", _page23],
    ["src/pages/team/index.astro", _page24],
    ["src/pages/index.astro", _page25]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "dea71a02-71dd-4474-8ba6-69cd5554bad5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
