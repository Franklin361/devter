import { HeaderHome, NavHome } from '../components'

interface Props {
  children: JSX.Element | JSX.Element[]
  title?: string
  titleNav?: string
}

export const MainLayout = ({ children, titleNav }: Props) => {
  return (
    <div className="h-screen flex flex-col max-w-4xl mx-auto">
      <HeaderHome title={titleNav ?? 'Inicio'} />
      <main className="flex-1 justify-center items-center flex flex-col pt-5">
        {children}
      </main>
      <NavHome />
    </div>
  )
}
