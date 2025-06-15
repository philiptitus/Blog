"use client"

import { Badge } from "@/components/ui/badge"
import { useBlog } from "@/context/blog-context"
import type { Topic } from "@/lib/types"

interface TopicBadgeProps {
  topic: Topic
}

export function TopicBadge({ topic }: TopicBadgeProps) {
  const { toggleTopicSelection } = useBlog()

  return (
    <Badge
      variant="outline"
      className={`
        ${
          topic.selected
            ? "bg-[#1a8917] text-white hover:bg-[#157212]"
            : "bg-[#f2f2f2] text-[#292929] hover:bg-[#e6e6e6]"
        } 
        border-none rounded-full px-4 py-1 cursor-pointer
      `}
      onClick={() => toggleTopicSelection(topic.id)}
    >
      {topic.name}
    </Badge>
  )
}
