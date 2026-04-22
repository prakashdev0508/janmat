import { Suspense } from "react";
import { LoginBrandPanel } from "./sections/LoginBrandPanel";
import { LoginFormCard } from "./sections/LoginFormCard";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] lg:flex-row">
      <LoginBrandPanel />
      <Suspense fallback={<div className="flex flex-1 items-center justify-center" />}>
        <LoginFormCard />
      </Suspense>
    </div>
  );
}
