import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BlogProvider } from "@/context/blog-context"
import { Footer } from "@/components/ui/footer"
import { ReduxProvider } from "@/components/providers/redux-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Philip's Blog",
  description: "A modern blog platform for sharing ideas and stories",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <BlogProvider>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </BlogProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
