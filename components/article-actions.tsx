"use client"

import { Button } from "@/components/ui/button"
import { useBlog } from "@/context/blog-context"
import { Bookmark, Share2, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ArticleActionsProps {
    articleId: number
    slug: string
    title: string
}

export function ArticleActions({ articleId, slug, title }: ArticleActionsProps) {
    const { toggleLike, toggleBookmark, isLiked, isBookmarked } = useBlog()
    const liked = isLiked(articleId)
    const bookmarked = isBookmarked(articleId)
    const { toast } = useToast()

    const handleShare = async () => {
        const url = `${window.location.origin}/blog/${slug}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url,
                })
            } catch (err) {
                console.log("Error sharing:", err)
            }
        } else {
            try {
                await navigator.clipboard.writeText(url)
                toast({
                    description: "Link copied to clipboard",
                })
            } catch (err) {
                console.error("Failed to copy:", err)
            }
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                className={cn("gap-2", liked && "text-[#1a8917]")}
                onClick={() => toggleLike(articleId)}
            >
                <ThumbsUp className={cn("w-5 h-5", liked && "fill-current")} />
                <span className="sr-only">Like</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className={cn("gap-2", bookmarked && "text-[#1a8917]")}
                onClick={() => toggleBookmark(articleId)}
            >
                <Bookmark className={cn("w-5 h-5", bookmarked && "fill-current")} />
                <span className="sr-only">Bookmark</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleShare}
            >
                <Share2 className="w-5 h-5" />
                <span className="sr-only">Share</span>
            </Button>
        </div>
    )
}
