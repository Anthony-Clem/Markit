import { deleteDocumentMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteDocumentButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteDocumentMutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", "document", id] });
      router.replace("/");
    },
  });
  return (
    <button disabled={isPending} onClick={() => mutate()}>
      <FaRegTrashAlt className="text-zinc-500 size-5 hover:text-zinc-300 transition" />
    </button>
  );
};

export default DeleteDocumentButton;
