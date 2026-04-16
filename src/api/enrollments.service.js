import { apiClient } from "./client";

export const enrollmentsService = {
  getEnrollments: () => apiClient.get("/enrollments"),
  createEnrollment: (payload) => apiClient.post("/enrollments", payload),
  completeEnrollment: (id) => apiClient.patch(`/enrollments/${id}/complete`, {}),
  deleteEnrollment: (id) => apiClient.delete(`/enrollments/${id}`),
};