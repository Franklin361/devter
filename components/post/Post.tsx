import { PostResponse } from '../../interfaces'
import { CreatedAtPost, ContentPost, FooterPost, HeaderPost } from './'

export const DevPost = ({
  content,
  displayName,
  photoURL,
  likesCount,
  sharedCount,
  createdAt,
  img
}: PostResponse) => {
  return (
    <div className="border border-gray-500 p-5 rounded-md bg-black/70 max-w-xl mx-auto w-full mb-10 shadow-2xl shadow-black">
      <HeaderPost displayName={displayName} photoURL={photoURL} />
      <ContentPost content={content} img={img} />
      <CreatedAtPost createdAt={createdAt} />
      <FooterPost likesCount={likesCount} sharedCount={sharedCount} />
    </div>
  )
}
