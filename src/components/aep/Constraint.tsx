interface ConstraintProps {
  constraint: string;
  decision: string;
}

export default function Constraint({ constraint, decision }: ConstraintProps) {
  return (
    <div className="not-prose my-4 grid gap-2 rounded-lg border border-border bg-bg-elevated p-5 sm:grid-cols-[minmax(0,2fr)_auto_minmax(0,3fr)] sm:items-center sm:gap-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Constraint</p>
        <p className="mt-1 text-sm text-ink-secondary">{constraint}</p>
      </div>
      <span aria-hidden className="hidden text-crimson sm:block">&rarr;</span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-crimson">Decision</p>
        <p className="mt-1 text-sm text-ink">{decision}</p>
      </div>
    </div>
  );
}
