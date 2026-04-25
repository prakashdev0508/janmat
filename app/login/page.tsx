import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginPage } from "../components/auth/LoginPage";
import { createClient } from "@/utils/supabase/server";

type LoginRouteProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginRoute({ searchParams }: LoginRouteProps) {
  const { redirect: redirectParam } = await searchParams;
  const safeRedirect = redirectParam?.startsWith("/") ? redirectParam : "/regions";
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(safeRedirect);
  }

  return <LoginPage />;
}
