export default function LongFormBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-8 max-w-[65ch] font-serif text-[1.15rem] text-ink"
      style={{ lineHeight: 1.75 }}
    >
      {children}
    </div>
  );
}
