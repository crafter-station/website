import type { APIRoute } from "astro";
import { ImageResponse } from "@takumi-rs/image-response";
import { teamMembers } from "@/lib/constants/team";

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n5ig.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3pQP8lc.ttf"
    ).then((r) => r.arrayBuffer()),
  ]);
  return { regular, bold };
}

export const GET: APIRoute = async ({ params, request }) => {
  const member = teamMembers.find((m) => m.username === params.member);
  if (!member) {
    return new Response("Not found", { status: 404 });
  }

  const siteUrl = new URL(request.url).origin;
  const photoUrl = `${siteUrl}${member.photoUrl}`;
  const iconUrl = `${siteUrl}/brand/icon-white.svg`;

  const fonts = await loadFonts();

  return new ImageResponse(
    {
      type: "div",
      props: {
        tw: "w-full h-full flex flex-col items-center justify-center relative",
        style: {
          background: "#131010",
          fontFamily: "IBM Plex Mono",
        },
        children: [
          // Spotlight glow
          {
            type: "div",
            props: {
              tw: "absolute",
              style: {
                top: "-200px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "800px",
                height: "600px",
                background:
                  "radial-gradient(ellipse at center, rgba(242, 237, 237, 0.06) 0%, rgba(242, 237, 237, 0.02) 40%, transparent 70%)",
              },
            },
          },
          // Circular photo with ring
          {
            type: "div",
            props: {
              tw: "flex items-center justify-center",
              style: {
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "3px solid #3D3838",
                padding: "4px",
                marginBottom: "28px",
                boxShadow:
                  "0 0 60px rgba(242, 237, 237, 0.05), 0 0 120px rgba(242, 237, 237, 0.02)",
              },
              children: {
                type: "img",
                props: {
                  src: photoUrl,
                  width: 170,
                  height: 170,
                  tw: "rounded-full",
                  style: {
                    objectFit: "cover",
                    borderRadius: "50%",
                  },
                },
              },
            },
          },
          // Name
          {
            type: "div",
            props: {
              tw: "text-center",
              style: {
                fontSize: "44px",
                fontWeight: 700,
                color: "#F2EDED",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              },
              children: member.name,
            },
          },
          // Position
          {
            type: "div",
            props: {
              tw: "text-center",
              style: {
                fontSize: "17px",
                fontWeight: 400,
                color: "#B8B2B2",
                marginTop: "10px",
              },
              children: member.position,
            },
          },
          // Location
          ...(member.location
            ? [
                {
                  type: "div",
                  props: {
                    tw: "text-center",
                    style: {
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#7F7A7A",
                      marginTop: "6px",
                    },
                    children: member.location,
                  },
                },
              ]
            : []),
          // Skills
          {
            type: "div",
            props: {
              tw: "flex flex-wrap justify-center",
              style: {
                marginTop: "20px",
                maxWidth: "700px",
                gap: "8px",
              },
              children: member.skills.slice(0, 6).map((skill) => ({
                type: "div",
                props: {
                  style: {
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "#B8B2B2",
                    border: "1px solid #3D3838",
                    padding: "8px 12px",
                  },
                  children: skill,
                },
              })),
            },
          },
          // Bottom branding
          {
            type: "div",
            props: {
              tw: "absolute bottom-7 flex items-center justify-center",
              style: {
                gap: "8px",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: iconUrl,
                    width: 18,
                    height: 18,
                    style: { opacity: 0.5 },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#7F7A7A",
                      letterSpacing: "0.05em",
                    },
                    children: "CRAFTER STATION",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 675,
      format: "png",
      fonts: [
        {
          name: "IBM Plex Mono",
          data: fonts.regular,
          weight: 400 as const,
        },
        {
          name: "IBM Plex Mono",
          data: fonts.bold,
          weight: 700 as const,
        },
      ],
    }
  );
};
