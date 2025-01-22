import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PolicyPage = ({ title, sections }: any) => {
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {sections.map((section: any, index: any) => (
            <div key={index} className="space-y-4">
              {section.title && (
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              )}
              {section.content.map((content: any, contentIndex: any) => (
                <React.Fragment key={contentIndex}>
                  {content.type === "paragraph" && (
                    <p className="leading-relaxed text-gray-600">
                      {content.text}
                    </p>
                  )}
                  {content.type === "list" && (
                    <ul className="pl-6 space-y-2 text-gray-600 list-disc">
                      {content.items.map((item: any, itemIndex: any) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyPage;
