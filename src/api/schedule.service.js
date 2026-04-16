import { apiClient } from "./client";

export const scheduleService = {
  getWeeklySchedules: (courseId) =>
    apiClient.get(`/courses/${courseId}/weekly-schedules`),

  getTimeSlots: (courseId, weeklyScheduleId) =>
    apiClient.get(
      `/courses/${courseId}/time-slots?weekly_schedule_id=${weeklyScheduleId}`
    ),

  getSessionTypes: (courseId, weeklyScheduleId, timeSlotId) =>
    apiClient.get(
      `/courses/${courseId}/session-types?weekly_schedule_id=${weeklyScheduleId}&time_slot_id=${timeSlotId}`
    ),
};