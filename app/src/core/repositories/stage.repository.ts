import type { Stage } from "@prisma/client";
import { cacheGetOrSet } from "~/shared/utils/cache.util.js";
import prisma from "~/core/database/prisma.client.js";

export const stageRepository = {
  async findAll(): Promise<Stage[]> {
    return cacheGetOrSet<Stage[]>(
      "stages:all",
      async () =>
        await prisma.stage.findMany({
          orderBy: { sort: "asc" },
        }),
      86400 // 24h
    );
  },

  async findByName(name: string): Promise<Stage | null> {
    const stages = await this.findAll();
    return stages.find((s) => s.name === name) ?? null;
  },

  async findById(id: number): Promise<Stage | null> {
    const stages = await this.findAll();
    return stages.find((s) => s.id === id) ?? null;
  },
};
