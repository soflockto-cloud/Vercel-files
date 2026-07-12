import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy — Lua Obfuscator",
  description:
    "How the WeAreDevs Lua Obfuscator web app and Discord bot handle the data you submit.",
}

const LAST_UPDATED = "July 11, 2026"

const sections = [
  {
    title: "1. Overview",
    body: [
      "This Privacy Policy explains what information the Lua Obfuscator (the \"Service\") — including the website and any associated Discord bot — collects, how it is used, and your choices. By using the Service you agree to the practices described here.",
      "We are committed to collecting as little data as possible. The Service is designed to process scripts and return results, not to build profiles about you.",
    ],
  },
  {
    title: "2. Information We Process",
    body: [
      "Script content: The Lua code you submit is transmitted to the third-party WeAreDevs obfuscation API so it can be obfuscated and returned to you. This content is not stored on our servers after the request completes.",
      "Discord data (bot only): If you use the Service through a Discord bot, we may temporarily process the message content of your command, your Discord user ID, and the server (guild) and channel ID where the command was sent. This is used solely to receive your script and deliver the obfuscated result back to you.",
      "Technical data: Standard request metadata (such as IP address and timestamps) may be logged briefly by our hosting provider for security, abuse prevention, and reliability. We do not use this to identify you.",
    ],
  },
  {
    title: "3. What We Do NOT Do",
    body: [
      "We do not sell, rent, or trade your data. We do not permanently store submitted scripts. We do not create advertising profiles, and we do not track you across other websites or services.",
    ],
  },
  {
    title: "4. How the Data Is Used",
    body: [
      "Any data processed by the Service is used only to: (a) forward your script to the WeAreDevs API and return the obfuscated output; (b) operate, secure, and troubleshoot the Service; and (c) prevent abuse or violations of our Terms.",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "Submitted scripts and their obfuscated output are held only in memory for the duration of the request and are not retained afterward. Minimal technical logs, where they exist, are kept only as long as needed for security and are then discarded.",
    ],
  },
  {
    title: "6. Third-Party Services",
    body: [
      "Your scripts are processed by the WeAreDevs API, and the bot operates on the Discord platform. These third parties handle your data under their own privacy policies, over which we have no control. We encourage you to review WeAreDevs' and Discord's respective policies.",
    ],
  },
  {
    title: "7. Children's Privacy",
    body: [
      "The Service is not directed to children. In the case of the Discord bot, use is also subject to Discord's minimum age requirements. We do not knowingly collect personal information from anyone below those age limits.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We take reasonable measures to protect data in transit. However, no method of transmission over the internet is completely secure, and you should not submit scripts containing sensitive secrets, credentials, or personal information.",
    ],
  },
  {
    title: "9. Your Choices",
    body: [
      "You can stop using the Service at any time. For the Discord bot, you can remove it from your server to end all processing. Because we do not retain your scripts, there is generally no stored personal data to delete.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy at any time. Changes take effect as soon as they are posted, and your continued use of the Service after that point constitutes acceptance of the revised policy.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "If you have questions about this Privacy Policy, please reach out through the channel where you obtained access to this Service.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <header className="mb-10 flex flex-col gap-4">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to obfuscator
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground">
              WeAreDevs&nbsp;·&nbsp;Obfuscator
            </span>
          </div>

          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="mb-10 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <Lock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Privacy first.</span> We don&apos;t store
            your scripts, sell your data, or track you. Code you submit is forwarded to the WeAreDevs
            API only to obfuscate it and hand the result straight back to you.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-12 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          <p>
            Obfuscation is performed by the WeAreDevs API. This tool is an unofficial front-end and
            is not affiliated with WeAreDevs.
          </p>
          <Link href="/terms" className="w-fit transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </footer>
      </div>
    </main>
  )
}
