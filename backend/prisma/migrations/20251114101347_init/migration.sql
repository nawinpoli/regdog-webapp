-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('ACTIVITY', 'HEALTH', 'EXPENSE');

-- CreateEnum
CREATE TYPE "LostStatus" AS ENUM ('NORMAL', 'LOST', 'FOUND', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "breed" TEXT,
    "birthDate" TIMESTAMP(3),
    "microchipNumber" TEXT,
    "pedigreeFileUrl" TEXT,
    "chronicDiseases" TEXT,
    "avatarUrl" TEXT,
    "ownerName" TEXT,
    "ownerPhone" TEXT,
    "ownerAddress" TEXT,
    "extraDescription" TEXT,
    "lostStatus" "LostStatus" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "category" "EventCategory" NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogEvent" (
    "id" SERIAL NOT NULL,
    "dogId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "eventAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DogEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalkEvent" (
    "eventId" INTEGER NOT NULL,
    "distanceKm" DOUBLE PRECISION,
    "durationMin" INTEGER,

    CONSTRAINT "WalkEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "PlayEvent" (
    "eventId" INTEGER NOT NULL,
    "durationMin" INTEGER,

    CONSTRAINT "PlayEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "TrainingEvent" (
    "eventId" INTEGER NOT NULL,
    "durationMin" INTEGER,

    CONSTRAINT "TrainingEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "SymptomEvent" (
    "eventId" INTEGER NOT NULL,
    "symptom" TEXT NOT NULL,
    "severity" INTEGER,
    "sinceWhen" TIMESTAMP(3),

    CONSTRAINT "SymptomEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "VaccineEvent" (
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "VaccineEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "MedicationEvent" (
    "eventId" INTEGER NOT NULL,
    "dosageAmount" DOUBLE PRECISION,
    "dosageUnit" TEXT,

    CONSTRAINT "MedicationEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "VetVisitEvent" (
    "eventId" INTEGER NOT NULL,
    "reason" TEXT,
    "clinicName" TEXT,
    "vetName" TEXT,
    "cost" DOUBLE PRECISION,
    "nextAppointment" TIMESTAMP(3),

    CONSTRAINT "VetVisitEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "WeightEvent" (
    "eventId" INTEGER NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeightEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "ExpenseEvent" (
    "eventId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT DEFAULT 'THB',

    CONSTRAINT "ExpenseEvent_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventType_code_key" ON "EventType"("code");

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogEvent" ADD CONSTRAINT "DogEvent_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogEvent" ADD CONSTRAINT "DogEvent_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalkEvent" ADD CONSTRAINT "WalkEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayEvent" ADD CONSTRAINT "PlayEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingEvent" ADD CONSTRAINT "TrainingEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomEvent" ADD CONSTRAINT "SymptomEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineEvent" ADD CONSTRAINT "VaccineEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationEvent" ADD CONSTRAINT "MedicationEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VetVisitEvent" ADD CONSTRAINT "VetVisitEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightEvent" ADD CONSTRAINT "WeightEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseEvent" ADD CONSTRAINT "ExpenseEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "DogEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
