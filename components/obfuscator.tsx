"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Download, Loader2, Lock, Trash2, ShieldCheck, Upload } from "lucide-react"

const SAMPLE = `local function greet(name)
    print("Hello, " .. name .. "!")
end

greet("WeAreDevs")`

export function Obfuscator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Please upload a file under 5 MB.")
      e.target.value = ""
      return
    }

    try {
      const text = await file.text()
      setInput(text)
      setOutput("")
      setError(null)
      setCopied(false)
    } catch {
      setError("Could not read that file.")
    } finally {
      e.target.value = ""
    }
  }

  async function handleObfuscate() {
    if (!input.trim()) {
      setError("Please paste a Lua script first.")
      return
    }
    setLoading(true)
    setError(null)
    setOutput("")
    setCopied(false)

    try {
      const res = await fetch("/api/obfuscate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: input }),
      })
      const data = await res.json()

      if (!res.ok || !data?.obfuscated) {
        throw new Error(data?.error || "Failed to obfuscate the script.")
      }
      setOutput(data.obfuscated)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!output) return
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "obfuscated.lua"
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleClear() {
    setInput("")
    setOutput("")
    setError(null)
    setCopied(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Editor grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-destructive/70" aria-hidden="true" />
              <span className="size-3 rounded-full bg-muted-foreground/40" aria-hidden="true" />
              <span className="size-3 rounded-full bg-primary/70" aria-hidden="true" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">input.lua</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Upload className="size-3.5" aria-hidden="true" />
                Upload file
              </button>
              <button
                type="button"
                onClick={() => setInput(SAMPLE)}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Load sample
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".lua,.txt,.luau,text/plain"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <label htmlFor="lua-input" className="sr-only">
            Lua script to obfuscate
          </label>
          <textarea
            id="lua-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="-- Paste your Lua script here"
            spellCheck={false}
            className="min-h-80 flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="border-t border-border px-4 py-2 text-right font-mono text-xs text-muted-foreground">
            {input.length.toLocaleString()} chars
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">obfuscated.lua</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
                className="h-7 gap-1.5 px-2 font-mono text-xs"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                disabled={!output}
                className="h-7 gap-1.5 px-2 font-mono text-xs"
              >
                <Download className="size-3.5" />
                Save
              </Button>
            </div>
          </div>
          <div className="relative min-h-80 flex-1">
            <textarea
              readOnly
              value={output}
              placeholder="-- Obfuscated output will appear here"
              spellCheck={false}
              className="absolute inset-0 h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  Obfuscating…
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-border px-4 py-2 text-right font-mono text-xs text-muted-foreground">
            {output.length.toLocaleString()} chars
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 font-mono text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={handleObfuscate}
          disabled={loading}
          size="lg"
          className="gap-2 font-medium"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          {loading ? "Obfuscating…" : "Obfuscate Script"}
        </Button>
        <Button
          type="button"
          onClick={handleClear}
          variant="outline"
          size="lg"
          disabled={loading || (!input && !output)}
          className="gap-2 bg-transparent"
        >
          <Trash2 className="size-4" />
          Clear
        </Button>
      </div>
    </div>
  )
}
