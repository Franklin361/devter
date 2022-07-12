import { NextPage } from 'next'
import { DevPost } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
// import { usePostStore } from '../../store'
import { PostResponse } from '../../interfaces'

export const SinglePostPage: NextPage<PostResponse> = ({ ...post }) => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  // const post = usePostStore(state => state.postSelected)

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  return (
    <MainLayout>
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

export async function getServerSideProps(context: any) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://devter.vercel.app'
      : 'http://localhost:3000'
  const res = await fetch(`${host}/api/post/${context.query.id}`)
  const data = await res.json()

  return {
    props: { ...data } // will be passed to the page component as props
  }
}
