import { DevPost, NoDevPosts } from './'
import { PostResponse } from '../../interfaces'
import {} from './NoPosts'

export const LayoutPosts = ({ data }: { data: PostResponse[] }) => {
  return (
    <>
      {data.length === 0 ? (
        <NoDevPosts />
      ) : (
        data.map(post => (
          <DevPost
            key={post.id}
            content={post.content}
            createdAt={post.createdAt}
            displayName={post.displayName}
            id={post.id}
            likesCount={post.likesCount}
            sharedCount={post.sharedCount}
            photoURL={post.photoURL}
            img={post.img}
            userId={post.userId}
          />
        ))
      )}
    </>
  )
}
