const REPO = process.env.NEAR_GITHUB_REPO ?? "listadothiago/near";

export type InboxSubmission = {
  type: "suggestion" | "request" | "removal" | "message";
  placeName?: string;
  url?: string;
  body: string;
  locale: string;
};

// Submissions are filed as issues on a PUBLIC repo (see REPO above) — a
// visitor's free-text message becomes permanently public, indexable, and
// hard to fully retract even if the issue is later deleted. The UI warns
// against including contact info (see inbox.piiWarning in messages/*),
// but that's advisory, not enforced — this is the actual backstop.
// Deliberately conservative: false positives (redacting something that
// wasn't really PII) cost nothing; a missed email address costs someone
// their inbox in a public GitHub issue forever.
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
// International-ish phone numbers: 7+ digits with optional separators,
// requires at least one separator or a leading + so it doesn't swallow
// unrelated numbers (prices, addresses, years).
const PHONE_RE = /(?:\+\d{1,3}[\s.-]?)?(?:\(\d{2,4}\)[\s.-]?)?\d{2,5}(?:[\s.-]\d{2,5}){2,4}/g;

function redactPii(text: string): string {
  return text.replace(EMAIL_RE, "[redacted email]").replace(PHONE_RE, (match) =>
    /\d{7,}/.test(match.replace(/\D/g, "")) ? "[redacted phone]" : match,
  );
}

export async function createInboxIssue(submission: InboxSubmission) {
  const token = process.env.NEAR_GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "NEAR_GITHUB_TOKEN is not configured on the server — near-inbox submissions can't be filed yet.",
    );
  }

  const title = submission.placeName
    ? `[${submission.type}] ${redactPii(submission.placeName)}`
    : `[${submission.type}] visitor message`;

  const bodyLines = [
    redactPii(submission.body),
    "",
    "---",
    `Type: ${submission.type}`,
    submission.placeName ? `Place name: ${redactPii(submission.placeName)}` : null,
    submission.url ? `Link: ${submission.url}` : null,
    `Locale: ${submission.locale}`,
    `Submitted: ${new Date().toISOString()}`,
  ].filter((line): line is string => line !== null);

  const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: bodyLines.join("\n"),
      labels: ["near-inbox", `type:${submission.type}`],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub issue creation failed (${res.status}): ${detail}`);
  }

  return res.json();
}
