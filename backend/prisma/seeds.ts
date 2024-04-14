import {
  PrismaClient,
  Client,
  Address,
  Profile,
  Review,
  Reservation,
  ChatRoom,
  Message,
} from "@prisma/client";
import { encryptPw } from "../src/utils/pwverify";
import { randomUUID } from "crypto";
import "dotenv/config";

const prisma = new PrismaClient();

(async () => {
  const egClients: Client[] = [
    {
      email: "owner1@gmail.com",
      firstname: "Owner",
      lastname: "One",
      password: await encryptPw("Owner1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      email: "owner2@gmail.com",
      firstname: "Owner",
      lastname: "Two",
      password: await encryptPw("Owner1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      email: "owner3@gmail.com",
      firstname: "Owner",
      lastname: "Three",
      password: await encryptPw("Owner1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      email: "sitter1@gmail.com",
      firstname: "Sitter",
      lastname: "One",
      password: await encryptPw("Sitter1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      email: "sitter2@gmail.com",
      firstname: "Sitter",
      lastname: "Two",
      password: await encryptPw("Sitter1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      email: "sitter3@gmail.com",
      firstname: "Sitter",
      lastname: "Three",
      password: await encryptPw("Sitter1234!"),
      userId: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  ];

  const egAddresses: Address[] = [
    {
      street: "Borough Drive",
      city: "Toronto",
      suburb: "Scarobrough",
      postalCode: "M1P2K2",
      province: "Ontario",
      latitude: 43.775784,
      longitude: -79.2619995,
      addressId: randomUUID(),
      userUserId: egClients[0].userId,
    },
    {
      street: "Main Street",
      city: "Toronto",
      suburb: "Toronto",
      postalCode: "M4C4X6",
      province: "Ontario",
      latitude: 43.6890489,
      longitude: -79.3016043,
      addressId: randomUUID(),
      userUserId: egClients[1].userId,
    },
    {
      street: "Missisauga Grand",
      city: "Mississauga",
      suburb: "Britannia East Business Park",
      postalCode: "L4Z3E8",
      province: "Ontario",
      latitude: 43.6263043,
      longitude: -79.6765075,
      addressId: randomUUID(),
      userUserId: egClients[2].userId,
    },
    {
      street: "Station Street",
      city: "Markham",
      suburb: "Markham Village",
      postalCode: "L3P1Y5",
      province: "Ontario",
      latitude: 43.8826569,
      longitude: -79.2624676,
      addressId: randomUUID(),
      userUserId: egClients[3].userId,
    },
    {
      street: "Dalecrest Drive",
      city: "Toronto",
      suburb: "East York",
      postalCode: "M4B1V2",
      province: "Ontario",
      latitude: 43.708689,
      longitude: -79.3087975,
      addressId: randomUUID(),
      userUserId: egClients[4].userId,
    },
    {
      street: "Daleberry Place",
      city: "Toronto",
      suburb: "North York",
      postalCode: "M3B2A7",
      province: "Ontario",
      latitude: 43.7476504,
      longitude: -79.3767746,
      addressId: randomUUID(),
      userUserId: egClients[5].userId,
    },
  ];

  const egProfile: Profile[] = [
    {
      petType: ["cat"],
      profileType: "Owner",
      profileId: randomUUID(),
      userUserId: egClients[0].userId,
      availabilityEnd: null,
      availabilitySlot: null,
      availabilityStart: null,
    },
    {
      petType: ["dog"],
      profileType: "Owner",
      profileId: randomUUID(),
      userUserId: egClients[1].userId,
      availabilityEnd: null,
      availabilitySlot: null,
      availabilityStart: null,
    },
    {
      petType: ["dog"],
      profileType: "Owner",
      profileId: randomUUID(),
      userUserId: egClients[2].userId,
      availabilityEnd: null,
      availabilitySlot: null,
      availabilityStart: null,
    },
    {
      petType: ["cat"],
      profileType: "Sitter",
      profileId: randomUUID(),
      userUserId: egClients[3].userId,
      availabilityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      availabilityStart: new Date(Date.now()),
      availabilitySlot: 2,
    },
    {
      petType: ["dog"],
      profileType: "Sitter",
      profileId: randomUUID(),
      userUserId: egClients[4].userId,
      availabilityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      availabilityStart: new Date(Date.now()),
      availabilitySlot: 3,
    },
    {
      petType: ["dog"],
      profileType: "Sitter",
      profileId: randomUUID(),
      userUserId: egClients[5].userId,
      availabilityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24),
      availabilityStart: new Date(Date.now()),
      availabilitySlot: 1,
    },
  ];

  const egReview: Review[] = [
    {
      reviewId: "review_12345",
      rating: 5,
      comment:
        "Sarah was absolutely fantastic! My cat, Luna, is usually quite shy with new people, but Sarah was so patient and kind that Luna warmed up to her right away. Sarah sent daily updates with pictures and videos, which really put my mind at ease while I was away. I came home to a happy and healthy cat, and a clean house! I can't recommend Sarah highly enough.",
      givenById: egClients[0].userId,
      receiverId: egClients[3].userId,
      createdAt: new Date("2024-03-19"),
      updatedAt: null,
    },
    {
      reviewId: "review_54321",
      rating: 3,
      comment:
        "David watched my dog, Max, for a weekend trip. Max seemed happy and healthy when I picked him up, but the house was a bit messier than I expected. David did follow all the instructions for feeding and walks, but there were some spilled kibble and muddy paw prints around the house. Overall, Max was well cared for, but it would be nice if David could be a bit tidier next time.",
      givenById: egClients[0].userId,
      receiverId: egClients[4].userId,
      createdAt: new Date("2024-03-15"),
      updatedAt: null,
    },
    {
      reviewId: "review_98765",
      rating: 1,
      comment:
        "Unfortunately, I wouldn't recommend Lisa for pet sitting. My dog, Charlie, came home very anxious and seemed underfed. It was clear he hadn't received the walks I requested. When I contacted Lisa about it, she was dismissive and didn't apologize. I was very disappointed with the service.",
      createdAt: new Date("2024-03-18"),
      updatedAt: null,
      givenById: egClients[1].userId,
      receiverId: egClients[4].userId,
    },
  ];

  const egRevervation: Reservation[] = [
    {
      ownerId: egClients[0].userId,
      sitterId: egClients[3].userId,
      petCount: 1,
      ratePerDay: 150,
      petType: "cat",
      status: "Pending",
      reserveId: randomUUID(),
      checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      ownerId: egClients[2].userId,
      sitterId: egClients[4].userId,
      petCount: 1,
      ratePerDay: 210,
      petType: "dog",
      status: "Accept",
      reserveId: randomUUID(),
      checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  ];

  const egChatRooms: ChatRoom[] = [
    {
      createdAt: new Date(Date.now()),
      reservationId: egRevervation[0].reserveId,
      roomId: randomUUID(),
      updatedAt: new Date(Date.now()),
    },
    {
      createdAt: new Date(Date.now()),
      reservationId: egRevervation[1].reserveId,
      roomId: randomUUID(),
      updatedAt: new Date(Date.now()),
    },
  ];

  const egChatMsgs: Message[] = [
    {
      chatId: randomUUID(),
      chatRoomRoomId: egChatRooms[0].roomId,
      type: "text",
      messageText: "Hi, dfsiosadjfiasi",
      createdAt: new Date(Date.now()),
      path: null,
      senderId: egClients[0].userId,
      receiverId: egClients[3].userId,
    },
    {
      chatId: randomUUID(),
      chatRoomRoomId: egChatRooms[1].roomId,
      type: "text",
      messageText: "Hi, jvnsvndsanvsaiu",
      createdAt: new Date(Date.now()),
      path: null,
      senderId: egClients[2].userId,
      receiverId: egClients[4].userId,
    },
  ];
  try {
    await prisma.client.createMany({ data: egClients });
    await prisma.address.createMany({ data: egAddresses });
    await prisma.profile.createMany({ data: egProfile });
    await prisma.review.createMany({ data: egReview });
    await prisma.reservation.createMany({ data: egRevervation });
    await prisma.chatRoom.createMany({ data: egChatRooms });
    await prisma.message.createMany({ data: egChatMsgs });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})().then(async () => {
  console.log("DB recoreds created.");
  await prisma.$disconnect();
});
