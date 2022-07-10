import Link from 'next/link'
import { PostResponse } from '../../interfaces'
import { CreatedAtPost, ContentPost, FooterPost, HeaderPost } from './'

interface Props extends PostResponse {
  completePost?: boolean
}

export const DevPost = ({
  content,
  displayName,
  photoURL,
  likesCount,
  sharedCount,
  createdAt,
  img,
  completePost = false,
  id
}: Props) => {
  const contentRed = () => {
    if (completePost) {
      return content
    }

    return content.length > 40 ? content.substring(0, 40) + ' ...' : content
  }

  return (
    <LayoutPost completePost={completePost} id={id}>
      <div
        className={`${
          completePost ? 'cursor-auto ' : 'cursor-pointer'
        } border border-gray-500 p-5 rounded-md bg-black/70 max-w-xl mx-auto w-full mb-10 shadow-2xl shadow-black`}
      >
        <HeaderPost displayName={displayName} photoURL={photoURL} />
        <ContentPost content={contentRed()} img={img} />
        <CreatedAtPost createdAt={createdAt} />
        {completePost && (
          <FooterPost likesCount={likesCount} sharedCount={sharedCount} />
        )}
      </div>
    </LayoutPost>
  )
}

export const LayoutPost = ({
  completePost,
  id,
  children
}: {
  id: string
  completePost: boolean
  children: JSX.Element
}) => {
  return (
    <>
      {completePost ? (
        <> {children}</>
      ) : (
        <Link href={`/status/${id.toString()}`}>{children}</Link>
      )}
    </>
  )
}
