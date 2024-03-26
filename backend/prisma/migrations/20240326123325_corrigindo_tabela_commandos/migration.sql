/*
  Warnings:

  - A unique constraint covering the columns `[command]` on the table `commands` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "commands_command_key" ON "commands"("command");
