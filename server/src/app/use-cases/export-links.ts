import db, { pg } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export async function exportLinksUseCase(): Promise<
  Either<never, { reportUrl: string }>
> {
  const { sql, params } = db
    .select({
      id: schemas.links.id,
      link: schemas.links.link,
      shortLink: schemas.links.shortLink,
      accessCount: schemas.links.accessCount,
      createdAt: schemas.links.createdAt,
    })
    .from(schemas.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(2);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "link", header: "URL" },
      { key: "shortLink", header: "URL ENCURTADA" },
      { key: "access_count", header: "CONTAGEM DE ACESSOS" },
      { key: "created_at", header: "DATA DE CRIAÇÃO" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = await pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "links",
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
