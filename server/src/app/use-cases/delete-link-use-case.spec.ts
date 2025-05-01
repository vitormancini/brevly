import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { isRight } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";
import { beforeEach, describe, expect, it } from "vitest";
import { deleteLinkUseCase } from "./delete-link-use-case";

describe("Delete link", () => {
  beforeEach(async () => {
    await db.delete(schemas.links);
  });

  it("should be able to delete a link", async () => {
    const link = await makeLink();

    const sut = await deleteLinkUseCase({ id: link.id });

    expect(isRight(sut)).toBe(true);
  });
});
