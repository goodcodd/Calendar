import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge" 

// Define a function to merge class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Define a function to convert time strings formatted as "HH:MM" to a float
export function timeToInt(time: string) {
  return parseFloat(time.replace(":", "."))
}