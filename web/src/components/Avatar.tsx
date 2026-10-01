import type { LineTag } from "@/data/sample";

export function Avatar({
  initials,
  line,
  honor,
  size = 56,
}: {
  initials: string;
  line: LineTag;
  honor?: boolean;
  size?: number;
}) {
  const ring =
    line === "both" ? "both" : line === "norwood" ? "norwood" : line === "hutson" ? "hutson" : "";
  return (
    <div
      className={`avatar avatar-ring ${ring}`}
      style={{ width: size, height: size, fontSize: size > 64 ? "1.5rem" : undefined }}
      aria-label={`${line === "both" ? "Both lines" : line} line`}
    >
      {initials}
      {honor ? (
        <span className="honor-mark" aria-label="Honor">
          ★
        </span>
      ) : null}
    </div>
  );
}
