import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "../errors/link-not-found-error";
import { incrementAccessCountUseCase } from "./increment-access-count-use-case";

describe("Increment access count of link", () => {
  beforeEach(async () => {
    await db.delete(schemas.links);
  });

  it("should be able to increment access count", async () => {
    const link = await makeLink();

    const sut = await incrementAccessCountUseCase({ id: link.id });

    expect(isRight(sut)).toBe(true);

    if (isRight(sut)) {
      const result = unwrapEither(sut);
      expect(result.link.accessCount).toBe(1);
    }
  });

  it("should not be able to increment access count of non-existent link", async () => {
    const sut = await incrementAccessCountUseCase({ id: "non-existent-id" });

    expect(isRight(sut)).toBe(false);
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError);
  });
});
