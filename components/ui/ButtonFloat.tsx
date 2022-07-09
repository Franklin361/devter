import { BsPlusCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'
export const ButtonFloat = () => {
  const router = useRouter()
  const handleGoForm = () => router.push('/compose/post')
  return (
    <button
      onClick={handleGoForm}
      className="btn btn-circle btn-primary btn-lg fixed md:left-3/4 right-5 bottom-24"
    >
      <BsPlusCircle className="text-3xl" />
    </button>
  )
}
