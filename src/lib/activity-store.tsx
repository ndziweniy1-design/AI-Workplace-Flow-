import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ToolId } from "./tool-prompts";

export type ActivityItem = {
  id: string;
  tool: ToolId;
  title: string;
  createdAt: number;
  preview: string;
};

type Ctx = {
  items: ActivityItem[];
  add: (item: Omit<ActivityItem, "id" | "createdAt">) => void;
  clear: () => void;
};

const ActivityContext = createContext<Ctx | null>(null);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ActivityItem[]>([]);

  const add = useCallback((item: Omit<ActivityItem, "id" | "createdAt">) => {
    setItems((prev) => [
      { ...item, id: crypto.randomUUID(), createdAt: Date.now() },
      ...prev,
    ].slice(0, 30));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, add, clear }), [items, add, clear]);
  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity must be used within ActivityProvider");
  return ctx;
}

export const toolLabels: Record<ToolId, string> = {
  email: "Smart Email",
  meeting: "Meeting Summary",
  task: "Task Plan",
};

export function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
