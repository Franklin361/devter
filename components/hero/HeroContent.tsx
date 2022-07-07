import { BsGithub } from "react-icons/bs"

export const HeroContent = () => {
    return (
      <div className=' flex-1  py-5 px-10 text-center flex flex-col justify-between border border-gray-500 shadow-xl shadow-black/30 rounded-md bg-neutral'>
        <h1 className=' text-9xl font-extrabold text-neutral-content bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-700'>Devter</h1>
        <p className='text-lg text-gray-400'>Create development and programming publications and share them with the community.</p>
        <div className='flex flex-col gap-4'>
          <button className='btn btn-primary btn-lg gap-5'>
            Start with GitHub
            <BsGithub className='text-3xl' />
          </button>
        </div>
      </div>
    )
  }
  