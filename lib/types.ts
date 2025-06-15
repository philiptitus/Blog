export interface User {
  id: string
  name: string
  avatar: string
}

export interface Article {
  id: number
  timestamp: string
  author: string
  name: string
  description: string
  body: string
  png_url: string | null
  category: string
  slug: string
  image_url: string | null
  is_active: boolean
}

export interface Topic {
  id: string
  name: string
  selected: boolean
}
