import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AdminUserPage } from "@/app/components/admin-user/AdminUserPage";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminUserRoute() {
  const usersCount = await prisma.user.count();
  if (usersCount === 0) {
    return <AdminUserPage />;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await verifySessionToken(token);
  if (!session) {
    redirect("/login");
  }

  return <AdminUserPage />;
}
