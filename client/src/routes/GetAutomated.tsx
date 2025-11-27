import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MultiStepForm } from "@/components/MultiStepForm";

export default function GetAutomated() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex justify-center pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-neutral-900 dark:text-neutral-100" data-testid="heading-get-automated">
          Get Automated
        </h1>

        <div className="w-full text-left mb-6">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            data-testid="link-back-home"
          >
            ← Back to Home
          </Link>
        </div>

        <MultiStepForm />
      </div>
    </div>
  );
}
