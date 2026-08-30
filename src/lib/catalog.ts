export type CheckoutSku =
  | "pro"
  | "classroom"
  | "pack-react"
  | "pack-sql"
  | "pack-system";

type SkuDef = {
  name: string;
  description: string;
  unitAmount: number;
  mode: "subscription" | "payment";
  interval?: "month";
};

export const SKUS: Record<CheckoutSku, SkuDef> = {
  pro: {
    name: "DropKit Pro",
    description: "Unlimited kits, longer tracks, saved library",
    unitAmount: 900,
    mode: "subscription",
    interval: "month",
  },
  classroom: {
    name: "DropKit Classroom",
    description: "Teacher dashboard + 30 student seats",
    unitAmount: 4900,
    mode: "subscription",
    interval: "month",
  },
  "pack-react": {
    name: "React from Zero",
    description: "Curated Learning Pack — components, state, effects",
    unitAmount: 1200,
    mode: "payment",
  },
  "pack-sql": {
    name: "SQL Detective",
    description: "Curated Learning Pack — queries, joins, aggregates",
    unitAmount: 900,
    mode: "payment",
  },
  "pack-system": {
    name: "System Design Starter",
    description: "Curated Learning Pack — caching, queues, scaling",
    unitAmount: 1900,
    mode: "payment",
  },
};

export function isCheckoutSku(value: string): value is CheckoutSku {
  return value in SKUS;
}
