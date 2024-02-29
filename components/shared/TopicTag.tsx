import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TopicTagProps {
  name: string;
  totalQuestions: number;
  _id: number;
  showCount?: boolean;
}

const TopicTag = ({ name, _id, totalQuestions, showCount }: TopicTagProps) => {
  return (
    <div className="flex justify-between gap-2">
      <Link href={`/topics/${_id}`}>
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
          {name}
        </Badge>
      </Link>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </div>
  );
};

export default TopicTag;
