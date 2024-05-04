/*
  Warnings:

  - You are about to drop the column `organization_id` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_organization_id_fkey";

-- DropIndex
DROP INDEX "sessions_organization_id_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "organization_id";
