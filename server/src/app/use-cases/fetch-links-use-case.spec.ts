import db from "@/infra/db";
import { isRight, unwrapEither } from "@/shared/either";
import { sql } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";
import { createLinkUseCase } from "./create-link-use-case";
import { fetchLinksUseCase } from "./fetch-links-use-case";

describe("Fetch links", () => {
  beforeEach(async () => {
    await db.execute(sql`TRUNCATE TABLE links CASCADE;`);
  });

  it("should be able to fecth all links", async () => {
    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl1",
    });

    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl2",
    });

    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl3",
    });

    const result = await fetchLinksUseCase({ page: 1, pageSize: 10 });

    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).links.length).toEqual(3);
  });

  it("should be able to fecth all links with search query", async () => {
    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl4",
    });

    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl5",
    });

    await createLinkUseCase({
      link: "https://google.com",
      shortLink: "http://localhost/ggl6",
    });

    const result = await fetchLinksUseCase({
      searchQuery: "ggl5",
      page: 1,
      pageSize: 10,
    });

    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).links.length).toEqual(1);
  });
});
