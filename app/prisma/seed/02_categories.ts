import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Надпись на постройке",
    description:
      "Сообщение о незаконной или агитационной надписи на стене, здании или другом объекте.",
  },
  {
    name: "Размещение клада",
    description: "Фиксация факта закладки подозрительных предметов, свёртков или пакетов.",
  },
  {
    name: "Другое",
    description: "Другая категория, не попадающая под основные направления обращений.",
  },
];

export async function seedCategories() {
  console.log("Seeding Categories...");
  for (const c of categories) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: { description: c.description },
      create: { name: c.name, description: c.description },
    });
  }
  console.log("Seeding Categories complete.");
}
