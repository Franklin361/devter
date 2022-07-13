import { useEffect } from 'react'
import { NextPage } from 'next'
import { DevPost, Spinner } from '../../components'
import { useAuthenticated, useLoadingRoute } from '../../hooks'
import { MainLayout } from '../../layout'
import { usePostStore } from '../../store'
import { PostResponse } from '../../interfaces'
import { showToast } from '../../utils'

export const SinglePostPage: NextPage<PostResponse> = ({ ...post }) => {
  const { handleGoLogin, isAuth, handleGoHome } = useAuthenticated()
  const isLoadingRoute = useLoadingRoute()
  const selectPost = usePostStore(state => state.selectPost)

  useEffect(() => {
    if (post.content) selectPost(post)
  }, [post])

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  if (!post.content) {
    handleGoHome()
    showToast({
      msg: "This publication doesn't exist, it's probably been deleted 😞",
      typeToast: 'error'
    })
    return null
  }

  if (isLoadingRoute) {
    return (
      <MainLayout titleNav="Devter" title="Devter | ">
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout
      title={`Devter | ${
        post?.content ? post?.content.substring(0, 15) + '...' : 'Post'
      } `}
      titleNav="Devter"
    >
      {post ? (
        <DevPost
          content={post.content}
          createdAt={post.createdAt}
          displayName={post.displayName}
          id={post.id}
          likes={post.likes}
          photoURL={post.photoURL}
          img={post.img}
          fileName={post.fileName}
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
  const res = await fetch(`${host}/api/post/${context.params.id}`)
  const data = await res.json()
  return {
    props: { ...data } // will be passed to the page component as props
  }
}
