import { PrismaClient } from "@prisma/client";
import { seedDistricts } from "./seed/01_districts";
import { seedCategories } from "./seed/02_categories";
import { seedStages } from "./seed/03_stages";

const prisma = new PrismaClient();

async function main() {
  await seedDistricts();
  await seedCategories();
  await seedStages();
}

main()
  .catch((err) => {
    console.error("Database seeding error: ", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
