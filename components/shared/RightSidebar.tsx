import Image from "next/image";
import Link from "next/link";
import React from "react";
import TopicTag from "./TopicTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: 1,
      title: "How to use React Router?",
    },
    {
      _id: 2,
      title: "How to use Next.js?",
    },
    {
      _id: 3,
      title: "How to use React Context?",
    },
    {
      _id: 4,
      title: "How to use React Router?",
    },
    {
      _id: 5,
      title: "How to use Next.js?",
    },
    {
      _id: 6,
      title: "How to use React Context?",
    },
  ];

  const popularTags = [
    {
      _id: 1,
      name: "React",
      totalQuestions: 100,
    },
    {
      _id: 2,
      name: "Next.js",
      totalQuestions: 50,
    },
    {
      _id: 3,
      name: "React Context",
      totalQuestions: 30,
    },
    {
      _id: 4,
      name: "React Router",
      totalQuestions: 20,
    },
    {
      _id: 5,
      name: "Next.js",
      totalQuestions: 50,
    },
  ];

  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar no-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

      <div>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width="20"
                height="20"
                alt="Chevron Right"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <TopicTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
