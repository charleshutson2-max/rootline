import type { LineTag, HonorCategory } from "@/data/sample";

export function LineChip({ line }: { line: LineTag }) {
  if (line === "norwood") return <span className="chip chip-norwood">Norwood</span>;
  if (line === "hutson") return <span className="chip chip-hutson">Hutson</span>;
  if (line === "both") return <span className="chip chip-both">Both</span>;
  return <span className="chip chip-privacy">Allied</span>;
}

export function SampleChip() {
  return <span className="chip chip-sample">SAMPLE</span>;
}

export function HonorChip({
  category,
  title,
}: {
  category: HonorCategory;
  title: string;
}) {
  const label =
    category === "military"
      ? "Military"
      : category === "civic" || category === "church"
        ? title
        : title;
  return <span className="chip chip-honor">★ {label}</span>;
}

export function PrivacyChip() {
  return <span className="chip chip-privacy">Privacy ON</span>;
}
