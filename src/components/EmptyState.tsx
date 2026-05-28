export function EmptyState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-obsidian/45 p-5 text-sm">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 leading-6 text-parchment/70">{description}</p>
    </div>
  );
}
