import type { APIRoute } from "astro";
import { Resend } from "resend";
import ContactFormEmail from "../../components/ContactFormEmail";
import ConfirmationEmail from "../../components/ConfirmationEmail";
import { renderAsync } from "@react-email/render";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    console.log("Body:", body);

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Faltan campos requeridos",
        }),
        { status: 400 }
      );
    }

    const contactFormHtml = await renderAsync(
      ContactFormEmail({ name, email, message })
    );

    const confirmationHtml = await renderAsync(ConfirmationEmail({ name }));

    await resend.emails.send({
      from: "Crafter Station <noreply@send.crafter-station.com>",
      to: import.meta.env.CONTACT_EMAIL,
      subject: "Nuevo Mensaje de Contacto",
      html: contactFormHtml,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });

    await resend.emails.send({
      from: "Crafter Station <noreply@send.crafter-station.com>",
      to: email,
      subject: "Hemos recibido tu mensaje - Crafter Station",
      html: confirmationHtml,
      text: `Hola ${name},\n\nHemos recibido tu mensaje y te agradecemos por ponerte en contacto con nosotros. Nuestro equipo revisará tu solicitud y te responderemos lo antes posible.\n\nSi tienes alguna pregunta adicional, no dudes en contactarnos.\n\n¡Que tengas un excelente día!\n\n© 2024 Crafter Station. Todos los derechos reservados.`,
    });

    return new Response(
      JSON.stringify({
        message: "Emails enviados exitosamente",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Error al procesar la solicitud",
      }),
      { status: 500 }
    );
  }
};
