import React, { useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { addPost } from '../firebase'
import { useAuthContext } from '../hooks'
import { useRouter } from 'next/router'

export const FormAddPost = () => {
  const [form, setForm] = useState('')
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const { user } = useAuthContext()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm(e.target.value)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setloading(() => true)

    const res = await addPost({
      content: form,
      displayName: user?.displayName!,
      uid: user?.uid!,
      photoURL: user?.photoURL!
    })

    if (res) router.push('/home')
  }
  return (
    <form className="flex flex-col gap-5 items-start" onSubmit={handleSubmit}>
      <textarea
        disabled={loading}
        placeholder="What's happening?"
        className="h-56 text-xl resize-none bg-transparent border border-gray-500 rounded-lg p-5 focus:outline-none w-full"
        onChange={handleChange}
        value={form}
      />
      <button
        className="btn btn-primary gap-4 md:w-auto w-full"
        disabled={form.length === 0 || loading}
      >
        <span>Add Post</span>
        <BsPlusCircle className="text-xl" />
      </button>
      {loading && (
        <div className="fixed z-50 w-screen h-screen top-0 left-0 bg-black/50 flex justify-center items-center">
          <p className="text-xl text-center w-full text-info">
            Creating post...
          </p>
        </div>
      )}
    </form>
  )
}
