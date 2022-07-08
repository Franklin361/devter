import { HeaderHome, NavHome } from '../components'

interface Props {
  children: JSX.Element | JSX.Element[]
  title?: string
  titleNav?: string
}

export const MainLayout = ({ children, titleNav }: Props) => {
  return (
    <main className="flex flex-col flex-auto min-h-screen max-w-4xl mx-auto">
      <HeaderHome title={titleNav ?? 'Inicio'} />
      <section className="flex-1 px-7 pt-7 ">{children}</section>
      <NavHome />
    </main>
  )
}
