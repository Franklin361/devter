import { useAuthContext } from '../../hooks'
import { PostResponse } from '../../interfaces'
import { deletePost } from '../../firebase'
import { useRouter } from 'next/router'
import { usePostStore } from '../../store'

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
  fileName
}: Props) => {
  const { user } = useAuthContext()
  const router = useRouter()
  const deletePostById = usePostStore(state => state.deletePostById)

  const handleDelete = async () => {
    // TODO: add loading while deleting post
    const isDeleted = await deletePost(id, fileName)
    if (isDeleted) {
      deletePostById(id)
      router.replace('/home')
    }
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <img src={photoURL} alt="profile" width={35} className="rounded-full" />
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
  )
}
