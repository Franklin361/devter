import { NextPage } from 'next'
import { LayoutPosts } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
import { useEffect, useState } from 'react'
import { getPosts } from '../../firebase'
import { PostResponse } from '../../interfaces'

const HomePage: NextPage = () => {
  const { handleGoLogin, isAuth, user } = useAuthenticated()
  const [data, setData] = useState<null | PostResponse[]>(null)

  useEffect(() => {
    getPosts(user?.uid!).then(posts => setData(posts))
  }, [])

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  return (
    <MainLayout>
      {data === null ? (
        <p className="font-bold text-xl text-center w-full text-info">
          Loading data...
        </p>
      ) : (
        <LayoutPosts data={data} />
      )}
    </MainLayout>
  )
}
export default HomePage
