export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm font-semibold tracking-tight">reru.io</p>
        <p className="text-xs text-muted-foreground">
          © 2026 Reru. Validation · Warmup · Inbox · Preview · Templates
        </p>
      </div>
    </footer>
  );
}