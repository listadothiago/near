import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { Author } from "@/lib/content/authors";
import AuthorAvatar from "./AuthorAvatar";

export default function AuthorCard({ author }: { author: Author }) {
  const t = useTranslations(`authors.${author.slug}`);

  return (
    <Link
      href={`/author/${author.slug}`}
      className="border-[3px] border-ink bg-surface p-3 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-center gap-2">
        <AuthorAvatar author={author} size={40} />
        <div>
          <p className="font-mono text-[0.64rem] uppercase tracking-wide text-muted">
            {t("role")}
          </p>
          <h3 className="mt-0.5 text-[1rem]">{author.handle}</h3>
        </div>
      </div>
      <p className="mt-1.5 font-mono text-[0.7rem] leading-snug text-muted">
        {t("disclosure")}
      </p>
    </Link>
  );
}
