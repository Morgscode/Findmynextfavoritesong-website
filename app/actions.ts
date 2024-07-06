"use server";

import { cookies } from "next/headers";

export async function setSessionToken(token: string) {
  const oldSession = cookies().get("session");

  const newSession = oldSession
    ? {
        ...JSON.parse(oldSession.value),
        token: new URLSearchParams(token).get("#access_token"),
      }
    : { token: new URLSearchParams(token).get("#access_token") };

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
  if (!session) return undefined;
  return JSON.parse(session.value)?.token || undefined;
}
