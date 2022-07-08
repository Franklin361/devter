import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { AuthProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta
          name="description"
          content="App for developers to create some tweets"
        />
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dnxchppfm/image/upload/v1646238992/rocket_tpjxym.webp"
          type="image/x-icon"
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
