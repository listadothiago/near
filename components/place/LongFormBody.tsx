export default function LongFormBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-8 max-w-[62ch] font-mono text-[0.95rem] text-ink"
      style={{ lineHeight: 1.7 }}
    >
      {children}
    </div>
  );
}
