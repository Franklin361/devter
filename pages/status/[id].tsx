import { NextPage } from 'next'
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

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'BelzdcdF7wTN8wLxeLLC' } }],
    fallback: true // false or 'blocking'
  }
}

export async function getStaticProps(context: { params: any }) {
  const { id } = context.params as { id: string }

  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? 'http://localhost:3000' : 'https://devter.vercel.app'
  const res = await fetch(`${server}/api/post/${id}`)

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
