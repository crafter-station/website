import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BEF4PhYa.mjs';
import 'clsx';

const frontmatter = {
  "title": "AI-First Manifesto",
  "description": "The new baseline for engineering at Crafter Station.",
  "pubDate": "2025-06-21",
  "tags": ["AI", "automation", "LLM", "engineering"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "documentation-is-as-crucial-as-coding",
    "text": "Documentation is as crucial as coding"
  }, {
    "depth": 2,
    "slug": "intention-matters",
    "text": "Intention matters"
  }, {
    "depth": 2,
    "slug": "the-agent-era",
    "text": "The Agent Era"
  }, {
    "depth": 2,
    "slug": "agents-at-crafter-station",
    "text": "Agents at Crafter Station"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Just flow…Automations all the way around. Have we been able to automate as much as we can?"
    }), "\n", createVNode(_components.p, {
      children: "At Crafter Station, we’ve been using several AI Tools, we can say we are an AI-First Open Source Organization in Peru. I’m not aware of any other org that has proclaimed themselves as such, but the point is, that we shouldn’t stop there."
    }), "\n", createVNode(_components.p, {
      children: "We have the moral responsibility of use AI as a first-citizen.\nSooner than later, we all developers will start merging the line between creativity, coding, and problem solving. And when time arises, we need to be prepared."
    }), "\n", createVNode(_components.p, {
      children: "That’s why I’m writing this. It’s an attempt to warn myself, that I should be doing more than just vibecoding. I should be building the foundations of the next big shift."
    }), "\n", createVNode(_components.h2, {
      id: "documentation-is-as-crucial-as-coding",
      children: "Documentation is as crucial as coding"
    }), "\n", createVNode(_components.p, {
      children: "In LLMs era, documentation is a non-negotiable. For instance, have you ever been locked in one-single LLM chat session, then you realize it’s losing context. Well, in that precise moment, it’s too late, your history, logic, details have been poured.\nChat sessions can be summarized? Of course, but you’ll lose important nuances that you don’t realize it’s so relevant for LLMs to accomplish theirs tasks.\nMy take? Let LLMs write their own change-log. After each iteration they must be asking themselves: What just changed?\nThink of it as a post-thinking process, a retrospective."
    }), "\n", createVNode(_components.h2, {
      id: "intention-matters",
      children: "Intention matters"
    }), "\n", createVNode(_components.p, {
      children: ["Rules should speak by ourselves. Rules are more than just “You must do this, this is my file structure,[…]”.\nRules as must bound the space where the LLM can operate.\nRules must express the current state of the project. No evergreen rules can we ever written. Codebases are, in our era, highly-changing, and we have the obligation to update rules as much as we can.\nRules is a vague term, what’s a rule? where to place it?. I’ll put it in concrete words, Rules must be the ", createVNode(_components.code, {
        children: "llms.txt"
      }), " of our codebases. I propose ", createVNode(_components.code, {
        children: "LLMS.md"
      }), ", a file that states:"]
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "File Structure"
        }), ": A tree structure + short and precise description of what each file does."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Business Relevance"
        }), ": Why this directory matters, what’s the high level purpose of it, or this fits on our whole codebase."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Change-Log"
        }), ": How this directory have changed over time. What LLMs were asked to do, and how they do it, and why they implemented that way."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "LLMs similarly to humans, have a cognitive capacity. We name it “context”. We should free up their work memory, by “pre-computing” the relevant context they will need over the chat session. We must avoid codebase exploration on every new thread, so LLMs can focus on things that really matters since the zero-shot."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "UI Development as a commodity"
      }), "\nUI landscape is bloated by shadcn/ui. Yeah I got shadcn/ui is an idea / a way of thinking, not a component library. Still, it’s based on ", createVNode(_components.a, {
        href: "https://www.radix-ui.com/",
        children: "Radix UI"
      }), ", which indeed is a component library."]
    }), "\n", createVNode(_components.p, {
      children: "For prototyping is the way to go, for going long-term, we must curate our own css vars, which is a crucial step, if we want to build rich experiences."
    }), "\n", createVNode(_components.p, {
      children: "Having said this, UI is a commodity right now, we can feed LLMs with screenshots, HTML + Tailwind Classes from a tech company. And most likely LLMs will get it right and output a decent first version of it. You still have to tweak it, but hey, it’s a great starting point."
    }), "\n", createVNode(_components.p, {
      children: "So how we make LLMs to output world-class level UIs, with a single prompt?"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "TASTE"
        }), ": You have to ", createVNode(_components.a, {
          href: "https://emilkowal.ski/ui/developing-taste",
          children: "develop taste"
        })]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "CLEAR UX"
        }), ": You have to envision the UX, and express it clearly in words. If not sure, let LLM brainstorm the UX."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "GOOD EXAMPLES"
        }), ": You have to provide screenshots / code samples of your UI/UX references, that you feel it fits well."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "LIB DOCS"
        }), ": If some lib is involved, provide the exact content you, as human, would have needed to perform the task precisely."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "SCHEMA"
        }), ": If any, provide the schema you want to map into UI. If you can add clear annotations on what each key represents, or which value are the most important, add it."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "the-agent-era",
      children: "The Agent Era"
    }), "\n", createVNode(_components.p, {
      children: "Agentic Frameworks have gained popularity in the last months. LangGraph, Vercel AI SDK (partially), n8n, etc.\nNew startups are emergin thanks to these libraries but specially to new protocols such as MCP (Model Context Protocol) and A2A (Agent to Agent)."
    }), "\n", createVNode(_components.p, {
      children: "Are companies overhyping these techs? Most likely. Over-engineering is the most common anti-pattern. But how to effectively build a agent that performs human tasks and optimize to have relatively good success?"
    }), "\n", createVNode(_components.p, {
      children: "I’d say UI-first system design is a must. You can have the hardcore backend team in the world. But, if your UI sucks, you’re done. In this era, where everyone is competing for you attention, you’ll be harshly punished."
    }), "\n", createVNode(_components.p, {
      children: "Let’s face the empty canvas. How do you envision the best UX flow? What’s the best happy path that it’s possible with the current technology?"
    }), "\n", createVNode(_components.p, {
      children: "Write down your ideas, explain your most delusional thoughts, and over iterations you’ll get THE IDEA. That idea is nothing without implementation, and nothing without a hardcore backend team."
    }), "\n", createVNode(_components.p, {
      children: "Think of it as having a junior-grade blueprint of a house, doesn’t matter how good your constructors are, the output will be a junior-grade building."
    }), "\n", createVNode(_components.h2, {
      id: "agents-at-crafter-station",
      children: "Agents at Crafter Station"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Can we outsource taste to LLMs?"
      }), "\n", createVNode(_components.li, {
        children: "How do we build an expressive meta"
      }), "\n", createVNode(_components.li, {
        children: ["Specific Coding Agents?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Payments Agent"
          }), "\n", createVNode(_components.li, {
            children: "Authentication Agent"
          }), "\n", createVNode(_components.li, {
            children: "Product Agent"
          }), "\n", createVNode(_components.li, {
            children: "Design Agent"
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Master Agent"
            }), ": The agent I actually interact with"]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {}), "\n"]
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

const url = "src/content/blog/ai-first-manifesto.mdx";
const file = "/Users/cuevaio/projects/cs-web/src/content/blog/ai-first-manifesto.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/cuevaio/projects/cs-web/src/content/blog/ai-first-manifesto.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
