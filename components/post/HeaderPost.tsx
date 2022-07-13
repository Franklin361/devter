import { useDeletePost } from '../../hooks'
import { PostResponse } from '../../interfaces'
import { LoadingPost } from '..'

interface Props
  extends Pick<
    PostResponse,
    'photoURL' | 'displayName' | 'userId' | 'id' | 'fileName'
  > {
  completePost: boolean
}

export const HeaderPost = ({
  displayName,
  photoURL,
  userId,
  completePost = false,
  id,
  fileName = ''
}: Props) => {
  const { handleDelete, loading, user } = useDeletePost({ id, fileName })

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src={photoURL}
            alt="profile"
            width={35}
            className={`rounded-full ${completePost ? 'bounce' : ''}`}
          />
          <h5 className="font-bold ">{displayName}</h5>
        </div>
        {user!.uid === userId && completePost && (
          <div>
            <button className="btn btn-primary btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </header>
      {loading && <LoadingPost label="Deleting post ..." />}
    </>
  )
}
