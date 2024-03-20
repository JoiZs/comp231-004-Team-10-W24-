import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const prisma = new PrismaClient().$extends({
//   model: {
//     address: {
//       async create(data: {
//         street: string;
//         city: string;
//         province: string;
//         postalCode: string;
//         latitude: number;
//         longitude: number;
//       }) {
//         const addr: AddressPt = {
//           street: data.street,
//           city: data.city,
//           province: data.province,
//           postalCode: data.postalCode,
//           pointIdx: { latitude: data.latitude, longitude: data.longitude },
//         };

//         const point = `POINT(${addr.pointIdx.longitude} ${addr.pointIdx.latitude})`;
//         await prisma.$queryRaw`
//           INSERT INTO "Address" (street, city, province, postalCode, location) VALUES (${addr.street}, ${addr.city}, ${addr.province}, ${addr.postalCode}, ST_GeomFromText(${point}, 4326));
//         `;

//         return addr;
//       },
//     },
//   },
// });

export default prisma;
