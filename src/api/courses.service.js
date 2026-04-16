import { apiClient } from "./client";

function toQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(`${key}[]`, item));
      return;
    }

    searchParams.append(key, value);
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const coursesService = {
  getCourses: (params) => apiClient.get(`/courses${toQuery(params)}`),
  getFeaturedCourses: () => apiClient.get("/courses/featured"),
  getInProgressCourses: () => apiClient.get("/courses/in-progress"),
  getCourseById: (id) => apiClient.get(`/courses/${id}`),
};