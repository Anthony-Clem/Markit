"use client";

import { useParams } from "next/navigation";
import Logo from "../common/logo";
import Sidebar from "./sidebar";
import { useQuery } from "@tanstack/react-query";
import { getDocumentQueryFn } from "@/lib/api";
import DeleteDocumentButton from "../buttons/delete-document-button";
import DocumentName from "../documents/document-name";
import { CiFileOn } from "react-icons/ci";

const Header = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isPending } = useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentQueryFn(id),
  });

  return (
    <header className="h-[72px] bg-zinc-900 flex items-center justify-between pr-5">
      <div className="flex items-center gap-5 h-full">
        <Sidebar />
        <div className="flex items-center gap-5 h-full">
          <Logo className="hidden md:block" />
          {id && (
            <div className="md:border-l border-zinc-700 h-full flex items-center md:pl-5 max-w-60 w-full truncate">
              {isPending ? (
                <div className="flex items-center gap-2 w-full animate-pulse">
                  <CiFileOn className="size-7" />
                  <div className="truncate w-full">
                    <div className="h-3 w-24 bg-zinc-700 rounded mb-1" />
                    <div className="h-4 w-36 bg-zinc-700 rounded" />
                  </div>
                </div>
              ) : (
                <DocumentName id={id} title={data?.title} />
              )}
            </div>
          )}
        </div>
      </div>
      {id && <DeleteDocumentButton id={id} />}
    </header>
  );
};

export default Header;
