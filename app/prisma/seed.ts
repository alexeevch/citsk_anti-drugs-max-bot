import { PrismaClient } from "@prisma/client";
import { seedDistricts } from "./seed/01_districts.js";
import { seedCategories } from "./seed/02_categories.js";

const prisma = new PrismaClient();

async function main() {
  await seedDistricts();
  await seedCategories();
}

main()
  .catch((err) => {
    console.error("Database seeding error: ", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
