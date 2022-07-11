import { useEffect } from 'react'
import { NextPage } from 'next'
import shallow from 'zustand/shallow'
import { Unsubscribe } from 'firebase/firestore'

import { LayoutPosts } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'

import { listenLatestPosts } from '../../firebase'
import { usePostStore } from '../../store'

const HomePage: NextPage = () => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  const { listPosts, addListPosts } = usePostStore(
    ({ listPosts, addListPosts }) => ({ listPosts, addListPosts }),
    shallow
  )

  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (isAuth) unsubscribe = listenLatestPosts(addListPosts)
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
      {listPosts === null ? (
        <p className="font-bold text-xl text-center w-full text-info">
          Loading latest posts...
        </p>
      ) : (
        <LayoutPosts data={listPosts} />
      )}
    </MainLayout>
  )
}
export default HomePage
