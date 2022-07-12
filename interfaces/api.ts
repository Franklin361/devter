export interface HomeTimeLine {
  id: string
  avatar: string
  username: string
  message: string
  name?: string
}

export interface PostResponse {
  id: string
  photoURL: string
  displayName: string
  content: string
  likes: string[]
  shared: string[]
  createdAt: number
  img?: string
  fileName?: string
  userId: string
}
