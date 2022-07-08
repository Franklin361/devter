import { BsBoxSeam } from 'react-icons/bs'
export const NoDevPosts = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5 my-10">
      <span className="text-5xl font-bold">No posts</span>
      <BsBoxSeam className="text-7xl" />
    </div>
  )
}
