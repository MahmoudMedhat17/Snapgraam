import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//Function that converts the time format into "1 day ago", "2 days ago" formats
export function timeAgo(timestamp: string): string {
  const time = new Date(timestamp).getTime();
  const now = new Date().getTime();
  const difference = now - time;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};


//Function to check if the userId is among the likes in the array
export const checkIsLiked = (userId: string, likesArray: string[]) => {
  return likesArray.includes(userId);
};
