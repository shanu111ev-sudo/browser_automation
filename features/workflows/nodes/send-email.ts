import { resend } from "@/lib/resend"

// Must be an address on a verified Resend domain (see resend.com/domains).
// Override with RESEND_FROM in .env.local and in the Trigger.dev dashboard.
const DEFAULT_FROM = "Strand <strand@mail.devs24.com>"

export async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  const from = (process.env.RESEND_FROM ?? DEFAULT_FROM).trim()

  if (!from.includes("@")) {
    throw new Error(
      `Invalid RESEND_FROM "${from}". Use email@domain.com or Name <email@domain.com>.`
    )
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing. Add it to .env.local and to Trigger.dev → Project → Environment Variables (dev + prod)."
    )
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html: body,
  })

  // The Resend SDK returns { data, error } and does not throw on API errors.
  // Throw so the run marks this step failed instead of looking successful.
  if (error || !data) {
    throw new Error(error?.message ?? "Resend returned no email id")
  }

  return { id: data.id }
}
