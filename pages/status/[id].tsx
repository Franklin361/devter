import { NextPage } from 'next'
import { DevPost, PostSkeleton } from '../../components'
import { useAuthenticated } from '../../hooks'
import { MainLayout } from '../../layout'
import { usePostStore } from '../../store'
import { PostResponse } from '../../interfaces'
import { useEffect } from 'react'

export const SinglePostPage: NextPage<PostResponse> = ({ ...post }) => {
  const { handleGoLogin, isAuth, isFallback } = useAuthenticated()
  const selectPost = usePostStore(state => state.selectPost)

  useEffect(() => {
    if (post.content) selectPost(post)
  }, [post])

  if (!isAuth) {
    handleGoLogin()
    return null
  }

  // TODO: create Skeleton
  if (isFallback || !post.content) {
    return (
      <MainLayout title="Devter | Post" titleNav="Devter">
        <PostSkeleton />
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
          shared={post.shared}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

// TODO: change to getStaticProps and getStaticPaths
export async function getStaticProps(context: any) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://devter.vercel.app'
      : 'http://localhost:3000'
  const res = await fetch(`${host}/api/post/${context.params.id}`)
  const data = await res.json()

  return {
    props: { ...data },
    revalidate: 10 // will be passed to the page component as props
  }
}
