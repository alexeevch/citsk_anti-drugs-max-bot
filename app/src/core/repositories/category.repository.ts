import type { Category } from "@prisma/client";
import prisma from "~/core/database/prisma.client.js";
import { cacheGetOrSet } from "~/shared/utils/cache.util.js";

export const categoryRepository = {
  async findAll(): Promise<Category[]> {
    return cacheGetOrSet(
      "categories:all",
      async () => await prisma.category.findMany(),
      86400 //24h
    );
  },
};
