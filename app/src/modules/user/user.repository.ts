import type { CreateUserPayload } from "~/modules/user/user.types.js";
import prisma from "~/core/database/prisma.client.js";

export const userRepository = {
  async sync(user: CreateUserPayload): Promise<void> {
    await prisma.user.upsert({
      where: { userId: user.userId },
      update: { ...user },
      create: { ...user },
    });
  },
};
