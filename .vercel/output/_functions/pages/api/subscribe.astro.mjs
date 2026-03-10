import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const LUMA_API_KEY = "secret-l99hZ9Ve4EYBoBtBCN0SrxLVn";
const RESEND_API_KEY = "re_bB6RPbXu_DXEeVDgVT6sJBKTYQvqo5srs";
const POST = async ({ request }) => {
  let email;
  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const errors = [];
  try {
    const lumaRes = await fetch("https://api.lu.ma/public/v1/calendar/import-people", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "x-luma-api-key": LUMA_API_KEY
      },
      body: JSON.stringify({ infos: [{ email }] })
    });
    if (!lumaRes.ok) {
      const text = await lumaRes.text();
      console.error("[subscribe] Luma error:", lumaRes.status, text);
      errors.push("luma");
    }
  } catch (err) {
    console.error("[subscribe] Luma fetch failed:", err);
    errors.push("luma");
  }
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error: resendError } = await resend.emails.send({
      from: "Anthony from Crafter <hello@crafter.build>",
      replyTo: "anthony@crafterstation.com",
      to: email,
      subject: "Welcome to Crafter Station",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Crafter Station</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #131010;
      color: #F2EDED;
      font-family: 'IBM Plex Mono', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
      padding: 48px 24px;
    }
    .container { max-width: 560px; margin: 0 auto; }
    .logo {
      font-size: 16px;
      font-weight: 700;
      color: #F2EDED;
      margin-bottom: 40px;
      letter-spacing: -0.02em;
    }
    .logo span { font-weight: 400; }
    .divider {
      border: none;
      border-top: 1px solid #3D3838;
      margin: 32px 0;
    }
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #F2EDED;
      margin-bottom: 16px;
    }
    p { color: #B8B2B2; margin-bottom: 16px; }
    .bullet { color: #716B6A; margin-right: 8px; }
    .link {
      color: #F2EDED;
      text-decoration: underline;
    }
    .cta {
      display: inline-block;
      margin-top: 8px;
      padding: 10px 20px;
      background-color: #F2EDED;
      color: #131010;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      font-family: 'IBM Plex Mono', 'Courier New', monospace;
    }
    .footer { margin-top: 48px; color: #7F7A7A; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">crafter<span>station</span></div>
    <hr class="divider" />
    <h1>[*] Welcome to the community</h1>
    <p>
      You are now part of Crafter Station — a community of engineers, designers,
      and builders who ship products and share what they learn across LATAM.
    </p>
    <p>
      <span class="bullet">[*]</span>
      We host Code Brews, hackathons, and product launches. You have been added to
      the <strong style="color:#F2EDED">hack0</strong> calendar so you will get notified
      about upcoming events.
    </p>
    <p>
      <span class="bullet">[*]</span>
      Browse upcoming events, meet the team, and start shipping.
    </p>
    <hr class="divider" />
    <a href="https://luma.com/hack0" class="cta">See upcoming events →</a>
    <hr class="divider" />
    <p style="color:#B8B2B2;margin-bottom:4px;">Anthony</p>
    <p style="color:#7F7A7A;font-size:12px;margin:0;"><a href="https://crafterstation.com" class="link" style="color:#7F7A7A;">crafterstation.com</a></p>
    <div class="footer">
      <p>© 2026 Crafter Station · <a href="https://crafter.build" class="link" style="color:#7F7A7A">crafter.build</a></p>
      <p style="margin-top:8px">You received this because you subscribed at crafter.build.</p>
    </div>
  </div>
</body>
</html>`
    });
    if (resendError) {
      console.error("[subscribe] Resend API error:", JSON.stringify(resendError));
      errors.push("resend");
    } else {
      console.log("[subscribe] Resend sent:", data?.id);
    }
  } catch (err) {
    console.error("[subscribe] Resend exception:", err);
    errors.push("resend");
  }
  if (errors.length === 2) {
    return new Response(JSON.stringify({ error: "Subscription failed. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
