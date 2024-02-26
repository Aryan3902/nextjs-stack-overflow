import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          width={20}
          height={20}
          alt="Search"
        />
        <Input
          type="text"
          placeholder="Search Globally"
          className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
          value=""
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
