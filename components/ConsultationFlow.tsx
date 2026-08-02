"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  consultationConfirmation,
  consultationSteps,
  contactMethods,
  timeframes,
  treatmentsFor,
  uploadRequirements,
} from "@/lib/content";

/** Push conversion events to the analytics layer when one is present. */
function track(event: string, data: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") {
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event, ...data });
  }
}

const MAX_FILES = 10;
const MAX_SIZE_MB = 25;
const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png", ".heic", ".dcm"];

type FormData = {
  country: string;
  language: string;
  treatment: string;
  forWhom: string;
  situation: string; // the dental concern, in the patient's own words
  history: string; // previous diagnosis, treatment, or quotations
  symptoms: string; // current symptoms
  urgency: string; // pain / swelling flag
  timeframe: string;
  name: string;
  contactMethod: string;
  contactDetail: string;
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
  history: "",
  symptoms: "",
  urgency: "",
  timeframe: "",
  name: "",
  contactMethod: "",
  contactDetail: "",
  files: [],
  consentPrivacy: false,
  consentEmergency: false,
};

/** Titles come from the content model — one step per consultationSteps entry. */
const steps = consultationSteps;

const URGENCY_OPTIONS = [
  "No pain or swelling right now",
  "Occasional discomfort",
  "Ongoing pain",
  "Pain or swelling that is getting worse",
];

export function ConsultationFlow() {
  const params = useSearchParams();
  const recordsIntent = params.get("start") === "records" || params.get("intent") === "reports";
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
    () => [
      ...treatmentsFor("dental").map((t) => ({ value: t.slug, label: t.name })),
      { value: "not-sure", label: "Not sure yet / something else" },
    ],
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
      if (!data.forWhom) e.forWhom = "Please tell us who the consultation is for.";
      if (data.situation.trim().length < 20)
        e.situation = "A few sentences help the reviewing dentist respond usefully — please add a little more detail.";
    }
    // Step 2 (history) is optional by design.
    if (current === 3) {
      if (!data.urgency) e.urgency = "Please choose the option closest to how things feel right now.";
      if (!data.timeframe) e.timeframe = "Please choose a rough timeframe.";
    }
    if (current === 4) {
      if (!data.name.trim()) e.name = "Please tell us your name.";
      if (!data.contactMethod) e.contactMethod = "Please choose how you would like to be contacted.";
      if (!data.contactDetail.trim()) e.contactDetail = "Please add the address or number we should use.";
      else if (data.contactMethod === "Email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.contactDetail.trim()))
        e.contactDetail = "That email address does not look complete — please check it.";
    }
    if (current === 6) {
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
    track("consultation_step_completed", { step: step + 1, key: steps[step].key });
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
        error = `“${f.name}” is not a supported type. Accepted: ${uploadRequirements.accepted}.`;
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
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next.files = error;
      else delete next.files;
      return next;
    });
  }

  async function onSubmit() {
    if (!validate(6)) return;
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
          history: data.history,
          symptoms: data.symptoms,
          urgency: data.urgency,
          timeframe: data.timeframe,
          name: data.name,
          contactMethod: data.contactMethod,
          contactDetail: data.contactDetail,
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
      <div className="status status--success" role="status" aria-live="polite" style={{ display: "grid", gap: "1rem" }}>
        <h2 className="t-sub">{consultationConfirmation.heading}</h2>
        <p style={{ color: "var(--ink-soft)", fontWeight: 400 }}>{consultationConfirmation.body}</p>
        <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.4rem", color: "var(--ink-soft)", fontWeight: 400 }}>
          <li>A Medism care coordinator reviews your case.</li>
          <li>
            You receive a reply by {data.contactMethod ? data.contactMethod.toLowerCase() : "your chosen route"} with
            the next appropriate step, or with what is still needed for a useful review.
          </li>
          <li>Nothing proceeds without your say-so — this request creates no obligation.</li>
        </ol>
        <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)", fontWeight: 400 }}>
          {consultationConfirmation.fallback} If your situation becomes urgent, contact a local dentist,
          doctor, or emergency service — Medism is not an emergency service.
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;
  const urgent = data.urgency === URGENCY_OPTIONS[3];

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < steps.length - 1) onNext();
        else onSubmit();
      }}
    >
      <div className="steps-progress">
        <div className="steps-progress__meta">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step].title}</span>
        </div>
        <div
          className="steps-progress__bar"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
          aria-label="Form progress"
        >
          <div className="steps-progress__fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="t-sub" style={{ margin: "1.4rem 0 0.4rem", outline: "none" }}>
        {steps[step].title}
      </h2>
      <p className="hint" style={{ color: "var(--ink-soft)", maxWidth: "58ch" }}>
        {steps[step].whyWeAsk}
      </p>

      {state === "failed" && (
        <div className="status status--error" role="alert" style={{ marginBlock: "1rem" }}>
          <strong>We could not send your request.</strong>
          <p style={{ fontSize: "0.95rem" }}>
            Your answers are still here — please try again in a moment. If it keeps failing, use the routes
            on the{" "}
            <Link href="/contact" className="text-link">
              contact page
            </Link>{" "}
            and we will pick it up from there.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: "1.25rem", marginTop: "1.25rem" }}>
        {step === 0 && (
          <>
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
              <p className="hint">The language you are most comfortable discussing your dental care in.</p>
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
          <>
            <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              <legend style={{ fontWeight: 600, padding: 0, marginBottom: "0.4rem" }}>
                Which is closest to what you are exploring?
              </legend>
              <div className="choice-grid" role="radiogroup" aria-label="Treatment or concern">
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
            <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              <legend style={{ fontWeight: 600, padding: 0, marginBottom: "0.4rem" }}>Who is this for?</legend>
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
              <label htmlFor="situation">Describe your dental concern</label>
              <p className="hint">
                In your own words: what bothers you, what you would like to change, or the treatment you are
                considering. No dental vocabulary required.
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

        {step === 2 && (
          <div className="field">
            <label htmlFor="history">Previous diagnosis, treatment, or quotations (optional)</label>
            <p className="hint">
              For example: “my dentist said two teeth cannot be saved”, “I have a treatment plan from another
              clinic”, or “nothing so far”. If you have a written plan or quotation, you can attach it in the
              records step.
            </p>
            <textarea
              id="history"
              value={data.history}
              onChange={(e) => set("history", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <>
            <fieldset style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              <legend style={{ fontWeight: 600, padding: 0, marginBottom: "0.4rem" }}>How do things feel right now?</legend>
              <div className="choice-grid">
                {URGENCY_OPTIONS.map((u) => (
                  <div className="choice" key={u}>
                    <input
                      type="radio"
                      id={`urg-${u}`}
                      name="urgency"
                      value={u}
                      checked={data.urgency === u}
                      onChange={() => set("urgency", u)}
                    />
                    <label htmlFor={`urg-${u}`}>{u}</label>
                  </div>
                ))}
              </div>
              {errors.urgency && <p className="field-error">{errors.urgency}</p>}
            </fieldset>
            {urgent && (
              <div className="status status--error" role="alert">
                <strong>Worsening pain or swelling needs prompt in-person care.</strong>
                <p style={{ fontSize: "0.95rem" }}>
                  Please see a local dentist, doctor, or emergency service first — coordinated travel is not
                  the right next step for an acute problem. You are welcome to continue this request for
                  what comes after.
                </p>
              </div>
            )}
            <div className="field">
              <label htmlFor="symptoms">Anything else about how it feels? (optional)</label>
              <p className="hint">Sensitivity, loose teeth, bleeding gums, difficulty chewing — whatever you notice.</p>
              <textarea id="symptoms" value={data.symptoms} onChange={(e) => set("symptoms", e.target.value)} />
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
                {data.contactMethod === "Email"
                  ? "Email address"
                  : data.contactMethod
                    ? "Number to reach you on"
                    : "Email address or phone number"}
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
          </>
        )}

        {step === 5 && (
          <>
            <div className="upload-zone">
              <p style={{ fontWeight: 600 }}>Attach photographs, X-rays, scans, or records</p>
              <p className="hint" style={{ color: "var(--ink-soft)" }}>
                {uploadRequirements.accepted} · {uploadRequirements.maxSizeNote} · up to {MAX_FILES} files
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
                      Remove
                      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                        {" "}
                        {f.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="form-callout">
              <strong>Helpful things to include</strong>
              <ul style={{ margin: "0.4rem 0 0", paddingLeft: "1.1rem", display: "grid", gap: "0.3rem" }}>
                {uploadRequirements.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="note-disclosure">
              <strong>Upload preview.</strong> Secure record transfer is still being provisioned, so files
              you select here are listed with your request but not transmitted yet. Your coordinator will
              reply with a secure way to send them. {uploadRequirements.privacyNote}
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <div style={{ display: "grid", gap: "14px" }} aria-label="Your answers">
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Location &amp; language</strong>
                  <p>
                    {data.country} · {data.language}
                  </p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Concern</strong>
                  <p>
                    {treatmentOptions.find((t) => t.value === data.treatment)?.label ?? "—"} · for{" "}
                    {data.forWhom.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Urgency &amp; timeframe</strong>
                  <p>
                    {data.urgency} · {data.timeframe}
                  </p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Contact</strong>
                  <p>
                    {data.name} · {data.contactMethod} · {data.contactDetail}
                  </p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Records</strong>
                  <p>
                    {data.files.length > 0
                      ? `${data.files.length} file${data.files.length > 1 ? "s" : ""} listed (sent securely after we reply)`
                      : "None — that is fine"}
                  </p>
                </div>
              </div>
            </div>
            <div className="field" style={{ gap: "0.9rem" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="consentPrivacy"
                  checked={data.consentPrivacy}
                  onChange={(e) => set("consentPrivacy", e.target.checked)}
                  style={{ width: 22, height: 22, minHeight: 0, marginTop: 3, accentColor: "var(--papaya)" }}
                />
                <label htmlFor="consentPrivacy" style={{ fontWeight: 450 }}>
                  I have read how my information will be used (
                  <Link href="/privacy" className="text-link">
                    privacy policy
                  </Link>
                  ) and consent to Medism processing my health information to review this request.
                </label>
              </div>
              {errors.consentPrivacy && <p className="field-error">{errors.consentPrivacy}</p>}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="consentEmergency"
                  checked={data.consentEmergency}
                  onChange={(e) => set("consentEmergency", e.target.checked)}
                  style={{ width: 22, height: 22, minHeight: 0, marginTop: 3, accentColor: "var(--papaya)" }}
                />
                <label htmlFor="consentEmergency" style={{ fontWeight: 450 }}>
                  I understand Medism is a coordination service, not an emergency service or my treating
                  dentist, and that submitting this request does not create a dentist–patient relationship.
                </label>
              </div>
              {errors.consentEmergency && <p className="field-error">{errors.consentEmergency}</p>}
            </div>
          </>
        )}
      </div>

      <div className="form-actions" style={{ marginTop: "1.6rem" }}>
        {step > 0 ? (
          <button type="button" className="btn btn--secondary" onClick={() => go(step - 1)}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button type="submit" className="btn btn--primary">
            {(step === 2 && !data.history.trim()) || (step === 5 && data.files.length === 0 && !recordsIntent)
              ? "Skip for now"
              : "Continue"}
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
