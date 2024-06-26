"use client";

import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link, index) => {
        const isActive =
          (pathName.includes(link.route) && link.route !== "/") ||
          pathName === link.route;
        return (
          <SheetClose asChild key={index}>
            <Link
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
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/assets/icons/hamburger.svg"}
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            width={32}
            height={32}
            alt="DevFlow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="flex min-h-full flex-col justify-between">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="mb-5 flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/signin">
                  <Button className="small-medium btn-secondary min-h-[41] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary min-h-[41] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="text-dark400_light900">Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
