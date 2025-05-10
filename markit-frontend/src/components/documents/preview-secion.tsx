import { cn } from "@/lib/utils";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { IoEyeOffOutline } from "react-icons/io5";

const PreviewSection = ({
  className,
  renderedHtml,
  isMarkdownHidden,
  setIsMarkdownHidden,
}: {
  className?: string;
  renderedHtml: { __html: string };
  isMarkdownHidden: boolean;
  setIsMarkdownHidden: (isMarkdownHidden: boolean) => void;
}) => {
  return (
    <div className={cn("flex-1 h-full hidden xl:flex flex-col", className)}>
      <div className="bg-zinc-900 p-2 flex items-center justify-between">
        <p className="text-zinc-500 font-medium text-lg tracking-[4px]">Preview</p>
        {isMarkdownHidden && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="text-zinc-500 p-1 hover:bg-zinc-800"
                onClick={() => setIsMarkdownHidden(false)}
              >
                <IoEyeOffOutline />
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div
        className="bg-zinc-900 text-white flex-1 p-3 prose prose-invert min-w-full"
        dangerouslySetInnerHTML={renderedHtml}
      />
    </div>
  );
};

export default PreviewSection;
