"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { contactMethods, timeframes, treatments } from "@/lib/content";

/** Push conversion events to the analytics layer when one is present. */
function track(event: string, data: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") {
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event, ...data });
  }
}

const MAX_FILES = 10;
const MAX_SIZE_MB = 20;
const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];

type FormData = {
  country: string;
  language: string;
  treatment: string;
  forWhom: string;
  situation: string;
  name: string;
  contactMethod: string;
  contactDetail: string;
  timeframe: string;
  files: File[];
  consentPrivacy: boolean;
  consentEmergency: boolean;
};

const initial: FormData = {
  country: "",
  language: "",
  treatment: "",
  forWhom: "",
  situation: "",
  name: "",
  contactMethod: "",
  contactDetail: "",
  timeframe: "",
  files: [],
  consentPrivacy: false,
  consentEmergency: false,
};

const stepTitles = [
  "Where are you writing from?",
  "What kind of care are you exploring?",
  "Tell us about the situation",
  "How should we reach you?",
  "Attach medical reports (optional)",
  "Review and send",
];

export function ConsultationFlow() {
  const params = useSearchParams();
  const reportsIntent = params.get("intent") === "reports";
  const presetTreatment = params.get("treatment") ?? "";

  const [data, setData] = useState<FormData>({ ...initial, treatment: presetTreatment });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"editing" | "sending" | "sent" | "failed">("editing");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const treatmentOptions = useMemo(
    () => [...treatments.map((t) => ({ value: t.slug, label: t.name })), { value: "not-sure", label: "Not sure yet / something else" }],
    []
  );

  function validate(current: number): boolean {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (!data.country.trim()) e.country = "Please tell us the country you are in.";
      if (!data.language.trim()) e.language = "Please tell us your preferred language.";
    }
    if (current === 1) {
      if (!data.treatment) e.treatment = "Please choose the closest option — “not sure” is fine.";
    }
    if (current === 2) {
      if (!data.forWhom) e.forWhom = "Please tell us who the consultation is for.";
      if (data.situation.trim().length < 20)
        e.situation = "A few sentences help our coordinators respond usefully — please add a little more detail.";
    }
    if (current === 3) {
      if (!data.name.trim()) e.name = "Please tell us your name.";
      if (!data.contactMethod) e.contactMethod = "Please choose how you would like to be contacted.";
      if (!data.contactDetail.trim())
        e.contactDetail = "Please add the address or number we should use.";
      else if (data.contactMethod === "Email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.contactDetail.trim()))
        e.contactDetail = "That email address does not look complete — please check it.";
      if (!data.timeframe) e.timeframe = "Please choose a rough timeframe.";
    }
    if (current === 5) {
      if (!data.consentPrivacy) e.consentPrivacy = "Please confirm you have read how your information is used.";
      if (!data.consentEmergency) e.consentEmergency = "Please confirm you understand this is not an emergency service.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function onNext() {
    if (!validate(step)) return;
    track("consultation_step_completed", { step: step + 1 });
    go(step + 1);
  }

  function onFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const accepted: File[] = [...data.files];
    let error = "";
    for (const f of incoming) {
      const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        error = `“${f.name}” is not a supported type. Accepted: PDF, JPG, PNG, DOC.`;
        continue;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        error = `“${f.name}” is larger than ${MAX_SIZE_MB} MB. Please compress it or split the file.`;
        continue;
      }
      if (accepted.length >= MAX_FILES) {
        error = `You can attach up to ${MAX_FILES} files. Send anything further after we reply.`;
        break;
      }
      accepted.push(f);
    }
    set("files", accepted);
    setErrors((prev) => (error ? { ...prev, files: error } : prev));
    if (!error) setErrors((prev) => {
      const next = { ...prev };
      delete next.files;
      return next;
    });
  }

  async function onSubmit() {
    if (!validate(5)) return;
    setState("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: data.country,
          language: data.language,
          treatment: data.treatment,
          forWhom: data.forWhom,
          situation: data.situation,
          name: data.name,
          contactMethod: data.contactMethod,
          contactDetail: data.contactDetail,
          timeframe: data.timeframe,
          fileCount: data.files.length,
          fileNames: data.files.map((f) => f.name),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("consultation_submitted", { treatment: data.treatment || "unspecified", files: data.files.length });
      setState("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="status status--success" role="status" aria-live="polite">
        <h2 className="t-sub">Your request has been received.</h2>
        <p className="muted">Here is what happens next:</p>
        <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.4rem", color: "var(--ink-soft)" }}>
          <li>A Medism care coordinator reviews your case.</li>
          <li>
            You receive a reply by {data.contactMethod ? data.contactMethod.toLowerCase() : "your chosen route"} with the
            next appropriate step, or with questions a specialist needs answered.
          </li>
          <li>Nothing proceeds without your say-so — this request creates no obligation.</li>
        </ol>
        <p className="muted" style={{ fontSize: "0.92rem" }}>
          If your situation changes urgently, contact your local emergency services — Medism is not an
          emergency service.
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / stepTitles.length) * 100;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 5) onNext();
        else onSubmit();
      }}
    >
      <div className="steps-progress">
        <div className="steps-progress__meta">
          <span>
            Step {step + 1} of {stepTitles.length}
          </span>
          <span>{stepTitles[step]}</span>
        </div>
        <div className="steps-progress__bar" role="progressbar" aria-valuemin={1} aria-valuemax={6} aria-valuenow={step + 1} aria-label="Form progress">
          <div className="steps-progress__fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="t-sub" style={{ marginBottom: "0.5rem", outline: "none" }}>
        {stepTitles[step]}
      </h2>

      {state === "failed" && (
        <div className="status status--error" role="alert" style={{ marginBlock: "1rem" }}>
          <strong>We could not send your request.</strong>
          <p style={{ fontSize: "0.95rem" }}>
            Your answers are still here — please try again in a moment. If it keeps failing, use the routes on
            the <Link href="/contact" className="text-link">contact page</Link> and we will pick it up from
            there.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: "1.25rem", marginTop: "1.25rem" }}>
        {step === 0 && (
          <>
            <p className="hint" style={{ color: "var(--ink-soft)" }}>
              We ask so your coordinator can plan around visas, flights, and time zones — and reply in the
              right language.
            </p>
            <div className="field">
              <label htmlFor="country">Country you are in</label>
              <input
                id="country"
                type="text"
                autoComplete="country-name"
                value={data.country}
                aria-invalid={errors.country ? true : undefined}
                aria-describedby={errors.country ? "country-err" : undefined}
                onChange={(e) => set("country", e.target.value)}
              />
              {errors.country && (
                <p className="field-error" id="country-err">
                  {errors.country}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="language">Preferred language</label>
              <p className="hint">The language you are most comfortable discussing medical matters in.</p>
              <input
                id="language"
                type="text"
                value={data.language}
                aria-invalid={errors.language ? true : undefined}
                aria-describedby={errors.language ? "language-err" : undefined}
                onChange={(e) => set("language", e.target.value)}
              />
              {errors.language && (
                <p className="field-error" id="language-err">
                  {errors.language}
                </p>
              )}
            </div>
          </>
        )}

        {step === 1 && (
          <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
            <legend className="hint" style={{ color: "var(--ink-soft)", padding: 0 }}>
              Choose the closest option — this only routes your case to the right coordinator. It is not a
              diagnosis and you can change it later.
            </legend>
            <div className="choice-grid" role="radiogroup" aria-label="Treatment or specialty">
              {treatmentOptions.map((opt) => (
                <div className="choice" key={opt.value}>
                  <input
                    type="radio"
                    id={`treat-${opt.value}`}
                    name="treatment"
                    value={opt.value}
                    checked={data.treatment === opt.value}
                    onChange={() => set("treatment", opt.value)}
                  />
                  <label htmlFor={`treat-${opt.value}`}>{opt.label}</label>
                </div>
              ))}
            </div>
            {errors.treatment && <p className="field-error">{errors.treatment}</p>}
          </fieldset>
        )}

        {step === 2 && (
          <>
            <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              <legend style={{ fontWeight: 600, padding: 0, marginBottom: "0.4rem" }}>Who is this consultation for?</legend>
              <div className="choice-grid">
                {["Myself", "A family member", "Someone I care for"].map((w) => (
                  <div className="choice" key={w}>
                    <input
                      type="radio"
                      id={`whom-${w}`}
                      name="forWhom"
                      value={w}
                      checked={data.forWhom === w}
                      onChange={() => set("forWhom", w)}
                    />
                    <label htmlFor={`whom-${w}`}>{w}</label>
                  </div>
                ))}
              </div>
              {errors.forWhom && <p className="field-error">{errors.forWhom}</p>}
            </fieldset>
            <div className="field">
              <label htmlFor="situation">Briefly describe the medical situation</label>
              <p className="hint">
                In your own words: what has been diagnosed or is suspected, what treatment has been advised,
                and what you are hoping to arrange. Please do not include more detail than you are comfortable
                sharing — reports can carry the specifics.
              </p>
              <textarea
                id="situation"
                value={data.situation}
                aria-invalid={errors.situation ? true : undefined}
                aria-describedby={errors.situation ? "situation-err" : undefined}
                onChange={(e) => set("situation", e.target.value)}
              />
              {errors.situation && (
                <p className="field-error" id="situation-err">
                  {errors.situation}
                </p>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={data.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-err" : undefined}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && (
                <p className="field-error" id="name-err">
                  {errors.name}
                </p>
              )}
            </div>
            <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              <legend style={{ fontWeight: 600, padding: 0, marginBottom: "0.4rem" }}>Preferred contact method</legend>
              <div className="choice-grid">
                {contactMethods.map((m) => (
                  <div className="choice" key={m}>
                    <input
                      type="radio"
                      id={`cm-${m}`}
                      name="contactMethod"
                      value={m}
                      checked={data.contactMethod === m}
                      onChange={() => set("contactMethod", m)}
                    />
                    <label htmlFor={`cm-${m}`}>{m}</label>
                  </div>
                ))}
              </div>
              {errors.contactMethod && <p className="field-error">{errors.contactMethod}</p>}
            </fieldset>
            <div className="field">
              <label htmlFor="contactDetail">
                {data.contactMethod === "Email" ? "Email address" : data.contactMethod ? "Number to reach you on" : "Email address or phone number"}
              </label>
              <input
                id="contactDetail"
                type={data.contactMethod === "Email" ? "email" : "text"}
                inputMode={data.contactMethod === "Email" ? "email" : "tel"}
                autoComplete={data.contactMethod === "Email" ? "email" : "tel"}
                value={data.contactDetail}
                aria-invalid={errors.contactDetail ? true : undefined}
                aria-describedby={errors.contactDetail ? "contactDetail-err" : undefined}
                onChange={(e) => set("contactDetail", e.target.value)}
              />
              {errors.contactDetail && (
                <p className="field-error" id="contactDetail-err">
                  {errors.contactDetail}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="timeframe">When are you hoping to move forward?</label>
              <select
                id="timeframe"
                value={data.timeframe}
                aria-invalid={errors.timeframe ? true : undefined}
                aria-describedby={errors.timeframe ? "timeframe-err" : undefined}
                onChange={(e) => set("timeframe", e.target.value)}
              >
                <option value="">Choose one…</option>
                {timeframes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.timeframe && (
                <p className="field-error" id="timeframe-err">
                  {errors.timeframe}
                </p>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="hint" style={{ color: "var(--ink-soft)" }}>
              Reports help specialists respond precisely — but they are <strong>optional</strong>. You can
              send them later, after we reply.
            </p>
            <div className="upload-zone">
              <p style={{ fontWeight: 600 }}>Attach medical reports</p>
              <p className="hint" style={{ color: "var(--ink-soft)" }}>
                PDF, JPG, PNG, or DOC · up to {MAX_SIZE_MB} MB each · up to {MAX_FILES} files
              </p>
              <label className="btn btn--secondary" style={{ cursor: "pointer" }}>
                Choose files
                <input
                  type="file"
                  multiple
                  accept={ACCEPTED.join(",")}
                  style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
                  onChange={(e) => {
                    onFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            {errors.files && <p className="field-error">{errors.files}</p>}
            {data.files.length > 0 && (
              <ul className="upload-list" aria-label="Attached files">
                {data.files.map((f, i) => (
                  <li key={`${f.name}-${i}`}>
                    <span>
                      {f.name} <span className="muted">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </span>
                    <button type="button" onClick={() => set("files", data.files.filter((_, j) => j !== i))}>
                      Remove<span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}> {f.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="form-callout">
              <strong>How your reports are handled</strong>
              <span>
                Files are used only to review your case, are shared only with the specialists involved, and
                are never used for marketing. Details are in our{" "}
                <Link href="/privacy" className="text-link">
                  privacy policy
                </Link>
                .
              </span>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <dl className="defs" aria-label="Your answers">
              <div>
                <dt>Location &amp; language</dt>
                <dd>
                  {data.country} · {data.language}
                </dd>
              </div>
              <div>
                <dt>Care explored</dt>
                <dd>{treatmentOptions.find((t) => t.value === data.treatment)?.label ?? "—"}</dd>
              </div>
              <div>
                <dt>For</dt>
                <dd>{data.forWhom}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  {data.name} · {data.contactMethod} · {data.contactDetail} · {data.timeframe}
                </dd>
              </div>
              <div>
                <dt>Reports attached</dt>
                <dd>{data.files.length > 0 ? `${data.files.length} file${data.files.length > 1 ? "s" : ""}` : "None — that is fine"}</dd>
              </div>
            </dl>
            <div className="field" style={{ gap: "0.9rem" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="consentPrivacy"
                  checked={data.consentPrivacy}
                  onChange={(e) => set("consentPrivacy", e.target.checked)}
                  style={{ width: 22, height: 22, minHeight: 0, marginTop: 3, accentColor: "var(--pine)" }}
                />
                <label htmlFor="consentPrivacy" style={{ fontWeight: 450 }}>
                  I have read how my information will be used (
                  <Link href="/privacy" className="text-link">
                    privacy policy
                  </Link>
                  ) and consent to Medism reviewing my case.
                </label>
              </div>
              {errors.consentPrivacy && <p className="field-error">{errors.consentPrivacy}</p>}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="consentEmergency"
                  checked={data.consentEmergency}
                  onChange={(e) => set("consentEmergency", e.target.checked)}
                  style={{ width: 22, height: 22, minHeight: 0, marginTop: 3, accentColor: "var(--pine)" }}
                />
                <label htmlFor="consentEmergency" style={{ fontWeight: 450 }}>
                  I understand Medism is a coordination service, not an emergency service, and that this
                  request is not for urgent medical needs.
                </label>
              </div>
              {errors.consentEmergency && <p className="field-error">{errors.consentEmergency}</p>}
            </div>
          </>
        )}
      </div>

      <div className="form-actions">
        {step > 0 ? (
          <button type="button" className="btn btn--secondary" onClick={() => go(step - 1)}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 5 ? (
          <button type="submit" className="btn btn--primary">
            {step === 4 && data.files.length === 0 && !reportsIntent ? "Skip for now" : "Continue"}
          </button>
        ) : (
          <button type="submit" className="btn btn--primary" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send my request"}
          </button>
        )}
      </div>
    </form>
  );
}
