import { updateDocumentMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiFileOn } from "react-icons/ci";

const DocumentName = ({ id, title }: { id: string; title: string | undefined }) => {
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState(title || "");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateDocumentMutationFn({ id, data: { title: text } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document"] });
    },
  });

  const handleSubmit = () => {
    if (text && text !== title) {
      mutate();
    }
    setSelected(false);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <CiFileOn className="size-6" />
      <div className="truncate text-xs">
        <p className="text-zinc-500">Document name</p>
        {selected ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={text}
              autoFocus
              onChange={(e) => setText(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="bg-transparent outline-none border-b border-primary text-sm"
            />
            <span className="text-sm">.md</span>
          </div>
        ) : (
          <p className="text-sm truncate cursor-pointer" onClick={() => setSelected(true)}>
            {title}.md
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentName;
