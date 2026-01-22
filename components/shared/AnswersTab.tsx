import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserAnswers({ userId, page: 1 });

  return (
    <>
      {results.userAnswers.map((answer) => (
        <AnswerCard
          key={answer.id}
          _id={answer.id}
          question={answer.question}
          // description={question.description}
          upvotes={answer.upvotes.length - answer.downvotes.length}
          author={answer.author}
          askedAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;
