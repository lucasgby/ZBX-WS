-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "organizationId" INTEGER;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
