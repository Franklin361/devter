import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context'

import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dnxchppfm/image/upload/c_scale,w_904/v1658070841/perspective_matte_mtiwmt.webp"
          type="image/x-icon"
        />

        <meta
          name="description"
          content="Devter | Share your dev posts with the community 🐦."
        />
        <meta name="author" content="Franklin Martinez" />
        <meta
          name="title"
          content="Devter is a web application where you can create publications about web development and share them with the tech community!"
        />
        <meta
          name="image"
          content="https://res.cloudinary.com/dnxchppfm/image/upload/v1658071018/devter/mian-devter_jfor64.webp"
        />

        <meta
          property="og:title"
          content="Devter is a web application where you can create publications about web development and share them with the tech community!"
        />
        <meta
          property="og:description"
          content="Devter | Share your dev posts with the community 🐦."
        />
        <meta property="og:url" content="https://devter.vercel.app" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dnxchppfm/image/upload/v1658071018/devter/mian-devter_jfor64.webp"
        />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content="Devter is a web application where you can create publications about web development and share them with the tech community!"
        />
        <meta
          name="twitter:description"
          content="Devter | Share your dev posts with the community 🐦."
        />
        <meta name="twitter:url" content="https://devter.vercel.app" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dnxchppfm/image/upload/v1658071018/devter/mian-devter_jfor64.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Frankomtz361" />
        <meta name="twitter:creator" content="@Frankomtz361" />

        <title>Devter</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  )
}

export default MyApp
