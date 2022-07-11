import { useAuthContext } from '../../hooks'
import { PostResponse } from '../../interfaces'

interface Props
  extends Pick<PostResponse, 'photoURL' | 'displayName' | 'userId'> {
  completePost: boolean
}

export const HeaderPost = ({
  displayName,
  photoURL,
  userId,
  completePost = false
}: Props) => {
  const { user } = useAuthContext()

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <img src={photoURL} alt="profile" width={35} className="rounded-full" />
        <h5 className="font-bold ">{displayName}</h5>
      </div>
      {user!.uid === userId && completePost && (
        <div>
          <button className="btn btn-primary btn-sm">Delete</button>
        </div>
      )}
    </header>
  )
}
