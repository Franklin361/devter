import { BsGithub } from 'react-icons/bs'
import { useAuthContext } from '../../hooks'

export const HeroContent = () => {
  return (
    <div className="flex-1 py-5 md:px-10 px-1 text-center flex flex-col lg:justify-between justify-around border border-gray-500 shadow-xl shadow-black/30 rounded-md bg-neutral">
      <TitleHero />
      <DescriptionHero />
      <ButtonLoginHero />
    </div>
  )
}

export const TitleHero = () => {
  return (
    <h1 className=" md:text-9xl text-6xl font-extrabold text-neutral-content bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-700">
      Devter
    </h1>
  )
}

export const DescriptionHero = () => {
  return (
    <p className="text-lg text-gray-400">
      Create development and programming publications and share them with the
      community.
    </p>
  )
}

export const ButtonLoginHero = () => {
  const { handleLogin } = useAuthContext()
  return (
    <button
      className="btn btn-primary md:btn-lg btn-md md:w-full w-10/12 mx-auto gap-5"
      onClick={handleLogin}
    >
      <span className="md:block hidden">Start with GitHub</span>
      <span className="md:hidden block">Log in</span>
      <BsGithub className="text-3xl" />
    </button>
  )
}
