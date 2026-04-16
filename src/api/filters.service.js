import { apiClient } from "./client";

export const filtersService = {
  getCategories: () => apiClient.get("/categories"),
  getTopics: (categoryId) =>
    apiClient.get(categoryId ? `/topics?category_id=${categoryId}` : "/topics"),
  getInstructors: () => apiClient.get("/instructors"),
};