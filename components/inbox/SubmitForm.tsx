"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function SubmitForm() {
  const t = useTranslations("inbox");
  const locale = useLocale();
  const [type, setType] = useState<
    "suggestion" | "request" | "removal" | "message"
  >("suggestion");
  const [placeName, setPlaceName] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, placeName, url, body, locale, website }),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
      setPlaceName("");
      setUrl("");
      setBody("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="mt-10 max-w-[65ch] border-t border-border pt-6">
      <h2 className="font-serif font-medium text-[1.1rem] mb-1">
        {t("title")}
      </h2>
      <p className="text-muted text-[0.9rem] mb-4">{t("intro")}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1">
            {t("typeLabel")}
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[0.9rem]"
          >
            <option value="suggestion">{t("typeSuggestion")}</option>
            <option value="request">{t("typeRequest")}</option>
            <option value="removal">{t("typeRemoval")}</option>
            <option value="message">{t("typeMessage")}</option>
          </select>
        </div>

        {type !== "message" && (
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1">
              {t("nameLabel")}
            </label>
            <input
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[0.9rem]"
            />
          </div>
        )}

        {type !== "message" && (
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1">
              {t("urlLabel")}
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[0.9rem]"
            />
          </div>
        )}

        <div>
          <label className="block text-[0.8rem] font-semibold mb-1">
            {t("bodyLabel")}
          </label>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-[0.9rem]"
          />
        </div>

        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={state === "sending"}
          className="font-semibold text-[0.88rem] bg-ink text-paper px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {t("submit")}
        </button>

        {state === "success" && (
          <p className="text-[0.85rem] text-accent-ink">{t("success")}</p>
        )}
        {state === "error" && (
          <p className="text-[0.85rem] text-muted">{t("error")}</p>
        )}
      </form>
    </section>
  );
}
