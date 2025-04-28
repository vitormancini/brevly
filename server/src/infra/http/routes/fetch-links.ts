import { fetchLinksUseCase } from "@/app/use-cases/fetch-links-use-case";
import { unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const fetchLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Fetch links",
        tags: ["links"],
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(["createAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                link: z.string(),
                shortLink: z.string(),
                accessCount: z.number(),
                createAt: z.date(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery, sortBy, sortDirection, page, pageSize } =
        request.query;

      const result = await fetchLinksUseCase({
        searchQuery,
        sortBy,
        sortDirection,
        page,
        pageSize,
      });

      const { links, total } = unwrapEither(result);

      return reply.status(200).send({ links, total });
    }
  );
};
