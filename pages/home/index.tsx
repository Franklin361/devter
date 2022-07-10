import { NextPage } from 'next'
import { Unsubscribe } from 'firebase/firestore'

import { LayoutPosts } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
import { useEffect, useState } from 'react'
import { listenLatestPosts } from '../../firebase'
import { PostResponse } from '../../interfaces'

const HomePage: NextPage = () => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  const [data, setData] = useState<null | PostResponse[]>(null)

  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (isAuth) unsubscribe = listenLatestPosts(setData)
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  return (
    <MainLayout>
      {data === null ? (
        <p className="font-bold text-xl text-center w-full text-info">
          Loading latest posts...
        </p>
      ) : (
        <LayoutPosts data={data} />
      )}
    </MainLayout>
  )
}
export default HomePage
