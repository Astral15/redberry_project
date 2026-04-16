import CourseMainInfo from "./CourseMainInfo";
import CourseStatusPanel from "./CourseStatusPanel";

export default function CourseDetailsLayout({
  isAuthenticated,
  mode,
  basePrice,
  totalPrice,
  sessionModifier,
  weeklySchedules,
  availableTimeSlots,
  availableSessionTypes,
  selectedWeeklySchedule,
  selectedTimeSlot,
  selectedSessionType,
  onSelectWeeklySchedule,
  onSelectTimeSlot,
  onSelectSessionType,
  onEnroll,
  onCompleteCourse,
  onRetakeCourse,
  isReadyToEnroll,
}) {
  return (
    <main className="mx-auto w-[81.56%] pt-[2.6%] pb-[7%]">
      <div className="flex items-center gap-[0.45vw] text-[0.92vw] text-[#6f6f6f]">
        <span>Home</span>
        <span>›</span>
        <span>Browse</span>
        <span>›</span>
        <span className="text-[#4F46E5]">Development</span>
      </div>

      <div className="mt-[1.8%] flex items-start justify-between gap-[3.2%]">
        <CourseMainInfo />

        <CourseStatusPanel
          isAuthenticated={isAuthenticated}
          mode={mode}
          basePrice={basePrice}
          totalPrice={totalPrice}
          sessionModifier={sessionModifier}
          weeklySchedules={weeklySchedules}
          availableTimeSlots={availableTimeSlots}
          availableSessionTypes={availableSessionTypes}
          selectedWeeklySchedule={selectedWeeklySchedule}
          selectedTimeSlot={selectedTimeSlot}
          selectedSessionType={selectedSessionType}
          onSelectWeeklySchedule={onSelectWeeklySchedule}
          onSelectTimeSlot={onSelectTimeSlot}
          onSelectSessionType={onSelectSessionType}
          onEnroll={onEnroll}
          onCompleteCourse={onCompleteCourse}
          onRetakeCourse={onRetakeCourse}
          isReadyToEnroll={isReadyToEnroll}
        />
      </div>
    </main>
  );
}