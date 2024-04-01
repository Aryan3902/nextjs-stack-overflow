"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type LocalSearchProps = {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchProps) => {
  return (
    <div className={`relative w-full ${otherClasses}`}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            width={20}
            height={20}
            alt="Search"
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent pl-5 shadow-none outline-none"
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            width={20}
            height={20}
            alt="Search"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearch;
