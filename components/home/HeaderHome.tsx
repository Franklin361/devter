import { BsPower } from 'react-icons/bs'
import { logoutFirebase } from '../../firebase'
import { useAuthContext } from '../../hooks/useAuthContext'

const avatar =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export const HeaderHome = ({ title }: { title: string }) => {
  const { user } = useAuthContext()

  const handleLogout = () => logoutFirebase()

  return (
    <header className="z-10 sticky top-0 bg-neutral shadow-xl shadow-black/40 p-5 flex items-center justify-between md:gap-0 gap-5  sm:flex-row flex-col max-w-4xl">
      <div className="flex items-center gap-2 md:gap-5">
        <img
          src={user ? user.photoURL : avatar}
          alt="profile"
          width={50}
          className="rounded-full"
        />
        <h3 className="font-bold text-xl text-primary-content">{title}</h3>
        <span className="font-normal md:block hidden">
          ( {user?.displayName} )
        </span>
      </div>
      <button
        className="btn btn-outline btn-error gap-2"
        onClick={handleLogout}
      >
        Log out
        <BsPower className="text-xl" />
      </button>
    </header>
  )
}
