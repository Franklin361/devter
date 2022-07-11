import { BsHouseDoor, BsPencilSquare } from 'react-icons/bs'
import { useRouter } from 'next/router'

export const NavHome = () => {
  const router = useRouter()
  const handleGo = (url: string) => router.push(url)
  return (
    <nav className="sticky bottom-0 flex justify-around items-center bg-neutral rounded gap-5">
      <p
        onClick={() => handleGo('/home')}
        className="hover:text-info active:scale-90 cursor-pointer py-4 flex-1 flex justify-center items-center"
      >
        <BsHouseDoor className="text-2xl" />
      </p>
      {/* <p
        onClick={() => handleGo('/search')}
        className="hover:text-info active:scale-90 cursor-pointer py-4 flex-1 flex justify-center items-center"
      >
        <BsSearch className="text-2xl" />
      </p> */}
      <p
        onClick={() => handleGo('/compose/post')}
        className="hover:text-info active:scale-90 cursor-pointer py-4 flex-1 flex justify-center items-center"
      >
        <BsPencilSquare className="text-2xl" />
      </p>
    </nav>
  )
}
