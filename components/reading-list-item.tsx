"use client"

import { Article } from "@/lib/types"
import Image from "next/image"
import { useState } from "react"
import { ArticleModal } from "./article-modal"
import { DateFormatter } from "./date-formatter"

interface ReadingListItemProps {
  article: Article
}

export function ReadingListItem({ article }: ReadingListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="cursor-pointer group" onClick={() => setIsModalOpen(true)}>
        <div className="flex gap-3">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-[#1a8917] transition-colors">
              {article.title}
            </h4>
            <div className="text-xs text-[#757575] mt-1">
              {article.publishedAt} · {article.readTime} min read
            </div>
          </div>
        </div>
      </div>

      <ArticleModal article={article} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
