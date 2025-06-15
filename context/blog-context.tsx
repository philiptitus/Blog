"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Article, Topic } from "@/lib/types"
import { topics as initialTopics } from "@/lib/data"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { fetchBlogs } from "@/store/actions/blog.actions"

interface BlogContextType {
  articles: Article[]
  filteredArticles: Article[]
  topics: Topic[]
  activeTab: "following" | "popular" | "liked"
  searchQuery: string
  setActiveTab: (tab: "following" | "popular" | "liked") => void
  toggleTopicSelection: (topicId: string) => void
  setSearchQuery: (query: string) => void
  getFilteredArticles: () => Article[]
  toggleBookmark: (articleId: number) => void
  toggleLike: (articleId: number) => void
  isBookmarked: (articleId: number) => boolean
  isLiked: (articleId: number) => boolean
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const articles = useAppSelector((state) => state.blogs.blogs)
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [activeTab, setActiveTab] = useState<"following" | "popular" | "liked">("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarkedArticles')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })
  const [likedArticles, setLikedArticles] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('likedArticles')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  // Save bookmarks to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarkedArticles', JSON.stringify([...bookmarkedArticles]))
    }
  }, [bookmarkedArticles])

  // Save likes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('likedArticles', JSON.stringify([...likedArticles]))
    }
  }, [likedArticles])

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  const toggleLike = (articleId: number) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  const isBookmarked = (articleId: number) => bookmarkedArticles.has(articleId)
  const isLiked = (articleId: number) => likedArticles.has(articleId)

  const toggleTopicSelection = (topicId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => (topic.id === topicId ? { ...topic, selected: !topic.selected } : topic)),
    )
  }

  const getFilteredArticles = () => {
    const selectedTopics = topics.filter((topic) => topic.selected).map((topic) => topic.name)

    let filtered = articles

    if (activeTab === "following") {
      filtered = filtered.filter(article => bookmarkedArticles.has(article.id))
    } else if (activeTab === "liked") {
      filtered = filtered.filter(article => likedArticles.has(article.id))
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedTopics.length > 0) {
      filtered = filtered.filter((article) => selectedTopics.includes(article.category))
    }

    return filtered
  }

  const filteredArticles = getFilteredArticles()

  return (
    <BlogContext.Provider
      value={{
        articles,
        filteredArticles,
        topics,
        activeTab,
        searchQuery,
        setActiveTab,
        toggleTopicSelection,
        setSearchQuery,
        getFilteredArticles,
        toggleBookmark,
        toggleLike,
        isBookmarked,
        isLiked,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
