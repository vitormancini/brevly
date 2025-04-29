import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";
import { asc, count, desc, ilike } from "drizzle-orm";
import { z } from "zod";

const fetchLinksInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(["createAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
});

type FetchLinksInput = z.infer<typeof fetchLinksInput>;

type FetchLinksOutput = {
  links: {
    id: string;
    link: string;
    shortLink: string;
    accessCount: number;
    createAt: Date;
  }[];
  total: number;
};

export async function fetchLinksUseCase(
  input: FetchLinksInput
): Promise<Either<never, FetchLinksOutput>> {
  const { searchQuery, sortBy, sortDirection, page, pageSize } =
    fetchLinksInput.parse(input);

  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schemas.links.id,
        link: schemas.links.link,
        shortLink: schemas.links.shortLink,
        accessCount: schemas.links.accessCount,
        createAt: schemas.links.createdAt,
      })
      .from(schemas.links)
      .where(
        searchQuery
          ? ilike(schemas.links.shortLink, `%${searchQuery}%`)
          : undefined
      )
      .orderBy((fields) => {
        if (sortBy && sortDirection === "asc") {
          return asc(fields[sortBy]);
        }

        if (sortBy && sortDirection === "desc") {
          return desc(fields[sortBy]);
        }

        return desc(fields.createAt);
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),

    db
      .select({ total: count(schemas.links.id) })
      .from(schemas.links)
      .where(
        searchQuery ? ilike(schemas.links.link, `%${searchQuery}%`) : undefined
      ),
  ]);

  return makeRight({ links, total });
}
