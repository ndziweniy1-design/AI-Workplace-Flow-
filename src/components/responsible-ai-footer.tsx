export function ResponsibleAIFooter() {
  return (
    <footer className="border-t px-6 md:px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
          Responsible AI · Draftsman v1.0
        </p>
        <p className="text-[11px] text-muted-foreground max-w-[70ch] md:text-right leading-relaxed">
          AI outputs are drafts. Review for accuracy before sending, sharing, or acting on them. Do
          not enter confidential data outside your organization's policies.
        </p>
      </div>
    </footer>
  );
}
