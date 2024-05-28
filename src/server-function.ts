import { getCookie } from "vinxi/http";
import { UserType, links, users } from "../db/schema";
import { deleteCookie } from "vinxi/http";
import { cache } from "@solidjs/router";
import db from "../db/db";
import { eq } from "drizzle-orm";

export const AUTH_USER_DATA = "user-data";
export const AUTH_TOKEN = "auth-token";

export function getUserFromCookie(): UserType | null {
  "use server";

  const user = getCookie(AUTH_USER_DATA);

  if (!user) {
    return null;
  }

  try {
    const u: UserType = JSON.parse(user);
    return u;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function logout() {
  "use server";

  deleteCookie(AUTH_TOKEN);
  deleteCookie(AUTH_USER_DATA);
}

export const userData = async (userId: string) => {
  "use server";

  try {
    const result = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (result.length === 0 || result.length >= 2) {
      throw new Error(
        `${result.length} rows found for user data for userid=${userId}`
      );
    }

    return result[0];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const viewsVotesData = cache(async (id: string) => {
  "use server";

  try {
    const result = await db
      .select({
        views: links.views,
        votes: links.votes,
      })
      .from(links)
      .where(eq(links.id, id));

    if (result.length == 0) {
      throw new Error("empty data for link id = " + id);
    }

    return {
      views: result[0].views,
      votes: result[0].votes,
    };
  } catch (e) {
    console.log(e);
  }
}, "views-votes-data");
