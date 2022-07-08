import { useAuthenticated } from '../hooks'

export const Custom404 = () => {
  const { handleGoHome, handleGoLogin, isAuth } = useAuthenticated()

  if (isAuth) {
    handleGoHome()
    return null
  }

  if (!isAuth) {
    handleGoLogin()
    return null
  }
  return null
}
export default Custom404
