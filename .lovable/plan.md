## AI Workplace Productivity Assistant — Build Plan

Build a TanStack Start app using the **Command-center workspace** direction (Cloud White palette, Urbanist/Epilogue, hero-grid dashboard). Uses Lovable AI Gateway (`google/gemini-3-flash-preview`) with no persistence — session-only outputs.

### Design tokens (src/styles.css)
- Palette: `--cloud-bg #fafbfc`, `--cloud-surface #e8ecf1`, `--cloud-muted #94a3b8`, `--cloud-brand #3b82f6`.
- Fonts: Urbanist (heading) + Epilogue (body) loaded via `<link>` in `__root.tsx` head.
- Map into shadcn tokens (`--background`, `--primary`, etc.) so existing UI primitives inherit the direction.

### Routes (src/routes/)
- `__root.tsx` — update head metadata (title, description, og). Wrap `<Outlet />` in `<SidebarProvider>` + `<AppSidebar>` shell with topbar.
- `index.tsx` — Dashboard: welcome banner, 3 stat cards, hero-grid of 3 tool cards, recent activity panel.
- `email.tsx` — Smart Email Generator workspace.
- `meetings.tsx` — Meeting Notes Summarizer workspace.
- `tasks.tsx` — AI Task Planner workspace.
- `history.tsx` — Session activity list (in-memory only, shows empty state on reload).
- `settings.tsx` — Static preferences page (theme toggle, disclaimer, about).
- `help.tsx` — Static FAQ/help page.
- `api/chat.ts` — Server route: POST tool + prompt + input → streams via AI SDK.

### Components
- `AppSidebar` — collapsible sidebar (Dashboard, Email, Meetings, Tasks, History, Settings, Help). Uses shadcn sidebar.
- `TopBar` — SidebarTrigger, page title, avatar.
- `ToolWorkspace` — shared 2-panel layout (input left, editable output right) used by all 3 tools.
- `ToolOutput` — editable textarea prefilled with streamed AI response + Copy button + Export PDF button.
- `ResponsibleAIFooter` — disclaimer strip.
- `RecentActivityContext` — React context holding session activity (title, tool, timestamp) in memory.

### AI wiring
- `src/lib/ai-gateway.server.ts` — Lovable AI Gateway provider helper per knowledge.
- `src/routes/api/chat.ts` — accepts `{ tool: 'email'|'meeting'|'task', input, options }`, picks system prompt per tool (using the structured prompts from the brief), calls `streamText` with `google/gemini-3-flash-preview`, returns `toUIMessageStreamResponse`.
- Client uses `useChat` per tool page (single-turn: user submits, assistant streams one message, output written to editable textarea).

### Export
- `src/lib/export-pdf.ts` — client-only helper using `jspdf` (add via bun) to convert output text into a downloadable PDF.
- Copy uses `navigator.clipboard.writeText`.

### Tool specifics
- **Email**: input = context textarea; controls = tone (Formal/Friendly/Persuasive) segmented buttons. System prompt from brief. Output shows Subject/Greeting/Body/Closing/Signature.
- **Meetings**: input = large textarea for raw notes/transcript. Output structured with headings (Summary, Key Points, Decisions, Action Items, Deadlines, Next Steps) rendered via `react-markdown`.
- **Tasks**: input = task list + horizon toggle (Daily/Weekly). Output structured schedule via markdown.

### Responsive
- Sidebar collapses to icon rail on `<lg` (shadcn built-in), offcanvas sheet on mobile.
- Hero-grid: 3 cols → 2 cols → 1 col.
- 2-panel workspaces stack on mobile.

### Non-goals (skip)
- Auth / accounts / DB (no persistence chosen).
- Word/.docx export (only PDF + Copy chosen).
- Cloud enablement.

### Deliverable order
1. Install deps (`jspdf`, `react-markdown`).
2. Design tokens + fonts + root shell + sidebar.
3. Dashboard page.
4. AI server route + shared ToolWorkspace.
5. Three tool pages.
6. History, Settings, Help stubs.
7. PDF export + responsive polish.
