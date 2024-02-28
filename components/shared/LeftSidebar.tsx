"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-5">
      {sidebarLinks.map((link, index) => {
        const isActive =
          (pathName.includes(link.route) && link.route !== "/") ||
          pathName === link.route;
        return (
          <Link
            key={index}
            href={link.route}
            className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={link.imgURL}
              width={20}
              height={20}
              alt={link.label}
              className={`${!isActive && "invert-colors"}`}
            />
            <p
              className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

const LeftSidebar = () => {
  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar no-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex min-h-full flex-col justify-between">
        <NavContent />

        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/signin">
              <Button className="small-medium btn-secondary min-h-[41] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  alt="login"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="small-medium light-border-2 btn-tertiary min-h-[41] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="login"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="text-dark400_light900 max-lg:hidden">
                  Sign Up
                </span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </aside>
  );
};

export default LeftSidebar;
