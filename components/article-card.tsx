"use client"

import type { Article } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Bookmark, MoreHorizontal, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { ArticleModal } from "./article-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
          <span className="text-sm text-[#757575] hidden sm:inline">· {new Date(article.timestamp).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <h2
              className="text-xl font-bold mb-2 cursor-pointer hover:text-[#1a8917] line-clamp-2 sm:line-clamp-none"
              onClick={() => setIsModalOpen(true)}
            >
              {article.name}
            </h2>
            <p className="text-[#292929] line-clamp-3 sm:line-clamp-2">{article.description}</p>
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
            <span className="text-sm text-[#757575]">{article.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto"
              onClick={() => toggleLike(article.id)}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked(article.id) ? "fill-[#1a8917] text-[#1a8917]" : "text-[#757575]"}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto"
              onClick={() => toggleBookmark(article.id)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked(article.id) ? "fill-[#1a8917] text-[#1a8917]" : "text-[#757575]"}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MoreHorizontal className="w-5 h-5 text-[#757575]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <ArticleModal article={article} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
