import db from "@/infra/db";
import { isRight, unwrapEither } from "@/shared/either";
import { sql } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import { LinkAlreadyExistsError } from "../errors/link-already-exists-error";
import { createLinkUseCase } from "./create-link-use-case";

describe("Crate link", () => {
  beforeAll(async () => {
    await db.execute(sql`TRUNCATE TABLE links CASCADE;`);
  });

  it("should be able to create a new link", async () => {
    const result = await createLinkUseCase({
      link: "https://google.com",
      shortLink: "ggl",
    });

    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result)).toEqual({ id: expect.any(String) });
  });

  it("should not be able to create a new link with same short link", async () => {
    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "ggl",
    });

    const result = await createLinkUseCase({
      link: "https://google.com",
      shortLink: "ggl",
    });

    expect(isRight(result)).toBe(false);
    expect(unwrapEither(result)).toBeInstanceOf(LinkAlreadyExistsError);
  });
});
