import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = ["Нарконадписи", "Правонарушение", "Интернет-площадки"];

export async function seedCategories() {
  console.log("Seeding Categories...");
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Seeding Categories complete.");
}
