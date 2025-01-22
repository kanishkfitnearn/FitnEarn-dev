// components/TagsInput.js
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
const TagsInput = ({ tags: initialTags, selectedTags }: any) => {
  const [tags, setTags] = useState(initialTags || []);
  const { toast } = useToast();
  const removeTags = (indexToRemove: any) => {
    const newTags = tags.filter(
      (_: any, index: any) => index !== indexToRemove,
    );
    setTags(newTags);
    selectedTags(newTags);
  };

  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

  const addTags = (event: any) => {
    if (event.target.value !== "") {
      if (tags.length < 7) {
        // Check if there are less than 5 tags
        const newTag = event.target.value.startsWith(" ")
          ? event.target.value
          : ` ${event.target.value}`;

        const newTags = [...tags, newTag];
        setTags(newTags);
        selectedTags(newTags);
        event.target.value = ""; // Clear input
      } else {
        toast({
          title: "Max 7 tags are allowed!",
          description: "",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="tags-input h-[40px] bg-neutral-400 mq450:h-auto ">
      <ul id="tags">
        {tags.map((tag: any, index: any) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        className="text-md text-neutral-500 bg-neutral-400 "
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
      />
    </div>
  );
};

export default TagsInput;
