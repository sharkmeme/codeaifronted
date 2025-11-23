import { useState } from "react";

export default function GetAutomated() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Something went wrong.");
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-neutral-900 dark:text-neutral-100">Get Automated</h1>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md bg-white dark:bg-neutral-950 p-10 space-y-8">
          {success ? (
            <div className="p-4 rounded-xl bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100 font-semibold border border-green-300 dark:border-green-700 shadow">
              Thank you! We will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="name"
                required
                placeholder="Your Name"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              <input
                name="phone"
                required
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              <input
                name="socials"
                placeholder="Instagram (optional)"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              <select
                name="projectType"
                required
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100"
              >
                <option value="">Select Project Type</option>
                <option>Process Automation</option>
                <option>Content Automation</option>
                <option>Trading Automation</option>
                <option>AI Website</option>
                <option>Other</option>
              </select>

              <textarea
                name="description"
                required
                placeholder="Describe your project"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 h-32 resize-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              <textarea
                name="extraInfo"
                placeholder="Extra information (optional)"
                className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-neutral-50 dark:bg-neutral-900 h-32 resize-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
              />

              {error && <div className="text-red-600 dark:text-red-400">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition shadow-lg shadow-blue-200 dark:shadow-blue-900/50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
