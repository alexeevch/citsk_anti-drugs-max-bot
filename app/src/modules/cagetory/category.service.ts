import type { Category } from "@prisma/client";
import { categoryRepository } from "~/modules/cagetory/category.repository.js";

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    return await categoryRepository.findAll();
  },
};
