import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let productName = "DropKit";
  let mode: string | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      productName = session.metadata?.product ?? productName;
      mode = session.mode;
    } catch {
      // Still show success UI even if retrieve fails
    }
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">
        Payment successful
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight">
        You’re in.
      </h1>
      <p className="mt-4 text-paper-dim">
        Stripe confirmed your{" "}
        {mode === "subscription" ? "subscription" : "purchase"}
        {productName !== "DropKit" ? (
          <>
            {" "}
            for <span className="text-paper">{productName}</span>
          </>
        ) : null}
        . Drop your next kit whenever you’re ready.
      </p>
      <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/new"
          className="bg-accent px-7 py-3 text-center font-mono text-sm font-semibold text-ink transition hover:bg-accent-deep"
        >
          Drop a kit
        </Link>
        <Link
          href="/"
          className="border border-ink-border px-7 py-3 text-center font-mono text-sm text-paper-dim transition hover:border-paper-dim hover:text-paper"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
