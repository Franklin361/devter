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
  likesCount: number
  sharedCount: number
  createdAt: number
  img?: string
  userId: string
}
