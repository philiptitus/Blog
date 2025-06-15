import type { Article, Topic, User } from "./types"

export const users: User[] = [
  {
    id: "1",
    name: "Philip Titus",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const articles: Article[] = [
  {
    id: 1,
    timestamp: "2024-03-14T12:34:56Z",
    author: "Philip Titus",
    name: "Building Modern Web Applications with Next.js",
    description: "A comprehensive guide to building scalable and performant web applications using Next.js, React, and TypeScript.",
    body: `
      <h2>Building Modern Web Applications with Next.js</h2>
      <p>Next.js has revolutionized the way we build web applications, offering a perfect blend of server-side rendering, static site generation, and client-side interactivity.</p>
      <h3>Why Next.js?</h3>
      <p>The framework provides several key benefits:</p>
      <ul>
        <li>Server-side rendering for better SEO</li>
        <li>Built-in API routes</li>
        <li>Automatic code splitting</li>
        <li>TypeScript support out of the box</li>
        <li>Excellent developer experience</li>
      </ul>
    `,
    png_url: "/placeholder.svg?height=200&width=200",
    category: "WEB DEVELOPMENT",
    slug: "building-modern-web-applications-with-nextjs",
    image_url: "/placeholder.svg?height=200&width=200",
    is_active: true
  },
  {
    id: 2,
    timestamp: "2024-03-13T10:20:30Z",
    author: "Sarah Johnson",
    name: "Introduction to Machine Learning for Developers",
    description: "A practical guide to getting started with machine learning, focusing on real-world applications and implementation.",
    body: `
      <h2>Introduction to Machine Learning for Developers</h2>
      <p>Machine learning is no longer just for data scientists. As a developer, understanding ML basics can open up new possibilities in your applications.</p>
      <h3>Key Concepts</h3>
      <ul>
        <li>Supervised vs Unsupervised Learning</li>
        <li>Neural Networks Basics</li>
        <li>Model Training and Evaluation</li>
        <li>Practical Implementation Tips</li>
      </ul>
    `,
    png_url: null,
    category: "DATA SCIENCE.AI AND ML",
    slug: "introduction-to-machine-learning-for-developers",
    image_url: null,
    is_active: true
  },
  {
    id: 3,
    timestamp: "2024-03-12T15:45:00Z",
    author: "Michael Chen",
    name: "Mobile App Development with React Native",
    description: "Learn how to build cross-platform mobile applications using React Native and modern development practices.",
    body: `
      <h2>Mobile App Development with React Native</h2>
      <p>React Native enables developers to build native mobile applications using JavaScript and React, sharing code between iOS and Android platforms.</p>
      <h3>Getting Started</h3>
      <ul>
        <li>Setting up your development environment</li>
        <li>Understanding the React Native architecture</li>
        <li>Building your first mobile app</li>
        <li>Best practices for performance</li>
      </ul>
    `,
    png_url: "/placeholder.svg?height=200&width=200",
    category: "MOBILE DEVELOPMENT",
    slug: "mobile-app-development-with-react-native",
    image_url: "/placeholder.svg?height=200&width=200",
    is_active: true
  },
  {
    id: 4,
    timestamp: "2024-03-11T09:15:22Z",
    author: "Philip Titus",
    name: "Essential Cybersecurity Practices for Developers",
    description: "A comprehensive guide to implementing security best practices in your development workflow.",
    body: `
      <h2>Essential Cybersecurity Practices for Developers</h2>
      <p>Security should be a top priority in every development project. Learn how to protect your applications from common threats.</p>
      <h3>Key Security Practices</h3>
      <ul>
        <li>Input validation and sanitization</li>
        <li>Authentication and authorization</li>
        <li>Secure data storage</li>
        <li>Regular security audits</li>
      </ul>
    `,
    png_url: null,
    category: "CYBERSECURITY",
    slug: "essential-cybersecurity-practices-for-developers",
    image_url: null,
    is_active: true
  },
  {
    id: 5,
    timestamp: "2024-03-10T14:30:45Z",
    author: "Sarah Johnson",
    name: "Cloud Computing Fundamentals",
    description: "Understanding the basics of cloud computing and how to leverage cloud services in your applications.",
    body: `
      <h2>Cloud Computing Fundamentals</h2>
      <p>Cloud computing has transformed how we build and deploy applications. Learn the fundamentals of cloud services and architecture.</p>
      <h3>Cloud Service Models</h3>
      <ul>
        <li>Infrastructure as a Service (IaaS)</li>
        <li>Platform as a Service (PaaS)</li>
        <li>Software as a Service (SaaS)</li>
        <li>Serverless Computing</li>
      </ul>
    `,
    png_url: "/placeholder.svg?height=200&width=200",
    category: "CLOUD COMPUTING",
    slug: "cloud-computing-fundamentals",
    image_url: "/placeholder.svg?height=200&width=200",
    is_active: true
  }
]

export const topics: Topic[] = [
  { id: "1", name: "DATA SCIENCE.AI AND ML", selected: false },
  { id: "2", name: "WEB DEVELOPMENT", selected: false },
  { id: "3", name: "MOBILE DEVELOPMENT", selected: false },
  { id: "4", name: "CYBERSECURITY", selected: false },
  { id: "5", name: "CLOUD COMPUTING", selected: false },
  { id: "6", name: "GAME DEVELOPMENT", selected: false },
  { id: "7", name: "OTHER", selected: false },
]

export const readingList = articles.slice(0, 3)
