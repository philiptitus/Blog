"use client"

import type { Article } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArticleModal } from "./article-modal"
import { useBlog } from "@/context/blog-context"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBlog()

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium truncate">{article.author}</span>
          <span className="text-sm text-muted-foreground hidden sm:inline">· {new Date(article.timestamp).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <Link href={`/blog/${article.slug}`} className="group">
              <h2 className="text-xl font-bold mb-2 cursor-pointer group-hover:text-[#1a8917] line-clamp-2 sm:line-clamp-none">
                {article.name}
              </h2>
            </Link>
            <p className="text-muted-foreground line-clamp-3 sm:line-clamp-2">{article.description}</p>
          </div>
          {article.image_url && (
            <div className="sm:w-48 sm:h-32 relative flex-shrink-0">
              <Image
                src={article.image_url}
                alt={article.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{article.category}</span>
          </div>
          <div className="flex items-center space-x-2">

          </div>
        </div>
      </div>

      <ArticleModal article={article} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
