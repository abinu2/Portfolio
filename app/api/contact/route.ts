import { NextResponse, type NextRequest } from 'next/server';
import { isValidEmail } from '@/lib/utils';
import type { ContactApiResponse, ContactPayload } from '@/types';

/**
 * POST /api/contact
 *
 * Accepts { name, email, message }, validates, rate-limits, and forwards.
 * In production with SMTP_* env vars set, sends mail via Nodemailer;
 * otherwise logs the submission to the server console (development mode).
 */

/* ------------------------------------------------------------------ */
/* Rate limiting                                                        */
/*                                                                      */
/* Simple in-memory sliding window: 3 submissions per IP per hour.      */
/* NOTE: replace with Redis (e.g. Upstash) in production — in-memory    */
/* state does not survive restarts and is per-instance in serverless.   */
/* ------------------------------------------------------------------ */

const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Request body must be a JSON object.' };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return { ok: false, error: 'Name is required.' };
  }
  if (typeof email !== 'string' || email.trim().length === 0) {
    return { ok: false, error: 'Email is required.' };
  }
  if (!isValidEmail(email.trim())) {
    return { ok: false, error: 'Email address is not valid.' };
  }
  if (typeof message !== 'string' || message.trim().length === 0) {
    return { ok: false, error: 'Message is required.' };
  }
  if (message.length > 5000) {
    return { ok: false, error: 'Message must be under 5000 characters.' };
  }

  return {
    ok: true,
    data: { name: name.trim(), email: email.trim(), message: message.trim() },
  };
}

/* ------------------------------------------------------------------ */
/* Delivery                                                             */
/* ------------------------------------------------------------------ */

async function deliver(payload: ContactPayload): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_EMAIL) {
    // Lazy import keeps nodemailer out of the bundle when unused.
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: payload.email,
      subject: `Portfolio contact from ${payload.name}`,
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
    });
    return;
  }

  // Development fallback: log to server console.
  console.info('[api/contact] New submission:', JSON.stringify(payload, null, 2));
}

/* ------------------------------------------------------------------ */
/* Handler                                                              */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Request body must be valid JSON.' },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  try {
    await deliver(result.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please email directly.' },
      { status: 500 },
    );
  }
}
