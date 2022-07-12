import create from 'zustand'
import { PostResponse } from '../interfaces'

interface PostState {
  listPosts: PostResponse[] | null
  addListPosts: (data: PostResponse[]) => void
  postSelected: PostResponse | null
  selectPost: (post: PostResponse) => void
  deletePostById: (id: string) => void
}

export const usePostStore = create<PostState>(set => ({
  listPosts: null,
  addListPosts: (listPosts: PostResponse[]) =>
    set(state => ({ ...state, listPosts })),
  postSelected: null,
  selectPost: (postSelected: PostResponse) =>
    set(state => ({ ...state, postSelected })),
  deletePostById: (id: string) =>
    set(state => ({
      ...state,
      listPosts: state.listPosts?.filter(post => post.id !== id),
      postSelected: null
    }))
}))
