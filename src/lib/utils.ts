
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function addToLookbook(styleId: string) {
  // For now, just simulate an async operation
  // In a real app, this would save to a database or API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Added style ${styleId} to lookbook`);
      resolve(styleId);
    }, 1000);
  });
}
