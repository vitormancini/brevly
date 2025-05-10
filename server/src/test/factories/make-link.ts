import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { InferInsertModel } from "drizzle-orm";

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schemas.links>>
) {
  const result = await db
    .insert(schemas.links)
    .values({
      link: faker.internet.url(),
      shortLink: faker.internet.url(),
    })
    .returning({
      id: schemas.links.id,
      link: schemas.links.link,
      shortLink: schemas.links.shortLink,
    });

  return result[0];
}
