"use client";

import React, { useState } from "react";

type FormContent = {
  id: number;
  form_content_description: string;
  order?: number | null;
  required?: boolean;
};

type FormType = {
  id: number;
  form_name: string;
  form_description?: string | null;
  form_content: FormContent[];
};

export default function SurveyForm({ form }: { form: FormType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});

  function handleAnswer(id: number, value: number | string) {
    setAnswers((s) => ({ ...s, [id]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);

    const payload = {
      form_id: form.id,
      name,
      email,
      contact_no: contactNo,
      answers: Object.entries(answers).map(([k, v]) => ({ form_content_id: Number(k), rating: typeof v === 'number' ? v : null })),
    };

    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setSuccess('Thank you! Your responses have been recorded.');
        setName(''); setEmail(''); setContactNo(''); setAnswers({});
      } else {
        setSuccess(json?.error || 'Submission failed');
      }
    } catch (err) {
      setSuccess('Network error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input className="col-span-1 rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="col-span-1 rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="col-span-1 rounded border p-2" placeholder="Contact No" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
      </div>

      <div>
        {form.form_content.map((q) => (
          <div key={q.id} className="mb-4">
            <label className="mb-1 block font-medium">{q.form_content_description}</label>
            <div className="flex gap-2">
              {/* Simple 1-5 rating */}
              {[1,2,3,4,5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => handleAnswer(q.id, n)}
                  className={`rounded-md border px-3 py-1 ${answers[q.id] === n ? 'bg-orange-500 text-white' : ''}`}
                >{n}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={submitting} className="rounded bg-[#2a9d8f] px-4 py-2 text-white disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        {success && <div className="text-sm text-green-600">{success}</div>}
      </div>
    </form>
  );
}
