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

function ProgressBlock({ progress, buttonText, mode = "enrolled" }) {
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

function ScheduleSelector({ guest = false, incompleteProfile = false }) {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.45vw]">
            <img src="/number1.png" alt="" className="w-[1.15vw]" />
            <h3 className="text-[1.42vw] font-semibold text-[#20208a]">
              Weekly Schedule
            </h3>
          </div>
          <img src="/Icon_Title_below.png" alt="" className="w-[0.9vw]" />
        </div>

        <div className="mt-[3.2%] grid grid-cols-4 gap-[2.2%]">
          <button
            type="button"
            className="h-[2.95vw] rounded-[0.5vw] border border-[#dcdcdc] bg-white text-[0.84vw] font-medium text-[#2a2a2a]"
          >
            Mon - Wed
          </button>
          <button
            type="button"
            className="h-[2.95vw] rounded-[0.5vw] border border-[#e5e5e5] bg-white text-[0.84vw] text-[#bcbcbc]"
          >
            Tue - Thu
          </button>
          <button
            type="button"
            className="h-[2.95vw] rounded-[0.5vw] border border-[#dcdcdc] bg-white text-[0.84vw] font-medium text-[#2a2a2a]"
          >
            Wed - Fri
          </button>
          <button
            type="button"
            className="h-[2.95vw] rounded-[0.5vw] border border-[#e5e5e5] bg-white text-[0.84vw] text-[#bcbcbc]"
          >
            Weekend
          </button>
        </div>
      </div>

      <div className="mt-[5%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.45vw]">
            <img src="/number2.png" alt="" className="w-[1.15vw]" />
            <h3 className="text-[1.42vw] font-semibold text-[#888888]">
              Time Slot
            </h3>
          </div>
          <img src="/Icon_Title_up.png" alt="" className="w-[0.9vw]" />
        </div>
      </div>

      <div className="mt-[5%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.45vw]">
            <img src="/number3.png" alt="" className="w-[1.15vw]" />
            <h3 className="text-[1.42vw] font-semibold text-[#888888]">
              Session Type
            </h3>
          </div>
          <img src="/Icon_Title_up.png" alt="" className="w-[0.9vw]" />
        </div>
      </div>

      <div className="mt-[5.5%] rounded-[0.65vw] bg-white px-[5%] py-[5%]">
        <div className="flex items-center justify-between">
          <p className="pt-[0.15vw] text-[0.98vw] text-[#888888]">
            Total Price
          </p>
          <p className="text-[1.92vw] font-semibold leading-[1] text-[#2a2a2a]">
            $349
          </p>
        </div>

        <div className="mt-[5.6%] space-y-[3.1%] text-[0.86vw] text-[#8a8a8a]">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span className="text-[#292929]">+ $0</span>
          </div>
          <div className="flex justify-between">
            <span>Session Type</span>
            <span className="text-[#292929]">+ $0</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-[6.5%] flex h-[2.95vw] w-full items-center justify-center rounded-[0.5vw] bg-[#d9d5fb] text-[1vw] font-medium text-[#a9a2f8]"
        >
          Enroll Now
        </button>
      </div>

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
          buttonText="Complete →"
        />
      )}
    </div>
  );
}

export default function CourseStatusPanel({ isAuthenticated, mode }) {
  if (mode === "enrolled") {
    return (
      <aside className="w-[30.2%] pt-[5.2%]">
        <span className="inline-flex rounded-[999vw] bg-[#e2ddff] px-[0.95vw] py-[0.4vw] text-[0.88vw] font-medium text-[#736BEA]">
          Enrolled
        </span>

        <InfoList />
        <ProgressBlock
          progress={65}
          buttonText="Complete Course"
          mode="enrolled"
        />
      </aside>
    );
  }

  if (mode === "completed") {
    return (
      <aside className="w-[30.2%] pt-[5.2%]">
        <span className="inline-flex rounded-[999vw] bg-[#dff5df] px-[0.95vw] py-[0.4vw] text-[0.88vw] font-medium text-[#31b44b]">
          Completed
        </span>

        <InfoList />
        <ProgressBlock
          progress={100}
          buttonText="Retake Course"
          mode="completed"
        />
        <RatingBox />
      </aside>
    );
  }

  if (mode === "not_enrolled_authorized") {
    return (
      <aside className="w-[33.9%] pt-[3.2%]">
        <ScheduleSelector guest={false} incompleteProfile={true} />
      </aside>
    );
  }

  return (
    <aside className="w-[33.9%] pt-[3.2%]">
      <ScheduleSelector
        guest={!isAuthenticated}
        incompleteProfile={false}
      />
    </aside>
  );
}