"use client"

import { useState } from "react"
import { Check, Crown, KeyRound, ShieldCheck } from "lucide-react"

// Owner-only free access. Change this to your own secret owner key.
const OWNER_KEY = "owner-access-2026"

type Plan = {
  id: string
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  highlight?: boolean
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    period: "/ forever",
    tagline: "Everything you need to protect a script.",
    features: [
      "One-click Lua obfuscation",
      "Up to 5 MB file uploads",
      "Copy & download output",
      "Standard queue priority",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$5",
    period: "/ month",
    tagline: "For creators shipping scripts regularly.",
    highlight: true,
    features: [
      "Everything in Basic",
      "Priority obfuscation queue",
      "Larger 25 MB file uploads",
      "Batch obfuscate multiple files",
      "No cooldowns between requests",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$29",
    period: "/ once",
    tagline: "Pay once, keep Pro perks forever.",
    features: [
      "Everything in Pro",
      "One-time payment, no renewals",
      "Early access to new features",
      "Priority support",
    ],
  },
]

export function Premium() {
  const [active, setActive] = useState("pro")
  const plan = PLANS.find((p) => p.id === active) ?? PLANS[0]

  return (
    <section className="mt-14" aria-labelledby="premium-heading">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Crown className="size-4" aria-hidden="true" />
        </div>
        <h2 id="premium-heading" className="text-xl font-semibold tracking-tight">
          Get Premium
        </h2>
      </div>

      {/* Tabs — 3 lines to click */}
      <div
        role="tablist"
        aria-label="Premium plans"
        className="flex flex-col overflow-hidden rounded-lg border border-border"
      >
        {PLANS.map((p) => {
          const isActive = p.id === active
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(p.id)}
              className={`flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary ${
                isActive ? "bg-secondary" : "bg-card"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`size-2 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground/40"}`}
                  aria-hidden="true"
                />
                <span className="font-medium">{p.name}</span>
                {p.highlight ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-medium text-primary-foreground">
                    POPULAR
                  </span>
                ) : null}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                <span className="text-foreground">{p.price}</span>
                {p.period}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected plan detail */}
      <div className="mt-4 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-lg font-semibold">{plan.name}</p>
            <p className="text-sm text-muted-foreground">{plan.tagline}</p>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-2xl font-semibold text-foreground">{plan.price}</span>
            {plan.period}
          </p>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          {plan.price === "$0" ? "Start for free" : `Get ${plan.name}`}
        </button>
      </div>
    </section>
  )
}
