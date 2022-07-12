import { useRouter } from 'next/router'
import { PostResponse } from '../../interfaces'
import { usePostStore } from '../../store'
import { CreatedAtPost, ContentPost, FooterPost, HeaderPost } from './'

interface Props extends PostResponse {
  completePost?: boolean
}

export const DevPost = ({ completePost = false, ...post }: Props) => {
  const selectPost = usePostStore(state => state.selectPost)

  const router = useRouter()

  const handleSelectPost = () => {
    if (!completePost) {
      selectPost(post)
      router.push(`/status/${post.id}`)
    }
  }

  const contentRed = () => {
    if (completePost) return post.content

    return post.content.length > 40
      ? post.content.substring(0, 40) + ' ...'
      : post.content
  }

  return (
    <div
      onClick={handleSelectPost}
      className={`${
        completePost ? 'cursor-auto ' : 'cursor-pointer'
      } border border-gray-500 p-5 rounded-md bg-black/70 max-w-xl mx-auto w-full mb-10 shadow-2xl shadow-black`}
    >
      <HeaderPost
        fileName={post.fileName}
        id={post.id}
        displayName={post.displayName}
        photoURL={post.photoURL}
        userId={post.userId}
        completePost={completePost}
      />
      <ContentPost content={contentRed()} img={post.img} />
      <CreatedAtPost createdAt={post.createdAt} />
      {completePost && (
        <FooterPost
          likesCount={post.likesCount}
          sharedCount={post.sharedCount}
        />
      )}
    </div>
  )
}
