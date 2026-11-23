"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

type VerifyState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "result"; valid: boolean; email: string };

function isValidEmail(value: string) {
  const trimmed = value.trim();
  if (trimmed.length > 254) return false;
  return EMAIL_RE.test(trimmed);
}

export function EmailVerifierForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<VerifyState>({ status: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setState({ status: "checking" });
    await new Promise((r) => setTimeout(r, 650));

    setState({
      status: "result",
      valid: isValidEmail(trimmed),
      email: trimmed,
    });
  }

  return (
    <div className="w-full max-w-md justify-self-end lg:max-w-lg">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="email-verifier-input">
          Email address
        </label>
        <input
          id="email-verifier-input"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.status === "result") setState({ status: "idle" });
          }}
          className="h-11 w-full min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none placeholder:text-white/40 focus:border-white/30 focus:bg-white/[0.08] focus:ring-2 focus:ring-white/15 sm:flex-[1_1_12rem]"
        />
        <Button
          type="submit"
          size="lg"
          disabled={state.status === "checking" || !email.trim()}
          className="h-11 shrink-0 rounded-full bg-white px-7 text-sm font-semibold text-neutral-900 shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:bg-white/95 disabled:opacity-60"
        >
          {state.status === "checking" ? "Checking…" : "Check"}
        </Button>
      </form>

      {state.status === "result" ? (
        <p
          className={cn(
            "mt-3 text-sm font-medium sm:text-right",
            state.valid ? "text-emerald-300" : "text-red-300"
          )}
          role="status"
        >
          {state.valid
            ? `${state.email} looks like a valid email address.`
            : `${state.email} doesn’t look valid — check the format and try again.`}
        </p>
      ) : null}
    </div>
  );
}