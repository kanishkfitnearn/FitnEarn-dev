import React, { useEffect, useState } from "react";

const UserProfileInput = ({
  label,
  value,
  type,
  name,
  onChange,
  required,
  id,
  disabled,
  flag,
  placeholder,
  onRemove,
  maxLength,
  enableTruncation = false, // New prop with default value false
  truncationLength = 12, // New prop with default value 12
  truncationBreakpoint = 450, // New prop with default value 450
}: any) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!enableTruncation) {
      setDisplayValue(value);
      return;
    }

    const handleResize = () => {
      if (
        window.innerWidth <= truncationBreakpoint &&
        value.length > truncationLength
      ) {
        setDisplayValue(value.slice(0, truncationLength) + "...");
      } else {
        setDisplayValue(value);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [value, enableTruncation, truncationLength, truncationBreakpoint]);

  return (
    <div className="relative flex flex-col">
      <label
        className="py-2 text-base font-bold leading-normal text-neutral-300 font-Lato"
        htmlFor=""
      >
        {label}
      </label>
      <input
        type={type || "text"}
        name={name || " "}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? placeholder : ""}
        value={displayValue}
        className="text-neutral-400 border-neutral-700 font-Lato focus:outline-none focus:border-neutral-400 focus:outline-none focus:ring-0 bg-neutral-800 w-80 mq1240:w-[250px] h-[42px] p-3 mq450:w-[148px] rounded-lg border  flex-col justify-start items-start gap-2.5 inline-flex"
      />
      {flag && (
        <span
          onClick={onRemove}
          className="absolute cursor-pointer mq450:right-6  right-[23px] top-7 mq1050:right-8 mq1240:right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M8.59698 8.15334L8.24343 8.50689L8.59698 8.86044L12.1216 12.385C12.1507 12.4162 12.1667 12.4574 12.1663 12.5001C12.166 12.5438 12.1484 12.5856 12.1175 12.6165L12.4711 12.9701L12.1175 12.6166C12.0866 12.6475 12.0448 12.665 12.0011 12.6654C11.9584 12.6657 11.9172 12.6497 11.886 12.6206L8.36142 9.096L8.00787 8.74245L7.65431 9.096L4.12565 12.6247L4.12559 12.6246L4.11955 12.6309C4.10418 12.6468 4.08579 12.6595 4.06546 12.6682C4.04512 12.677 4.02325 12.6816 4.00113 12.6817C3.97899 12.6819 3.95705 12.6777 3.93656 12.6693C3.91608 12.661 3.89747 12.6486 3.88182 12.6329L3.52874 12.986L3.88182 12.6329C3.86618 12.6173 3.8538 12.5987 3.84542 12.5782C3.83704 12.5577 3.83282 12.5358 3.83301 12.5136C3.83321 12.4915 3.8378 12.4696 3.84654 12.4493C3.85527 12.429 3.86797 12.4106 3.88389 12.3952L3.88394 12.3953L3.89009 12.3891L7.41875 8.86044L7.77231 8.50689L7.41875 8.15334L3.89418 4.62876C3.86508 4.59757 3.84903 4.55637 3.8494 4.51363C3.84978 4.46993 3.86731 4.42813 3.89821 4.39723C3.92911 4.36633 3.97091 4.3488 4.01461 4.34842C4.05734 4.34805 4.09855 4.36411 4.12974 4.3932L7.65431 7.91778L8.00787 8.27133L8.36142 7.91778L11.8901 4.38911L11.8901 4.38916L11.8962 4.38291C11.9116 4.36699 11.9299 4.3543 11.9503 4.34556C11.9706 4.33683 11.9925 4.33223 12.0146 4.33204C12.0367 4.33185 12.0587 4.33606 12.0792 4.34444C12.0997 4.35282 12.1183 4.3652 12.1339 4.38084L12.487 4.02777L12.1339 4.38085C12.1496 4.3965 12.1619 4.41511 12.1703 4.43559C12.1787 4.45607 12.1829 4.47802 12.1827 4.50014C12.1825 4.52227 12.1779 4.54414 12.1692 4.56448C12.1605 4.58482 12.1478 4.60321 12.1318 4.61858L12.1318 4.61852L12.1256 4.62467L8.59698 8.15334Z"
              fill="#A3A3A3"
              stroke="#A3A3A3"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default UserProfileInput;
