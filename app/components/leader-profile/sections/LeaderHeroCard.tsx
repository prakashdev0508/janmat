import Image from "next/image";
import Link from "next/link";
import { AtSign, Calendar, Globe, MapPin, ShieldCheck, Vote } from "lucide-react";
import type { LeaderProfileMeta } from "../types";

type LeaderHeroCardProps = {
  meta: LeaderProfileMeta;
};

export function LeaderHeroCard({ meta }: LeaderHeroCardProps) {
  return (
    <section className="hero-gradient px-6 pt-16 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card flex flex-col items-center gap-10 rounded-[40px] border-teal-100/50 p-8 md:flex-row md:p-12 md:gap-16">
          <div className="relative">
            <div className="h-[200px] w-[200px] overflow-hidden rounded-[48px] border-4 border-white shadow-2xl">
              <Image
                src={meta.avatarUrl}
                alt={meta.name}
                width={200}
                height={200}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -right-4 -bottom-4 flex items-center gap-2 rounded-2xl border-4 border-white bg-teal-600 px-4 py-2 text-white shadow-lg">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold tracking-wider uppercase">Verified</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="rounded-full border border-orange-200 bg-orange-100 px-4 py-1.5 text-sm font-bold tracking-tight text-orange-700 uppercase">
                {meta.party} | Bharat
              </span>
              <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-sm font-bold tracking-tight text-teal-700 uppercase">
                {meta.role}
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl">{meta.name}</h1>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex items-center justify-center gap-3 text-slate-600 md:justify-start">
                <Globe className="h-5 w-5 text-teal-600" />
                <span className="font-medium">{meta.website}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 md:justify-start">
                <AtSign className="h-5 w-5 text-teal-600" />
                <span className="font-medium">{meta.twitter}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 md:justify-start">
                <MapPin className="h-5 w-5 text-teal-600" />
                <span className="font-medium">{meta.location}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 md:justify-start">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span className="font-medium">Active since {meta.activeSince}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <Link
              href={`/vote?leader=${meta.id}`}
              className="flex items-center gap-3 rounded-2xl bg-teal-600 px-8 py-5 text-lg font-bold text-white shadow-xl shadow-teal-600/20 transition-all hover:bg-teal-700"
            >
              <Vote className="h-6 w-6" />
              Cast Vote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
