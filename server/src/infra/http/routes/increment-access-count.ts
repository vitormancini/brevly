import { incrementAccessCountUseCase } from "@/app/use-cases/increment-access-count-use-case";
import { unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const incrementAccessCountRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.put(
    "/links/:id",
    {
      schema: {
        summary: "Increment access count of link",
        tags: ["links"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              id: z.string(),
              link: z.string(),
              shortLink: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const id = request.params.id;

      const result = await incrementAccessCountUseCase({ id });

      if (result.right) {
        const { link } = unwrapEither(result);
        return reply.status(200).send({ link });
      }

      const { message } = unwrapEither(result);
      return reply.status(404).send({ message });
    }
  );
};
