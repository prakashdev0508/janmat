import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

export function BottomCtaSection() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-gradient-to-br from-teal-600 to-emerald-700 p-12 text-center text-white shadow-2xl md:p-20">
        <Quote className="pointer-events-none absolute top-10 left-10 h-24 w-24 text-white/10 md:h-32 md:w-32" />
        <h2 className="mb-8 text-4xl font-bold md:text-5xl">
          Don&apos;t wait for five years to have your say.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-teal-50 opacity-90">
          Join millions of Indian citizens shaping the political discourse through
          real-time feedback and data visualization.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-teal-700 shadow-xl transition-all hover:scale-105"
        >
          Create Your Anonymous Account
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
