import { Link } from "@/lib/i18n/navigation";
import { getAuthor } from "@/lib/content/authors";
import AuthorAvatar from "./AuthorAvatar";

// asLink={false} is required wherever the byline sits inside a larger
// link (a listing card) — nested anchors are invalid HTML and break
// hydration.
export default function Byline({
  slug,
  size = "sm",
  asLink = true,
}: {
  slug: string | undefined;
  size?: "sm" | "md";
  asLink?: boolean;
}) {
  const author = getAuthor(slug);
  if (!author) return null;

  const sizeClass = size === "md" ? "text-[0.76rem]" : "text-[0.66rem]";
  const inner = (
    <>
      <AuthorAvatar author={author} size={size === "md" ? 22 : 16} />
      {author.handle}
    </>
  );

  if (!asLink) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wide ${sizeClass}`}
      >
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={`/author/${author.slug}`}
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wide hover:bg-accent hover:text-black transition-colors ${sizeClass}`}
    >
      {inner}
    </Link>
  );
}
