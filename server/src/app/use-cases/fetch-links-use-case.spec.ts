import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { beforeEach, describe, expect, it } from "vitest";
import { fetchLinksUseCase } from "./fetch-links-use-case";

describe("Fetch links", () => {
  beforeEach(async () => {
    await db.delete(schemas.links);
  });

  it("should be able to fecth links", async () => {
    await makeLink();
    await makeLink();
    await makeLink();
    await makeLink();
    await makeLink();

    const sut = await fetchLinksUseCase({ page: 1, pageSize: 5 });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toHaveProperty("links");
    expect(unwrapEither(sut)).toHaveProperty("total");
    expect(unwrapEither(sut).links.length).toBe(5);
    expect(unwrapEither(sut).total).toBe(5);
  });

  it("should be able to fecth paginated links", async () => {
    await makeLink();
    await makeLink();
    await makeLink();
    await makeLink();
    await makeLink();

    const sut = await fetchLinksUseCase({ page: 1, pageSize: 3 });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toHaveProperty("links");
    expect(unwrapEither(sut)).toHaveProperty("total");
    expect(unwrapEither(sut).links.length).toBe(3);
    expect(unwrapEither(sut).total).toBe(5);
  });
});
