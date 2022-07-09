import { BsHeart, BsShare } from 'react-icons/bs'
import { PostResponse } from '../../interfaces'
// const avatar =
//   'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export const DevPost = ({
  content,
  displayName,
  photoURL,
  likesCount,
  sharedCount,
  createdAt
}: PostResponse) => {
  return (
    <div className="border border-gray-500 p-5 rounded-md bg-black/70 max-w-xl mx-auto w-full my-5">
      <header className="flex items-center gap-5">
        <img src={photoURL} alt="profile" width={35} className="rounded-full" />
        <h5 className="font-bold ">{displayName}</h5>
      </header>
      <p className="font-normal my-5">{content}</p>
      <span className="text-white/30 font-bold text-end block w-full">
        {createdAt}
      </span>
      <footer className="flex justify-around items-center border-t border-gray-700 pt-5">
        <p className="flex items-center gap-5 cursor-pointer hover:text-info">
          <BsHeart className="text-xl" />
          {/* <BsSuitHeartFill className="text-xl" /> */}
          <span className="text-xl">{likesCount}</span>
        </p>
        <p className="flex items-center gap-5 cursor-pointer hover:text-warning">
          <BsShare className="text-xl" />
          <span className="text-xl">{sharedCount}</span>
        </p>
      </footer>
    </div>
  )
}
