import type { NextPage } from 'next'

import { GenericLayout } from '../layout'
import { Hero, Loading } from '../components'
import { useAuthContext } from '../hooks'
import { logoutFirebase } from '../firebase'

const Home: NextPage = () => {
  const { user, status } = useAuthContext()

  if (status === 'checking') return <Loading />

  return (
    <GenericLayout title="Devter | Home">
      {!user ? (
        <Hero />
      ) : (
        <button onClick={logoutFirebase} className="relative z-10 btn">
          logout
        </button>
      )}
    </GenericLayout>
  )
}

export default Home
