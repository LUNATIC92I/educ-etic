import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validators";

// Demo-mode stub: in production this would look up the user and send a
// reset-link email via a transactional email provider (Resend, SES, etc.).
// It always returns success without revealing whether the email exists,
// to avoid leaking account existence.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Adresse email invalide" },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true });
}
