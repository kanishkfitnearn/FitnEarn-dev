import EmblaCarousel from "../../Components/EmblaCarousel";

const ChooseAvatar = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-black">
        <div className="flex-1 hidden bg-center bg-cover usernameLeftImg md:block"></div>
        <div className="usernameMiddleImg flex-1 ml-[3px] mr-2 bg-cover bg-center flex justify-center items-center">
          <section className="userCard flex justify-center flex-col  w-[328px] h-[440px] md:w-[495px] md:h-[396px] space-y-8 shadow rounded-[24px] bg-gray-900 bg-opacity-60 backdrop-blur-xl py-[20px] md:pt-[40px] md:pb-[38px] px-[20px] md:p-[40px]">
            <h1 className="text-[28px] text-[#E5E5E5] font-extrabold text-center md:text-left leading-normal mb-2 md:mb-1">
              Select Avatar
            </h1>
            <article style={{ marginTop: "0" }}>
              <h2 className="text-[18px] md:text-[20px] text-[#D4D4D4] text-center md:text-left font-semibold leading-normal mb-[24px]">
                Select a free avatar from the following
              </h2>
              <div className="flex items-center justify-center pr-2 md:mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="32"
                  viewBox="0 0 31 32"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.5254 20.7009L23.39 13.6043L20.6651 15.3397C20.1218 15.6861 19.4642 15.8057 18.8337 15.6727C18.2032 15.5397 17.6499 15.1647 17.2928 14.6283L15.4996 11.9342L13.7051 14.6296C13.3478 15.1657 12.7945 15.5405 12.164 15.6732C11.5335 15.806 10.876 15.6863 10.3328 15.3397L7.60912 13.6043L9.47373 20.7009H21.5254ZM8.27004 12.5656C7.32604 11.9637 6.13342 12.8339 6.41773 13.9169L8.28358 21.0136C8.35265 21.2766 8.50689 21.5093 8.72221 21.6754C8.93752 21.8415 9.20179 21.9317 9.47373 21.9317H21.5254C21.7974 21.9317 22.0616 21.8415 22.2769 21.6754C22.4923 21.5093 22.6465 21.2766 22.7156 21.0136L24.5814 13.9169C24.8645 12.8339 23.6731 11.9649 22.7291 12.5656L20.0042 14.3009C19.7327 14.4743 19.404 14.5342 19.0887 14.468C18.7735 14.4017 18.4968 14.2145 18.318 13.9465L16.5236 11.2511C16.4112 11.0825 16.2589 10.9443 16.0803 10.8487C15.9016 10.7531 15.7022 10.7031 15.4996 10.7031C15.297 10.7031 15.0975 10.7531 14.9189 10.8487C14.7402 10.9443 14.588 11.0825 14.4756 11.2511L12.6811 13.9465C12.5026 14.2147 12.2259 14.4022 11.9107 14.4687C11.5954 14.5352 11.2666 14.4754 10.995 14.3022L8.27004 12.5656Z"
                    fill="url(#paint0_linear_7396_19446)"
                  />
                  <path
                    d="M16.6617 8.54857C16.6621 8.85703 16.5398 9.153 16.3219 9.37135C16.104 9.5897 15.8083 9.71255 15.4999 9.71287C15.1914 9.7132 14.8954 9.59097 14.6771 9.37309C14.4587 9.1552 14.3359 8.85949 14.3356 8.55103C14.3352 8.24256 14.4575 7.9466 14.6754 7.72825C14.8932 7.5099 15.189 7.38705 15.4974 7.38672C15.8059 7.38639 16.1018 7.50862 16.3202 7.72651C16.5385 7.9444 16.6614 8.2401 16.6617 8.54857ZM25.9614 10.876C25.9615 11.0287 25.9315 11.1799 25.8731 11.3211C25.8147 11.4622 25.7291 11.5905 25.6212 11.6985C25.5133 11.8066 25.3851 11.8923 25.244 11.9509C25.1029 12.0094 24.9517 12.0396 24.799 12.0396C24.6462 12.0397 24.495 12.0097 24.3538 11.9513C24.2127 11.893 24.0844 11.8074 23.9764 11.6994C23.8683 11.5915 23.7826 11.4633 23.724 11.3222C23.6655 11.1811 23.6353 11.0299 23.6353 10.8772C23.6353 10.5687 23.7578 10.2729 23.9759 10.0548C24.194 9.83664 24.4899 9.7141 24.7983 9.7141C25.1068 9.7141 25.4026 9.83664 25.6208 10.0548C25.8389 10.2729 25.9614 10.5675 25.9614 10.876ZM7.36326 10.876C7.36343 11.1844 7.24104 11.4803 7.02304 11.6985C6.80504 11.9168 6.50927 12.0395 6.2008 12.0396C6.04806 12.0397 5.89681 12.0097 5.75566 11.9513C5.61452 11.893 5.48626 11.8074 5.3782 11.6994C5.15997 11.4814 5.03727 11.1856 5.03711 10.8772C5.03711 10.5687 5.15965 10.2729 5.37777 10.0548C5.59589 9.83664 5.89172 9.7141 6.20019 9.7141C6.50865 9.7141 6.80449 9.83664 7.02261 10.0548C7.24073 10.2729 7.36326 10.5675 7.36326 10.876Z"
                    fill="url(#paint1_linear_7396_19446)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.6543 23.3849C9.6543 23.2217 9.71913 23.0652 9.83454 22.9498C9.94995 22.8344 10.1065 22.7695 10.2697 22.7695H21.0229C21.1861 22.7695 21.3426 22.8344 21.4581 22.9498C21.5735 23.0652 21.6383 23.2217 21.6383 23.3849C21.6383 23.5481 21.5735 23.7047 21.4581 23.8201C21.3426 23.9355 21.1861 24.0003 21.0229 24.0003H10.2697C10.1065 24.0003 9.94995 23.9355 9.83454 23.8201C9.71913 23.7047 9.6543 23.5481 9.6543 23.3849Z"
                    fill="url(#paint2_linear_7396_19446)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4998 30.1556C23.3165 30.1556 29.6537 23.8184 29.6537 16.0018C29.6537 8.18519 23.3165 1.84796 15.4998 1.84796C7.68323 1.84796 1.346 8.18519 1.346 16.0018C1.346 23.8184 7.68323 30.1556 15.4998 30.1556ZM15.4998 31.3864C23.9971 31.3864 30.8845 24.499 30.8845 16.0018C30.8845 7.50457 23.9971 0.617188 15.4998 0.617188C7.00262 0.617188 0.115234 7.50457 0.115234 16.0018C0.115234 24.499 7.00262 31.3864 15.4998 31.3864Z"
                    fill="url(#paint3_linear_7396_19446)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_7396_19446"
                      x1="5.67312"
                      y1="17.8703"
                      x2="25.2381"
                      y2="17.8755"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_7396_19446"
                      x1="4.23233"
                      y1="10.3567"
                      x2="26.6657"
                      y2="10.373"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_7396_19446"
                      x1="9.19337"
                      y1="23.5551"
                      x2="22.0416"
                      y2="23.5754"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_7396_19446"
                      x1="-1.0682"
                      y1="20.2571"
                      x2="31.9201"
                      y2="20.2625"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <form className="flex flex-col items-center justify-center">
                <div className="flex flex-wrap md:flex-nowrap justify-center items-center mb-[12px] md:mb-[23px] gap-4 ">
                  {/* avatar image selection code is here */}
                  <div className="block">
                    <EmblaCarousel options={{ loop: true }} />
                  </div>
                </div>
              </form>
            </article>
          </section>
        </div>
        <div className="flex-1 hidden bg-center bg-cover usernameRightImg md:block"></div>
      </div>
    </>
  );
};

export default ChooseAvatar;
