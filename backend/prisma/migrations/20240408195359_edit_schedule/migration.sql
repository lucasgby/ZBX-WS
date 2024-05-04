/*
  Warnings:

  - You are about to drop the `shedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "shedules" DROP CONSTRAINT "shedules_user_id_fkey";

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

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
