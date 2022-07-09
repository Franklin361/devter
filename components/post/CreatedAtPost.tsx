import { useTimeAgo } from '../../hooks'
import { PostResponse } from '../../interfaces'

export const CreatedAtPost = ({
  createdAt
}: Pick<PostResponse, 'createdAt'>) => {
  const timeAgo = useTimeAgo(createdAt)

  return (
    <span className="text-secondary-focus text-sm font-bold text-end block w-full">
      {timeAgo}
    </span>
  )
}
