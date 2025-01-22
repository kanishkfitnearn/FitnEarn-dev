"use client";
import { useState } from "react";

interface CommentOrReplyWithReadMoreProps {
  replyFromComment: {
    comment: string;
  };
  itIsFor: string; // Add itIsFor to the props interface
}

const CommentOrReplyWithReadMore = ({
  replyFromComment,
  itIsFor,
}: CommentOrReplyWithReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the text is expanded

  const maxCharLimit = 312; // Character limit before showing 'read more'
  const { comment } = replyFromComment;

  const toggleReadMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      {itIsFor === "comment" ? (
        <>
          <p className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal md:leading-[34px] whitespace-pre-wrap break-words">
            {/* Check if the comment exceeds the limit */}
            {isExpanded || replyFromComment.comment.length <= maxCharLimit ? (
              replyFromComment.comment // Show full comment if expanded or if it's already shorter than the limit
            ) : (
              <>
                {replyFromComment.comment.slice(0, maxCharLimit)}...
                <span
                  onClick={toggleReadMore}
                  className="cursor-pointer mid-heading font-medium ml-2"
                >
                  Read More
                </span>
              </>
            )}
          </p>
          {/* 'Show less' link when the text is expanded */}
          {isExpanded && (
            <span
              onClick={toggleReadMore}
              className="cursor-pointer mid-heading font-medium"
            >
              Show Less
            </span>
          )}
        </>
      ) : (
        <div className="flex flex-col max-w-[91vw] leading-1.5 pt-0 p-4 border-[1px] border-[#404040] bg-[#262626] rounded-e-xl rounded-es-xl dark:bg-[#171717]">
          <p className="text-[16px] md:text-[20px] bg-[#262626] text-[#A3A3A3] font-normal leading-[28px] py-2.5 whitespace-pre-wrap break-words">
            {/* Check if the comment exceeds the limit */}
            {isExpanded || comment.length <= maxCharLimit ? (
              comment // Show full comment if expanded or if it's already shorter than the limit
            ) : (
              <>
                {comment.slice(0, maxCharLimit)}...
                <span
                  onClick={toggleReadMore}
                  className="cursor-pointer mid-heading font-medium ml-2"
                >
                  Read More
                </span>
              </>
            )}
          </p>
          {/* 'Show less' link when the text is expanded */}
          {isExpanded && (
            <span
              onClick={toggleReadMore}
              className="cursor-pointer mid-heading font-medium"
            >
              Show Less
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default CommentOrReplyWithReadMore;
