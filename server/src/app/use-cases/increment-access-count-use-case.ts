import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "../errors/link-not-found-error";

const incrementAccessCountUseCaseInput = z.object({
  id: z.string(),
});

type IncrementAccessCountUseCaseInput = z.infer<
  typeof incrementAccessCountUseCaseInput
>;

type IncrementAccessCountUseCaseOutput = {
  link: {
    id: string;
    link: string;
    shortLink: string;
    accessCount: number;
    createdAt: Date;
  };
};

export async function incrementAccessCountUseCase(
  input: IncrementAccessCountUseCaseInput
): Promise<Either<LinkNotFoundError, IncrementAccessCountUseCaseOutput>> {
  const { id } = incrementAccessCountUseCaseInput.parse(input);

  const [link] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.id, id))
    .limit(1);

  if (!link) {
    return makeLeft(new LinkNotFoundError());
  }

  link.accessCount += 1;

  await db
    .update(schemas.links)
    .set({ accessCount: link.accessCount })
    .where(eq(schemas.links.id, id));

  return makeRight({ link });
}
