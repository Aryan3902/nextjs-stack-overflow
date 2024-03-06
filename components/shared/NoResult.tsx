import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type NoResultProps = {
  title: string;
  description: string;
  buttonTitle: string;
  buttonLink: string;
};

const NoResult = ({
  title,
  description,
  buttonTitle,
  buttonLink,
}: NoResultProps) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title} 😔</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={buttonLink}>
        <Button className="paragraph-medium mt-5 rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500">
          {buttonTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
