const REPO = process.env.NEAR_GITHUB_REPO ?? "listadothiago/near";

export type InboxSubmission = {
  type: "suggestion" | "request" | "removal" | "message";
  placeName?: string;
  url?: string;
  body: string;
  locale: string;
};

export async function createInboxIssue(submission: InboxSubmission) {
  const token = process.env.NEAR_GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "NEAR_GITHUB_TOKEN is not configured on the server — near-inbox submissions can't be filed yet.",
    );
  }

  const title = submission.placeName
    ? `[${submission.type}] ${submission.placeName}`
    : `[${submission.type}] visitor message`;

  const bodyLines = [
    submission.body,
    "",
    "---",
    `Type: ${submission.type}`,
    submission.placeName ? `Place name: ${submission.placeName}` : null,
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
