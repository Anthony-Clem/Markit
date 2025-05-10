import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Logo from "../common/logo";
import CreateDocumentButton from "../buttons/create-document-buttont";
import DocumentsList from "../documents/documents-list";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="bg-zinc-800 size-[72px] hover:bg-zinc-700 transition cursor-pointer flex items-center justify-center">
          <RxHamburgerMenu className="size-10" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-10">
        <SheetHeader className="space-y-5">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <CreateDocumentButton setOpen={setOpen} />
        </SheetHeader>
        <DocumentsList setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
