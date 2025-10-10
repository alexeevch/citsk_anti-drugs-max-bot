import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stages = [
  {
    name: "category_choose",
    description: "Выбор категории",
    sort: 1,
  },
  {
    name: "district_choose",
    description: "Выбор района",
    sort: 2,
  },
  {
    name: "complaint_description",
    description: "Описание жалобы",
    sort: 3,
  },
  {
    name: "photo_send",
    description: "Загрузка фото",
    sort: 4,
  },
  {
    name: "location_send",
    description: "Прикрепление локации",
    sort: 5,
  },
];

export async function seedStages() {
  console.log("Seeding Stages...");
  for (const stage of stages) {
    await prisma.stage.upsert({
      where: { ...stage },
      update: {},
      create: { ...stage },
    });
  }
  console.log("Seeding Stages complete.");
}
