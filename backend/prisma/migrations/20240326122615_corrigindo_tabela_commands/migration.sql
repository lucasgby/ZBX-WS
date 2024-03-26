/*
  Warnings:

  - You are about to alter the column `command` on the `commands` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "commands" ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "command" DROP DEFAULT,
ALTER COLUMN "command" SET DATA TYPE VARCHAR(20);
