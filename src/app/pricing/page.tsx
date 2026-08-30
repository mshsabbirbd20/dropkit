import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import type { CheckoutSku } from "@/lib/catalog";

const tiers: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
  free?: boolean;
  sku?: CheckoutSku;
  cta: string;
}[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 kit per day",
      "All beginner & intermediate topics",
      "Copy-paste install, no account",
    ],
    cta: "Drop a kit",
    highlight: false,
    free: true,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    features: [
      "Unlimited kit generation",
      "Longer multi-day tracks",
      "Saved kit library & sharing",
      "Priority generation",
    ],
    cta: "Upgrade with Stripe",
    highlight: true,
    sku: "pro",
  },
  {
    name: "Classroom",
    price: "$49",
    period: "per month",
    features: [
      "Teacher dashboard",
      "Seats for 30 students",
      "Curated curriculum packs",
      "Progress checkpoints export",
    ],
    cta: "Start Classroom",
    highlight: false,
    sku: "classroom",
  },
];

const marketplace: {
  title: string;
  price: string;
  topics: string;
  sku: CheckoutSku;
}[] = [
  {
    title: "React from Zero",
    price: "$12",
    topics: "components, state, effects",
    sku: "pack-react",
  },
  {
    title: "SQL Detective",
    price: "$9",
    topics: "queries, joins, aggregates",
    sku: "pack-sql",
  },
  {
    title: "System Design Starter",
    price: "$19",
    topics: "caching, queues, scaling",
    sku: "pack-system",
  },
];

export default async function Pricing({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="font-display text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        Simple pricing, serious learning
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-paper-dim">
        Start free. Upgrade when you want unlimited kits dropped into Cursor.
        Payments powered by Stripe Checkout.
      </p>

      {canceled && (
        <p className="mx-auto mt-6 max-w-md border border-ink-border bg-ink-raised px-4 py-3 text-center text-sm text-paper-dim">
          Checkout canceled — no charge. You can try again anytime.
        </p>
      )}

      <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col border px-7 py-8 ${
              tier.highlight
                ? "border-accent bg-accent/5"
                : "border-ink-border bg-ink-raised"
            }`}
          >
            <h2 className="font-display text-lg font-medium">{tier.name}</h2>
            <p className="mt-4">
              <span className="font-display text-4xl font-semibold">
                {tier.price}
              </span>
              <span className="ml-2 text-sm text-paper-dim">{tier.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-paper-dim">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-accent">—</span>
                  {f}
                </li>
              ))}
            </ul>
            {tier.free ? (
              <Link
                href="/new"
                className="mt-8 border border-ink-border py-2.5 text-center font-mono text-sm font-semibold text-paper-dim transition hover:border-paper-dim hover:text-paper"
              >
                {tier.cta}
              </Link>
            ) : tier.sku ? (
              <CheckoutButton
                sku={tier.sku}
                label={tier.cta}
                highlight={tier.highlight}
              />
            ) : null}
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="font-display text-center text-2xl font-medium">
          Pack marketplace
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-paper-dim">
          Hand-curated learning packs. One-time purchase via Stripe Checkout.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {marketplace.map((pack) => (
            <div
              key={pack.title}
              className="flex flex-col border border-ink-border bg-ink-raised px-6 py-6"
            >
              <h3 className="font-display font-medium">{pack.title}</h3>
              <p className="mt-1 text-xs text-paper-dim">{pack.topics}</p>
              <p className="mt-4 text-lg font-semibold text-accent">
                {pack.price}
              </p>
              <CheckoutButton sku={pack.sku} label="Buy with Stripe" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
