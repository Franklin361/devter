import { useAuthContext } from './'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { usePostStore } from '../store'
import { deletePost } from '../firebase'
import { showToast } from '../utils'

interface Props {
  id: string
  fileName: string
}

export const useDeletePost = ({ fileName, id }: Props) => {
  const { user } = useAuthContext()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const deletePostById = usePostStore(state => state.deletePostById)

  const handleDelete = async () => {
    setLoading(true)
    const isDeleted = await deletePost(id, fileName)
    setLoading(false)
    if (isDeleted) {
      deletePostById(id)
      router.replace('/home')
      showToast({ msg: 'Post successfully deleted!' })
    } else {
      showToast({ msg: 'Upss, trying later pleas 😞!', typeToast: 'error' })
    }
  }

  return {
    handleDelete,
    loading,
    user
  }
}
