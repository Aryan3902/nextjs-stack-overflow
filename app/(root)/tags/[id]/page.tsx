import { auth } from "@clerk/nextjs";

import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

import { getQuestionsByTagId } from "@/lib/actions/tag.actions";

import type { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  const result = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              votes={question.upvotes}
              views={question.views}
              answers={question.answers}
              askedAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Tag Questions Found"
            description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
            buttonLink="/"
            buttonTitle="Explore Questions"
          />
        )}
      </div>
    </>
  );
};

export default Page;
