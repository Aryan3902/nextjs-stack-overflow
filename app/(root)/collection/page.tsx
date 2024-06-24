import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

import { getSavedQuestions, getUserById } from "@/lib/actions/user.action";

import { QuestionFilters } from "@/constants/filters";

import type { SearchParamsProps } from "@/types";

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();
  //   console.log(clerkId);
  if (!clerkId) return null;

  //   const mongoUser = await getUserById({ userId: clerkId });
  //   if (!mongoUser?.onboarded) redirect("/onboarding");

  const result = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const { questions } = result;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              //   clerkId={clerkId}
              title={question.title}
              tags={question.tags}
              author={question.author}
              votes={question.upvotes - question.downvotes}
              views={question.views}
              answers={question.answers}
              askedAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Saved Questions Found"
            description="It appears that there are no saved questions in your collection at the moment 😔. Start exploring and saving questions that pique your interest 🌟"
            buttonLink="/"
            buttonTitle="Explore Questions"
          />
        )}
      </div>
    </>
  );
}
