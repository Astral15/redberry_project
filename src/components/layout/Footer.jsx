export default function Footer() {
    return (
      <footer className="mt-[6%] border-t border-black/10 bg-[#f4f4f4]">
        <div className="mx-auto w-[81.56%] py-[3.6%]">
          <div className="grid grid-cols-[1.4fr_0.5fr_0.5fr_0.7fr] gap-[6%]">
            <div>
              <div className="flex items-center gap-[2.5%]">
                <img
                  src="/Logo.png"
                  alt="Bootcamp logo"
                  className="w-[9%] min-w-[2.2rem]"
                />
                <span className="text-[1.7vw] font-medium text-[#20208a]">
                  Bootcamp
                </span>
              </div>
  
              <p className="mt-[4%] max-w-[48%] text-[0.95vw] leading-[1.5] text-[#2b2b91]">
                Your learning journey starts here! Browse courses to get started.
              </p>
  
              <div className="mt-[4%] flex items-center gap-[2.4%]">
                <img src="/Facebook.png" alt="Facebook" className="w-[1%] min-w-[0.75rem]" />
                <img src="/Twitter.png" alt="Twitter" className="w-[1%] min-w-[0.75rem]" />
                <img src="/Instagram.png" alt="Instagram" className="w-[1%] min-w-[0.75rem]" />
                <img src="/LinkedIn.png" alt="LinkedIn" className="w-[1%] min-w-[0.75rem]" />
                <img src="/YouTube.png" alt="YouTube" className="w-[1%] min-w-[0.75rem]" />
              </div>
            </div>
  
            <div>
              <h4 className="text-[1.3vw] font-semibold text-[#20208a]">Explore</h4>
              <div className="mt-[11%] space-y-[12%] text-[1.05vw] text-[#6a6a6a]">
                <p>Enrolled Courses</p>
                <p>Browse Courses</p>
              </div>
            </div>
  
            <div>
              <h4 className="text-[1.3vw] font-semibold text-[#20208a]">Account</h4>
              <div className="mt-[11%] space-y-[12%] text-[1.05vw] text-[#6a6a6a]">
                <p>My Profile</p>
              </div>
            </div>
  
            <div>
              <h4 className="text-[1.3vw] font-semibold text-[#20208a]">Contact</h4>
              <div className="mt-[8%] space-y-[8%] text-[1.05vw] text-[#6a6a6a]">
                <p>contact@company.com</p>
                <p>(+995) 555 111 222</p>
                <p>Aghmashenebeli St.115</p>
              </div>
            </div>
          </div>
  
          <div className="mt-[4.6%] flex items-center justify-between text-[1vw] text-[#777777]">
            <p>Copyright © 2026 Redberry International</p>
            <p>
              All Rights Reserved |{" "}
              <span className="text-[#4f46e5]">Terms and Conditions</span> |{" "}
              <span className="text-[#4f46e5]">Privacy Policy</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }