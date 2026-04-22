import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getSessionCookieName,
  hashPassword,
  verifySessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";

function getCookieValue(cookieHeader: string | null, cookieName: string): string | null {
  if (!cookieHeader) return null;
  const chunks = cookieHeader.split(";").map((part) => part.trim());
  for (const chunk of chunks) {
    if (chunk.startsWith(`${cookieName}=`)) {
      return decodeURIComponent(chunk.slice(cookieName.length + 1));
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const usersCount = await prisma.user.count();
    let sessionEmail = "bootstrap";
    if (usersCount > 0) {
      const token = getCookieValue(
        request.headers.get("cookie"),
        getSessionCookieName(),
      );
      if (!token) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
      }

      const session = await verifySessionToken(token);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
      }
      sessionEmail = session.email;
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
      createdBy: sessionEmail,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
