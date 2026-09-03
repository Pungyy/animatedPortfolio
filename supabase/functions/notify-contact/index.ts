// Supabase Edge Function — envoie un email quand un message de contact arrive.
// Déclenchée par un trigger Postgres (pg_net) sur INSERT dans public.contacts.
//
// Variables d'environnement à définir (Dashboard > Edge Functions > Secrets) :
//   RESEND_API_KEY      — clé API Resend (https://resend.com)
//   CONTACT_NOTIFY_TO   — adresse qui reçoit les notifications
//   CONTACT_NOTIFY_FROM — expéditeur vérifié chez Resend (ex: "Portfolio <contact@ianil.fr>")

Deno.serve(async (req) => {
  try {
    const secret = Deno.env.get("WEBHOOK_SECRET");
    if (secret && req.headers.get("x-webhook-secret") !== secret) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const c = body.record ?? body;

    if (!c || !c.email) {
      return new Response("no record", { status: 200 });
    }

    const key = Deno.env.get("RESEND_API_KEY");
    const to = Deno.env.get("CONTACT_NOTIFY_TO");
    const from =
      Deno.env.get("CONTACT_NOTIFY_FROM") ?? "Portfolio <onboarding@resend.dev>";

    if (!key || !to) {
      console.warn("notify-contact: RESEND_API_KEY / CONTACT_NOTIFY_TO manquants");
      return new Response("not configured", { status: 200 });
    }

    const subject = `Nouveau message — ${c.name ?? c.email}`;
    const text = [
      `Nom : ${c.name ?? "—"}`,
      `Email : ${c.email}`,
      c.subject ? `Sujet : ${c.subject}` : null,
      "",
      c.message ?? "",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: c.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      console.error("resend error", res.status, await res.text());
      return new Response("resend failed", { status: 502 });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("error", { status: 500 });
  }
});
