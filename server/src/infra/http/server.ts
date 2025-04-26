import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

const server = fastify();

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
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Health check
server.get("/health", async (request, reply) => {
  return { status: "ok" };
});

server
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server is running...");
  });
