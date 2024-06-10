/*
  Warnings:

  - Added the required column `created_at` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `files_urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `files_urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "created_at" BIGINT NOT NULL,
ADD COLUMN     "extension" VARCHAR(255),
ADD COLUMN     "updated_at" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "files_urls" ADD COLUMN     "created_at" BIGINT NOT NULL,
ADD COLUMN     "updated_at" BIGINT NOT NULL;
