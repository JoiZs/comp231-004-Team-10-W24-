-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "Client" (
    "userId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "Media" (
    "mediaId" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "profileProfileId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("mediaId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" TEXT NOT NULL,
    "availabilityStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availabilityEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availabilitySlot" INTEGER NOT NULL DEFAULT 0,
    "profileType" TEXT NOT NULL,
    "petType" TEXT[],
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "givenById" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reserveId" TEXT NOT NULL,
    "sitterId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "petCount" INTEGER NOT NULL,
    "petType" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "ratePerDay" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reserveId")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "roomId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Message" (
    "chatId" TEXT NOT NULL,
    "chatRoomRoomId" TEXT,
    "type" TEXT NOT NULL,
    "path" TEXT,
    "messageText" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "_UserFavs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userUserId_key" ON "Address"("userUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_profileProfileId_key" ON "Media"("profileProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userUserId_key" ON "Profile"("userUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_reservationId_key" ON "ChatRoom"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavs_AB_unique" ON "_UserFavs"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavs_B_index" ON "_UserFavs"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_profileProfileId_fkey" FOREIGN KEY ("profileProfileId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_givenById_fkey" FOREIGN KEY ("givenById") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_sitterId_fkey" FOREIGN KEY ("sitterId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("reserveId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomRoomId_fkey" FOREIGN KEY ("chatRoomRoomId") REFERENCES "ChatRoom"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavs" ADD CONSTRAINT "_UserFavs_A_fkey" FOREIGN KEY ("A") REFERENCES "Client"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavs" ADD CONSTRAINT "_UserFavs_B_fkey" FOREIGN KEY ("B") REFERENCES "Client"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
