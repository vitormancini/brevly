import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "../errors/link-not-found-error";
import { getLinkUseCase } from "./get-link-use-case";

describe("Get link", () => {
  beforeEach(async () => {
    await db.delete(schemas.links);
  });

  it("should be able to get a link", async () => {
    const link = await makeLink();

    const sut = await getLinkUseCase({ shortLink: link.shortLink });

    expect(isRight(sut)).toBe(true);

    if (sut.right) {
      expect(unwrapEither(sut).link).toHaveProperty("id");
      expect(unwrapEither(sut).link).toHaveProperty("link");
      expect(unwrapEither(sut).link).toHaveProperty("shortLink");
    }
  });

  it("should not be able to get a link", async () => {
    const link = await makeLink();

    const sut = await getLinkUseCase({ shortLink: "https://inexistent-link" });

    expect(isRight(sut)).toBe(false);

    if (!isRight(sut)) {
      expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError);
    }
  });
});
