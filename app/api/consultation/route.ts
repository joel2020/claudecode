import { NextResponse } from "next/server";

/**
 * Consultation intake endpoint.
 *
 * PRODUCTION NOTE (see docs/placeholder-inventory.md):
 * This route validates and acknowledges requests but does not yet persist them.
 * Before launch it must be connected to Medism's secure intake destination
 * (CRM or encrypted case store) and a coordinator notification channel.
 * Medical-report files are intentionally NOT transmitted through this endpoint;
 * secure file intake must be provisioned separately with encrypted storage.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const required = ["country", "language", "forWhom", "situation", "name", "contactMethod", "contactDetail"];
  for (const key of required) {
    if (typeof body[key] !== "string" || !(body[key] as string).trim()) {
      return NextResponse.json({ ok: false, error: `Missing field: ${key}` }, { status: 400 });
    }
  }

  // TODO(launch-blocker): forward to secure intake + notify coordinators.
  return NextResponse.json({ ok: true });
}
