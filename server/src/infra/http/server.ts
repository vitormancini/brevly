import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { exportLinksRoute } from "./routes/export-links";
import { fetchLinksRoute } from "./routes/fetch-links";
import { incrementAccessCountRoute } from "./routes/increment-access-count";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// configuracao de error genéricos
server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  return reply.status(500).send({ message: "Internal server error" });
});

// Cors
server.register(fastifyCors, { origin: "*" });

// Documentação Swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevly Server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Health check
server.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Rotas
server.register(createLinkRoute);
server.register(fetchLinksRoute);
server.register(incrementAccessCountRoute);
server.register(deleteLinkRoute);
server.register(exportLinksRoute);

server
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server is running...");
  });
