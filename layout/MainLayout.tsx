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
      <main className="main">{children}</main>
      <NavHome />
    </div>
  )
}
