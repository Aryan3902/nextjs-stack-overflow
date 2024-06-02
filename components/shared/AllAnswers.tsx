import Link from "next/link";
import Image from "next/image";

import { SignedIn } from "@clerk/nextjs";

import ParseHTML from "@/components/shared/ParseHTML";

import { getAnswers } from "@/lib/actions/answer.action";
import { timeAgo } from "@/lib/utils";

import { AnswerFilters } from "@/constants/filters";
import Filters from "./Filters";
import {
  OptionalFilter,
  OptionalPage,
  QuestionId,
  UserId,
} from "@/lib/actions/shared.types";
import Votes from "./Votes";

interface Props extends QuestionId, UserId, OptionalPage, OptionalFilter {
  totalAnswers: number;
}

const AllAnswers = async ({
  userId,
  questionId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  const result = await getAnswers({
    questionId,
    sortBy: filter,
    page,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filters filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer: any) => {
          const showActionButtons =
            JSON.stringify(userId) === JSON.stringify(answer.author._id);

          return (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">• answered </span>
                      {timeAgo(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    upVotes={answer.upvotes.length}
                    userId={JSON.stringify(userId)}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downVotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                    hasSaved={false}
                  />
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AllAnswers;
