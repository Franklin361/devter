import { DevPost, NoDevPosts, LayoutPostSkeleton } from '../'
import { usePostStore } from '../../store'

export const LayoutPosts = () => {
  const data = usePostStore(state => state.listPosts)

  if (data === null) return <LayoutPostSkeleton />

  if (data.length === 0) return <NoDevPosts />

  return (
    <>
      {data.map(post => (
        <DevPost
          key={post.id}
          content={post.content}
          createdAt={post.createdAt}
          displayName={post.displayName}
          id={post.id}
          likes={post.likes}
          photoURL={post.photoURL}
          img={post.img}
          fileName={post.fileName}
          userId={post.userId}
        />
      ))}
    </>
  )
}
