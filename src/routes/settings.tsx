import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Draftsman" },
      { name: "description", content: "Preferences for your Draftsman workspace." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Preferences
        </p>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Personalize the workspace. Session-only — nothing is saved to a server.
        </p>
      </header>

      <section className="bg-card ring-1 ring-border rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Label className="text-sm font-medium">Dark mode</Label>
            <p className="text-xs text-muted-foreground mt-1">Switch the workspace to a dark palette.</p>
          </div>
          <Switch checked={dark} onCheckedChange={setDark} />
        </div>
      </section>

      <section className="bg-card ring-1 ring-border rounded-2xl p-6 space-y-3">
        <h2 className="font-heading text-sm font-semibold">Responsible AI</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This workspace uses AI to generate drafts. Outputs may contain errors, omissions, or
          inaccuracies. Review everything before sending, sharing, or acting on it. Do not enter
          confidential, sensitive, or personal information outside your organization's policies.
        </p>
      </section>

      <section className="bg-card ring-1 ring-border rounded-2xl p-6 space-y-3">
        <h2 className="font-heading text-sm font-semibold">About</h2>
        <p className="text-xs text-muted-foreground">Draftsman v1.0 — Cloud edition.</p>
      </section>
    </div>
  );
}
