import { ImageHero } from './ImageHero'
import { HeroContent } from './HeroContent'

export const Hero = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden relative z-20">
      <div className="flex h-4/6 rounded lg:w-3/4 w-11/12 gap-2">
        <ImageHero />
        <HeroContent />
      </div>
    </div>
  )
}
