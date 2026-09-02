import Image from "next/image";

/**
 * An in-body image for a place or collection article.
 *
 * Exists because `near-illustrator`'s image call covers mid-post imagery
 * (operator directive, 2026-09-02) and there was previously no way to
 * render one — `mdxComponents` mapped `NearLink` and nothing else, so a
 * long body had no choice but to publish as an unbroken wall of text.
 *
 * Deliberately mirrors PlaceHero's treatment (4px ink frame, 16:9 crop,
 * mono attribution line underneath) so an image lands as the same object
 * whether it sits at the top of the page or halfway down it.
 *
 * `caption` is the editorial line and is not optional in practice: an
 * in-body image usually earns its place by carrying an argument the
 * surrounding prose is making (a then/now pairing, a correction), and
 * that only works if the reader is told what they're looking at.
 */
export default function Figure({
  src,
  alt,
  caption,
  attribution,
  attributionLink,
}: {
  src: string;
  alt: string;
  caption?: string;
  attribution?: string;
  attributionLink?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-2 border-[4px] border-ink">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
      {(caption || attribution) && (
        <figcaption className="mt-1.5 font-mono text-[0.72rem] text-muted">
          {caption && <span className="text-ink">{caption}</span>}
          {caption && attribution && <span className="opacity-50"> · </span>}
          {attribution &&
            (attributionLink ? (
              <a
                href={attributionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-ink"
              >
                {attribution}
              </a>
            ) : (
              <span>{attribution}</span>
            ))}
        </figcaption>
      )}
    </figure>
  );
}
