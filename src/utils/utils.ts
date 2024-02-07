import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localeDate(date: Date | string | undefined): string {
  // if (typeof date === undefined) return
  if (typeof date === "string") date = new Date(date)
  return (
    date?.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) || "undefined"
  )
  // .split("/")
  // .join("-")
}

export function localeTime(date: Date | string | undefined): string {
  if (typeof date === "string") date = new Date(date)
  return (
    date?.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }) || "undefined"
  )
}

export function toCapitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
