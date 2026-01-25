import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserQuestions({ userId, page: 1 });
  console.log(results);
  return (
    <>
      {results.userQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          _id={question.id}
          clerkId={clerkId}
          tags={question.tags}
          title={question.title}
          // description={question.description}
          votes={question.upvotes.length - question.downvotes.length}
          answers={question.answers}
          views={question.views}
          author={question.author}
          askedAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionsTab;
