"use server";

import { cookies } from "next/headers";

export async function setSessionToken(token: string) {
  const oldSession = cookies().get("session");

  const newSession = oldSession
    ? {
        ...JSON.parse(oldSession.value),
        token,
      }
    : { token };

  cookies().set("session", JSON.stringify(newSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30, // 30 minutes
    path: "/",
  });

  return {
    status: "success",
  };
}

export async function getSessionToken() {
  const session = cookies().get("session");
  if (!session) return null;
  return JSON.parse(session.value)?.token || null;
}
