import React from "react";
import { X } from "lucide-react";

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancellationModal = ({ isOpen, onClose }: CancellationModalProps) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-[#1C1C1C] w-[800px] h-[538px] rounded-2xl relative p-8">
    //     {/* Close Button */}
    //     <button
    //       onClick={onClose}
    //       className="absolute text-white right-4 top-4 hover:text-gray-300"
    //     >
    //       <X size={32} />
    //     </button>

    //     {/* Title */}
    //     <h2 className="pb-2 ml-4 text-2xl text-gray-300 border-b border-gray-700">
    //       Terms of Cancellation
    //     </h2>

    //     {/* Timeline Container */}
    //     <div className="mx-auto mt-12 mb-16 bg-[#242424] rounded-xl py-8 px-4 relative w-[90%]">
    //       <div className="relative flex items-center justify-between px-8">
    //         {/* Line */}
    //         <div className="absolute h-[2px] bg-gray-600 left-[15%] right-[15%] top-[22%]" />

    //         {/* Points */}
    //         <div className="relative z-10 flex flex-col items-center w-1/3">
    //           <div className="w-3 h-3 mb-3 bg-gray-500 rounded-full" />
    //           <span className="text-sm text-gray-400">Today</span>
    //         </div>

    //         <div className="relative z-10 flex flex-col items-center w-1/3">
    //           <div className="w-3 h-3 mb-3 bg-gray-500 rounded-full" />
    //           <span className="text-sm text-gray-400">24 Hours</span>
    //         </div>

    //         <div className="relative z-10 flex flex-col items-center w-1/3">
    //           <div className="w-3 h-3 mb-3 bg-gray-500 rounded-full" />
    //           <span className="text-sm text-gray-400">72 Hours</span>
    //         </div>
    //       </div>

    //       {/* Refund Labels */}
    //       <div className="flex justify-between px-16 mt-4">
    //         <span className="text-sm text-gray-400">Full Refund</span>
    //         <span className="ml-16 text-sm text-gray-400">No Refund</span>
    //       </div>
    //     </div>

    //     {/* Content Sections */}
    //     <div className="px-4 space-y-8">
    //       {/* Before 24 Hours Section */}
    //       <div className="flex flex-col">
    //         <div className="flex items-baseline gap-3 mb-1">
    //           <span className="text-lg text-gray-400">Before</span>
    //           <span className="text-3xl text-white">24 Hours</span>
    //         </div>
    //         <div className="flex items-baseline gap-6">
    //           <h4 className="text-3xl text-white whitespace-nowrap">Full refund</h4>
    //           <p className="text-base text-gray-400">
    //             Cancel within 24 hours of booking your session, a 100% refund will be issued
    //           </p>
    //         </div>
    //       </div>

    //       {/* After 24 Hours Section */}
    //       <div className="flex flex-col">
    //         <div className="flex items-baseline gap-3 mb-1">
    //           <span className="text-lg text-gray-400">After</span>
    //           <span className="text-3xl text-white">24 Hours</span>
    //         </div>
    //         <div className="flex items-baseline gap-6">
    //           <h4 className="text-3xl text-white whitespace-nowrap">No refund</h4>
    //           <p className="text-base text-gray-400">
    //             No refund for cancellation made after 24 hours.
    //           </p>
    //         </div>
    //       </div>

    //       {/* Amount Section */}
    //       <div className="flex flex-col">
    //         <div className="flex items-baseline gap-3 mb-1">
    //           <span className="text-lg text-gray-400">Amount</span>
    //           <span className="text-3xl text-white">72 Hours</span>
    //         </div>
    //         <div className="flex items-baseline gap-6">
    //           <h4 className="text-3xl text-white whitespace-nowrap">Amount Refunded</h4>
    //           <p className="text-base text-gray-400">
    //             The amount will be refunded to the users withing 72 hours of the cancellation
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div><>

    <>
      <div className="w-[360px] h-[800px] z-50 bg-neutral-800 mx-2 md:hidden absolute mt-[230px] rounded-xl">
        <button
          onClick={onClose}
          className="p-5 text-white hover:text-gray-300"
        >
          <X size={32} />
        </button>
        <div className="w-[328px] px-20 pt-[25px] pb-[37px] left-[16px] top-[69px] absolute bg-[#3f3f3f] rounded-2xl justify-center items-center inline-flex">
          <div className="w-[168px] h-[206px] relative">
            <div className="w-4 h-[205px] left-[72px] top-[1px] absolute">
              <div className="w-20 h-[0px] left-[8px] top-[14px] absolute origin-top-left rotate-90 border border-neutral-900"></div>
              <div className="w-20 h-[0px] left-[8px] top-[109px] absolute origin-top-left rotate-90 border border-neutral-900"></div>
              <div className="w-4 h-4 left-[16px] top-0 absolute origin-top-left rotate-90 bg-neutral-900 rounded-full" />
              <div className="w-4 h-4 left-[16px] top-[93px] absolute origin-top-left rotate-90 rounded-full border-2 border-neutral-900" />
              <div className="w-4 h-4 left-[16px] top-[189px] absolute origin-top-left rotate-90 rounded-full border-2 border-neutral-400" />
            </div>
            <div className="left-[98px] top-[51px] absolute text-neutral-400 text-sm font-normal font-Lato">
              Full Refund
            </div>
            <div className="left-[21px] top-0 absolute text-neutral-400 text-sm font-normal font-Lato">
              Today
            </div>
            <div className="left-[1px] top-[93px] absolute text-neutral-400 text-sm font-normal font-Lato">
              24 Hours
            </div>
            <div className="left-0 top-[189px] absolute text-neutral-400 text-sm font-normal font-Lato">
              72 Hours
            </div>
            <div className="left-[98px] top-[150px] absolute text-neutral-400 text-sm font-normal font-Lato">
              No Refund
            </div>
          </div>
        </div>
        <div className="w-[328px] h-[77px] left-[16px] top-[361px] absolute">
          <div className="left-0 top-[3px] absolute">
            <span className="text-sm font-semibold text-white font-Lato">
              Before
              <br />
            </span>
            <span className="text-xl font-semibold text-white font-Lato">
              24 Hours
            </span>
          </div>
          <div className="w-[198px] h-[77px] left-[130px] top-0 absolute">
            <div className="absolute top-0 left-0 text-xl font-semibold text-white font-Lato">
              Full refund
            </div>
            <div className="w-[198px] left-0 top-[26px] absolute text-neutral-400 text-sm font-normal font-Lato">
              Cancel within 24 hours of booking your session, a 100% refund will
              be issued
            </div>
          </div>
        </div>
        <div className="h-[60px] left-[16px] top-[470px] absolute">
          <div className="absolute top-0 left-0">
            <span className="text-sm font-semibold text-white font-Lato">
              After
              <br />
            </span>
            <span className="text-xl font-semibold text-white font-Lato">
              24 Hours
            </span>
          </div>
          <div className="w-[198px] h-[60px] left-[130px] top-0 absolute">
            <div className="absolute top-0 left-0 text-xl font-semibold text-white font-Lato">
              No refund
            </div>
            <div className="w-[198px] left-0 top-[26px] absolute text-neutral-400 text-sm font-normal font-Lato">
              No refund for cancellation made after 24 hours.
            </div>
          </div>
        </div>
        <div className="w-[328px] h-[77px] left-[16px] top-[562px] absolute">
          <div className="left-0 top-[3px] absolute">
            <span className="text-sm font-semibold text-white font-Lato">
              Amount
              <br />
            </span>
            <span className="text-xl font-semibold text-white font-Lato">
              72 Hours
            </span>
          </div>
          <div className="w-[198px] h-[77px] left-[130px] top-0 absolute">
            <div className="absolute top-0 left-0 text-xl font-semibold text-white font-Lato">
              Amount Refunded
            </div>
            <div className="w-[198px] left-0 top-[26px] absolute text-neutral-400 text-sm font-normal font-Lato">
              The amount will be refunded to the users withing 72 hours of the
              cancellation
            </div>
          </div>
        </div>
        <div className="w-[328px] h-[0px] left-[16px] top-[454px] absolute border border-[#3f3f3f]"></div>
        <div className="w-[328px] h-[0px] left-[16px] top-[546px] absolute border border-[#3f3f3f]"></div>
        <div className="left-[104px] top-[24px] absolute text-neutral-500 text-base font-medium font-Lato underline">
          Terms of Cancellation
        </div>
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mq450:hidden">
        <div className="w-[800px] h-[538px] relative bg-neutral-800 rounded-[11px] z-50 absolute">
          <div className="left-[43px] items-center flex flex-row gap-[500px] w-full   top-[31px] absolute text-neutral-500 text-base font-medium font-Lato underline">
            Terms of Cancellation
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
          </div>
          <div className="w-12 h-12 left-[736px] top-[16px] absolute" />
          <div className="w-[715px] h-[424px] left-[73px] top-[82px] absolute">
            <div className="w-[616px] h-[102px] pl-[26px] pr-[27px]  pt-5 pb-[17px] bg-[#3f3f3f] rounded-2xl justify-center items-center inline-flex">
              <div className="w-[563px] h-[65px] relative">
                <div className="w-[507px] h-4 left-[31px] top-[23px] absolute">
                  <div className="w-[164px] h-[0px] left-[14px] top-[8px] absolute border border-neutral-400"></div>
                  <div className="w-[142px] h-[0px] left-[191px] top-[8px] absolute border border-neutral-400"></div>
                  <div className="w-[142px] h-[0px] left-[349px] top-[8px] absolute border border-neutral-400"></div>
                  <div className="w-[507px] h-4 left-0 top-0 absolute">
                    <div className="absolute top-0 left-0 w-4 h-4 border-2 rounded-full bg-neutral-600 border-neutral-400" />
                    <div className="w-4 h-4 left-[176px] top-0 absolute rounded-full border-2 border-neutral-400" />
                    <div className="w-4 h-4 left-[333px] top-0 absolute rounded-full border-2 border-neutral-400" />
                    <div className="w-4 h-4 left-[491px] top-0 absolute rounded-full border-2 border-neutral-400" />
                  </div>
                </div>
                <div className="left-[93px] top-0 absolute text-neutral-400 text-sm font-normal font-Lato">
                  No Refund
                </div>
                <div className="left-0 top-[48px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  Session start
                </div>
                <div className="left-[187px] top-[48px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  24 Hours
                </div>
                <div className="left-[355px] top-[48px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  72 Hours
                </div>
                <div className="left-[497px] top-[48px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  120 Hours
                </div>
                <div className="left-[258px] top-0 absolute text-neutral-400 text-sm font-normal font-Lato">
                  Full Refund
                </div>
                <div className="left-[400px] top-0 absolute text-neutral-400 text-sm font-normal font-Lato">
                  Amount Credited
                </div>
              </div>
            </div>
            <div className="w-[643px] h-[54px] left-0 top-[134px] absolute">
              <div className="left-0 top-[3px] absolute">
                <span className="text-sm text-white font-md font-Lato">
                  Before
                  <br />
                </span>
                <span className="text-2xl font-semibold text-white font-Lato">
                  24 Hours
                </span>
              </div>
              <div className="w-[472px] h-[54px] left-[171px] top-0 absolute">
                <div className="absolute top-0 left-0 text-2xl font-semibold text-white font-Lato">
                  Full refund
                </div>
                <div className="left-0 top-[37px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  100% refund will be issued, if the user cancel 24 hours before
                  the start of the session time.
                </div>
              </div>
            </div>
            <div className="w-[463px] h-[54px] left-0 top-[252px] absolute">
              <div className="left-0 top-[2px] absolute">
                <span className="text-sm text-white font-md font-Lato">
                  After
                  <br />
                </span>
                <span className="text-2xl font-semibold text-white font-Lato">
                  24 Hours
                </span>
              </div>
              <div className="w-[450px] h-[54px] left-[171px] top-0 absolute">
                <div className="absolute top-0 left-0 text-2xl font-semibold text-white font-Lato">
                  No refund
                </div>
                <div className="left-0 top-[37px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  No refund for cancellation made if the session booked is
                  within 24 hours of session start time.
                </div>
              </div>
            </div>
            <div className="w-[648px] h-[54px] left-0 top-[370px] absolute">
              <div className="left-0 top-[3px] absolute">
                <span className="text-sm text-white font-md font-Lato">
                  Amount
                  <br />
                </span>
                <span className="text-2xl font-semibold text-white font-Lato">
                  72 Hours
                </span>
              </div>
              <div className="w-[477px] h-[54px] left-[171px] top-0 absolute">
                <div className="absolute top-0 left-0 text-2xl font-semibold text-white font-Lato">
                  Amount Refunded
                </div>
                <div className="left-0 top-[37px] absolute text-neutral-400 text-sm font-normal font-Lato">
                  The amount will be refunded within 3-5 working days from the
                  cancellation
                </div>
              </div>
            </div>
            <div className="w-[715px] h-[0px] left-0 top-[220px] absolute border border-[#3f3f3f]"></div>
            <div className="w-[715px] h-[0px] left-0 top-[338px] absolute border border-[#3f3f3f]"></div>
          </div>
          {/* <button
            className={` bg-gradient-to-r hover:border hover:border-neutral-50 from-[#F43F5E] to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex 
                    
                    }`}
          >
       Okay
          </button> */}
        </div>
      </div>
    </>
  );
};

export default CancellationModal;
