-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "suburb" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "availabilityStart" DROP NOT NULL,
ALTER COLUMN "availabilityEnd" DROP NOT NULL,
ALTER COLUMN "availabilitySlot" DROP NOT NULL;
