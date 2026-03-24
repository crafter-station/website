import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
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

  const fonts = await loadFonts();

  const html = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#131010",
        fontFamily: "IBM Plex Mono",
        position: "relative",
      },
      children: [
        // Circular photo with ring
        {
          type: "div",
          props: {
            style: {
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              border: "3px solid #3D3838",
              padding: "4px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            children: {
              type: "img",
              props: {
                src: photoUrl,
                width: 170,
                height: 170,
                style: {
                  borderRadius: "50%",
                  objectFit: "cover",
                },
              },
            },
          },
        },
        // Name
        {
          type: "div",
          props: {
            style: {
              fontSize: "44px",
              fontWeight: 700,
              color: "#F2EDED",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
            },
            children: member.name,
          },
        },
        // Position
        {
          type: "div",
          props: {
            style: {
              fontSize: "17px",
              fontWeight: 400,
              color: "#B8B2B2",
              marginTop: "10px",
              textAlign: "center",
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
                  style: {
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#7F7A7A",
                    marginTop: "6px",
                    textAlign: "center",
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
            style: {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
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
            style: {
              position: "absolute",
              bottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            },
            children: {
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
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 675,
    fonts: [
      {
        name: "IBM Plex Mono",
        data: fonts.regular,
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "IBM Plex Mono",
        data: fonts.bold,
        weight: 700 as const,
        style: "normal" as const,
      },
    ],
  });
};
