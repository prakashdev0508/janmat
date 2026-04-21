import Link from "next/link";
import { Vote } from "lucide-react";
import { loginFeatureCards } from "../loginData";

export function LoginBrandPanel() {
  return (
    <section className="bg-teal-gradient relative hidden overflow-hidden p-12 lg:flex lg:w-2/5 lg:flex-col">
      <div className="mb-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488] text-white shadow-lg shadow-teal-500/20">
            <Vote className="h-5 w-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#1e293b]">JanMat</span>
        </Link>
      </div>

      <div className="max-w-md">
        <h1 className="mb-4 text-5xl leading-tight font-extrabold tracking-tight text-[#1e293b]">
          Welcome Back
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-[#64748b]">
          Join millions tracking India&apos;s political sentiment in real-time. Your voice
          shapes the narrative.
        </p>

        <div className="space-y-6">
          {loginFeatureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-[#e2e8f0] border-l-4 border-l-[#0d9488] bg-white p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-[#0d9488]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e293b]">{feature.title}</h3>
                  <p className="text-sm text-[#64748b]">{feature.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
          Empowering Digital Democracy
        </p>
      </div>

      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-100 opacity-50 blur-3xl" />
    </section>
  );
}
