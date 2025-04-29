import db from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "../errors/link-not-found-error";

const deleteLinkUseCaseInput = z.object({
  id: z.string(),
});

type DeleteLinkUseCaseInput = z.input<typeof deleteLinkUseCaseInput>;

export async function deleteLinkUseCase(
  input: DeleteLinkUseCaseInput
): Promise<Either<LinkNotFoundError, null>> {
  const { id } = deleteLinkUseCaseInput.parse(input);

  const [link] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.id, id))
    .limit(1);

  if (!link) {
    return makeLeft(new LinkNotFoundError());
  }

  await db.delete(schemas.links).where(eq(schemas.links.id, id));

  return makeRight(null);
}
