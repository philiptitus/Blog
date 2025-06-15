"use client"

import type { Article } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bookmark, Share2, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useBlog } from "@/context/blog-context"

interface ArticleModalProps {
  article: Article
  isOpen: boolean
  onClose: () => void
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBlog()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold">{article.name}</DialogTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <div className="text-sm font-medium">{article.author}</div>
              <div className="text-xs text-[#757575]">
                {new Date(article.timestamp).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
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
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Share2 className="w-5 h-5 text-[#757575]" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {article.image_url && (
          <div className="relative w-full h-64 sm:h-96 my-6">
            <Image
              src={article.image_url}
              alt={article.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-sm sm:prose-base max-w-none mt-6">
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>

        <div className="mt-8 pt-6 border-t border-[#e6e6e6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#757575]">{article.category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-[#757575]">
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-[#757575]">
                Report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
