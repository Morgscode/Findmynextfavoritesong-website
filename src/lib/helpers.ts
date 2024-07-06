import { getSessionToken } from "@/app/actions";

export async function accessToken(token: string | null) {
  if (token) return token;
  {
    const token = document.querySelector<HTMLInputElement>(
      'input[name="_spotify_api_token"]',
    )?.value;
    if (token) return token;
  }
  {
    const token = await getSessionToken();
    if (token) return token;
  }
  return null;
}
