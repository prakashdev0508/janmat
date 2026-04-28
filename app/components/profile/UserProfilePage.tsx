"use client";

import { useState } from "react";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { fallbackUserProfileData } from "./profileData";
import {
  AccountSecurityPanel,
  CivicPreferencesPanel,
  DataManagementPanel,
  PersonalInformationPanel,
  ProfileOverviewHero,
  ProfileStatsGrid,
  SaveChangesBar,
} from "./ProfileSections";

export function UserProfilePage() {
  const [profileData, setProfileData] = useState(fallbackUserProfileData);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <AppNav activeLink="nav-explore" exploreHref="/regions" insightsHref="/insights" />

      <main className="flex-1 px-6 pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <ProfileOverviewHero header={profileData.header} />
          <ProfileStatsGrid stats={profileData.stats} />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <PersonalInformationPanel
                info={profileData.personalInfo}
                onChange={(next) => {
                  setProfileData((current) => ({ ...current, personalInfo: next }));
                }}
              />
              <CivicPreferencesPanel
                preferences={profileData.civicPreferences}
                onUpdate={(next) => {
                  setProfileData((current) => ({ ...current, civicPreferences: next }));
                }}
              />
            </div>

            <div className="space-y-8">
              <AccountSecurityPanel
                security={profileData.security}
                onUpdate={(next) => {
                  setProfileData((current) => ({ ...current, security: next }));
                }}
              />
              <DataManagementPanel data={profileData.dataManagement} />
            </div>
          </div>

          <SaveChangesBar />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
