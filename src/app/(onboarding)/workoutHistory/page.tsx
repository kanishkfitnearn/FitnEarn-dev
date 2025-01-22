import FitnessLevel from "@/app/Components/FitnessLevel";

const WorkoutHistory = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-black">
        <div className="usernameLeftImg flex-1 bg-cover bg-center hidden md:block"></div>
        <div className="usernameMiddleImg flex-1 ml-[3px] mr-2 bg-cover bg-center flex justify-center items-center">
          <section className="userCard flex justify-center flex-col  w-[328px] h-[520px] md:w-[495px] md:h-auto space-y-8 shadow rounded-[24px] bg-gray-900 bg-opacity-60 backdrop-blur-xl p-[40px]">
            <h1 className="text-[28px] text-[#E5E5E5] text-center md:text-left font-extrabold leading-normal mb-2 md:mb-1">
              Fitness Level
            </h1>
            <article style={{ marginTop: "0" }}>
              <h2 className="text-[18px] md:text-[20px] text-[#D4D4D4] font-semibold text-center md:text-left leading-normal mb-4 md:mb-[32px]">
                Select your current fitness level
              </h2>
              <FitnessLevel />
            </article>
          </section>
        </div>
        <div className="usernameRightImg flex-1 bg-cover bg-center hidden md:block"></div>
      </div>
    </>
  );
};

export default WorkoutHistory;
