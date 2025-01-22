import React from "react";

interface Block {
  id: string;
  type: string;
  data: any;
}

// interface EditorJsRendererProps {
//   content: {
//     blocks: Block[];
//   };
// }

const EditorJsRenderer = ({ content }: any) => {
  //console.log("EditorJsRenderer content: ", content);

  if (!content) {
    return null;
  }

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            className="text-[16px] md:text-[24px] text-[#D4D4D4] font-medium leading-normal md:leading-[36px] whitespace-normal break-words overflow-wrap break-word max-w-full block "
            key={block.id}
          >
            {block.data.text}
          </p>
        );
      case "header":
        return React.createElement(
          `h${block.data.level}`,
          {
            key: block.id,
            className: `${block.data.level === 1 ? "text-[36px] md:text-[44px]" : ""}
          ${block.data.level === 2 ? "text-[30px] md:text-[38px]" : ""}
          ${block.data.level === 3 ? "text-[24px] md:text-[32px]" : ""} 
           text-[#D4D4D4] font-bold my-2`,
          },
          block.data.text,
        );
      case "list":
        return (
          <ul key={block.id}>
            {block.data.items.map((item: string, index: number) => (
              <li
                key={index}
                className="text-[12px] md:text-[18px] text-[#D4D4D4] font-medium leading-normal md:leading-[36px]"
              >
                {item}
              </li>
            ))}
          </ul>
        );
      case "image":
        return (
          <div key={block.id} className="my-2 md:my-8">
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              className="rounded-[10px] w-full"
            />
            {block.data.caption && <p>{block.data.caption}</p>}
          </div>
        );
      // Add more cases for other block types as needed
      default:
        return null;
    }
  };

  return <div>{content.map(renderBlock)}</div>;
};

export default EditorJsRenderer;
