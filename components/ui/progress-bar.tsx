type ProgressBarProps = {
  value: number;
  label: string;
  className?: string;
};

export function ProgressBar({ value, label, className = "" }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-[3px] bg-(--line) ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className="h-full rounded-[inherit] bg-(--accent)" style={{ width: `${progress}%` }} />
    </div>
  );
}