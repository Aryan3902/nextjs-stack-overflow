import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import TopicTag from "@/components/shared/TopicTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }: any) => {
  const results = await getQuestionById({ questionId: params.id });
  const { userId } = auth();
  let mongoUser;
  if (userId) {
    mongoUser = await getUserById({ userId });
  }
  const question = results.question;
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.userId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt={question.author.name}
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              upVotes={question.upvotes.length}
              userId={JSON.stringify(mongoUser?._id)}
              hasUpvoted={question.upvotes.includes(mongoUser?._id)}
              downVotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.savedQuestions.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex w-full flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={formatNumber(question.createdAt)}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={question.description} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <TopicTag key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={mongoUser?._id}
        totalAnswers={question.answers.length}
      />

      <Answer
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default page;
