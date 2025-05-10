"use client";
import { marked } from "marked";
import DOMPurify from "dompurify";
import MarkdownSection from "@/components/documents/markdown-section";
import PreviewSection from "@/components/documents/preview-secion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocumentQueryFn } from "@/lib/api";
import { useParams } from "next/navigation";

const DocumentPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [isMarkdownHidden, setIsMarkdownHidden] = useState(false);
  const [renderedHtml, setRenderedHtml] = useState({ __html: "" });
  const [markdownText, setMarkdownText] = useState("");
  const { data } = useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentQueryFn(id),
  });

  useEffect(() => {
    if (data?.content) {
      setMarkdownText(data.content);
    }
  }, [data?.content]);

  useEffect(() => {
    const renderMarkdown = async () => {
      const rawHtml = await marked(markdownText, { breaks: true });
      setRenderedHtml({ __html: DOMPurify.sanitize(rawHtml) });
    };

    renderMarkdown();
  }, [markdownText]);
  return (
    <div className="h-full flex border-t border-zinc-800">
      <MarkdownSection
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        isMarkdownHidden={isMarkdownHidden}
        setIsMarkdownHidden={setIsMarkdownHidden}
      />
      <PreviewSection
        renderedHtml={renderedHtml}
        isMarkdownHidden={isMarkdownHidden}
        setIsMarkdownHidden={setIsMarkdownHidden}
      />
    </div>
  );
};

export default DocumentPage;
