-- CreateTable
CREATE TABLE "user_database" (
    "userid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_database_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "chats" (
    "chatid" SERIAL NOT NULL,
    "memberid" INTEGER[],

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chatid")
);

-- CreateTable
CREATE TABLE "message" (
    "messageid" SERIAL NOT NULL,
    "chatid" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senderid" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("messageid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_database_username_key" ON "user_database"("username");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "chats"("chatid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "user_database"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
