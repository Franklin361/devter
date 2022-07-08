import type { NextPage } from 'next'
import { GenericLayout } from '../layout'
import { Hero } from '../components'
import { useAuthenticated } from '../hooks'

const LoginPage: NextPage = () => {
  const { handleGoHome, isAuth } = useAuthenticated()

  if (isAuth) {
    handleGoHome()
    return null
  }

  return (
    <GenericLayout title="Devter | Log in">
      <Hero />
    </GenericLayout>
  )
}

export default LoginPage
