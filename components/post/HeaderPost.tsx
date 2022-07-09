import { PostResponse } from '../../interfaces'

export const HeaderPost = ({
  displayName,
  photoURL
}: Pick<PostResponse, 'photoURL' | 'displayName'>) => {
  return (
    <header className="flex items-center gap-5">
      <img src={photoURL} alt="profile" width={35} className="rounded-full" />
      <h5 className="font-bold ">{displayName}</h5>
    </header>
  )
}
