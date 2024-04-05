import { As } from "@kobalte/core";
import { For } from "solid-js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

import { Button } from "../ui/button";
import { useEditorContext } from "./editor-context";

function colorToString(color: string) {
  if (color === "hsl(var(--foreground))") return "Default";
  return color.toUpperCase();
}

export default function EditorColorPicker() {
  const [editor, { currentColor, isActiveColor }] = useEditorContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <As
          class="grid w-32 grid-cols-[auto,1fr]"
          component={Button}
          variant="muted"
        >
          <div
            class="size-6 rounded-sm bg-[--color]"
            style={{
              "--color": currentColor() ?? "hsl(var(--foreground))",
            }}
          />
          <div>{colorToString(currentColor() ?? "hsl(var(--foreground))")}</div>
        </As>
      </PopoverTrigger>
      <PopoverContent class="w-fit p-0 py-3">
        <div class="scrollbar-thumb-rounded-md scrollbar-track-none grid h-44 w-72 grid-cols-9 gap-3 overflow-y-auto px-4 py-1 scrollbar scrollbar-thumb-muted-foreground hover:scrollbar-thumb-foreground active:scrollbar-thumb-foreground">
          <For each={colors}>
            {(color) => (
              <button
                class={cn(
                  `z-50 inline-flex size-6 items-center justify-center rounded-md bg-[--color] text-sm font-medium ring-offset-background transition-all duration-100 data-[active=true]:ring-2 data-[active=true]:ring-primary data-[active=true]:ring-offset-2 hover:bg-[--color] hover:text-accent-foreground hover:outline-none hover:ring-2 hover:ring-muted-foreground hover:ring-offset-2 data-[active=true]:hover:ring-primary disabled:pointer-events-none disabled:opacity-50`,
                )}
                data-active={
                  color === "default"
                    ? currentColor() === undefined
                    : isActiveColor(color)()
                }
                onClick={() => {
                  if (color === "default") {
                    editor()?.chain().focus().unsetColor().run();
                  } else {
                    editor()?.chain().focus().setColor(color).run();
                  }
                }}
                style={{
                  "--color":
                    color === "default" ? "hsl(var(--foreground))" : color,
                }}
              />
            )}
          </For>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const colors = [
  "default",
  "#000000",
  "#ffffff",
  "#f5f5f4",
  "#d6d3d1",
  "#78716c",
  "#44403c",
  "#1c1917",
  "#0c0a09",
  // tailwind gray 100 to 900
  "#f3f4f6",
  "#e5e7eb",
  "#d1d5db",
  "#9ca3af",
  "#6b7280",
  "#4b5563",
  "#374151",
  "#1f2937",
  "#111827",
  // tailwind red 100 to 900
  "#fee2e2",
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
  // tailwind orange 100 to 900
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#c2410c",
  "#9a3412",
  "#7c2d12",
  // tailwind amber 100 to 900
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
  "#92400e",
  "#78350f",
  // tailwind yellow 100 to 900
  "#fef9c3",
  "#fef08a",
  "#fde047",
  "#facc15",
  "#eab308",
  "#ca8a04",
  "#a16207",
  "#854d0e",
  "#713f12",
  // tailwind lime 100 to 900
  "#ecfccb",
  "#d9f99d",
  "#bef264",
  "#a3e635",
  "#84cc16",
  "#65a30d",
  "#4d7c0f",
  "#3f6212",
  "#365314",
  // tailwind green 100 to 900
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e",
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",
  // tailwind emerald 100 to 900
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
  // tailwind teal 100 to 900
  "#ccfbf1",
  "#99f6e4",
  "#5eead4",
  "#2dd4bf",
  "#14b8a6",
  "#0d9488",
  "#0f766e",
  "#115e59",
  "#134e4a",
  // tailwind cyan 100 to 900
  "#cffafe",
  "#a5f3fc",
  "#67e8f9",
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
  // tailwind siy 100 to 900
  "#e0f2fe",
  "#bae6fd",
  "#7dd3fc",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#075985",
  "#0c4a6e",
  // tailwind blue 100 to 900
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  // tailwind indigo 100 to 900
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  // tailwind violet 100 to 900
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  // tailwind purple 100 to 900
  "#f5e1ff",
  "#e9d5ff",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",
  // tailwind fuchsia 100 to 900
  "#fae8ff",
  "#f5d0fe",
  "#f0abfc",
  "#e879f9",
  "#d946ef",
  "#c026d3",
  "#a21caf",
  "#86198f",
  "#701a75",
  // tailwind pink 100 to 900
  "#fce7f3",
  "#fbcfe8",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#9d174d",
  "#831843",
  // tailwind rose 100 to 900
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
  "#fb7185",
  "#f43f5e",
  "#e11d48",
  "#be123c",
  "#9f1239",
  "#881337",
];
