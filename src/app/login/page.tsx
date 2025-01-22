import Image from "next/image";
import Logo from "../../../public/Ellipse 71.png";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="w-full h-screen flex gap-0 md:bg-black justify-center mobBackImg">
        <div className="leftImg flex-1 bg-cover bg-center hidden md:block"></div>
        <div className="flex-1/2 flex flex-col ">
          {/* <div className="middleUpImg flex-[1] bg-cover bg-center"></div> */}
          <div className="middleMidImg min-h-screen md:min-h-0 md:flex-[2] flex justify-center items-center bg-cover bg-center">
            <form
              className="card login-card flex justify-center items-center flex-col max-w-md w-[328px] h-[320px] md:w-[412px] md:h-[340px] space-y-8 shadow rounded-[24px] bg-gray-900 bg-opacity-60 backdrop-blur-xl"
              action="/api/auth/google-sign-in"
              method="GET"
            >
              <div className="text-center ">
                <Link href={"/"} className="flex justify-center items-center">
                  <Image width={48} height={48} src={Logo} alt="logo" />
                </Link>
                <h2 className="mt-6 text-[24px] md:text-[26px] font-bold text-[#E5E5E5]">
                  Welcome to FitnEarn
                </h2>
                <p className="mt-2 text-[16px] md:text-[18px] font-semibold text-[#D4D4D4]">
                  Log in to unlock exclusive features
                </p>
                {/* <div className="h-[2px] w-[328px] md:w-[400px] bg-[#A3A3A3] mt-6"></div> */}
              </div>
              <div className="mt-8 space-y-6">
                <button
                  className="flex h-[48x] justify-center gap-2 items-center  bg-[#404040] w-[270px] md:w-[340px] py-[7px] px-4 md:px-5 border border-[#737373] rounded-md shadow-sm text-[14px] md:text-[22px] font-medium text-[#D4D4D4]"
                  type="submit"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3880_12643)">
                        <path
                          d="M24.2663 12.2782C24.2663 11.4625 24.2001 10.6423 24.059 9.83984H12.7402V14.4608H19.222C18.953 15.9512 18.0888 17.2696 16.8233 18.1073V21.1057H20.6903C22.9611 19.0157 24.2663 15.9291 24.2663 12.2782Z"
                          fill="#2196F3"
                        />
                        <path
                          d="M12.7391 24.0013C15.9756 24.0013 18.705 22.9387 20.6936 21.1044L16.8266 18.106C15.7507 18.838 14.3618 19.2525 12.7435 19.2525C9.61291 19.2525 6.95849 17.1404 6.00607 14.3008H2.01562V17.3917C4.05274 21.4439 8.20192 24.0013 12.7391 24.0013Z"
                          fill="#34A853"
                        />
                        <path
                          d="M6.00277 14.2987C5.50011 12.8084 5.50011 11.1946 6.00277 9.70422V6.61328H2.01674C0.314734 10.0041 0.314734 13.9989 2.01674 17.3897L6.00277 14.2987Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M12.7391 4.74966C14.4499 4.7232 16.1034 5.36697 17.3425 6.54867L20.7685 3.12262C18.5991 1.0855 15.7198 -0.034466 12.7391 0.000808666C8.20192 0.000808666 4.05274 2.55822 2.01562 6.61481L6.00166 9.70575C6.94967 6.86173 9.6085 4.74966 12.7391 4.74966Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3880_12643">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
          {/* <div className="middleDownImg flex-[1] bg-cover bg-center"></div> */}
        </div>
        <div className="rightImg flex-1 bg-cover bg-center hidden md:block"></div>
      </div>
    </>
  );
}
