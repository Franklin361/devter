import { BsHeart, BsShare, BsSuitHeartFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { usePostStore } from '../../store'
import { updatePostLikeOrShare } from '../../firebase'
import { useAuthContext } from '../../hooks'

export const FooterPost = () => {
  const postSelected = usePostStore(state => state.postSelected)
  const selectPost = usePostStore(state => state.selectPost)

  const { user } = useAuthContext()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (postSelected?.likes) {
      const existLikeOfUser = postSelected.likes.includes(user?.uid!)
      setIsLiked(existLikeOfUser)
    }
  }, [postSelected])

  const handleLike = () => {
    setIsLiked(prev => !prev)
    updatePostLikeOrShare({
      post: {
        ...postSelected!,
        likes: !isLiked
          ? [...postSelected?.likes!, user?.uid!]
          : [...postSelected!.likes!.filter(like => like !== user?.uid!)]
      },
      callback: post => {
        selectPost(post)
      }
    })
  }

  const handleShare = () => {
    // setIsShared(prev => !prev)
  }

  return (
    <footer className="flex justify-around items-center border-t border-gray-700 pt-5">
      <p
        className="flex items-center gap-5 cursor-pointer hover:text-info"
        onClick={handleLike}
      >
        {isLiked ? (
          <BsSuitHeartFill className="text-xl text-info" />
        ) : (
          <BsHeart className="text-xl" />
        )}
        <span className={`text-xl ${isLiked ? 'text-info' : ''}`}>
          {postSelected?.likes && postSelected.likes.length}
        </span>
      </p>
      <p
        className="flex items-center gap-5 cursor-pointer hover:text-warning"
        onClick={handleShare}
      >
        <BsShare className="text-xl" />
        {/* <BsShareFill className="text-xl text-warning" /> */}

        {/* <span className={`text-xl ${isShared ? 'text-warning' : ''}`}>
          {shared.length}
        </span> */}
      </p>
    </footer>
  )
}
