interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
