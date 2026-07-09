import { createFileRoute, Link } from "@tanstack/react-router";
import { useActivity, toolLabels, formatRelative } from "@/lib/activity-store";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — Draftsman" },
      { name: "description", content: "Recent drafts from your current session." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { items, clear } = useActivity();

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Session history
          </p>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">Recent drafts</h1>
          <p className="text-sm text-muted-foreground max-w-[60ch]">
            History is kept in this session only. Refreshing the page clears it — nothing is stored
            on our servers.
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={clear} className="gap-2">
            <Trash2 className="size-3.5" /> Clear
          </Button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="bg-card ring-1 ring-border rounded-2xl p-12 text-center">
          <div className="mx-auto size-10 rounded-lg bg-secondary grid place-items-center mb-3">
            <Sparkles className="size-4 text-primary" />
          </div>
          <p className="text-sm font-medium">Nothing here yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-[40ch] mx-auto">
            Try one of the tools — your draft will show up here for the rest of this session.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <Button asChild size="sm">
              <Link to="/email">Draft an email</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/meetings">Summarize notes</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-border rounded-2xl divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-5">
              <div className="flex items-center justify-between gap-4 mb-1">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatRelative(item.createdAt)}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                {toolLabels[item.tool]}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
