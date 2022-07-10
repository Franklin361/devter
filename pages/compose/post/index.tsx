import { NextPage } from 'next'
import { FormAddPost } from '../../../components'
import { useAuthenticated } from '../../../hooks'
import { MainLayout } from '../../../layout'

const AddPostPage: NextPage = () => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  if (!isAuth) {
    handleGoLogin()
    return null
  }
  return (
    <MainLayout titleNav="Create Post">
      <FormAddPost />
    </MainLayout>
  )
}

export default AddPostPage
