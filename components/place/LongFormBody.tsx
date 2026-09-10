export default function LongFormBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-8 max-w-[65ch] font-sans text-[1.06rem] text-ink"
      style={{ lineHeight: 1.8 }}
    >
      {children}
    </div>
  );
}
