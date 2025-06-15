"use client"

import { cn } from "@/lib/utils"

interface DateFormatterProps {
  date: string | number | Date
  className?: string
}

export function DateFormatter({ date, className }: DateFormatterProps) {
  // If the date is a relative time string (e.g. "4 days ago", "Just now")
  if (typeof date === 'string' && !date.match(/^\d{4}-\d{2}-\d{2}/)) {
    return (
      <time className={cn(className)}>
        {date}
      </time>
    )
  }

  // For actual dates, format them consistently
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      // If date is invalid, return the original string
      return (
        <time className={cn(className)}>
          {date}
        </time>
      )
    }

    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return (
      <time dateTime={dateObj.toISOString()} className={cn(className)}>
        {formattedDate}
      </time>
    )
  } catch (error) {
    // If any error occurs, return the original string
    return (
      <time className={cn(className)}>
        {date}
      </time>
    )
  }
} 