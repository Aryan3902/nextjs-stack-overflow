import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (days < 30) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (days < 365) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

// Create a function which takes in a number and returns a string in the format of "1,000" or "1.5K" or "1.5M"
export function formatNumber(value: number) {
  if (value < 1000) {
    return value;
  }
  if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  if (value < 1000000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  return `${(value / 1000000000).toFixed(1)}B`;
}
