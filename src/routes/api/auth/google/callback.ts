import { OAuth2RequestError } from "arctic";
import { uuidv7 } from "uuidv7";
import type { APIEvent } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";
import { GOOGLE_OAUTH_CODE_VERIFIER, GOOGLE_OAUTH_STATE, google } from ".";
import db from "../../../../../db/db";
import { users } from "../../../../../db/schema";

enum CallbackError {
  UserEmailNotVerified,
  GoogleBadVerificationCode,
  InternalServerError,
}

export async function GET({ request }: APIEvent) {
  const url = new URL(request.url as string);
  const baseURL = url.origin;

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedCode = getCookie(GOOGLE_OAUTH_CODE_VERIFIER);
  const storedState = getCookie(GOOGLE_OAUTH_STATE);

  let error: CallbackError | null = null;

  if (!code || !state || !storedState || !storedCode || state !== storedState) {
    console.log("Failed: state is not matching");
    return Response.redirect(baseURL);
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCode);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      error = CallbackError.InternalServerError;
    } else {
      const user = await response.json();

      if (!user["email_verified"]) {
        error = CallbackError.UserEmailNotVerified;
      }

      await db.insert(users).values({
        id: uuidv7(),
        firstName: user["given_name"],
        lastName: user["family_name"],
        email: user["email"],
        image: user["picture"],
      });
    }
  } catch (e) {
    console.log(e);
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      error = CallbackError.GoogleBadVerificationCode;
    } else {
      error = CallbackError.InternalServerError;
    }
  }

  switch (error) {
    case null:
    case CallbackError.UserEmailNotVerified:
    // falsh error
    case CallbackError.GoogleBadVerificationCode:
    // flash message
    case CallbackError.InternalServerError:
    // flashmessage
  }

  return Response.redirect(baseURL);
}
