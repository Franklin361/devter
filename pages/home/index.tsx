import { useEffect } from 'react'
import { NextPage } from 'next'
import { Unsubscribe } from 'firebase/firestore'

import { LayoutPosts } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'

import { listenLatestPosts } from '../../firebase'
import { usePostStore } from '../../store'

const HomePage: NextPage = () => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  const addListPosts = usePostStore(state => state.addListPosts)

  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (isAuth) {
      unsubscribe = listenLatestPosts(addListPosts)
    }
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
      <LayoutPosts />
    </MainLayout>
  )
}
export default HomePage
