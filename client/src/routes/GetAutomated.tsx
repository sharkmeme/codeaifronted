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
    <div className="min-h-screen flex justify-center p-8">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold">Get Automated</h1>

        {success ? (
          <div className="p-4 bg-green-200 text-green-900 rounded">
            Thank you! We will contact you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full p-3 border rounded"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 border rounded"
            />

            <input
              name="phone"
              required
              placeholder="Phone Number"
              className="w-full p-3 border rounded"
            />

            <input
              name="socials"
              placeholder="Instagram (optional)"
              className="w-full p-3 border rounded"
            />

            <select
              name="projectType"
              required
              className="w-full p-3 border rounded"
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
              className="w-full p-3 border rounded h-32"
            />

            <textarea
              name="extraInfo"
              placeholder="Extra information (optional)"
              className="w-full p-3 border rounded h-24"
            />

            {error && <div className="text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded font-semibold"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
