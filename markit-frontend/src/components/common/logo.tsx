import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("text-zinc-600 uppercase tracking-[4px]", className)}>
      markit
    </Link>
  );
};

export default Logo;
