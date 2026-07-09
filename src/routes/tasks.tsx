import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const horizons = ["Daily", "Weekly"] as const;
type Horizon = (typeof horizons)[number];

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Draftsman" },
      {
        name: "description",
        content:
          "Turn a list of tasks into a prioritized daily or weekly schedule with time estimates and a suggested sequence.",
      },
    ],
  }),
  component: TasksPage,
});

const SAMPLE = `- Finish the dashboard wireframes (due Friday)
- Review 3 PRs from the mobile team
- Prep the board meeting slides (30 min)
- Reply to investor update thread
- 1:1 with Priya at 2pm
- Draft Q4 hiring plan
- Read the customer research doc (~45 min)`;

function TasksPage() {
  const [horizon, setHorizon] = useState<Horizon>("Daily");

  return (
    <ToolWorkspace
      tool="task"
      eyebrow="Tool · AI Task Planner"
      title="Organize the day, not just the list."
      description="Drop in your tasks. Get a prioritized schedule with time estimates, a recommended order, and productivity tips — editable end to end."
      inputLabel="Your tasks"
      inputPlaceholder="One task per line, with any deadlines or context…"
      samplePrompt={SAMPLE}
      submitLabel={`Plan my ${horizon.toLowerCase()}`}
      filenameBase="task-plan"
      getOptions={() => ({ horizon })}
      activityTitle={() => `${horizon} task plan`}
      controls={
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Planning horizon
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {horizons.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className={cn(
                  "py-2 px-3 text-sm rounded-md border font-medium transition-colors",
                  horizon === h
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted/40",
                )}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}
