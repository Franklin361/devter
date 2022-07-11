import React, { useRef, useState } from 'react'
import { BsArrowBarLeft, BsPlusCircle, BsXCircle } from 'react-icons/bs'
import { addPost, uploadImage } from '../firebase'
import { useAuthContext, useDragAndDrop } from '../hooks'
import { useRouter } from 'next/router'

type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>
type FormEvent = React.FormEvent<HTMLFormElement>
// TODO: REFACTOR COMPONENT
// TODO: REFACTOR LOGIC
export const FormAddPost = () => {
  const [form, setForm] = useState('')
  const [loading, setloading] = useState(false)
  const { drag, fileObj, ...events } = useDragAndDrop()
  const router = useRouter()
  const { user } = useAuthContext()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleCancel = () => router.back()

  const handleChange = (e: TextAreaEvent) => setForm(e.target.value)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.trim().length === 0) return

    setloading(() => true)

    let isSuccessImageUploaded = true
    let imageURL: string = ''

    if (fileObj) {
      const res = await uploadImage(fileObj)
      isSuccessImageUploaded = res.ok
      imageURL = res.image ?? ''
    }

    const res = await addPost({
      content: form,
      displayName: user?.displayName!,
      photoURL: user?.photoURL!,
      userId: user?.uid!,
      ...(fileObj ? { img: imageURL } : {})
    })

    setloading(() => false)

    if (isSuccessImageUploaded && res) {
      router.push('/home')
    }
  }

  const handleOpenExplorer = () => inputFileRef.current?.click()

  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file.type.includes('image')) events.handleSetFileWithoutDrag(file)
    else alert('That does not an image!')
  }

  return (
    <form
      className="flex flex-col gap-5 items-start w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div
        className={`h-56 flex flex-col border w-full border-gray-500 rounded-lg relative ${
          drag === 1 ? 'bg-black/80' : ''
        } ${fileObj ? 'h-72' : 'h-56'}`}
      >
        <div className="flex justify-end absolute -top-4 left-0 w-full">
          <input
            type="file"
            className="hidden"
            ref={inputFileRef}
            onChange={onInputFileChange}
          />
          <button
            className="btn btn-sm"
            onClick={handleOpenExplorer}
            type="button"
          >
            Upload
          </button>
        </div>
        <textarea
          disabled={loading}
          placeholder="What's happening?"
          className="text-xl resize-none bg-transparent focus:outline-none flex-1 p-5"
          onChange={handleChange}
          value={form}
          onDragEnter={events.handleDragEnter}
          onDragLeave={events.handleDragLeave}
          onDrop={events.handleDrop}
        />
        <div className={`${fileObj ? 'block p-4' : 'hidden'}`}>
          {fileObj && (
            <div className="relative w-3/12 h-28">
              <button
                className="btn btn-circle bg-black/70 btn-md absolute -right-5 -top-5"
                type="button"
                onClick={events.clearFiles}
              >
                <BsXCircle className="text-2xl" />
              </button>
              <img
                className="w-full h-full object-cover align-top rounded-md"
                src={URL.createObjectURL(fileObj).toString()}
                alt={fileObj.name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between w-full md:flex-row flex-col gap-10">
        <button
          type="submit"
          className="btn btn-primary gap-4  md:w-auto w-full"
          disabled={form.length === 0 || loading}
        >
          <span>Add Post</span>
          <BsPlusCircle className="text-xl" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-info btn-outline gap-4  md:w-auto w-full"
          disabled={loading}
        >
          <span>Cancel</span>
          <BsArrowBarLeft className="text-xl" />
        </button>
      </div>
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
