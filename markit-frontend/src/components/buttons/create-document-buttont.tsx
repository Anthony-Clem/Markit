import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { createDocumentMutationFn } from "@/lib/api";
import { DocumentType } from "@/lib/types";
import { useRouter } from "next/navigation";

const CreateDocumentButton = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createDocumentMutationFn,
    onSuccess: (data: DocumentType) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      setOpen(false);
      router.push(`/${data.id}`);
    },
  });
  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      + Create New Document
    </Button>
  );
};

export default CreateDocumentButton;
