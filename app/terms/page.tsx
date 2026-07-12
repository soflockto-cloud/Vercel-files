import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service — Lua Obfuscator",
  description:
    "The terms and conditions governing your use of the WeAreDevs Lua Obfuscator web app.",
}

const LAST_UPDATED = "July 11, 2026"

const sections = [
  {
    title: "1. What This Tool Is For",
    body: [
      "This Lua Obfuscator (the \"Service\") is a free, unofficial front-end that forwards Lua scripts you submit to the third-party WeAreDevs obfuscation API and returns the obfuscated result. Its only purpose is to help developers protect their own legitimate Lua source code from casual copying and reverse-engineering.",
      "The Service does not create, host, store, execute, or distribute any script. It simply passes text you provide to WeAreDevs and shows you what comes back. We do not review, endorse, or take ownership of any code processed through it.",
    ],
  },
  {
    title: "2. Acceptance of Terms",
    body: [
      "By accessing or using the Service, you confirm that you have read, understood, and agree to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Service.",
      "You represent that you are at least the age of majority in your jurisdiction (or have the consent of a parent or legal guardian) and that you have the legal capacity to enter into this agreement.",
    ],
  },
  {
    title: "3. You Are Solely Responsible for Your Scripts",
    body: [
      "You — and not the operator of this Service — are entirely responsible for any script you submit, the source of that script, the right to process it, and everything that happens as a result of obfuscating or distributing it.",
      "You confirm that you own the code you submit or have explicit permission to use and obfuscate it, and that doing so does not violate any law, contract, license, or third party's rights.",
    ],
  },
  {
    title: "4. Acceptable Use",
    body: [
      "You agree to use the Service only for lawful purposes. You must NOT use the Service to obfuscate, conceal, distribute, or facilitate: malware, viruses, keyloggers, or spyware; code that gains unauthorized access to systems, accounts, or data; cheats, exploits, or scripts that violate another platform's terms of service; stolen, pirated, or infringing code; or anything intended to deceive, defraud, or harm any person, device, or service.",
      "We reserve the right to deny access to anyone at any time, for any reason, without notice.",
    ],
  },
  {
    title: "5. No Warranty",
    body: [
      "The Service is provided \"AS IS\" and \"AS AVAILABLE\" without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, title, and non-infringement.",
      "We do not warrant that the Service will be uninterrupted, secure, or error-free, that obfuscated output will function identically to your input, or that submitted scripts will remain private once transmitted to the third-party API.",
    ],
  },
  {
    title: "6. Assumption of Risk & Limitation of Liability",
    body: [
      "You use the Service entirely at your own risk. To the maximum extent permitted by applicable law, in no event shall the operator, creator, or host of this Service be liable for any direct, indirect, incidental, special, consequential, exemplary, or punitive damages — including but not limited to loss of data, revenue, profits, goodwill, or business — arising out of or related to your use of, or inability to use, the Service, even if advised of the possibility of such damages.",
      "To the maximum extent permitted by law, our total aggregate liability to you for any and all claims relating to the Service shall not exceed one U.S. dollar (US $1.00).",
    ],
  },
  {
    title: "7. Indemnification",
    body: [
      "You agree to defend, indemnify, and hold harmless the operator, creator, and host of this Service from and against any and all claims, demands, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or connected to: (a) any script you submit; (b) your use or misuse of the Service; (c) your violation of these Terms; or (d) your violation of any law or the rights of any third party.",
      "This means that if a third party brings a claim against us because of what you did with the Service, you are responsible for covering the resulting costs and legal fees.",
    ],
  },
  {
    title: "8. Third-Party Services",
    body: [
      "Scripts submitted through the Service are transmitted to and processed by the WeAreDevs API. This tool is not affiliated with, endorsed by, sponsored by, or maintained by WeAreDevs. Your use of that processing is subject to WeAreDevs' own terms and policies, over which we have no control and for which we bear no responsibility.",
    ],
  },
  {
    title: "9. Not Legal Advice",
    body: [
      "These Terms are provided for general informational purposes only and do not constitute legal advice. They may not be enforceable or complete in every jurisdiction. If you need certainty about your legal exposure, consult a qualified attorney in your area.",
    ],
  },
  {
    title: "10. Changes to These Terms",
    body: [
      "We may update these Terms at any time and without prior notice. Any changes take effect as soon as they are posted, and your continued use of the Service after that point constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "If you have questions about these Terms, please reach out through the channel where you obtained access to this Service.",
    ],
  },
]

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="mb-10 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Read this carefully.</span> This is a free,
            unofficial tool. You are fully responsible for every script you submit and for how you
            use the output. By continuing, you agree to take on all legal and financial risk and to
            hold the operator of this Service harmless for anything you do with it.
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
          <Link href="/privacy" className="w-fit transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </main>
  )
}
