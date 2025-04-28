import { createLinkUseCase } from "@/app/use-cases/create-link-use-case";
import { unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a new link",
        tags: ["links"],
        body: z.object({
          link: z.string().url(),
          shortLink: z.string().url(),
        }),
        required: ["link", "shorLink"],
        response: {
          201: z.object({
            id: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { link, shortLink } = request.body;
      const result = await createLinkUseCase({ link, shortLink });

      if (result.right) {
        const { id } = unwrapEither(result);
        return reply.status(201).send({ id });
      }

      const { message } = unwrapEither(result);
      return reply.status(409).send({ message });
    }
  );
};
