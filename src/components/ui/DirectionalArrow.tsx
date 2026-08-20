import { cn } from "@/lib/utils";

type ArrowDirection = "right" | "up-right" | "down-right" | "up" | "down";

const paths: Record<ArrowDirection, string> = {
  right: "M4 10h12m-4.5-4.5L16 10l-4.5 4.5",
  "up-right": "M5 15 15 5m-7 0h7v7",
  "down-right": "M5 5 15 15m0-7v7H8",
  up: "M10 16V4m-4.5 4.5L10 4l4.5 4.5",
  down: "M10 4v12m4.5-4.5L10 16l-4.5-4.5",
};

export default function DirectionalArrow({
  direction = "right",
  className,
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  return (
    <svg
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path
        d={paths[direction]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
