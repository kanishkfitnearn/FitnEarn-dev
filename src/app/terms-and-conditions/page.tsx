import React from "react";

const Page = () => {
  return (
    // <div className="pt-24 top-36 mq450:left-0">
    //   <p className="text-white text-center text-[44px] font-semibold font-Lato">
    //     Terms and Conditions
    //   </p>
    //   <p className="text-lg font-semibold text-center text-neutral-300 font-Lato">
    //     Effective Date : 4.02.24
    //   </p>
    //   <div className="w-auto p-20 mt-2 mq450:w-auto mq450:p-5">
    //     <div className="">
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Welcome to FitnEarn (the “Platform”), an online platform dedicated
    //         to fitness and wellness, operated by Fit Earn Meditate (“FitnEarn”,
    //         &quot;Sole Proprietorship&quot;, “we,” “us,” or “our”).
    //         FitnEarn&quot;s office is located at 395, Purav Deen Dayal, Old
    //         Railway Road, Veer Bhawan Nagar, Roorkee-247667,
    //         <br />
    //         This document is an electronic record in terms of the Information
    //         Technology Act, 2000, and rules thereunder, and is published in
    //         accordance with the provisions of the Information Technology
    //         (Reasonable Security Practices and Procedures and Sensitive Personal
    //         Data or Information) Rules, 2011, which require publishing the rules
    //         and regulations, privacy policy, and Terms and Conditions for access
    //         or usage of the Platform through the FitnEarn Mobile
    //         Application (hereinafter referred to as “Mobile Application”) and
    //         Website – [www.fitnearn.com] (hereinafter referred to as
    //         &quot;Website&quot;) and our related Website, Application, Services,
    //         Products,Devices and content (together with the Mobile Application
    //         and Website, collectively referred to as “Services”).
    //         <br />
    //         <br />
    //         AGREEMENT TO TERMS
    //         <br />
    //         User Agreement: These Terms and Conditions constitute a legally
    //         binding agreement made between you, whether personally or on behalf
    //         of an entity (“you” or “user” or “client”) and FitnEarn (Fit Earn
    //         Meditate), concerning your access to and use of the Website and
    //         FitnEarn Mobile Application as well as any other media form, media
    //         channel, mobile website or mobile application related, linked, or
    //         otherwise connected thereto (collectively, the &quot;Website and
    //         Mobile Application”). You agree that by accessing the Website and/or
    //         Mobile Application, you have read, understood, and agree to be bound
    //         by all of these Terms and Conditions.
    //         <br />
    //         <br />
    //         IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU
    //         ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST
    //         DISCONTINUE USE IMMEDIATELY.
    //         <br />
    //         Changes to Terms & Conditions: Any Supplementary terms and
    //         conditions or documents that may be occasionally published on the
    //         FitnEarn Website or Mobile App are integrated by reference into this
    //         agreement. FitnEarn reserves the exclusive right to amend or update
    //         these Terms at any moment for any reason. Changes will be
    //         communicated by updating the &quot;Last Updated&quot; date of these
    //         Terms and Conditions.  It is your responsibility to review these
    //         Terms and Conditions periodically to stay informed of updates. You
    //         will be subject to, and will be deemed to have been made aware of
    //         and to have accepted, the changes in any revised Terms and
    //         Conditions by continuing to access or use the FitnEarn Website or
    //         Mobile Application, or any other services offered after these
    //         updates take effect, you acknowledge and accept the revised Terms
    //         and Conditions.
    //         <br />
    //         The information provided on the Website/Mobile Application is not
    //         intended for distribution to or use by any person or entity in any
    //         jurisdiction or country where such distribution or use would be
    //         contrary to law or regulation or which would subject us to any
    //         registration requirement within such jurisdiction or country.
    //         Accordingly, those persons who choose to access the Website/Mobile
    //         Application from other locations do so on their own initiative and
    //         are solely responsible for compliance with local laws, if and to the
    //         extent local laws are applicable.
    //         <br />
    //         Eligibility:
    //         <br />
    //         You must be at least 18 to register on the Platform. If you are
    //         below the ages of 18 (“Minor”), you may use our Services only with
    //         the supervision and consent of a parent or guardian. No individual
    //         under these age limits may use our Services, provide any Personal
    //         Data to FitnEarn, or otherwise submit Personal Data through the
    //         Services (e.g., a name, address, telephone number, or email
    //         address).
    //         <br />
    //         As a minor if you wish to use Our Products or Services, such use
    //         shall be made available to You by Your legal guardian or parents,
    //         who has agreed to these Terms. In the event a minor utilises the
    //         Application/Website/Services, it is assumed that he/she has obtained
    //         the consent of the legal guardian or parents and such use is made
    //         available by the legal guardian or parents. The Company will not be
    //         responsible for any consequence that arises due to, misuse of any
    //         kind of Our Website or any of Our Products or Services that may
    //         occur by any person including a minor registering for the
    //         Services/Products provided. By using the Products or Services You
    //         warrant that all the data provided by You is accurate and complete
    //         and that the Minor using the Website has obtained the consent of
    //         parent/legal guardian (in case of minors). The Company reserves the
    //         right to terminate Your account and / or refuse to provide You with
    //         access to the Products or Services if it is discovered that You are
    //         under the age of 18 (Eighteen) years and the consent to use the
    //         Products or Services is not made by Your parent/legal guardian or
    //         any information provided by You is inaccurate. You acknowledge that
    //         the Company does not have the responsibility to ensure that You
    //         conform to the eligibility criteria mentioned above. It shall be
    //         Your sole responsibility to ensure that You meet the required
    //         qualification. Any persons under the age of 18 (Eighteen) should
    //         seek the consent of their parents/legal guardians before providing
    //         any Information about themselves or their parents and other family
    //         members on the Website.
    //         <br />
    //         OUR SERVICES
    //         <br />
    //         <br />
    //         Our Services allow you to purchase various Products and services
    //         from us. We reserve the right to amend, discontinue, withdraw, or
    //         cease our service offerings at any time. FitnEarn offers a variety
    //         of services aimed at enhancing your fitness and wellness journey,
    //         including but not limited to:
    //         <br />
    //         <br />
    //         a) Workout Plans: A personalised workout plan recommended by
    //         FitnEarn and customised workout plan based on user requirements both
    //         subscription based offering users to access existing media and
    //         content relating to various exercises from categories such as Yoga,
    //         Muscle Building, Dance Fitness, Cardio, Kick-boxing, Plyomterics,
    //         Meditation, Stretching and Rehab & Care etc.
    //         <br />
    //         <br />
    //         b) Exercise Video Library: Access our exercise video library which
    //         comprises exercises in various categories such as Yoga, Pilates,
    //         Body Weight, Cardio, Equipment Based Workouts, Meditation etc.
    //         <br />
    //         c) FitnEarn Market Place: Access to purchase of various
    //         products/accessories related to health and fitness from FitnEarn
    //         Store.
    //         <br />
    //         d) Exercise Challenges: Participate in various challenges for
    //         motivation and rewards.
    //         <br />
    //         e) Community Engagement: Access to our social feed section to engage
    //         and communicate with the FitnEarn community in compliance with the
    //         community guidelines.
    //         <br />
    //         <br />
    //         HEALTH DISCLAIMER
    //         <br />
    //         In consideration of being allowed to participate and use any of the
    //         services offered by FitnEarn, in addition to the payment of any fee
    //         or charge, you do hereby waive, release and forever discharge and
    //         hold harmless FitnEarn and its coaches, consultants, officers,
    //         agents, and employees from any and all responsibility, liability,
    //         costs and expenses, including injuries or damages, resulting from
    //         your participation and use of any of the services offered by
    //         FitnEarn.
    //         <br />
    //         <br />
    //         You do also hereby release FitnEarn, its coaches, consultants,
    //         officers, agents and employees from any responsibility or liability
    //         for any injury, damage or disorder (physical or otherwise) to you,
    //         or in anyway arising out of or connected with your participation in
    //         any activities and use of any of services associated or provided by
    //         the FitnEarn.
    //         <br />
    //         <br />
    //         You understand and you are aware that strength, flexibility, aerobic
    //         and other forms of exercise, asanas and practices including the use
    //         of equipment or otherwise are a potentially dangerous activity. You
    //         also understand that fitness activities involve a risk of loss of
    //         personal property, serious injury and even death, and that you are
    //         voluntarily participating in these activities and using equipment
    //         and machinery or otherwise with knowledge of the risk involved. You
    //         hereby agree to assume expressly and accept all risks of loss of
    //         personal property, serious injury or death related to said fitness
    //         activities. In addition, You certify that you are 18 years of age or
    //         older. You do hereby further declare yourself to be physically sound
    //         and suffering from no condition, impairment, disease, infirmity or
    //         other illness that would affect nutrient metabolism or prevent your
    //         participation or use of equipment or machinery or otherwise except
    //         as herein after stated.
    //         <br />
    //         <br />
    //         Moreover, you also agree that if you are suffering from any ailment
    //         or any medical condition you have to inform and produce relevant
    //         documents to FitnEarn before beginning any physical activities or
    //         any other plans that may be referenced, discussed or offered under
    //         the Services provided by FitnEarn platform. You do hereby
    //         acknowledge that FitnEarn has recommended to you to obtain an
    //         approval from a medical expert or certified medical practitioner as
    //         per the laws of the land prior to your participation in an
    //         exercise/fitness activity or in the use of any health and fitness
    //         services offered by FitnEarn. You also acknowledge that FitnEarn has
    //         recommended that you have a yearly or more frequent physical
    //         examination and consultation with your physician or any medical
    //         expert/ consultant prior to any physical activity, exercise and use
    //         of exercise and training equipment so that you might have his/her
    //         recommendations concerning these fitness activities and use of
    //         equipment. You acknowledge that you have either had a physical
    //         examination and been given your physician’s or medical expert&quot;s
    //         permission to participate, or that you have decided to participate
    //         in activity and use of equipment, machinery, plans, and other
    //         programs designed by FitnEarn without the approval of your physician
    //         or medical expert and do hereby assume and take all responsibility
    //         for your participation and activities, and utilization of fitness
    //         services provided by FitnEarn.
    //         <br />
    //         <br />
    //         FITNEARN DOES NOT PROVIDE PROFESSIONAL MEDICAL SERVICES OR ADVICE.
    //         THE SERVICES PROVIDED BY THE COACHES/TRAINING SPECIALISTS AND
    //         AVAILABLE ON THE WEBSITE AND/OR MOBILE APP DO NOT CONTAIN OR
    //         CONSTITUTE, AND SHOULD NOT BE INTERPRETED AS MEDICAL ADVICE OR
    //         OPINION. NO DOCTOR-PATIENT RELATIONSHIP IS CREATED. USE OF THE
    //         SERVICES IS NOT FOR MEDICAL EMERGENCIES. IF YOU THINK YOU HAVE A
    //         MEDICAL EMERGENCY, CONSULT YOUR DOCTOR. YOUR USE OF THE SERVICES
    //         DOES NOT CREATE A DOCTOR-PATIENT RELATIONSHIP BETWEEN YOU AND ANY OF
    //         THE FITNEARN ASSOCIATED COACHES, EMPLOYEES, OTHER FITNEARN
    //         ASSOCIATED PARTIES OR ANY OF FITNEARN SERVICE USERS.
    //         <br /> <br />
    //         INTELLECTUAL PROPERTY RIGHTS
    //         <br />
    //         FitnEarn, Fit Earn Meditate, FitnEarn Coin, FitnEarn Gift Cashback
    //         Rewards, Product Reward System, Mood-board and associated challenges
    //         and other Fitness and Meditation Challenge are sole proprietary of
    //         FitnEarn (alias Fit Earn Meditate). Unless otherwise indicated, the
    //         Website/Mobile Application, is our proprietary property and all
    //         content, source code, databases, functionality, software, website
    //         designs, videos, text, images, photographs, questions, creative
    //         suggestions, messages, comments, feedback, ideas, drawings, articles
    //         and other materials, on the Website/Mobile Application
    //         (collectively, the “Content”) and the trademarks, service marks, and
    //         logos contained therein (the “Marks”) are owned or controlled by us
    //         or licensed to us, and are protected by copyright and trademark laws
    //         and various other intellectual property rights and unfair
    //         competition laws of India, foreign jurisdictions, and international
    //         conventions. The Content and the Marks are provided on the
    //         Website/Mobile Application “AS IS” for your information and personal
    //         use only. Except as expressly provided in these Terms and
    //         Conditions, no part of the Website/Mobile Application and no Content
    //         or Marks may be modified, copied, reproduced, aggregated,
    //         republished, uploaded, posted, publicly displayed, performed,
    //         encoded, translated, transmitted, distributed, sold, licensed,
    //         create derivative works of or otherwise exploited for any commercial
    //         purpose whatsoever in whole or in part, without our express prior
    //         written permission.
    //         <br />
    //         Provided that you are eligible to use the Website/Mobile
    //         Application, you are granted a limited license to access and use the
    //         Website/Mobile Application and to download or print a copy of any
    //         portion of the Content to which you have properly gained access
    //         solely for your personal, non-commercial use. We reserve all rights
    //         not expressly granted to you in and to the Website/Mobile
    //         Application, the Content and the Marks.Our commercial partners,
    //         suppliers, advertisers, sponsors, licensors, contractors and other
    //         third parties may also have additional proprietary rights in the
    //         Content which they make available on our Services. You may not
    //         modify, publish, transmit, distribute, perform, participate in the
    //         transfer or sale, create derivative works of, or in anyway exploit,
    //         any of the Content, in whole or in part. When Content is downloaded
    //         to your computer, phone, tablet or any other mobile device, you do
    //         not obtain any ownership interest in such Content. Modification of
    //         the Content or use of the Content for any other purpose, including,
    //         but not limited to, use of any Content in printed form or on any
    //         other applications or networked computer environment is strictly
    //         prohibited unless you receive our prior written consent.
    //         <br />
    //         USER REPRESENTATIONS
    //         <br />
    //         By using the FitnEarn Website/Mobile Application, you represent and
    //         warrant that:
    //         <br />
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         all registration information you submit will be authentic, true,
    //         accurate, current, and complete.
    //         <br />
    //         you will maintain the accuracy of such information and promptly
    //         update such registration information as necessary;
    //         <br />
    //         you have the legal capacity and you agree to comply with these Terms
    //         and Conditions;
    //         <br />
    //         you are not a minor in the jurisdiction in which you reside;
    //         <br />
    //         you will not access the Website/Mobile Application through automated
    //         or non-human means, whether through a bot, script or otherwise;
    //         <br />
    //         you will not use the Website/Mobile Application for any illegal or
    //         unauthorized purpose; and
    //         <br />
    //         your use of the Website/Mobile Application will not violate any
    //         applicable law or regulation.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         <br />
    //         If you provide any information that is untrue, inaccurate, not
    //         current, or incomplete, we have the right to suspend or terminate
    //         your account and refuse any current or future use of the
    //         Website/Mobile Application (or any portion thereof) and may also
    //         take legal action as per applicable laws of the land.
    //         <br />
    //         <br />
    //         USER REGISTRATION
    //         <br />
    //         You may be required to register with the Website/Mobile Application.
    //         You agree to keep your password confidential and will be responsible
    //         for all use of your account and password. We reserve the right to
    //         remove, reclaim, or change a username you select if we determine, in
    //         our sole discretion, that such username is inappropriate, obscene,
    //         or otherwise objectionable.
    //         <br /> <br />
    //         FITNEARN COIN TERMS AND CONDITIONS
    //         <br />
    //         General Conditions
    //         <br />
    //         1. You may avail the services of the FitnEarn Coins upon successful
    //         registration and creation of an Account on the FitnEarn App or
    //         Website. You are bound by these terms and conditions of the
    //         FitnEarnCoin System.
    //         <br />
    //         <br />
    //         2. By signing up, you agree that you have read and understood the
    //         Terms and Conditions that govern the FitnEarnCoin&quot;s System, and
    //         give consent to FitnEarn to contact you for events, promotions,
    //         product information and discount. This will override the registry on
    //         NDNC/DND.
    //         <br />
    //         <br />
    //         <br />
    //         3. Members can benefit from the FitnEarnCoin System by availing the
    //         services on the FitnEarn App or Website.
    //         <br />
    //         <br />
    //         4. The FitnEarn Coin System is open to users of FitnEarn in India
    //         above 18 years of age only.
    //         <br />
    //         <br />
    //         5. FitnEarn Coin&quot;s System is for individuals only - it is not
    //         open to corporates or companies.
    //         <br />
    //         <br />
    //         6. Registration on FitnEarn product must be in the applicant&quot;s
    //         full name and mobile number is mandatory. Only one registration per
    //         individual will be acknowledged.
    //         <br />
    //         <br />
    //         7. FitnEarn Coin balance is not transferable. The person named in
    //         database must be present at the time of purchase to be eligible for
    //         FitnEarn Coins available as per the System.
    //         <br />
    //         <br />
    //         8. Misuse of FitnEarn Coin&quot;s or other System benefits may
    //         result in termination of membership or withdrawal of benefits at the
    //         sole discretion of FitnEarn.
    //         <br />
    //         <br />
    //         9. No accumulation or redemption of FitnEarn Coins will be
    //         permissible if, on relevant date, the FitnEarn Account has been
    //         deleted or is liable to be deleted or if the account of the User is
    //         a defaulted account or if there is any breach of any clause of these
    //         Terms and Conditions.
    //         <br />
    //         <br />
    //         10. The FitnEarn Coin&quot;s System is valid for use during the
    //         course of FitnEarn Coin&quot;s System.
    //         <br />
    //         <br />
    //         11. FitnEarn reserves the right to refuse FitnEarn Coin&quot;s
    //         System to an applicant without assigning any reason whatsoever.
    //         <br />
    //         <br />
    //         12. FitnEarn may suspend or terminate the Refer and Earn program or
    //         any user&quot;s ability to participate in the program at any time
    //         for any reason at their sole discretion.
    //         <br />
    //         <br />
    //         13. Usage conditions of FitnEarn Coins may change at the discretion
    //         of FitnEarn, at any
    //         <br />
    //         point in time.
    //         <br />
    //         <br />
    //         FitnEarn reserves the right to amend these terms and conditions at
    //         any time without any prior notice. Modifications of these terms will
    //         be effective from the time they are updated in the Terms and
    //         Conditions section.
    //         <br />
    //         <br />A product purchased by redemption of FitnEarnCoins from
    //         FitnEarn store is governed by and subject to the applicable Seller
    //         policies, including applicable exchange and shipping policies. You
    //         agree that we are neither the agents of any seller or manufacturer
    //         of the products and hence the products quality offered are not under
    //         our control. Accordingly, we do not assume any liability, obligation
    //         or responsibility for any part/complete product. Due diligence must
    //         be done at your end before purchasing any product either by Fitnearn
    //         coins or directly by cash.
    //         <br />
    //         <br />
    //         <br />
    //         Earning FitnEarn Coins
    //         <br />A user can earn FitnEarn Coins by-
    //         <br />
    //         <br />
    //         a. Performing/Watching any exercise video associated with Mood-Board
    //         Challenges.
    //         <br />
    //         <br />
    //         b. Refeferring and registering new users on FitnEarn only on
    //         completion of task associated with referral.
    //         <br />
    //         <br />
    //         c. Performing/Walking daily steps (tracking of the same is done by
    //         Google Fit SDKs & APIs) limiting up to 10000 for non premium users
    //         and 20000 for premium users.
    //         <br />
    //         <br />
    //         <br />
    //         d. Participating in a Step, Exercise or Meditation Challenge on
    //         FitnEarn Challenge Board.
    //         <br />
    //         <br />
    //         e. On purchase of a premium subscription plans on FitnEarn.
    //         <br />
    //         <br />
    //         f. Performing/Watching any exercise video associated with Workout
    //         plans. This is available for premium users of FitnEarn.
    //         <br />
    //         <br />
    //         NOTE:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         FitnEarn coins cannot be purchased by users including by payment of
    //         cash.
    //         <br />
    //         FitnEarn coins are rewards awarded to users of the app which can be
    //         redeemed for products listed on FitnEarn store.
    //         <br />
    //         FitnEarn Coins can be exchanged with the FitnEarn Cashback Gift
    //         Rewards.
    //         <br />
    //         The receipt of FitnEarn coins or it’s redemption by the end user
    //         should not be linked to money paid for the purchase of services on
    //         the Platform.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         THE COMPANY HEREBY CLARIFIES THAT FITNEARN COINS ARE BEING GRANTED
    //         BY US AT OUR DISCRETION ONLY.
    //         <br />
    //         <br />
    //         By referring FitnEarn to your friends, both user and users friend
    //         will receive 10 FitnEarn Coins each upon successful registration by
    //         users friend on FitnEarn and completion of the task associated with
    //         the referral. Users friend must not have installed the FitnEarn app
    //         on any of their devices before. The Email ID and/or phone number
    //         through which the friend signs up with FitnEarnapp, must not have
    //         been used for signing up with FitnEarn earlier. The mobile number
    //         provided by the friend to receive the OTP must not have been used to
    //         sign up earlier. The device on which the users friend downloads the
    //         FitnEarnapp should not be rooted or jail-broken. FitnEarn app should
    //         not be installed using App runtime for Chrome, emulators or
    //         simulators.
    //         <br />
    //         <br />
    //         If your friends use someone else&quot;s referral link, the person
    //         whose link was used first to download the FitnEarn App would get
    //         benefits, even though you had referred them first. The first link
    //         used to install the app by your friend would be considered for the
    //         referral FitnEarn Coins. FitnEarn reserves all rights to change the
    //         amounts conferred under the Refer and Earn program at any point in
    //         time.
    //         <br />
    //         <br />
    //         Your unique referral links/code should only be used for personal and
    //         non-commercial purposes. You cannot distribute/publish your unique
    //         referral link/code where there is no reasonable basis for believing
    //         that most of the recipients are personal friends (such as coupon
    //         websites, forums, Wikipedia etc.).
    //         <br />
    //         <br />
    //         Users can refer to any number of people.FitnEarn Coins can only be
    //         earned through the use of FitnEarn App or Website only.
    //         <br />
    //         <br />
    //         Depending on the coins associated to the particular exercise you
    //         complete from Mood-board Challenges, Workout Plans Exercises, Step,
    //         Exercise and Meditation Challenges Exercises as on date, a certain
    //         amount of FitnEarn Coins will be credited to the users FitnEarn
    //         account. FitnEarn Coins earned by a user will be credited to the
    //         user account within the next 24 hours.
    //         <br />
    //         <br />
    //         FitnEarn Coins cannot be transferred to your bank account.
    //         Additionally, FitnEarn Coins across multiple accounts cannot be
    //         combined into a single account. FitnEarn Coins cannot be exchanged
    //         for any currency outside FitnEarn. Users can exchange the FitnEarn
    //         coins to FitnEarn Cashback Gift Rewards after reaching milestones
    //         time to time. The gift cashback rewards will be provided to the user
    //         within 3-5 business days after reaching a particular FitnEarn Coin
    //         milestone and submission of Cashback Gift Card form on FitnEarn
    //         App/Website. The exchange/conversion rate of FitnEarn coins with
    //         FitnEarn Cashback Gift card is solely at discretion of FitnEarn. We
    //         value everyone effort and thus reward user on completion of
    //         exercises and activities to keep them motivated on the path of
    //         fitness and overall well-being.
    //         <br />
    //         <br />
    //         <br />
    //         <br />
    //         <br />
    //         No two offers or discounts available can be clubbed together unless
    //         specified otherwise.
    //         <br />
    //         <br />
    //         <br />
    //         FITNEARN COINS EARNED AS A RESULT OF FRAUDULENT ACTIVITIES WILL BE
    //         REVOKED AND DEEMED INVALID.
    //         <br />
    //         <br />
    //         In case the FitnEarn Coins are not credited to your account, please
    //         write to “help-support@fitnearn.com”.
    //         <br />
    //         <br />
    //         Redemption of FitnEarn Coins
    //         <br />
    //         <br />
    //         For the purpose of redemption, 10 (Ten) FitnEarn Coin will be equal
    //         in value to Rs.1 (Rupee One) as the base value initially, which is
    //         subject to change based on the contribution of the users which will
    //         affect the exchange rate on the FitnEarn App or Website. However,
    //         FitnEarn reserves the right to modify the formula used for
    //         calculating the exchange rate/value of the FitnEarn Coins.
    //         <br />
    //         <br />
    //         FitnEarn Coins can be redeemed on purchase of any product or service
    //         from the FitnEarn Store available on FitnEarn App or Website.
    //         <br />
    //         <br />
    //         <br />
    //         When you make a purchase using FitnEarn Coins balance, in the event
    //         of a cancellation request of the purchase, the FitnEarn Coins used
    //         will not be credited back to your FitnEarn Coin balance.
    //         <br />
    //         <br />
    //         On redemption, the FitnEarn Coins so redeemed would be automatically
    //         subtracted from the accumulated FitnEarn Coins in your FitnEarn
    //         Account. Similarly, on exchange of FitnEarn coins to FitnEarn
    //         Cashback Gift Rewards and the cashback rewards have been redeemed or
    //         utilised by the user it would automatically subtract from the
    //         accumulated FitnEarn Cashback Gift Rewards.
    //         <br />
    //         <br />
    //         FitnEarn Store
    //         <br />
    //         <br />
    //         All Products listed for sale at the FitnEarn Store are subject to
    //         availability and restrictions at the time of purchase. The Products
    //         listed in the FitnEarn are subject to change without any prior
    //         notice.
    //         <br />
    //         <br />
    //         Products listed on FitnEarn Store are meant for end-consumers only
    //         (and not resale). We may refuse to service your order if we suspect
    //         that you are buying Products for resale.
    //         <br />
    //         <br />
    //         FitnEarn may cancel or refuse your order, or limit the quantity of
    //         Products stated in your order, at its sole discretion. FitnEarn may
    //         also require further information from you before confirming or
    //         processing your order.
    //         <br />
    //         <br />
    //         The price of products is displayed in Indian Rupees. It may exclude
    //         delivery charges, postage and handling charges, conveyance charges,
    //         and/or applicable taxes. However, the total price of Products
    //         (including voluntary and involuntary charges) will be shown to you
    //         and your consent will be taken before confirming any order.
    //         <br />
    //         <br />
    //         We endeavour to deliver purchased Products to you as soon as
    //         possible, as per the indicative delivery schedule shown on our
    //         Mobile Application/Website.
    //         <br />
    //         <br />
    //         However, the actual delivery times may vary, and depend on many
    //         factors beyond our control (like area/PIN code of delivery,
    //         processing of shipments by our logistics vendors, availability of
    //         transport services, or any other factors not within our control). We
    //         assume no liability if Products are delivered after the indicative
    //         delivery schedule.
    //         <br />
    //         <br />
    //         Title in Products bought from the FitnEarn Store will pass to you
    //         upon delivery of the Products to our transport carrier. However, the
    //         risk of loss or damage to Products will pass to you upon delivery of
    //         the Products at your submitted address.
    //         <br />
    //         <br />
    //         FitnEarn does not accept liability for damage to persons or property
    //         whatsoever caused in relation to Products bought by FitnEarn Users
    //         through FitnEarn Store.
    //         <br />
    //         <br />
    //         FitnEarn will not be liable or responsible for the Products offered
    //         through the FitnEarn Store and FitnEarn gives no warranty (whether
    //         express or implied) or representation either express or implied with
    //         respect to type, quality or fitness of goods acquired or their
    //         suitability for any purpose, whatsoever.
    //         <br />
    //         <br />
    //         If a Product delivered to you has obvious damage upon receipt, or is
    //         not the Product you ordered, you can request an exchange/replacement
    //         from FitnEarn, as long as you make your request within 7 working
    //         days of the date of receipt of the Product. We may contact you to
    //         confirm Product damage or to identify the Product delivered to you,
    //         before confirming an exchange/replacement. Please ensure that you
    //         retain Products in original condition, the Product packaging, price
    //         tags, supporting accessories and information booklets/brochure, to
    //         allow us to process an exchange/replacement.
    //         <br />
    //         <br />
    //         You are responsible for determining if the Product you purchase is
    //         compatible with other equipment (if such other equipment is
    //         required). You acknowledge that an absence of compatibility is not a
    //         defect in the Product permitting you to exchange/return it.
    //         <br />
    //         <br />
    //         Any images displayed on the FitnEarn Store for Products are for
    //         illustrative purposes
    //         <br />
    //         only. Characteristics of actual Products may vary.
    //         <br />
    //         <br />
    //         FEES AND PAYMENT
    //         <br />
    //         We accept the following forms of payment:
    //         <br />
    //         <br />
    //         Credit Card
    //         <br />
    //         Debit Card
    //         <br />
    //         Net Banking
    //         <br />
    //         Mobile Wallet
    //         <br />
    //         UPI
    //         <br />
    //         <br />
    //         You may be required to purchase or pay a fee to access some of our
    //         services. You agree to provide current, complete, and accurate
    //         purchase and account information for all purchases made via the
    //         Website/Mobile Application. You further agree to update your account
    //         promptly and payment information, including email address, payment
    //         method, and payment card expiration date, so that we can complete
    //         your transactions and contact you as needed. We bill you through an
    //         online billing account for purchases made via the Website/Mobile
    //         Application. GST will be added to the price of purchases as deemed
    //         required by us. We may change prices at any time. All payments shall
    //         be in Indian National Rupees.
    //         <br />
    //         <br />
    //         You agree to pay all charges or fees at the prices then in effect
    //         for your purchases and you authorise us to charge your chosen
    //         payment provider for any such amounts upon making your purchase.
    //         <br />
    //         <br />
    //         We reserve the right to correct any errors or mistakes in pricing,
    //         even if we have already requested or received payment. We also
    //         reserve the right to refuse any order placed through the
    //         Website/Mobile Application.
    //         <br />
    //         <br />
    //         We use advanced encryption technology, consistent with industry
    //         practice, to protect your payment information. All payments on the
    //         Platform are processed through secure and trusted payment gateways,
    //         managed by leading banks or service providers. We understand that
    //         banks use the 3D secure password service for online transactions,
    //         adding another security layer.
    //         <br />
    //         <br />
    //         Any accepted refunds/chargebacks will be routed back to the payer
    //         using the same mechanism by which payment was made. For example, an
    //         accepted refund for a payment made through a debit card, will be
    //         routed back to the debit card holder’s bank account.
    //         <br />
    //         <br />
    //         Subscription (To access certain premium features by User):
    //         Subscription is automatically renewed at the end of each
    //         Subscription Period unless you cancel it at least 24 hours before
    //         the expiry of the current Subscription Period. If you do not cancel
    //         the Subscription at least 24 hours before the expiry of the current
    //         Subscription Period, the Subscription fees for the next
    //         Subscription. Period will be taken during the 24 hours before the
    //         expiry of the current Subscription Period.
    //         <br />
    //         If a Subscription fee cannot be taken due to the absence of monetary
    //         funds, invalidity of credit card or for any other reasons, the
    //         Subscription will not automatically end. The Subscription will
    //         automatically restart as soon as valid payment details are provided.
    //         Cancellation of a Subscription can only be done at your manual
    //         request. Please see the section below &quot;How can I cancel a
    //         Subscription&quot; for further details.
    //         <br />
    //         <br />
    //         CANCELLATION
    //         <br />
    //         <br />
    //         You can manage and cancel your subscriptions at any time in the
    //         Account Settings of your device. For iOS subscriptions, please see
    //         Apple&quot;s support page at https://support.apple.com. For Google
    //         Play subscriptions, please see Google Play&quot;s support page
    //         at https://support.google.com/googleplay.
    //         <br />
    //         <br />
    //         FitnEarn may terminate your account at any time without notice if it
    //         believes that you have violated this terms of use. Upon such
    //         termination, you will not be entitled to any refund for purchases.
    //         <br />
    //         <br />
    //         All payment, billing and transaction processes are handled by the
    //         relevant third-party distributor or platform such as Apple&quot;s
    //         App Store or Google&quot;s Google Play. For any payment related
    //         issues, you may contact such distributors directly. For any other
    //         issues, please write to us at help-support@fitnearn.com.
    //         <br />
    //         <br />
    //         There are no refunds on subscription after the 7-Day free trial.
    //         Users can stop the subscription for subsequent months without
    //         penalties.
    //         <br />
    //         <br />
    //         ECOMMERCE TERMS
    //         <br />
    //         <br />
    //         If a product delivered to you has obvious damage upon receipt, or is
    //         not the Product you ordered, you can request an exchange/replacement
    //         from FitnEarn, as long as you make your request within 7 working
    //         days of the date of receipt of the Product. We may contact you to
    //         confirm Product damage or to identify the Product delivered to you,
    //         before confirming an exchange/replacement. Please ensure that you
    //         retain Products in original condition, the Product packaging, price
    //         tags, supporting accessories and information booklets/brochure, to
    //         allow us to process an exchange/replacement. However, you may have
    //         to bear shipping charges, packaging charges, and/or applicable
    //         taxes, in respect of exchanged/replaced Products.
    //         <br />
    //         <br />
    //         If you are unsatisfied with our services, or would like to request a
    //         return/refund, please email us at help-support@fitnearn.com or call
    //         us at +91-8630222654.
    //         <br />
    //         <br />
    //         IN ADDITION TO TERMS AND CONDITIONS STIPULATED FOR ECOMMERCE TERMS
    //         KINDLY REFER THE RETURN AND REFUND POLICY OF FITNEARN AVAILABLE ON
    //         APP/WEBSITE.
    //         <br />
    //         <br />
    //         COMMUNITY STANDARDS AND CONDUCT GUIDELINES
    //         <br />
    //         <br />
    //         You may not access or use the Services for any purpose other than
    //         that for which we make the Services available. The Services may not
    //         be used concerning any commercial endeavours except those that are
    //         specifically endorsed or approved by us.
    //         <br />
    //         <br />
    //         As a user of the FitnEarn Services, you adhere and agree not to:
    //         <br />
    //         <br />
    //         1.Systematically retrieve data or other content from the
    //         Website/Mobile Application to create or compile, directly or
    //         indirectly, a collection, compilation, database, or directory
    //         without written permission from us.
    //         <br />
    //         <br />
    //         2.Make any unauthorized use of the Website/Mobile Application,
    //         including collecting usernames and/or email addresses of users by
    //         electronic or other means for the purpose of sending unsolicited
    //         email, or creating user accounts by automated means or under false
    //         pretences.
    //         <br />
    //         <br />
    //         3.Use a buying agent or purchasing agent to make purchases on the
    //         Website/Mobile Application.
    //         <br />
    //         <br />
    //         4.Use the Website/Mobile Application to advertise or offer to sell
    //         goods and services.
    //         <br />
    //         <br />
    //         5.Circumvent, disable, or otherwise interfere with security-related
    //         features of the Website/Mobile Application, including features that
    //         prevent or restrict the use or copying of any Content or enforce
    //         limitations on the use of the Website/Mobile Application and/or the
    //         Content contained therein.
    //         <br />
    //         <br />
    //         6.Engage in unauthorized framing of or linking to the Website/Mobile
    //         Application.
    //         <br />
    //         <br />
    //         7.Trick, defraud, or mislead us and other users, especially in any
    //         attempt to learn sensitive account information such as user
    //         passwords.
    //         <br />
    //         <br />
    //         8.Trick, defraud, or mislead us by earning Fitnearn coins with
    //         falsified methods or by using system bots, software etc.
    //         <br />
    //         <br />
    //         9.Make improper use of our support services or submit false reports
    //         of abuse or misconduct.
    //         <br />
    //         <br />
    //         10.Engage in any automated use of the system, such as using scripts
    //         to send comments or messages, or using any data mining, robots, or
    //         similar data gathering and extraction tools.
    //         <br />
    //         <br />
    //         11.Interfere with, disrupt, or create an undue burden on the
    //         Website/Mobile Application or the networks or services connected to
    //         the Website/Mobile Application.
    //         <br />
    //         <br />
    //         12.Attempt to impersonate another user or person or use the username
    //         of another user.
    //         <br />
    //         <br />
    //         13.Sell or otherwise transfer your profile.
    //         <br />
    //         <br />
    //         14.Use any information obtained from the Website/Mobile Application
    //         in order to harass, abuse, or harm another person.
    //         <br />
    //         <br />
    //         15.“Stalk” or otherwise harass another user or employee of the
    //         Services.
    //         <br />
    //         <br />
    //         16.Access or attempt to access another user’s account without his or
    //         her consent.
    //         <br />
    //         <br />
    //         17.Use the Website/Mobile Application as part of any effort to
    //         compete with us or otherwise use the Website/Mobile Application
    //         and/or the Content for any revenue-generating endeavour or
    //         commercial enterprise.
    //         <br />
    //         <br />
    //         18.Decipher, decompile, disassemble, or reverse engineer any of the
    //         software comprising or in anyway making up a part of the
    //         Website/Mobile Application.
    //         <br />
    //         <br />
    //         19.Attempt to bypass any measures of the Website/Mobile Application
    //         designed to prevent or restrict access to the Website/Mobile
    //         Application, or any portion of the Website/Mobile Application.
    //         <br />
    //         <br />
    //         20.Harass, annoy, intimidate, or threaten any of our employees or
    //         agents engaged in providing any portion of the Website/Mobile
    //         Application to you.
    //         <br />
    //         <br />
    //         21.Delete the copyright or other proprietary rights notice from any
    //         Content.
    //         <br />
    //         <br />
    //         22.Copy or adapt the Website/Mobile Application software, including
    //         but not limited to Flash, PHP, HTML, JavaScript, Angular or any
    //         other code.
    //         <br />
    //         <br />
    //         23. Upload or transmit (or attempt to upload or to transmit)
    //         viruses, Trojan horses, or other material, including excessive use
    //         of capital letters and spamming (continuous posting of repetitive
    //         text), that interferes with any party’s uninterrupted use and
    //         enjoyment of the Website/Mobile Application or modifies, impairs,
    //         disrupts, alters, or interferes with the use, features, functions,
    //         operation, or maintenance of the Website/Mobile Application.
    //         <br />
    //         <br />
    //         24.Upload or transmit (or attempt to upload or to transmit) any
    //         material that acts as a passive or active information collection or
    //         transmission mechanism, including without limitation, clear graphics
    //         interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or
    //         other similar devices (sometimes referred to as “spyware” or
    //         “passive collection mechanisms” or “pcms”).
    //         <br />
    //         <br />
    //         25.Except as may be the result of a standard search engine or
    //         Internet browser usage, use, launch, develop, or distribute any
    //         automated system, including without limitation, any spider, robot,
    //         cheat utility, scraper, or offline reader that accesses the
    //         Website/Mobile Application, or using or launching any unauthorized
    //         script or other software.
    //         <br />
    //         <br />
    //         26.Disparage, tarnish, or otherwise harm, in our opinion, us and/or
    //         the Website/Mobile Application.
    //         <br />
    //         <br />
    //         27.Use the Website/Mobile Application in a manner inconsistent with
    //         any applicable laws or regulations.
    //         <br />
    //         <br />
    //         28.Your privilege to use the Services depends on your compliance
    //         with the community standards and conduct guidelines set forth above.
    //         We may revoke your privileges to use all or a portion of the
    //         Services and/or take any other appropriate measures to enforce these
    //         community standards and conduct guidelines if violations are brought
    //         to our attention. Further, if you fail to adhere to our community
    //         standards and conduct guidelines, or any part of these Terms &
    //         Conditions, we may terminate, in our sole discretion, your use of,
    //         or participation in, any Public Forum or the Services. Any violation
    //         of this section may subject you to civil and/or criminal liability.
    //         <br />
    //         <br />
    //         YOU AGREE AND UNDERSTAND THAT YOU MAY BE HELD LEGALLY RESPONSIBLE
    //         FOR DAMAGES SUFFERED BY OTHER MEMBERS OR THIRD PARTIES AS THE RESULT
    //         OF YOUR REMARKS, INFORMATION, FEEDBACK OR OTHER CONTENT POSTED OR
    //         MADE AVAILABLE ON THE SERVICES (INCLUDING ANY FORUM) THAT IS DEEMED
    //         DEFAMATORY OR OTHERWISE LEGALLY ACTIONABLE. UNDER SECTION 79 OF THE
    //         INFORMATION TECHNOLOGY AMENDMENT ACT, 2008, FITNEARN IS NOT LEGALLY
    //         RESPONSIBLE, NOR CAN IT BE HELD LIABLE FOR DAMAGES OF ANY KIND,
    //         ARISING OUT OF OR IN CONNECTION TO ANY DEFAMATORY OR OTHERWISE
    //         LEGALLY ACTIONABLE REMARKS, INFORMATION, FEEDBACK OR OTHER CONTENT
    //         POSTED OR MADE AVAILABLE ON THE SERVICES.
    //         <br />
    //         <br />
    //         ANTI HARRASMENT POLICY
    //         <br />
    //         <br />
    //         FitnEarn is committed to creating a safe and inclusive environment
    //         for all users. Harassment in any form is strictly prohibited on our
    //         platform, to ensure a welcoming and positive experience for everyone
    //         in our community. This policy applies equally to all users,
    //         protecting both public figures and private individuals from
    //         harassment and abuse. We encourage the use of FitnEarns reporting
    //         tools to help safeguard our community against such behaviour.
    //         Violations of this policy will lead to immediate exclusion from the
    //         FitnEarn community and termination of the offenders account.
    //         <br />
    //         Prohibited Behaviours Include:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Persistently contacting someone who has made it clear they do not
    //         wish to communicate.
    //         <br />
    //         Sending unsolicited messages to a large number of users.
    //         <br />
    //         Engaging in or promoting:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Use of profane language targeted at individuals or groups.
    //         <br />
    //         Threats of death, serious illness, injury, or causing physical harm.
    //         <br />
    //         Bullying, trolling, or any form of harassment intended to
    //         intimidate, upset, or embarrass.
    //         <br />
    //         Spreading falsehoods about victims of tragic events or their
    //         families to discredit or harm their reputation.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Group messages that harass, intimidate, or aim to distress.
    //         <br />
    //         Maliciously targeting individuals, including public figures,
    //         especially those who have been victims of sexual assault or
    //         exploitation by:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Threatening violence to silence or intimidate participants in
    //         any  discussion.
    //         <br />
    //         Encouraging self-harm or suicide.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Falsely accusing individuals, including victims or survivors of
    //         tragedies, of lying or fabricating their experiences.
    //         <br />
    //         Directing harassment towards minors, including but not limited to:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Suggestive claims regarding sexual activities or diseases.
    //         <br />
    //         Altering content to include violent imagery.
    //         <br />
    //         Threats of serious illness, death, or violence.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Creating content specifically designed to demean, insult, or harm
    //         individuals through:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Offensive language.
    //         <br />
    //         Derogatory physical descriptions.
    //         <br />
    //         Accusations of blasphemy.
    //         <br />
    //         Expressions of contempt or disgust.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Enforcement
    //         <br />
    //         FitnEarn takes these policies seriously and will take immediate
    //         action against those found in breach. Our goal is to maintain a safe
    //         space for dialogue, growth, and connection within the fitness and
    //         wellness community. We reserve the right to remove any content that
    //         violates these guidelines and to take appropriate measures,
    //         including account termination, against those responsible for such
    //         violations.
    //         <br />
    //         FITNEARN COMMUNITY/SOCIAL CONTRIBUTIONS POLICY
    //         <br />
    //         FitnEarn provides interactive spaces such as forums, blogs, chat
    //         rooms, groups, and messaging features (collectively,
    //         “Community/Social Features”) as part of our Services. These are
    //         designed to allow you to upload, share, post, or otherwise exchange
    //         content and information with other users. All interactions within
    //         these Community Features are public and not private. You bear sole
    //         responsibility for the content you share (&quot;User
    //         Contributions&quot;) and the consequences thereof.
    //         <br />
    //         Contributions on the Platform
    //         <br />
    //         Through the FitnEarn platform, you are encouraged to engage, share,
    //         and contribute by posting, transmitting, or submitting various forms
    //         of content, including texts, videos, photos, graphics, and personal
    //         insights (collectively, &quot;Contributions&quot;). These
    //         Contributions may be accessible to other platform users and possibly
    //         through external sites. By sharing Contributions, you accept that
    //         they are considered non-confidential and non-proprietary.
    //         <br />
    //         By providing contributions, you affirm that:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Your Contributions do not infringe upon any rights, such as
    //         copyright, patents, trademarks, trade secrets, or moral rights of
    //         any third party.
    //         <br />
    //         You possess or have obtained all necessary permissions, rights, and
    //         consents to allow your Contributions to be used on the FitnEarn
    //         platform as envisioned by these terms.
    //         <br />
    //         All individuals identifiable in your Contributions have given their
    //         consent for their likeness to be used in the manner intended by the
    //         platform.
    //         <br />
    //         The information and content in your Contributions are accurate and
    //         truthful.
    //         <br />
    //         Your Contributions are not promotional spam, unsolicited schemes, or
    //         any form of solicitation.
    //         <br />
    //         You refrain from posting content that is obscene, offensive,
    //         harassing, or otherwise objectionable as deemed by FitnEarn.
    //         <br />
    //         You do not engage in behaviour or share content that demeans, mocks,
    //         or threatens others.
    //         <br />
    //         Your Contributions do not promote violence or illegal acts, nor do
    //         they incite harm against individuals or entities.
    //         <br />
    //         You ensure your Contributions comply with all relevant laws and do
    //         not breach any regulations or rules.
    //         <br />
    //         Your Contributions respect the privacy and publicity rights of
    //         others and do not exploit individuals under the age of 18 in anyway.
    //         <br />
    //         You avoid sharing content that could be considered child pornography
    //         or that harms minors in anyway.
    //         <br />
    //         Your Contributions are free from discriminatory or offensive remarks
    //         related to race, national origin, gender, sexual preference, or
    //         physical disabilities.
    //         <br />
    //         You ensure your Contributions do not contravene these Terms and
    //         Conditions or any applicable laws.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Consequences of Violations
    //         <br />
    //         Failure to adhere to these guidelines may lead to actions including
    //         but not limited to the removal of your contributions, suspension of
    //         your access to social/community Features, or termination of your
    //         FitnEarn account. FitnEarn reserves the right to enforce these
    //         policies at its discretion to maintain a respectful and safe
    //         community environment.
    //         <br />
    //         FITNEARN DOES NOT REPRESENT, WARRANT OR GUARANTEE THE ACCURACY OF
    //         INFORMATION POSTED BY ANY USER, AND HEREBY DISCLAIMS ALL
    //         RESPONSIBILITY AND LIABILITY FOR ANY INFORMATION PROVIDED BY USER IN
    //         CONNECTION WITH THEIR USE OF THE SERVICES.
    //         <br />
    //         FITNEARN MOBILE APPLICATION LICENSE AGREEMENT
    //         <br />
    //         License for Use
    //         <br />
    //         By downloading the FitnEarn mobile application, you are granted a
    //         revocable, non-exclusive, non-transferable, limited license to
    //         install and operate the application on mobile devices that you own
    //         or control. This license is granted solely for your personal,
    //         non-commercial use, strictly in accordance with the terms outlined
    //         in this agreement.
    //         <br />
    //         Prohibited Actions
    //         <br />
    //         As a user of the FitnEarn application, you agree not to:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Decompile, reverse engineer, disassemble, or attempt to discover the
    //         source code or decrypt the application.
    //         <br />
    //         Modify, adapt, enhance, translate, or create derivative works from
    //         the application without prior written permission.
    //         <br />
    //         Violate any laws, regulations, or rules in your use of the
    //         application.
    //         <br />
    //         Remove, conceal, or alter any proprietary notices, including
    //         copyright and trademark notices, related to the application.
    //         <br />
    //         Utilize the application for any revenue-generating or commercial
    //         activities not expressly permitted by this license.
    //         <br />
    //         Distribute the application across a network where it could be used
    //         by multiple devices simultaneously.
    //         <br />
    //         Develop, produce, or distribute any service or product that competes
    //         with or replaces the FitnEarn application.
    //         <br />
    //         Use the application to send automated queries or unsolicited
    //         commercial communications.
    //         <br />
    //         Employ any proprietary information, interfaces, or other
    //         intellectual property of FitnEarn in the creation of any software or
    //         hardware accessories for use with the application.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Use on Apple and Android Devices
    //         <br />
    //         This license extends to the use of the FitnEarn application obtained
    //         via the Apple App Store or Google Play Store (&quot;App
    //         Distributors&quot;) under these conditions:
    //         <br />
    //         The license granted hereunder is limited to a non-transferable
    //         license to use the application on Apple iOS or Android-operated
    //         devices, according to the usage rules specified in the service terms
    //         of the App Distributors.
    //         <br />
    //         FitnEarn is responsible for all maintenance and support services for
    //         the mobile application as required by these terms or applicable
    //         laws. Each App Distributor is not obligated to offer maintenance or
    //         support services for the application.
    //         <br />
    //         Should the application fail to comply with any applicable warranty,
    //         you may inform the respective App Distributor, and they may refund
    //         the purchase price of the application per their policies. App
    //         Distributors have no other warranty obligations concerning the
    //         application.
    //         <br />
    //         You confirm that:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         You are not located in a country under embargo by the Indian
    //         government or labelled as a &quot;terrorist supporting&quot;
    //         country.
    //         <br />
    //         You are not on any Indian government list of banned or restricted
    //         parties.
    //         <br />
    //         You agree to comply with all third-party terms when using the
    //         application. For example, using the application must not breach any
    //         VoIP service agreement.
    //         <br />
    //         You acknowledge that App Distributors are third-party beneficiaries
    //         of this license agreement and have the right to enforce these terms
    //         against you.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         BY USING THE FITNEARN MOBILE APPLICATION, YOU ACCEPT AND AGREE TO BE
    //         BOUND BY THE TERMS OF THIS LICENSE AGREEMENT.
    //         <br />
    //         FITNEARN SOCIAL MEDIA INTEGRATION POLICY
    //         <br />
    //         Integration with Third-Party Social Media Accounts
    //         <br />
    //         FitnEarn offers enhanced functionality by allowing you to link your
    //         account with external third-party service providers (referred to as
    //         &quot;Third-Party Accounts&quot;). This can be done in two ways:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         By directly providing your Third-Party Account credentials to
    //         FitnEarn through our platform.
    //         <br />
    //         By authorising FitnEarn to access your Third-Party Accounts
    //         according to the terms and conditions governing those accounts.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         By linking your Third-Party Accounts, you affirm that you have the
    //         right to share your login details with us and allow us access
    //         without violating any terms of those accounts or incurring
    //         additional fees or limitations from the third-party providers.
    //         <br />
    //         Access and Use of Social Network Content
    //         <br />
    //         Upon linking your Third-Party Accounts:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         FitnEarn may access, display, and store content you have saved on
    //         your Third-Party Accounts (referred to as &quot;Social Network
    //         Content&quot;) to enhance your experience on our platform. This
    //         includes but is not limited to friend lists and shared content.
    //         <br />
    //         We might also receive and transmit additional information from your
    //         Third-Party Accounts, as notified by those services. The visibility
    //         of your personal information from Third-Party Accounts on FitnEarn
    //         is subject to your privacy settings on those external platforms.
    //         <br />
    //         Should a Third-Party Account become inaccessible or our access be
    //         revoked, the associated Social Network Content may no longer be
    //         available on FitnEarn. However, you can manage or sever the
    //         connection between your FitnEarn account and Third-Party Accounts at
    //         any time.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Important Considerations
    //         <br />
    //         Your relationship with any Third-Party Account providers is governed
    //         solely by your agreement with them. FitnEarn does not review Social
    //         Network Content for accuracy, legality, or adherence to copyright
    //         laws, and is not responsible for the content shared through these
    //         integrations.
    //         <br />
    //         You agree that FitnEarn may access your contact lists or email
    //         address books linked to Third-Party Accounts solely to identify and
    //         notify you of contacts who are also users of FitnEarn. To disconnect
    //         your FitnEarn account from Third-Party Accounts, you may use the
    //         provided contact methods or adjust your account settings
    //         accordingly. We aim to remove any data received through Third-Party
    //         Accounts from our servers upon disconnection, except for data such
    //         as usernames and profile pictures that have become associated with
    //         your FitnEarn account.
    //         <br />
    //         By utilizing the social media integration features of FitnEarn, you
    //         acknowledge and consent to these terms, enhancing your connectivity
    //         and experience within our platform.
    //         <br /> <br />
    //         THIRD PARTY WEBSITES AND CONTENT
    //         <br />
    //         The FitnEarn platform may feature links to external websites
    //         (&quot;Third-Party Websites&quot;) and include or offer access to
    //         content such as articles, photos, text, graphics, music, videos,
    //         apps, and other materials created by third parties
    //         (&quot;Third-Party Content&quot;). Please note, FitnEarn does not
    //         conduct thorough reviews, monitoring, or checks on the accuracy,
    //         suitability, or completeness of any Third-Party Websites or
    //         Third-Party Content. As such, we cannot be held accountable for the
    //         content, quality, or policies of any Third-Party Websites or
    //         Third-Party Content accessed via our platform.
    //         <br />
    //         Disclaimer
    //         <br />
    //         The presence of links to Third-Party Websites or the inclusion of
    //         Third-Party Content on the FitnEarn platform does not imply our
    //         endorsement or approval. Deciding to engage with any Third-Party
    //         Websites or Third-Party Content is at your discretion and risk. Once
    //         you leave the FitnEarn platform, our Terms and Conditions no longer
    //         apply, and you are advised to review the terms, privacy policies,
    //         and practices of any Third-Party Websites you visit or from which
    //         you download or use content.
    //         <br />
    //         Purchases and Interactions with Third-Party Websites
    //         <br />
    //         Any transactions or interactions you engage in with Third-Party
    //         Websites, including purchases, are strictly between you and the
    //         respective third party. FitnEarn assumes no responsibility for such
    //         transactions or interactions. It is your responsibility to ensure
    //         that any products, services, or information obtained from
    //         Third-Party Websites meet your expectations and comply with the
    //         relevant terms of sale or service.
    //         <br />
    //         Indemnity
    //         <br />
    //         You agree to absolve FitnEarn from any responsibility for losses or
    //         damages you may incur due to, your use of Third-Party Content or
    //         interactions with Third-Party Websites. This includes holding
    //         FitnEarn harmless against any claims related to the products or
    //         services offered or advertised on these external sites.
    //         <br />
    //         BY USING THE FITNEARN PLATFORM, YOU ACKNOWLEDGE AND ACCEPT THIS
    //         POLICY REGARDING THIRD-PARTY WEBSITES AND THIRD-PARTY CONTENT,
    //         RECOGNIZING THAT YOUR USE OF SUCH EXTERNAL RESOURCES IS GOVERNED BY
    //         THEIR RESPECTIVE TERMS AND NOT BY FITNEARN’S POLICIES.
    //         <br />
    //         FITNEARN PLATFORM MANAGEMENT AND OPERATIONS POLICY
    //         <br />
    //         Platform Oversight and Enforcement
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         FitnEarn asserts the right, though not the obligation, to:
    //         <br />
    //         Actively monitor the platform for any breaches of our Terms and
    //         Conditions.
    //         <br />
    //         Undertake suitable legal measures against anyone found infringing
    //         these terms or the law, which may include reporting offenders to law
    //         enforcement authorities.
    //         <br />
    //         At our discretion, limit, restrict, or remove user contributions
    //         that violate our guidelines or pose a burden on our systems, without
    //         prior notice or liability.
    //         <br />
    //         Manage and curate the content on the platform to ensure it aligns
    //         with our operational standards and does not overwhelm our
    //         technological capacities.
    //         <br />
    //         Operate the platform in a way that safeguards our rights and
    //         properties while ensuring its smooth and efficient function.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Modifications, Pauses, and Service Interruptions
    //         <br />
    //         FitnEarn reserves the complete authority to:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Alter, omit, or update any content on the platform whenever
    //         necessary, without prior notification. Our commitment to maintaining
    //         current information does not imply an obligation to update any
    //         content.
    //         <br />
    //         Modify, halt, or completely discontinue any aspect of the platform
    //         at our discretion, without advance warning. We bear no
    //         responsibility for any impact such changes may have on users.
    //         <br />
    //         Not guarantee uninterrupted or error-free access to the platform.
    //         Maintenance, technical issues, or unforeseen problems may lead to
    //         temporary unavailability or disruptions in service.
    //         <br />
    //         Adjust, pause, or cease operations of the platform without notice
    //         for any reason deemed necessary. We are not liable for any
    //         inconvenience, loss, or damage resulting from such interruptions.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         By using FitnEarn, you acknowledge and accept these terms,
    //         understanding that platform availability and content are subject to
    //         change and may be temporarily inaccessible due to maintenance or
    //         technical difficulties. These policies are in place to ensure the
    //         optimal functioning of FitnEarn and to protect the interests of our
    //         community.
    //         <br />
    //         PRIVACY POLICY
    //         <br />
    //         We care about data privacy and security. Please review our Privacy
    //         Policy at: https://www.fitnearn.com/privacy-policy
    //         <br />
    //         FITNEARN INTELLECTUAL PROPERTY RIGHTS POLICY
    //         <br />
    //         FitnEarn is committed to upholding the intellectual property rights
    //         of others and expects its users to do the same. Should you suspect
    //         that your intellectual property rights have been infringed upon by
    //         material accessible on or through our platform, we urge you to
    //         inform us promptly. Please direct your information of alleged
    //         infringement to us using the designated contact details provided on
    //         our platform (referred to here as &quot;IP NOTICE&quot;).
    //         <br />
    //         Upon receipt, we will forward a copy of your notice to the
    //         individual responsible for the content in question. It is important
    //         to note that under Indian Copyright laws, individuals making false
    //         claims of copyright infringement in their IP Notice may face legal
    //         consequences, including potential liability for damages. Therefore,
    //         if there is any doubt regarding the infringement of your copyright
    //         by material on our platform, consulting with legal counsel before
    //         submitting a IP Notice is advisable.
    //         <br />
    //         FitnEarn reserves the right to terminate the accounts of users who
    //         are found to be repeat infringers of intellectual property rights.
    //         <br />
    //         TERMINATION
    //         <br />
    //         The terms outlined herein will remain effective and binding for as
    //         long as you utilize the FitnEarn Website or Mobile Application.
    //         <br />
    //         FitnEarn reserves the unrestricted right to terminate access or use
    //         of the Website/Mobile Application for any user, at our sole
    //         discretion, without any prior notice or liability. This includes the
    //         right to block specific IP addresses. Termination may be due to any
    //         breach of the representations, warranties, or covenants made in
    //         these Terms and Conditions, violation of any laws or regulations, or
    //         for no specific reason at all.
    //         <br />
    //         Should your account be terminated or suspended, regardless of the
    //         reasons, you are expressly forbidden from creating a new account
    //         under your own name, someone else&quot;s name, or any fictitious
    //         name. This prohibition extends to creating accounts on behalf of
    //         others.
    //         <br />
    //         Furthermore, FitnEarn maintains the right to pursue legal actions,
    //         including civil, criminal, and injunctive remedies, against anyone
    //         whose actions necessitate such responses.
    //         <br />
    //         GOVERNING LAWS
    //         <br />
    //         The Terms and Conditions governing your engagement with the FitnEarn
    //         Website or Mobile Application are exclusively subject to the laws of
    //         India. Should any disputes arise under this Agreement, they will be
    //         resolved in the jurisdiction of the courts situated in Haridwar
    //         District.
    //         <br />
    //         To pursue a legal claim related to the services provided by
    //         FitnEarn, users must initiate such action within thirty (30) days
    //         from the date:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         The claim or cause of action first emerged; or
    //         <br />
    //         The user first became aware of the circumstances leading to the
    //         claim, whichever occurs later.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Failure to initiate a claim within this timeframe will result in the
    //         permanent waiver of the right to pursue that cause of action.
    //         <br />
    //         FITNEARN DISPUTE RESOLUTION FRAMEWORK
    //         <br />
    //         Amicable Resolution Attempt
    //         <br />
    //         For any disputes, controversies, or claims arising from or related
    //         to this Agreement or any services provided by the FitnEarn platform,
    //         including questions about its existence, validity, or termination,
    //         both parties will endeavour to resolve the matter amicably. If a
    //         resolution cannot be reached within 30 days of notifying the other
    //         party of the dispute, either party has the option to proceed to
    //         binding arbitration.
    //         <br />
    //         Binding Arbitration Process
    //         <br />
    //         In line with the Indian Arbitration & Conciliation Act, 1996,
    //         unresolved disputes will be submitted to binding arbitration. This
    //         process will address the dispute on an individual basis, without
    //         consolidation with claims of other parties. A sole arbitrator,
    //         appointed according to the Act, will oversee the arbitration, which
    //         will take place in Pune, with English as the arbitration language.
    //         Both parties retain the right to seek interim relief from a Pune
    //         jurisdiction court to protect their rights or property while
    //         arbitration is pending. The confidentiality of the arbitration
    //         process is paramount, with disclosures only permitted as required by
    //         law or for enforcing the arbitration award. The costs of
    //         arbitration, including administrative fees and legal expenses, will
    //         be shared equally between the parties.
    //         <br />
    //         Arbitration Limitations
    //         <br />
    //         Arbitration will be limited strictly to the dispute between the
    //         involved parties, under the following conditions:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         No arbitration will be merged with other proceedings.
    //         <br />
    //         There is no provision for the dispute to be arbitrated as a class
    //         action or to employ class action procedures.
    //         <br />
    //         Disputes cannot be represented on behalf of the general public or
    //         any group of persons not directly involved in the arbitration.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Exceptions to Arbitration
    //         <br />
    //         Certain disputes are exempt from the arbitration agreement,
    //         specifically:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         Issues aiming to enforce or protect intellectual property rights.
    //         <br />
    //         Cases involving allegations of theft, piracy, privacy breaches, or
    //         unauthorized use.
    //         <br />
    //         Claims seeking injunctive relief.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         In situations where arbitration is deemed inapplicable or
    //         unenforceable, such disputes will be resolved in the competent
    //         courts within the jurisdiction of Pune, to which both parties agree
    //         to submit.
    //         <br />
    //         THIS DISPUTE RESOLUTION POLICY WILL REMAIN EFFECTIVE EVEN AFTER THE
    //         TERMINATION OF THE AGREEMENT.
    //         <br />
    //         CONTENT CORRECTIONS POLICY
    //         <br />
    //         On occasion, the FitnEarn Website or Mobile Application may display
    //         content that includes typographical mistakes, inaccuracies, or
    //         missing information related to service descriptions, pricing,
    //         availability, and more. We are committed to maintaining accurate and
    //         up-to-date information, and as such, we hold the authority to
    //         rectify any errors, inaccuracies, or omissions. Furthermore, we may
    //         modify or refresh content at any moment without issuing a prior
    //         announcement.
    //         <br />
    //         FITNEARN USAGE DISCLAIMER
    //         <br />
    //         The FitnEarn Website and Mobile Application are made available to
    //         you on an &quot;as-is&quot; and &quot;as-available&quot; basis. Your
    //         decision to access and use our platform and services is at your own
    //         risk. We expressly disclaim, to the maximum extent allowed by law,
    //         all warranties, whether express or implied, including but not
    //         limited to implied warranties of merchantability, suitability for a
    //         specific purpose, and non-infringement.
    //         <br />
    //         We do not guarantee the accuracy, reliability, or completeness of
    //         any content found on the FitnEarn platform or any linked sites.
    //         FitnEarn assumes no liability for any errors or inaccuracies in
    //         content, any personal injury or property damage arising from your
    //         use of the platform, unauthorized access to our servers,
    //         interruption or cessation of communication with the platform, or any
    //         harmful components that may be transmitted by third parties through
    //         our platform. Additionally, we are not responsible for any loss or
    //         damage resulting from the utilization of content posted, shared, or
    //         made available through the FitnEarn platform.
    //         <br />
    //         FitnEarn does not endorse, guarantee, or assume responsibility for
    //         any product or service advertised or offered by third parties
    //         through our platform or any hyperlinked website, nor do we oversee
    //         any transactions between you and third-party providers. When
    //         engaging in transactions or using products and services found
    //         through FitnEarn or any linked sites, we advise you to exercise
    //         caution and make informed decisions.
    //         <br />
    //         This disclaimer serves to highlight the inherent risks associated
    //         with using online platforms and to remind users to proceed with
    //         caution and make use of their best judgment when interacting with
    //         content, entering into transactions, or utilising services offered
    //         through the FitnEarn platform or its affiliates.
    //         <br />
    //         LIABILITY LIMITATIONS
    //         <br />
    //         FITNEARN, ALONG WITH OWNER, EMPLOYEES, AND AGENTS, SHALL NOT BE HELD
    //         ACCOUNTABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
    //         SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES. THIS INCLUDES, BUT IS NOT
    //         LIMITED TO, FINANCIAL LOSSES SUCH AS LOST PROFITS OR REVENUE, DATA
    //         LOSS, OR ANY OTHER FORM OF DAMAGE THAT MAY ARISE FROM YOUR
    //         ENGAGEMENT WITH THE FITNEARN WEBSITE OR MOBILE APPLICATION. THIS
    //         LIMITATION APPLIES REGARDLESS OF WHETHER WE HAVE BEEN INFORMED OF
    //         THE POTENTIAL FOR SUCH DAMAGES.
    //         <br />
    //         INDEMNIFICATION AGREEMENT
    //         <br />
    //         By utilising the FitnEarn platform, you commit to defend, indemnify,
    //         and absolve FitnEarn, its subsidiaries, affiliates, officers,
    //         agents, partners, and employees, from any claims, liabilities,
    //         losses, damages, or expenses, including reasonable attorney fees,
    //         brought forth by third parties due to or arising from your actions,
    //         including but not limited to:
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //         The content you contribute to the platform;
    //         <br />
    //         Your interaction with and use of the FitnEarn Website or Mobile
    //         Application;
    //         <br />
    //         Any violations of these Terms and Conditions;
    //         <br />
    //         Breaches of the representations and warranties you have provided
    //         within these Terms and Conditions;
    //         <br />
    //         Infringement upon the rights of third parties, especially concerning
    //         intellectual property rights; or
    //         <br />
    //         Any direct harm caused to another user of the platform that resulted
    //         from connections made through FitnEarn.
    //         <br />
    //       </span>
    //       <span className="text-neutral-200 text-2xl mq450:text-xl font-medium font-Lato leading-[33px]">
    //          <br />
    //         Should such a situation arise, FitnEarn reserves the right to take
    //         over the exclusive defence and control of any claim you are obliged
    //         to indemnify against, and you must cooperate with FitnEarn’s defence
    //         strategy at your own cost. FitnEarn pledges to make a reasonable
    //         effort to keep you informed of any such claims, actions, or
    //         proceedings immediately upon awareness.
    //         <br />
    //         USER DATA POLICY
    //         <br />
    //         FitnEarn is committed to managing and preserving the data you share
    //         through our Website or Mobile Application, which includes data
    //         necessary for optimising the platform performance and enhancing your
    //         user experience. We implement encryption and conduct regular backups
    //         to safeguard this data. However, the responsibility for any data you
    //         transmit or generate through your activities on FitnEarn rests
    //         solely with you.
    //         <br />
    //         By using FitnEarn, you acknowledge and agree that FitnEarn will not
    //         be held accountable for any potential loss or corruption of your
    //         data. Furthermore, you relinquish any claims against FitnEarn
    //         related to such data loss or corruption.
    //         <br />
    //         DIGITAL COMMUNICATION CONSENT
    //         <br />
    //         Engaging with the FitnEarn platform, whether by browsing our site,
    //         sending emails, or filling out online forms, is considered a form of
    //         electronic communication. By using FitnEarn, you hereby consent to
    //         receiving communications from us electronically. This includes, but
    //         is not limited to, emails, notifications on our Website or Mobile
    //         Application, which fulfil any legal requirements that such
    //         communications be in writing.
    //         <br />
    //         By agreeing to these terms, you accept the validity of electronic
    //         signatures, digital contracts, electronic orders, and other virtual
    //         records used during transactions and interactions initiated or
    //         completed through FitnEarn or its services.
    //         <br />
    //         Furthermore, you relinquish any claim to the necessity of physical
    //         signatures, non-digital records, or other non-electronic methods of
    //         transaction confirmation and document retention that might be
    //         mandated by any law, regulation, or ordinance across various
    //         jurisdictions.
    //         <br />
    //         OTHER PROVISIONS
    //         <br />
    //         The entirety of the Terms and Conditions, along with any additional
    //         policies or operational guidelines provided by FitnEarn on the
    //         Website or Mobile Application, form the complete and exclusive
    //         agreement between you and FitnEarn. Our non-exercise or enforcement
    //         of any rights or provisions within these Terms does not equate to a
    //         waiver of such rights or provisions. These Terms are enforceable to
    //         the maximum extent permitted by law.
    //         <br />
    //         FitnEarn reserves the right to transfer or assign its rights and
    //         duties under these Terms to any party at any given time without
    //         restriction. We are not accountable for any loss, damage, or delays
    //         resulting from circumstances beyond our reasonable control. Should
    //         any section, or portion thereof, within these Terms be deemed
    //         invalid, illegal, or unenforceable, it shall be considered
    //         detachable from the rest, which shall remain in full force and
    //         effect.
    //         <br />
    //         No joint venture, partnership, employment, or agency relationship
    //         exists between you and FitnEarn due to, this agreement or through
    //         your use of the Website or Mobile Application. These Terms shall not
    //         be interpreted against the drafting party, thereby nullifying any
    //         defence you might have regarding their digital format or the
    //         electronic execution of these agreements.
    //         <br />
    //         USER QUERY, COMPLAINTS AND GRIEVANCE REDRESSAL
    //         <br />
    //         Should you require additional details about using the FitnEarn
    //         platform, encounter any violations of our Terms of Use, come across
    //         any content that may be deemed inappropriate, or if you have any
    //         complaints or issues needing resolution, we encourage you to reach
    //         out to us directly:
    //         <br />
    //         FitnEarn Contact Information
    //         <br />
    //         Address: 395, Purav Deen Dayal, Old Railway Road, Veer Bhawan Nagar,
    //         Roorkee-247667, Haridwar District, Uttarakhand, India
    //         <br />
    //         Phone: +91-8630222654
    //         <br />
    //         Email: help-support@fitnearn.com
    //         <br />
    //         Your concerns are important to us, and they will be addressed
    //         through our dedicated Grievance Redressal Mechanism. To ensure we
    //         can address your concerns effectively, please provide a
    //         comprehensive description of the issue, including any specific
    //         details or examples. This information will be invaluable in helping
    //         us understand and resolve your complaint or grievance promptly.
    //         <br />
    //         FitnEarn commits to resolving all grievances within a 30-day period
    //         from the receipt of the complaint, adhering to the timeframes set by
    //         relevant regulations. Your satisfaction and the integrity of our
    //         platform are our top priorities.
    //         <br />
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="text-white pt-36 bg-neutral-900 top-36 mq450:left-0">
      <p className="text-center text-[32px] font-semibold font-Lato">
      TERMS AND CONDITIONS
      </p>
      {/* <p className="text-lg font-semibold text-center text-neutral-300 font-Lato">
      Effective Date : 4.02.24
    </p> */}
      <div className="w-auto p-20 pt-8 mt-2 mq450:w-auto mq450:p-5">
        <div className="text-white">
          <span className=" mq450:text-xl font-medium  font-Lato leading-[33px]">
            <p>
              Last updated: <b>18.11.2024</b>
            </p>
            <p className="mt-2">
              Welcome to FitnEarn (the “Platform”), an online platform dedicated
              to fitness and wellness, operated by Fit Earn Meditate
              (“FitnEarn”, &quot;Sole Proprietorship&quot;, “we,” “us,” or
              “our”). FitnEarn&quot;s office is located at 395, Purav Deen
              Dayal, Old Railway Road, Veer Bhawan Nagar, Roorkee-247667,{" "}
            </p>
            <br />
            This document is an electronic record in terms of the Information
            Technology Act, 2000, and rules thereunder, and is published in
            accordance with the provisions of the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal
            Data or Information) Rules, 2011, which require publishing the rules
            and regulations, privacy policy, and Terms and Conditions for access
            or usage of the Platform through the FitnEarn Mobile Application
            (hereinafter referred to as “Mobile Application”) and Website –
            [www.fitnearn.com] (hereinafter referred to as &quot;Website&quot;)
            and our related Website, Application, Services, Products,Devices and
            content (together with the Mobile Application and Website,
            collectively referred to as “Services”).
            <br />
            <br />
            <b className="text-2xl ">AGREEMENT TO TERMS</b>
            <br />
            User Agreement: These Terms and Conditions constitute a legally
            binding agreement made between you, whether personally or on behalf
            of an entity (“you” or “user” or “client”) and FitnEarn (Fit Earn
            Meditate), concerning your access to and use of the Website and
            FitnEarn Mobile Application as well as any other media form, media
            channel, mobile website or mobile application related, linked, or
            otherwise connected thereto (collectively, the &quot;Website and
            Mobile Application”). You agree that by accessing the Website and/or
            Mobile Application, you have read, understood, and agree to be bound
            by all of these Terms and Conditions.
            <br />
            <br />
            <b>
              IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN
              YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST
              DISCONTINUE USE IMMEDIATELY.
            </b>
            <br />
            <p className="mt-2">
              {" "}
              <span className="mr-2 underline ">
                Changes to Terms & Conditions:
              </span>{" "}
              Any Supplementary terms and conditions or documents that may be
              occasionally published on the FitnEarn Website or Mobile App are
              integrated by reference into this agreement. FitnEarn reserves the
              exclusive right to amend or update these Terms at any moment for
              any reason. Changes will be communicated by updating the
              &quot;Last Updated&quot; date of these Terms and Conditions. It is
              your responsibility to review these Terms and Conditions
              periodically to stay informed of updates. You will be subject to,
              and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Terms and Conditions by
              continuing to access or use the FitnEarn Website or Mobile
              Application, or any other services offered after these updates
              take effect, you acknowledge and accept the revised Terms and
              Conditions.{" "}
            </p>
            <br />
            The information provided on the Website/Mobile Application is not
            intended for distribution to or use by any person or entity in any
            jurisdiction or country where such distribution or use would be
            contrary to law or regulation or which would subject us to any
            registration requirement within such jurisdiction or country.
            Accordingly, those persons who choose to access the Website/Mobile
            Application from other locations do so on their own initiative and
            are solely responsible for compliance with local laws, if and to the
            extent local laws are applicable.
            <br />
            <p className="mt-2">
              <span className="mr-2 underline">Eligibility:</span> As a minor if
              you wish to use Our Products or Services, such use shall be made
              available to You by Your legal guardian or parents, who has agreed
              to these Terms. In the event a minor utilises the
              Application/Website/Services, it is assumed that he/she has
              obtained the consent of the legal guardian or parents and such use
              is made available by the legal guardian or parents. The Company
              will not be responsible for any consequence that arises due to,
              misuse of any kind of Our Website or any of Our Products or
              Services that may occur by any person including a minor
              registering for the Services/Products provided. By using the
              Products or Services You warrant that all the data provided by You
              is accurate and complete and that the Minor using the Website has
              obtained the consent of parent/legal guardian (in case of minors).
              The Company reserves the right to terminate Your account and / or
              refuse to provide You with access to the Products or Services if
              it is discovered that You are under the age of 18 (Eighteen) years
              and the consent to use the Products or Services is not made by
              Your parent/legal guardian or any information provided by You is
              inaccurate. You acknowledge that the Company does not have the
              responsibility to ensure that You conform to the eligibility
              criteria mentioned above. It shall be Your sole responsibility to
              ensure that You meet the required qualification. Any persons under
              the age of 18 (Eighteen) should seek the consent of their
              parents/legal guardians before providing any Information about
              themselves or their parents and other family members on the
              Website.
            </p>
            <br />
            <b className="text-2xl ">OUR SERVICES</b>
            <br />
            <br />
            Our Services allow you to purchase various Products and services
            from us. We reserve the right to amend, discontinue, withdraw, or
            cease our service offerings at any time. FitnEarn offers a variety
            of services aimed at enhancing your fitness and wellness journey,
            including but not limited to:
            <p className="mt-3">
              <span className="mr-2 font-semibold">a) Workout Plans:</span> A
              personalised workout plan recommended by FitnEarn and customised
              workout plan based on user requirements both subscription based
              offering users to access existing media and content relating to
              various exercises from categories such as Yoga, Muscle Building,
              Dance Fitness, Cardio, Kick-boxing, Plyomterics, Meditation,
              Stretching and Rehab & Care etc.
            </p>
            <p className="mt-3">
              <span className="mr-2 font-semibold">
                b) Exercise Video Library:
              </span>{" "}
              Access our exercise video library which comprises exercises in
              various categories such as Yoga, Pilates, Body Weight, Cardio,
              Equipment Based Workouts, Meditation etc.
            </p>
            <p className="mt-3">
              <span className="mr-2 font-semibold">
                c) FitnEarn Market Place:
              </span>{" "}
              Access to purchase of various products/accessories related to
              health and fitness from FitnEarn Store.
            </p>
            <p className="mt-3">
              <span className="mr-2 font-semibold">
                d) Exercise Challenges:
              </span>{" "}
              Participate in various challenges for motivation and rewards.
            </p>
            <p className="mt-3">
              <span className="mr-2 font-semibold">
                e) Community Engagement:
              </span>{" "}
              Access to our social feed section to engage and communicate with
              the FitnEarn community in compliance with the community
              guidelines.
            </p>
            <br />
            <b className="text-2xl ">HEALTH DISCLAIMER</b>
            <br />
            In consideration of being allowed to participate and use any of the
            services offered by FitnEarn, in addition to the payment of any fee
            or charge, you do hereby waive, release and forever discharge and
            hold harmless FitnEarn and its coaches, consultants, officers,
            agents, and employees from any and all responsibility, liability,
            costs and expenses, including injuries or damages, resulting from
            your participation and use of any of the services offered by
            FitnEarn.
            <br />
            <br />
            You do also hereby release FitnEarn, its coaches, consultants,
            officers, agents and employees from any responsibility or liability
            for any injury, damage or disorder (physical or otherwise) to you,
            or in anyway arising out of or connected with your participation in
            any activities and use of any of services associated or provided by
            the FitnEarn.
            <br />
            <br />
            You understand and you are aware that strength, flexibility, aerobic
            and other forms of exercise, asanas and practices including the use
            of equipment or otherwise are a potentially dangerous activity. You
            also understand that fitness activities involve a risk of loss of
            personal property, serious injury and even death, and that you are
            voluntarily participating in these activities and using equipment
            and machinery or otherwise with knowledge of the risk involved. You
            hereby agree to assume expressly and accept all risks of loss of
            personal property, serious injury or death related to said fitness
            activities. In addition, You certify that you are 18 years of age or
            older. You do hereby further declare yourself to be physically sound
            and suffering from no condition, impairment, disease, infirmity or
            other illness that would affect nutrient metabolism or prevent your
            participation or use of equipment or machinery or otherwise except
            as herein after stated.
            <br />
            <br />
            Moreover, you also agree that if you are suffering from any ailment
            or any medical condition you have to inform and produce relevant
            documents to FitnEarn before beginning any physical activities or
            any other plans that may be referenced, discussed or offered under
            the Services provided by FitnEarn platform. You do hereby
            acknowledge that FitnEarn has recommended to you to obtain an
            approval from a medical expert or certified medical practitioner as
            per the laws of the land prior to your participation in an
            exercise/fitness activity or in the use of any health and fitness
            services offered by FitnEarn. You also acknowledge that FitnEarn has
            recommended that you have a yearly or more frequent physical
            examination and consultation with your physician or any medical
            expert/ consultant prior to any physical activity, exercise and use
            of exercise and training equipment so that you might have his/her
            recommendations concerning these fitness activities and use of
            equipment. You acknowledge that you have either had a physical
            examination and been given your physician’s or medical expert&quot;s
            permission to participate, or that you have decided to participate
            in activity and use of equipment, machinery, plans, and other
            programs designed by FitnEarn without the approval of your physician
            or medical expert and do hereby assume and take all responsibility
            for your participation and activities, and utilization of fitness
            services provided by FitnEarn.
            <br />
            <br />
            <b>
              {" "}
              FITNEARN DOES NOT PROVIDE PROFESSIONAL MEDICAL SERVICES OR ADVICE.
              THE SERVICES PROVIDED BY THE COACHES/TRAINING SPECIALISTS AND
              AVAILABLE ON THE WEBSITE AND/OR MOBILE APP DO NOT CONTAIN OR
              CONSTITUTE, AND SHOULD NOT BE INTERPRETED AS MEDICAL ADVICE OR
              OPINION. NO DOCTOR-PATIENT RELATIONSHIP IS CREATED. USE OF THE
              SERVICES IS NOT FOR MEDICAL EMERGENCIES. IF YOU THINK YOU HAVE A
              MEDICAL EMERGENCY, CONSULT YOUR DOCTOR. YOUR USE OF THE SERVICES
              DOES NOT CREATE A DOCTOR-PATIENT RELATIONSHIP BETWEEN YOU AND ANY
              OF THE FITNEARN ASSOCIATED COACHES, EMPLOYEES, OTHER FITNEARN
              ASSOCIATED PARTIES OR ANY OF FITNEARN SERVICE USERS.
            </b>
            <br /> <br />
            <b className="text-2xl ">INTELLECTUAL PROPERTY RIGHTS</b>
            <p className="mt-3">
              FitnEarn, Fit Earn Meditate, FitnEarn Coin, FitnEarn Gift Cashback
              Rewards, Product Reward System, Mood-board and associated
              challenges and other Fitness and Meditation Challenge are sole
              proprietary of FitnEarn (alias Fit Earn Meditate). Unless
              otherwise indicated, the Website/Mobile Application, is our
              proprietary property and all content, source code, databases,
              functionality, software, website designs, videos, text, images,
              photographs, questions, creative suggestions, messages, comments,
              feedback, ideas, drawings, articles and other materials, on the
              Website/Mobile Application (collectively, the “Content”) and the
              trademarks, service marks, and logos contained therein (the
              “Marks”) are owned or controlled by us or licensed to us, and are
              protected by copyright and trademark laws and various other
              intellectual property rights and unfair competition laws of India,
              foreign jurisdictions, and international conventions. The Content
              and the Marks are provided on the Website/Mobile Application “AS
              IS” for your information and personal use only. Except as
              expressly provided in these Terms and Conditions, no part of the
              Website/Mobile Application and no Content or Marks may be
              modified, copied, reproduced, aggregated, republished, uploaded,
              posted, publicly displayed, performed, encoded, translated,
              transmitted, distributed, sold, licensed, create derivative works
              of or otherwise exploited for any commercial purpose whatsoever in
              whole or in part, without our express prior written permission.
            </p>
            <br />
            Provided that you are eligible to use the Website/Mobile
            Application, you are granted a limited license to access and use the
            Website/Mobile Application and to download or print a copy of any
            portion of the Content to which you have properly gained access
            solely for your personal, non-commercial use. We reserve all rights
            not expressly granted to you in and to the Website/Mobile
            Application, the Content and the Marks.Our commercial partners,
            suppliers, advertisers, sponsors, licensors, contractors and other
            third parties may also have additional proprietary rights in the
            Content which they make available on our Services. You may not
            modify, publish, transmit, distribute, perform, participate in the
            transfer or sale, create derivative works of, or in anyway exploit,
            any of the Content, in whole or in part. When Content is downloaded
            to your computer, phone, tablet or any other mobile device, you do
            not obtain any ownership interest in such Content. Modification of
            the Content or use of the Content for any other purpose, including,
            but not limited to, use of any Content in printed form or on any
            other applications or networked computer environment is strictly
            prohibited unless you receive our prior written consent.
            <br />
            <b className="text-2xl ">USER REPRESENTATIONS</b>
            <br />
            By using the FitnEarn Website/Mobile Application, you represent and
            warrant that:
            <br />
          </span>
          <span className="text-base mq450:text-xl font-medium font-Lato leading-[33px] mt-2">
            all registration information you submit will be authentic, true,
            accurate, current, and complete.
            <br />
            you will maintain the accuracy of such information and promptly
            update such registration information as necessary;
            <br />
            you have the legal capacity and you agree to comply with these Terms
            and Conditions;
            <br />
            you are not a minor in the jurisdiction in which you reside;
            <br />
            you will not access the Website/Mobile Application through automated
            or non-human means, whether through a bot, script or otherwise;
            <br />
            you will not use the Website/Mobile Application for any illegal or
            unauthorized purpose; and
            <br />
            your use of the Website/Mobile Application will not violate any
            applicable law or regulation.
            <br />
          </span>
          <span className=" text-base mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any current or future use of the
            Website/Mobile Application (or any portion thereof) and may also
            take legal action as per applicable laws of the land.
            <br />
            <br />
            <b className="text-2xl ">USER REGISTRATION</b>
            <br />
            You may be required to register with the Website/Mobile Application.
            You agree to keep your password confidential and will be responsible
            for all use of your account and password. We reserve the right to
            remove, reclaim, or change a username you select if we determine, in
            our sole discretion, that such username is inappropriate, obscene,
            or otherwise objectionable.
            <br /> <br />
            <b className="text-xl ">FITNEARN COIN TERMS AND CONDITIONS</b>
            <br />
            <b>General Conditions</b>
            <br />
            1. You may avail the services of the FitnEarn Coins upon successful
            registration and creation of an Account on the FitnEarn App or
            Website. You are bound by these terms and conditions of the
            FitnEarnCoin System.
            <br />
            <br />
            2. By signing up, you agree that you have read and understood the
            Terms and Conditions that govern the FitnEarnCoin&quot;s System, and
            give consent to FitnEarn to contact you for events, promotions,
            product information and discount. This will override the registry on
            NDNC/DND.
            <br />
            <br />
            <br />
            3. Members can benefit from the FitnEarnCoin System by availing the
            services on the FitnEarn App or Website.
            <br />
            <br />
            4. The FitnEarn Coin System is open to users of FitnEarn in India
            above 18 years of age only.
            <br />
            <br />
            5. FitnEarn Coin&quot;s System is for individuals only - it is not
            open to corporates or companies.
            <br />
            <br />
            6. Registration on FitnEarn product must be in the applicant&quot;s
            full name and mobile number is mandatory. Only one registration per
            individual will be acknowledged.
            <br />
            <br />
            7. FitnEarn Coin balance is not transferable. The person named in
            database must be present at the time of purchase to be eligible for
            FitnEarn Coins available as per the System.
            <br />
            <br />
            8. Misuse of FitnEarn Coin&quot;s or other System benefits may
            result in termination of membership or withdrawal of benefits at the
            sole discretion of FitnEarn.
            <br />
            <br />
            9. No accumulation or redemption of FitnEarn Coins will be
            permissible if, on relevant date, the FitnEarn Account has been
            deleted or is liable to be deleted or if the account of the User is
            a defaulted account or if there is any breach of any clause of these
            Terms and Conditions.
            <br />
            <br />
            10. The FitnEarn Coin&quot;s System is valid for use during the
            course of FitnEarn Coin&quot;s System.
            <br />
            <br />
            11. FitnEarn reserves the right to refuse FitnEarn Coin&quot;s
            System to an applicant without assigning any reason whatsoever.
            <br />
            <br />
            12. FitnEarn may suspend or terminate the Refer and Earn program or
            any user&quot;s ability to participate in the program at any time
            for any reason at their sole discretion.
            <br />
            <br />
            13. Usage conditions of FitnEarn Coins may change at the discretion
            of FitnEarn, at any
            <br />
            point in time.
            <br />
            <br />
            FitnEarn reserves the right to amend these terms and conditions at
            any time without any prior notice. Modifications of these terms will
            be effective from the time they are updated in the Terms and
            Conditions section.
            <br />
            <br />A product purchased by redemption of FitnEarnCoins from
            FitnEarn store is governed by and subject to the applicable Seller
            policies, including applicable exchange and shipping policies. You
            agree that we are neither the agents of any seller or manufacturer
            of the products and hence the products quality offered are not under
            our control. Accordingly, we do not assume any liability, obligation
            or responsibility for any part/complete product. Due diligence must
            be done at your end before purchasing any product either by Fitnearn
            coins or directly by cash.
            <br />
            <br />
            <br />
            <b className="text-xl ">Earning FitnEarn Coins</b>
            <br />A user can earn FitnEarn Coins by-
            <p className="mt-2">
              a. Performing/Watching any exercise video associated with
              Mood-Board Challenges.
            </p>
            <p className="mt-2">
              b. Refeferring and registering new users on FitnEarn only on
              completion of task associated with referral.
            </p>
            <p className="mt-2">
              c. Performing/Walking daily steps (tracking of the same is done by
              Google Fit SDKs & APIs) limiting up to 10000 for non premium users
              and 20000 for premium users.
            </p>
            <p className="mt-2">
              d. Participating in a Step, Exercise or Meditation Challenge on
              FitnEarn Challenge Board.
            </p>
            <p className="mt-2">
              e. On purchase of a premium subscription plans on FitnEarn.
            </p>
            <p className="mt-2">
              f. Performing/Watching any exercise video associated with Workout
              plans. This is available for premium users of FitnEarn.
            </p>
            <b className="mt-2">NOTE:</b>
            <br />
          </span>
          <span className="text-base mq450:text-xl font-medium font-Lato leading-[33px] mt-3">
            FitnEarn coins cannot be purchased by users including by payment of
            cash.
            <br />
            FitnEarn coins are rewards awarded to users of the app which can be
            redeemed for products listed on FitnEarn store.
            <br />
            FitnEarn Coins can be exchanged with the FitnEarn Cashback Gift
            Rewards.
            <br />
            The receipt of FitnEarn coins or it’s redemption by the end user
            should not be linked to money paid for the purchase of services on
            the Platform.
            <br />
          </span>
          <span className="text-base mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <b>
              THE COMPANY HEREBY CLARIFIES THAT FITNEARN COINS ARE BEING GRANTED
              BY US AT OUR DISCRETION ONLY.
            </b>
            <br />
            <br />
            By referring FitnEarn to your friends, both user and users friend
            will receive 10 FitnEarn Coins each upon successful registration by
            users friend on FitnEarn and completion of the task associated with
            the referral. Users friend must not have installed the FitnEarn app
            on any of their devices before. The Email ID and/or phone number
            through which the friend signs up with FitnEarnapp, must not have
            been used for signing up with FitnEarn earlier. The mobile number
            provided by the friend to receive the OTP must not have been used to
            sign up earlier. The device on which the users friend downloads the
            FitnEarnapp should not be rooted or jail-broken. FitnEarn app should
            not be installed using App runtime for Chrome, emulators or
            simulators.
            <br />
            <br />
            If your friends use someone else&quot;s referral link, the person
            whose link was used first to download the FitnEarn App would get
            benefits, even though you had referred them first. The first link
            used to install the app by your friend would be considered for the
            referral FitnEarn Coins. FitnEarn reserves all rights to change the
            amounts conferred under the Refer and Earn program at any point in
            time.
            <br />
            <br />
            Your unique referral links/code should only be used for personal and
            non-commercial purposes. You cannot distribute/publish your unique
            referral link/code where there is no reasonable basis for believing
            that most of the recipients are personal friends (such as coupon
            websites, forums, Wikipedia etc.).
            <br />
            <br />
            Users can refer to any number of people.FitnEarn Coins can only be
            earned through the use of FitnEarn App or Website only.
            <br />
            <br />
            Depending on the coins associated to the particular exercise you
            complete from Mood-board Challenges, Workout Plans Exercises, Step,
            Exercise and Meditation Challenges Exercises as on date, a certain
            amount of FitnEarn Coins will be credited to the users FitnEarn
            account. FitnEarn Coins earned by a user will be credited to the
            user account within the next 24 hours.
            <br />
            <br />
            FitnEarn Coins cannot be transferred to your bank account.
            Additionally, FitnEarn Coins across multiple accounts cannot be
            combined into a single account. FitnEarn Coins cannot be exchanged
            for any currency outside FitnEarn. Users can exchange the FitnEarn
            coins to FitnEarn Cashback Gift Rewards after reaching milestones
            time to time. The gift cashback rewards will be provided to the user
            within 3-5 business days after reaching a particular FitnEarn Coin
            milestone and submission of Cashback Gift Card form on FitnEarn
            App/Website. The exchange/conversion rate of FitnEarn coins with
            FitnEarn Cashback Gift card is solely at discretion of FitnEarn. We
            value everyone effort and thus reward user on completion of
            exercises and activities to keep them motivated on the path of
            fitness and overall well-being.
            <br />
            <br />
            <br />
            <p className="mt-3">
              No two offers or discounts available can be clubbed together
              unless specified otherwise.
            </p>
            <br />
            <b>
              FITNEARN COINS EARNED AS A RESULT OF FRAUDULENT ACTIVITIES WILL BE
              REVOKED AND DEEMED INVALID.
            </b>
            <br />
            <br />
            In case the FitnEarn Coins are not credited to your account, please
            write to <strong>“help-support@fitnearn.com”</strong>.
            <br />
            <br />
            <b> Redemption of FitnEarn Coins</b>
            <p className="mt-2">
              For the purpose of redemption,{" "}
              <strong>10 (Ten) FitnEarn Coin</strong> will be equal in value to{" "}
              <strong>Rs.1 (Rupee One)</strong> as the base value initially,
              which is subject to change based on the contribution of the users
              which will affect the exchange rate on the FitnEarn App or
              Website. However, FitnEarn reserves the right to modify the
              formula used for calculating the exchange rate/value of the
              FitnEarn Coins.
            </p>
            <br />
            <br />
            FitnEarn Coins can be redeemed on purchase of any product or service
            from the FitnEarn Store available on FitnEarn App or Website.
            <br />
            <br />
            <br />
            When you make a purchase using FitnEarn Coins balance, in the event
            of a cancellation request of the purchase, the FitnEarn Coins used
            will not be credited back to your FitnEarn Coin balance.
            <br />
            <br />
            On redemption, the FitnEarn Coins so redeemed would be automatically
            subtracted from the accumulated FitnEarn Coins in your FitnEarn
            Account. Similarly, on exchange of FitnEarn coins to FitnEarn
            Cashback Gift Rewards and the cashback rewards have been redeemed or
            utilised by the user it would automatically subtract from the
            accumulated FitnEarn Cashback Gift Rewards.
            <br />
            <br />
            <b> FitnEarn Store</b>
            <br />
            <br />
            All Products listed for sale at the FitnEarn Store are subject to
            availability and restrictions at the time of purchase. The Products
            listed in the FitnEarn are subject to change without any prior
            notice.
            <br />
            <br />
            Products listed on FitnEarn Store are meant for end-consumers only
            (and not resale). We may refuse to service your order if we suspect
            that you are buying Products for resale.
            <br />
            <br />
            FitnEarn may cancel or refuse your order, or limit the quantity of
            Products stated in your order, at its sole discretion. FitnEarn may
            also require further information from you before confirming or
            processing your order.
            <br />
            <br />
            The price of products is displayed in Indian Rupees. It may exclude
            delivery charges, postage and handling charges, conveyance charges,
            and/or applicable taxes. However, the total price of Products
            (including voluntary and involuntary charges) will be shown to you
            and your consent will be taken before confirming any order.
            <br />
            <br />
            We endeavour to deliver purchased Products to you as soon as
            possible, as per the indicative delivery schedule shown on our
            Mobile Application/Website.
            <br />
            <br />
            However, the actual delivery times may vary, and depend on many
            factors beyond our control (like area/PIN code of delivery,
            processing of shipments by our logistics vendors, availability of
            transport services, or any other factors not within our control). We
            assume no liability if Products are delivered after the indicative
            delivery schedule.
            <br />
            <br />
            Title in Products bought from the FitnEarn Store will pass to you
            upon delivery of the Products to our transport carrier. However, the
            risk of loss or damage to Products will pass to you upon delivery of
            the Products at your submitted address.
            <br />
            <br />
            FitnEarn does not accept liability for damage to persons or property
            whatsoever caused in relation to Products bought by FitnEarn Users
            through FitnEarn Store.
            <br />
            <br />
            FitnEarn will not be liable or responsible for the Products offered
            through the FitnEarn Store and FitnEarn gives no warranty (whether
            express or implied) or representation either express or implied with
            respect to type, quality or fitness of goods acquired or their
            suitability for any purpose, whatsoever.
            <br />
            <br />
            If a Product delivered to you has obvious damage upon receipt, or is
            not the Product you ordered, you can request an exchange/replacement
            from FitnEarn, as long as you make your request within 7 working
            days of the date of receipt of the Product. We may contact you to
            confirm Product damage or to identify the Product delivered to you,
            before confirming an exchange/replacement. Please ensure that you
            retain Products in original condition, the Product packaging, price
            tags, supporting accessories and information booklets/brochure, to
            allow us to process an exchange/replacement.
            <br />
            <br />
            You are responsible for determining if the Product you purchase is
            compatible with other equipment (if such other equipment is
            required). You acknowledge that an absence of compatibility is not a
            defect in the Product permitting you to exchange/return it.
            <br />
            <br />
            Any images displayed on the FitnEarn Store for Products are for
            illustrative purposes
            <br />
            only. Characteristics of actual Products may vary.
            <br />
            <br />
            <b>FEES AND PAYMENT</b>
            <br />
            We accept the following forms of payment:
            <br />
            <br />
            Credit Card
            <br />
            Debit Card
            <br />
            Net Banking
            <br />
            Mobile Wallet
            <br />
            UPI
            <br />
            <br />
            You may be required to purchase or pay a fee to access some of our
            services. You agree to provide current, complete, and accurate
            purchase and account information for all purchases made via the
            Website/Mobile Application. You further agree to update your account
            promptly and payment information, including email address, payment
            method, and payment card expiration date, so that we can complete
            your transactions and contact you as needed. We bill you through an
            online billing account for purchases made via the Website/Mobile
            Application. GST will be added to the price of purchases as deemed
            required by us. We may change prices at any time. All payments shall
            be in Indian National Rupees.
            <br />
            <br />
            You agree to pay all charges or fees at the prices then in effect
            for your purchases and you authorise us to charge your chosen
            payment provider for any such amounts upon making your purchase.
            <br />
            <br />
            We reserve the right to correct any errors or mistakes in pricing,
            even if we have already requested or received payment. We also
            reserve the right to refuse any order placed through the
            Website/Mobile Application.
            <br />
            <br />
            We use advanced encryption technology, consistent with industry
            practice, to protect your payment information. All payments on the
            Platform are processed through secure and trusted payment gateways,
            managed by leading banks or service providers. We understand that
            banks use the 3D secure password service for online transactions,
            adding another security layer.
            <br />
            <br />
            Any accepted refunds/chargebacks will be routed back to the payer
            using the same mechanism by which payment was made. For example, an
            accepted refund for a payment made through a debit card, will be
            routed back to the debit card holder’s bank account.
            <br />
            <br />
            <p>
              {" "}
              <span className="mr-2 font-bold">
                Subscription (To access certain premium features by User):
              </span>
              Subscription is automatically renewed at the end of each
              Subscription Period unless you cancel it at least 24 hours before
              the expiry of the current Subscription Period. If you do not
              cancel the Subscription at least 24 hours before the expiry of the
              current Subscription Period, the Subscription fees for the next
              Subscription. Period will be taken during the 24 hours before the
              expiry of the current Subscription Period.
            </p>
            <br />
            If a Subscription fee cannot be taken due to the absence of monetary
            funds, invalidity of credit card or for any other reasons, the
            Subscription will not automatically end. The Subscription will
            automatically restart as soon as valid payment details are provided.
            Cancellation of a Subscription can only be done at your manual
            request. Please see the section below{" "}
            <strong>&quot;How can I cancel a Subscription&quot;</strong> for
            further details.
            <br />
            <br />
            <b>CANCELLATION</b>
            <br />
            <br />
            You can manage and cancel your subscriptions at any time in the
            Account Settings of your device. For iOS subscriptions, please see
            Apple&quot;s support page at https://support.apple.com. For Google
            Play subscriptions, please see Google Play&quot;s support page at
            https://support.google.com/googleplay.
            <br />
            <br />
            FitnEarn may terminate your account at any time without notice if it
            believes that you have violated this terms of use. Upon such
            termination, you will not be entitled to any refund for purchases.
            <br />
            <br />
            All payment, billing and transaction processes are handled by the
            relevant third-party distributor or platform such as Apple&quot;s
            App Store or Google&quot;s Google Play. For any payment related
            issues, you may contact such distributors directly. For any other
            issues, please write to us at{" "}
            <strong>help-support@fitnearn.com</strong>.
            <br />
            <br />
            There are no refunds on subscription after the{" "}
            <strong>7-Day free trial</strong>. Users can stop the subscription
            for subsequent months without penalties.
            <br />
            <br />
            <b>ECOMMERCE TERMS</b>
            <br />
            <br />
            If a product delivered to you has obvious damage upon receipt, or is
            not the Product you ordered, you can request an exchange/replacement
            from FitnEarn, as long as you make your request within 7 working
            days of the date of receipt of the Product. We may contact you to
            confirm Product damage or to identify the Product delivered to you,
            before confirming an exchange/replacement. Please ensure that you
            retain Products in original condition, the Product packaging, price
            tags, supporting accessories and information booklets/brochure, to
            allow us to process an exchange/replacement. However, you may have
            to bear shipping charges, packaging charges, and/or applicable
            taxes, in respect of exchanged/replaced Products.
            <br />
            <br />
            If you are unsatisfied with our services, or would like to request a
            return/refund, please email us at{" "}
            <strong>help-support@fitnearn.com</strong> or call us at{" "}
            <strong>+91-8630222654</strong>.
            <br />
            <br />
            IN ADDITION TO TERMS AND CONDITIONS STIPULATED FOR ECOMMERCE TERMS
            KINDLY REFER THE RETURN AND REFUND POLICY OF FITNEARN AVAILABLE ON
            APP/WEBSITE.
            <br />
            <br />
            COMMUNITY STANDARDS AND CONDUCT GUIDELINES
            <br />
            <br />
            You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used concerning any commercial endeavours except those that are
            specifically endorsed or approved by us.
            <br />
            <br />
            As a user of the FitnEarn Services, you adhere and agree not to:
            <br />
            <br />
            1.Systematically retrieve data or other content from the
            Website/Mobile Application to create or compile, directly or
            indirectly, a collection, compilation, database, or directory
            without written permission from us.
            <br />
            <br />
            2.Make any unauthorized use of the Website/Mobile Application,
            including collecting usernames and/or email addresses of users by
            electronic or other means for the purpose of sending unsolicited
            email, or creating user accounts by automated means or under false
            pretences.
            <br />
            <br />
            3.Use a buying agent or purchasing agent to make purchases on the
            Website/Mobile Application.
            <br />
            <br />
            4.Use the Website/Mobile Application to advertise or offer to sell
            goods and services.
            <br />
            <br />
            5.Circumvent, disable, or otherwise interfere with security-related
            features of the Website/Mobile Application, including features that
            prevent or restrict the use or copying of any Content or enforce
            limitations on the use of the Website/Mobile Application and/or the
            Content contained therein.
            <br />
            <br />
            6.Engage in unauthorized framing of or linking to the Website/Mobile
            Application.
            <br />
            <br />
            7.Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
            <br />
            <br />
            8.Trick, defraud, or mislead us by earning Fitnearn coins with
            falsified methods or by using system bots, software etc.
            <br />
            <br />
            9.Make improper use of our support services or submit false reports
            of abuse or misconduct.
            <br />
            <br />
            10.Engage in any automated use of the system, such as using scripts
            to send comments or messages, or using any data mining, robots, or
            similar data gathering and extraction tools.
            <br />
            <br />
            11.Interfere with, disrupt, or create an undue burden on the
            Website/Mobile Application or the networks or services connected to
            the Website/Mobile Application.
            <br />
            <br />
            12.Attempt to impersonate another user or person or use the username
            of another user.
            <br />
            <br />
            13.Sell or otherwise transfer your profile.
            <br />
            <br />
            14.Use any information obtained from the Website/Mobile Application
            in order to harass, abuse, or harm another person.
            <br />
            <br />
            15.“Stalk” or otherwise harass another user or employee of the
            Services.
            <br />
            <br />
            16.Access or attempt to access another user’s account without his or
            her consent.
            <br />
            <br />
            17.Use the Website/Mobile Application as part of any effort to
            compete with us or otherwise use the Website/Mobile Application
            and/or the Content for any revenue-generating endeavour or
            commercial enterprise.
            <br />
            <br />
            18.Decipher, decompile, disassemble, or reverse engineer any of the
            software comprising or in anyway making up a part of the
            Website/Mobile Application.
            <br />
            <br />
            19.Attempt to bypass any measures of the Website/Mobile Application
            designed to prevent or restrict access to the Website/Mobile
            Application, or any portion of the Website/Mobile Application.
            <br />
            <br />
            20.Harass, annoy, intimidate, or threaten any of our employees or
            agents engaged in providing any portion of the Website/Mobile
            Application to you.
            <br />
            <br />
            21.Delete the copyright or other proprietary rights notice from any
            Content.
            <br />
            <br />
            22.Copy or adapt the Website/Mobile Application software, including
            but not limited to Flash, PHP, HTML, JavaScript, Angular or any
            other code.
            <br />
            <br />
            23. Upload or transmit (or attempt to upload or to transmit)
            viruses, Trojan horses, or other material, including excessive use
            of capital letters and spamming (continuous posting of repetitive
            text), that interferes with any party’s uninterrupted use and
            enjoyment of the Website/Mobile Application or modifies, impairs,
            disrupts, alters, or interferes with the use, features, functions,
            operation, or maintenance of the Website/Mobile Application.
            <br />
            <br />
            24.Upload or transmit (or attempt to upload or to transmit) any
            material that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or
            other similar devices (sometimes referred to as “spyware” or
            “passive collection mechanisms” or “pcms”).
            <br />
            <br />
            25.Except as may be the result of a standard search engine or
            Internet browser usage, use, launch, develop, or distribute any
            automated system, including without limitation, any spider, robot,
            cheat utility, scraper, or offline reader that accesses the
            Website/Mobile Application, or using or launching any unauthorized
            script or other software.
            <br />
            <br />
            26.Disparage, tarnish, or otherwise harm, in our opinion, us and/or
            the Website/Mobile Application.
            <br />
            <br />
            27.Use the Website/Mobile Application in a manner inconsistent with
            any applicable laws or regulations.
            <br />
            <br />
            28.Your privilege to use the Services depends on your compliance
            with the community standards and conduct guidelines set forth above.
            We may revoke your privileges to use all or a portion of the
            Services and/or take any other appropriate measures to enforce these
            community standards and conduct guidelines if violations are brought
            to our attention. Further, if you fail to adhere to our community
            standards and conduct guidelines, or any part of these Terms &
            Conditions, we may terminate, in our sole discretion, your use of,
            or participation in, any Public Forum or the Services. Any violation
            of this section may subject you to civil and/or criminal liability.
            <br />
            <br />
            YOU AGREE AND UNDERSTAND THAT YOU MAY BE HELD LEGALLY RESPONSIBLE
            FOR DAMAGES SUFFERED BY OTHER MEMBERS OR THIRD PARTIES AS THE RESULT
            OF YOUR REMARKS, INFORMATION, FEEDBACK OR OTHER CONTENT POSTED OR
            MADE AVAILABLE ON THE SERVICES (INCLUDING ANY FORUM) THAT IS DEEMED
            DEFAMATORY OR OTHERWISE LEGALLY ACTIONABLE. UNDER SECTION 79 OF THE
            INFORMATION TECHNOLOGY AMENDMENT ACT, 2008,{" "}
            <strong>FITNEARN</strong> IS NOT LEGALLY RESPONSIBLE, NOR CAN IT BE
            HELD LIABLE FOR DAMAGES OF ANY KIND, ARISING OUT OF OR IN CONNECTION
            TO ANY DEFAMATORY OR OTHERWISE LEGALLY ACTIONABLE REMARKS,
            INFORMATION, FEEDBACK OR OTHER CONTENT POSTED OR MADE AVAILABLE ON
            THE SERVICES.
            <br />
            <br />
            <b>ANTI HARRASMENT POLICY</b>
            <br />
            <br />
            FitnEarn is committed to creating a safe and inclusive environment
            for all users. Harassment in any form is strictly prohibited on our
            platform, to ensure a welcoming and positive experience for everyone
            in our community. This policy applies equally to all users,
            protecting both public figures and private individuals from
            harassment and abuse. We encourage the use of FitnEarns reporting
            tools to help safeguard our community against such behaviour.
            Violations of this policy will lead to immediate exclusion from the
            FitnEarn community and termination of the offenders account.
            <br />
            <p className="font-semibold underline">
              Prohibited Behaviours Include:
            </p>
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px] mt-2">
            Persistently contacting someone who has made it clear they do not
            wish to communicate.
            <br />
            Sending unsolicited messages to a large number of users.
            <br />
            Engaging in or promoting:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Use of profane language targeted at individuals or groups.
            <br />
            Threats of death, serious illness, injury, or causing physical harm.
            <br />
            Bullying, trolling, or any form of harassment intended to
            intimidate, upset, or embarrass.
            <br />
            Spreading falsehoods about victims of tragic events or their
            families to discredit or harm their reputation.
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            Group messages that harass, intimidate, or aim to distress.
            <br />
            Maliciously targeting individuals, including public figures,
            especially those who have been victims of sexual assault or
            exploitation by:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Threatening violence to silence or intimidate participants in any
            discussion.
            <br />
            Encouraging self-harm or suicide.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Falsely accusing individuals, including victims or survivors of
            tragedies, of lying or fabricating their experiences.
            <br />
            Directing harassment towards minors, including but not limited to:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Suggestive claims regarding sexual activities or diseases.
            <br />
            Altering content to include violent imagery.
            <br />
            Threats of serious illness, death, or violence.
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            Creating content specifically designed to demean, insult, or harm
            individuals through:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Offensive language.
            <br />
            Derogatory physical descriptions.
            <br />
            Accusations of blasphemy.
            <br />
            Expressions of contempt or disgust.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <p className="font-semibold underline">Enforcement</p>
            <p>
              {" "}
              FitnEarn takes these policies seriously and will take immediate
              action against those found in breach. Our goal is to maintain a
              safe space for dialogue, growth, and connection within the fitness
              and wellness community. We reserve the right to remove any content
              that violates these guidelines and to take appropriate measures,
              including account termination, against those responsible for such
              violations.
            </p>
            <br />
            <b className="mt-5">
              FITNEARN COMMUNITY/SOCIAL CONTRIBUTIONS POLICY
            </b>
            <br />
            FitnEarn provides interactive spaces such as forums, blogs, chat
            rooms, groups, and messaging features (collectively,
            “Community/Social Features”) as part of our Services. These are
            designed to allow you to upload, share, post, or otherwise exchange
            content and information with other users. All interactions within
            these Community Features are public and not private. You bear sole
            responsibility for the content you share (&quot;User
            Contributions&quot;) and the consequences thereof.
            <br />
            <p className="font-semibold underline">
              {" "}
              Contributions on the Platform
            </p>
            <br />
            Through the FitnEarn platform, you are encouraged to engage, share,
            and contribute by posting, transmitting, or submitting various forms
            of content, including texts, videos, photos, graphics, and personal
            insights (collectively, &quot;Contributions&quot;). These
            Contributions may be accessible to other platform users and possibly
            through external sites. By sharing Contributions, you accept that
            they are considered non-confidential and non-proprietary.
            <br />
            By providing contributions, you affirm that:
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            Your Contributions do not infringe upon any rights, such as
            copyright, patents, trademarks, trade secrets, or moral rights of
            any third party.
            <br />
            You possess or have obtained all necessary permissions, rights, and
            consents to allow your Contributions to be used on the FitnEarn
            platform as envisioned by these terms.
            <br />
            All individuals identifiable in your Contributions have given their
            consent for their likeness to be used in the manner intended by the
            platform.
            <br />
            The information and content in your Contributions are accurate and
            truthful.
            <br />
            Your Contributions are not promotional spam, unsolicited schemes, or
            any form of solicitation.
            <br />
            You refrain from posting content that is obscene, offensive,
            harassing, or otherwise objectionable as deemed by FitnEarn.
            <br />
            You do not engage in behaviour or share content that demeans, mocks,
            or threatens others.
            <br />
            Your Contributions do not promote violence or illegal acts, nor do
            they incite harm against individuals or entities.
            <br />
            You ensure your Contributions comply with all relevant laws and do
            not breach any regulations or rules.
            <br />
            Your Contributions respect the privacy and publicity rights of
            others and do not exploit individuals under the age of 18 in anyway.
            <br />
            You avoid sharing content that could be considered child pornography
            or that harms minors in anyway.
            <br />
            Your Contributions are free from discriminatory or offensive remarks
            related to race, national origin, gender, sexual preference, or
            physical disabilities.
            <br />
            You ensure your Contributions do not contravene these Terms and
            Conditions or any applicable laws.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <p className="font-semibold underline">
              Consequences of Violations
            </p>
            <br />
            Failure to adhere to these guidelines may lead to actions including
            but not limited to the removal of your contributions, suspension of
            your access to social/community Features, or termination of your
            FitnEarn account. FitnEarn reserves the right to enforce these
            policies at its discretion to maintain a respectful and safe
            community environment.
            <br />
            FITNEARN DOES NOT REPRESENT, WARRANT OR GUARANTEE THE ACCURACY OF
            INFORMATION POSTED BY ANY USER, AND HEREBY DISCLAIMS ALL
            RESPONSIBILITY AND LIABILITY FOR ANY INFORMATION PROVIDED BY USER IN
            CONNECTION WITH THEIR USE OF THE SERVICES.
            <br />
            <b> FITNEARN MOBILE APPLICATION LICENSE AGREEMENT</b>
            <br />
            <p className="font-semibold underline">License for Use</p>
            <br />
            By downloading the FitnEarn mobile application, you are granted a
            revocable, non-exclusive, non-transferable, limited license to
            install and operate the application on mobile devices that you own
            or control. This license is granted solely for your personal,
            non-commercial use, strictly in accordance with the terms outlined
            in this agreement.
            <br />
            <p className="font-semibold underline">Prohibited Actions</p>
            <br />
            As a user of the FitnEarn application, you agree not to:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Decompile, reverse engineer, disassemble, or attempt to discover the
            source code or decrypt the application.
            <br />
            Modify, adapt, enhance, translate, or create derivative works from
            the application without prior written permission.
            <br />
            Violate any laws, regulations, or rules in your use of the
            application.
            <br />
            Remove, conceal, or alter any proprietary notices, including
            copyright and trademark notices, related to the application.
            <br />
            Utilize the application for any revenue-generating or commercial
            activities not expressly permitted by this license.
            <br />
            Distribute the application across a network where it could be used
            by multiple devices simultaneously.
            <br />
            Develop, produce, or distribute any service or product that competes
            with or replaces the FitnEarn application.
            <br />
            Use the application to send automated queries or unsolicited
            commercial communications.
            <br />
            Employ any proprietary information, interfaces, or other
            intellectual property of FitnEarn in the creation of any software or
            hardware accessories for use with the application.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <b>Use on Apple and Android Devices</b>
            <br />
            This license extends to the use of the FitnEarn application obtained
            via the Apple App Store or Google Play Store (&quot;App
            Distributors&quot;) under these conditions:
            <br />
            The license granted hereunder is limited to a non-transferable
            license to use the application on Apple iOS or Android-operated
            devices, according to the usage rules specified in the service terms
            of the App Distributors.
            <br />
            FitnEarn is responsible for all maintenance and support services for
            the mobile application as required by these terms or applicable
            laws. Each App Distributor is not obligated to offer maintenance or
            support services for the application.
            <br />
            Should the application fail to comply with any applicable warranty,
            you may inform the respective App Distributor, and they may refund
            the purchase price of the application per their policies. App
            Distributors have no other warranty obligations concerning the
            application.
            <br />
            You confirm that:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            You are not located in a country under embargo by the Indian
            government or labelled as a &quot;terrorist supporting&quot;
            country.
            <br />
            You are not on any Indian government list of banned or restricted
            parties.
            <br />
            You agree to comply with all third-party terms when using the
            application. For example, using the application must not breach any
            VoIP service agreement.
            <br />
            You acknowledge that App Distributors are third-party beneficiaries
            of this license agreement and have the right to enforce these terms
            against you.
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            BY USING THE FITNEARN MOBILE APPLICATION, YOU ACCEPT AND AGREE TO BE
            BOUND BY THE TERMS OF THIS LICENSE AGREEMENT.
            <br />
            <b>FITNEARN SOCIAL MEDIA INTEGRATION POLICY</b>
            <br />
            <p className="font-semibold underline">
              Integration with Third-Party Social Media Accounts
            </p>
            <br />
            FitnEarn offers enhanced functionality by allowing you to link your
            account with external third-party service providers (referred to as
            &quot;Third-Party Accounts&quot;). This can be done in two ways:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            By directly providing your Third-Party Account credentials to
            FitnEarn through our platform.
            <br />
            By authorising FitnEarn to access your Third-Party Accounts
            according to the terms and conditions governing those accounts.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            By linking your Third-Party Accounts, you affirm that you have the
            right to share your login details with us and allow us access
            without violating any terms of those accounts or incurring
            additional fees or limitations from the third-party providers.
            <br />
            <p className="mt-3 font-semibold">
              Access and Use of Social Network Content{" "}
            </p>
            <p className="mt-2 underline">
              Upon linking your Third-Party Accounts:
            </p>
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px] mt-3">
            FitnEarn may access, display, and store content you have saved on
            your Third-Party Accounts (referred to as &quot;Social Network
            Content&quot;) to enhance your experience on our platform. This
            includes but is not limited to friend lists and shared content.
            <br />
            We might also receive and transmit additional information from your
            Third-Party Accounts, as notified by those services. The visibility
            of your personal information from Third-Party Accounts on FitnEarn
            is subject to your privacy settings on those external platforms.
            <br />
            Should a Third-Party Account become inaccessible or our access be
            revoked, the associated Social Network Content may no longer be
            available on FitnEarn. However, you can manage or sever the
            connection between your FitnEarn account and Third-Party Accounts at
            any time.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <p className="mt-3 font-semibold">Important Considerations</p>
            <br />
            Your relationship with any Third-Party Account providers is governed
            solely by your agreement with them. FitnEarn does not review Social
            Network Content for accuracy, legality, or adherence to copyright
            laws, and is not responsible for the content shared through these
            integrations.
            <br />
            You agree that FitnEarn may access your contact lists or email
            address books linked to Third-Party Accounts solely to identify and
            notify you of contacts who are also users of FitnEarn. To disconnect
            your FitnEarn account from Third-Party Accounts, you may use the
            provided contact methods or adjust your account settings
            accordingly. We aim to remove any data received through Third-Party
            Accounts from our servers upon disconnection, except for data such
            as usernames and profile pictures that have become associated with
            your FitnEarn account.
            <br />
            By utilizing the social media integration features of FitnEarn, you
            acknowledge and consent to these terms, enhancing your connectivity
            and experience within our platform.
            <br /> <br />
            <b>THIRD PARTY WEBSITES AND CONTENT</b>
            <br />
            The FitnEarn platform may feature links to external websites
            (&quot;Third-Party Websites&quot;) and include or offer access to
            content such as articles, photos, text, graphics, music, videos,
            apps, and other materials created by third parties
            (&quot;Third-Party Content&quot;). Please note, FitnEarn does not
            conduct thorough reviews, monitoring, or checks on the accuracy,
            suitability, or completeness of any Third-Party Websites or
            Third-Party Content. As such, we cannot be held accountable for the
            content, quality, or policies of any Third-Party Websites or
            Third-Party Content accessed via our platform.
            <br />
            <p className="mt-3 font-semibold">Disclaimer</p>
            The presence of links to Third-Party Websites or the inclusion of
            Third-Party Content on the FitnEarn platform does not imply our
            endorsement or approval. Deciding to engage with any Third-Party
            Websites or Third-Party Content is at your discretion and risk. Once
            you leave the FitnEarn platform, our Terms and Conditions no longer
            apply, and you are advised to review the terms, privacy policies,
            and practices of any Third-Party Websites you visit or from which
            you download or use content.
            <br />
            <p className="mt-3 font-semibold">
              Purchases and Interactions with Third-Party Websites
            </p>
            Any transactions or interactions you engage in with Third-Party
            Websites, including purchases, are strictly between you and the
            respective third party. FitnEarn assumes no responsibility for such
            transactions or interactions. It is your responsibility to ensure
            that any products, services, or information obtained from
            Third-Party Websites meet your expectations and comply with the
            relevant terms of sale or service.
            <br />
            <p className="mt-3 font-semibold">Indemnity</p>
            You agree to absolve FitnEarn from any responsibility for losses or
            damages you may incur due to, your use of Third-Party Content or
            interactions with Third-Party Websites. This includes holding
            FitnEarn harmless against any claims related to the products or
            services offered or advertised on these external sites.
            <br />
            BY USING THE FITNEARN PLATFORM, YOU ACKNOWLEDGE AND ACCEPT THIS
            POLICY REGARDING THIRD-PARTY WEBSITES AND THIRD-PARTY CONTENT,
            RECOGNIZING THAT YOUR USE OF SUCH EXTERNAL RESOURCES IS GOVERNED BY
            THEIR RESPECTIVE TERMS AND NOT BY FITNEARN’S POLICIES.
            <br />
            <b>FITNEARN PLATFORM MANAGEMENT AND OPERATIONS POLICY</b>
            <br />
            <p className="mt-3 font-semibold">
              Platform Oversight and Enforcement
            </p>
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            FitnEarn asserts the right, though not the obligation, to:
            <br />
            Actively monitor the platform for any breaches of our Terms and
            Conditions.
            <br />
            Undertake suitable legal measures against anyone found infringing
            these terms or the law, which may include reporting offenders to law
            enforcement authorities.
            <br />
            At our discretion, limit, restrict, or remove user contributions
            that violate our guidelines or pose a burden on our systems, without
            prior notice or liability.
            <br />
            Manage and curate the content on the platform to ensure it aligns
            with our operational standards and does not overwhelm our
            technological capacities.
            <br />
            Operate the platform in a way that safeguards our rights and
            properties while ensuring its smooth and efficient function.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <p className="mt-3 font-semibold">
              Modifications, Pauses, and Service Interruptions
            </p>
            FitnEarn reserves the complete authority to:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            Alter, omit, or update any content on the platform whenever
            necessary, without prior notification. Our commitment to maintaining
            current information does not imply an obligation to update any
            content.
            <br />
            Modify, halt, or completely discontinue any aspect of the platform
            at our discretion, without advance warning. We bear no
            responsibility for any impact such changes may have on users.
            <br />
            Not guarantee uninterrupted or error-free access to the platform.
            Maintenance, technical issues, or unforeseen problems may lead to
            temporary unavailability or disruptions in service.
            <br />
            Adjust, pause, or cease operations of the platform without notice
            for any reason deemed necessary. We are not liable for any
            inconvenience, loss, or damage resulting from such interruptions.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            By using FitnEarn, you acknowledge and accept these terms,
            understanding that platform availability and content are subject to
            change and may be temporarily inaccessible due to maintenance or
            technical difficulties. These policies are in place to ensure the
            optimal functioning of FitnEarn and to protect the interests of our
            community.
            <br />
            <p className="mt-3 font-semibold">PRIVACY POLICY</p>
            We care about data privacy and security. Please review our Privacy
            Policy at: https://www.fitnearn.com/privacy-policy
            <br />
            <p className="mt-3 font-semibold">
              FITNEARN INTELLECTUAL PROPERTY RIGHTS POLICY
            </p>
            FitnEarn is committed to upholding the intellectual property rights
            of others and expects its users to do the same. Should you suspect
            that your intellectual property rights have been infringed upon by
            material accessible on or through our platform, we urge you to
            inform us promptly. Please direct your information of alleged
            infringement to us using the designated contact details provided on
            our platform (referred to here as &quot;IP NOTICE&quot;).
            <br />
            Upon receipt, we will forward a copy of your notice to the
            individual responsible for the content in question. It is important
            to note that under Indian Copyright laws, individuals making false
            claims of copyright infringement in their IP Notice may face legal
            consequences, including potential liability for damages. Therefore,
            if there is any doubt regarding the infringement of your copyright
            by material on our platform, consulting with legal counsel before
            submitting a IP Notice is advisable.
            <br />
            FitnEarn reserves the right to terminate the accounts of users who
            are found to be repeat infringers of intellectual property rights.
            <br />
            <p className="mt-3 font-semibold">TERMINATION</p>
            The terms outlined herein will remain effective and binding for as
            long as you utilize the FitnEarn Website or Mobile Application.
            <br />
            FitnEarn reserves the unrestricted right to terminate access or use
            of the Website/Mobile Application for any user, at our sole
            discretion, without any prior notice or liability. This includes the
            right to block specific IP addresses. Termination may be due to any
            breach of the representations, warranties, or covenants made in
            these Terms and Conditions, violation of any laws or regulations, or
            for no specific reason at all.
            <br />
            Should your account be terminated or suspended, regardless of the
            reasons, you are expressly forbidden from creating a new account
            under your own name, someone else&quot;s name, or any fictitious
            name. This prohibition extends to creating accounts on behalf of
            others.
            <br />
            Furthermore, FitnEarn maintains the right to pursue legal actions,
            including civil, criminal, and injunctive remedies, against anyone
            whose actions necessitate such responses.
            <br />
            <p className="mt-3 font-semibold">GOVERNING LAWS</p>
            The Terms and Conditions governing your engagement with the FitnEarn
            Website or Mobile Application are exclusively subject to the laws of
            India. Should any disputes arise under this Agreement, they will be
            resolved in the jurisdiction of the courts situated in Haridwar
            District.
            <br />
            To pursue a legal claim related to the services provided by
            FitnEarn, users must initiate such action within thirty (30) days
            from the date:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            The claim or cause of action first emerged; or
            <br />
            The user first became aware of the circumstances leading to the
            claim, whichever occurs later.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            Failure to initiate a claim within this timeframe will result in the
            permanent waiver of the right to pursue that cause of action.
            <br />
            <b> FITNEARN DISPUTE RESOLUTION FRAMEWORK</b>
            <p className="mt-3 font-semibold"> Amicable Resolution Attempt</p>
            For any disputes, controversies, or claims arising from or related
            to this Agreement or any services provided by the FitnEarn platform,
            including questions about its existence, validity, or termination,
            both parties will endeavour to resolve the matter amicably. If a
            resolution cannot be reached within 30 days of notifying the other
            party of the dispute, either party has the option to proceed to
            binding arbitration.
            <br />
            <p className="mt-3 font-semibold">Binding Arbitration Process</p>
            In line with the Indian Arbitration & Conciliation Act, 1996,
            unresolved disputes will be submitted to binding arbitration. This
            process will address the dispute on an individual basis, without
            consolidation with claims of other parties. A sole arbitrator,
            appointed according to the Act, will oversee the arbitration, which
            will take place in Pune, with English as the arbitration language.
            Both parties retain the right to seek interim relief from a Pune
            jurisdiction court to protect their rights or property while
            arbitration is pending. The confidentiality of the arbitration
            process is paramount, with disclosures only permitted as required by
            law or for enforcing the arbitration award. The costs of
            arbitration, including administrative fees and legal expenses, will
            be shared equally between the parties.
            <br />
            <p className="mt-3 font-semibold">Arbitration Limitations</p>
            Arbitration will be limited strictly to the dispute between the
            involved parties, under the following conditions:
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            No arbitration will be merged with other proceedings.
            <br />
            There is no provision for the dispute to be arbitrated as a class
            action or to employ class action procedures.
            <br />
            Disputes cannot be represented on behalf of the general public or
            any group of persons not directly involved in the arbitration.
            <br />
          </span>
          <span className=" mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            <p className="mt-3 font-semibold">Exceptions to Arbitration</p>
            Certain disputes are exempt from the arbitration agreement,
            specifically:
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            Issues aiming to enforce or protect intellectual property rights.
            <br />
            Cases involving allegations of theft, piracy, privacy breaches, or
            unauthorized use.
            <br />
            Claims seeking injunctive relief.
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            In situations where arbitration is deemed inapplicable or
            unenforceable, such disputes will be resolved in the competent
            courts within the jurisdiction of Pune, to which both parties agree
            to submit.
            <br />
            THIS DISPUTE RESOLUTION POLICY WILL REMAIN EFFECTIVE EVEN AFTER THE
            TERMINATION OF THE AGREEMENT.
            <br />
            <p className="mt-3 font-semibold">CONTENT CORRECTIONS POLICY</p>
            On occasion, the FitnEarn Website or Mobile Application may display
            content that includes typographical mistakes, inaccuracies, or
            missing information related to service descriptions, pricing,
            availability, and more. We are committed to maintaining accurate and
            up-to-date information, and as such, we hold the authority to
            rectify any errors, inaccuracies, or omissions. Furthermore, we may
            modify or refresh content at any moment without issuing a prior
            announcement.
            <br />
            <p className="mt-3 font-semibold">FITNEARN USAGE DISCLAIMER</p>
            The FitnEarn Website and Mobile Application are made available to
            you on an &quot;as-is&quot; and &quot;as-available&quot; basis. Your
            decision to access and use our platform and services is at your own
            risk. We expressly disclaim, to the maximum extent allowed by law,
            all warranties, whether express or implied, including but not
            limited to implied warranties of merchantability, suitability for a
            specific purpose, and non-infringement.
            <br />
            We do not guarantee the accuracy, reliability, or completeness of
            any content found on the FitnEarn platform or any linked sites.
            FitnEarn assumes no liability for any errors or inaccuracies in
            content, any personal injury or property damage arising from your
            use of the platform, unauthorized access to our servers,
            interruption or cessation of communication with the platform, or any
            harmful components that may be transmitted by third parties through
            our platform. Additionally, we are not responsible for any loss or
            damage resulting from the utilization of content posted, shared, or
            made available through the FitnEarn platform.
            <br />
            FitnEarn does not endorse, guarantee, or assume responsibility for
            any product or service advertised or offered by third parties
            through our platform or any hyperlinked website, nor do we oversee
            any transactions between you and third-party providers. When
            engaging in transactions or using products and services found
            through FitnEarn or any linked sites, we advise you to exercise
            caution and make informed decisions.
            <br />
            This disclaimer serves to highlight the inherent risks associated
            with using online platforms and to remind users to proceed with
            caution and make use of their best judgment when interacting with
            content, entering into transactions, or utilising services offered
            through the FitnEarn platform or its affiliates.
            <br />
            <p className="mt-3 font-semibold">LIABILITY LIMITATIONS</p>
            FITNEARN, ALONG WITH OWNER, EMPLOYEES, AND AGENTS, SHALL NOT BE HELD
            ACCOUNTABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
            SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES. THIS INCLUDES, BUT IS NOT
            LIMITED TO, FINANCIAL LOSSES SUCH AS LOST PROFITS OR REVENUE, DATA
            LOSS, OR ANY OTHER FORM OF DAMAGE THAT MAY ARISE FROM YOUR
            ENGAGEMENT WITH THE FITNEARN WEBSITE OR MOBILE APPLICATION. THIS
            LIMITATION APPLIES REGARDLESS OF WHETHER WE HAVE BEEN INFORMED OF
            THE POTENTIAL FOR SUCH DAMAGES.
            <br />
            <p className="mt-3 font-semibold">INDEMNIFICATION AGREEMENT</p>
            By utilising the FitnEarn platform, you commit to defend, indemnify,
            and absolve FitnEarn, its subsidiaries, affiliates, officers,
            agents, partners, and employees, from any claims, liabilities,
            losses, damages, or expenses, including reasonable attorney fees,
            brought forth by third parties due to or arising from your actions,
            including but not limited to:
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            The content you contribute to the platform;
            <br />
            Your interaction with and use of the FitnEarn Website or Mobile
            Application;
            <br />
            Any violations of these Terms and Conditions;
            <br />
            Breaches of the representations and warranties you have provided
            within these Terms and Conditions;
            <br />
            Infringement upon the rights of third parties, especially concerning
            intellectual property rights; or
            <br />
            Any direct harm caused to another user of the platform that resulted
            from connections made through FitnEarn.
            <br />
          </span>
          <span className="mq450:text-xl font-medium font-Lato leading-[33px]">
            <br />
            Should such a situation arise, FitnEarn reserves the right to take
            over the exclusive defence and control of any claim you are obliged
            to indemnify against, and you must cooperate with FitnEarn’s defence
            strategy at your own cost. FitnEarn pledges to make a reasonable
            effort to keep you informed of any such claims, actions, or
            proceedings immediately upon awareness.
            <br />
            <p className="mt-3 font-semibold">USER DATA POLICY</p>
            FitnEarn is committed to managing and preserving the data you share
            through our Website or Mobile Application, which includes data
            necessary for optimising the platform performance and enhancing your
            user experience. We implement encryption and conduct regular backups
            to safeguard this data. However, the responsibility for any data you
            transmit or generate through your activities on FitnEarn rests
            solely with you.
            <br />
            By using FitnEarn, you acknowledge and agree that FitnEarn will not
            be held accountable for any potential loss or corruption of your
            data. Furthermore, you relinquish any claims against FitnEarn
            related to such data loss or corruption.
            <br />
            <p className="mt-3 font-semibold">DIGITAL COMMUNICATION CONSENT</p>
            Engaging with the FitnEarn platform, whether by browsing our site,
            sending emails, or filling out online forms, is considered a form of
            electronic communication. By using FitnEarn, you hereby consent to
            receiving communications from us electronically. This includes, but
            is not limited to, emails, notifications on our Website or Mobile
            Application, which fulfil any legal requirements that such
            communications be in writing.
            <br />
            By agreeing to these terms, you accept the validity of electronic
            signatures, digital contracts, electronic orders, and other virtual
            records used during transactions and interactions initiated or
            completed through FitnEarn or its services.
            <br />
            Furthermore, you relinquish any claim to the necessity of physical
            signatures, non-digital records, or other non-electronic methods of
            transaction confirmation and document retention that might be
            mandated by any law, regulation, or ordinance across various
            jurisdictions.
            <br />
            <p className="mt-3 font-semibold">OTHER PROVISIONS</p>
            The entirety of the Terms and Conditions, along with any additional
            policies or operational guidelines provided by FitnEarn on the
            Website or Mobile Application, form the complete and exclusive
            agreement between you and FitnEarn. Our non-exercise or enforcement
            of any rights or provisions within these Terms does not equate to a
            waiver of such rights or provisions. These Terms are enforceable to
            the maximum extent permitted by law.
            <br />
            FitnEarn reserves the right to transfer or assign its rights and
            duties under these Terms to any party at any given time without
            restriction. We are not accountable for any loss, damage, or delays
            resulting from circumstances beyond our reasonable control. Should
            any section, or portion thereof, within these Terms be deemed
            invalid, illegal, or unenforceable, it shall be considered
            detachable from the rest, which shall remain in full force and
            effect.
            <br />
            No joint venture, partnership, employment, or agency relationship
            exists between you and FitnEarn due to, this agreement or through
            your use of the Website or Mobile Application. These Terms shall not
            be interpreted against the drafting party, thereby nullifying any
            defence you might have regarding their digital format or the
            electronic execution of these agreements.
            <br />
            <p className="mt-3 font-semibold">
              USER QUERY, COMPLAINTS AND GRIEVANCE REDRESSAL
            </p>
            Should you require additional details about using the FitnEarn
            platform, encounter any violations of our Terms of Use, come across
            any content that may be deemed inappropriate, or if you have any
            complaints or issues needing resolution, we encourage you to reach
            out to us directly:
            <br />
            FitnEarn Contact Information
            <br />
            <p>
              <span className="mr-2 underline">Address:</span> 395, Purav Deen
              Dayal, Old Railway Road, Veer Bhawan Nagar, Roorkee-247667,
              Haridwar District, Uttarakhand, India{" "}
            </p>
            <p>
              <span className="mr-2 underline">Phone:</span> +91-8630222654
            </p>
            <p>
              <span className="mr-2 underline">Email:</span>{" "}
              help-support@fitnearn.com
            </p>
            <br />
            Your concerns are important to us, and they will be addressed
            through our dedicated Grievance Redressal Mechanism. To ensure we
            can address your concerns effectively, please provide a
            comprehensive description of the issue, including any specific
            details or examples. This information will be invaluable in helping
            us understand and resolve your complaint or grievance promptly.
            <br />
            FitnEarn commits to resolving all grievances within a 30-day period
            from the receipt of the complaint, adhering to the timeframes set by
            relevant regulations. Your satisfaction and the integrity of our
            platform are our top priorities.
            <br />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
