import { deleteLinkUseCase } from "@/app/use-cases/delete-link-use-case";
import { isRight } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link",
        tags: ["links"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.object({}),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const id = request.params.id;

      const result = await deleteLinkUseCase({ id });

      if (isRight(result)) {
        reply.status(204).send({});
      }

      return reply.status(404).send({ message: "Link not found" });
    }
  );
};
