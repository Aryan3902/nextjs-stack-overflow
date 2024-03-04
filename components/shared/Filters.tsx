"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface filtersArray {
  name: string;
  value: string;
}

type FiltersProps = {
  filters: filtersArray[];
  otherClasses?: string;
  containerClasses?: string;
};

const Filters = ({ filters, otherClasses, containerClasses }: FiltersProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <div className="flex-1">
        <Select>
          <SelectTrigger
            className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Select a Filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filters.map((filter, index) => (
                <SelectItem key={index} value={filter.value}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
