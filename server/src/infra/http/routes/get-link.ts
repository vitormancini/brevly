import { getLinkUseCase } from "@/app/use-cases/get-link-use-case";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/redirect/:shortLink",
    {
      schema: {
        summary: "Get a link",
        tags: ["links"],
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            link: z.string(),
            shortLink: z.string(),
            accessCount: z.number(),
            createdAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const shortLink = request.params.shortLink;

      const result = await getLinkUseCase({ shortLink });

      if (isRight(result)) {
        const { link } = unwrapEither(result);
        return reply.status(200).send(link);
      }

      return reply.status(404).send({ message: "Link not found" });
    }
  );
};
