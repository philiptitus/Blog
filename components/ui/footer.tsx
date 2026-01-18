"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/recycle-logo.svg"
              alt="Philip's Blog"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>
          <span className="text-sm text-muted-foreground">
            © {currentYear} Philip's Blog
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link
            href="https://www.mrphilip.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Philip Titus
          </Link>
        </div>
      </div>
    </footer>
  )
} 