import { getDocumentsQueryFn } from "@/lib/api";
import { formatReadableDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";

const DocumentsList = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { data, isPending } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocumentsQueryFn,
  });

  console.log(data);

  return (
    <section>
      <div className="flex items-center gap-4">
        <p className="text-zinc-500 font-semibold">Documents</p>
        <div className="h-[1px] w-full bg-zinc-500" />
      </div>
      {isPending ? (
        <p>Loading</p>
      ) : !data || data.length === 0 ? (
        <p>No Documents</p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((document) => (
            <Link
              href={`/${document.id}`}
              onClick={() => setOpen(false)}
              key={document.id}
              className="flex items-center gap-2 p-1 hover:bg-zinc-300/5"
            >
              <CiFileOn className="size-6" />
              <div>
                <p className="text-zinc-500 text-sm">{formatReadableDate(document.createdAt)}</p>
                <p>{document.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default DocumentsList;
