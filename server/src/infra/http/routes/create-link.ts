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
          shorLink: z.string().url(),
        }),
        required: ["link", "shorLink"],
        response: {
          201: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
};
