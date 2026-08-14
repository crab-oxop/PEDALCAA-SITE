-- CreateTable
CREATE TABLE "JobRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "issueDetails" TEXT,
    "photoUrl" TEXT,
    "preferredTime" TEXT NOT NULL,
    "scheduledFor" DATETIME,
    "serviceTier" TEXT NOT NULL,
    "dispatchFeeCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending_payment',
    "stripeSessionId" TEXT,
    "stripePaymentStatus" TEXT,
    "notes" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "JobRequest_stripeSessionId_key" ON "JobRequest"("stripeSessionId");
