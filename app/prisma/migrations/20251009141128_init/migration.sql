-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "chatId" INTEGER NOT NULL,
    "isBot" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "stageId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "districtId" INTEGER NOT NULL,
    "photoToken" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_name_key" ON "Stage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
