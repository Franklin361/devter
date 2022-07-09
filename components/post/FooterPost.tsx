import { PostResponse } from '../../interfaces'
import { BsHeart, BsShare } from 'react-icons/bs'

export const FooterPost = ({
  likesCount,
  sharedCount
}: Pick<PostResponse, 'likesCount' | 'sharedCount'>) => {
  return (
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
  )
}
