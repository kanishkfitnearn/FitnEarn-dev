import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define fitness level options
const fitnessLevels = ["Beginner", "Enthusiast", "Intermediate", "Advanced"];

const FitnessLevelDropdown = ({
  editedProfile,
  handleInputChange,
  edit,
}: any) => {
  const commonStyles =
    "bg-neutral-800 text-neutral-400 w-80 h-[42px] p-3 rounded-lg border border-neutral-600 flex items-center justify-between";

  return (
    <div className="flex flex-col">
      <label
        className="py-2 text-base font-bold leading-normal text-neutral-300 font-Lato"
        htmlFor="fitnessLevel"
      >
        Fitness Level
      </label>
      {edit ? (
        <DropdownMenu>
          <DropdownMenuTrigger className={commonStyles}>
            {editedProfile.fitnessLevel?.fitnessLevelName ||
              "Select Fitness Level"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border rounded-lg bg-neutral-800 text-neutral-400 w-80 border-neutral-600">
            {" "}
            {fitnessLevels.map((level) => (
              <DropdownMenuItem
                key={level}
                onClick={() =>
                  handleInputChange("fitnessLevel", {
                    ...editedProfile.fitnessLevel,
                    fitnessLevelName: level,
                  })
                }
                className="cursor-pointer fitness-level-item hover:bg-neutral-400 hover:text-neutral-800"
              >
                {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className={commonStyles}>
          {editedProfile.fitnessLevel?.fitnessLevelName || "Not specified"}
        </div>
      )}
    </div>
  );
};

export default FitnessLevelDropdown;
