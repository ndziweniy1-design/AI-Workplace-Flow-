import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ClipboardList, CalendarClock, ArrowRight, Sparkles } from "lucide-react";
import { useActivity, toolLabels, formatRelative } from "@/lib/activity-store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Draftsman" },
      {
        name: "description",
        content:
          "Your AI productivity command center. Draft emails, summarize meetings, and plan tasks in one place.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    href: "/email" as const,
    title: "Smart Email Generator",
    desc: "Draft polished emails from a prompt with tone control and a clear structure.",
    icon: Mail,
    accent: "bg-primary text-primary-foreground",
  },
  {
    href: "/meetings" as const,
    title: "Meeting Notes Summarizer",
    desc: "Turn long transcripts into decisions, action items, and next steps.",
    icon: ClipboardList,
    accent: "bg-foreground text-background",
  },
  {
    href: "/tasks" as const,
    title: "AI Task Planner",
    desc: "Convert a list of tasks into a prioritized daily or weekly schedule.",
    icon: CalendarClock,
    accent: "bg-secondary text-foreground",
  },
];

function Dashboard() {
  const { items } = useActivity();

  return (
    <div className="space-y-12">
      {/* Welcome banner */}
      <section className="bg-secondary rounded-2xl p-6 md:p-10 ring-1 ring-border">
        <div className="max-w-[56ch]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Welcome back
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold leading-tight text-balance">
            A calm workspace for focused output.
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Pick a tool below to draft an email, summarize a meeting, or plan your day. Every draft
            stays editable and never leaves your session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
          {[
            { label: "AI tools ready", value: "3" },
            { label: "Drafts this session", value: String(items.length) },
            { label: "Time saved (est.)", value: `${Math.max(items.length * 12, 0)}m` },
          ].map((s) => (
            <div key={s.label} className="bg-background p-4 rounded-xl ring-1 ring-border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-heading font-semibold">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool hero grid */}
      <section>
        <h2 className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-5 font-semibold">
          Productivity Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              to={t.href}
              className="group bg-card ring-1 ring-border p-6 rounded-2xl hover:ring-primary/30 hover:shadow-sm transition-all flex flex-col"
            >
              <div className={`size-10 rounded-lg mb-4 grid place-items-center ${t.accent}`}>
                <t.icon className="size-5" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-[40ch] flex-1">{t.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Launch tool <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Recent Operations
          </h2>
          <Link to="/history" className="text-xs text-primary font-medium hover:underline">
            View all
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-card ring-1 ring-border rounded-2xl p-10 text-center">
            <div className="mx-auto size-10 rounded-lg bg-secondary grid place-items-center mb-3">
              <Sparkles className="size-4 text-primary" />
            </div>
            <p className="text-sm font-medium">No activity yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[40ch] mx-auto">
              Generated drafts from this session will appear here.
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link to="/email">Draft your first email</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card ring-1 ring-border rounded-2xl divide-y">
            {items.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="size-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{toolLabels[item.tool]}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatRelative(item.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
