import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
}

interface StatsCardProps {
  imgUrl: string;
  title: string;
  value: number;
}

const StatsCard = ({ imgUrl, title, value }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark100_light900">{value}</p>
        <p className="body-medium text-dark400_light800">{title}</p>
      </div>
    </div>
  );
};

const Stats = ({ totalQuestions, totalAnswers }: StatsProps) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark100_light900">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <div className="light-border shadow- background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 p-6 rounded-md border shadow-light-300 dark:shadow-dark-300">
          <div className="flex flex-col gap-2">
            <p className="paragraph-regular text-dark400_light800">
              Total Questions
            </p>
            <p className="paragraph-medium text-dark100_light900">
              {formatNumber(totalQuestions)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="paragraph-regular text-dark400_light800">
              Total Answers
            </p>
            <p className="paragraph-medium text-dark100_light900">
              {formatNumber(totalAnswers)}
            </p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          title="Gold Badges"
          value={0}
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          title="Silver Badges"
          value={0}
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          title="Bronze Badges"
          value={0}
        />
      </div>
    </div>
  );
};

export default Stats;
