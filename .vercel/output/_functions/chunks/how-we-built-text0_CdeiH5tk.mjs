import { a as createComponent, b as createAstro, m as maybeRenderHead, e as addAttribute, g as renderSlot, d as renderTemplate, r as renderComponent, c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BEF4PhYa.mjs';
import { T as TweetCard } from './TweetCard_CUS0ME7L.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro$1 = createAstro();
const $$Callout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Callout;
  const { type = "info", title, class: className } = Astro2.props;
  const typeStyles = {
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50",
    warning: "bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/50",
    success: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/50",
    error: "bg-red-50 dark:bg-red-950/20 border-red-200/50 dark:border-red-800/50"
  };
  const iconMap = {
    info: "\u2139\uFE0F",
    warning: "\u26A0\uFE0F",
    success: "\u2705",
    error: "\u274C"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex my-[1lh] flex-col gap-2 p-3 sm:p-4 rounded-xl border backdrop-blur-sm ${typeStyles[type]} ${className || ""}`, "class")}> ${title && renderTemplate`<div class="flex items-center gap-2"> <span class="text-sm">${iconMap[type]}</span> <span class="text-sm font-medium text-foreground">${title}</span> </div>`} <div class="text-sm text-foreground/80 leading-relaxed"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "/Users/cuevaio/projects/cs-web/src/components/Callout.astro", void 0);

const $$Astro = createAstro();
const $$Quote = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Quote;
  const {
    author,
    source,
    href,
    target = "_blank",
    class: className,
    content
  } = Astro2.props;
  const WrapperTag = href ? "a" : "div";
  return renderTemplate`${renderComponent($$result, "WrapperTag", WrapperTag, { "href": href, "target": href ? target : void 0, "class": `relative my-16 block no-underline ${className || ""}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<span class="relative block font-serif text-[20px] leading-[1.4] md:text-[26px] [&>p]:inline [&>p]:font-serif [&>p]:font-medium [&>p]:leading-[inherit]"> <span class="absolute left-[-12px] top-[-2px]" style="font-family: Georgia; opacity: 0.7; font-size: 1.2em;">"</span> <span class="opacity-[0.85] font-medium"> ${content} </span> <span class="absolute translate-x-1" style="font-family: Georgia; opacity: 0.7; font-size: 1.2em;">"</span> </span> <div class="mt-6 flex justify-end"> <div class="text-right"> <span class="text-[12px] font-normal leading-none no-underline opacity-70 tracking-wide">
— ${author} ${source && renderTemplate`<span class="mt-0.5 block text-muted-foreground/60 text-[11px] font-light"> ${source} </span>`} </span> </div> </div> ` })}`;
}, "/Users/cuevaio/projects/cs-web/src/components/Quote.astro", void 0);

const frontmatter = {
  "title": "How We Built Text0 in 10 Days",
  "description": "A behind-the-scenes look",
  "pubDate": "2025-04-28",
  "tags": ["hackathon", "development", "vercel", "AI", "writing"]
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "todo-partió-con-una-incomodidad",
    "text": "Todo partió con una incomodidad"
  }, {
    "depth": 3,
    "slug": "la-fricción-que-nadie-te-cuenta",
    "text": "La fricción que nadie te cuenta"
  }, {
    "depth": 3,
    "slug": "una-idea-empieza-a-tomar-forma",
    "text": "Una idea empieza a tomar forma"
  }, {
    "depth": 3,
    "slug": "prototipar-sin-frenos",
    "text": "Prototipar sin frenos"
  }, {
    "depth": 3,
    "slug": "la-regla-de-oro-todo-lo-que-no-asombra-se-corta",
    "text": "La regla de oro: todo lo que no asombra, se corta"
  }, {
    "depth": 3,
    "slug": "nuestro-stack-de-guerra",
    "text": "Nuestro stack de guerra"
  }, {
    "depth": 3,
    "slug": "dinámica-de-equipo-sin-egos-con-visión",
    "text": "Dinámica de equipo: sin egos, con visión"
  }, {
    "depth": 3,
    "slug": "el-tour-component-que-salvó-el-día",
    "text": "El tour component que salvó el día"
  }, {
    "depth": 3,
    "slug": "un-bug-a-las-3am",
    "text": "Un bug a las 3AM"
  }, {
    "depth": 3,
    "slug": "y-funcionó",
    "text": "¿Y funcionó?"
  }, {
    "depth": 3,
    "slug": "lo-que-viene",
    "text": "Lo que viene"
  }, {
    "depth": 3,
    "slug": "sobre-el-logo",
    "text": "Sobre el logo"
  }, {
    "depth": 3,
    "slug": "noches-sin-dormir-pero-sin-burnout",
    "text": "Noches sin dormir, pero sin burnout"
  }, {
    "depth": 2,
    "slug": "cómo-supimos-que-valía-la-pena",
    "text": "¿Cómo supimos que valía la pena?"
  }, {
    "depth": 2,
    "slug": "créditos",
    "text": "Créditos"
  }, {
    "depth": 2,
    "slug": "comunidad-y-menciones",
    "text": "Comunidad y menciones"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    br: "br",
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    img: "img",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode($$Callout, {
      type: "warning",
      title: "Nota",
      children: createVNode(_components.p, {
        children: "Este artículo está aún en proceso de escritura y revisión. Algunas secciones pueden estar incompletas o sujetas a cambios."
      })
    }), "\n", createVNode($$Quote, {
      author: "Railly Hugo & Anthony Cueva",
      content: "Construimos el 80% de text0 en 4 días"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "todo-partió-con-una-incomodidad",
      children: "Todo partió con una incomodidad"
    }), "\n", createVNode(_components.p, {
      children: ["Era domingo por la mañana. Anthony y yo llevábamos una semana iterando ideas para la hackathon global de Vercel. En el radar estaba ", createVNode(_components.strong, {
        children: "Gradual"
      }), ", nuestra plataforma de aprendizaje, con spaced repetition y memoria contextual. Pero algo no nos cerraba."]
    }), "\n", createVNode(_components.p, {
      children: ["Gradual es una herramienta poderosa. Pero es una que brilla a largo plazo. Y sabíamos que en una hackathon no tienes ese lujo. Tienes segundos. Segundos para capturar la atención de un jurado, de un usuario, de una primera impresión. Así que tocaba hacer algo con ", createVNode(_components.em, {
        children: "shock value"
      }), ". Con impacto inmediato."]
    }), "\n", createVNode(_components.p, {
      children: "Fue entonces que recordamos este tweet:"
    }), "\n", createVNode(TweetCard, {
      id: "1903528336241861113"
    }), "\n", createVNode(_components.p, {
      children: ["Ese fue el disparador. La frase “", createVNode(_components.strong, {
        children: "Absurdly smart autocomplete"
      }), "” nos quedó zumbando en la cabeza. Y el resto fue caer por la madriguera."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "la-fricción-que-nadie-te-cuenta",
      children: "La fricción que nadie te cuenta"
    }), "\n", createVNode(_components.p, {
      children: "Como devs, estamos acostumbrados a vivir en mil contextos. Copias algo de Slack, lo pegas en Notion, lo discutes en X, lo reescribes en VSCode. Y ese ir y venir te cansa más de lo que crees."
    }), "\n", createVNode(_components.p, {
      children: ["Yo fui usuario de GitHub Copilot desde 2021, desde la beta. Pero sentía que faltaba algo. No quería que me vomiten respuestas. Quería una herramienta que ", createVNode(_components.em, {
        children: "pensara conmigo"
      }), ". Que me ayudara a escribir, no a reemplazarme."]
    }), "\n", createVNode(_components.p, {
      children: "La idea era clara: un copiloto, pero para texto. Y no un chatbot. Algo integrado, discreto, veloz. Que entienda el contexto, las referencias, los nombres, los memes, los documentos abiertos. Y te sople justo lo que necesitas. Sin pedir permiso."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "una-idea-empieza-a-tomar-forma",
      children: "Una idea empieza a tomar forma"
    }), "\n", createVNode(_components.p, {
      children: "No hubo wireframes en Figma. Hubo código directo."
    }), "\n", createVNode(_components.p, {
      children: ["El primer “how it started” lo publicó Anthony en ", createVNode(_components.a, {
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7316937079731466240/",
        children: "este post de LinkedIn"
      }), ". Fue ahí donde por primera vez dijimos en público:"]
    }), "\n", createVNode($$Quote, {
      author: "Anthony Cueva",
      source: "LinkedIn Post",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7316937079731466240/",
      content: "I'm building the cursor for writing. An autocompletion system with your information. Papers, news, blogs... your text editor will have this context and suggest absurdly smart autocomplete."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://yourimagehere.com/anthony-demo.png",
        alt: "Captura del video demo inicial de Anthony"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Ahí ya se intuía lo que queríamos construir. Nada de promesas vacías, ni humo.", createVNode(_components.br, {}), "\nEra una demo funcional, en caliente, con IA rellenando texto en base a contexto real. Documentos recientes, estilo, intención."]
    }), "\n", createVNode(_components.p, {
      children: ["En ese momento supimos: esto no era una idea más. Esto ", createVNode(_components.strong, {
        children: "merecía nacer bien"
      }), "."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "prototipar-sin-frenos",
      children: "Prototipar sin frenos"
    }), "\n", createVNode(_components.p, {
      children: "Abrimos Figma. Tiramos líneas. Sketches del onboarding, documentos recientes, el input principal."
    }), "\n", createVNode(_components.p, {
      children: "Yo ya podía visualizarlo: minimal, rápido, sin loading screens. Que abra y escribas. Sin login. Sin onboarding forzado. Todo con microinteracciones. Inspiración de Cursor.sh y Superhuman, pero con nuestro toque."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://yourimagehere.com/ui-mockup.png",
        alt: "Diseño UI inicial"
      })
    }), "\n", createVNode(_components.p, {
      children: "Anthony, mientras tanto, ya probaba latencias de modelos, hacía pruebas de generación, afinaba prompts."
    }), "\n", createVNode(_components.p, {
      children: ["Cuatro días después: ", createVNode(_components.strong, {
        children: "primer MVP funcional."
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "la-regla-de-oro-todo-lo-que-no-asombra-se-corta",
      children: "La regla de oro: todo lo que no asombra, se corta"
    }), "\n", createVNode(_components.p, {
      children: ["Nos hicimos una promesa:", createVNode(_components.br, {}), "\nTodo lo que no genere un “wow” en menos de 5 segundos, se va."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Incluimos:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Un tour onboarding visual estilo Notion, pero agresivo"
      }), "\n", createVNode(_components.li, {
        children: "Crear documento, activar memoria"
      }), "\n", createVNode(_components.li, {
        children: "Selección de texto con quick actions: mejorar, formalizar, escuchar, etc."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Cortamos:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Sonidos tipo Tryklack (por lag, overhead)"
      }), "\n", createVNode(_components.li, {
        children: "Integraciones con Gmail/Slack (por permisos y complejidad)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Había que dejar el ego de lado y enfocarse en lo esencial. ", createVNode(_components.strong, {
        children: "Nada de reinventar la rueda. Solo construir lo que nadie más se atrevía."
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "nuestro-stack-de-guerra",
      children: "Nuestro stack de guerra"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "Next.js"
        }), " para la velocidad y despliegue con Vercel"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "Tailwind + shadcn/ui"
        }), " para diseño limpio y componentes rápidos"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "Vercel AI SDK + GPT-4o-mini"
        }), " como core del autocomplete"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "ElevenLabs"
        }), " (raw API) para leer texto en voz alta"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.code, {
          children: "Trigger.dev"
        }), " para document streaming en vivo"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Claude Sonnet 3.5 fue nuestra navaja suiza. Le pasábamos capturas, prompts largos y le decíamos:"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "“Eres un senior engineer de Vercel. Hazlo limpio. Sin errores. Sin dudas.”"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "El resultado: código que no solo compilaba, sino que respetaba nuestro estilo visual."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "dinámica-de-equipo-sin-egos-con-visión",
      children: "Dinámica de equipo: sin egos, con visión"
    }), "\n", createVNode(_components.p, {
      children: "Yo lideraba la parte visual y de UX. Diseñaba, maquetaba, codificaba."
    }), "\n", createVNode(_components.p, {
      children: "Anthony afinaba los prompts, optimizaba performance, elegía modelos, manejaba LLMs como quien toca un piano."
    }), "\n", createVNode(_components.p, {
      children: "Nos turnábamos para testear, reescribir, recortar. Cero fricción. Solo flow."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://yourimagehere.com/hackathon-night.png",
        alt: "Hackathon late night"
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "el-tour-component-que-salvó-el-día",
      children: "El tour component que salvó el día"
    }), "\n", createVNode(_components.p, {
      children: "No estaba planeado. Pero algo no nos dejaba dormir."
    }), "\n", createVNode(_components.p, {
      children: ["¿Cómo le haces entender a alguien que tu app tiene ", createVNode(_components.em, {
        children: "memoria, acciones, edición, voz"
      }), ", y todo eso sin explicarle nada?"]
    }), "\n", createVNode(_components.p, {
      children: "Creamos un tour visual. Cuando abrías text0, lo primero que veías eran hints, sugerencias, tips ocultos. Al crear un documento, aparecía otro. Te mostraba que si seleccionabas texto, podías hacer magia."
    }), "\n", createVNode(_components.p, {
      children: "Y esa decisión, tomada 6 horas antes del deadline, fue la que Lee Robinson destacó en vivo."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://yourimagehere.com/tour-demo.png",
        alt: "Tour demo"
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "un-bug-a-las-3am",
      children: "Un bug a las 3AM"
    }), "\n", createVNode(_components.p, {
      children: "Trigger.dev no sincronizaba bien algunos cambios en vivo. Y eso rompía el flujo."
    }), "\n", createVNode(_components.p, {
      children: ["Sin tiempo para debug profundo, buscamos código antiguo de otro proyecto, lo adaptamos, lo inyectamos. ", createVNode(_components.strong, {
        children: "Funcionó. No perfecto. Pero suficiente."
      })]
    }), "\n", createVNode(_components.p, {
      children: "Y seguimos adelante."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "y-funcionó",
      children: "¿Y funcionó?"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Más de 2,100 usuarios en la primera semana"
      }), "\n", createVNode(_components.li, {
        children: "Cero marketing. Todo orgánico"
      }), "\n", createVNode(_components.li, {
        children: "10,000 visitas únicas"
      }), "\n", createVNode(_components.li, {
        children: "Usuarios desde Japón, Alemania, Brasil, USA"
      }), "\n", createVNode(_components.li, {
        children: "280+ estrellas en GitHub en menos de una semana"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["text0 ", createVNode(_components.strong, {
        children: "vivió por mérito propio"
      }), ". La comunidad lo abrazó. Y eso fue todo."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "lo-que-viene",
      children: "Lo que viene"
    }), "\n", createVNode(_components.p, {
      children: "text0 no murió en la hackathon."
    }), "\n", createVNode(_components.p, {
      children: "Queremos integrarlo dentro de Gradual como feature de escritura avanzada:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Editor markdown con memoria contextual"
      }), "\n", createVNode(_components.li, {
        children: "Citas automáticas tipo “Turnitin invertido”"
      }), "\n", createVNode(_components.li, {
        children: "Autocomplete inteligente de notas y resúmenes"
      }), "\n", createVNode(_components.li, {
        children: "Vista canvas para organizar ideas, con AI como copiloto"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Queremos que escribir vuelva a sentirse como ", createVNode(_components.strong, {
        children: "pensar sin interrupciones"
      }), "."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "sobre-el-logo",
      children: "Sobre el logo"
    }), "\n", createVNode(_components.p, {
      children: "Usé GPT-4o-mini para diseñarlo:"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "“Una tecla negra 3D con ‘t0’ blanco, estilo v0, con luz suave y vista en perspectiva”"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Transformé el PNG a SVG, lo pulí en Figma, y lo incrusté en la UI.", createVNode(_components.br, {}), "\nSimple. Atemporal. Sin íconos vacíos."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://yourimagehere.com/text0-logo.png",
        alt: "Logo final"
      })
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h3, {
      id: "noches-sin-dormir-pero-sin-burnout",
      children: "Noches sin dormir, pero sin burnout"
    }), "\n", createVNode(_components.p, {
      children: ["Dos madrugadas seguidas. Café. Pan con pollo. Código.", createVNode(_components.br, {}), "\nTodo en mi depa. Y no nos quemamos. Solo entramos en flow."]
    }), "\n", createVNode(_components.p, {
      children: "Por eso volveríamos a hacerlo mañana mismo."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h2, {
      id: "cómo-supimos-que-valía-la-pena",
      children: "¿Cómo supimos que valía la pena?"
    }), "\n", createVNode(_components.p, {
      children: ["No fue el premio. Ni el stream de Lee.", createVNode(_components.br, {}), "\nFue ver gente que nunca nos conoció, usar la app. Explorarla. Compartirla."]
    }), "\n", createVNode(_components.p, {
      children: "Sin que les dijéramos nada."
    }), "\n", createVNode(_components.p, {
      children: "Eso —esa validación silenciosa— fue nuestro verdadero premio."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h2, {
      id: "créditos",
      children: "Créditos"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "text0 fue creado por:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Railly Hugo"
        }), " – Design Engineer / Frontend / Ideación UX"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Anthony Cueva"
        }), " – Prompt Engineer / Infraestructura / AI"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Ignacio Rueda"
        }), " – Backend / Trigger.dev / Testing final"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Shiara Arauzo"
        }), " – UX feedback loop / Testeo interno"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Liz Riveros"
        }), " – QA / Validación funcional / Demo review"]
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h2, {
      id: "comunidad-y-menciones",
      children: "Comunidad y menciones"
    }), "\n", createVNode(_components.p, {
      children: ["📣 ", createVNode(_components.a, {
        href: "https://www.linkedin.com/posts/vercel_hackathon-text0-global-activity-7184735573543028737-iT4L",
        children: "Post oficial de Vercel anunciando ganadores"
      }), createVNode(_components.br, {}), "\n📝 ", createVNode(_components.a, {
        href: "https://www.linkedin.com/posts/tomas-calle_ai-text0-hackathon-activity-7184806011317704705-GNmn",
        children: "Reflexión de Tomás Calle sobre nuestra historia"
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: ["— Railly Hugo & Anthony Cueva", createVNode(_components.br, {}), "\n🧠 ", createVNode(_components.a, {
        href: "https://github.com/raillydev/text0",
        children: "Repo"
      }), "  | ✍️ ", createVNode(_components.a, {
        href: "https://text0.dev",
        children: "App"
      }), "  | 🧵 ", createVNode(_components.a, {
        href: "https://x.com/raillyhugo",
        children: "Twitter"
      })]
    }), "\n", createVNode($$Quote, {
      author: "Crafter Station",
      children: createVNode(_components.p, {
        children: "Built in 10 days. Powered by a decade of taste."
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/how-we-built-text0.mdx";
const file = "/Users/cuevaio/projects/cs-web/src/content/blog/how-we-built-text0.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/cuevaio/projects/cs-web/src/content/blog/how-we-built-text0.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
