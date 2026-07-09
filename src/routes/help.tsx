import { createFileRoute } from "@tanstack/react-router";

const faqs = [
  {
    q: "How does the AI know what to write?",
    a: "Each tool sends your input and a short instruction to an AI model. The model returns a structured draft. You stay in control — every draft is editable before you use it.",
  },
  {
    q: "Is my data saved?",
    a: "No. This workspace has no accounts and no database. Your inputs and drafts live only in the current browser session and disappear on refresh.",
  },
  {
    q: "Can I export what I generate?",
    a: "Yes — copy any draft to the clipboard, or export it as a PDF from the output panel.",
  },
  {
    q: "The email tone isn't quite right — what do I do?",
    a: "Switch the tone control (Formal, Friendly, Persuasive) and click Regenerate. You can also edit the draft directly in the output panel.",
  },
  {
    q: "Should I trust the output for important work?",
    a: "Treat AI output as a first draft. Always review for accuracy, tone, and context before sending or sharing.",
  },
];

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — Draftsman" },
      { name: "description", content: "Frequently asked questions about using Draftsman." },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Support
        </p>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">Help & FAQ</h1>
        <p className="text-sm text-muted-foreground">
          Short answers to the most common questions about Draftsman.
        </p>
      </header>

      <div className="bg-card ring-1 ring-border rounded-2xl divide-y">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="font-medium text-sm">{f.q}</span>
              <span className="text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
