/*
  Warnings:

  - You are about to drop the column `organizationId` on the `chats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `hostgroups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_organizationId_fkey";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hostgroups_description_key" ON "hostgroups"("description");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_organization_id_key" ON "sessions"("organization_id");

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
