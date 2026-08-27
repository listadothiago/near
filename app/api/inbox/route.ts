import { NextResponse } from "next/server";
import { z } from "zod";
import { createInboxIssue } from "@/lib/github/inbox";

const submissionSchema = z.object({
  type: z.enum(["suggestion", "request", "removal", "message"]),
  placeName: z.string().max(200).optional(),
  url: z.url().max(500).optional().or(z.literal("")),
  body: z.string().min(1).max(4000),
  locale: z.string().max(10),
  // Honeypot: real users never fill this hidden field; bots often do.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  if (parsed.data.website) {
    // Honeypot tripped — pretend success, drop silently.
    return NextResponse.json({ ok: true });
  }

  try {
    await createInboxIssue({
      type: parsed.data.type,
      placeName: parsed.data.placeName || undefined,
      url: parsed.data.url || undefined,
      body: parsed.data.body,
      locale: parsed.data.locale,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("near-inbox submission failed:", err);
    return NextResponse.json(
      { error: "Could not send this right now." },
      { status: 502 },
    );
  }
}
