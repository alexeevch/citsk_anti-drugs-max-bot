import prisma from "~/core/database/prisma.client.js";
import type { CreateComplaintPayload } from "~/shared/types/entity.types.js";

export const complaintRepository = {
  create: async (data: CreateComplaintPayload) => {
    const { photos, ...complaintData } = data;

    const photoData =
      photos && photos.length > 0
        ? {
            photos: {
              createMany: {
                data: photos.map(({ token, url }) => ({ token, url })),
              },
            },
          }
        : {};

    return prisma.complaint.create({
      data: {
        ...complaintData,
        ...photoData,
      },
      include: {
        user: true,
        category: true,
        district: true,
        photos: true,
      },
    });
  },
};
