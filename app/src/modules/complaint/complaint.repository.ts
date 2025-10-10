import prisma from "~/core/database/prisma.client.js";
import type { CreateComplaintPayload } from "./complaint.types.js";

export const complaintRepository = {
  create: async (data: CreateComplaintPayload) => {
    return prisma.complaint.create({
      data,
      include: {
        user: true,
        category: true,
        district: true,
      },
    });
  },
};
