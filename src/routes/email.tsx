import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const tones = ["Formal", "Friendly", "Persuasive"] as const;
type Tone = (typeof tones)[number];

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Draftsman" },
      {
        name: "description",
        content:
          "Generate professional emails with adjustable tone. Subject, greeting, body, and signature — ready to edit and send.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [tone, setTone] = useState<Tone>("Formal");

  return (
    <ToolWorkspace
      tool="email"
      eyebrow="Tool · Smart Email Generator"
      title="Draft a professional email in seconds."
      description="Describe what you need to say. The assistant produces a subject line, greeting, structured body, closing, and signature you can edit before sending."
      inputLabel="Context & Prompt"
      inputPlaceholder="e.g. Reply to Marcus about the Q3 budget alignment…"
      samplePrompt="Write a polite but firm follow-up to the design agency about the delayed wireframes for the dashboard project. Mention we need them by Friday for the board meeting."
      submitLabel="Generate email"
      filenameBase="email"
      getOptions={() => ({ tone })}
      activityTitle={(input) => truncate(input, 60)}
      controls={
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Tone
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {tones.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={cn(
                  "py-2 px-3 text-sm rounded-md border font-medium transition-colors",
                  tone === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted/40",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}

function truncate(s: string, n: number) {
  const t = s.trim().replace(/\s+/g, " ");
  return t.length <= n ? t : t.slice(0, n - 1) + "…";
}
