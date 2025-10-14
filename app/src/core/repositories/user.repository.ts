import prisma from "~/core/database/prisma.client.js";
import type { CreateUserPayload } from "~/shared/types/entity.types.js";

export const userRepository = {
  async sync(user: CreateUserPayload) {
    return prisma.user.upsert({
      where: { userId: user.userId },
      update: { ...user },
      create: { ...user },
    });
  },
  async findByBotId(botId: number) {
    return prisma.user.findUnique({
      where: { userId: botId },
    });
  },
};
