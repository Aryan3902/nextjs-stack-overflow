import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

// const questions = [
//   {
//     id: "1",
//     title: "How to use React hooks?",
//     description:
//       "I'm trying to understand how to use React hooks like useState and useEffect.",
//     tags: [
//       { id: "1", name: "React" },
//       { id: "2", name: "Hooks" },
//     ],
//     votes: 103435000,
//     answers: [
//       {
//         answerId: "1",
//         text: "You can use useState to manage state in functional components.",
//       },
//     ],
//     views: 5067776765,
//     author: { id: "1", name: "John Doe", avatar: "avatar_url" },
//     askedAt: new Date("2024-02-17T12:30:00Z"),
//   },
//   {
//     id: "2",
//     title: "How to deploy a Next.js app?",
//     description:
//       "I'm looking for the best practices to deploy a Next.js application to production.",
//     tags: [
//       { id: "3", name: "Next.js" },
//       { id: "4", name: "Deployment" },
//     ],
//     votes: 15,
//     answers: [
//       { answerId: "1", text: "You can deploy a Next.js app to Vercel." },
//     ],
//     views: 80,
//     author: { id: "2", name: "Jane Smith", avatar: "avatar_url" },
//     askedAt: new Date("2023-02-18T10:15:00Z"),
//   },
// ];

export default async function Home() {
  const result = await getQuestions({});
  console.log(result.questions);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question">
          <Button className="primary-gradient min-h-[46xp] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              tags={question.tags}
              title={question.title}
              description={question.description}
              votes={question.upvotes.length - question.downvotes.length}
              answers={question.answers}
              views={question.views}
              author={question.author}
              askedAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions to display here"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!"
            buttonTitle="Ask a Question"
            buttonLink="/ask-question"
          />
        )}
      </div>
    </>
  );
}
