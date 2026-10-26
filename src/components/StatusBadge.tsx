import type { Project } from "@/lib/types";

type Status = NonNullable<Project["status"]>;

interface StatusBadgeProps {
  status?: Project["status"];
  size?: "sm" | "md";
}

const LABELS: Record<Status, string> = {
  upcoming: "Upcoming",
  "in-progress": "In Progress",
  completed: "Completed",
  "in-design": "In Design",
};

// Live work gets the pulsing accent dot so active projects stand out in a list.
const STYLES: Record<Status, string> = {
  upcoming: "border-crimson/30 text-crimson",
  "in-progress": "border-crimson/30 text-crimson",
  completed: "border-border-strong text-ink-secondary",
  "in-design": "border-border-strong text-ink-muted",
};

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  if (!status) return null;
  const sizing = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-[0.12em] ${sizing} ${STYLES[status]}`}
    >
      {status === "in-progress" && <span className="pulse-dot" aria-hidden="true" />}
      {LABELS[status]}
    </span>
  );
}
