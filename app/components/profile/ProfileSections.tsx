"use client";

import Image from "next/image";
import {
  Calendar,
  Camera,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  Flame,
  KeyRound,
  Mail,
  MapPin,
  Monitor,
  ShieldCheck,
  Smartphone,
  Star,
  UserCog,
  UserRoundCheck,
  UserX,
  Vote,
} from "lucide-react";
import type {
  DigestFrequency,
  UserCivicPreferences,
  UserDataManagement,
  UserPersonalInfo,
  UserProfileHeaderData,
  UserProfileStat,
  UserSecurityData,
} from "./types";

function statToneClasses(tone: UserProfileStat["tone"]) {
  if (tone === "teal") return "bg-teal-50 text-teal-600";
  if (tone === "orange") return "bg-orange-50 text-orange-600";
  if (tone === "emerald") return "bg-emerald-50 text-emerald-600";
  return "bg-slate-100 text-slate-600";
}

function statIcon(id: UserProfileStat["id"]) {
  if (id === "votes") return <Vote className="h-6 w-6" />;
  if (id === "streak") return <Flame className="h-6 w-6" />;
  if (id === "favorites") return <Star className="h-6 w-6" />;
  return <Clock3 className="h-6 w-6" />;
}

export function ProfileOverviewHero({ header }: { header: UserProfileHeaderData }) {
  return (
    <section className="glass-card mb-8 rounded-[40px] p-8 md:p-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
        <div className="group relative">
          <Image
            src={header.avatarUrl}
            alt={`${header.fullName} avatar`}
            width={176}
            height={176}
            unoptimized
            className="h-32 w-32 rounded-full border-4 border-white bg-slate-100 object-cover shadow-xl md:h-44 md:w-44"
          />
          <button
            type="button"
            className="absolute right-2 bottom-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-teal-600 text-white shadow-lg transition-colors hover:bg-teal-700 md:right-4 md:bottom-4"
            aria-label="Change avatar"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">{header.fullName}</h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-teal-700 uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              {header.verifiedLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-medium text-slate-500 md:justify-start">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {header.cityState}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {header.memberSince}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-teal-600/20 transition-colors hover:bg-teal-700"
        >
          <UserCog className="h-4 w-4" />
          Edit Profile
        </button>
      </div>
    </section>
  );
}

export function ProfileStatsGrid({ stats }: { stats: UserProfileStat[] }) {
  return (
    <section className="mb-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.id} className="glass-card rounded-3xl p-6 text-center">
          <div
            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${statToneClasses(stat.tone)}`}
          >
            {statIcon(stat.id)}
          </div>
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}

export function PersonalInformationPanel({
  info,
  onChange,
}: {
  info: UserPersonalInfo;
  onChange: (next: UserPersonalInfo) => void;
}) {
  return (
    <section className="glass-card overflow-hidden rounded-[32px]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-8 py-6">
        <UserRoundCheck className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
      </div>
      <div className="space-y-6 p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold tracking-wider text-slate-500 uppercase">
              Full Name
            </span>
            <input
              value={info.fullName}
              onChange={(event) => {
                onChange({ ...info, fullName: event.target.value });
              }}
              className="input-focus-teal w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold tracking-wider text-slate-500 uppercase">
              Email Address
            </span>
            <div className="relative">
              <input
                value={info.email}
                onChange={(event) => {
                  onChange({ ...info, email: event.target.value });
                }}
                className="input-focus-teal w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 font-medium text-slate-700"
              />
              {info.emailVerified ? (
                <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black tracking-tight text-white uppercase">
                  Verified
                </span>
              ) : null}
            </div>
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold tracking-wider text-slate-500 uppercase">
              Phone Number
            </span>
            <input
              value={info.phone}
              onChange={(event) => {
                onChange({ ...info, phone: event.target.value });
              }}
              className="input-focus-teal w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold tracking-wider text-slate-500 uppercase">
              District / Region
            </span>
            <input
              value={info.district}
              onChange={(event) => {
                onChange({ ...info, district: event.target.value });
              }}
              className="input-focus-teal w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold tracking-wider text-slate-500 uppercase">
            Bio
          </span>
          <textarea
            value={info.bio}
            onChange={(event) => {
              onChange({ ...info, bio: event.target.value });
            }}
            rows={3}
            className="input-focus-teal w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700"
          />
        </label>
      </div>
    </section>
  );
}

function frequencyButtonClasses(active: boolean) {
  return active
    ? "bg-teal-600 text-white shadow-md"
    : "bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200";
}

export function CivicPreferencesPanel({
  preferences,
  onUpdate,
}: {
  preferences: UserCivicPreferences;
  onUpdate: (next: UserCivicPreferences) => void;
}) {
  const frequencies: DigestFrequency[] = ["weekly", "monthly", "quarterly", "never"];

  return (
    <section className="glass-card overflow-hidden rounded-[32px]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-8 py-6">
        <Mail className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-bold text-slate-900">Civic Preferences</h2>
      </div>
      <div className="space-y-8 p-8">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-slate-400 uppercase">
            Issue Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences.issueInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {preferences.toggles.map((toggle) => (
            <article key={toggle.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{toggle.label}</h4>
                  <p className="text-xs leading-relaxed text-slate-500">{toggle.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggle.enabled}
                  onClick={() => {
                    onUpdate({
                      ...preferences,
                      toggles: preferences.toggles.map((item) =>
                        item.id === toggle.id ? { ...item, enabled: !item.enabled } : item,
                      ),
                    });
                  }}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    toggle.enabled ? "bg-teal-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      toggle.enabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
            Report Frequency
          </h3>
          <p className="mb-3 text-xs text-slate-500">
            How often would you like to receive sentiment digests?
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {frequencies.map((frequency) => (
              <button
                key={frequency}
                type="button"
                className={`rounded-xl py-2 text-xs font-bold capitalize ${frequencyButtonClasses(
                  preferences.digestFrequency === frequency,
                )}`}
                onClick={() => {
                  onUpdate({ ...preferences, digestFrequency: frequency });
                }}
              >
                {frequency}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AccountSecurityPanel({
  security,
  onUpdate,
}: {
  security: UserSecurityData;
  onUpdate: (next: UserSecurityData) => void;
}) {
  return (
    <section className="glass-card overflow-hidden rounded-[32px]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-8 py-6">
        <ShieldCheck className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-bold text-slate-900">Account Security</h2>
      </div>
      <div className="space-y-6 p-8">
        <button
          type="button"
          className="group flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
        >
          <span className="inline-flex items-center gap-3 text-slate-700">
            <KeyRound className="h-5 w-5 text-slate-400 group-hover:text-teal-600" />
            <span className="font-bold">Change Password</span>
          </span>
          <span className="text-xs font-semibold text-slate-500">Manage</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-900">Two-Factor Auth</p>
            <p className="text-xs text-slate-500">Secure login with a one-time mobile code.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={security.twoFactorEnabled}
            onClick={() => {
              onUpdate({ ...security, twoFactorEnabled: !security.twoFactorEnabled });
            }}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              security.twoFactorEnabled ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                security.twoFactorEnabled ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        <hr className="border-slate-100" />

        <div>
          <h3 className="mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Active Sessions
          </h3>
          <div className="space-y-3">
            {security.sessions.map((session) => (
              <article
                key={session.id}
                className={`rounded-xl p-3 ${
                  session.isCurrent
                    ? "border border-teal-100 bg-teal-50/50"
                    : "border border-transparent bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {session.device.toLowerCase().includes("iphone") ? (
                    <Smartphone className="mt-0.5 h-4 w-4 text-slate-400" />
                  ) : (
                    <Monitor
                      className={`mt-0.5 h-4 w-4 ${
                        session.isCurrent ? "text-teal-600" : "text-slate-400"
                      }`}
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {session.device} - {session.browser}
                    </p>
                    <p
                      className={`text-[10px] font-bold tracking-wider uppercase ${
                        session.isCurrent ? "text-teal-600" : "text-slate-400"
                      }`}
                    >
                      {session.lastActive}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="pt-1 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Last Login: {security.lastLogin}
        </p>
      </div>
    </section>
  );
}

export function DataManagementPanel({ data }: { data: UserDataManagement }) {
  return (
    <section className="glass-card overflow-hidden rounded-[32px] border-orange-100 shadow-orange-900/5">
      <div className="flex items-center gap-3 border-b border-slate-100 px-8 py-6">
        <Database className="h-5 w-5 text-orange-600" />
        <h2 className="text-xl font-bold text-slate-900">Data Management</h2>
      </div>
      <div className="space-y-4 p-8">
        {data.actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50"
          >
            {action.id === "download" ? (
              <Download className="h-5 w-5 text-slate-400 group-hover:text-teal-600" />
            ) : (
              <Download className="h-5 w-5 rotate-180 text-slate-400 group-hover:text-teal-600" />
            )}
            <div>
              <p className="text-sm font-bold text-slate-700">{action.title}</p>
              <p className="text-[10px] text-slate-500">{action.description}</p>
            </div>
          </button>
        ))}

        <div className="pt-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-orange-100 py-4 font-bold text-orange-600 transition-colors hover:bg-orange-50"
          >
            <UserX className="h-4 w-4" />
            Delete Account
          </button>
          <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
            {data.deleteWarning}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SaveChangesBar() {
  return (
    <div className="sticky bottom-6 z-20 mt-8">
      <div className="glass-card mx-auto flex max-w-3xl items-center justify-between rounded-2xl px-5 py-3">
        <p className="text-sm font-medium text-slate-600">You have unsaved profile updates.</p>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
