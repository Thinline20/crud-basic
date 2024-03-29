import type { VariantProps } from "class-variance-authority"
import type { Component, ComponentProps } from "solid-js"

import { cva } from "class-variance-authority"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    defaultVariants: {
      variant: "default"
    },
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }
    }
  }
)

export interface BadgeProps extends ComponentProps<"div">, VariantProps<typeof badgeVariants> {}

const Badge: Component<BadgeProps> = (props) => {
  const [, rest] = splitProps(props, ["variant", "class"])
  return <div class={cn(badgeVariants({ variant: props.variant }), props.class)} {...rest} />
}

export { Badge, badgeVariants }
