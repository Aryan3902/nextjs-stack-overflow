import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href && "rounded-full"} `}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor && "max-sm:hidden"}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1" href={href}>
        {metricContent}
      </Link>
    );
  }
  return (
    <div className="flex-center flex-wrap items-center gap-1">
      {metricContent}
    </div>
  );
};

export default Metric;
