import prisma from "~/core/database/prisma.client.js";
import type { CreateUserPayload } from "~/shared/types/entity.types.js";
import type { User } from "@maxhub/max-bot-api/types";

export const userRepository = {
  async sync(user: CreateUserPayload): Promise<void> {
    await prisma.user.upsert({
      where: { userId: user.userId },
      update: { ...user },
      create: { ...user },
    });
  },
  async findByBotId(botId: string): Promise<User> {
    return prisma.user.findUnique({
      where: { userId: botId },
    });
  },
};
