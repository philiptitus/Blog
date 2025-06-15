"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, BookOpen, FileText, PenTool, Menu } from "lucide-react"
import { useBlog } from "@/context/blog-context"
import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { TopicBadge } from "@/components/topic-badge"
import { ArticleModal } from "@/components/article-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppSelector } from "@/store/hooks"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const { filteredArticles, topics, activeTab, setActiveTab } = useBlog()
  const { loading } = useAppSelector((state) => state.blogs)
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<typeof filteredArticles[0] | null>(null)

  // Get the first 3 articles for the "What We're Reading Today" section
  const readingList = filteredArticles.slice(0, 3)

  // Loading skeleton for articles
  const ArticleSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="sm:w-48 sm:h-32 w-full h-48" />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6 text-[#757575]" />
      </button>

      {/* Left Sidebar - Hidden on mobile by default */}
      <div className={cn(
        "w-16 border-r border-[#e6e6e6] flex flex-col items-center py-4 fixed h-full bg-white z-40 transition-transform duration-300",
        "lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" className="flex items-center justify-center mb-6">
            <Image
              src="/recycle-logo.svg"
              alt="Philip's Blog"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </Link>
          <Link href="#notifications" className="p-2 rounded-md hover:bg-[#f2f2f2]">
            <Bell className="w-6 h-6 text-[#757575]" />
          </Link>
          <Link href="#reading-list" className="p-2 rounded-md hover:bg-[#f2f2f2]">
            <BookOpen className="w-6 h-6 text-[#757575]" />
          </Link>
          <Link href="#stories" className="p-2 rounded-md hover:bg-[#f2f2f2]">
            <FileText className="w-6 h-6 text-[#757575]" />
          </Link>
          <Link href="#write" className="p-2 rounded-md hover:bg-[#f2f2f2]">
            <PenTool className="w-6 h-6 text-[#757575]" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Mobile Search - Only visible on mobile */}
              <div className="lg:hidden mb-6">
                <SearchBar />
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[#e6e6e6] mb-6 overflow-x-auto">
                <Button
                  variant="ghost"
                  className={`rounded-none pb-4 px-4 font-normal whitespace-nowrap ${
                    activeTab === "following" ? "text-[#292929] border-b-2 border-[#292929]" : "text-[#757575]"
                  }`}
                  onClick={() => setActiveTab("following")}
                >
                  Following
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-none pb-4 px-4 font-normal whitespace-nowrap ${
                    activeTab === "popular" ? "text-[#292929] border-b-2 border-[#292929]" : "text-[#757575]"
                  }`}
                  onClick={() => setActiveTab("popular")}
                >
                  Popular
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-none pb-4 px-4 font-normal whitespace-nowrap ${
                    activeTab === "liked" ? "text-[#292929] border-b-2 border-[#292929]" : "text-[#757575]"
                  }`}
                  onClick={() => setActiveTab("liked")}
                >
                  Liked
                </Button>
              </div>

              {/* Articles */}
              <div className="space-y-8">
                {loading ? (
                  // Show 3 skeleton articles while loading
                  <>
                    <ArticleSkeleton />
                    <ArticleSkeleton />
                    <ArticleSkeleton />
                  </>
                ) : filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-[#757575]">No articles found. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="sticky top-6 space-y-8">
                {/* Search - Only visible on desktop */}
                <div className="lg:block">
                  <SearchBar />
                </div>

                {/* What We're Reading Today */}
                <div>
                  <h3 className="text-base font-medium mb-4 flex items-center">
                    <span className="w-2 h-2 bg-[#1a8917] rounded-full mr-2"></span>
                    What We're Reading Today
                  </h3>
                  <div className="space-y-4">
                    {readingList.map((article) => (
                      <div key={article.id} className="flex flex-col space-y-2">
                        <div 
                          className="hover:text-[#1a8917] cursor-pointer"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <h4 className="font-medium line-clamp-2">{article.name}</h4>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#757575]">
                          <span>{article.author}</span>
                          <span>·</span>
                          <span>{new Date(article.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Topics */}
                <div>
                  <h3 className="text-base font-medium mb-4">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <TopicBadge key={topic.id} topic={topic} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          isOpen={!!selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
