import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/tool-workspace";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Draftsman" },
      {
        name: "description",
        content:
          "Turn long meeting notes or transcripts into a clean summary with decisions, action items, and next steps.",
      },
    ],
  }),
  component: MeetingsPage,
});

const SAMPLE = `Product Strategy Sync — Tuesday 10am
Attendees: Aris, Marcus, Priya, Jordan

- Marcus walked through Q3 revenue: up 14% QoQ, driven by mid-market.
- Priya raised churn concerns in the free tier; wants to run an onboarding experiment.
- Discussed pricing update; Jordan will draft new tiers by next Friday.
- Aris: we need to ship the new dashboard by end of month.
- Agreed to move the design review from Thursday to Wednesday afternoon.
- Priya to interview 5 churned users this week.
- Next sync scheduled for the following Tuesday.`;

function MeetingsPage() {
  return (
    <ToolWorkspace
      tool="meeting"
      eyebrow="Tool · Meeting Notes Summarizer"
      title="Turn raw notes into a clean, shareable summary."
      description="Paste meeting notes or a transcript. Get an executive summary, key points, decisions, action items, deadlines, and next steps — organized and editable."
      inputLabel="Meeting notes or transcript"
      inputPlaceholder="Paste your raw meeting notes here…"
      samplePrompt={SAMPLE}
      submitLabel="Summarize meeting"
      filenameBase="meeting-summary"
      activityTitle={(input) => {
        const firstLine = input.trim().split("\n")[0] ?? "Meeting summary";
        return firstLine.length > 60 ? firstLine.slice(0, 59) + "…" : firstLine;
      }}
    />
  );
}
