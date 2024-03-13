"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type ExpandableTextProps = {
  children: React.ReactNode;
  descriptionLenght: number;
  desktop: boolean;
};

const ExpandableText = ({
  children,
  descriptionLenght,
  desktop,
}: ExpandableTextProps) => {
  const fullText = children as string;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex w-full flex-col">
      <span className={cn(!desktop ? "w-full text-xs" : "w-full text-base")}>
        {isExpanded ? fullText : fullText.slice(0, descriptionLenght)}
        {fullText.length > descriptionLenght && (
          <span
            className="cursor-pointer text-blue-500"
            onClick={toggleIsExpanded}
          >
            {isExpanded ? " Read less" : " Read more"}
          </span>
        )}
      </span>
    </div>
  );
};

export default ExpandableText;
