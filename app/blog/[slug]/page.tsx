
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User as UserIcon } from "lucide-react"
import { Metadata } from "next"
import { Article } from "@/lib/types"
import { ArticleActions } from "@/components/article-actions"

interface ArticlePageProps {
    params: Promise<{
        slug: string
    }>
}

async function getAllArticles(): Promise<Article[]> {
    try {
        const res = await fetch("https://www.mrphilip.cv/api/blogs/", {
            next: { revalidate: 60 }, // Revalidate every minute
        })

        if (!res.ok) {
            throw new Error("Failed to fetch articles")
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching articles:", error)
        return []
    }
}

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
    const params = await props.params;
    const articles = await getAllArticles()
    const article = articles.find((a) => a.slug === params.slug)

    if (!article) {
        return {
            title: "Article Not Found",
        }
    }

    return {
        title: article.name,
        description: article.description,
        openGraph: {
            title: article.name,
            description: article.description,
            type: "article",
            publishedTime: article.timestamp,
            authors: [article.author],
            images: article.image_url ? [article.image_url] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: article.name,
            description: article.description,
        },
    }
}

export default async function ArticlePage(props: ArticlePageProps) {
    const params = await props.params;
    const articles = await getAllArticles()
    const article = articles.find((a) => a.slug === params.slug)

    if (!article) {
        notFound()
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.name,
        image: article.image_url ? [article.image_url] : [],
        datePublished: article.timestamp,
        author: [
            {
                "@type": "Person",
                name: article.author,
            },
        ],
        description: article.description,
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Articles
                        </Button>
                    </Link>
                </div>

                <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <div className="space-y-4 mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{article.name}</h1>

                        <div className="flex items-center space-x-6 text-muted-foreground">
                            <div className="flex items-center">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <time dateTime={article.timestamp}>
                                    {new Date(article.timestamp).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                            <div className="pl-4 border-l border-border">
                                <ArticleActions
                                    articleId={article.id}
                                    slug={article.slug}
                                    title={article.name}
                                />
                            </div>
                        </div>
                    </div>

                    {article.image_url && (
                        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
                            <Image
                                src={article.image_url}
                                alt={article.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div
                        className="mt-8 text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.body }}
                    />
                </article>
            </div>
        </div>
    )
}
