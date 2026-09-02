import NearLink from "./NearLink";
import Figure from "./Figure";

export const mdxComponents = {
  NearLink,
  Figure,
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 last:mb-0" {...props} />
  ),
  // --accent-ink resolves to plain black in light mode (acid green is
  // unreadable as text), so colour alone can't mark a link here. The
  // underline has to do the work: solid, full-weight, and thick enough
  // to read against body copy.
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="underline decoration-2 underline-offset-[3px] decoration-ink/60 hover:bg-accent hover:text-black hover:decoration-black transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
};
