import Image from "next/image";
import { Calendar, Check, Flame, MapPin } from "lucide-react";
import type { DashboardUserProfile } from "../types";

type UserProfileHeroProps = {
  user: DashboardUserProfile;
};

export function UserProfileHero({ user }: UserProfileHeroProps) {
  return (
    <section className="glass-card relative mb-8 flex flex-col items-center gap-8 overflow-hidden rounded-[40px] p-8 md:flex-row md:p-10">
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-50 opacity-60 blur-3xl" />

      <div className="relative">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={120}
          height={120}
          className="h-[120px] w-[120px] rounded-full border-4 border-white bg-teal-50 shadow-xl"
          unoptimized
        />
        <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-teal-600 text-white">
          <Check className="h-4 w-4" />
        </div>
      </div>

      <div className="relative z-10 flex-1 text-center md:text-left">
        <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            {user.location}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500 md:justify-start">
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <b className="text-slate-900">{user.streakDays}-Day Streak</b>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-teal-600" />
            {user.joinedLabel}
          </span>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-4 border-t border-slate-200 pt-6 md:w-auto md:gap-8 md:border-t-0 md:border-l md:pt-0 md:pl-10">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">{user.totalVotes}</p>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Total Votes
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-teal-600">{user.approvalRate}%</p>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Approval
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">{user.lastVoteLabel}</p>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Last Vote
          </p>
        </div>
      </div>
    </section>
  );
}
