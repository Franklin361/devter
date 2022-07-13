import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
export const useLoadingRoute = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    console.log(router.asPath)
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true)

    const handleComplete = (url: string) =>
      url !== router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [loading])

  return loading
}
