import { apiClient } from "./client";

export const profileService = {
  updateProfile: (payload) => apiClient.put("/profile", payload),
};