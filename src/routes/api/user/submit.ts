import { getIDFromJWT } from "~/utils";
import db from "../../../../db/db";
import { links } from "../../../../db/schema";
import { uuidv7 } from "uuidv7";
import { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
  const id = await getIDFromJWT();
  if (!id) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const data: {
      url: string;
      title: string;
    } = await request.json();

    if (!data.url || !data.title) {
      return new Response("Bad Request", {
        status: 400,
      });
    }

    await db.insert(links).values({
      id: uuidv7(),
      url: data.url,
      title: data.title,
      host: new URL(data.url).host,
      userID: id,
    });

    return new Response("Success", {
      status: 200,
    });
  } catch (e) {
    console.log(e);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
