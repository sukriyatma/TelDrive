-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files_urls" (
    "id" UUID NOT NULL,
    "id_files" UUID NOT NULL,
    "part" INTEGER,
    "url" VARCHAR(255),

    CONSTRAINT "files_urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "files_id_idx" ON "files"("id");

-- CreateIndex
CREATE INDEX "files_urls_id_id_files_part_idx" ON "files_urls"("id", "id_files", "part");

-- AddForeignKey
ALTER TABLE "files_urls" ADD CONSTRAINT "files_urls_id_files_fkey" FOREIGN KEY ("id_files") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
