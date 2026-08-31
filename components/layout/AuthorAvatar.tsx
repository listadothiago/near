import Image from "next/image";
import type { Author } from "@/lib/content/authors";

// Falls back to the handle's first character when a persona has no
// artwork yet — most of the cast doesn't, and a broken image request is
// worse than a letter in a box.
export default function AuthorAvatar({
  author,
  size = 28,
}: {
  author: Author;
  size?: number;
}) {
  if (!author.hasAvatar) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center flex-none border-[2px] border-ink bg-accent text-black font-display font-bold"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {author.handle.charAt(0)}
      </span>
    );
  }

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
