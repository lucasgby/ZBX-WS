-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "chat_id" VARCHAR(255) NOT NULL,
    "chat_name" VARCHAR NOT NULL,
    "server" CHAR(4) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "passwordResetToken" TEXT DEFAULT '',
    "passwordResetExpires" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "session" VARCHAR NOT NULL,
    "qr" VARCHAR NOT NULL,
    "is_connect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "arquive_name" VARCHAR,
    "arquive_locate" VARCHAR,
    "chat_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commands" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL DEFAULT 'Lista todos os comandos.',
    "command" VARCHAR NOT NULL DEFAULT '/help',

    CONSTRAINT "commands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chats_chat_id_key" ON "chats"("chat_id");

-- CreateIndex
CREATE INDEX "idx_chat_id" ON "chats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE INDEX "idx_user_id" ON "users"("id");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_user_login" ON "users"("login");

-- CreateIndex
CREATE INDEX "idx_session_id" ON "sessions"("id");

-- CreateIndex
CREATE INDEX "idx_report_id" ON "reports"("id");

-- CreateIndex
CREATE INDEX "idx_command_id" ON "commands"("id");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
