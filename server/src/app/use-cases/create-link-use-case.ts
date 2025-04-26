import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkAlreadyExistsError } from "../errors/link-already-exists-error";

const createLinkInput = z.object({
  link: z.string(),
  shortLink: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLinkUseCase(
  input: CreateLinkInput
): Promise<Either<LinkAlreadyExistsError, { id: string }>> {
  const { link, shortLink } = createLinkInput.parse(input);

  // Verifica se link encurtado já existe
  const [linkAlreadyExists] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.shorLink, shortLink))
    .limit(1);

  if (linkAlreadyExists) {
    return makeLeft(new LinkAlreadyExistsError());
  }

  const [newLink] = await db
    .insert(schemas.links)
    .values({ link, shorLink: shortLink })
    .returning({ id: schemas.links.id });

  return makeRight({ id: newLink.id });
}
