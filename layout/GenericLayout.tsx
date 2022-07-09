import Head from 'next/head'

interface Props {
  children: JSX.Element | JSX.Element[]
  title?: string
}

export const GenericLayout = ({ children, title }: Props) => {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <div className="absolute top-0 left-0 triangle bg-neutral w-screen h-screen" />
      {children}
    </>
  )
}
