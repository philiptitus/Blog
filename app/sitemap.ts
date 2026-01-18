import { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"

interface Article {
    slug: string
    timestamp: string
}

async function getAllArticles(): Promise<Article[]> {
    try {
        const res = await fetch("https://www.mrphilip.cv/api/blogs/", {
            next: { revalidate: 3600 },
        })

        if (!res.ok) {
            return []
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching articles for sitemap:", error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getAllArticles()

    const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.timestamp),
        changeFrequency: "monthly",
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...blogEntries,
    ]
}
