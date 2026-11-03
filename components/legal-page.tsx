import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-border pb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </header>

      <div className="space-y-9">{children}</div>
    </div>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
