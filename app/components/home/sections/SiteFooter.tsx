import type { FooterGroup } from "../homeData";
import { BarChart3, Send } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export function SiteFooter({ groups }: { groups: FooterGroup[] }) {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white shadow-md">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">
                Jan<span className="text-teal-600">Mat</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed font-medium text-slate-500">
              India&apos;s first real-time, citizen-led political sentiment
              platform. We visualize public opinion to foster transparency and
              engagement.
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="transition-colors hover:text-teal-600" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="transition-colors hover:text-teal-600" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="transition-colors hover:text-teal-600" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-6 font-bold text-slate-900">{group.title}</h4>
              <ul className="space-y-4 text-sm font-semibold text-slate-500">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-teal-600">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 font-bold text-slate-900">Newsletter</h4>
            <p className="mb-4 text-sm font-medium text-slate-500">
              Get weekly insights on political sentiment shifts.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
              />
              <button className="rounded-xl bg-teal-600 px-4 py-2 text-white transition-all hover:bg-teal-700">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs font-bold tracking-wider text-slate-400 uppercase md:flex-row">
          <p>© 2024 JanMat Platforms. Independent & Non-Official.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-slate-900">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
