import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { IoEyeOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { oneDark } from "@uiw/react-codemirror";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocumentMutationFn } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const MarkdownSection = ({
  markdownText,
  setMarkdownText,
  isMarkdownHidden,
  setIsMarkdownHidden,
}: {
  markdownText: string;
  setMarkdownText: (text: string) => void;
  setIsMarkdownHidden: (isMarkdownHidden: boolean) => void;
  isMarkdownHidden: boolean;
}) => {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateDocumentMutationFn({ id, data: { content: markdownText } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
    },
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      mutate();
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [markdownText, mutate]);

  const downloadMarkdownFile = (content: string, name: string) => {
    const filename = `${name}.md`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "flex-1 h-full border-r border-zinc-800 flex flex-col",
        isMarkdownHidden && "hidden"
      )}
    >
      <div className="bg-zinc-900 p-2 flex items-center justify-between">
        <p className="text-zinc-500 font-medium text-lg tracking-[4px]">Markdown</p>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="text-zinc-500 p-1 hover:bg-zinc-800"
                onClick={() => downloadMarkdownFile(markdownText, "markdown")}
              >
                <LuDownload />
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="text-zinc-500 p-1 hover:bg-zinc-800"
                onClick={() => setIsMarkdownHidden(true)}
              >
                <IoEyeOutline />
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="bg-zinc-900 flex-1 p-3 overflow-x-auto">
        <CodeMirror
          value={markdownText}
          height="100%"
          theme={oneDark}
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages,
              extensions: [],
            }),
            EditorView.lineWrapping,
          ]}
          onChange={(value) => {
            setMarkdownText(value);
          }}
          className="w-full text-black"
        />
      </div>
    </div>
  );
};

export default MarkdownSection;
