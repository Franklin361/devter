import { NextPage } from 'next'
import { DevPost } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
import { usePostStore } from '../../store'

export const SinglePostPage: NextPage = () => {
  const { handleGoLogin, isAuth } = useAuthenticated()
  const post = usePostStore(state => state.postSelected)

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
