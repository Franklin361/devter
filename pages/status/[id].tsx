import { NextPage, NextPageContext } from 'next'
import { DevPost } from '../../components'
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
  const res = await fetch(`http://localhost:3000/api/post/${id}`)
  if (res.status === 200) {
    const data: PostResponse = await res.json()
    return {
      props: { ...data } // will be passed to the page component as props
    }
  }

  return {
    props: {}
  }
}