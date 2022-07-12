import Head from 'next/head'
import { HeaderHome, NavHome } from '../components'

interface Props {
  children: JSX.Element | JSX.Element[]
  title?: string
  titleNav?: string
}

export const MainLayout = ({
  children,
  titleNav,
  title = 'Devter | Home'
}: Props) => {
  return (
    <div className="h-screen flex flex-col max-w-4xl mx-auto">
      <HeaderHome title={titleNav ?? 'Home'} />
      <main className="main">{children}</main>
      <NavHome />
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  )
}
