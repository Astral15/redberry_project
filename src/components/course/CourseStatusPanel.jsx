function InfoList() {
    return (
      <div className="mt-[4%] space-y-[4.2%] text-[1.08vw] text-[#555555]">
        <div className="flex items-center gap-[0.6vw]">
          <span>🗓</span>
          <span>Monday-Wednesday</span>
        </div>
  
        <div className="flex items-center gap-[0.6vw]">
          <span>🕒</span>
          <span>Evening 6:00 PM - 8:00 PM</span>
        </div>
  
        <div className="flex items-center gap-[0.6vw]">
          <span>🖥</span>
          <span>Online</span>
        </div>
  
        <div className="flex items-center gap-[0.6vw]">
          <span>📍</span>
          <span>Tbilisi, Chavchavadze St.30</span>
        </div>
      </div>
    );
  }
  
  function ProgressBlock({ progress, buttonText }) {
    return (
      <div className="mt-[8%]">
        <p className="text-[1.15vw] text-[#555555]">{progress}% Complete</p>
  
        <div className="mt-[3%] h-[1.05vw] w-full rounded-full bg-[#d9d5fb]">
          <div
            className="h-full rounded-full bg-[#4F46E5]"
            style={{ width: `${progress}%` }}
          />
        </div>
  
        <button
          type="button"
          className="mt-[6%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
        >
          {buttonText}
        </button>
      </div>
    );
  }
  
  function RatingBox() {
    return (
      <div className="mt-[6%] rounded-[0.7vw] bg-white px-[5.5%] py-[5%]">
        <button
          type="button"
          className="ml-auto flex text-[1vw] text-[#b4b4b4]"
        >
          ×
        </button>
  
        <p className="mt-[1%] text-center text-[0.92vw] text-[#555555]">
          Rate your experience
        </p>
  
        <div className="mt-[5%] flex items-center justify-center gap-[0.7vw]">
          <img src="/star.png" alt="" className="w-[2vw]" />
          <img src="/star.png" alt="" className="w-[2vw]" />
          <img src="/star.png" alt="" className="w-[2vw]" />
          <span className="text-[2vw] text-[#d9d9d9]">☆</span>
          <span className="text-[2vw] text-[#d9d9d9]">☆</span>
        </div>
      </div>
    );
  }
  
  function ScheduleSelector({ guest = false, incompleteProfile = false }) {
    return (
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[1.65vw] font-semibold text-[#20208a]">
              ① Weekly Schedule
            </h3>
            <span className="text-[1vw] text-[#666666]">˅</span>
          </div>
  
          <div className="mt-[3.5%] grid grid-cols-4 gap-[2.3%]">
            <button type="button" className="h-[3.1vw] rounded-[0.55vw] border border-[#dcdcdc] bg-white text-[0.9vw] font-medium text-[#2a2a2a]">
              Mon - Wed
            </button>
            <button type="button" className="h-[3.1vw] rounded-[0.55vw] border border-[#e5e5e5] bg-white text-[0.9vw] text-[#bcbcbc]">
              Tue - Thu
            </button>
            <button type="button" className="h-[3.1vw] rounded-[0.55vw] border border-[#dcdcdc] bg-white text-[0.9vw] font-medium text-[#2a2a2a]">
              Wed - Fri
            </button>
            <button type="button" className="h-[3.1vw] rounded-[0.55vw] border border-[#e5e5e5] bg-white text-[0.9vw] text-[#bcbcbc]">
              Weekend
            </button>
          </div>
        </div>
  
        <div className="mt-[5.5%]">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.65vw] font-semibold text-[#888888]">
              ② Time Slot
            </h3>
            <span className="text-[1vw] text-[#888888]">^</span>
          </div>
        </div>
  
        <div className="mt-[5.5%]">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.65vw] font-semibold text-[#888888]">
              ③ Session Type
            </h3>
            <span className="text-[1vw] text-[#888888]">^</span>
          </div>
        </div>
  
        <div className="mt-[6%] rounded-[0.7vw] bg-white px-[5.5%] py-[5.5%]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[1vw] text-[#888888]">Total Price</p>
            </div>
            <p className="text-[2.1vw] font-semibold text-[#2a2a2a]">$349</p>
          </div>
  
          <div className="mt-[6%] space-y-[3.5%] text-[0.92vw] text-[#8a8a8a]">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>+ $0</span>
            </div>
            <div className="flex justify-between">
              <span>Session Type</span>
              <span>+ $0</span>
            </div>
          </div>
  
          <button
            type="button"
            className="mt-[7%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#d9d5fb] text-[1.08vw] font-medium text-[#a9a2f8]"
          >
            Enroll Now
          </button>
        </div>
  
        {guest && (
          <div className="mt-[5%] flex items-center justify-between rounded-[0.7vw] border border-[#ececec] bg-white px-[4.5%] py-[4%]">
            <div className="max-w-[65%]">
              <p className="flex items-center gap-[0.35vw] text-[0.95vw] font-medium text-[#555555]">
                <span className="text-[#f0a300]">⚠</span> Authentication Required
              </p>
              <p className="mt-[1.5%] text-[0.72vw] leading-[1.35] text-[#9a9a9a]">
                You need sign in to your profile before enrolling in this course.
              </p>
            </div>
  
            <button
              type="button"
              className="flex h-[2.3vw] w-[5vw] items-center justify-center rounded-[0.42vw] border border-[#8e83ff] bg-white text-[0.9vw] font-medium text-[#4F46E5]"
            >
              Sign In →
            </button>
          </div>
        )}
  
        {incompleteProfile && (
          <div className="mt-[5%] flex items-center justify-between rounded-[0.7vw] border border-[#ececec] bg-white px-[4.5%] py-[4%]">
            <div className="max-w-[65%]">
              <p className="flex items-center gap-[0.35vw] text-[0.95vw] font-medium text-[#555555]">
                <span className="text-[#f0a300]">⚠</span> Complete Your Profile
              </p>
              <p className="mt-[1.5%] text-[0.72vw] leading-[1.35] text-[#9a9a9a]">
                You need to fill in your profile details before enrolling in this course.
              </p>
            </div>
  
            <button
              type="button"
              className="flex h-[2.3vw] w-[5vw] items-center justify-center rounded-[0.42vw] border border-[#8e83ff] bg-white text-[0.9vw] font-medium text-[#4F46E5]"
            >
              Complete →
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default function CourseStatusPanel({ isAuthenticated, mode }) {
    if (mode === "enrolled") {
      return (
        <aside className="w-[29%]">
          <span className="inline-flex rounded-[999vw] bg-[#e2ddff] px-[1vw] py-[0.45vw] text-[0.95vw] font-medium text-[#6a5eff]">
            Enrolled
          </span>
  
          <InfoList />
          <ProgressBlock progress={65} buttonText="Complete Course ✓" />
        </aside>
      );
    }
  
    if (mode === "completed") {
      return (
        <aside className="w-[29%]">
          <span className="inline-flex rounded-[999vw] bg-[#dff5df] px-[1vw] py-[0.45vw] text-[0.95vw] font-medium text-[#31b44b]">
            Completed
          </span>
  
          <InfoList />
          <ProgressBlock progress={100} buttonText="Retake Course ⟳" />
          <RatingBox />
        </aside>
      );
    }
  
    if (mode === "not_enrolled_authorized") {
      return (
        <aside className="w-[29%]">
          <ScheduleSelector guest={false} incompleteProfile={true} />
        </aside>
      );
    }
  
    return (
      <aside className="w-[29%]">
        <ScheduleSelector guest={!isAuthenticated} incompleteProfile={false} />
      </aside>
    );
  }