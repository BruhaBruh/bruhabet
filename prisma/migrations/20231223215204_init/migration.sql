-- CreateEnum
CREATE TYPE "Color" AS ENUM ('WHITE', 'RED', 'GREEN', 'GOLD');

-- CreateTable
CREATE TABLE "Server" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "betId" INTEGER NOT NULL,
    "result" "Color" NOT NULL,
    "serverId" INTEGER NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bet_betId_serverId_idx" ON "Bet"("betId" ASC, "serverId");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
