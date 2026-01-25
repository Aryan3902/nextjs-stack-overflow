import Link from "next/link";
import React from "react";
import TopicTag from "../shared/TopicTag";
import Metric from "../shared/Metric";
import { formatNumber, timeAgo } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import console from "console";

interface Tag {
  name: string;
  _id: string;
}

interface Author {
  _id: string;
  name: string;
  picture: string;
  clerkId: string;
}

interface QuestionCardProps {
  clerkId?: string | null;
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  votes: number;
  views: number;
  answers: Array<object>;
  askedAt: Date;
}

const QuestionCard = ({
  _id,
  clerkId,
  title,
  tags,
  votes,
  answers,
  views,
  author,
  askedAt,
}: QuestionCardProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  console.log(clerkId, author.clerkId);
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="text-dark400_light700 line-clamp-1 flex sm:hidden">
          {timeAgo(askedAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
      </div>
      <SignedIn>
        {showActionButtons && (
          <EditDeleteAction type="question" itemId={JSON.stringify(_id)} />
        )}
      </SignedIn>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TopicTag
            key={tag._id}
            name={tag.name}
            _id={tag._id}
            showCount={false}
          />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User"
          value={author.name}
          title={` - asked ${timeAgo(askedAt)}`}
          href={`/user/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Votes"
          value={formatNumber(votes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
