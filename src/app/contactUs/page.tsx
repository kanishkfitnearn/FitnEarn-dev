import React from "react";
import Image from "next/image";
import BannerImg from "../../../public/contactHeader.jpg";
import ContactUsForm from "../Components/ContactUsForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="pt-[72px] md:pt-[122px] pb-[32px] px-4 mb:px-[72px]">
      <div className="flex flex-col-reverse items-center justify-center gap-8 px-4 py-10 lg:flex-row lg:gap-36 lg:px-28">
        <div className="relative w-full max-w-[552px] aspect-[16/9] lg:max-w-[452px] lg:aspect-auto lg:h-[300px] rounded-[52px] border-2 border-[#F43F5E] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-gradient-to-b from-[rgba(251,146,60,0.12)] to-[rgba(244,63,94,0.12)] blur-3xl"></div>
            <div className="absolute top-0 right-0 w-1/4 h-1/4 rounded-full bg-gradient-to-br from-[rgba(251,146,60,0.2)] to-[rgba(244,63,94,0.2)] blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-1/5 h-1/5 rounded-full bg-gradient-to-tr from-[rgba(251,146,60,0.15)] to-[rgba(244,63,94,0.15)] blur-2xl"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-4xl lg:text-4xl xl:text-5xl font-Lato">
              Need Support?
              <br />
              We are Here for You!
            </h2>
          </div>
        </div>
        <div className="w-full max-w-[500px] lg:w-auto">
          <Image
            width={500}
            height={300}
            src="/supportImg.svg"
            alt="Support illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      <section className=" mt-[85px] mq450:mt-10 ">
        <div
          style={{ marginBottom: "40px" }}
          className="flex flex-col items-center justify-center pb-[20px]"
        >
          <h4 className="mid-heading text-[22px] md:text-4xl font-normal">
            Need Support
          </h4>
          <div className="relative text-center">
            <h1 className="core-feature text-[32px] md:text-[105px] tracking-tighter">
              Need Support
            </h1>

            <h2 className="text-[#FFFFFF] text-nowrap text-[30px] md:text-[77px] font-extrabold leading-normal absolute top-3 md:top-6 left-[-10px] md:left-[35px]">
              Get in touch with Us
            </h2>
          </div>
        </div>

        <ContactUsForm />
      </section>

      <section className="relative min-h-[1157px] md:min-h-[1090px] max-h-[1200px] h-full overflow-hidden mt-12 mq450:mt-20">
        <div className="absolute flex flex-col items-center justify-center w-full gap-4">
          <div
            // style={{ marginBottom: "10px", marginTop: "60px" }}
            className="flex flex-col items-center justify-center mt-[60px] mb-[10px] mq450:mt-1 "
          >
            <h4 className="mid-heading text-[22px] md:text-4xl font-normal">
              Frequently Asked Questions
            </h4>
            <div className="relative text-center">
              <h1 className="core-feature text-[26px] md:text-[100px] tracking-tighter">
                Have Questions?
              </h1>

              <h2 className="text-[#FFFFFF] text-nowrap text-[23px] md:text-[70px] font-extrabold leading-normal absolute top-3 md:top-6 left-[-48px] md:left-[-35px]">
                Find Answers to your questions
              </h2>
            </div>
          </div>

          <div className="w-[327px] md:w-[971px] h-[920px] pb-20  mt-8 md:mt-10 ">
            <div className="[&>*]:border-0">
              <Accordion
                type="single"
                collapsible
                className="space-y-0 [&>*]:border-t-[1px] [&>*]:border-[#c8c7c7] [&>*:first-child]:border-t-0 [&>*:last-child]:border-b-0"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How do I earn coins in FitnEarn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    You earn coins by completing various physical and mental
                    exercises available on the app, including walking, yoga,
                    home workouts, and participating in challenges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-22">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      What can I do with the coins I earn on FitnEarn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    You can use your earned coins to redeem health and
                    fitness-related products from the FitnEarn marketplace or
                    exchange them for cash rewards.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      What services are available on the FitnEarn website?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    The FitnEarn website offers access to tools like health
                    calculators, a blog platform for sharing fitness journeys,
                    live workout sessions, and a coach booking system.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-33">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How does the mood board feature work?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    The mood board feature on your dashboard helps improve your
                    mood by engaging in exercises designed to combat stress,
                    frustration, and other negative emotions, rewarding you for
                    each activity completed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How do I connect my Google Fit app to FitnEarn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    To track your steps and other physical activities directly
                    through FitnEarn, install the Google Fit app, log in, and
                    then connect it with FitnEarn in the app settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How do I book a session with a coach on the website?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    You can browse the availability schedule of our professional
                    coaches and book one-on-one or group sessions directly
                    through the coach booking section on the website.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-44">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      Is FitnEarn available in languages other than English?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    Yes, FitnEarn offers an exercise library in 6-8 of the most
                    spoken languages in India, making fitness accessible to a
                    wider audience.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      Can I customize my workout plan on FitnEarn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    Yes, FitnEarn offers personalized workout plans tailored to
                    your fitness goals, preferences, and available equipment,
                    ensuring a customized fitness journey.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How do I connect my Google Fit app to FitnEarn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    To track your steps and other physical activities directly
                    through FitnEarn, install the Google Fit app, log in, and
                    then connect it with FitnEarn in the app settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-[18px] md:text-[26px] text-[#F5F5F5] font-bold leading-normal">
                    <span className="w-[223px] md:w-auto text-left">
                      How secure is my information on the FitnEarn website?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[18px] text-[#A3A3A3] font-normal leading-normal">
                    We adhere to strict data protection policies and utilize
                    encryption to ensure your personal information and fitness
                    data are secure and not shared without your consent.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
