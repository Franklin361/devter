import { NextPage } from 'next'
import { FormAddPost } from '../../../components'
import { MainLayout } from '../../../layout'

const AddPostPage: NextPage = () => {
  return (
    <MainLayout titleNav="Create Post">
      <FormAddPost />
    </MainLayout>
  )
}

export default AddPostPage
