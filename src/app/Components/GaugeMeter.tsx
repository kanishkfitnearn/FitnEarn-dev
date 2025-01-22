// import React, { useEffect, useState } from 'react';

// const SvgGauge = ({ percentageValue, range }: { percentageValue: number, range: number }) => {
//   const [percentage, setPercentage] = useState(percentageValue);

//   useEffect(() => {
//     setPercentage(percentageValue);
//   }, [percentageValue]);

//   useEffect(() => {
//     initialGaugeSetup(
//       "dashed-gauge-value-path",
//       "url(#gradient)",
//       percentage,
//       range,
//       setDashedGaugeValue,
//     );
//   }, [percentage, range]);

//   return (
//     <div className="general-wrapper">
//       <div className="svg-gauge relative h-[200px] w-[300px] svg-gauge__container gauge-container dashed">
//         <div id="dashed-svg-container">
//           <svg id="svg-dashed-gauge" viewBox="0 0 100 55">
//             <defs>
//               <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
//                 <stop offset="0%" stopColor="#E3206D" />
//                 <stop offset="100%" stopColor="#F16A33" />
//               </linearGradient>
//             </defs>
//             <path
//               className="meter-back-path"
//               d="M 10 50 A 40 40 0 1 1 90 50"
//               fill="none"
//             />
//             <path
//               id="dashed-gauge-value-path"
//               fill="none"
//               className="meter-value"
//               d="M 10 50 A 40 40 0 1 1 90 50"
//             />
//           </svg>
//         </div>
//         <div className="text-neutral-100 text-center text-sm font-bold font-['Lato']">
//           Your Weight Loss
//         </div>
//       </div>
//       <style jsx>{`
//         .general-wrapper {
//           margin: 0 auto;
//           display: flex;
//           flex-direction: row;
//           justify-content: center;
//           align-items: center;
//           flex-wrap: wrap;
//         }
//         .gauge-container {
//           width: 300px;
//           height: 80px;
//           display: block;
//           float: left;
//           padding: 10px;
//           background-color: #262626;
//           margin: 7px;
//           border-radius: 3px;
//           position: relative;
//         }
//         .svg-gauge__container {
//           position: relative;
//           height: 150px;
//         }
//         .svg-gauge__container svg {
//           height: 85px;
//           margin: 20px auto;
//           display: block;
//         }
//         .svg-gauge__container path {
//           strokeLinecap: round;
//         }
//         .meter-back-path {
//           stroke: grey;
//           strokeWidth: 2;
//         }
//         .meter-value {
//           strokeWidth: 5;
//           stroke: url(#gradient);
//           stroke-dasharray: 126 500;
//           stroke-dashoffset: 126;
//           animation: dash 3s 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
//         }
//         @keyframes dash {
//           to {
//             stroke-dashoffset: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// function initialGaugeSetup(
//   gaugeElementId: string,
//   meterColor: string,
//   initialValue: number,
//   range: number,
//   setGaugeValueCallback: (
//     gauge: HTMLElement,
//     percentage: number,
//     color: string,
//   ) => void,
// ) {
//   const gaugeElement = document.getElementById(gaugeElementId) as HTMLElement;

//   const scaledPercentage = (initialValue / range) * 100;
//   setGaugeValueCallback(gaugeElement, scaledPercentage, meterColor);
// }

// function setDashedGaugeValue(
//   gaugeDOMElement: HTMLElement,
//   percentage: number,
//   color: string,
// ) {
//   const arcLength = 126; // circle=2*pi*radius; 126=pi*40
//   const emptyDashLength = 500; // must be larger than the rest of the full circle without arc, so larger than 2*pi*radius - arcLength
//   const filledArcLength = arcLength * (percentage / 100);
//   gaugeDOMElement.style.strokeDasharray = `${filledArcLength} ${emptyDashLength}`;
//   gaugeDOMElement.style.strokeDashoffset = filledArcLength;
//   gaugeDOMElement.style.stroke = color;
// }

// export default SvgGauge;

import React, { useEffect, useState } from "react";

const SvgGauge = ({ percentageValue, range }: any) => {
  const [percentage, setPercentage] = useState(percentageValue);

  useEffect(() => {
    setPercentage(percentageValue);
  }, [percentageValue]);

  useEffect(() => {
    initialGaugeSetup(
      "dashed-gauge-value-path",
      percentage,
      range,
      setDashedGaugeValue,
    );
  }, [percentage, range]);

  return (
    <div className="general-wrapper">
      <div className="svg-gauge relative h-[300px] w-[400px] svg-gauge__container gauge-container dashed">
        <div id="dashed-svg-container">
          <svg id="svg-dashed-gauge" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#E3206D" />
                <stop offset="100%" stopColor="#F16A33" />
              </linearGradient>
            </defs>
            <path
              className="meter-back-path"
              d="M 10 45 A 40 40 0 1 1 90 45"
              fill="none"
            />
            <path
              id="dashed-gauge-value-path"
              fill="none"
              className="meter-value"
              d="M 10 45 A 40 40 0 1 1 90 45"
            />
          </svg>
        </div>
        {/* <div className="text-neutral-100 text-center text-sm font-bold font-['Lato']">
                    Your Weight Loss
                </div> */}
      </div>
      <style jsx>{`
        .general-wrapper {
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .gauge-container {
          width: 300px;
          height: 150px;
          display: block;
          float: left;
          // padding: 10px;
          background-color: #262626;
          // margin: 7px;
          margin-top: 10px;
          border-radius: 3px;
          position: relative;
        }
        .svg-gauge__container {
          position: relative;
          height: auto;
        }
        .svg-gauge__container svg {
          height: 150px;
          margin: 0px auto;
          display: block;
        }
        .svg-gauge__container path {
          strokeLinecap: round;
        }
        .meter-back-path {
          stroke: grey;
          strokeWidth: 8; /* Increased thickness */
        }
        .meter-value {
          strokeWidth: 10; /* Increased thickness */
          stroke: url(#gradient);
          stroke-dasharray: 180 200;
          stroke-dashoffset: 180;
          animation: dash 3s 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 1;
          }
        }
      `}</style>
    </div>
  );
};

function initialGaugeSetup(
  gaugeElementId: any,
  initialValue: any,
  range: any,
  setGaugeValueCallback: any,
) {
  const gaugeElement = document.getElementById(gaugeElementId);

  // Ensure the percentage is correctly scaled within the range
  const scaledPercentage = (initialValue / range) * 100;
  setGaugeValueCallback(gaugeElement, scaledPercentage);
}

function setDashedGaugeValue(gaugeDOMElement: any, percentage: any) {
  const arcLength = 180; // Adjusted for new size
  const emptyDashLength = 500; // Must be larger than the rest of the full circle without arc, so larger than 2*pi*radius - arcLength
  const filledArcLength = arcLength * (percentage / 100);
  gaugeDOMElement.style.strokeDasharray = `${filledArcLength} ${emptyDashLength}`;
  gaugeDOMElement.style.strokeDashoffset = filledArcLength;
}

export default SvgGauge;
