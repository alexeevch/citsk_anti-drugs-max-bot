import type { Category } from "@prisma/client";
import { districtRepository } from "~/modules/district/district.repository.js";

export const DistrictService = {
  getAllDistricts: async (): Promise<Category[]> => {
    return await districtRepository.findAll();
  },
};
