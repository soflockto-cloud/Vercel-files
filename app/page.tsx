import Link from "next/link"
import { Obfuscator } from "@/components/obfuscator"
import { Premium } from "@/components/premium"
import { ShieldCheck, Zap, Code2 } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground">
              WeAreDevs&nbsp;·&nbsp;Obfuscator
            </span>
          </div>

          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Lua Script Obfuscator
          </h1>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Protect your Lua source by running it through the WeAreDevs obfuscation engine. Paste
            your script, hit obfuscate, and copy the protected output — no manual work required.
          </p>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary" aria-hidden="true" /> One-click obfuscation
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 className="size-3.5 text-primary" aria-hidden="true" /> Powered by wearedevs.net
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" /> Copy or download output
            </span>
          </div>
        </header>

        <Obfuscator />

        <Premium />

        <footer className="mt-12 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          <p>
            Obfuscation is performed by the WeAreDevs API. This tool is an unofficial front-end and
            is not affiliated with WeAreDevs.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
