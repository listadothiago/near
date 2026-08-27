import NearLink from "./NearLink";

export const mdxComponents = {
  NearLink,
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 last:mb-0" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-accent-ink underline decoration-accent/40 underline-offset-2 hover:decoration-accent-ink transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
};
