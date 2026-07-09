import { useCallback, useMemo, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Download, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { exportTextAsPdf } from "@/lib/export-pdf";
import { useActivity } from "@/lib/activity-store";
import type { ToolId, ToolOptions } from "@/lib/tool-prompts";

export type ToolWorkspaceProps = {
  tool: ToolId;
  title: string;
  eyebrow: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  samplePrompt: string;
  submitLabel?: string;
  controls?: ReactNode;
  getOptions?: () => ToolOptions;
  filenameBase: string;
  activityTitle: (input: string) => string;
};

export function ToolWorkspace({
  tool,
  title,
  eyebrow,
  description,
  inputLabel,
  inputPlaceholder,
  samplePrompt,
  submitLabel = "Generate",
  controls,
  getOptions,
  filenameBase,
  activityTitle,
}: ToolWorkspaceProps) {
  const [input, setInput] = useState(samplePrompt);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "streaming">("idle");
  const [showRaw, setShowRaw] = useState(false);
  const { add } = useActivity();

  const isBusy = status !== "idle";

  const generate = useCallback(async () => {
    if (!input.trim() || isBusy) return;
    setStatus("loading");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, input, options: getOptions?.() ?? {} }),
      });
      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }
      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
      add({
        tool,
        title: activityTitle(input),
        preview: acc.slice(0, 140),
      });
      toast.success("Draft ready to review");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message.includes("402") ? "AI credits exhausted. Add credits to continue." : message);
    } finally {
      setStatus("idle");
    }
  }, [input, isBusy, tool, getOptions, add, activityTitle]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }, [output]);

  const download = useCallback(() => {
    if (!output) return;
    const stamp = new Date().toISOString().slice(0, 10);
    exportTextAsPdf(output, `${filenameBase}-${stamp}.pdf`);
  }, [output, filenameBase]);

  const wordCount = useMemo(() => (output.trim() ? output.trim().split(/\s+/).length : 0), [output]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-balance">{title}</h1>
        <p className="text-sm text-muted-foreground max-w-[65ch] text-pretty">{description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden ring-1 ring-border">
        {/* Input */}
        <div className="bg-card p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {inputLabel}
            </Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="min-h-[180px] resize-none bg-muted/40 border-border focus-visible:ring-primary/30"
            />
          </div>

          {controls}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={generate}
              disabled={isBusy || !input.trim()}
              className="flex-1 gap-2"
              size="lg"
            >
              {isBusy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {isBusy ? "Generating…" : submitLabel}
            </Button>
            {output && !isBusy && (
              <Button variant="outline" size="lg" onClick={generate} className="gap-2">
                <RefreshCw className="size-4" /> Regenerate
              </Button>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="bg-muted/30 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 gap-2">
            <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Generated Output
            </Label>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRaw((v) => !v)}
                disabled={!output}
                className="h-8 text-xs"
              >
                {showRaw ? "Preview" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm" onClick={copy} disabled={!output} className="h-8 gap-1 text-xs">
                <Copy className="size-3.5" /> Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={download} disabled={!output} className="h-8 gap-1 text-xs">
                <Download className="size-3.5" /> PDF
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border min-h-[380px] max-h-[560px] overflow-y-auto">
            {output ? (
              showRaw ? (
                <Textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="min-h-[380px] border-0 rounded-lg font-mono text-xs leading-relaxed resize-none focus-visible:ring-0"
                />
              ) : (
                <div className="p-6 prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-foreground prose-headings:font-semibold prose-h2:text-sm prose-h2:uppercase prose-h2:tracking-wider prose-h2:text-muted-foreground prose-h2:mt-6 prose-h2:mb-2 prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              )
            ) : (
              <div className={cn("h-full min-h-[380px] grid place-items-center p-6 text-center")}>
                <div className="space-y-2 max-w-[36ch]">
                  <div className="mx-auto size-10 rounded-lg bg-secondary grid place-items-center">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">
                    {isBusy ? "Drafting your output…" : "Your draft appears here"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fill in the context on the left, then generate. Every result is fully editable.
                  </p>
                </div>
              </div>
            )}
          </div>

          {output && (
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-3">
              {wordCount} words · Draft
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
