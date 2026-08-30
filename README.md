# DropKit — drop a kit into Cursor instantly

Paste a learning goal. DropKit generates an installable **kit** — a teaching rule for `.cursor/rules`, a `SKILL.md`, and an ordered Agent prompt sequence — that you drop straight into Cursor.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Env (`.env.local`)

```
GROQ_API_KEY=...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Without Groq, a built-in demo kit is served. Stripe Checkout needs the secret key.

## Stripe Checkout

`/pricing` → Pro / Classroom / marketplace kits → Stripe hosted Checkout → `/success`

Test card: `4242 4242 4242 4242`

## Stripe Projects (hackathon)

Code: `stripe-dhaka-aievent2026`

```bash
stripe login
stripe whoami
stripe projects init dropkit --yes
stripe projects share
```

## Compliance

- Brand: **DropKit** — descriptive “for Cursor” phrasing only; not affiliated with Anysphere / Cursor.
- Kits are teaching content only (no shell / network / out-of-project file access).
