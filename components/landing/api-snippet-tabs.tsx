"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const snippets = {
  curl: `curl -X POST https://api.reru.io/v1/validate \\
  -H "Authorization: Bearer $RERU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"ops@acme.co","smtp_probe":true}'`,
  javascript: `const res = await fetch("https://api.reru.io/v1/inbox-tests", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.RERU_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: "newsletter@acme.co",
    subject: "March product update",
    providers: ["gmail", "outlook", "yahoo"],
  }),
});

const placement = await res.json();
console.log(placement.summary);`,
  python: `import os, requests

r = requests.post(
    "https://api.reru.io/v1/warmup/mailboxes",
    headers={"Authorization": f"Bearer {os.environ['RERU_API_KEY']}"},
    json={"address": "sales@acme.co", "ramp_days": 21},
    timeout=30,
)
r.raise_for_status()
print(r.json()["reputation_trend"])`,
  go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "os"
)

func main() {
    body, _ := json.Marshal(map[string]any{
        "html": "<p>Preview this template</p>",
        "clients": []string{"apple-mail", "gmail-web", "outlook-desktop"},
    })
    req, _ := http.NewRequest("POST", "https://api.reru.io/v1/previews", bytes.NewReader(body))
    req.Header.Set("Authorization", "Bearer "+os.Getenv("RERU_API_KEY"))
    req.Header.Set("Content-Type", "application/json")
    http.DefaultClient.Do(req)
}`,
} as const;

export function ApiSnippetTabs() {
  return (
    <Tabs defaultValue="curl" className="w-full gap-3">
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-0 rounded-none border-b border-border bg-transparent p-0"
      >
        {(Object.keys(snippets) as Array<keyof typeof snippets>).map((lang) => (
          <TabsTrigger
            key={lang}
            value={lang}
            className="rounded-none px-3 py-2 text-xs uppercase tracking-wide after:bg-foreground data-active:bg-transparent"
          >
            {lang}
          </TabsTrigger>
        ))}
      </TabsList>
      {(Object.keys(snippets) as Array<keyof typeof snippets>).map((lang) => (
        <TabsContent key={lang} value={lang} className="mt-0">
          <pre className="max-h-[220px] overflow-auto rounded-sm border border-border bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <code>{snippets[lang]}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}