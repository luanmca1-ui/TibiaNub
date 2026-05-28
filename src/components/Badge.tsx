type BadgeTone = "default" | "ember" | "moss" | "danger" | "blue";

const toneClasses: Record<BadgeTone, string> = {
  default: "border-white/10 bg-white/5 text-parchment/80",
  ember: "border-ember/30 bg-ember/15 text-orange-100",
  moss: "border-moss/35 bg-moss/20 text-green-100",
  danger: "border-red-400/30 bg-red-500/15 text-red-100",
  blue: "border-sky-400/30 bg-sky-500/15 text-sky-100",
};

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
