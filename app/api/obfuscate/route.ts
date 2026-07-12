import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(request: NextRequest) {
  let script: string

  try {
    const body = await request.json()
    script = body?.script
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (typeof script !== "string" || script.trim().length === 0) {
    return NextResponse.json({ error: "Please provide a non-empty Lua script." }, { status: 400 })
  }

  try {
    const upstream = await fetch("https://wearedevs.net/api/obfuscate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ script }),
    })

    const text = await upstream.text()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { error: "The obfuscation service returned an unexpected response." },
        { status: 502 },
      )
    }

    const obfuscated = (data as { obfuscated?: unknown })?.obfuscated

    if (!upstream.ok || typeof obfuscated !== "string") {
      const message =
        (data as { message?: string; error?: string })?.message ||
        (data as { message?: string; error?: string })?.error ||
        "The obfuscation service could not process this script."
      return NextResponse.json({ error: message }, { status: upstream.ok ? 502 : upstream.status })
    }

    return NextResponse.json({ obfuscated })
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the obfuscation service. Please try again." },
      { status: 502 },
    )
  }
}
