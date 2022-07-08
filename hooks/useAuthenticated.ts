import { useAuthContext } from '.'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useAuthenticated = () => {
  const { status, user } = useAuthContext()
  const router = useRouter()

  const handleGoHome = () => router.replace('/home')

  const handleGoLogin = () => router.replace('/')

  const isAuth = useMemo(() => status === 'authenticated', [status])

  return { isAuth, handleGoHome, handleGoLogin, user }
}
