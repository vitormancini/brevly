import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "../errors/link-not-found-error";

const getLinkUseCaseInput = z.object({ shortLink: z.string() });

type GetLinkUseCaseInput = z.infer<typeof getLinkUseCaseInput>;

type GetLinkUseCaseOutput = {
  link: {
    id: string;
    link: string;
    shortLink: string;
    accessCount: number;
    createdAt: Date;
  };
};

export async function getLinkUseCase(
  input: GetLinkUseCaseInput
): Promise<Either<LinkNotFoundError, GetLinkUseCaseOutput>> {
  const { shortLink } = getLinkUseCaseInput.parse(input);

  const [link] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.shortLink, shortLink))
    .limit(1);

  if (!link) {
    return makeLeft(new LinkNotFoundError());
  }

  return makeRight({ link });
}
