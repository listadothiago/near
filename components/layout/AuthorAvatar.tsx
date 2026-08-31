import Image from "next/image";
import type { Author } from "@/lib/content/authors";
import PixelAvatar from "./PixelAvatar";

// Hand-made artwork when a persona has it, a procedurally drawn 8-bit
// robot face when it doesn't. The generated version is the default rather
// than a degraded fallback: Near's cast keeps growing, and a system that
// gives every new byline a distinct face for free beats commissioning
// twenty-five illustrations and maintaining them.
export default function AuthorAvatar({
  author,
  size = 28,
}: {
  author: Author;
  size?: number;
}) {
  if (!author.hasAvatar) return <PixelAvatar author={author} size={size} />;

  return (
    <Image
      src={`/authors/${author.slug}.png`}
      alt=""
      width={size}
      height={size}
      className="flex-none border-[2px] border-ink object-cover"
    />
  );
}
