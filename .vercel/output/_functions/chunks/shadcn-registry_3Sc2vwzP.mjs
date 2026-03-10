import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BEF4PhYa.mjs';
import { T as TweetCard } from './TweetCard_CUS0ME7L.mjs';
import 'clsx';

const frontmatter = {
  "title": "Crafter Registry",
  "description": "AI Native Design System",
  "pubDate": "2025-08-04",
  "tags": ["crafter", "registry", "components"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "vibe-coding",
    "text": "Vibe Coding"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    hr: "hr",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "vibe-coding",
      children: "Vibe Coding"
    }), "\n", createVNode(_components.p, {
      children: "Today’s"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://linear.app/now/mercury-linear-ai-agents",
          children: "Mercury Linear AI Agents"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://vercel.com/blog/v0-vibe-coding-securely",
          children: "Vibe Coding Securely"
        })
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(TweetCard, {
      id: "1949519414912770065"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(TweetCard, {
      id: "1952083023161098373"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(TweetCard, {
      id: "1952037084677476575"
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

const url = "src/content/blog/shadcn-registry.mdx";
const file = "/Users/cuevaio/projects/cs-web/src/content/blog/shadcn-registry.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/cuevaio/projects/cs-web/src/content/blog/shadcn-registry.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
