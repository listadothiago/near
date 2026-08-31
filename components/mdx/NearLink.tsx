import { Link } from "@/lib/i18n/navigation";
import { getAllPlaceSlugs } from "@/lib/content/loader";

export default function NearLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  if (!getAllPlaceSlugs().includes(slug)) {
    throw new Error(
      `<NearLink slug="${slug}"> points at a place that doesn't exist in content/places/.`,
    );
  }

  return (
    <Link
      href={`/place/${slug}`}
      className="text-accent-ink underline decoration-accent/40 underline-offset-2 hover:decoration-accent-ink transition-colors"
    >
      {children}
    </Link>
  );
}
