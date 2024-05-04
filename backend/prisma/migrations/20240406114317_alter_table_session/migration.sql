/*
  Warnings:

  - You are about to drop the column `data` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `qr` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `commands` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `achive_type` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Made the column `arquive_name` on table `reports` required. This step will fail if there are existing NULL values in that column.
  - Made the column `arquive_locate` on table `reports` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organization_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_user_id_fkey";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "data",
DROP COLUMN "is_active",
DROP COLUMN "user_id",
ADD COLUMN     "achive_type" VARCHAR NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" VARCHAR NOT NULL,
ADD COLUMN     "organization_id" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "arquive_name" SET NOT NULL,
ALTER COLUMN "arquive_locate" SET NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "qr";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organization_id" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "commands";

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shedules" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "organization_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "shedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_organization_id" ON "organizations"("id");

-- CreateIndex
CREATE INDEX "idx_shedule_id" ON "shedules"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shedules" ADD CONSTRAINT "shedules_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shedules" ADD CONSTRAINT "shedules_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shedules" ADD CONSTRAINT "shedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
