/*
  Warnings:

  - You are about to drop the column `cnpj` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `qr` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule_triggers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shedules` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[description]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[arquive_name]` on the table `reports` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_user_id_fkey";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "cnpj";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "organization_id",
DROP COLUMN "qr";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "plans";

-- DropTable
DROP TABLE "schedule_triggers";

-- DropTable
DROP TABLE "shedules";

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "organization_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_shedule_id" ON "schedules"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_description_key" ON "organizations"("description");

-- CreateIndex
CREATE UNIQUE INDEX "reports_arquive_name_key" ON "reports"("arquive_name");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
