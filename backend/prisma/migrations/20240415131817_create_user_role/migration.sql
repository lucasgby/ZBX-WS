/*
  Warnings:

  - You are about to drop the column `cnpj` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[arquive_name]` on the table `reports` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "cnpj";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reports_arquive_name_key" ON "reports"("arquive_name");
