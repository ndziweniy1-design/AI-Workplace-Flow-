# Draftsman — AI Workplace Productivity Assistant

A modern, AI-powered web app that helps professionals automate common workplace tasks: drafting polished emails, summarizing meeting notes, and planning tasks. Built with a calm, SaaS-inspired "Command-center" interface that's fully responsive across desktop, tablet, and mobile.

---

## Project Overview

Draftsman is a session-based productivity assistant. Users pick a tool, provide context, and receive a streamed, fully editable AI draft they can copy or export as PDF. Nothing is persisted server-side — all activity lives in the current browser session only.

- **Live preview:** https://id-preview--5bf5d0ec-aab0-4918-84c2-56e9e0f02c00.lovable.app
- **Published:** https://work-flow-wiz-77.lovable.app

---

## Features Implemented

### AI Tools
- **Smart Email Generator** — Draft professional emails from a short prompt. Tone control (Formal / Friendly / Persuasive) and a clear Subject / Greeting / Body / Closing / Signature structure.
- **Meeting Notes Summarizer** — Paste raw notes or a transcript and get a structured summary with Key Points, Decisions, Action Items, Deadlines, and Next Steps.
- **AI Task Planner** — Turn a list of tasks into a prioritized Daily or Weekly schedule.

### Workspace
- **Dashboard** with welcome banner, session stats, tool hero-grid, and recent activity.
- **Collapsible sidebar navigation** (Dashboard, Email, Meetings, Tasks, History, Responsible AI, Settings, Help) — icon rail on tablet, offcanvas sheet on mobile.
- **Editable outputs** — every AI draft renders as Markdown, with a one-click Edit mode for raw text tweaks.
- **Copy to clipboard** and **Export to PDF** on every generated draft.
- **Session history** — in-memory list of drafts generated during the current session (cleared on reload).
- **Responsible AI page** — principles, pre-send checklist, and disclaimer.
- **Settings & Help** — dark-mode toggle, about info, and FAQ.
- **Streaming responses** — outputs appear token-by-token as the model generates them.
- **Responsive design** — hero grid collapses 3 → 2 → 1 columns; two-panel tool workspaces stack on mobile.

---

## Technologies and Tools Used

**Framework & runtime**
- [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR, file-based routing)
- [Vite 7](https://vitejs.dev/) build tooling
- TypeScript (strict)
- Deployed on Cloudflare Workers (edge runtime)

**UI & styling**
- [Tailwind CSS v4](https://tailwindcss.com/) (native `@import` + `@theme` tokens)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) primitives
- [lucide-react](https://lucide.dev/) icons
- [Sonner](https://sonner.emilkowal.ski/) toasts
- Fonts: **Urbanist** (headings) + **Epilogue** (body)

**AI**
- [Lovable AI Gateway](https://docs.lovable.dev/) with `google/gemini-3-flash-preview`
- [Vercel AI SDK](https://sdk.vercel.ai/) (`ai`, `@ai-sdk/openai-compatible`, `@ai-sdk/react`) for streaming

**Utilities**
- [react-markdown](https://github.com/remarkjs/react-markdown) — render Markdown output
- [jsPDF](https://github.com/parallax/jsPDF) — client-side PDF export

---

## Setup Instructions

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- A `LOVABLE_API_KEY` for the AI Gateway (pre-configured in Lovable projects)

### Install and run

```bash
# 1. Install dependencies
bun install

# 2. Start the dev server (http://localhost:8080)
bun run dev

# 3. Type-check
bun run typecheck

# 4. Production build
bun run build
```

### Environment variables

The AI endpoint reads `LOVABLE_API_KEY` from the server environment. In a Lovable project it is injected automatically. For local development outside Lovable, create a `.env` file:

```
LOVABLE_API_KEY=your_key_here
```

### Project structure

```
src/
├── routes/                  # File-based routes (TanStack Router)
│   ├── __root.tsx           # App shell (sidebar + providers)
│   ├── index.tsx            # Dashboard
│   ├── email.tsx            # Smart Email Generator
│   ├── meetings.tsx         # Meeting Notes Summarizer
│   ├── tasks.tsx            # AI Task Planner
│   ├── history.tsx          # Session activity
│   ├── responsible-ai.tsx   # Principles & disclaimer
│   ├── settings.tsx
│   ├── help.tsx
│   └── api/generate.ts      # Server route — streams from AI Gateway
├── components/
│   ├── app-sidebar.tsx
│   ├── tool-workspace.tsx   # Shared 2-panel tool UI
│   ├── responsible-ai-footer.tsx
│   └── ui/                  # shadcn primitives
├── lib/
│   ├── ai-gateway.server.ts # Lovable AI Gateway provider
│   ├── tool-prompts.ts      # System prompts per tool
│   ├── activity-store.tsx   # In-memory session activity
│   └── export-pdf.ts        # jsPDF helper
└── styles.css               # Tailwind v4 tokens + fonts
```

---

## Notes

- **No persistence.** Drafts and activity live only in the current browser session; reloading clears everything.
- **Editable outputs.** AI text is always a starting point — review before sending.
- **Responsible AI.** See the in-app Responsible AI page for the pre-send checklist.
