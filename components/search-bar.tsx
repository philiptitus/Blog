"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useBlog } from "@/context/blog-context"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchBar() {
  const { setSearchQuery } = useBlog()
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value, 300)

  useEffect(() => {
    setSearchQuery(debouncedValue)
  }, [debouncedValue, setSearchQuery])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        placeholder="Search"
        className="pl-10 border border-border rounded-full bg-muted"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
