import { Flame, Medal } from "lucide-react";
import type { StreakDay } from "../types";

type StreakTrackerPanelProps = {
  streakDaysCount: number;
  days: StreakDay[];
};

export function StreakTrackerPanel({ streakDaysCount, days }: StreakTrackerPanelProps) {
  return (
    <section className="glass-card rounded-[32px] p-6">
      <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
        <Flame className="h-5 w-5 text-orange-500" />
        Voting Streak
      </h3>
      <p className="mb-4 text-3xl font-black text-teal-600">{streakDaysCount} days</p>

      <div className="mb-4 grid grid-cols-6 gap-2">
        {days.map((day) => (
          <div
            key={day.day}
            className={`flex aspect-square items-center justify-center rounded-lg text-[11px] font-bold ${
              day.active ? "streak-active text-white" : "bg-slate-100 text-slate-400"
            } ${day.isToday ? "ring-2 ring-teal-300 ring-offset-2 ring-offset-white" : ""}`}
          >
            {day.day}
          </div>
        ))}
      </div>

      <p className="mb-6 text-xs leading-relaxed font-medium text-slate-500">
        <span className="font-bold text-teal-600">Keep it up!</span> One more vote
        today to maintain your streak.
      </p>

      <div className="space-y-3">
        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Milestones
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <Medal className="h-5 w-5" />
          </div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
          </div>
          <span className="text-[10px] font-bold text-slate-400">15/30</span>
        </div>
      </div>
    </section>
  );
}
