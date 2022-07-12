import { NextPage } from 'next'
import { DevPost } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
import { usePostStore } from '../../store'

export const SinglePostPage: NextPage<{ name: string }> = ({
  name
}: {
  name: string
}) => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  const post = usePostStore(state => state.postSelected)

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  return (
    <MainLayout>
      <h1>Hello: {name}</h1>
      {post ? (
        <DevPost
          content={post.content}
          createdAt={post.createdAt}
          displayName={post.displayName}
          id={post.id}
          likesCount={post.likesCount}
          photoURL={post.photoURL}
          sharedCount={post.sharedCount}
          img={post.img}
          userId={post.userId}
          completePost
        />
      ) : (
        <p>Post no exist</p>
      )}
    </MainLayout>
  )
}

export default SinglePostPage

export async function getServerSideProps() {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://devter.vercel.app'
      : 'http://localhost:3000'
  const res = await fetch(`${host}/api/post`)
  const data = await res.json()

  return {
    props: { ...data } // will be passed to the page component as props
  }
}
