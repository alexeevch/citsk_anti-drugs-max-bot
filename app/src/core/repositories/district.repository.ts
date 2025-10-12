import type { Category, District } from "@prisma/client";
import { cacheGetOrSet } from "~/shared/utils/cache.util.js";
import prisma from "~/core/database/prisma.client.js";

export const districtRepository = {
  async findAll(): Promise<District[]> {
    return cacheGetOrSet<District[]>(
      "districts:all",
      async () => await prisma.district.findMany(),
      86400 //24h
    );
  },

  async findById(id: number): Promise<Category | null> {
    const all = await this.findAll();
    return all.find((c) => c.id === id) ?? null;
  },
};
