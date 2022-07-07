import { ImageHero } from "./ImageHero"
import { HeroContent } from './HeroContent';

export const Hero = () => {
    return (
        <div className='flex justify-center items-center h-screen overflow-hidden'>
            <div className="flex h-4/6 rounded w-3/4 gap-2">
                <ImageHero />
                <HeroContent />
            </div>
        </div>
    )
}
