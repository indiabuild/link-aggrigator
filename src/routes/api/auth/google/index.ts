import { generateState, generateCodeVerifier, Google } from "arctic";
import { setCookie } from "vinxi/http";

const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT
);

const GOOGLE_OAUTH_STATE = "google-auth-state";
const GOOGLE_OAUTH_CODE_VERIFIER = "google-auth-code-verifier";

export async function GET() {
  const state = generateState();
  const codeVerify = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerify, {
    scopes: ["profile", "email"],
  });

  setStateAndCodeCookies(GOOGLE_OAUTH_STATE, state);
  setStateAndCodeCookies(GOOGLE_OAUTH_CODE_VERIFIER, codeVerify);

  return Response.redirect(url.toString());
}

function setStateAndCodeCookies(name: string, value: string) {
  setCookie(name, value, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });
}

export { google, GOOGLE_OAUTH_CODE_VERIFIER, GOOGLE_OAUTH_STATE };
