import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

const TOPICS = ['facilitation', 'programmes', 'coaching', 'supervision', 'mediation', 'etapes'] as const

const Body = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  topic: z.enum(TOPICS),
  message: z.string().trim().min(1).max(3000),
  programmesOptIn: z.boolean(),
  language: z.enum(['fr', 'en']),
  page: z.string().max(200),
  website: z.string().max(200).optional(), // honeypot
})

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let raw: unknown
  try { raw = await req.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  const parsed = Body.safeParse(raw)
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

  // Bots fill the hidden field: pretend success, forward nothing.
  if (parsed.data.website) return json({ ok: true })

  const url = Deno.env.get('INTAKE_URL')
  const secret = Deno.env.get('INTAKE_SECRET')
  if (!url || !secret) return json({ error: 'CRM not configured' }, 503)

  const d = parsed.data
  const service = d.topic === 'programmes' ? 'programme_design' : d.topic
  const wording = d.language === 'fr'
    ? 'Me prévenir des prochains programmes de RegenB France. Désinscription en un clic.'
    : 'Let me know about upcoming RegenB France programmes. One-click unsubscribe.'
  const entry = {
    form_type: d.topic === 'etapes' ? 'etapes_interest' : 'enquiry',
    first_name: d.firstName,
    email: d.email,
    language: d.language,
    service_interest: service,
    message: d.message,
    page_url: `https://www.regenb.fr${d.page}`,
    consent_invitations: d.programmesOptIn,
    ...(d.programmesOptIn ? { consent_wording: wording } : {}),
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Intake-Secret': secret },
    body: JSON.stringify(entry),
  })
  if (!res.ok) {
    console.error(`CRM intake failed [${res.status}]: ${await res.text()}`)
    return json({ error: 'CRM rejected the entry' }, 502)
  }
  await res.text()
  return json({ ok: true })
})
