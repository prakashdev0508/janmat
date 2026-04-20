import { Bell, LogOut, Mail, Settings, ShieldCheck } from "lucide-react";
import type { DashboardSettingToggle } from "../types";

type SettingsPanelProps = {
  toggles: DashboardSettingToggle[];
  onToggle: (toggleId: string) => void;
};

function iconForSetting(id: DashboardSettingToggle["id"]) {
  if (id === "alerts") return Mail;
  if (id === "reminder") return Bell;
  return Settings;
}

export function SettingsPanel({ toggles, onToggle }: SettingsPanelProps) {
  return (
    <section className="glass-card rounded-[32px] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Settings</h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:text-teal-600">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-5">
        {toggles.map((toggle) => {
          const Icon = iconForSetting(toggle.id);
          return (
            <div key={toggle.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    toggle.enabled ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{toggle.label}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={toggle.enabled}
                aria-label={toggle.label}
                onClick={() => onToggle(toggle.id)}
                className={`relative h-5 w-10 rounded-full transition-colors ${
                  toggle.enabled ? "bg-teal-500" : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute top-1 h-3.5 w-3.5 rounded-full bg-white transition-all ${
                    toggle.enabled ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-teal-600" />
          <p className="text-[10px] leading-relaxed font-medium text-slate-500">
            Your voting remains <b className="text-slate-900">100% anonymous</b>. We
            use differential privacy to ensure individual votes are never traced back
            to profiles.
          </p>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold tracking-widest text-red-500 uppercase transition-all hover:bg-red-50">
        <LogOut className="h-4 w-4" />
        Logout Session
      </button>
    </section>
  );
}
