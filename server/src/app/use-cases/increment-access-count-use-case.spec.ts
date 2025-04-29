import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { sql } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "../errors/link-not-found-error";
import { incrementAccessCountUseCase } from "./increment-access-count-use-case";

describe("Increment access count", () => {
  beforeEach(async () => {
    await db.execute(sql`TRUNCATE TABLE links CASCADE;`);
    //await db.delete(schemas.links);
  });

  it("should be able to increment access count of a link", async () => {
    const [link] = await db
      .insert(schemas.links)
      .values({ link: "https://google.com", shortLink: "http://localhost/ggl" })
      .returning({ id: schemas.links.id });

    const result = await incrementAccessCountUseCase({ id: link.id });

    if (result.right) {
      const { link } = unwrapEither(result);
      expect(link.id).toEqual(link.id);
      expect(link.accessCount).toEqual(1);
    }

    expect(isRight(result)).toEqual(true);
  });

  it("should not be able to increment access count of a non-existent link", async () => {
    const result = await incrementAccessCountUseCase({ id: "non-existent-id" });

    expect(isRight(result)).toEqual(false);
    expect(unwrapEither(result)).toBeInstanceOf(LinkNotFoundError);
  });
});
