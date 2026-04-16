import { apiClient } from "./client";

export const reviewsService = {
  submitReview: (courseId, payload) =>
    apiClient.post(`/courses/${courseId}/reviews`, payload),
};