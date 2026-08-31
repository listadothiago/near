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
      className="underline decoration-2 underline-offset-[3px] decoration-ink/60 hover:bg-accent hover:text-black hover:decoration-black transition-colors"
    >
      {children}
    </Link>
  );
}
