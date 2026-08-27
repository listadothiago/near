import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { categorySchema } from "./schema";
import { z } from "zod";

const sourceEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: categorySchema,
  region: z.string(),
  language: z.string(),
  feedUrl: z.url().nullable(),
  feedType: z.enum(["rss", "atom", "html-extract"]),
  trust: z.enum(["auto", "review"]),
  status: z.enum(["active", "paused"]),
  notes: z.string().optional(),
});
export type SourceEntry = z.infer<typeof sourceEntrySchema>;

export function getSourceCatalog(): SourceEntry[] {
  const filePath = path.join(process.cwd(), "content", "sources.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/```yaml\n([\s\S]*?)\n```/);
  if (!match) return [];
  const parsed = parse(match[1]) as { sources: unknown[] };
  return parsed.sources.map((s) => sourceEntrySchema.parse(s));
}
