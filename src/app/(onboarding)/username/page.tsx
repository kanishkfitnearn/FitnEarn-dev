import UserNameForm from "@/app/Components/usernameForm";

const UserName = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-black">
        <div className="flex-1 hidden bg-center bg-cover usernameLeftImg md:block"></div>
        <div className="usernameMiddleImg flex-1 ml-[3px] mr-2 bg-cover bg-center flex justify-center items-center">
          <section className="userCard flex justify-center flex-col  w-[328px] h-[440px] md:w-[495px] md:h-[360px] space-y-8 shadow rounded-[24px] bg-gray-900 bg-opacity-60 backdrop-blur-xl py-[20px] md:py-[40px] px-[20px] md:px-[40px] md:pt-[44px] md:pb-[44px]">
            <UserNameForm />
          </section>
        </div>
        <div className="flex-1 hidden bg-center bg-cover usernameRightImg md:block"></div>
      </div>
    </>
  );
};

export default UserName;
