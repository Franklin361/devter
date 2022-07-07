
export const ImageHero = () => {
    return (
      <div className='relative w-5/12 rounded-md overflow-hidden md:block hidden'>
        <img src="https://i.pinimg.com/736x/62/7a/b7/627ab7fc33d3a2b2e40150aaa8b296f8.jpg" className=" w-full object-cover h-full" />
        <div className='w-full h-full bg-purple-900 absolute z-10 top-0 left-0 opacity-40' />
      </div>
    )
  }