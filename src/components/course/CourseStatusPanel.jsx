function InfoList() {
  return (
    <div className="mt-[4.2%] space-y-[4.1%] text-[1vw] text-[#555555]">
      <div className="flex items-center gap-[0.55vw]">
        <img src="/calendar_days.png" alt="" className="w-[0.92vw]" />
        <span>Monday-Wednesday</span>
      </div>

      <div className="flex items-center gap-[0.55vw]">
        <img src="/tabler_clock-hour.png" alt="" className="w-[0.92vw]" />
        <span>Evening 6:00 PM - 8:00 PM</span>
      </div>

      <div className="flex items-center gap-[0.55vw]">
        <img src="/computer_icon.png" alt="" className="w-[0.92vw]" />
        <span>Online</span>
      </div>

      <div className="flex items-center gap-[0.55vw]">
        <img src="/location.png" alt="" className="w-[0.92vw]" />
        <span>Tbilisi, Chavchavadze St.30</span>
      </div>
    </div>
  );
}

function ProgressBlock({ progress, buttonText, mode = "enrolled", onAction }) {
  return (
    <div className="mt-[7.5%]">
      <p className="text-[1.04vw] text-[#555555]">{progress}% Complete</p>

      <div className="mt-[2.8%] h-[0.95vw] w-full rounded-full bg-[#d9d5fb]">
        <div
          className="h-full rounded-full bg-[#4F46E5]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onAction}
        className="mt-[5.2%] flex h-[2.4vw] w-full items-center justify-center gap-[0.32vw] rounded-[0.42vw] border border-[#4F46E5] bg-[#4F46E5] px-[0.62vw] text-[0.9vw] font-medium whitespace-nowrap text-white hover:bg-[#4338ca]"
      >
        <span>{buttonText}</span>
        {mode === "enrolled" && (
          <img src="/complete_icon.png" alt="" className="w-[0.9vw]" />
        )}
        {mode === "completed" && (
          <img src="/refresh_icon.png" alt="" className="w-[0.9vw]" />
        )}
      </button>
    </div>
  );
}

function RatingBox() {
  return (
    <div className="mt-[5.2%] rounded-[0.65vw] bg-white px-[5%] py-[4.5%]">
      <button
        type="button"
        className="ml-auto flex text-[0.95vw] text-[#b4b4b4]"
      >
        ×
      </button>

      <p className="mt-[0.5%] text-center text-[0.88vw] text-[#555555]">
        Rate your experience
      </p>

      <div className="mt-[4.6%] flex items-center justify-center gap-[0.55vw]">
        <img src="/full_Star.png" alt="" className="w-[1.85vw]" />
        <img src="/full_Star.png" alt="" className="w-[1.85vw]" />
        <img src="/full_Star.png" alt="" className="w-[1.85vw]" />
        <img src="/empty_Star.png" alt="" className="w-[1.85vw]" />
        <img src="/empty_Star.png" alt="" className="w-[1.85vw]" />
      </div>
    </div>
  );
}

function NoticeBox({ title, text, buttonText }) {
  return (
    <div className="mt-[4.6%] flex items-center justify-between rounded-[0.65vw] border border-[#ececec] bg-white px-[4.2%] py-[3.6%]">
      <div className="max-w-[68%]">
        <p className="flex items-center gap-[0.35vw] text-[0.9vw] font-medium text-[#292929]">
          <img
            src="/Enrollment_Conflict_Icons.png"
            alt=""
            className="w-[1.08vw]"
          />
          {title}
        </p>
        <p className="mt-[1.2%] text-[0.68vw] leading-[1.35] text-[#9a9a9a]">
          {text}
        </p>
      </div>

      <button
        type="button"
        className="flex h-[2.4vw] min-w-[6.1vw] items-center justify-center rounded-[0.42vw] border border-[#B7B3F4] bg-white px-[0.62vw] text-[0.84vw] font-medium whitespace-nowrap text-[#4F46E5]"
      >
        {buttonText}
      </button>
    </div>
  );
}

function ScheduleHeader({ numberSrc, title, open = false, active = false }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[0.45vw]">
        <img src={numberSrc} alt="" className="w-[1.15vw]" />
        <h3
          className={`text-[1.42vw] font-semibold ${
            active ? "text-[#20208a]" : "text-[#888888]"
          }`}
        >
          {title}
        </h3>
      </div>
      <img
        src={open ? "/Icon_Title_below.png" : "/Icon_Title_up.png"}
        alt=""
        className="w-[0.9vw]"
      />
    </div>
  );
}

function WeeklyScheduleButtons({
  weeklySchedules,
  selectedWeeklySchedule,
  onSelectWeeklySchedule,
}) {
  return (
    <div className="mt-[3.2%] grid grid-cols-4 gap-[2.2%]">
      {weeklySchedules.map((schedule) => {
        const selected = selectedWeeklySchedule === schedule;

        return (
          <button
            key={schedule}
            type="button"
            onClick={() => onSelectWeeklySchedule(schedule)}
            className={`h-[2.95vw] rounded-[0.5vw] border text-[0.84vw] font-medium transition-colors ${
              selected
                ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                : "border-[#dcdcdc] bg-white text-[#2a2a2a] hover:border-[#B7B3F4] hover:text-[#4F46E5]"
            }`}
          >
            {schedule}
          </button>
        );
      })}
    </div>
  );
}

function TimeSlotButtons({
  availableTimeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  enabled,
}) {
  if (!enabled) return null;

  return (
    <div className="mt-[3.2%] space-y-[0.7vw]">
      {availableTimeSlots.map((slot) => {
        const selected = selectedTimeSlot?.id === slot.id;

        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelectTimeSlot(slot)}
            className={`flex w-full items-center justify-between rounded-[0.5vw] border px-[4%] py-[3.5%] text-left transition-colors ${
              selected
                ? "border-[#4F46E5] bg-[#EEF0FF]"
                : "border-[#dcdcdc] bg-white hover:border-[#B7B3F4]"
            }`}
          >
            <span className="text-[1vw] font-medium text-[#292929]">
              {slot.label}
            </span>
            <span className="text-[0.82vw] text-[#777777]">{slot.time}</span>
          </button>
        );
      })}
    </div>
  );
}

function SessionTypeCard({
  item,
  selected,
  onClick,
}) {
  const disabled = item.seats === 0;
  const fewSeats = item.seats > 0 && item.seats < 5;

  return (
    <button
      type="button"
      onClick={() => !disabled && onClick(item)}
      className={`w-full rounded-[0.65vw] border bg-white px-[4.4%] py-[4.2%] text-left transition-colors ${
        disabled
          ? "cursor-not-allowed border-[#e5e5e5] opacity-60"
          : selected
          ? "border-[#4F46E5] bg-[#EEF0FF]"
          : "border-[#dcdcdc] hover:border-[#B7B3F4]"
      }`}
    >
      <div className="flex items-start justify-between gap-[3%]">
        <div className="flex items-center gap-[0.55vw]">
          <img src={item.icon} alt="" className="w-[1.35vw]" />
          <div>
            <p className="text-[1vw] font-medium text-[#292929]">{item.label}</p>
            <p className="mt-[0.2vw] text-[0.8vw] text-[#777777]">
              {item.modifier === 0 ? "Included" : `+$${item.modifier}`}
            </p>
          </div>
        </div>

        <div className="text-right">
          {disabled ? (
            <p className="text-[0.8vw] font-medium text-[#C25151]">
              Fully Booked
            </p>
          ) : (
            <p className="text-[0.8vw] text-[#777777]">{item.seats} seats</p>
          )}
        </div>
      </div>

      {item.location && (
        <div className="mt-[3.2%] flex items-center gap-[0.45vw] text-[0.82vw] text-[#6b6b6b]">
          <img src="/location.png" alt="" className="w-[0.85vw]" />
          <span>{item.location}</span>
        </div>
      )}

      {fewSeats && (
        <p className="mt-[2.8%] text-[0.8vw] font-medium text-[#D08A00]">
          Only {item.seats} seats left!
        </p>
      )}
    </button>
  );
}

function SessionTypeList({
  availableSessionTypes,
  selectedSessionType,
  onSelectSessionType,
  enabled,
}) {
  if (!enabled) return null;

  return (
    <div className="mt-[3.2%] space-y-[0.75vw]">
      {availableSessionTypes.map((item) => (
        <SessionTypeCard
          key={item.id}
          item={item}
          selected={selectedSessionType?.id === item.id}
          onClick={onSelectSessionType}
        />
      ))}
    </div>
  );
}

function PriceSummary({
  basePrice,
  sessionModifier,
  totalPrice,
  onEnroll,
  isReadyToEnroll,
}) {
  return (
    <div className="mt-[5.5%] rounded-[0.65vw] bg-white px-[5%] py-[5%]">
      <div className="flex items-center justify-between">
        <p className="pt-[0.15vw] text-[0.98vw] text-[#888888]">Total Price</p>
        <p className="text-[1.92vw] font-semibold leading-[1] text-[#2a2a2a]">
          ${totalPrice}
        </p>
      </div>

      <div className="mt-[5.6%] space-y-[3.1%] text-[0.86vw] text-[#8a8a8a]">
        <div className="flex justify-between">
          <span>Base Price</span>
          <span className="text-[#292929]">${basePrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Session Type</span>
          <span className="text-[#292929]">
            {sessionModifier === 0 ? "Included" : `+ $${sessionModifier}`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onEnroll}
        disabled={!isReadyToEnroll}
        className={`mt-[6.5%] flex h-[2.95vw] w-full items-center justify-center rounded-[0.5vw] text-[1vw] font-medium ${
          isReadyToEnroll
            ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
            : "bg-[#d9d5fb] text-[#a9a2f8]"
        }`}
      >
        Enroll Now
      </button>
    </div>
  );
}

function ScheduleSelector({
  guest = false,
  incompleteProfile = false,
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
  isReadyToEnroll,
}) {
  return (
    <div>
      <div>
        <ScheduleHeader
          numberSrc="/number1.png"
          title="Weekly Schedule"
          open
          active
        />
        <WeeklyScheduleButtons
          weeklySchedules={weeklySchedules}
          selectedWeeklySchedule={selectedWeeklySchedule}
          onSelectWeeklySchedule={onSelectWeeklySchedule}
        />
      </div>

      <div className="mt-[5%]">
        <ScheduleHeader
          numberSrc="/number2.png"
          title="Time Slot"
          open={!!selectedWeeklySchedule}
          active={!!selectedWeeklySchedule}
        />
        <TimeSlotButtons
          availableTimeSlots={availableTimeSlots}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={onSelectTimeSlot}
          enabled={!!selectedWeeklySchedule}
        />
      </div>

      <div className="mt-[5%]">
        <ScheduleHeader
          numberSrc="/number3.png"
          title="Session Type"
          open={!!selectedTimeSlot}
          active={!!selectedTimeSlot}
        />
        <SessionTypeList
          availableSessionTypes={availableSessionTypes}
          selectedSessionType={selectedSessionType}
          onSelectSessionType={onSelectSessionType}
          enabled={!!selectedTimeSlot}
        />
      </div>

      <PriceSummary
        basePrice={basePrice}
        totalPrice={totalPrice}
        sessionModifier={sessionModifier}
        onEnroll={onEnroll}
        isReadyToEnroll={isReadyToEnroll}
      />

      {guest && (
        <NoticeBox
          title="Authentication Required"
          text="You need sign in to your profile before enrolling in this course."
          buttonText="Sign In →"
        />
      )}

      {incompleteProfile && (
        <NoticeBox
          title="Complete Your Profile"
          text="You need to fill in your profile details before enrolling in this course."
          buttonText="Complete"
        />
      )}
    </div>
  );
}

export default function CourseStatusPanel({
  isAuthenticated,
  mode,
  basePrice,
  totalPrice,
  sessionModifier,
  weeklySchedules = [],
  availableTimeSlots = [],
  availableSessionTypes = [],
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
  if (mode === "enrolled") {
    return (
      <aside className="w-[30.2%] pt-[3.2%]">
        <span className="inline-flex rounded-[999vw] bg-[#e2ddff] px-[0.95vw] py-[0.4vw] text-[0.88vw] font-medium text-[#736BEA]">
          Enrolled
        </span>

        <InfoList />
        <ProgressBlock
          progress={65}
          buttonText="Complete Course"
          mode="enrolled"
          onAction={onCompleteCourse}
        />
      </aside>
    );
  }

  if (mode === "completed") {
    return (
      <aside className="w-[30.2%] pt-[3.2%]">
        <span className="inline-flex rounded-[999vw] bg-[#dff5df] px-[0.95vw] py-[0.4vw] text-[0.88vw] font-medium text-[#31b44b]">
          Completed
        </span>

        <InfoList />
        <ProgressBlock
          progress={100}
          buttonText="Retake Course"
          mode="completed"
          onAction={onRetakeCourse}
        />
        <RatingBox />
      </aside>
    );
  }

  if (mode === "not_enrolled_authorized") {
    return (
      <aside className="w-[33.9%] pt-[1.2%]">
        <ScheduleSelector
          guest={false}
          incompleteProfile
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
          isReadyToEnroll={isReadyToEnroll}
        />
      </aside>
    );
  }

  return (
    <aside className="w-[33.9%] pt-[1.2%]">
      <ScheduleSelector
        guest={!isAuthenticated}
        incompleteProfile={false}
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
        isReadyToEnroll={isReadyToEnroll}
      />
    </aside>
  );
}