-- CreateEnum
CREATE TYPE "SupportConversationStatus" AS ENUM ('BOT', 'AWAITING_FOR_ADMIN', 'ACTIVE_WITH_ADMIN', 'CLOSE');

-- CreateEnum
CREATE TYPE "SupportSenderType" AS ENUM ('USER', 'SERVICE_PROVIDER', 'ADMIN', 'BOT');

-- CreateTable
CREATE TABLE "support_conversations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "initiatorId" TEXT NOT NULL,
    "initiatorType" "SupportSenderType" NOT NULL,
    "adminId" TEXT,
    "status" "SupportConversationStatus" NOT NULL DEFAULT 'BOT',
    "closedAt" TIMESTAMP(3),
    "adminJoinedAt" TIMESTAMP(3),

    CONSTRAINT "support_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT,
    "senderType" "SupportSenderType" NOT NULL,
    "content" TEXT NOT NULL,
    "botResponseId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "support_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "support_conversations" ADD CONSTRAINT "support_conversations_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_conversations" ADD CONSTRAINT "support_conversations_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_messages" ADD CONSTRAINT "support_messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "support_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_messages" ADD CONSTRAINT "support_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
