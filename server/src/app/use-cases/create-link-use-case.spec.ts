import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { LinkAlreadyExistsError } from "../errors/link-already-exists-error";
import { createLinkUseCase } from "./create-link-use-case";

describe("Create link", () => {
  beforeEach(async () => {
    await db.delete(schemas.links);
  });

  it("should be able to create a link", async () => {
    const sut = await createLinkUseCase({
      link: "https://example.com",
      shortLink: "https://example",
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toHaveProperty("id");
  });

  it("should not be able to create a link with same short link", async () => {
    await createLinkUseCase({
      link: "https://example.com",
      shortLink: "https://example",
    });

    const sut = await createLinkUseCase({
      link: "https://example.com",
      shortLink: "https://example",
    });

    expect(isRight(sut)).toBe(false);
    expect(unwrapEither(sut)).toBeInstanceOf(LinkAlreadyExistsError);
  });
});
