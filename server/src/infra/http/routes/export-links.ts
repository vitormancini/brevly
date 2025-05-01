import { exportLinksUseCase } from "@/app/use-cases/export-links";
import { unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/export",
    {
      schema: {
        summary: "Export links",
        tags: ["links"],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinksUseCase();
      const { reportUrl } = unwrapEither(result);

      return reply.status(200).send({ reportUrl });
    }
  );
};
