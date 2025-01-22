import React from "react";

const Page = () => {
  return (
    <div className="container px-4 py-8 pt-40 mx-auto text-white font-Lato bg-neutral-900 mq450:pt-20" >
    <h1 className="mb-6 text-3xl font-bold text-center text-white">Cancellation Policy for Live Sessions and Coach Booking Sessions</h1>
    {/* <p className="mb-6 text-sm text-center text-white">Last policy updated on 10.11.2024</p> */}
    
    <div className="space-y-6">
    <p>
              Last updated: <b>18.11.2024</b>
            </p>
      <p className="mb-4">
        At FitnEarn, we understand that schedules can change, and plans may need to be altered. Our cancellation policy ensures a fair process for all users while respecting the time and effort of our coaches. Please read the following terms carefully before booking a live session or coach session:
      </p>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Cancellation and Refund Terms:</h2>
        
        <h3 className="mb-2 text-xl font-semibold">Cancellations Made More Than 24 Hours Before the Session Start Time</h3>
        <ul className="pl-5 mb-4 space-y-2 list-disc">
          <li>If the cancellation request is made more than 24 hours before the session start time, the full booking amount will be refunded to the user.</li>
          <li>The refund will be processed within 5-7 business working days.</li>
        </ul>

        <h3 className="mb-2 text-xl font-semibold">Cancellations Made Less Than 24 Hours Before the Session Start Time</h3>
        <ul className="pl-5 space-y-2 list-disc">
          <li>If the cancellation request is made less than 24 hours before the session start time, no refund will be initiated.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Important Notes:</h2>
        <ul className="pl-5 space-y-2 list-disc">
          <li>All cancellation requests must be made through the FitnEarn app or website using the &quot;Contact Us&quot; page or the designated cancellation option under the booking section.</li>
          <li>Refunds are subject to verification of the cancellation request.</li>
          <li>The timeline for refund processing may depend on various banking and payment channels. FitnEarn will not be responsible for delays caused by third-party service providers or banks.</li>
          <li>Users are advised to carefully review their schedules before booking to avoid cancellations and ensure a smooth experience for all participants.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Contact Information</h2>
        <p className="mb-2">For any queries or assistance regarding cancellations or refunds, please contact us at:</p>
        <p><strong>Email:</strong> help-support@fitnearn.com</p>
        <p><strong>Mobile:</strong> +91-8630222654</p>
      </section>
    </div>
  </div>
  );
};

export default Page;
