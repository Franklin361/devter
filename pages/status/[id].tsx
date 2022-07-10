import { NextPage, NextPageContext } from 'next'
import { DevPost } from '../../components'
import { useAuthenticated } from '../../hooks'
import { PostResponse } from '../../interfaces'
import { MainLayout } from '../../layout'

export const SinglePostPage: NextPage<PostResponse> = ({
  content,
  createdAt,
  displayName,
  id,
  likesCount,
  photoURL,
  sharedCount,
  img
}: PostResponse) => {
  const { handleGoLogin, isAuth } = useAuthenticated()

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  return (
    <MainLayout>
      <DevPost
        content={content}
        createdAt={createdAt}
        displayName={displayName}
        id={id}
        likesCount={likesCount}
        photoURL={photoURL}
        sharedCount={sharedCount}
        completePost
        img={img}
      />
    </MainLayout>
  )
}

export default SinglePostPage

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query as { id: string }
  const res = await fetch(`/api/post/${id}`)
  if (res.status === 200) {
    const data: PostResponse = await res.json()
    return {
      props: { ...data }
    }
  }

  return {
    props: {}
  }
}
