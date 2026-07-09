import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, Lock, AlertTriangle, UserCheck, FileText } from "lucide-react";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — Draftsman" },
      {
        name: "description",
        content:
          "How Draftsman uses AI responsibly: transparency, human oversight, privacy, and the limits you should know about.",
      },
    ],
  }),
  component: ResponsibleAIPage,
});

const principles = [
  {
    icon: UserCheck,
    title: "Human in the loop",
    body: "Every output is a draft. You review, edit, and decide before anything is sent, shared, or acted on. Draftsman never sends or publishes on your behalf.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "Generated content is clearly labeled as AI-drafted. Word counts and a Draft badge appear alongside each result so its origin is never ambiguous.",
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    body: "AI can produce inaccurate, outdated, biased, or fabricated information. Verify facts, names, figures, dates, and quotes before relying on them.",
  },
  {
    icon: Lock,
    title: "Data handling",
    body: "Inputs are sent to the AI provider solely to generate a response. Do not paste secrets, credentials, personal data, or anything covered by your organization's confidentiality policies.",
  },
  {
    icon: ShieldCheck,
    title: "Appropriate use",
    body: "Draftsman is built for workplace productivity. It is not intended for legal, medical, financial, or safety-critical decisions. Consult qualified professionals for those.",
  },
  {
    icon: FileText,
    title: "Your accountability",
    body: "You are responsible for the content you send under your name. Ensure drafts reflect your intent, tone, and any applicable policies before use.",
  },
];

function ResponsibleAIPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <header className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Our commitment
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-balance">
          Responsible AI at Draftsman
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-[65ch] leading-relaxed">
          Draftsman helps you move faster with AI-generated drafts. This page explains how we
          approach that responsibly — what the tools can do, where they fall short, and the role
          you play in reviewing every output.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden ring-1 ring-border">
        {principles.map((p) => (
          <div key={p.title} className="bg-card p-6 space-y-3">
            <div className="size-9 rounded-lg bg-secondary grid place-items-center">
              <p.icon className="size-4 text-primary" />
            </div>
            <h2 className="font-heading text-sm font-semibold">{p.title}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-card ring-1 ring-border rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="font-heading text-lg font-semibold">Before you send a draft</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary">·</span>
            <span>Read the full output. Confirm the tone, intent, and facts match your goal.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">·</span>
            <span>Verify names, dates, numbers, links, and any factual claims.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">·</span>
            <span>Remove or reword anything that could be misinterpreted or offend.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">·</span>
            <span>Check that no confidential information was echoed back into the output.</span>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-dashed p-6 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Disclaimer
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[70ch]">
          AI outputs are provided as drafts for your review. Draftsman and its providers make no
          warranty as to accuracy, completeness, or fitness for a particular purpose. You are
          responsible for any content you send, share, or act on.
        </p>
      </section>
    </div>
  );
}
