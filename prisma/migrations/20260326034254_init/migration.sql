-- CreateTable
CREATE TABLE "SoldListing" (
    "id" SERIAL NOT NULL,
    "mlsId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "zip" TEXT,
    "beds" DOUBLE PRECISION,
    "baths" DOUBLE PRECISION,
    "sqft" DOUBLE PRECISION,
    "lotSize" DOUBLE PRECISION,
    "yearBuilt" INTEGER,
    "garageSpaces" INTEGER,
    "closePrice" DOUBLE PRECISION,
    "listPrice" DOUBLE PRECISION,
    "closeDate" TEXT,
    "daysOnMarket" INTEGER,
    "subdivision" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "publicRemarks" TEXT,
    "conditionSignal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoldListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "recordsProcessed" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'running',
    "error" TEXT,
    "rangeStart" TEXT,
    "rangeEnd" TEXT,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SoldListing_mlsId_key" ON "SoldListing"("mlsId");
