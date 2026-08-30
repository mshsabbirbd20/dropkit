import { NextResponse } from "next/server";
import { isCheckoutSku, SKUS } from "@/lib/catalog";
import { appUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const sku = typeof body?.sku === "string" ? body.sku : "";

    if (!isCheckoutSku(sku)) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const product = SKUS[sku];
    const stripe = getStripe();
    const base = appUrl();

    const session = await stripe.checkout.sessions.create({
      mode: product.mode,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.unitAmount,
            product_data: {
              name: product.name,
              description: product.description,
            },
            ...(product.mode === "subscription"
              ? { recurring: { interval: product.interval ?? "month" } }
              : {}),
          },
        },
      ],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pricing?canceled=1`,
      metadata: { sku, product: product.name },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout session missing URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout failed.";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
